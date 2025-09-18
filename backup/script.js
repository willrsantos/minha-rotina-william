document.addEventListener('DOMContentLoaded', function() {
    // Dados das rotinas por dia da semana
    const scheduleData = {
        'Segunda-feira': [
            { time: '06:00 - 06:30', title: 'Despertar & Hidratar', cat: 'Pessoal', icon: '🌅', desc: 'Acordar naturalmente, beber 500ml de água em temperatura ambiente, abrir janelas para ventilação. Evitar celular por 30 minutos.' },
            { time: '06:30 - 07:00', title: 'Café da Manhã', cat: 'Pessoal', icon: '☕', desc: 'Refeição nutritiva e balanceada: proteína + carboidrato + fruta. Comer devagar, sem telas, focando na alimentação.' },
            { time: '07:00 - 07:20', title: 'Organização Rápida', cat: 'Pessoal', icon: '🧹', desc: 'Arrumar a cama, organizar mesa de trabalho, lavar louça do café. Preparar ambiente para o dia produtivo.' },
            { time: '07:20 - 07:50', title: 'Higiene Matinal', cat: 'Pessoal', icon: '🚿', desc: 'Banho revigorante, cuidados pessoais completos, vestir roupa confortável para home office. Preparação física e mental.' },
            { time: '07:50 - 08:10', title: 'Preparação Mental', cat: 'Estudo', icon: '🧠', desc: 'Revisar agenda do dia, definir 3 prioridades principais, organizar material de trabalho. Mentalização para foco produtivo.' },
            { time: '08:10 - 09:00', title: 'Bloco de Transição', cat: 'Pessoal', icon: '🚶‍♂️', desc: 'Caminhada de 20min ao ar livre ou alongamento, respiração consciente, leitura de 10min. Preparação corpo-mente.' },
            { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: 'Foco total nas tarefas mais importantes do estágio. 3 ciclos de 50min trabalho + 10min pausa. Celular no modo avião.' },
            { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: 'Refeição equilibrada preparada em casa. Mastigar devagar, hidratar bem. 15min de descanso pós-refeição.' },
            { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: 'Conclusão das demandas do dia. 3 ciclos focados. Últimos 10min para organizar tarefas do dia seguinte e fazer handoff.' },
            { time: '16:00 - 16:30', title: 'Transição Pós-Trabalho', cat: 'Pessoal', icon: '🧘', desc: 'Rituais de encerramento: salvar trabalhos, fechar programas, lanche saudável. Transição mental trabalho → vida pessoal.' },
            { time: '16:30 - 17:30', title: 'Estudo Estágio (1x Pomodoro 50/10)', cat: 'Estudo', icon: '🟢', desc: 'Aprofundar conhecimentos relacionados ao estágio: tecnologias, conceitos, cursos online. Aprendizado ativo com anotações.' },
            { time: '17:30 - 18:20', title: 'Preparação para Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: 'Lanche pré-treino (banana + aveia), trocar roupa esportiva, hidratar, deslocamento. Mentalizar treino produtivo.' },
            { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: 'Treino completo com aquecimento (10min), musculação (70min), alongamento (10min). Treino em dupla com a namorada para motivação.' },
            { time: '20:00 - 20:45', title: 'Retorno & Banho Relaxante', cat: 'Pessoal', icon: '🏠', desc: 'Deslocamento de volta, banho relaxante com água morna, trocar para roupas confortáveis. Transição física e mental.' },
            { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: 'Refeição leve e nutritiva: proteína magra + vegetais + carboidrato complexo. Evitar excesso antes do estudo.' },
            { time: '21:15 - 22:30', title: 'Estudo Faculdade (1x Pomodoro 50/25)', cat: 'Estudo', icon: '🟢', desc: 'Foco no Projeto Integrador: desenvolvimento, documentação, pesquisas. Ambiente silencioso, técnica Pomodoro adaptada.' },
            { time: '22:30 - 00:00', title: 'Lazer', cat: 'Lazer', icon: '🟣', desc: 'Tempo de qualidade: filme, série, conversa com namorada, hobbies relaxantes. Desconexão total do trabalho e estudos.' },
            { time: '00:00 - 00:30', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: 'Planejar dia seguinte (5min), leitura relaxante, higiene noturna, meditação ou respiração. Preparação para sono reparador.' },
            { time: '00:30', title: 'Dormir', cat: 'Pessoal', icon: '😴', desc: 'Ambiente escuro, silencioso, temperatura ideal. Sono de 5h30min para despertar revigorado.' }
        ],
        'Terça-feira': [
            { time: '06:00 - 06:30', title: 'Despertar & Hidratar', cat: 'Pessoal', icon: '🌅', desc: 'Acordar naturalmente, beber 500ml de água, abrir janelas. Evitar celular por 30 minutos para clareza mental.' },
            { time: '06:30 - 07:00', title: 'Café da Manhã', cat: 'Pessoal', icon: '☕', desc: 'Refeição energética para dia presencial: aveia + frutas + proteína. Refeição consciente e nutritiva.' },
            { time: '07:00 - 07:20', title: 'Organização Rápida', cat: 'Pessoal', icon: '🧹', desc: 'Arrumar quarto e banheiro, preparar materiais para o trabalho, organizar bolsa/mochila. Deixar casa em ordem.' },
            { time: '07:20 - 07:50', title: 'Higiene Matinal', cat: 'Pessoal', icon: '🚿', desc: 'Banho energizante, cuidados pessoais, vestir roupa profissional. Preparação para ambiente corporativo.' },
            { time: '07:50 - 08:10', title: 'Preparação Mental', cat: 'Estudo', icon: '🧠', desc: 'Revisar agenda, definir metas do dia no trabalho, verificar transporte. Mentalização para produtividade presencial.' },
            { time: '08:10 - 09:00', title: 'Deslocamento', cat: 'Pessoal', icon: '🚌', desc: 'Trajeto para o trabalho: aproveitar para podcast educativo, audiobook ou planejamento mental. Tempo produtivo em trânsito.' },
            { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: 'Manhã produtiva no escritório: tarefas prioritárias, reuniões, colaboração com equipe. Máximo aproveitamento do ambiente corporativo.' },
            { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: 'Almoço no restaurante da empresa: escolha equilibrada, socialização saudável com colegas. Pausa revigorante.' },
            { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: 'Tarde focada: conclusão de demandas, alinhamentos necessários. Últimos 10min para organizar próximo dia.' },
            { time: '16:00 - 17:30', title: 'Deslocamento para Casa', cat: 'Pessoal', icon: '🚌', desc: 'Retorno para casa: momento de transição mental, reflexão sobre o dia, descompressão. Aproveitar trajeto positivamente.' },
            { time: '17:30 - 18:20', title: 'Preparação para Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: 'Lanche pré-treino, troca de roupa, hidratação. Preparação física e mental para treino em dupla.' },
            { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: 'Treino intenso: aquecimento + musculação + cardio + alongamento. Parceria com namorada para motivação mútua.' },
            { time: '20:00 - 20:45', title: 'Retorno & Banho Relaxante', cat: 'Pessoal', icon: '🏠', desc: 'Volta para casa, banho relaxante, roupas confortáveis. Transição do modo esportivo para modo estudo.' },
            { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: 'Jantar balanceado e leve: ideal para manter energia para estudos noturnos sem peso no estômago.' },
            { time: '21:15 - 22:30', title: 'Estudo Faculdade (1x Pomodoro 50/25)', cat: 'Estudo', icon: '🟢', desc: 'Revisão de matérias, exercícios, leituras programadas. Foco em disciplinas com maior dificuldade ou proximidade de provas.' },
            { time: '22:30 - 00:00', title: 'Lazer', cat: 'Lazer', icon: '🟣', desc: 'Entretenimento relaxante: série, filme, conversa, hobbies. Momento de conexão pessoal e descontração.' },
            { time: '00:00 - 00:30', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: 'Planejamento rápido do dia seguinte, leitura, higiene noturna, relaxamento. Preparação para sono restaurador.' },
            { time: '00:30', title: 'Dormir', cat: 'Pessoal', icon: '😴', desc: 'Sono reparador de 5h30min para acordar energizado para outro dia produtivo.' }
        ],
        'Quarta-feira': [
            { time: '06:00 - 06:30', title: 'Despertar & Hidratar', cat: 'Pessoal', icon: '🌅', desc: 'Despertar consciente, hidratação imediata, ventilação do ambiente. Início positivo para meio da semana.' },
            { time: '06:30 - 07:00', title: 'Café da Manhã', cat: 'Pessoal', icon: '☕', desc: 'Refeição energética para sustentar a manhã: carboidratos complexos + proteína + vitaminas.' },
            { time: '07:00 - 07:20', title: 'Organização Rápida', cat: 'Pessoal', icon: '🧹', desc: 'Organizar lixo para coleta, arrumar sala de estar, preparar espaço de trabalho. Meio da semana organizado.' },
            { time: '07:20 - 07:50', title: 'Higiene Matinal', cat: 'Pessoal', icon: '🚿', desc: 'Banho revigorante, cuidados pessoais, preparação para home office. Renovação para metade da semana.' },
            { time: '07:50 - 08:10', title: 'Preparação Mental', cat: 'Estudo', icon: '🧠', desc: 'Revisar metas da semana, ajustar planejamento se necessário, definir prioridades do dia.' },
            { time: '08:10 - 09:00', title: 'Bloco de Transição', cat: 'Pessoal', icon: '🚶‍♂️', desc: 'Organizar materiais da faculdade, leitura técnica ou exercícios de alongamento. Preparação corpo-mente.' },
            { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: 'Manhã de alta produtividade: tarefas complexas que exigem concentração máxima. Meio da semana com energia total.' },
            { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: 'Almoço caseiro nutritivo, pausa verdadeira do trabalho, hidratação adequada. Recarga para tarde produtiva.' },
            { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: 'Conclusão de projetos importantes, alinhamentos de meio de semana. Finalizar com organização do dia seguinte.' },
            { time: '16:00 - 16:30', title: 'Transição Pós-Trabalho', cat: 'Pessoal', icon: '🧘', desc: 'Pausa consciente, lanche saudável, exercícios de respiração. Reset mental para atividades pessoais.' },
            { time: '16:30 - 17:30', title: 'Estudo Estágio (1x Pomodoro 50/10)', cat: 'Estudo', icon: '🟢', desc: 'Aprofundamento em demandas específicas: pesquisa, experimentação, documentação. Evolução técnica contínua.' },
            { time: '17:30 - 18:20', title: 'Preparação para Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: 'Lanche energético, equipamentos esportivos, mentalização para treino. Preparação para exercitar em dupla.' },
            { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: 'Treino de meio de semana: força + resistência + flexibilidade. Treino motivado pela parceria com namorada.' },
            { time: '20:00 - 20:45', title: 'Retorno & Banho Relaxante', cat: 'Pessoal', icon: '🏠', desc: 'Deslocamento calmo, banho relaxante, preparação para noite de estudos. Transição suave pós-exercício.' },
            { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: 'Refeição leve e nutritiva: recuperação pós-treino + preparação para estudo noturno.' },
            { time: '21:15 - 22:30', title: 'Estudo Faculdade (1x Pomodoro 50/25)', cat: 'Estudo', icon: '🟢', desc: 'Foco no Projeto Integrador: desenvolvimento ativo, testes, documentação. Progresso consistente no projeto principal.' },
            { time: '22:30 - 00:00', title: 'Lazer', cat: 'Lazer', icon: '🟣', desc: 'Lazer de meio de semana: entretenimento leve, conexão pessoal, atividades relaxantes.' },
            { time: '00:00 - 00:30', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: 'Reflexão sobre meio da semana, planejamento ajustado, relaxamento. Preparação para sono reparador.' },
            { time: '00:30', title: 'Dormir', cat: 'Pessoal', icon: '😴', desc: 'Sono tranquilo para recuperar energia e enfrentar os próximos dias com disposição.' }
        ],
        'Quinta-feira': [
            { time: '06:00 - 06:30', title: 'Despertar & Hidratar', cat: 'Pessoal', icon: '🌅', desc: 'Despertar revigorado, hidratação imediata, preparação mental para penúltimo dia útil.' },
            { time: '06:30 - 07:00', title: 'Café da Manhã', cat: 'Pessoal', icon: '☕', desc: 'Refeição sustentável para dia presencial: energia duradoura para trabalho fora de casa.' },
            { time: '07:00 - 07:20', title: 'Organização Rápida', cat: 'Pessoal', icon: '🧹', desc: 'Cuidar das roupas da semana, organizar armário, preparar materiais para trabalho presencial.' },
            { time: '07:20 - 07:50', title: 'Higiene Matinal', cat: 'Pessoal', icon: '🚿', desc: 'Preparação completa para ambiente profissional: aparência e bem-estar pessoal.' },
            { time: '07:50 - 08:10', title: 'Preparação Mental', cat: 'Estudo', icon: '🧠', desc: 'Revisar agenda corporativa, planejar entregas da semana, mentalizar dia produtivo no escritório.' },
            { time: '08:10 - 09:00', title: 'Deslocamento', cat: 'Pessoal', icon: '🚌', desc: 'Trajeto otimizado: conteúdo educativo, planejamento mental ou simplesmente observar a cidade.' },
            { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: 'Manhã de quinta: alta energia para tarefas importantes, colaboração intensa, preparação para final de semana.' },
            { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: 'Almoço corporativo: networking saudável, refeição equilibrada, pausa social revigorante.' },
            { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: 'Tarde de conclusões importantes: fechamento de demandas da semana, preparação para sexta-feira.' },
            { time: '16:00 - 17:30', title: 'Deslocamento para Casa', cat: 'Pessoal', icon: '🚌', desc: 'Retorno com mentalidade de final de semana se aproximando. Transição positiva trabalho → pessoal.' },
            { time: '17:30 - 18:20', title: 'Preparação para Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: 'Preparação para treino de quinta: energia extra para exercitar antes do final de semana.' },
            { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: 'Treino intenso pré-final de semana: máximo aproveitamento, parceria motivadora com namorada.' },
            { time: '20:00 - 20:45', title: 'Retorno & Banho Relaxante', cat: 'Pessoal', icon: '🏠', desc: 'Chegada em casa com sensação de dever cumprido, banho relaxante, preparação para estudos.' },
            { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: 'Jantar nutritivo pós-treino: recuperação muscular + energia para estudos noturnos.' },
            { time: '21:15 - 22:30', title: 'Estudo Faculdade (1x Pomodoro 50/25)', cat: 'Estudo', icon: '🟢', desc: 'Revisão de matérias: consolidação do aprendizado da semana, preparação para avaliações.' },
            { time: '22:30 - 00:00', title: 'Lazer', cat: 'Lazer', icon: '🟣', desc: 'Quinta à noite: antecipação do final de semana, entretenimento, qualidade com namorada.' },
            { time: '00:00 - 00:30', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: 'Preparação para último dia útil, planejamento da sexta, relaxamento para sono restaurador.' },
            { time: '00:30', title: 'Dormir', cat: 'Pessoal', icon: '😴', desc: 'Sono revigorante para acordar energizado para finalizar a semana de trabalho.' }
        ],
        'Sexta-feira': [
            { time: '06:00 - 06:30', title: 'Despertar & Hidratar', cat: 'Pessoal', icon: '🌅', desc: 'Despertar com energia de final de semana, hidratação celebrativa do último dia útil.' },
            { time: '06:30 - 07:00', title: 'Café da Manhã', cat: 'Pessoal', icon: '☕', desc: 'Café da manhã especial de sexta: refeição energética para finalizar semana com excelência.' },
            { time: '07:00 - 07:20', title: 'Organização Rápida', cat: 'Pessoal', icon: '🧹', desc: 'Limpeza geral rápida (aspirar, passar pano): preparar casa para final de semana relaxante.' },
            { time: '07:20 - 07:50', title: 'Higiene Matinal', cat: 'Pessoal', icon: '🚿', desc: 'Preparação energizada para último dia: aparência impecável para encerramento semanal.' },
            { time: '07:50 - 08:10', title: 'Preparação Mental', cat: 'Estudo', icon: '🧠', desc: 'Revisar metas da semana, planejar final de semana produtivo, mentalizar encerramento positivo.' },
            { time: '08:10 - 09:00', title: 'Bloco de Transição', cat: 'Pessoal', icon: '🚶‍♂️', desc: 'Revisar progresso do estágio da semana, organizar documentos, preparar relatórios se necessário.' },
            { time: '09:00 - 12:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: 'Manhã de sexta produtiva: foco total em finalizar pendências importantes da semana.' },
            { time: '12:00 - 13:00', title: 'Almoço', cat: 'Pessoal', icon: '🍽️', desc: 'Almoço caseiro especial: celebração interna pelo final de semana chegando.' },
            { time: '13:00 - 16:00', title: 'Trabalho (3x Pomodoro 50/10)', cat: 'Trabalho', icon: '🔵', desc: 'Finalizar semana profissional: entregar tudo planejado, organizar próxima semana. Últimos 10min para retrospectiva semanal.' },
            { time: '16:00 - 16:30', title: 'Fim de Expediente!', cat: 'Lazer', icon: '🧘', desc: 'Celebração oficial do final de semana! Ritual de encerramento, gratidão pela semana produtiva.' },
            { time: '16:30 - 17:30', title: 'Tempo Livre', cat: 'Lazer', icon: '🟣', desc: 'Primeira hora de liberdade: relaxar completamente, desconectar do trabalho, aproveitar a conquista.' },
            { time: '17:30 - 18:20', title: 'Preparação para Academia', cat: 'Movimento', icon: '🏃‍♂️', desc: 'Preparação especial para treino de sexta: energia extra, comemoração ativa do final de semana.' },
            { time: '18:20 - 20:00', title: 'Academia', cat: 'Movimento', icon: '🏋️', desc: 'Treino de final de semana: liberação total das tensões da semana, celebração com namorada.' },
            { time: '20:00 - 20:45', title: 'Retorno & Banho Relaxante', cat: 'Pessoal', icon: '🏠', desc: 'Volta para casa com sensação de missão cumprida, banho revigorante pós-treino e semana.' },
            { time: '20:45 - 21:15', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: 'Jantar leve para não interferir na diversão noturna: energia sem peso no estômago.' },
            { time: '21:15 - 00:00', title: 'Noite Livre / Social', cat: 'Lazer', icon: '🥳', desc: 'Liberdade total de sexta à noite: sair, ficar em casa, socializar, fazer o que der vontade. Celebração merecida!' },
            { time: '00:00 - 00:30', title: 'Ritual do Sono', cat: 'Pessoal', icon: '🌙', desc: 'Relaxamento sem pressão de planejamento: apenas gratidão pela semana e expectativa pelo final de semana.' },
            { time: '00:30', title: 'Dormir', cat: 'Pessoal', icon: '😴', desc: 'Sono livre e relaxado: acordar quando o corpo pedir para aproveitar o sábado.' }
        ],
        'Sábado': [
            { time: 'Manhã', title: 'Sono / Despertar Flexível', cat: 'Lazer', icon: '😴', desc: 'Despertar natural sem alarme: corpo descansa o quanto necessário. Primeira manhã livre da semana.' },
            { time: 'Manhã', title: 'Café da Manhã / Brunch', cat: 'Pessoal', icon: '☕', desc: 'Café especial de final de semana: sem pressa, experimentar receitas, aproveitar o ritual.' },
            { time: 'Manhã', title: 'Organização da Casa', cat: 'Pessoal', icon: '🧹', desc: 'Faxina concentrada de 30-40min em um cômodo específico: manter casa organizada sem stress.' },
            { time: 'Tarde', title: 'Lazer ao Ar Livre / Praia', cat: 'Lazer', icon: '☀️', desc: 'Atividade externa obrigatória: praia, parque, caminhada, ciclismo. Conexão com natureza e vitamina D.' },
            { time: 'Tarde', title: 'Almoço Social', cat: 'Pessoal', icon: '🍽️', desc: 'Refeição especial: restaurante com namorada, família ou amigos. Momento social e gastronômico.' },
            { time: 'Noite', title: 'Lazer / Filme / Série', cat: 'Lazer', icon: '🟣', desc: 'Entretenimento de qualidade: maratona de série, filme no cinema ou em casa. Relaxamento total.' },
            { time: 'Noite', title: 'Jantar Social', cat: 'Pessoal', icon: '🥗', desc: 'Jantar descontraído: em casa cozinhando junto ou saindo para experimentar lugares novos.' },
            { time: 'Fim da Noite', title: 'Ritual do Sono Flexível', cat: 'Pessoal', icon: '🌙', desc: 'Relaxamento sem horário fixo: dormir quando sentir vontade, sem pressão de compromissos.' }
        ],
        'Domingo': [
            { time: 'Manhã', title: 'Sono / Despertar Flexível', cat: 'Lazer', icon: '😴', desc: 'Segunda manhã livre: aproveitar para recuperar energia completamente antes da nova semana.' },
            { time: 'Manhã', title: 'Café da Manhã / Brunch', cat: 'Pessoal', icon: '☕', desc: 'Café tranquilo de domingo: momento reflexivo, planejamento mental suave da semana.' },
            { time: 'Manhã', title: 'Descanso / Hobby', cat: 'Lazer', icon: '🧘', desc: 'Tempo para hobby pessoal: leitura, música, arte, jogos, qualquer atividade prazerosa individual.' },
            { time: 'Tarde', title: 'Lazer ao Ar Livre ou Descanso', cat: 'Lazer', icon: '☀️', desc: 'Escolha livre: sair para atividade externa ou relaxar em casa. Flexibilidade total baseada na energia.' },
            { time: 'Tarde', title: 'Almoço em Família / Social', cat: 'Pessoal', icon: '🍽️', desc: 'Almoço de domingo tradicional: família, amigos ou casal. Momento de conexão e gratidão.' },
            { time: 'Fim da Tarde', title: 'Preparar Comida da Semana', cat: 'Pessoal', icon: '🧑‍🍳', desc: 'Meal prep estratégico: cozinhar para 2-3 dias, organizar marmitas, otimizar tempo da semana.' },
            { time: 'Noite', title: 'Lazer / Leitura', cat: 'Lazer', icon: '🟣', desc: 'Atividade calma e reflexiva: leitura, documentário, conversa profunda. Preparação mental suave.' },
            { time: 'Noite', title: 'Jantar Leve', cat: 'Pessoal', icon: '🥗', desc: 'Jantar nutritivo e leve: preparar corpo para nova semana sem peso excessivo.' },
            { time: 'Fim da Noite', title: 'Planejamento da Semana', cat: 'Estudo', icon: '🧠', desc: 'Planejamento estratégico: revisar agenda, definir 3 prioridades principais, visualizar sucesso da semana. 20-30min máximo.' }
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

    function updateProgressBar() {
        const tasks = getTodayTasks();
        const dateString = getCurrentDateString();
        const dayProgress = JSON.parse(localStorage.getItem('dailyProgress') || '{}');
        const todayChecks = dayProgress[dateString] || {};
        
        const completedTasks = Object.values(todayChecks).filter(Boolean).length;
        const totalTasks = tasks.length;
        const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        
        document.getElementById('tasks-completed').textContent = `${completedTasks}/${totalTasks} concluídas`;
        document.getElementById('progress-bar').style.width = `${percentage}%`;
        document.getElementById('general-progress').textContent = `${Math.round(percentage)}%`;
        
        return percentage;
    }

    function updateCategoryProgress() {
        const tasks = getTodayTasks();
        const dateString = getCurrentDateString();
        const dayProgress = JSON.parse(localStorage.getItem('dailyProgress') || '{}');
        const todayChecks = dayProgress[dateString] || {};
        
        const categoryStats = {};
        
        // Contar tarefas por categoria
        tasks.forEach((task, idx) => {
            const cat = task.cat;
            if (!categoryStats[cat]) {
                categoryStats[cat] = { total: 0, completed: 0 };
            }
            categoryStats[cat].total++;
            if (todayChecks[idx]) {
                categoryStats[cat].completed++;
            }
        });
        
        // Renderizar progresso por categoria
        const categoryProgressElement = document.getElementById('category-progress');
        categoryProgressElement.innerHTML = '';
        
        Object.keys(categoryStats).forEach(category => {
            const stats = categoryStats[category];
            const percentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
            const color = categoryColors[category];
            
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-progress-item';
            categoryDiv.innerHTML = `
                <div class="flex items-center space-x-2">
                    <span class="w-3 h-3 rounded-full" style="background-color: ${color}"></span>
                    <span class="text-sm font-medium">${category}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-xs text-slate-600">${stats.completed}/${stats.total}</span>
                    <div class="category-progress-bar">
                        <div class="category-progress-fill" style="background-color: ${color}; width: ${percentage}%"></div>
                    </div>
                </div>
            `;
            categoryProgressElement.appendChild(categoryDiv);
        });
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
                
                // Atualizar progresso
                updateProgressBar();
                updateCategoryProgress();
            });
        });
        
        // Atualizar progresso
        updateProgressBar();
        updateCategoryProgress();
    }

    // Funções do calendário (simplificadas para esta versão)
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

    function createWeeklyChart() {
        const ctx = document.getElementById('weekly-chart').getContext('2d');
        const weeklyHours = {
            'Trabalho': 30,
            'Estudo': 9.5,
            'Rotina Pessoal': 28,
            'Movimento': 9,
            'Lazer': 20,
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(weeklyHours),
                datasets: [{
                    label: 'Horas por Semana',
                    data: Object.values(weeklyHours),
                    backgroundColor: Object.values(categoryColors),
                    borderColor: '#f8fafc',
                    borderWidth: 4,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { family: "'Inter', sans-serif" },
                            padding: 15,
                            boxWidth: 12,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed.toFixed(1)} horas`;
                            }
                        }
                    }
                }
            }
        });
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
    createWeeklyChart();
    
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