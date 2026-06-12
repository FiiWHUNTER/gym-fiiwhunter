/**
 * script.js - Lógica e controle de estado do site de Treinos de Academia
 * 
 * Este arquivo contém:
 * 1. Estrutura de dados contendo todos os treinos divididos por dia e gênero.
 * 2. Lógica para alternar temas de gênero e dias de treino de forma dinâmica.
 * 3. Gerenciador de progresso diário persistido via localStorage.
 * 4. Cronômetro de descanso avançado com notificações e Web Audio API.
 * 
 * Todos os códigos possuem comentários explicativos em português para fins de organização.
 */

// Estrutura de dados principal com as informações detalhadas de cada treino
const workoutsData = {
    // Treino masculino
    homem: [
        {
            dia: 1,
            musculo: "PEITO",
            infoAdicional: "Descanso: 90 a 120 segundos nos compostos e 60 segundos nos isoladores.",
            exercicios: [
                { nome: "Supino reto com barra", series: "4x6-8", tipo: "composto" },
                { nome: "Supino inclinado com halteres", series: "4x8-10", tipo: "composto" },
                { nome: "Máquina articulada de supino convergente", series: "3x10-12", tipo: "composto" },
                { nome: "Crucifixo na polia", series: "3x12-15", tipo: "isolador" },
                { nome: "Peck Deck", series: "3x12-15", tipo: "isolador" },
                { nome: "Flexão de braço até a falha", series: "2 séries", tipo: "composto" }
            ]
        },
        {
            dia: 2,
            musculo: "PERNA (QUADRÍCEPS)",
            infoAdicional: "Foco: carga progressiva nos três primeiros exercícios.",
            exercicios: [
                { nome: "Agachamento livre", series: "4x6-8", tipo: "composto" },
                { nome: "Leg Press 45°", series: "4x10-12", tipo: "composto" },
                { nome: "Hack Machine", series: "3x10-12", tipo: "composto" },
                { nome: "Cadeira Extensora", series: "4x12-15", tipo: "isolador" },
                { nome: "Afundo com halteres", series: "3x10 cada perna", tipo: "composto" },
                { nome: "Panturrilha em pé", series: "5x12-15", tipo: "isolador" }
            ]
        },
        {
            dia: 3,
            musculo: "BRAÇOS + OMBROS",
            infoAdicional: "Opcional: mais 2 séries de tríceps francês para aumentar o volume.",
            secoes: [
                {
                    titulo: "Ombros",
                    exercicios: [
                        { nome: "Desenvolvimento com halteres", series: "4x8-10", tipo: "composto" },
                        { nome: "Elevação lateral na máquina", series: "4x12-15", tipo: "isolador" },
                        { nome: "Crucifixo inverso na máquina", series: "3x12-15", tipo: "isolador" }
                    ]
                },
                {
                    titulo: "Bíceps",
                    exercicios: [
                        { nome: "Rosca direta com barra W", series: "4x8-10", tipo: "composto" },
                        { nome: "Rosca Scott na máquina", series: "3x10-12", tipo: "isolador" }
                    ]
                },
                {
                    titulo: "Tríceps",
                    exercicios: [
                        { nome: "Tríceps pulley com corda", series: "4x10-12", tipo: "isolador" }
                    ]
                }
            ]
        },
        {
            dia: 4,
            musculo: "PERNA (POSTERIOR E GLÚTEOS)",
            infoAdicional: "Objetivo: alongar bastante o posterior em todos os movimentos.",
            exercicios: [
                { nome: "Levantamento Terra Romeno", series: "4x8-10", tipo: "composto" },
                { nome: "Mesa Flexora", series: "4x10-12", tipo: "isolador" },
                { nome: "Cadeira Flexora", series: "3x12-15", tipo: "isolador" },
                { nome: "Stiff com halteres", series: "3x10-12", tipo: "composto" },
                { nome: "Elevação pélvica (Hip Thrust)", series: "4x8-12", tipo: "composto" },
                { nome: "Panturrilha sentada", series: "5x15-20", tipo: "isolador" }
            ]
        },
        {
            dia: 5,
            musculo: "COSTAS",
            infoAdicional: "Foco na contração escapular e postura adequada durante as remadas.",
            exercicios: [
                { nome: "Barra fixa (ou graviton)", series: "4 séries", tipo: "composto" },
                { nome: "Puxada alta articulada", series: "4x8-10", tipo: "composto" },
                { nome: "Remada curvada com barra", series: "4x8-10", tipo: "composto" },
                { nome: "Remada baixa articulada", series: "3x10-12", tipo: "composto" },
                { nome: "Pulldown na polia", series: "3x12-15", tipo: "isolador" },
                { nome: "Encolhimento com halteres", series: "4x12-15", tipo: "isolador" }
            ]
        }
    ],
    // Treino feminino
    mulher: [
        {
            dia: 1,
            musculo: "GLÚTEOS E POSTERIOR",
            infoAdicional: "Cardio: 20 minutos de caminhada inclinada após o treino.",
            exercicios: [
                { nome: "Hip Thrust (Elevação Pélvica)", series: "4x8-12", tipo: "composto" },
                { nome: "Stiff com Halteres", series: "4x10-12", tipo: "composto" },
                { nome: "Mesa Flexora", series: "4x12", tipo: "isolador" },
                { nome: "Cadeira Flexora", series: "3x12-15", tipo: "isolador" },
                { nome: "Afundo Caminhando", series: "3x12 cada perna", tipo: "composto" },
                { nome: "Abdução na Máquina", series: "4x15-20", tipo: "isolador" }
            ]
        },
        {
            dia: 2,
            musculo: "COSTAS, OMBROS E ABDÔMEN",
            infoAdicional: "Cardio: 25 minutos moderado.",
            secoes: [
                {
                    titulo: "Superior",
                    exercicios: [
                        { nome: "Puxada Frontal", series: "4x10-12", tipo: "composto" },
                        { nome: "Remada Baixa", series: "4x10-12", tipo: "composto" },
                        { nome: "Remada Articulada", series: "3x12", tipo: "composto" },
                        { nome: "Desenvolvimento na Máquina", series: "3x10-12", tipo: "composto" },
                        { nome: "Elevação Lateral", series: "3x15", tipo: "isolador" },
                        { nome: "Face Pull", series: "3x15", tipo: "isolador" }
                    ]
                },
                {
                    titulo: "Abdômen",
                    exercicios: [
                        { nome: "Prancha", series: "3x40 segundos", tipo: "isometria" },
                        { nome: "Elevação de pernas", series: "3x15", tipo: "composto" }
                    ]
                }
            ]
        },
        {
            dia: 3,
            musculo: "QUADRÍCEPS E PANTURRILHAS",
            infoAdicional: "Cardio: 20 minutos.",
            exercicios: [
                { nome: "Agachamento Livre", series: "4x8-10", tipo: "composto" },
                { nome: "Leg Press 45°", series: "4x12", tipo: "composto" },
                { nome: "Hack Machine", series: "3x10-12", tipo: "composto" },
                { nome: "Cadeira Extensora", series: "4x15", tipo: "isolador" },
                { nome: "Passada no Smith", series: "3x12 cada perna", tipo: "composto" },
                { nome: "Panturrilha no Leg Press", series: "5x15-20", tipo: "isolador" }
            ]
        },
        {
            dia: 4,
            musculo: "PEITO, BRAÇOS E ABDÔMEN",
            infoAdicional: "Cardio: 25 minutos.",
            secoes: [
                {
                    titulo: "Superior & Braços",
                    exercicios: [
                        { nome: "Supino Máquina", series: "3x12", tipo: "composto" },
                        { nome: "Crucifixo Máquina", series: "3x15", tipo: "isolador" },
                        { nome: "Rosca Direta", series: "3x12", tipo: "isolador" },
                        { nome: "Rosca Martelo", series: "3x12", tipo: "isolador" },
                        { nome: "Tríceps Corda", series: "3x12", tipo: "isolador" },
                        { nome: "Tríceps Francês", series: "3x12", tipo: "isolador" }
                    ]
                },
                {
                    titulo: "Abdômen",
                    exercicios: [
                        { nome: "Crunch Máquina", series: "3x15", tipo: "isolador" },
                        { nome: "Prancha Lateral", series: "3 séries cada lado", tipo: "isometria" }
                    ]
                }
            ]
        },
        {
            dia: 5,
            musculo: "GLÚTEOS COMPLETO + METABÓLICO",
            infoAdicional: "Finalização Metabólica - 3 voltas sem descanso: 15 Agachamentos livres, 15 Afundos alternados e 20 Polichinelos.",
            exercicios: [
                { nome: "Hip Thrust", series: "4x10", tipo: "composto" },
                { nome: "Agachamento Sumô", series: "4x12", tipo: "composto" },
                { nome: "Cadeira Abdutora", series: "4x20", tipo: "isolador" },
                { nome: "Coice na Polia", series: "3x15 cada perna", tipo: "isolador" },
                { nome: "Step Up com Halteres", series: "3x12 cada perna", tipo: "composto" },
                { nome: "Terra Romeno", series: "3x12", tipo: "composto" }
            ],
            circuito: {
                titulo: "Finalização Metabólica",
                voltas: 3,
                regras: "Sem descanso entre exercícios, 3 voltas completas",
                exercicios: [
                    { nome: "Agachamentos livres", quantidade: "15 repetições" },
                    { nome: "Afundos alternados", quantidade: "15 repetições" },
                    { nome: "Polichinelos", quantidade: "20 repetições" }
                ]
            }
        }
    ]
};

