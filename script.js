'use strict';

class RoutineApp {
    constructor() {
        this.currentDate = new Date();
        this.elements = {};
        this.categoryColors = {
            'Trabalho': '#3b82f6',
            'Estudo': '#10b981',
            'Pessoal': '#f59e0b',
            'Movimento': '#ef4444',
            'Lazer': '#8b5cf6'
        };
        this.init();
    }

    init() {
        this.cacheElements();
        this.updateDateBar();
        this.renderTodayTasks();
        this.startAutoUpdate();
    }

    cacheElements() {
        this.elements = {
            scheduleContainer: document.getElementById('schedule-container'),
            tasksListElement: document.getElementById('tasks-list'),
            currentDate: document.getElementById('current-date'),
            currentWeekday: document.getElementById('current-weekday'),
            scheduleTitle: document.getElementById('schedule-title'),
            totalTasks: document.getElementById('total-tasks')
        };
    }

    updateDateBar() {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        const dateString = this.currentDate.toLocaleDateString('pt-BR', options);
        const [weekday, ...dateParts] = dateString.split(', ');
        
        if (this.elements.currentWeekday) {
            this.elements.currentWeekday.textContent = weekday.charAt(0).toUpperCase() + weekday.slice(1);
        }
        if (this.elements.currentDate) {
            this.elements.currentDate.textContent = dateParts.join(', ');
        }
    }

    getCurrentDayName() {
        const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        return days[this.currentDate.getDay()];
    }

    getCurrentDateString() {
        return this.currentDate.toISOString().split('T')[0];
    }

    getTodayTasks() {
        const dayName = this.getCurrentDayName();
        const scheduleData = this.getScheduleData();
        return scheduleData[dayName] || [];
    }

    renderTodayTasks() {
        const tasks = this.getTodayTasks();
        const dayName = this.getCurrentDayName();
        const dateString = this.getCurrentDateString();
        
        // Atualizar título e contador
        if (this.elements.scheduleTitle) {
            this.elements.scheduleTitle.textContent = `📋 ${dayName}`;
        }
        if (this.elements.totalTasks) {
            this.elements.totalTasks.textContent = tasks.length;
        }
        
        // Recuperar progresso salvo
        const storedProgress = this.getStoredProgress();
        const todayChecks = storedProgress[dateString] || {};
        
        // Limpar lista
        if (this.elements.tasksListElement) {
            this.elements.tasksListElement.innerHTML = '';
            
            // Renderizar tarefas
            tasks.forEach((task, idx) => {
                const isChecked = todayChecks[idx] || false;
                const taskElement = this.createTaskElement(task, idx, isChecked);
                this.elements.tasksListElement.appendChild(taskElement);
            });
            
            this.bindTaskEvents();
        }
    }

