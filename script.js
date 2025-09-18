document.addEventListener('DOMContentLoaded', function() {
    // Descrições padrão reutilizáveis
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

    // Dados das rotinas por dia da semana
    const scheduleData = {
        'Segunda-feira': [
            { time: '06:00 - 06:30', title: 'Despertar & Hidratar', cat: 'Pessoal', icon: '🌅', desc: descriptions.despertar },
            { time: '06:30 - 07:00', title: 'Café da Manhã', cat: 'Pessoal', icon: '☕', desc: descriptions.cafe },
            { time: '07:00 - 07:20', title: 'Organização Rápida', cat: 'Pessoal', icon: '🧹', desc: descriptions.organizacao },
            { time: '07:20 - 07:50', title: 'Higiene Matinal', cat: 'Pessoal', icon: '🚿', desc: descriptions.higiene },
            { time: '07:50 - 08:10', title: 'Preparação Mental', cat: 'Estudo', icon: '🧠', desc: descriptions.preparacaoMental },
            { time: '08:10 - 09:00', title: 'Bloco de Transição', cat: 'Pessoal', icon: '🚶‍♂️', desc: descriptions.transicao },
            { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: descriptions.trabalhoManha },
            { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: descriptions.almoco },
            { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: descriptions.trabalhoTarde },
            { time: '16:00 - 16:30', title: 'Transição Pós-Trabalho', cat: 'Pessoal', icon: '🧘', desc: descriptions.transicaoPosTrabalho },
            { time: '16:30 - 17:30', title: 'Estudo Estágio (1x Pomodoro 50/10)', cat: 'Estudo', icon: '🟢', desc: descriptions.estudoEstagio },
            { time: '17:30 - 18:20', title: 'Preparação para Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: descriptions.preparacaoAcademia },
            { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: descriptions.academia },
            { time: '20:00 - 20:45', title: 'Retorno & Banho Relaxante', cat: 'Pessoal', icon: '🏠', desc: descriptions.retornoBanho },
            { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: descriptions.jantar },
            { time: '21:15 - 22:30', title: 'Estudo Faculdade (1x Pomodoro 50/25)', cat: 'Estudo', icon: '🟢', desc: descriptions.estudoFaculdade },
            { time: '22:30 - 23:30', title: 'Lazer', cat: 'Lazer', icon: '🟣', desc: descriptions.lazer },
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
            { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: descriptions.trabalhoPresencial },
            { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: descriptions.almocoCorporativo },
            { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: descriptions.trabalhoTarde },
            { time: '16:00 - 17:30', title: 'Deslocamento para Casa', cat: 'Pessoal', icon: '🚌', desc: descriptions.retornoCasa },
            { time: '17:30 - 18:20', title: 'Preparação para Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: descriptions.preparacaoAcademia },
            { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: descriptions.academia },
            { time: '20:00 - 20:45', title: 'Retorno & Banho Relaxante', cat: 'Pessoal', icon: '🏠', desc: descriptions.retornoBanho },
            { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: descriptions.jantar },
            { time: '21:15 - 22:30', title: 'Estudo Faculdade (1x Pomodoro 50/25)', cat: 'Estudo', icon: '🟢', desc: descriptions.estudoFaculdade },
            { time: '22:30 - 23:30', title: 'Lazer', cat: 'Lazer', icon: '🟣', desc: descriptions.lazer },
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
            { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: descriptions.trabalhoManha },
            { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: descriptions.almoco },
            { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: descriptions.trabalhoTarde },
            { time: '16:00 - 16:30', title: 'Transição Pós-Trabalho', cat: 'Pessoal', icon: '🧘', desc: descriptions.transicaoPosTrabalho },
            { time: '16:30 - 17:30', title: 'Estudo Estágio (1x Pomodoro 50/10)', cat: 'Estudo', icon: '🟢', desc: descriptions.estudoEstagio },
            { time: '17:30 - 18:20', title: 'Preparação para Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: descriptions.preparacaoAcademia },
            { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: descriptions.academia },
            { time: '20:00 - 20:45', title: 'Retorno & Banho Relaxante', cat: 'Pessoal', icon: '🏠', desc: descriptions.retornoBanho },
            { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: descriptions.jantar },
            { time: '21:15 - 22:30', title: 'Estudo Faculdade (1x Pomodoro 50/25)', cat: 'Estudo', icon: '🟢', desc: descriptions.estudoFaculdade },
            { time: '22:30 - 23:30', title: 'Lazer', cat: 'Lazer', icon: '🟣', desc: descriptions.lazer },
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
            { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: descriptions.trabalhoPresencial },
            { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: descriptions.almocoCorporativo },
            { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: descriptions.trabalhoTarde },
            { time: '16:00 - 17:30', title: 'Deslocamento para Casa', cat: 'Pessoal', icon: '🚌', desc: descriptions.retornoCasa },
            { time: '17:30 - 18:20', title: 'Preparação para Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: descriptions.preparacaoAcademia },
            { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: descriptions.academia },
            { time: '20:00 - 20:45', title: 'Retorno & Banho Relaxante', cat: 'Pessoal', icon: '🏠', desc: descriptions.retornoBanho },
            { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: descriptions.jantar },
            { time: '21:15 - 22:30', title: 'Estudo Faculdade (1x Pomodoro 50/25)', cat: 'Estudo', icon: '🟢', desc: descriptions.estudoFaculdade },
            { time: '22:30 - 23:30', title: 'Lazer', cat: 'Lazer', icon: '🟣', desc: descriptions.lazer },
            { time: '23:30 - 00:00', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: descriptions.ritualSono },
            { time: '00:00', title: 'Dormir', cat: 'Pessoal', icon: '😴', desc: descriptions.dormir }
        ],
        'Sexta-feira': [
            { time: '06:00 - 06:30', title: 'Despertar & Hidratar', cat: 'Pessoal', icon: '🌅', desc: descriptions.despertar },
            { time: '06:30 - 07:00', title: 'Café da Manhã', cat: 'Pessoal', icon: '☕', desc: descriptions.cafe },
            { time: '07:00 - 07:20', title: 'Organização Rápida', cat: 'Pessoal', icon: '🧹', desc: descriptions.organizacaoSexta },
            { time: '07:20 - 07:50', title: 'Higiene Matinal', cat: 'Pessoal', icon: '🚿', desc: descriptions.higiene },
            { time: '07:50 - 08:10', title: 'Preparação Mental', cat: 'Estudo', icon: '🧠', desc: descriptions.preparacaoMental },
            { time: '08:10 - 09:00', title: 'Bloco de Transição', cat: 'Pessoal', icon: '🚶‍♂️', desc: descriptions.transicaoSexta },
            { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: descriptions.trabalhoManha },
            { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: descriptions.almoco },
            { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: descriptions.trabalhoTarde },
            { time: '16:00 - 16:30', title: 'Fim de Expediente!', cat: 'Lazer', icon: '🧘', desc: descriptions.fimExpediente },
            { time: '16:30 - 17:30', title: 'Tempo Livre', cat: 'Lazer', icon: '🟣', desc: descriptions.tempoLivre },
            { time: '17:30 - 18:20', title: 'Preparação para Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: descriptions.preparacaoAcademia },
            { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: descriptions.academia },
            { time: '20:00 - 20:45', title: 'Retorno & Banho Relaxante', cat: 'Pessoal', icon: '🏠', desc: descriptions.retornoBanho },
            { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: descriptions.jantar },
            { time: '21:15 - 00:00', title: 'Noite Livre / Social', cat: 'Lazer', icon: '🥳', desc: descriptions.noiteSexta },
            { time: '00:00 - 00:30', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: descriptions.ritualSono },
            { time: '00:30', title: 'Dormir', cat: 'Pessoal', icon: '😴', desc: descriptions.dormir }
        ],
        'Sábado': [
            { time: 'Manhã', title: 'Sono / Despertar Flexível', cat: 'Lazer', icon: '😴', desc: descriptions.despertarFlexivel },
            { time: 'Manhã', title: 'Café da Manhã / Brunch', cat: 'Pessoal', icon: '☕', desc: descriptions.cafeEspecial },
            { time: 'Manhã', title: 'Organização da Casa', cat: 'Pessoal', icon: '🧹', desc: descriptions.faxina },
            { time: 'Tarde', title: 'Lazer ao Ar Livre / Praia', cat: 'Lazer', icon: '☀️', desc: descriptions.lazerExterno },
            { time: 'Tarde', title: 'Almoço Social', cat: 'Pessoal', icon: '🍽️', desc: descriptions.refeicaoSocial },
            { time: 'Noite', title: 'Lazer / Filme / Série', cat: 'Lazer', icon: '🟣', desc: descriptions.lazer },
            { time: 'Noite', title: 'Jantar Social', cat: 'Pessoal', icon: '🥗', desc: descriptions.refeicaoSocial },
            { time: 'Fim da Noite', title: 'Ritual do Sono Flexível', cat: 'Pessoal', icon: '🌙', desc: descriptions.ritualSono }
        ],
        'Domingo': [
            { time: 'Manhã', title: 'Sono / Despertar Flexível', cat: 'Lazer', icon: '😴', desc: descriptions.despertarFlexivel },
            { time: 'Manhã', title: 'Café da Manhã / Brunch', cat: 'Pessoal', icon: '☕', desc: descriptions.cafeEspecial },
            { time: 'Manhã', title: 'Descanso / Hobby', cat: 'Lazer', icon: '🧘', desc: descriptions.lazer },
            { time: 'Tarde', title: 'Lazer ao Ar Livre ou Descanso', cat: 'Lazer', icon: '☀️', desc: descriptions.lazerExterno },
            { time: 'Tarde', title: 'Almoço em Família / Social', cat: 'Pessoal', icon: '🍽️', desc: descriptions.refeicaoSocial },
            { time: 'Fim da Tarde', title: 'Preparar Comida da Semana', cat: 'Pessoal', icon: '🧑‍🍳', desc: descriptions.mealPrep },
            { time: 'Noite', title: 'Lazer / Leitura', cat: 'Lazer', icon: '🟣', desc: descriptions.lazer },
            { time: 'Noite', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: descriptions.jantar },
            { time: 'Fim da Noite', title: 'Planejamento da Semana', cat: 'Estudo', icon: '🧠', desc: descriptions.planejamentoSemanal }
        ],
    };

    // Elementos do DOM
    const scheduleContainer = document.getElementById('schedule-container');
    const calendarContainer = document.getElementById('calendar-container');
    const tasksListElement = document.getElementById('tasks-list');
    const calendarToggle = document.getElementById('calendar-toggle');
    
    // Data atual
    let currentDate = new Date();
    let currentView = 'schedule';
    let currentCalendarDate = new Date();

    // Cores das categorias
    const categoryColors = {
        'Trabalho': '#0ea5e9',
        'Estudo': '#10b981',
        'Pessoal': '#f59e0b',
        'Movimento': '#f43f5e',
        'Lazer': '#8b5cf6',
    };

    // Funções principais
    function updateDateBar() {
        const currentDateElement = document.getElementById('current-date');
        const currentWeekdayElement = document.getElementById('current-weekday');
        
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        const dateString = currentDate.toLocaleDateString('pt-BR', options);
        const [weekday, ...dateParts] = dateString.split(', ');
        
        currentWeekdayElement.textContent = weekday.charAt(0).toUpperCase() + weekday.slice(1);
        currentDateElement.textContent = dateParts.join(', ');
    }

    function getCurrentDayName() {
        const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        return days[currentDate.getDay()];
    }

    function getCurrentDateString() {
        return currentDate.toISOString().split('T')[0];
    }

    function getTodayTasks() {
        const dayName = getCurrentDayName();
        return scheduleData[dayName] || [];
    }

    function renderTodayTasks() {
        const tasks = getTodayTasks();
        const dayName = getCurrentDayName();
        const dateString = getCurrentDateString();
        
        // Atualizar título
        document.getElementById('schedule-title').textContent = `Rotina de ${dayName}`;
        document.getElementById('total-tasks').textContent = tasks.length;
        
        // Recuperar progresso salvo
        const dayProgress = JSON.parse(localStorage.getItem('dailyProgress') || '{}');
        const todayChecks = dayProgress[dateString] || {};
        
        // Limpar lista
        tasksListElement.innerHTML = '';
        
        // Renderizar tarefas
        tasks.forEach((task, idx) => {
            const isChecked = todayChecks[idx] || false;
            const color = categoryColors[task.cat] || '#64748b';
            
            const taskCard = document.createElement('div');
            taskCard.className = `task-card p-4 rounded-lg border ${isChecked ? 'completed' : ''}`;
            taskCard.style.borderLeftColor = color;
            
            taskCard.innerHTML = `
                <div class="flex items-start space-x-4">
                    <input type="checkbox" 
                           class="mt-2 w-5 h-5 accent-sky-500 flex-shrink-0" 
                           data-idx="${idx}" 
                           ${isChecked ? 'checked' : ''}>
                    <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" 
                         style="background-color: ${color}20;">
                        <span class="text-2xl">${task.icon}</span>
                    </div>
                    <div class="flex-grow">
                        <div class="flex justify-between items-baseline">
                            <h3 class="font-bold text-slate-800">${task.title}</h3>
                            <span class="text-xs font-medium text-slate-500">${task.time}</span>
                        </div>
                        <p class="text-slate-600 text-sm mt-1">${task.desc}</p>
                        <span class="inline-block mt-2 px-2 py-1 text-xs rounded-full" 
                              style="background-color: ${color}20; color: ${color};">${task.cat}</span>
                    </div>
                </div>
            `;
            
            tasksListElement.appendChild(taskCard);
        });
        
        // Adicionar event listeners para checkboxes
        tasksListElement.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const idx = parseInt(this.getAttribute('data-idx'));
                const dateString = getCurrentDateString();
                
                // Salvar progresso
                const dayProgress = JSON.parse(localStorage.getItem('dailyProgress') || '{}');
                if (!dayProgress[dateString]) dayProgress[dateString] = {};
                dayProgress[dateString][idx] = this.checked;
                localStorage.setItem('dailyProgress', JSON.stringify(dayProgress));
                
                // Atualizar visual
                const taskCard = this.closest('.task-card');
                if (this.checked) {
                    taskCard.classList.add('completed');
                } else {
                    taskCard.classList.remove('completed');
                }
            });
        });
    }

    // Funções do calendário
    function toggleView() {
        if (currentView === 'schedule') {
            currentView = 'calendar';
            scheduleContainer.classList.add('hidden');
            calendarContainer.classList.remove('hidden');
            calendarToggle.textContent = '📋 Tarefas';
            renderCalendar();
        } else {
            currentView = 'schedule';
            scheduleContainer.classList.remove('hidden');
            calendarContainer.classList.add('hidden');
            calendarToggle.textContent = '📅 Calendário';
        }
    }

    function renderCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthElement = document.getElementById('current-month');
        
        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();
        
        // Atualizar título do mês
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                           'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        // Limpar calendário
        calendarGrid.innerHTML = '';
        
        // Cabeçalhos dos dias da semana
        const dayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });
        
        // Gerar dias do calendário
        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = currentDate.getDate();
            
            if (currentDate.getMonth() !== month) {
                dayElement.classList.add('other-month');
            }
            
            // Verificar se é hoje
            const today = new Date();
            if (currentDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }
            
            // Calcular progresso
            const dateString = currentDate.toISOString().split('T')[0];
            const dayProgress = JSON.parse(localStorage.getItem('dailyProgress') || '{}');
            const dayChecks = dayProgress[dateString] || {};
            const dayName = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'][currentDate.getDay()];
            const dayTasks = scheduleData[dayName] || [];
            
            if (dayTasks.length > 0) {
                const completedTasks = Object.values(dayChecks).filter(Boolean).length;
                const percentage = (completedTasks / dayTasks.length) * 100;
                
                if (percentage > 0) {
                    dayElement.classList.add('has-progress');
                    const progressIndicator = document.createElement('div');
                    progressIndicator.className = 'progress-indicator';
                    
                    if (percentage <= 25) progressIndicator.classList.add('bg-green-200');
                    else if (percentage <= 50) progressIndicator.classList.add('bg-green-300');
                    else if (percentage <= 75) progressIndicator.classList.add('bg-green-400');
                    else progressIndicator.classList.add('bg-green-500');
                    
                    dayElement.appendChild(progressIndicator);
                    dayElement.title = `${dayName}: ${Math.round(percentage)}% completo (${completedTasks}/${dayTasks.length})`;
                }
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }

    // Event Listeners
    calendarToggle.addEventListener('click', toggleView);
    
    document.getElementById('prev-month').addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar();
    });

    // Inicialização
    updateDateBar();
    renderTodayTasks();
    
    // Atualizar a cada minuto (para mudança de dia)
    setInterval(() => {
        const newDate = new Date();
        if (newDate.toDateString() !== currentDate.toDateString()) {
            currentDate = newDate;
            updateDateBar();
            renderTodayTasks();
        }
    }, 60000);
});