// Variáveis globais para rastrear o estado da aplicação
let activeGender = localStorage.getItem('activeGender') || 'homem'; // Carrega gênero do localStorage ou padrão 'homem'
let activeDay = parseInt(localStorage.getItem('activeDay')) || 1; // Carrega dia ativo ou padrão 1

// Variáveis relacionadas ao Cronômetro
let timerInterval = null; // Armazena o intervalo de contagem do timer
let timerTimeLeft = 0; // Tempo restante em segundos
let timerTotalDuration = 0; // Duração total originalmente selecionada
let timerIsRunning = false; // Status de execução do cronômetro

// Mapeamento dos elementos do DOM
const domElements = {
    btnHomem: document.getElementById('btn-gender-male'), // Botão de gênero masculino
    btnMulher: document.getElementById('btn-gender-female'), // Botão de gênero feminino
    daysContainer: document.getElementById('days-selector'), // Container das abas dos dias
    workoutTitle: document.getElementById('workout-day-title'), // Título principal do dia de treino
    workoutTarget: document.getElementById('workout-target-group'), // Divisão muscular em destaque
    workoutMeta: document.getElementById('workout-meta-info'), // Observação extra do dia
    exercisesContainer: document.getElementById('exercises-list-container'), // Lista de cards de exercícios
    circuitoContainer: document.getElementById('circuit-container'), // Container para a seção metabólica (se houver)
    progressPercent: document.getElementById('progress-percentage'), // Texto de porcentagem
    progressBar: document.getElementById('progress-bar-fill'), // Barra visual preenchida
    
    // Elementos do cronômetro flutuante
    timerDisplay: document.getElementById('timer-time'), // Display de texto do timer
    timerProgressBar: document.getElementById('timer-bar-fill'), // Barra de progresso circular/linear do timer
    timerBtnToggle: document.getElementById('timer-btn-toggle'), // Botão play/pause do timer
    timerBtnReset: document.getElementById('timer-btn-reset'), // Botão reset do timer
    timerDurationButtons: document.querySelectorAll('.timer-btn-preset') // Botões de tempo pré-definido
};