    createTaskElement(task, idx, isChecked) {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${isChecked ? 'completed' : ''}`;
        taskCard.setAttribute('data-category', task.cat);
        
        taskCard.innerHTML = `
            <div class="task-header">
                <div class="task-icon">${task.icon}</div>
                <div class="task-content">
                    <h3 class="task-title">${task.title}</h3>
                </div>
                <span class="task-time">${task.time}</span>
            </div>
            <p class="task-description">${task.desc}</p>
            <span class="task-category" data-category="${task.cat}">${task.cat}</span>
            <input 
                type="checkbox" 
                class="task-checkbox" 
                data-idx="${idx}" 
                ${isChecked ? 'checked' : ''}
                aria-label="Marcar ${task.title} como concluída"
            >
        `;
        
        return taskCard;
    }

    bindTaskEvents() {
        const checkboxes = this.elements.tasksListElement?.querySelectorAll('.task-checkbox');
        checkboxes?.forEach(checkbox => {
            checkbox.addEventListener('change', (event) => this.handleTaskToggle(event));
        });
    }

    handleTaskToggle(event) {
        const checkbox = event.target;
        const idx = parseInt(checkbox.getAttribute('data-idx'));
        const dateString = this.getCurrentDateString();
        const taskCard = checkbox.closest('.task-card');
        
        // Atualizar visual
        if (checkbox.checked) {
            taskCard.classList.add('completed');
        } else {
            taskCard.classList.remove('completed');
        }
        
        // Salvar progresso
        const storedProgress = this.getStoredProgress();
        if (!storedProgress[dateString]) {
            storedProgress[dateString] = {};
        }
        storedProgress[dateString][idx] = checkbox.checked;
        this.saveProgress(storedProgress);
    }

    getStoredProgress() {
        try {
            return JSON.parse(localStorage.getItem('dailyProgress') || '{}');
        } catch (error) {
            console.error('Erro ao carregar progresso:', error);
            return {};
        }
    }

    saveProgress(progress) {
        try {
            localStorage.setItem('dailyProgress', JSON.stringify(progress));
        } catch (error) {
            console.error('Erro ao salvar progresso:', error);
        }
    }

    startAutoUpdate() {
        setInterval(() => {
            const newDate = new Date();
            if (newDate.toDateString() !== this.currentDate.toDateString()) {
                this.currentDate = newDate;
                this.updateDateBar();
                this.renderTodayTasks();
            }
        }, 60000);
    }

    getScheduleData() {
        // Descrições reutilizáveis
        const descriptions = {
            despertar: 'Acordar naturalmente, beber 500ml de água em temperatura ambiente, abrir janelas para ventilação. Evitar celular por 30 minutos.',
            cafe: 'Refeição nutritiva e balanceada: proteína + carboidrato + fruta. Comer devagar, sem telas, focando na alimentação.',
            organizacao: 'Arrumar a cama, organizar mesa de trabalho, lavar louça do café. Preparar ambiente para o dia produtivo.',
            higiene: 'Banho revigorante, cuidados pessoais completos, vestir roupa confortável. Preparação física e mental.',
            preparacaoMental: 'Revisar agenda do dia, definir 3 prioridades principais, organizar material de trabalho. Mentalização para foco produtivo.',
            transicao: 'Caminhada de 20min ao ar livre ou alongamento, respiração consciente, leitura de 10min. Preparação corpo-mente.',
            trabalhoManha: 'Foco total nas tarefas mais importantes do estágio. 3 ciclos de 50min trabalho + 10min pausa. Celular no modo avião.',
            almoco: 'Refeição equilibrada preparada em casa. Mastigar devagar, hidratar bem. 15min de descanso pós-refeição.',
            trabalhoTarde: 'Conclusão das demandas do dia. 3 ciclos focados. Últimos 10min para organizar tarefas do dia seguinte e fazer handoff.',
            transicaoPosTrabalho: 'Rituais de encerramento: salvar trabalhos, fechar programas, lanche saudável. Transição mental trabalho → vida pessoal.',
            estudoEstagio: 'Aprofundar conhecimentos relacionados ao estágio: tecnologias, conceitos, cursos online. Aprendizado ativo com anotações.',
            preparacaoAcademia: 'Lanche pré-treino (banana + aveia), trocar roupa esportiva, hidratar, deslocamento. Mentalizar treino produtivo.',
            academia: 'Treino completo com aquecimento (10min), musculação (70min), alongamento (10min). Treino em dupla com a namorada para motivação.',
            retornoBanho: 'Deslocamento de volta, banho relaxante com água morna, trocar para roupas confortáveis. Transição física e mental.',
            jantar: 'Refeição leve e nutritiva: proteína magra + vegetais + carboidrato complexo. Evitar excesso antes do estudo.',
            estudoFaculdade: 'Revisão de conteúdos da faculdade online: videoaulas, exercícios, leituras. Foco em matérias com proximidade de provas.',
            lazer: 'Tempo de qualidade: filme, série, conversa com namorada, hobbies relaxantes. Desconexão total do trabalho e estudos.',
            ritualSono: 'Planejar dia seguinte (5min), leitura relaxante, higiene noturna, meditação ou respiração. Preparação para sono reparador.',
            dormir: 'Ambiente escuro, silencioso, temperatura ideal. Sono de 5h30min para despertar revigorado.',

            // Específicas para dias presenciais
            higienePresencial: 'Banho energizante, cuidados pessoais, vestir roupa profissional. Preparação para ambiente corporativo.',
            preparacaoPresencial: 'Revisar agenda, definir metas do dia no trabalho, verificar transporte. Mentalização para produtividade presencial.',
            deslocamento: 'Trajeto para o trabalho: aproveitar para podcast educativo, audiobook ou planejamento mental. Tempo produtivo em trânsito.',
            trabalhoPresencial: 'Foco produtivo no escritório: tarefas prioritárias, reuniões, colaboração com equipe. Máximo aproveitamento do ambiente corporativo.',
            almocoCorporativo: 'Almoço no restaurante da empresa: escolha equilibrada, socialização saudável com colegas. Pausa revigorante.',
            retornoCasa: 'Retorno para casa: momento de transição mental, reflexão sobre o dia, descompressão. Aproveitar trajeto positivamente.',

            // Específicas para sexta-feira
            organizacaoSexta: 'Limpeza geral rápida (aspirar, passar pano): preparar casa para final de semana relaxante.',
            transicaoSexta: 'Revisar progresso do estágio da semana, organizar documentos, preparar relatórios se necessário.',
            fimExpediente: 'Celebração oficial do final de semana! Ritual de encerramento, gratidão pela semana produtiva.',
            tempoLivre: 'Primeira hora de liberdade: relaxar completamente, desconectar do trabalho, aproveitar a conquista.',
            noiteSexta: 'Liberdade total de sexta à noite: sair, ficar em casa, socializar, fazer o que der vontade. Celebração merecida!',

            // Final de semana
            despertarFlexivel: 'Despertar natural sem alarme: corpo descansa o quanto necessário.',
            cafeEspecial: 'Café especial de final de semana: sem pressa, experimentar receitas, aproveitar o ritual.',
            faxina: 'Faxina concentrada de 30-40min em um cômodo específico: manter casa organizada sem stress.',
            lazerExterno: 'Atividade externa obrigatória: praia, parque, caminhada, ciclismo. Conexão com natureza e vitamina D.',
            refeicaoSocial: 'Refeição especial: restaurante com namorada, família ou amigos. Momento social e gastronômico.',
            mealPrep: 'Meal prep estratégico: cozinhar para 2-3 dias, organizar marmitas, otimizar tempo da semana.',
            planejamentoSemanal: 'Planejamento estratégico: revisar agenda, definir 3 prioridades principais, visualizar sucesso da semana. 20-30min máximo.'
        };

        return {
            'Segunda-feira': [
                { time: '06:00 - 06:30', title: 'Despertar & Hidratar', cat: 'Pessoal', icon: '🌅', desc: descriptions.despertar },
                { time: '06:30 - 07:00', title: 'Café da Manhã', cat: 'Pessoal', icon: '☕', desc: descriptions.cafe },
                { time: '07:00 - 07:20', title: 'Organização Rápida', cat: 'Pessoal', icon: '🧹', desc: descriptions.organizacao },
                { time: '07:20 - 07:50', title: 'Higiene Matinal', cat: 'Pessoal', icon: '🚿', desc: descriptions.higiene },
                { time: '07:50 - 08:10', title: 'Preparação Mental', cat: 'Estudo', icon: '🧠', desc: descriptions.preparacaoMental },
                { time: '08:10 - 09:00', title: 'Bloco de Transição', cat: 'Pessoal', icon: '🚶‍♂️', desc: descriptions.transicao },
                { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro)', cat: 'Trabalho', icon: '💼', desc: descriptions.trabalhoManha },
                { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: descriptions.almoco },
                { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro)', cat: 'Trabalho', icon: '💼', desc: descriptions.trabalhoTarde },
                { time: '16:00 - 16:30', title: 'Transição Pós-Trabalho', cat: 'Pessoal', icon: '🧘', desc: descriptions.transicaoPosTrabalho },
                { time: '16:30 - 17:30', title: 'Estudo Estágio', cat: 'Estudo', icon: '📚', desc: descriptions.estudoEstagio },
                { time: '17:30 - 18:20', title: 'Preparação Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: descriptions.preparacaoAcademia },
                { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: descriptions.academia },
                { time: '20:00 - 20:45', title: 'Retorno & Banho', cat: 'Pessoal', icon: '🏠', desc: descriptions.retornoBanho },
                { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: descriptions.jantar },
                { time: '21:15 - 22:30', title: 'Estudo Faculdade', cat: 'Estudo', icon: '📚', desc: descriptions.estudoFaculdade },
                { time: '22:30 - 23:30', title: 'Lazer', cat: 'Lazer', icon: '🎮', desc: descriptions.lazer },
                { time: '23:30 - 00:00', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: descriptions.ritualSono },
                { time: '00:00', title: 'Dormir', cat: 'Pessoal', icon: '😴', desc: descriptions.dormir }
            ],
            'Terça-feira': [
                { time: '06:00 - 06:30', title: 'Despertar & Hidratar', cat: 'Pessoal', icon: '🌅', desc: descriptions.despertar },
                { time: '06:30 - 07:00', title: 'Café da Manhã', cat: 'Pessoal', icon: '☕', desc: descriptions.cafe },
                { time: '07:00 - 07:20', title: 'Organização Rápida', cat: 'Pessoal', icon: '🧹', desc: descriptions.organizacao },
                { time: '07:20 - 07:50', title: 'Higiene Matinal', cat: 'Pessoal', icon: '🚿', desc: descriptions.higienePresencial },
                { time: '07:50 - 08:10', title: 'Preparação Mental', cat: 'Estudo', icon: '🧠', desc: descriptions.preparacaoPresencial },
                { time: '08:10 - 09:00', title: 'Deslocamento', cat: 'Pessoal', icon: '🚌', desc: descriptions.deslocamento },
                { time: '09:00 - 12:00', title: 'Trabalho Presencial', cat: 'Trabalho', icon: '🏢', desc: descriptions.trabalhoPresencial },
                { time: '12:00 - 13:00', title: 'Almoço Corporativo', cat: 'Pessoal', icon: '🍽️', desc: descriptions.almocoCorporativo },
                { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro)', cat: 'Trabalho', icon: '💼', desc: descriptions.trabalhoTarde },
                { time: '16:00 - 17:30', title: 'Retorno para Casa', cat: 'Pessoal', icon: '🚌', desc: descriptions.retornoCasa },
                { time: '17:30 - 18:20', title: 'Preparação Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: descriptions.preparacaoAcademia },
                { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: descriptions.academia },
                { time: '20:00 - 20:45', title: 'Retorno & Banho', cat: 'Pessoal', icon: '🏠', desc: descriptions.retornoBanho },
                { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: descriptions.jantar },
                { time: '21:15 - 22:30', title: 'Estudo Faculdade', cat: 'Estudo', icon: '📚', desc: descriptions.estudoFaculdade },
                { time: '22:30 - 23:30', title: 'Lazer', cat: 'Lazer', icon: '🎮', desc: descriptions.lazer },
                { time: '23:30 - 00:00', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: descriptions.ritualSono },
                { time: '00:00', title: 'Dormir', cat: 'Pessoal', icon: '😴', desc: descriptions.dormir }
            ],
            'Quarta-feira': [
                { time: '06:00 - 06:30', title: 'Despertar & Hidratar', cat: 'Pessoal', icon: '🌅', desc: descriptions.despertar },
                { time: '06:30 - 07:00', title: 'Café da Manhã', cat: 'Pessoal', icon: '☕', desc: descriptions.cafe },
                { time: '07:00 - 07:20', title: 'Organização Rápida', cat: 'Pessoal', icon: '🧹', desc: descriptions.organizacao },
                { time: '07:20 - 07:50', title: 'Higiene Matinal', cat: 'Pessoal', icon: '🚿', desc: descriptions.higiene },
                { time: '07:50 - 08:10', title: 'Preparação Mental', cat: 'Estudo', icon: '🧠', desc: descriptions.preparacaoMental },
                { time: '08:10 - 09:00', title: 'Bloco de Transição', cat: 'Pessoal', icon: '🚶‍♂️', desc: descriptions.transicao },
                { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro)', cat: 'Trabalho', icon: '💼', desc: descriptions.trabalhoManha },
                { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: descriptions.almoco },
                { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro)', cat: 'Trabalho', icon: '💼', desc: descriptions.trabalhoTarde },
                { time: '16:00 - 16:30', title: 'Transição Pós-Trabalho', cat: 'Pessoal', icon: '🧘', desc: descriptions.transicaoPosTrabalho },
                { time: '16:30 - 17:30', title: 'Estudo Estágio', cat: 'Estudo', icon: '📚', desc: descriptions.estudoEstagio },
                { time: '17:30 - 18:20', title: 'Preparação Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: descriptions.preparacaoAcademia },
                { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: descriptions.academia },
                { time: '20:00 - 20:45', title: 'Retorno & Banho', cat: 'Pessoal', icon: '🏠', desc: descriptions.retornoBanho },
                { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: descriptions.jantar },
                { time: '21:15 - 22:30', title: 'Estudo Faculdade', cat: 'Estudo', icon: '📚', desc: descriptions.estudoFaculdade },
                { time: '22:30 - 23:30', title: 'Lazer', cat: 'Lazer', icon: '🎮', desc: descriptions.lazer },
                { time: '23:30 - 00:00', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: descriptions.ritualSono },
                { time: '00:00', title: 'Dormir', cat: 'Pessoal', icon: '😴', desc: descriptions.dormir }
            ],
            'Quinta-feira': [
                { time: '06:00 - 06:30', title: 'Despertar & Hidratar', cat: 'Pessoal', icon: '🌅', desc: descriptions.despertar },
                { time: '06:30 - 07:00', title: 'Café da Manhã', cat: 'Pessoal', icon: '☕', desc: descriptions.cafe },
                { time: '07:00 - 07:20', title: 'Organização Rápida', cat: 'Pessoal', icon: '🧹', desc: descriptions.organizacao },
                { time: '07:20 - 07:50', title: 'Higiene Matinal', cat: 'Pessoal', icon: '🚿', desc: descriptions.higienePresencial },
                { time: '07:50 - 08:10', title: 'Preparação Mental', cat: 'Estudo', icon: '🧠', desc: descriptions.preparacaoPresencial },
                { time: '08:10 - 09:00', title: 'Deslocamento', cat: 'Pessoal', icon: '🚌', desc: descriptions.deslocamento },
                { time: '09:00 - 12:00', title: 'Trabalho Presencial', cat: 'Trabalho', icon: '🏢', desc: descriptions.trabalhoPresencial },
                { time: '12:00 - 13:00', title: 'Almoço Corporativo', cat: 'Pessoal', icon: '🍽️', desc: descriptions.almocoCorporativo },
                { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro)', cat: 'Trabalho', icon: '💼', desc: descriptions.trabalhoTarde },
                { time: '16:00 - 17:30', title: 'Retorno para Casa', cat: 'Pessoal', icon: '🚌', desc: descriptions.retornoCasa },
                { time: '17:30 - 18:20', title: 'Preparação Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: descriptions.preparacaoAcademia },
                { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: descriptions.academia },
                { time: '20:00 - 20:45', title: 'Retorno & Banho', cat: 'Pessoal', icon: '🏠', desc: descriptions.retornoBanho },
                { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: descriptions.jantar },
                { time: '21:15 - 22:30', title: 'Estudo Faculdade', cat: 'Estudo', icon: '📚', desc: descriptions.estudoFaculdade },
                { time: '22:30 - 23:30', title: 'Lazer', cat: 'Lazer', icon: '🎮', desc: descriptions.lazer },
                { time: '23:30 - 00:00', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: descriptions.ritualSono },
                { time: '00:00', title: 'Dormir', cat: 'Pessoal', icon: '😴', desc: descriptions.dormir }
            ],
            'Sexta-feira': [
                { time: '06:00 - 06:30', title: 'Despertar & Hidratar', cat: 'Pessoal', icon: '🌅', desc: descriptions.despertar },
                { time: '06:30 - 07:00', title: 'Café da Manhã', cat: 'Pessoal', icon: '☕', desc: descriptions.cafe },
                { time: '07:00 - 07:20', title: 'Organização da Casa', cat: 'Pessoal', icon: '🧹', desc: descriptions.organizacaoSexta },
                { time: '07:20 - 07:50', title: 'Higiene Matinal', cat: 'Pessoal', icon: '🚿', desc: descriptions.higiene },
                { time: '07:50 - 08:10', title: 'Preparação Mental', cat: 'Estudo', icon: '🧠', desc: descriptions.preparacaoMental },
                { time: '08:10 - 09:00', title: 'Bloco de Transição', cat: 'Pessoal', icon: '🚶‍♂️', desc: descriptions.transicaoSexta },
                { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro)', cat: 'Trabalho', icon: '💼', desc: descriptions.trabalhoManha },
                { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: descriptions.almoco },
                { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro)', cat: 'Trabalho', icon: '💼', desc: descriptions.trabalhoTarde },
                { time: '16:00 - 16:30', title: 'Fim de Expediente!', cat: 'Lazer', icon: '🎉', desc: descriptions.fimExpediente },
                { time: '16:30 - 17:30', title: 'Tempo Livre', cat: 'Lazer', icon: '🎮', desc: descriptions.tempoLivre },
                { time: '17:30 - 18:20', title: 'Preparação Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: descriptions.preparacaoAcademia },
                { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: descriptions.academia },
                { time: '20:00 - 20:45', title: 'Retorno & Banho', cat: 'Pessoal', icon: '🏠', desc: descriptions.retornoBanho },
                { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: descriptions.jantar },
                { time: '21:15 - 00:00', title: 'Noite Livre', cat: 'Lazer', icon: '🥳', desc: descriptions.noiteSexta },
                { time: '00:00 - 00:30', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: descriptions.ritualSono },
                { time: '00:30', title: 'Dormir', cat: 'Pessoal', icon: '😴', desc: descriptions.dormir }
            ],
            'Sábado': [
                { time: 'Manhã', title: 'Despertar Flexível', cat: 'Lazer', icon: '😴', desc: descriptions.despertarFlexivel },
                { time: 'Manhã', title: 'Café Especial', cat: 'Pessoal', icon: '☕', desc: descriptions.cafeEspecial },
                { time: 'Manhã', title: 'Organização da Casa', cat: 'Pessoal', icon: '🧹', desc: descriptions.faxina },
                { time: 'Tarde', title: 'Lazer ao Ar Livre', cat: 'Lazer', icon: '☀️', desc: descriptions.lazerExterno },
                { time: 'Tarde', title: 'Almoço Social', cat: 'Pessoal', icon: '🍽️', desc: descriptions.refeicaoSocial },
                { time: 'Noite', title: 'Entretenimento', cat: 'Lazer', icon: '🎮', desc: descriptions.lazer },
                { time: 'Noite', title: 'Jantar Social', cat: 'Pessoal', icon: '🥗', desc: descriptions.refeicaoSocial },
                { time: 'Tarde da Noite', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: descriptions.ritualSono }
            ],
            'Domingo': [
                { time: 'Manhã', title: 'Despertar Flexível', cat: 'Lazer', icon: '😴', desc: descriptions.despertarFlexivel },
                { time: 'Manhã', title: 'Café Especial', cat: 'Pessoal', icon: '☕', desc: descriptions.cafeEspecial },
                { time: 'Manhã', title: 'Descanso', cat: 'Lazer', icon: '🧘', desc: descriptions.lazer },
                { time: 'Tarde', title: 'Atividade Externa', cat: 'Lazer', icon: '☀️', desc: descriptions.lazerExterno },
                { time: 'Tarde', title: 'Almoço Família', cat: 'Pessoal', icon: '🍽️', desc: descriptions.refeicaoSocial },
                { time: 'Fim da Tarde', title: 'Meal Prep', cat: 'Pessoal', icon: '🧑‍🍳', desc: descriptions.mealPrep },
                { time: 'Noite', title: 'Leitura', cat: 'Lazer', icon: '📚', desc: descriptions.lazer },
                { time: 'Noite', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: descriptions.jantar },
                { time: 'Fim da Noite', title: 'Planejamento Semanal', cat: 'Estudo', icon: '📋', desc: descriptions.planejamentoSemanal }
            ]
        };
    }
}

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new RoutineApp();
});