/**
 * Função para salvar e persistir os estados de conclusão no localStorage
 * @param {string} gender Gênero ativo (homem/mulher)
 * @param {number} day Número do dia (1-5)
 * @param {string} exerciseKey Identificador único do exercício
 * @param {boolean} isCompleted Status se o exercício está marcado como feito ou não
 */
function setExerciseState(gender, day, exerciseKey, isCompleted) {
    const key = `completed_${gender}_day${day}_${exerciseKey}`;
    if (isCompleted) {
        localStorage.setItem(key, 'true');
    } else {
        localStorage.removeItem(key);
    }
}

/**
 * Função para recuperar os estados de conclusão salvos no localStorage
 * @param {string} gender Gênero ativo (homem/mulher)
 * @param {number} day Número do dia (1-5)
 * @param {string} exerciseKey Identificador único do exercício
 * @returns {boolean} Retorna true se estiver concluído, caso contrário false
 */
function getExerciseState(gender, day, exerciseKey) {
    const key = `completed_${gender}_day${day}_${exerciseKey}`;
    return localStorage.getItem(key) === 'true';
}

/**
 * Altera o gênero ativo no site e atualiza as classes visuais no elemento body
 * @param {string} gender Gênero selecionado ('homem' ou 'mulher')
 */
function switchGender(gender) {
    activeGender = gender;
    localStorage.setItem('activeGender', gender);
    
    // Modifica as classes do body para controlar as cores de destaque e variáveis de CSS
    if (gender === 'homem') {
        document.body.classList.remove('theme-female');
        document.body.classList.add('theme-male');
        domElements.btnHomem.classList.add('active');
        domElements.btnMulher.classList.remove('active');
    } else {
        document.body.classList.remove('theme-male');
        document.body.classList.add('theme-female');
        domElements.btnMulher.classList.add('active');
        domElements.btnHomem.classList.remove('active');
    }
    
    // Atualiza as abas dos dias para carregar os focos musculares corretos desse gênero
    renderDaysTabs();
    
    // Atualiza a visualização do treino
    renderActiveWorkout();
}

/**
 * Altera o dia ativo do treino (1 a 5)
 * @param {number} day Número do dia selecionado
 */
function switchDay(day) {
    activeDay = day;
    localStorage.setItem('activeDay', day);
    
    // Atualiza o estado ativo nos botões de dias
    const dayButtons = domElements.daysContainer.querySelectorAll('.day-tab-btn');
    dayButtons.forEach(btn => {
        if (parseInt(btn.getAttribute('data-day')) === day) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Renderiza a lista correspondente
    renderActiveWorkout();
}

/**
 * Renderiza de forma dinâmica as abas dos dias da semana baseadas no gênero selecionado
 */
function renderDaysTabs() {
    domElements.daysContainer.innerHTML = '';
    const currentList = workoutsData[activeGender];
    
    currentList.forEach(workout => {
        const btn = document.createElement('button');
        btn.className = `day-tab-btn ${workout.dia === activeDay ? 'active' : ''}`;
        btn.setAttribute('data-day', workout.dia);
        btn.setAttribute('id', `tab-day-${workout.dia}`);
        
        // Estrutura de conteúdo interna para ficar esteticamente premium
        btn.innerHTML = `
            <span class="day-number">DIA ${workout.dia}</span>
            <span class="day-muscle">${workout.musculo.split(' (')[0].split(' + ')[0]}</span>
        `;
        
        btn.addEventListener('click', () => switchDay(workout.dia));
        domElements.daysContainer.appendChild(btn);
    });
}

/**
 * Calcula a porcentagem do progresso do dia atual e anima a barra de progresso
 */
function calculateAndUpdateProgress() {
    const checkBoxes = domElements.exercisesContainer.querySelectorAll('.exercise-checkbox');
    const totalCount = checkBoxes.length;
    let completedCount = 0;
    
    checkBoxes.forEach(cb => {
        if (cb.checked) {
            completedCount++;
        }
    });
    
    // Tratamento básico para evitar divisão por zero se não houver exercícios
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    
    // Atualiza textos e estilo visual da barra com animações CSS suaves
    domElements.progressPercent.innerText = `${percentage}%`;
    domElements.progressBar.style.width = `${percentage}%`;
    
    // Se completou 100%, dá um efeito discreto na cor da barra ou de comemoração
    if (percentage === 100) {
        domElements.progressBar.classList.add('completed-glow');
    } else {
        domElements.progressBar.classList.remove('completed-glow');
    }
}

/**
 * Cria o card HTML correspondente a um exercício individual
 * @param {object} exercise Dados do exercício
 * @param {number} index Índice para identificação no dia
 * @returns {HTMLElement} Elemento div construído contendo o card
 */
function createExerciseCard(exercise, index) {
    const card = document.createElement('div');
    card.className = `exercise-card ${exercise.tipo || 'composto'}`;
    
    // Cria uma chave única baseada no nome do exercício
    const exerciseKey = `ex_${index}_${exercise.nome.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
    const isChecked = getExerciseState(activeGender, activeDay, exerciseKey);
    
    if (isChecked) {
        card.classList.add('checked');
    }
    
    // HTML interno do card com layout moderno, marcando séries e botões
    card.innerHTML = `
        <div class="exercise-card-left">
            <div class="checkbox-wrapper">
                <input type="checkbox" id="chk-${exerciseKey}" class="exercise-checkbox" ${isChecked ? 'checked' : ''} />
                <label for="chk-${exerciseKey}" class="checkbox-custom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </label>
            </div>
            <div class="exercise-details">
                <h3 class="exercise-name">${exercise.nome}</h3>
                <span class="exercise-badge badge-${exercise.tipo || 'composto'}">${(exercise.tipo || 'composto').toUpperCase()}</span>
            </div>
        </div>
        <div class="exercise-card-right">
            <div class="series-info">
                <span class="series-label">Séries x Reps</span>
                <span class="series-value">${exercise.series}</span>
            </div>
        </div>
    `;
    
    // Evento para monitorar mudança no status da checkbox e recalcular o progresso
    const chk = card.querySelector('.exercise-checkbox');
    chk.addEventListener('change', (e) => {
        const checked = e.target.checked;
        setExerciseState(activeGender, activeDay, exerciseKey, checked);
        
        if (checked) {
            card.classList.add('checked');
            // Sugere descanso abrindo ou animando visualmente o cronômetro
            triggerTimerPulse();
        } else {
            card.classList.remove('checked');
        }
        calculateAndUpdateProgress();
    });
    
    return card;
}

/**
 * Renderiza os dados do treino ativo (masculino/feminino e dia correspondente)
 */
function renderActiveWorkout() {
    const workout = workoutsData[activeGender].find(w => w.dia === activeDay);
    
    if (!workout) return;
    
    // Configura os textos do topo da visualização
    domElements.workoutTitle.innerText = `DIA ${workout.dia}`;
    domElements.workoutTarget.innerText = workout.musculo;
    domElements.workoutMeta.innerText = workout.infoAdicional || "";
    
    // Limpa a lista atual
    domElements.exercisesContainer.innerHTML = '';
    domElements.circuitoContainer.innerHTML = '';
    domElements.circuitoContainer.style.display = 'none';
    
    // Verifica se possui seções separadas (como Ombros, Bíceps, Tríceps no Dia 3 Masculino)
    if (workout.secoes) {
        workout.secoes.forEach((secao, secIndex) => {
            // Cria um título de subseção
            const sectionHeader = document.createElement('h3');
            sectionHeader.className = 'workout-section-title';
            sectionHeader.innerText = secao.titulo;
            domElements.exercisesContainer.appendChild(sectionHeader);
            
            // Renderiza cada exercício da subseção
            secao.exercicios.forEach((ex, exIndex) => {
                const card = createExerciseCard(ex, `sec_${secIndex}_ex_${exIndex}`);
                domElements.exercisesContainer.appendChild(card);
            });
        });
    } else if (workout.exercicios) {
        // Renderização linear de exercícios tradicionais
        workout.exercicios.forEach((ex, index) => {
            const card = createExerciseCard(ex, index);
            domElements.exercisesContainer.appendChild(card);
        });
    }
    
    // Verifica se há circuitos especiais (exemplo Dia 5 Feminino - Finalização Metabólica)
    if (workout.circuito) {
        domElements.circuitoContainer.style.display = 'block';
        
        let circuitHTML = `
            <div class="circuit-header">
                <span class="circuit-badge">CIRCUITO</span>
                <h3 class="circuit-title">${workout.circuito.titulo}</h3>
                <p class="circuit-rules">${workout.circuito.regras}</p>
            </div>
            <div class="circuit-rounds">
                <span class="rounds-text">${workout.circuito.voltas} Voltas Recomendadas</span>
            </div>
            <ul class="circuit-list">
        `;
        
        workout.circuito.exercicios.forEach(ex => {
            circuitHTML += `
                <li class="circuit-item">
                    <span class="circuit-ex-name">${ex.nome}</span>
                    <span class="circuit-ex-qty">${ex.quantidade}</span>
                </li>
            `;
        });
        
        circuitHTML += `</ul>`;
        domElements.circuitoContainer.innerHTML = circuitHTML;
    }
    
    // Atualiza barra de progresso do novo dia selecionado
    calculateAndUpdateProgress();
}

/**
 * Função para tocar um bipe sonoro de alerta no término do tempo de descanso utilizando Web Audio API
 */
function playAlertSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Primeiro bipe curto
        const playBeep = (time, freq, duration) => {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, time);
            
            gainNode.gain.setValueAtTime(0.3, time);
            gainNode.gain.exponentialRampToValueAtTime(0.01, time + duration);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.start(time);
            oscillator.stop(time + duration);
        };
        
        // Sequência de bipes para chamar atenção do atleta (tom alto)
        const now = audioCtx.currentTime;
        playBeep(now, 880, 0.2); // Beep 1
        playBeep(now + 0.3, 880, 0.2); // Beep 2
        playBeep(now + 0.6, 1200, 0.4); // Beep 3 (Tom diferenciado no final)
    } catch (error) {
        console.warn('Web Audio API não é suportada ou permissão negada.', error);
    }
}

/**
 * Formata os segundos em texto legível mm:ss
 * @param {number} seconds Tempo total em segundos
 * @returns {string} Formato MM:SS
 */
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Atualiza visualmente o círculo de contagem e o texto do timer
 */
function updateTimerUI() {
    domElements.timerDisplay.innerText = formatTime(timerTimeLeft);
    
    // Atualiza a barra de progresso circular se houver
    if (timerTotalDuration > 0) {
        const progressPercent = (timerTimeLeft / timerTotalDuration) * 100;
        domElements.timerProgressBar.style.width = `${progressPercent}%`;
    } else {
        domElements.timerProgressBar.style.width = '0%';
    }
}

/**
 * Inicia a execução ativa do cronômetro de contagem regressiva
 */
function startTimer() {
    if (timerIsRunning) return;
    
    timerIsRunning = true;
    domElements.timerBtnToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
    `; // Icone de pause
    domElements.timerBtnToggle.classList.add('running');
    
    timerInterval = setInterval(() => {
        if (timerTimeLeft > 0) {
            timerTimeLeft--;
            updateTimerUI();
        } else {
            // Fim do tempo do timer
            stopTimer();
            playAlertSound();
            flashTimerDisplay();
        }
    }, 1000);
}

/**
 * Interrompe temporariamente a contagem do cronômetro
 */
function stopTimer() {
    if (!timerIsRunning) return;
    
    timerIsRunning = false;
    clearInterval(timerInterval);
    domElements.timerBtnToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
    `; // Icone de play
    domElements.timerBtnToggle.classList.remove('running');
}

/**
 * Reseta o cronômetro para o tempo selecionado inicialmente ou zero
 */
function resetTimer() {
    stopTimer();
    timerTimeLeft = timerTotalDuration;
    updateTimerUI();
}

/**
 * Efeito visual de pulsação rápida no cronômetro flutuante ao marcar um exercício concluído
 */
function triggerTimerPulse() {
    const timerWidget = document.getElementById('timer-widget-panel');
    if (timerWidget) {
        timerWidget.classList.add('pulse-highlight');
        setTimeout(() => {
            timerWidget.classList.remove('pulse-highlight');
        }, 1000);
    }
}

/**
 * Efeito visual piscante no display do cronômetro quando o tempo expira
 */
function flashTimerDisplay() {
    const timerWidget = document.getElementById('timer-widget-panel');
    if (timerWidget) {
        timerWidget.classList.add('timer-finished');
        setTimeout(() => {
            timerWidget.classList.remove('timer-finished');
        }, 3000);
    }
}

/**
 * Define um novo tempo de duração total para o cronômetro e inicia a contagem
 * @param {number} seconds Duração selecionada em segundos
 */
function selectTimerPreset(seconds) {
    stopTimer();
    timerTotalDuration = seconds;
    timerTimeLeft = seconds;
    updateTimerUI();
    startTimer();
}

/**
 * Configuração dos escutadores de eventos do DOM principais
 */
function initializeEventListeners() {
    // Escutadores para botões de gênero
    domElements.btnHomem.addEventListener('click', () => switchGender('homem'));
    domElements.btnMulher.addEventListener('click', () => switchGender('mulher'));
    
    // Escutador do botão play/pause do cronômetro
    domElements.timerBtnToggle.addEventListener('click', () => {
        if (timerIsRunning) {
            stopTimer();
        } else {
            if (timerTimeLeft === 0) {
                // Seleciona um tempo padrão (60 segundos) caso clique sem configurar nada antes
                selectTimerPreset(60);
            } else {
                startTimer();
            }
        }
    });
    
    // Escutador do botão de reset do cronômetro
    domElements.timerBtnReset.addEventListener('click', resetTimer);
    
    // Escutadores dos presets de descanso rápidos (60s, 90s, 120s)
    domElements.timerDurationButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove ativação de outros botões de preset
            domElements.timerDurationButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            const seconds = parseInt(btn.getAttribute('data-seconds'));
            selectTimerPreset(seconds);
        });
    });
    
    // Adiciona suporte a resetar dados de conclusão se necessário (opcional)
    const btnResetProgress = document.getElementById('btn-reset-workout-data');
    if (btnResetProgress) {
        btnResetProgress.addEventListener('click', () => {
            if (confirm('Deseja resetar todo o progresso dos treinos salvos?')) {
                // Remove todos os registros de exercícios salvos no localStorage
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith('completed_')) {
                        localStorage.removeItem(key);
                    }
                });
                renderActiveWorkout();
            }
        });
    }
}

/**
 * Inicializador principal do aplicativo
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os escutadores de eventos fundamentais
    initializeEventListeners();
    
    // Aplica o gênero ativo inicial para carregar cores corretas no carregamento
    switchGender(activeGender);
    
    // Inicializa a aba dos dias correspondentes
    renderDaysTabs();
    
    // Mostra o treino selecionado
    switchDay(activeDay);
    
    // Garante que o timer inicie zerado e limpo
    timerTimeLeft = 0;
    updateTimerUI();
});
