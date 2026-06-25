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

// Estrutura de dados principal com as informações detalhad// Estrutura de dados principal contendo os treinos separados por Gênero, Nível e Dia
const workoutsData = {
    // Treinos para o gênero Masculino
    homem: {
        // Nível Iniciante Masculino: Treinos mais curtos e focados em exercícios básicos de adaptação
        iniciante: [
            {
                dia: 1,
                musculo: "PEITO + TRÍCEPS (Adaptação)",
                infoAdicional: "Descanso: 60 a 90 segundos. Foco em aprender a postura correta.",
                exercicios: [
                    { nome: "Supino reto com halteres", series: "3x10", tipo: "composto" },
                    { nome: "Crucifixo inclinado com halteres", series: "3x12", tipo: "isolador" },
                    { nome: "Tríceps pulley na polia alta", series: "3x12", tipo: "isolador" },
                    { nome: "Flexão de braço (de joelhos se necessário)", series: "3x max repetições", tipo: "composto" }
                ]
            },
            {
                dia: 2,
                musculo: "COXAS E PANTURRILHA (Adaptação)",
                infoAdicional: "Descanso: 90 segundos. Cuidado com a amplitude do agachamento.",
                exercicios: [
                    { nome: "Agachamento Taça (Goblet Squat)", series: "3x10", tipo: "composto" },
                    { nome: "Cadeira Extensora", series: "3x12", tipo: "isolador" },
                    { nome: "Mesa Flexora", series: "3x12", tipo: "isolador" },
                    { nome: "Panturrilha em pé na máquina", series: "4x15", tipo: "isolador" }
                ]
            },
            {
                dia: 3,
                musculo: "COSTAS E BÍCEPS (Adaptação)",
                infoAdicional: "Descanso: 60 a 90 segundos. Foco na contração escapular.",
                exercicios: [
                    { nome: "Puxada alta aberta no pulley", series: "3x10", tipo: "composto" },
                    { nome: "Remada baixa com triângulo", series: "3x12", tipo: "composto" },
                    { nome: "Rosca direta com halteres", series: "3x12", tipo: "isolador" },
                    { nome: "Rosca martelo alternada", series: "3x10 cada braço", tipo: "isolador" }
                ]
            },
            {
                dia: 4,
                musculo: "OMBROS E ABDÔMEN (Adaptação)",
                infoAdicional: "Descanso: 60 segundos. Controle a descida dos pesos nos ombros.",
                exercicios: [
                    { nome: "Desenvolvimento com halteres sentado", series: "3x10", tipo: "composto" },
                    { nome: "Elevação lateral com halteres", series: "3x12", tipo: "isolador" },
                    { nome: "Abdominal Crunch no solo", series: "3x15", tipo: "isolador" },
                    { nome: "Prancha abdominal isométrica", series: "3x30 segundos", tipo: "isometria" }
                ]
            },
            {
                dia: 5,
                musculo: "PERNAS E CORE (Adaptação)",
                infoAdicional: "Descanso: 90 segundos. Foco em controle de core e quadril.",
                exercicios: [
                    { nome: "Leg Press 45° leve", series: "3x10", tipo: "composto" },
                    { nome: "Cadeira Flexora", series: "3x12", tipo: "isolador" },
                    { nome: "Elevação pélvica no colchonete", series: "3x15", tipo: "composto" },
                    { nome: "Prancha lateral isométrica", series: "3x20 segundos cada lado", tipo: "isometria" }
                ]
            }
        ],
        // Nível Intermediário Masculino: Treino original do sistema
        intermediario: [
            {
                dia: 1,
                musculo: "PEITO (Intermediário)",
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
                musculo: "PERNA (QUADRÍCEPS) (Intermediário)",
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
                musculo: "BRAÇOS + OMBROS (Intermediário)",
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
                musculo: "PERNA (POSTERIOR E GLÚTEOS) (Intermediário)",
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
                musculo: "COSTAS (Intermediário)",
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
        // Nível Avançado Masculino: Maior volume de séries, técnicas avançadas e intensidade alta
        avancado: [
            {
                dia: 1,
                musculo: "PEITO (Hipertrofia Extrema)",
                infoAdicional: "Descanso: 90 a 120 segundos. Na última série de cada exercício faça Dropset até a falha.",
                exercicios: [
                    { nome: "Supino inclinado com halteres", series: "4x8-10", tipo: "composto" },
                    { nome: "Supino reto com barra", series: "4x6-8", tipo: "composto" },
                    { nome: "Crucifixo na polia alta (Crossover)", series: "4x12-15", tipo: "isolador" },
                    { nome: "Supino articulado convergente", series: "3x10 (segurando 2s no pico)", tipo: "composto" },
                    { nome: "Peck Deck (Voador)", series: "4x12 + Dropset", tipo: "isolador" },
                    { nome: "Flexão de braço declinada", series: "3x falha total", tipo: "composto" }
                ]
            },
            {
                dia: 2,
                musculo: "PERNAS COMPLETO (Força e Densidade)",
                infoAdicional: "Descanso: 120 segundos nos agachamentos. Treino de altíssima intensidade calórica.",
                exercicios: [
                    { nome: "Agachamento livre com barra", series: "4x6-8", tipo: "composto" },
                    { nome: "Leg Press 45° (Foco em amplitude)", series: "4x10-12 (Última Rest-Pause)", tipo: "composto" },
                    { nome: "Hack Machine", series: "3x10-12", tipo: "composto" },
                    { nome: "Cadeira Extensora", series: "4x12-15 + Dropset", tipo: "isolador" },
                    { nome: "Cadeira Flexora", series: "4x10-12", tipo: "isolador" },
                    { nome: "Levantamento Terra Romeno", series: "4x8-10", tipo: "composto" },
                    { nome: "Panturrilha em pé na máquina", series: "5x15", tipo: "isolador" }
                ]
            },
            {
                dia: 3,
                musculo: "OMBROS E TRAPÉZIO (Largura e Volume)",
                infoAdicional: "Descanso: 60 a 90 segundos. Foco em movimentos limpos e lentos.",
                exercicios: [
                    { nome: "Desenvolvimento militar com barra", series: "4x6-8", tipo: "composto" },
                    { nome: "Elevação lateral na polia por trás", series: "4x12-15", tipo: "isolador" },
                    { nome: "Elevação frontal alternada no banco inclinado", series: "3x10 cada braço", tipo: "composto" },
                    { nome: "Crucifixo inverso na polia (deltoide posterior)", series: "4x12-15", tipo: "isolador" },
                    { nome: "Encolhimento com barra pesada", series: "4x10-12", tipo: "isolador" },
                    { nome: "Remada alta com pegada aberta na polia", series: "3x10-12", tipo: "composto" }
                ]
            },
            {
                dia: 4,
                musculo: "COSTAS E LOMBAR (Espessura e Asas)",
                infoAdicional: "Descanso: 90 a 120 segundos. Foco na amplitude total de alongamento da dorsal.",
                exercicios: [
                    { nome: "Levantamento Terra clássico", series: "4x5", tipo: "composto" },
                    { nome: "Barra Fixa (Weighted Pull-ups)", series: "4x8 (com carga se possível)", tipo: "composto" },
                    { nome: "Remada curvada pronada com barra", series: "4x8-10", tipo: "composto" },
                    { nome: "Puxada supinada na polia alta", series: "4x10-12", tipo: "composto" },
                    { nome: "Remada unilateral com halteres (Serrote)", series: "3x10-12 cada braço", tipo: "composto" },
                    { nome: "Pulldown com corda na polia alta", series: "3x12-15", tipo: "isolador" }
                ]
            },
            {
                dia: 5,
                musculo: "BRAÇOS COMPLETOS (Bíceps e Tríceps)",
                infoAdicional: "Descanso: 60 segundos. Executar em Bi-série (um de bíceps seguido de um de tríceps sem descanso).",
                secoes: [
                    {
                        titulo: "Bíceps (Foco em Pico e Espessura)",
                        exercicios: [
                            { nome: "Rosca direta com barra W", series: "4x8-10", tipo: "composto" },
                            { nome: "Rosca Scott com halteres (unilateral)", series: "3x10-12", tipo: "isolador" },
                            { nome: "Rosca alternada inclinada (banco 45°)", series: "3x10-12", tipo: "isolador" }
                        ]
                    },
                    {
                        titulo: "Tríceps (Foco em Cabeça Longa e Lateral)",
                        exercicios: [
                            { nome: "Tríceps testa com barra W", series: "4x8-10", tipo: "composto" },
                            { nome: "Tríceps pulley com corda", series: "4x10-12", tipo: "isolador" },
                            { nome: "Tríceps francês sentado com halter", series: "3x10-12", tipo: "isolador" }
                        ]
                    }
                ]
            }
        ]
    },
    // Treinos para o gênero Feminino
    mulher: {
        // Nível Iniciante Feminino: Foco em adaptação muscular, pernas e core
        iniciante: [
            {
                dia: 1,
                musculo: "PERNAS COMPLETO (Adaptação)",
                infoAdicional: "Descanso: 60 a 90 segundos. Atenção à postura no agachamento.",
                exercicios: [
                    { nome: "Agachamento Taça (Goblet Squat)", series: "3x10", tipo: "composto" },
                    { nome: "Cadeira Extensora", series: "3x12", tipo: "isolador" },
                    { nome: "Cadeira Flexora", series: "3x12", tipo: "isolador" },
                    { nome: "Cadeira Abdutora", series: "3x15", tipo: "isolador" },
                    { nome: "Panturrilha sentada", series: "4x15", tipo: "isolador" }
                ]
            },
            {
                dia: 2,
                musculo: "MEMBROS SUPERIORES (Adaptação)",
                infoAdicional: "Descanso: 60 segundos. Carga leve para aprender os movimentos.",
                exercicios: [
                    { nome: "Puxada frontal aberta na polia", series: "3x10", tipo: "composto" },
                    { nome: "Supino inclinado articulado", series: "3x12", tipo: "composto" },
                    { nome: "Elevação lateral com halteres", series: "3x12", tipo: "isolador" },
                    { nome: "Rosca direta com halteres", series: "3x12", tipo: "isolador" },
                    { nome: "Tríceps pulley", series: "3x12", tipo: "isolador" }
                ]
            },
            {
                dia: 3,
                musculo: "GLÚTEOS E POSTERIORES (Adaptação)",
                infoAdicional: "Descanso: 90 segundos. Foco na contração dos glúteos.",
                exercicios: [
                    { nome: "Elevação pélvica no colchonete", series: "3x15", tipo: "composto" },
                    { nome: "Stiff leve com halteres", series: "3x12", tipo: "composto" },
                    { nome: "Cadeira Flexora", series: "3x12", tipo: "isolador" },
                    { nome: "Abdução de pernas deitada com caneleiras", series: "3x15 cada lado", tipo: "isolador" }
                ]
            },
            {
                dia: 4,
                musculo: "CORE E POSTURA (Adaptação)",
                infoAdicional: "Descanso: 60 segundos. Foco no controle de respiração e abdômen.",
                exercicios: [
                    { nome: "Prancha abdominal isométrica", series: "3x30 segundos", tipo: "isometria" },
                    { nome: "Abdominal Remador", series: "3x15", tipo: "composto" },
                    { nome: "Perdigueiro isométrico", series: "3x30 segundos cada lado", tipo: "isometria" },
                    { nome: "Elevação lateral de ombros", series: "3x12", tipo: "isolador" }
                ]
            },
            {
                dia: 5,
                musculo: "CIRCUITO METABÓLICO (Adaptação)",
                infoAdicional: "Circuito leve: realize os exercícios um após o outro. Repita 3 vezes.",
                circuito: {
                    titulo: "Metabólico Adaptativo",
                    voltas: 3,
                    regras: "Descanse 1 minuto ao final de cada volta.",
                    exercicios: [
                        { nome: "Polichinelos", quantidade: "20 repetições" },
                        { nome: "Agachamento livre sem peso", quantidade: "15 repetições" },
                        { nome: "Corrida estacionária", quantidade: "30 segundos" },
                        { nome: "Prancha abdominal", quantidade: "30 segundos" }
                    ]
                }
            }
        ],
        // Nível Intermediário Feminino: Treino original do sistema
        intermediario: [
            {
                dia: 1,
                musculo: "GLÚTEOS E POSTERIOR (Intermediário)",
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
                musculo: "COSTAS, OMBROS E ABDÔMEN (Intermediário)",
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
                musculo: "QUADRÍCEPS E PANTURRILHAS (Intermediário)",
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
                musculo: "PEITO, BRAÇOS E ABDÔMEN (Intermediário)",
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
                musculo: "GLÚTEOS COMPLETO + METABÓLICO (Intermediário)",
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
        ],
        // Nível Avançado Feminino: Maior intensidade, uso de técnicas como dropsets e bi-séries metabólicas
        avancado: [
            {
                dia: 1,
                musculo: "GLÚTEOS E POSTERIORES (Alta Intensidade)",
                infoAdicional: "Descanso: 90 segundos. Foco na descida super controlada (cadência 4s).",
                exercicios: [
                    { nome: "Hip Thrust com barra pesada (Elevação Pélvica)", series: "4x8-12 (Última com Dropset)", tipo: "composto" },
                    { nome: "Stiff com barra (Foco em alongamento)", series: "4x8-10", tipo: "composto" },
                    { nome: "Mesa Flexora (Contração de 2s no pico)", series: "4x10-12", tipo: "isolador" },
                    { nome: "Cadeira Flexora", series: "4x12 + Dropset na última", tipo: "isolador" },
                    { nome: "Afundo caminhando com halteres pesados", series: "3x12 passos cada perna", tipo: "composto" },
                    { nome: "Cadeira Abdutora inclinada para frente", series: "4x20 (isometria de 3s no final)", tipo: "isolador" }
                ]
            },
            {
                dia: 2,
                musculo: "COSTAS E OMBROS (Definição Superior)",
                infoAdicional: "Descanso: 60 segundos. Treino em supersérie para queima de gordura e tônus.",
                secoes: [
                    {
                        titulo: "Costas",
                        exercicios: [
                            { nome: "Puxada frontal aberta na polia", series: "4x10-12", tipo: "composto" },
                            { nome: "Remada baixa articulada supinada", series: "4x10-12", tipo: "composto" },
                            { nome: "Remada curvada pronada com barra", series: "3x12", tipo: "composto" }
                        ]
                    },
                    {
                        titulo: "Ombros e Core",
                        exercicios: [
                            { nome: "Desenvolvimento com halteres sentado", series: "4x10", tipo: "composto" },
                            { nome: "Elevação lateral polia (unilateral)", series: "4x12-15 + Dropset", tipo: "isolador" },
                            { nome: "Prancha abdominal com peso nas costas", series: "3x45 segundos", tipo: "isometria" }
                        ]
                    }
                ]
            },
            {
                dia: 3,
                musculo: "QUADRÍCEPS E PANTURRILHAS (Definição Pernas)",
                infoAdicional: "Descanso: 90 a 120 segundos. Alta sobrecarga com segurança.",
                exercicios: [
                    { nome: "Agachamento livre com barra olímpica", series: "4x8-10", tipo: "composto" },
                    { nome: "Leg Press 45°", series: "4x12 (Última com Rest-Pause)", tipo: "composto" },
                    { nome: "Cadeira Extensora", series: "4x15 + Dropset", tipo: "isolador" },
                    { nome: "Hack Machine (Pés baixos - quadríceps)", series: "3x10-12", tipo: "composto" },
                    { nome: "Passada no Smith", series: "3x12 cada perna", tipo: "composto" },
                    { nome: "Panturrilha no Leg Press", series: "5x15-20", tipo: "isolador" }
                ]
            },
            {
                dia: 4,
                musculo: "BRAÇOS E ABDÔMEN (Definição e Fortalecimento)",
                infoAdicional: "Descanso: 60 segundos. Executar em Bi-série.",
                secoes: [
                    {
                        titulo: "Membros Superiores",
                        exercicios: [
                            { nome: "Rosca direta com barra W", series: "3x12", tipo: "isolador" },
                            { nome: "Rosca martelo com halteres", series: "3x12", tipo: "isolador" },
                            { nome: "Tríceps testa com barra W", series: "3x12", tipo: "isolador" },
                            { nome: "Tríceps corda na polia alta", series: "3x12", tipo: "isolador" }
                        ]
                    },
                    {
                        titulo: "Abdômen Avançado",
                        exercicios: [
                            { nome: "Elevação de pernas na barra fixa", series: "3x15", tipo: "composto" },
                            { nome: "Prancha lateral com elevação de quadril", series: "3x12 cada lado", tipo: "composto" }
                        ]
                    }
                ]
            },
            {
                dia: 5,
                musculo: "GLÚTEOS COMPLETOS + METABÓLICO INTENSO",
                infoAdicional: "Descanso nos exercícios: 60 segundos. Circuito no final sem descanso.",
                exercicios: [
                    { nome: "Hip Thrust Unilateral com halter", series: "3x12 cada perna", tipo: "composto" },
                    { nome: "Agachamento Sumô pesado com halter", series: "4x12 (foco no glúteo)", tipo: "composto" },
                    { nome: "Coice com cabo na polia baixa", series: "4x12 cada perna", tipo: "isolador" },
                    { nome: "Step Up no banco com halteres", series: "3x12 cada perna", tipo: "composto" },
                    { nome: "Levantamento Terra Romeno halteres", series: "3x12", tipo: "composto" }
                ],
                circuito: {
                    titulo: "Queima Metabólica de Alta Performance",
                    voltas: 4,
                    regras: "4 voltas completas sem descansar entre os exercícios. 1 min de descanso entre as voltas.",
                    exercicios: [
                        { nome: "Agachamentos com salto", quantidade: "15 repetições" },
                        { nome: "Afundo alternado com salto (Lunge jump)", quantidade: "16 repetições totais" },
                        { nome: "Polichinelos rápidos", quantidade: "30 repetições" },
                        { nome: "Prancha tocando os ombros", quantidade: "20 repetições" }
                    ]
                }
            }
        ]
    }
};

// ===================================================================
// VARIÁVEIS GLOBAIS DE ESTADO DA APLICAÇÃO
// ===================================================================
let activeGender = localStorage.getItem('activeGender') || 'homem'; // Gênero ativo (homem / mulher)
let activeDay = parseInt(localStorage.getItem('activeDay')) || 1; // Dia ativo do cronograma (1 a 5)
let activeLevel = localStorage.getItem('activeLevel') || 'intermediario'; // Nível de intensidade (iniciante / intermediario / avancado)
let activeView = 'hub'; // Nome da tela ativa no sistema SPA (hub / workouts / progress / diet)

// Variáveis de controle do Cronômetro de descanso
let timerInterval = null; // Armazena a referência da contagem
let timerTimeLeft = 0; // Segundos restantes
let timerTotalDuration = 0; // Segundos totais configurados no início
let timerIsRunning = false; // Flag se o timer está ativo
let timerEndTime = 0; // Timestamp exato de encerramento do cronômetro
let wakeLock = null; // Instância da API Wake Lock para manter tela acesa

// Variáveis de controle do Spotify
let spotifyAccessToken = localStorage.getItem('spotify_token') || null; // Token de acesso OAuth do Spotify
let spotifyPlaybackInterval = null; // Intervalo para polling de música atual
let spotifyUserPlaylists = []; // Lista de playlists do usuário logado

// ===================================================================
// MAPEAMENTO DOS ELEMENTOS DO DOM
// ===================================================================
const domElements = {
    // Botões e navegação do Hub
    btnHomem: document.getElementById('btn-gender-male'),
    btnMulher: document.getElementById('btn-gender-female'),
    btnBackHub: document.getElementById('btn-back-hub'),
    appNavBar: document.getElementById('app-nav-bar'),
    navTitleText: document.getElementById('nav-title-text'),
    
    // Telas (Views) da aplicação SPA
    viewHub: document.getElementById('view-hub'),
    viewWorkouts: document.getElementById('view-workouts'),
    viewProgress: document.getElementById('view-progress'),
    viewDiet: document.getElementById('view-diet'),
    
    // Cards de navegação do Hub
    cardWorkouts: document.getElementById('card-goto-workouts'),
    cardProgress: document.getElementById('card-goto-progress'),
    cardDiet: document.getElementById('card-goto-diet'),
    
    // Elementos de Resumo do Hub
    summaryWorkoutsDone: document.getElementById('summary-workouts-done'),
    summaryImcValue: document.getElementById('summary-imc-value'),
    
    // Seletores e painéis de treinos
    levelSelector: document.getElementById('level-selector-toggle'),
    daysContainer: document.getElementById('days-selector'),
    workoutTitle: document.getElementById('workout-day-title'),
    workoutTarget: document.getElementById('workout-target-group'),
    workoutMeta: document.getElementById('workout-meta-info'),
    exercisesContainer: document.getElementById('exercises-list-container'),
    circuitoContainer: document.getElementById('circuit-container'),
    progressPercent: document.getElementById('progress-percentage'),
    progressBar: document.getElementById('progress-bar-fill'),
    btnResetWorkout: document.getElementById('btn-reset-workout-data'),
    btnRestoreDefaultWorkout: document.getElementById('btn-restore-default-workout'), // Botão para restaurar o treino padrão do dia
    
    // Elementos do Cronômetro
    timerDisplay: document.getElementById('timer-time'),
    timerProgressBar: document.getElementById('timer-bar-fill'),
    timerBtnToggle: document.getElementById('timer-btn-toggle'),
    timerBtnReset: document.getElementById('timer-btn-reset'),
    timerDurationButtons: document.querySelectorAll('.timer-btn-preset'),
    timerWidgetPanel: document.getElementById('timer-widget-panel'), // Painel principal do widget do cronômetro
    timerHeaderClick: document.getElementById('timer-header-click'), // Cabeçalho clicável do cronômetro para recolher/expandir
    timerTitleElement: document.getElementById('timer-title-element'), // Elemento do título do cronômetro (contém o ícone/texto)

    
    // Elementos da Evolução Física e IMC
    formProgress: document.getElementById('form-progress-register'),
    inputWeight: document.getElementById('input-weight'),
    inputHeight: document.getElementById('input-height'),
    inputTime: document.getElementById('input-time'),
    inputCalories: document.getElementById('input-calories'),
    imcCircleContainer: document.getElementById('imc-circle-container'),
    imcNumber: document.getElementById('imc-number'),
    imcStatus: document.getElementById('imc-status'),
    imcDescription: document.getElementById('imc-description'),
    imcPointer: document.getElementById('imc-pointer'),
    progressHistoryList: document.getElementById('progress-history-list'),
    
    // Elementos de Dieta e Cardápios
    dietPresetInfo: document.getElementById('diet-preset-info'),
    customMealsContainer: document.getElementById('custom-meals-container'),
    btnOpenCustomDietModal: document.getElementById('btn-open-custom-diet-modal'),
    btnCloseDietModal: document.getElementById('btn-close-diet-modal'),
    modalCustomDiet: document.getElementById('modal-custom-diet'),
    formCustomDiet: document.getElementById('form-custom-diet'),
    dietBreakfast: document.getElementById('diet-breakfast'),
    dietLunch: document.getElementById('diet-lunch'),
    dietSnack: document.getElementById('diet-snack'),
    dietDinner: document.getElementById('diet-dinner'),
    
    // Elementos de Treinos Customizados (Modais)
    modalCustomWorkout: document.getElementById('modal-custom-workout'),
    btnOpenCustomWorkoutModal: document.getElementById('btn-open-custom-workout-modal'),
    btnCloseWorkoutModal: document.getElementById('btn-close-workout-modal'),
    formCustomWorkout: document.getElementById('form-custom-workout'),
    inputCustomMuscle: document.getElementById('input-custom-muscle'),
    inputCustomInfo: document.getElementById('input-custom-info'),
    customExercisesFieldsContainer: document.getElementById('custom-exercises-fields-container'),
    btnAddExerciseField: document.getElementById('btn-add-exercise-field'),
    
    // Elementos do Spotify Widget
    spotifyWidgetPanel: document.getElementById('spotify-widget-panel'),
    spotifyHeaderClick: document.getElementById('spotify-header-click'),
    spotifyBtnExpand: document.getElementById('spotify-btn-expand'),
    spotifyArrowIcon: document.getElementById('spotify-arrow-icon'),
    spotifyAreaLoggedOut: document.getElementById('spotify-area-logged-out'),
    spotifyAreaLoggedIn: document.getElementById('spotify-area-logged-in'),
    btnSpotifyConnectAction: document.getElementById('btn-spotify-connect-action'),
    spotifyUserAvatar: document.getElementById('spotify-user-avatar'),
    spotifyUserName: document.getElementById('spotify-user-name'),
    spotifyTrackArt: document.getElementById('spotify-track-art'),
    spotifyTrackTitle: document.getElementById('spotify-track-title'),
    spotifyTrackArtist: document.getElementById('spotify-track-artist'),
    spotifyPlaylistsDropdown: document.getElementById('spotify-playlists-dropdown'),
    spotifyMediaPrev: document.getElementById('spotify-media-prev'),
    spotifyMediaToggle: document.getElementById('spotify-media-toggle'),
    spotifyPlayIcon: document.getElementById('spotify-play-icon'),
    spotifyMediaNext: document.getElementById('spotify-media-next'),
    spotifyVolumeSlider: document.getElementById('spotify-volume-slider'),
    spotifyVolumeValue: document.getElementById('spotify-volume-value')
};

// ===================================================================
// BANCO DE DADOS DE DIETAS RECOMENDADAS (PRESETS)
// ===================================================================
const dietPresets = {
    definicao: {
        titulo: "Definição Muscular",
        subtitulo: "Foco em manter massa magra e reduzir gordura corporal através de corte calórico limpo.",
        refeicoes: [
            { nome: "Café da Manhã", conteudo: "3 ovos inteiros mexidos + 2 fatias de pão de forma integral + café preto sem açúcar." },
            { nome: "Almoço", conteudo: "150g de peito de frango grelhado + 100g de arroz integral + salada de folhas verdes à vontade." },
            { nome: "Lanche da Tarde", conteudo: "1 dose de Whey Protein batido com água + 1 banana média + 30g de aveia em flocos." },
            { nome: "Jantar", conteudo: "150g de filé de tilápia grelhado + 100g de batata doce cozida + porção de brócolis no vapor." }
        ]
    },
    emagrecimento: {
        titulo: "Queima de Gordura (Déficit Calórico)",
        subtitulo: "Foco em restrição calórica controlada e aumento da queima de energia.",
        refeicoes: [
            { nome: "Café da Manhã", conteudo: "Omelete de 2 ovos + 1 fatia de mamão papaia média com sementes de chia." },
            { nome: "Almoço", conteudo: "120g de carne bovina magra + mix de legumes cozidos + bastante salada verde + 1 colher de sopa de azeite extra virgem." },
            { nome: "Lanche da Tarde", conteudo: "1 pote de iogurte natural desnatado + 15g de castanhas de caju ou amêndoas." },
            { nome: "Jantar", conteudo: "150g de filé de frango + 150g de abóbora cabotiá cozida + salada de folhas à vontade." }
        ]
    },
    hipertrofia: {
        titulo: "Ganho de Massa (Superávit Calórico)",
        subtitulo: "Foco no fornecimento máximo de energia e proteínas para a construção de tecidos musculares.",
        refeicoes: [
            { nome: "Café da Manhã", conteudo: "4 ovos inteiros mexidos + 3 fatias de pão de forma integral + suco de laranja natural ou mamão batido." },
            { nome: "Almoço", conteudo: "200g de patinho bovino moído + 200g de arroz branco cozido + feijão + salada variada." },
            { nome: "Lanche da Tarde", conteudo: "Shake proteico: 2 bananas, 1 dose de Whey Protein, 30g de pasta de amendoim integral e leite desnatado." },
            { nome: "Jantar", conteudo: "200g de filé de peito de frango + 250g de purê de batata inglesa ou mandioca cozida." }
        ]
    }
};

// ===================================================================
// NAVEGAÇÃO ENTRE TELAS DO SISTEMA (SPA)
// ===================================================================
/**
 * Alterna dinamicamente a view ativa da aplicação ocultando as outras
 * @param {string} viewName Nome da seção desejada ('hub', 'workouts', 'progress', 'diet')
 */
function switchView(viewName) {
    activeView = viewName;
    
    // Oculta todas as views de tela
    const views = [domElements.viewHub, domElements.viewWorkouts, domElements.viewProgress, domElements.viewDiet];
    views.forEach(v => {
        if (v) {
            v.classList.remove('active');
            v.classList.add('hidden');
        }
    });
    
    // Exibe a view selecionada e ajusta títulos da barra superior
    let title = "FiiW HUNTER";
    if (viewName === 'hub') {
        if (domElements.appNavBar) domElements.appNavBar.style.display = 'none';
        updateHubSummary();
    } else {
        if (domElements.appNavBar) domElements.appNavBar.style.display = 'flex';
        
        if (viewName === 'workouts') {
            title = "Cronograma de Treino";
            renderDaysTabs();
            renderActiveWorkout();
            
            // Marca o nível ativo selecionado visualmente nos botões
            const levelBtns = domElements.levelSelector.querySelectorAll('.level-btn');
            levelBtns.forEach(btn => {
                if (btn.getAttribute('data-level') === activeLevel) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        } else if (viewName === 'progress') {
            title = "Histórico & Evolução";
            renderProgressHistory();
            recalculateLastImc();
        } else if (viewName === 'diet') {
            title = "Dieta & Nutrição";
            renderDietPreset('definicao');
            renderCustomDiet();
        }
        
        if (domElements.navTitleText) domElements.navTitleText.innerText = title;
    }
    
    // Remove o estado oculto da view ativa
    const activeEl = document.getElementById(`view-${viewName}`);
    if (activeEl) {
        activeEl.classList.remove('hidden');
        activeEl.classList.add('active');
    }
}

// ===================================================================
// LÓGICA DO CRONOGRAMA DE EXERCÍCIOS E NÍVEIS
// ===================================================================
/**
 * Salva e persiste os estados de conclusão no localStorage por nível
 */
function setExerciseState(gender, day, exerciseKey, isCompleted) {
    const key = `completed_${gender}_${activeLevel}_day${day}_${exerciseKey}`;
    if (isCompleted) {
        localStorage.setItem(key, 'true');
    } else {
        localStorage.removeItem(key);
    }
}

/**
 * Recupera os estados de conclusão salvos no localStorage por nível
 */
function getExerciseState(gender, day, exerciseKey) {
    const key = `completed_${gender}_${activeLevel}_day${day}_${exerciseKey}`;
    return localStorage.getItem(key) === 'true';
}

/**
 * Altera o gênero ativo no site e atualiza as classes visuais no elemento body
 */
function switchGender(gender) {
    activeGender = gender;
    localStorage.setItem('activeGender', gender);
    
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
    
    // Atualiza o treino ativo se estiver na tela de treinos
    if (activeView === 'workouts') {
        renderDaysTabs();
        renderActiveWorkout();
    } else if (activeView === 'hub') {
        updateHubSummary();
    }
}

/**
 * Altera o nível ativo de intensidade do treino
 * @param {string} level Nível selecionado ('iniciante', 'intermediario', 'avancado')
 */
function switchLevel(level) {
    activeLevel = level;
    localStorage.setItem('activeLevel', level);
    
    const levelButtons = domElements.levelSelector.querySelectorAll('.level-btn');
    levelButtons.forEach(btn => {
        if (btn.getAttribute('data-level') === level) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Recarrega as abas de dias e o treino ativo
    renderDaysTabs();
    renderActiveWorkout();
}

/**
 * Altera o dia ativo do treino (1 a 5)
 */
function switchDay(day) {
    activeDay = day;
    localStorage.setItem('activeDay', day);
    
    const dayButtons = domElements.daysContainer.querySelectorAll('.day-tab-btn');
    dayButtons.forEach(btn => {
        if (parseInt(btn.getAttribute('data-day')) === day) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderActiveWorkout();
}

/**
 * Renderiza de forma dinâmica as abas dos dias da semana baseadas no gênero e nível selecionados
 */
function renderDaysTabs() {
    if (!domElements.daysContainer) return;
    domElements.daysContainer.innerHTML = '';
    const currentList = workoutsData[activeGender][activeLevel];
    
    currentList.forEach(workout => {
        const btn = document.createElement('button');
        btn.className = `day-tab-btn ${workout.dia === activeDay ? 'active' : ''}`;
        btn.setAttribute('data-day', workout.dia);
        btn.setAttribute('id', `tab-day-${workout.dia}`);
        
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
    if (!domElements.exercisesContainer) return;
    const checkBoxes = domElements.exercisesContainer.querySelectorAll('.exercise-checkbox');
    const totalCount = checkBoxes.length;
    let completedCount = 0;
    
    checkBoxes.forEach(cb => {
        if (cb.checked) {
            completedCount++;
        }
    });
    
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    
    if (domElements.progressPercent) domElements.progressPercent.innerText = `${percentage}%`;
    if (domElements.progressBar) domElements.progressBar.style.width = `${percentage}%`;
    
    if (percentage === 100 && domElements.progressBar) {
        domElements.progressBar.classList.add('completed-glow');
    } else if (domElements.progressBar) {
        domElements.progressBar.classList.remove('completed-glow');
    }
}

/**
 * Cria o card HTML correspondente a um exercício individual
 */
function createExerciseCard(exercise, index) {
    const card = document.createElement('div');
    card.className = `exercise-card ${exercise.tipo || 'composto'}`;
    
    const exerciseKey = `ex_${index}_${exercise.nome.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
    const isChecked = getExerciseState(activeGender, activeDay, exerciseKey);
    
    if (isChecked) {
        card.classList.add('checked');
    }
    
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
    
    const chk = card.querySelector('.exercise-checkbox');
    chk.addEventListener('change', (e) => {
        const checked = e.target.checked;
        setExerciseState(activeGender, activeDay, exerciseKey, checked);
        
        if (checked) {
            card.classList.add('checked');
            triggerTimerPulse();
        } else {
            card.classList.remove('checked');
        }
        calculateAndUpdateProgress();
    });
    
    return card;
}

/**
 * Renderiza os dados do treino ativo (busca do localStorage se customizado, ou dos presets)
 */
function renderActiveWorkout() {
    // Tenta obter o treino customizado pelo usuário no localStorage
    const customWorkoutKey = `customWorkout_${activeGender}_${activeLevel}_day${activeDay}`;
    const customWorkoutData = localStorage.getItem(customWorkoutKey);
    let workout = JSON.parse(customWorkoutData);
    
    // Se existir treino customizado salvo para o dia selecionado, exibimos o botão de restaurar, caso contrário, ocultamos
    if (domElements.btnRestoreDefaultWorkout) {
        if (customWorkoutData) {
            domElements.btnRestoreDefaultWorkout.style.display = 'inline-flex';
        } else {
            domElements.btnRestoreDefaultWorkout.style.display = 'none';
        }
    }
    
    if (!workout) {
        // Se não houver treino customizado pelo usuário, carregamos os dados do banco estático do aplicativo
        const levelData = workoutsData[activeGender][activeLevel];
        workout = levelData.find(w => w.dia === activeDay);
    }
    
    if (!workout) return;
    
    domElements.workoutTitle.innerText = `DIA ${workout.dia}`;
    domElements.workoutTarget.innerText = workout.musculo;
    domElements.workoutMeta.innerText = workout.infoAdicional || "";
    
    domElements.exercisesContainer.innerHTML = '';
    domElements.circuitoContainer.innerHTML = '';
    domElements.circuitoContainer.style.display = 'none';
    
    if (workout.secoes) {
        workout.secoes.forEach((secao, secIndex) => {
            const sectionHeader = document.createElement('h3');
            sectionHeader.className = 'workout-section-title';
            sectionHeader.innerText = secao.titulo;
            domElements.exercisesContainer.appendChild(sectionHeader);
            
            secao.exercicios.forEach((ex, exIndex) => {
                const card = createExerciseCard(ex, `sec_${secIndex}_ex_${exIndex}`);
                domElements.exercisesContainer.appendChild(card);
            });
        });
    } else if (workout.exercicios) {
        workout.exercicios.forEach((ex, index) => {
            const card = createExerciseCard(ex, index);
            domElements.exercisesContainer.appendChild(card);
        });
    }
    
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
    
    calculateAndUpdateProgress();
}

// ===================================================================
// LÓGICA DO CRONÔMETRO DE DESCANSO (COM WAKE LOCK)
// ===================================================================
/**
 * Toca o bipe sonoro utilizando a Web Audio API
 */
function playAlertSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
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
        
        const now = audioCtx.currentTime;
        playBeep(now, 880, 0.2); // Beep 1
        playBeep(now + 0.3, 880, 0.2); // Beep 2
        playBeep(now + 0.6, 1200, 0.4); // Beep 3 (tom diferenciado)
    } catch (error) {
        console.warn('Web Audio API não suportada ou sem permissão.', error);
    }
}

/**
 * Formata segundos no padrão MM:SS
 */
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Atualiza visualmente o círculo de progresso e o display numérico do timer
 */
function updateTimerUI() {
    // Define o texto do cronômetro no display principal
    domElements.timerDisplay.innerText = formatTime(timerTimeLeft);
    
    // Atualiza a barra de progresso horizontal superior do cronômetro
    if (timerTotalDuration > 0) {
        const progressPercent = (timerTimeLeft / timerTotalDuration) * 100;
        domElements.timerProgressBar.style.width = `${progressPercent}%`;
    } else {
        domElements.timerProgressBar.style.width = '0%';
    }

    // Adiciona o atributo data-time-left no painel do widget para expor o tempo restante de forma que possa ser lido pelo CSS da bolha no celular
    if (domElements.timerWidgetPanel) {
        domElements.timerWidgetPanel.setAttribute('data-time-left', formatTime(timerTimeLeft));
    }
}

/**
 * Mantém a tela acesa (Wake Lock)
 */
async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) {
        console.warn('Não foi possível solicitar Wake Lock:', err.message);
    }
}

/**
 * Libera o Wake Lock permitindo a suspensão normal da tela
 */
function releaseWakeLock() {
    if (wakeLock !== null) {
        wakeLock.release().then(() => {
            wakeLock = null;
        });
    }
}

/**
 * Inicia a contagem regressiva do timer
 */
function startTimer() {
    if (timerIsRunning) return;
    
    timerIsRunning = true;
    requestWakeLock(); // Solicita manter tela acesa

    // Adiciona a classe de controle 'timer-active-running' no painel principal para indicar que o cronômetro está rodando ativamente
    if (domElements.timerWidgetPanel) {
        domElements.timerWidgetPanel.classList.add('timer-active-running');
    }
    
    // Define o fim exato da contagem baseado no timestamp atual
    timerEndTime = Date.now() + (timerTimeLeft * 1000);
    
    domElements.timerBtnToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
    `; // Ícone de pausa
    domElements.timerBtnToggle.classList.add('running');
    
    timerInterval = setInterval(() => {
        const now = Date.now();
        const difference = Math.round((timerEndTime - now) / 1000);
        
        if (difference >= 0) {
            timerTimeLeft = difference;
            updateTimerUI();
        } else {
            stopTimer();
            playAlertSound();
            flashTimerDisplay();
        }
    }, 1000);
}

/**
 * Pausa a execução do cronômetro
 */
function stopTimer() {
    if (!timerIsRunning) return;
    
    timerIsRunning = false;
    clearInterval(timerInterval);
    releaseWakeLock(); // Libera a tela

    // Remove a classe de controle 'timer-active-running' do painel principal indicando que o timer parou
    if (domElements.timerWidgetPanel) {
        domElements.timerWidgetPanel.classList.remove('timer-active-running');
    }
    
    domElements.timerBtnToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
    `; // Ícone de play
    domElements.timerBtnToggle.classList.remove('running');
}

/**
 * Reseta o cronômetro para o tempo definido inicialmente
 */
function resetTimer() {
    stopTimer();
    timerTimeLeft = timerTotalDuration;
    updateTimerUI();
}

/**
 * Pulsação visual no timer
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
 * Efeito visual de piscada ao finalizar o tempo do cronômetro
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
 * Define o tempo de descanso e inicia o cronômetro
 */
function selectTimerPreset(seconds) {
    stopTimer();
    timerTotalDuration = seconds;
    timerTimeLeft = seconds;
    updateTimerUI();
    startTimer();
}

// Ouvinte para reajustar o cronômetro quando a tela for desbloqueada ou o app reaberto
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && timerIsRunning) {
        const now = Date.now();
        const difference = Math.round((timerEndTime - now) / 1000);
        
        if (difference > 0) {
            timerTimeLeft = difference;
            updateTimerUI();
            requestWakeLock();
        } else {
            timerTimeLeft = 0;
            updateTimerUI();
            stopTimer();
            playAlertSound();
            flashTimerDisplay();
        }
    }
});

// ===================================================================
// LÓGICA DO MÓDULO DE REGISTROS DE EVOLUÇÃO FÍSICA E IMC
// ===================================================================
/**
 * Salva as métricas diárias inseridas pelo usuário no localStorage
 */
function saveProgressRecord(weight, height, time, calories) {
    const records = JSON.parse(localStorage.getItem('progressHistory')) || [];
    
    // Calcula o IMC correspondente
    const heightInMeters = height / 100;
    const imc = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
    
    // Obtém data de hoje formatada
    const today = new Date();
    const dateStr = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}`;
    
    const newRecord = {
        data: dateStr,
        peso: weight,
        altura: height,
        tempo: time,
        calorias: calories,
        imc: imc,
        timestamp: Date.now()
    };
    
    records.unshift(newRecord); // Adiciona no início da lista
    localStorage.setItem('progressHistory', JSON.stringify(records));
    
    // Atualiza a exibição e recarrega os dados do IMC
    renderProgressHistory();
    recalculateLastImc();
}

/**
 * Remove um registro físico específico do histórico
 * @param {number} index Índice do item no array do histórico
 */
function deleteProgressRecord(index) {
    const records = JSON.parse(localStorage.getItem('progressHistory')) || [];
    records.splice(index, 1);
    localStorage.setItem('progressHistory', JSON.stringify(records));
    renderProgressHistory();
    recalculateLastImc();
}

/**
 * Renderiza a lista de histórico na view
 */
function renderProgressHistory() {
    if (!domElements.progressHistoryList) return;
    const records = JSON.parse(localStorage.getItem('progressHistory')) || [];
    
    domElements.progressHistoryList.innerHTML = '';
    
    if (records.length === 0) {
        domElements.progressHistoryList.innerHTML = '<li class="history-empty">Nenhum registro cadastrado ainda.</li>';
        return;
    }
    
    records.forEach((rec, idx) => {
        const item = document.createElement('li');
        item.className = 'history-item';
        
        // Define a classe de classificação do IMC
        let imcClass = 'imc-normal';
        if (rec.imc < 18.5) imcClass = 'imc-underweight';
        else if (rec.imc >= 25 && rec.imc < 30) imcClass = 'imc-overweight';
        else if (rec.imc >= 30) imcClass = 'imc-obese';
        
        item.innerHTML = `
            <div class="history-item-left">
                <span class="date">${rec.data}</span>
                <span class="metrics">${rec.peso}kg | ${rec.altura}cm | ${rec.tempo}min | ${rec.calorias}kcal</span>
            </div>
            <div class="history-item-right">
                <span class="history-imc-badge ${imcClass}">IMC: ${rec.imc}</span>
                <button class="btn-delete-record" data-index="${idx}" aria-label="Excluir registro">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;
        
        // Adiciona ouvinte para deletar registro
        item.querySelector('.btn-delete-record').addEventListener('click', () => {
            if (confirm('Excluir este registro permanentemente?')) {
                deleteProgressRecord(idx);
            }
        });
        
        domElements.progressHistoryList.appendChild(item);
    });
}

/**
 * Calcula e atualiza visualmente o painel da calculadora e a barra de ponteiro do IMC
 */
function recalculateLastImc() {
    const records = JSON.parse(localStorage.getItem('progressHistory')) || [];
    
    if (records.length === 0) {
        domElements.imcNumber.innerText = '--';
        domElements.imcStatus.innerText = 'Aguardando dados...';
        domElements.imcDescription.innerText = 'Registre seu peso e altura para calcular.';
        domElements.imcPointer.style.left = '0%';
        domElements.imcCircleContainer.className = 'imc-circle';
        return;
    }
    
    const lastRecord = records[0]; // Pega o último registro adicionado
    const imc = lastRecord.imc;
    domElements.imcNumber.innerText = imc;
    
    // Classifica o IMC e define os textos e cores correspondentes
    let status = '';
    let desc = '';
    let imcClass = '';
    let percentagePosition = 0; // Posição de 0% a 100% na barra visual
    
    if (imc < 18.5) {
        status = 'Abaixo do peso';
        desc = 'Você está abaixo do peso ideal para a sua altura. Considere uma dieta de hipertrofia.';
        imcClass = 'imc-underweight';
        // Interpola a posição na barra (escala de 10 a 18.5 -> 0% a 25%)
        percentagePosition = Math.max(5, Math.min(20, ((imc - 10) / 8.5) * 25));
    } else if (imc >= 18.5 && imc < 25) {
        status = 'Peso normal (Ideal)';
        desc = 'Parabéns! Você está em uma faixa de peso saudável. Mantenha os treinos e dieta!';
        imcClass = 'imc-normal';
        // Interpola a posição na barra (escala de 18.5 a 25 -> 25% a 50%)
        percentagePosition = 25 + (((imc - 18.5) / 6.5) * 25);
    } else if (imc >= 25 && imc < 30) {
        status = 'Sobrepeso';
        desc = 'Sua faixa de peso indica um leve sobrepeso. Foco em treinos intensos e déficit calórico moderado.';
        imcClass = 'imc-overweight';
        // Interpola a posição na barra (escala de 25 a 30 -> 50% a 75%)
        percentagePosition = 50 + (((imc - 25) / 5) * 25);
    } else {
        status = 'Obesidade';
        desc = 'Atenção! Seu IMC indica obesidade. Foco em queima calórica e reeducação alimentar.';
        imcClass = 'imc-obese';
        // Interpola a posição na barra (escala de 30 a 40 -> 75% a 95%)
        percentagePosition = 75 + Math.min(20, (((imc - 30) / 10) * 25));
    }
    
    // Atualiza o DOM
    domElements.imcStatus.innerText = status;
    domElements.imcDescription.innerText = desc;
    domElements.imcCircleContainer.className = `imc-circle ${imcClass}`;
    domElements.imcPointer.style.left = `${percentagePosition}%`;
}

// ===================================================================
// LÓGICA DO MÓDULO DE DIETAS (PRESETS E CUSTOMIZADAS)
// ===================================================================
/**
 * Renderiza os dados do preset de dieta selecionado
 * @param {string} dietName Identificador da dieta ('definicao', 'emagrecimento', 'hipertrofia')
 */
function renderDietPreset(dietName) {
    const data = dietPresets[dietName];
    if (!data || !domElements.dietPresetInfo) return;
    
    let html = `
        <h4>${data.titulo}</h4>
        <p>${data.subtitulo}</p>
        <ul class="diet-preset-list">
    `;
    
    data.refeicoes.forEach(ref => {
        html += `
            <li class="diet-preset-item">
                <strong>${ref.nome}</strong>
                <span>${ref.conteudo}</span>
            </li>
        `;
    });
    
    html += `</ul>`;
    domElements.dietPresetInfo.innerHTML = html;
}

/**
 * Renderiza o cardápio personalizado inserido pelo usuário
 */
function renderCustomDiet() {
    if (!domElements.customMealsContainer) return;
    
    // Carrega dados do localStorage ou inicia com valores em branco
    const customDiet = JSON.parse(localStorage.getItem('customDiet')) || {
        breakfast: "Nenhum alimento cadastrado.",
        lunch: "Nenhum alimento cadastrado.",
        snack: "Nenhum alimento cadastrado.",
        dinner: "Nenhum alimento cadastrado."
    };
    
    domElements.customMealsContainer.innerHTML = `
        <!-- Café da Manhã -->
        <div class="meal-card">
            <div class="meal-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
            </div>
            <div class="meal-card-content">
                <h4>Café da Manhã</h4>
                <p>${customDiet.breakfast || 'Nenhum alimento cadastrado.'}</p>
            </div>
        </div>
        <!-- Almoço -->
        <div class="meal-card">
            <div class="meal-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
            </div>
            <div class="meal-card-content">
                <h4>Almoço</h4>
                <p>${customDiet.lunch || 'Nenhum alimento cadastrado.'}</p>
            </div>
        </div>
        <!-- Lanche da Tarde -->
        <div class="meal-card">
            <div class="meal-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
                </svg>
            </div>
            <div class="meal-card-content">
                <h4>Lanche da Tarde</h4>
                <p>${customDiet.snack || 'Nenhum alimento cadastrado.'}</p>
            </div>
        </div>
        <!-- Jantar -->
        <div class="meal-card">
            <div class="meal-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 14 14"/>
                </svg>
            </div>
            <div class="meal-card-content">
                <h4>Jantar</h4>
                <p>${customDiet.dinner || 'Nenhum alimento cadastrado.'}</p>
            </div>
        </div>
    `;
}

// ===================================================================
// SISTEMA DE RESUMO DE DADOS DO HUB INICIAL
// ===================================================================
/**
 * Atualiza os indicadores rápidos exibidos na tela inicial (Hub)
 */
function updateHubSummary() {
    // 1. Atualiza contador de treinos completados (exercícios feitos)
    const checkBoxes = domElements.exercisesContainer ? domElements.exercisesContainer.querySelectorAll('.exercise-checkbox') : [];
    const totalCount = checkBoxes.length;
    let completedCount = 0;
    
    checkBoxes.forEach(cb => {
        if (cb.checked) {
            completedCount++;
        }
    });
    
    if (domElements.summaryWorkoutsDone) {
        domElements.summaryWorkoutsDone.innerText = `${completedCount}/${totalCount}`;
    }
    
    // 2. Atualiza último IMC calculado
    const records = JSON.parse(localStorage.getItem('progressHistory')) || [];
    if (domElements.summaryImcValue) {
        if (records.length > 0) {
            domElements.summaryImcValue.innerText = records[0].imc;
        } else {
            domElements.summaryImcValue.innerText = '--';
        }
    }
}

// ===================================================================
// INTEGRAÇÃO COMPLETA COM O SPOTIFY (WEB API OAUTH)
// ===================================================================
/**
 * Redireciona o usuário para login do Spotify (Implicit Grant Flow)
 */
/**
 * Gera uma string aleatória criptograficamente segura para o code_verifier do fluxo PKCE
 * @param {number} length Comprimento da string gerada
 * @returns {string} String aleatória
 */
function generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

/**
 * Cria o hash SHA-256 a partir do code_verifier e o codifica em formato base64url seguro
 * @param {string} codeVerifier O segredo gerado anteriormente
 * @returns {Promise<string>} O code_challenge correspondente
 */
async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

/**
 * Redireciona o usuário para login do Spotify (Authorization Code Flow com PKCE)
 */
async function loginComSpotify() {
    // Gera e salva o code_verifier localmente na sessão do usuário
    const codeVerifier = generateRandomString(64);
    localStorage.setItem('spotify_code_verifier', codeVerifier);
    
    // Gera o desafio code_challenge a partir da chave gerada
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    
    const scopes = [
        'user-modify-playback-state', // Permite pausar, pular faixas, iniciar reprodução
        'user-read-playback-state',   // Permite obter a música atual que está tocando
        'playlist-read-private',      // Permite obter playlists privadas do usuário
        'playlist-read-collaborative', // Permite obter playlists colaborativas
        'user-read-private'           // Adicionado para identificar se o plano é Premium ou Free
    ];
    
    // Monta a URL de autenticação com os novos parâmetros obrigatórios do fluxo PKCE
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&redirect_uri=${encodeURIComponent(spotifyRedirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=code&code_challenge_method=S256&code_challenge=${codeChallenge}&show_dialog=true`;
    
    window.location.href = authUrl; // Redireciona para o portal do Spotify
}

/**
 * Trata o retorno do código de autorização na URL (?code=...) e resgata o Token de Acesso via chamada de API (POST)
 */
async function checarTokenDeRetornoSpotify() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
        // Limpa o parâmetro da URL do navegador de forma silenciosa para manter a barra limpa
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Recupera o code_verifier original que salvamos antes do redirecionamento
        const codeVerifier = localStorage.getItem('spotify_code_verifier');
        localStorage.removeItem('spotify_code_verifier'); // Limpa a chave temporária
        
        try {
            // Faz a requisição POST oficial para a API de tokens do Spotify trocando o código pelo Token
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    client_id: spotifyClientId,
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: spotifyRedirectUri,
                    code_verifier: codeVerifier
                })
            });
            
            const data = await response.json();
            
            if (data.access_token) {
                spotifyAccessToken = data.access_token;
                localStorage.setItem('spotify_token', data.access_token);
                
                // Define a validade do token (geralmente 1 hora = 3600 segundos)
                const expiresIn = data.expires_in || 3600;
                localStorage.setItem('spotify_token_expires', Date.now() + (expiresIn * 1000));
                
                // Salva o refresh_token se retornado pelo Spotify (essencial para renovação automática)
                if (data.refresh_token) {
                    localStorage.setItem('spotify_refresh_token', data.refresh_token);
                }
                
                console.log('Conexão com o Spotify (PKCE) realizada com sucesso!');
                
                // Inicializa o widget logado
                inicializarSpotifyWidget();
            }
        } catch (error) {
            console.error('Erro ao resgatar o token de acesso (PKCE):', error);
        }
    }
}

/**
 * Solicita silenciosamente um novo token de acesso usando o refresh_token quando o atual estiver expirado
 */
async function refreshSpotifyToken() {
    const refreshToken = localStorage.getItem('spotify_refresh_token');
    if (!refreshToken) {
        desconectarSpotify();
        return;
    }
    
    try {
        // Faz a chamada POST para obter um novo token de acesso usando o refresh token
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: spotifyClientId,
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            })
        });
        
        const data = await response.json();
        
        if (data.access_token) {
            spotifyAccessToken = data.access_token;
            localStorage.setItem('spotify_token', data.access_token);
            
            const expiresIn = data.expires_in || 3600;
            localStorage.setItem('spotify_token_expires', Date.now() + (expiresIn * 1000));
            
            if (data.refresh_token) {
                localStorage.setItem('spotify_refresh_token', data.refresh_token);
            }
            
            console.log('Token do Spotify renovado silenciosamente via Refresh Token!');
        } else {
            desconectarSpotify();
        }
    } catch (error) {
        console.error('Erro ao renovar o token do Spotify:', error);
        desconectarSpotify();
    }
}

/**
 * Verifica se existe um token válido no localStorage, tenta renovar se expirado, e ajusta a exibição
 */
async function inicializarSpotifyWidget() {
    const expiration = localStorage.getItem('spotify_token_expires');
    
    // Se o token estiver expirado, tenta renová-lo silenciosamente usando o refresh_token
    if (expiration && Date.now() > parseInt(expiration)) {
        await refreshSpotifyToken();
    }
    
    spotifyAccessToken = localStorage.getItem('spotify_token');
    
    if (spotifyAccessToken) {
        domElements.spotifyAreaLoggedOut.style.display = 'none';
        domElements.spotifyAreaLoggedIn.style.display = 'block';
        
        // Carrega dados de perfil do usuário e playlists
        fetchSpotifyUserProfile();
        fetchSpotifyPlaylists();
        
        // Inicia o pooling de reprodução de música a cada 3 segundos
        if (spotifyPlaybackInterval) clearInterval(spotifyPlaybackInterval);
        spotifyPlaybackInterval = setInterval(fetchSpotifyCurrentlyPlaying, 3000);
        fetchSpotifyCurrentlyPlaying();
    } else {
        domElements.spotifyAreaLoggedIn.style.display = 'none';
        domElements.spotifyAreaLoggedOut.style.display = 'block';
        
        if (spotifyPlaybackInterval) {
            clearInterval(spotifyPlaybackInterval);
            spotifyPlaybackInterval = null;
        }
    }
}

/**
 * Limpa tokens e desconecta do Spotify
 */
function desconectarSpotify() {
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_token_expires');
    localStorage.removeItem('spotify_refresh_token');
    spotifyAccessToken = null;
    inicializarSpotifyWidget();
}

/**
 * Realiza requisições HTTP para a API do Spotify
 */
async function callSpotifyApi(endpoint, method = 'GET', body = null) {
    if (!spotifyAccessToken) return null;
    
    // Configura o cabeçalho de autorização básico
    const headers = {
        'Authorization': `Bearer ${spotifyAccessToken}`
    };
    
    // O cabeçalho Content-Type só deve ser adicionado se houver corpo na requisição
    // Isso evita problemas de preflight CORS em navegadores móveis para PUT/POST sem corpo
    if (body) {
        headers['Content-Type'] = 'application/json';
    }
    
    const config = {
        method: method,
        headers: headers,
        mode: 'cors',         // Garante modo CORS explicitamente para navegadores móveis
        credentials: 'omit'   // Omitir envio de cookies desnecessários para a API do Spotify
    };
    
    if (body) {
        config.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(`https://api.spotify.com/v1${endpoint}`, config);
        
        // Se a resposta não for bem-sucedida (status fora da faixa 2xx)
        if (!response.ok) {
            // Se for 401 (Não Autorizado), o token expirou ou é inválido, desconecta o usuário
            if (response.status === 401) {
                desconectarSpotify();
                return null;
            }
            
            try {
                // Tenta extrair a mensagem de erro estruturada da API do Spotify
                const text = await response.text();
                const errorObj = text ? JSON.parse(text) : null;
                return errorObj || { error: { status: response.status, message: response.statusText } };
            } catch (e) {
                // Retorna um erro genérico caso falhe ao ler/parsear o corpo da resposta
                return { error: { status: response.status, message: response.statusText } };
            }
        }
        
        // 204 (No Content) e 202 (Accepted) indicam sucesso sem corpo de resposta JSON
        if (response.status === 204 || response.status === 202) {
            return true;
        }
        
        // Lê a resposta como texto primeiro para evitar erros ao tentar parsear JSON de corpos de resposta vazios
        const text = await response.text();
        return text ? JSON.parse(text) : true;
    } catch (err) {
        console.error('Erro na requisição da API do Spotify:', err);
        return null;
    }
}

/**
 * Busca e exibe dados de perfil do usuário do Spotify
 */
async function fetchSpotifyUserProfile() {
    const data = await callSpotifyApi('/me');
    if (data && !data.error) {
        domElements.spotifyUserName.innerText = data.display_name;
        if (data.images && data.images.length > 0) {
            domElements.spotifyUserAvatar.src = data.images[0].url;
            domElements.spotifyUserAvatar.style.display = 'inline-block';
        }
        // Armazena se o usuário é Premium ou Free para controle do player
        if (data.product) {
            localStorage.setItem('spotify_user_product', data.product);
            console.log(`Plano do usuário do Spotify: ${data.product}`);
        }
    }
}

/**
 * Busca as playlists do usuário logado e adiciona ao dropdown
 */
async function fetchSpotifyPlaylists() {
    const data = await callSpotifyApi('/me/playlists?limit=20');
    if (data && data.items) {
        spotifyUserPlaylists = data.items;
        
        // Limpa opções anteriores
        domElements.spotifyPlaylistsDropdown.innerHTML = '<option value="">Selecione uma playlist...</option>';
        
        data.items.forEach(playlist => {
            const opt = document.createElement('option');
            opt.value = playlist.uri;
            opt.innerText = playlist.name;
            domElements.spotifyPlaylistsDropdown.appendChild(opt);
        });
    }
}

/**
 * Busca a lista de dispositivos disponíveis e tenta encontrar um ID de dispositivo válido.
 * Salva e recupera do localStorage para otimização e persistência de dispositivo ativo.
 */
async function obterDeviceIdSpotify() {
    // Tenta obter o último ID de dispositivo ativo que ficou salvo no localStorage
    let deviceId = localStorage.getItem('spotify_last_device_id');
    if (deviceId) {
        return deviceId;
    }
    
    // Se não houver ID salvo, busca os dispositivos disponíveis da API do Spotify
    const data = await callSpotifyApi('/me/player/devices');
    if (data && data.devices && data.devices.length > 0) {
        // Seleciona o dispositivo que está ativo agora ou escolhe o primeiro da lista
        const activeDevice = data.devices.find(d => d.is_active) || data.devices[0];
        if (activeDevice && activeDevice.id) {
            localStorage.setItem('spotify_last_device_id', activeDevice.id);
            return activeDevice.id;
        }
    }
    
    return null;
}

/**
 * Constrói a URL do endpoint anexando o parâmetro query do device_id se ele estiver disponível
 */
function anexarDeviceId(endpoint, deviceId) {
    if (!deviceId) return endpoint;
    const caractereConexao = endpoint.includes('?') ? '&' : '?';
    return `${endpoint}${caractereConexao}device_id=${deviceId}`;
}

/**
 * Exibe uma mensagem de erro detalhada baseada na resposta de erro oficial do Spotify ou falhas de rede.
 * Garante diagnóstico claro para restrição Premium, dispositivo não encontrado ou falhas gerais.
 */
function exibirErroSpotify(res, mensagemPadrao) {
    if (res && res.error) {
        const err = res.error;
        // Erro de plano Free (Premium requerido)
        if (err.reason === 'PREMIUM_REQUIRED' || err.status === 403) {
            localStorage.setItem('spotify_user_product', 'free');
            alert('O controle de reprodução é um recurso exclusivo para assinantes do Spotify Premium devido a limitações da API do Spotify.');
            return;
        }
        // Erro de dispositivo inativo ou não localizado
        if (err.reason === 'NO_ACTIVE_DEVICE' || err.status === 404) {
            alert('Nenhum dispositivo ativo encontrado no seu Spotify. Por favor, abra o aplicativo do Spotify no seu celular/computador, comece a tocar uma música e tente novamente!');
            return;
        }
        // Exibe qualquer outro erro com código retornado pelo servidor do Spotify
        alert(`Erro no Spotify: ${err.message || mensagemPadrao} (Código: ${err.status || 'N/A'})`);
        return;
    }
    // Erro de rede, CORS ou preflight do Safari
    alert(`${mensagemPadrao}. Verifique se você possui o Spotify Premium e se o aplicativo está aberto e ativo no seu aparelho.`);
}

/**
 * Inicia a reprodução de uma playlist selecionada no Spotify com suporte a direcionamento de dispositivo
 */
async function playSpotifyPlaylist(playlistUri) {
    // Tenta obter o ID do dispositivo ativo ou do último dispositivo usado
    let deviceId = await obterDeviceIdSpotify();
    let url = anexarDeviceId('/me/player/play', deviceId);
    
    // Envia o comando de play contendo a URI da playlist no corpo da requisição
    let res = await callSpotifyApi(url, 'PUT', {
        context_uri: playlistUri
    });
    
    // Se falhar porque o dispositivo ficou inativo, tenta limpar o cache e buscar novamente um dispositivo
    if ((!res || (res && res.error && (res.error.status === 404 || res.error.reason === 'NO_ACTIVE_DEVICE'))) && deviceId) {
        localStorage.removeItem('spotify_last_device_id');
        deviceId = await obterDeviceIdSpotify();
        if (deviceId) {
            url = anexarDeviceId('/me/player/play', deviceId);
            res = await callSpotifyApi(url, 'PUT', {
                context_uri: playlistUri
            });
        }
    }
    
    // Tratamento do resultado da requisição
    if (res && !res.error) {
        setTimeout(fetchSpotifyCurrentlyPlaying, 1000); // Atualiza dados após iniciar
    } else {
        exibirErroSpotify(res, 'Não foi possível iniciar a playlist');
    }
}

/**
 * Envia comandos de mídia (Play, Pause, Next, Prev) para a API do Spotify com roteamento de dispositivo
 */
async function controlSpotifyPlayback(action) {
    let endpoint = '';
    let method = 'POST';
    
    if (action === 'play') {
        endpoint = '/me/player/play';
        method = 'PUT';
    } else if (action === 'pause') {
        endpoint = '/me/player/pause';
        method = 'PUT';
    } else if (action === 'next') {
        endpoint = '/me/player/next';
    } else if (action === 'prev') {
        endpoint = '/me/player/previous';
    }
    
    // Tenta obter o ID do dispositivo ativo ou do último dispositivo usado
    let deviceId = await obterDeviceIdSpotify();
    let url = anexarDeviceId(endpoint, deviceId);
    
    // Executa a chamada inicial para a API do Spotify
    let res = await callSpotifyApi(url, method);
    
    // Se a chamada falhar indicando dispositivo inativo, limpa o ID desatualizado e tenta com outro dispositivo
    if ((!res || (res && res.error && (res.error.status === 404 || res.error.reason === 'NO_ACTIVE_DEVICE'))) && deviceId) {
        localStorage.removeItem('spotify_last_device_id');
        deviceId = await obterDeviceIdSpotify();
        if (deviceId) {
            url = anexarDeviceId(endpoint, deviceId);
            res = await callSpotifyApi(url, method);
        }
    }
    
    // Tratamento do resultado da requisição
    if (res && !res.error) {
        setTimeout(fetchSpotifyCurrentlyPlaying, 1000);
    } else {
        exibirErroSpotify(res, 'Não foi possível enviar o comando de reprodução');
    }
}

// Controle de estado para evitar conflitos quando o usuário arrasta o slider de volume
let isUserDraggingVolume = false;
let spotifyVolumeTimeout = null;

/**
 * Altera o volume de reprodução activa do Spotify do usuário direcionando ao dispositivo específico
 * @param {number} volumePercent Porcentagem de volume (0 a 100)
 */
async function setSpotifyVolume(volumePercent) {
    // Tenta obter o ID do dispositivo ativo ou do último dispositivo usado
    const deviceId = await obterDeviceIdSpotify();
    const url = anexarDeviceId(`/me/player/volume?volume_percent=${volumePercent}`, deviceId);
    
    // Envia o ajuste de volume direcionando ao ID do dispositivo
    const res = await callSpotifyApi(url, 'PUT');
    if (res && !res.error) {
        console.log(`Volume do Spotify ajustado para: ${volumePercent}%`);
    } else {
        // Trata erro caso o ajuste de volume falhe (por exemplo, a restrição de celulares iOS/Android)
        if (res && res.error) {
            const err = res.error;
            if (err.status === 403 || err.reason === 'RESTRICTED_COMMAND' || (err.message && err.message.includes('volume'))) {
                console.warn('A API do Spotify não permite controlar o volume de dispositivos celulares/móveis diretamente pelo navegador.');
                return;
            }
        }
        console.warn('Não foi possível ajustar o volume. Verifique se o player está ativo.');
    }
}

/**
 * Atualiza instantaneamente a interface de volume e agenda a chamada de API com debounce
 * @param {number} volumePercent Porcentagem de volume (0 a 100)
 */
function debouncedSetSpotifyVolume(volumePercent) {
    isUserDraggingVolume = true;
    
    // Atualiza o valor do texto de volume na UI instantaneamente
    if (domElements.spotifyVolumeValue) {
        domElements.spotifyVolumeValue.innerText = `${volumePercent}%`;
    }
    
    // Altera dinamicamente a opacidade das ondas sonoras do ícone de volume
    const iconLow = document.getElementById('spotify-volume-wave-low');
    const iconHigh = document.getElementById('spotify-volume-wave-high');
    if (iconLow && iconHigh) {
        if (volumePercent === 0) {
            iconLow.style.opacity = '0';
            iconHigh.style.opacity = '0';
        } else if (volumePercent < 50) {
            iconLow.style.opacity = '1';
            iconHigh.style.opacity = '0';
        } else {
            iconLow.style.opacity = '1';
            iconHigh.style.opacity = '1';
        }
    }

    // Agenda o envio da requisição à API do Spotify após 300ms de inatividade no slider
    clearTimeout(spotifyVolumeTimeout);
    spotifyVolumeTimeout = setTimeout(async () => {
        await setSpotifyVolume(volumePercent);
        isUserDraggingVolume = false; // Devolve o controle de atualização para o polling de status
    }, 300);
}

/**
 * Verifica o que está tocando no momento no Spotify do usuário (Polling do Player completo)
 */
async function fetchSpotifyCurrentlyPlaying() {
    // Consulta o status completo do player para receber dados da faixa e do dispositivo ativo (incluindo volume)
    const data = await callSpotifyApi('/me/player');
    
    if (data && data.item) {
        // Armazena o ID do dispositivo ativo detectado no polling para futuros comandos de controle
        if (data.device && data.device.id) {
            localStorage.setItem('spotify_last_device_id', data.device.id);
        }

        // Atualiza textos
        domElements.spotifyTrackTitle.innerText = data.item.name;
        domElements.spotifyTrackArtist.innerText = data.item.artists.map(art => art.name).join(', ');
        
        // Atualiza capa do álbum
        if (data.item.album.images && data.item.album.images.length > 0) {
            domElements.spotifyTrackArt.src = data.item.album.images[0].url;
        }
        
        // Altera ícone de play/pause baseado no status real da música
        if (data.is_playing) {
            domElements.spotifyPlayIcon.innerHTML = `
                <rect x="5" y="4" width="4" height="16"></rect>
                <rect x="15" y="4" width="4" height="16"></rect>
            `; // Ícone pause
            domElements.spotifyMediaToggle.setAttribute('data-action', 'pause');
        } else {
            domElements.spotifyPlayIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`; // Ícone play
            domElements.spotifyMediaToggle.setAttribute('data-action', 'play');
        }
        
        // Atualiza o slider de volume com o volume real do dispositivo (apenas se o usuário não estiver arrastando)
        if (!isUserDraggingVolume && data.device && data.device.volume_percent !== undefined) {
            const vol = data.device.volume_percent;
            if (domElements.spotifyVolumeSlider) {
                domElements.spotifyVolumeSlider.value = vol;
            }
            if (domElements.spotifyVolumeValue) {
                domElements.spotifyVolumeValue.innerText = `${vol}%`;
            }
            
            // Atualiza o estado visual das ondas no ícone de volume do widget
            const iconLow = document.getElementById('spotify-volume-wave-low');
            const iconHigh = document.getElementById('spotify-volume-wave-high');
            if (iconLow && iconHigh) {
                if (vol === 0) {
                    iconLow.style.opacity = '0';
                    iconHigh.style.opacity = '0';
                } else if (vol < 50) {
                    iconLow.style.opacity = '1';
                    iconHigh.style.opacity = '0';
                } else {
                    iconLow.style.opacity = '1';
                    iconHigh.style.opacity = '1';
                }
            }
        }
    } else {
        // Estado inicial de inatividade
        domElements.spotifyTrackTitle.innerText = 'Nenhuma faixa tocando';
        domElements.spotifyTrackArtist.innerText = 'Abra o Spotify em seu celular';
        domElements.spotifyPlayIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
        domElements.spotifyMediaToggle.setAttribute('data-action', 'play');
    }
}

// ===================================================================
// CONFIGURAÇÃO DOS ESCUTADORES DE EVENTOS DO DOM PRINCIPAIS
// ===================================================================
function initializeEventListeners() {
    // 1. Escutadores para transições do Hub SPA
    domElements.cardWorkouts.addEventListener('click', () => switchView('workouts'));
    domElements.cardProgress.addEventListener('click', () => switchView('progress'));
    domElements.cardDiet.addEventListener('click', () => switchView('diet'));
    domElements.btnBackHub.addEventListener('click', () => switchView('hub'));
    
    // 2. Escutadores de gênero e níveis de treino
    domElements.btnHomem.addEventListener('click', () => switchGender('homem'));
    domElements.btnMulher.addEventListener('click', () => switchGender('mulher'));
    
    const levelBtns = domElements.levelSelector.querySelectorAll('.level-btn');
    levelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLevel = btn.getAttribute('data-level');
            switchLevel(selectedLevel);
        });
    });
    
    // 3. Ouvintes de eventos do Cronômetro
    domElements.timerBtnToggle.addEventListener('click', () => {
        if (timerIsRunning) {
            stopTimer();
        } else {
            if (timerTimeLeft === 0) {
                selectTimerPreset(60); // Inicia com tempo padrão se zerado
            } else {
                startTimer();
            }
        }
    });
    
    domElements.timerBtnReset.addEventListener('click', resetTimer);
    
    domElements.timerDurationButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            domElements.timerDurationButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            const seconds = parseInt(btn.getAttribute('data-seconds'));
            selectTimerPreset(seconds);
        });
    });
    
    // Ouvinte para resetar todos os dados de exercícios concluídos
    if (domElements.btnResetWorkout) {
        domElements.btnResetWorkout.addEventListener('click', () => {
            if (confirm('Deseja resetar todo o progresso dos exercícios concluídos deste nível?')) {
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith(`completed_${activeGender}_${activeLevel}_day`)) {
                        localStorage.removeItem(key);
                    }
                });
                renderActiveWorkout();
            }
        });
    }

    // Ouvinte de clique para apagar a personalização e restaurar o treino padrão do dia selecionado
    if (domElements.btnRestoreDefaultWorkout) {
        domElements.btnRestoreDefaultWorkout.addEventListener('click', () => {
            if (confirm('Deseja apagar a personalização e voltar para o treino padrão deste dia?')) {
                const customWorkoutKey = `customWorkout_${activeGender}_${activeLevel}_day${activeDay}`;
                localStorage.removeItem(customWorkoutKey);
                
                // Remove as conclusões de exercício específicas deste dia e nível para evitar inconsistências com o novo treino
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith(`completed_${activeGender}_${activeLevel}_day${activeDay}`)) {
                        localStorage.removeItem(key);
                    }
                });
                
                // Recarrega o treino na tela
                renderActiveWorkout();
                alert('Treino original do aplicativo restaurado com sucesso!');
            }
        });
    }
    
    // 4. Ouvinte de submissão do formulário de Progresso e IMC
    if (domElements.formProgress) {
        domElements.formProgress.addEventListener('submit', (e) => {
            e.preventDefault();
            const w = parseFloat(domElements.inputWeight.value);
            const h = parseInt(domElements.inputHeight.value);
            const t = parseInt(domElements.inputTime.value);
            const c = parseInt(domElements.inputCalories.value);
            
            saveProgressRecord(w, h, t, c);
            
            // Limpa campos do form e mostra aviso
            domElements.inputWeight.value = '';
            domElements.inputHeight.value = '';
            domElements.inputTime.value = '';
            domElements.inputCalories.value = '';
            alert('Métricas de treino e IMC salvas com sucesso!');
        });
    }
    
    // 5. Ouvintes do módulo de Dietas (Abas de planos alimentares presets)
    const dietTabBtns = document.querySelectorAll('.diet-presets-tabs .diet-tab-btn');
    dietTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dietTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const diet = btn.getAttribute('data-diet');
            renderDietPreset(diet);
        });
    });
    
    // Ouvintes para o modal de edição de Dieta Personalizada
    if (domElements.btnOpenCustomDietModal) {
        domElements.btnOpenCustomDietModal.addEventListener('click', () => {
            const customDiet = JSON.parse(localStorage.getItem('customDiet')) || {};
            domElements.dietBreakfast.value = customDiet.breakfast || '';
            domElements.dietLunch.value = customDiet.lunch || '';
            domElements.dietSnack.value = customDiet.snack || '';
            domElements.dietDinner.value = customDiet.dinner || '';
            
            domElements.modalCustomDiet.style.display = 'flex';
        });
    }
    
    if (domElements.btnCloseDietModal) {
        domElements.btnCloseDietModal.addEventListener('click', () => {
            domElements.modalCustomDiet.style.display = 'none';
        });
    }
    
    if (domElements.formCustomDiet) {
        domElements.formCustomDiet.addEventListener('submit', (e) => {
            e.preventDefault();
            const customDiet = {
                breakfast: domElements.dietBreakfast.value,
                lunch: domElements.dietLunch.value,
                snack: domElements.dietSnack.value,
                dinner: domElements.dietDinner.value
            };
            localStorage.setItem('customDiet', JSON.stringify(customDiet));
            domElements.modalCustomDiet.style.display = 'none';
            renderCustomDiet();
        });
    }
    
    // 6. Ouvintes para o modal de criação de Treinos Customizados
    if (domElements.btnOpenCustomWorkoutModal) {
        domElements.btnOpenCustomWorkoutModal.addEventListener('click', () => {
            // Abre o modal de treino
            domElements.modalCustomWorkout.style.display = 'flex';
        });
    }
    
    if (domElements.btnCloseWorkoutModal) {
        domElements.btnCloseWorkoutModal.addEventListener('click', () => {
            domElements.modalCustomWorkout.style.display = 'none';
        });
    }
    
    // Adiciona linhas extras de exercícios dinamicamente no modal (apenas Nome e Séries)
    if (domElements.btnAddExerciseField) {
        domElements.btnAddExerciseField.addEventListener('click', () => {
            const row = document.createElement('div');
            row.className = 'custom-exercise-field-row';
            // Injeta o HTML para uma nova linha do formulário sem o seletor de tipo de exercício para simplificar o preenchimento
            row.innerHTML = `
                <input type="text" class="custom-ex-name-input" placeholder="Nome do exercício" required>
                <input type="text" class="custom-ex-series-input" placeholder="Séries/Reps" required>
                <button type="button" class="btn-remove-row" aria-label="Remover linha">&times;</button>
            `;
            
            row.querySelector('.btn-remove-row').addEventListener('click', () => {
                row.remove();
            });
            
            domElements.customExercisesFieldsContainer.appendChild(row);
        });
    }
    
    if (domElements.formCustomWorkout) {
        domElements.formCustomWorkout.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const muscleName = domElements.inputCustomMuscle.value;
            const infoText = domElements.inputCustomInfo.value;
            
            // Lê todos os campos de exercícios adicionados na tela
            const rows = domElements.customExercisesFieldsContainer.querySelectorAll('.custom-exercise-field-row');
            const exercises = [];
            
            rows.forEach(r => {
                const name = r.querySelector('.custom-ex-name-input').value;
                const series = r.querySelector('.custom-ex-series-input').value;
                
                // Salva o exercício no array padronizando silenciosamente o tipo como 'composto'
                exercises.push({
                    nome: name,
                    series: series,
                    tipo: 'composto'
                });
            });
            
            // Monta o objeto de treino customizado
            const customWorkout = {
                dia: activeDay,
                musculo: muscleName.toUpperCase(),
                infoAdicional: infoText,
                exercicios: exercises
            };
            
            // Salva no localStorage para este gênero, nível e dia
            const customWorkoutKey = `customWorkout_${activeGender}_${activeLevel}_day${activeDay}`;
            localStorage.setItem(customWorkoutKey, JSON.stringify(customWorkout));
            
            // Fecha o modal e limpa os campos dinâmicos adicionados
            domElements.modalCustomWorkout.style.display = 'none';
            domElements.inputCustomMuscle.value = '';
            domElements.inputCustomInfo.value = '';
            // Reseta a lista de exercícios para apenas uma linha padrão limpa sem o select
            domElements.customExercisesFieldsContainer.innerHTML = `
                <div class="custom-exercise-field-row">
                    <input type="text" class="custom-ex-name-input" placeholder="Nome do exercício" required>
                    <input type="text" class="custom-ex-series-input" placeholder="Séries/Reps" required>
                </div>
            `;
            
            // Recarrega o treino na tela
            renderActiveWorkout();
            alert('Treino customizado salvo para este dia e nível com sucesso!');
        });
    }
    
    // 7. Ouvintes de eventos do widget do Spotify com controle de exclusão mútua para o celular
    if (domElements.spotifyHeaderClick) {
        domElements.spotifyHeaderClick.addEventListener('click', () => {
            // Verifica se o painel do Spotify está minimizado e vai expandir agora
            const willExpand = domElements.spotifyWidgetPanel.classList.contains('collapsed');
            if (willExpand) {
                // Se o Spotify vai ser expandido, recolhemos o cronômetro para que não poluam a tela do celular juntos
                if (domElements.timerWidgetPanel) {
                    domElements.timerWidgetPanel.classList.add('collapsed');
                }
            }
            domElements.spotifyWidgetPanel.classList.toggle('collapsed');
        });
    }
    
    // Ouvinte para clique no cabeçalho do cronômetro com controle de exclusão mútua para o celular
    if (domElements.timerHeaderClick) {
        domElements.timerHeaderClick.addEventListener('click', () => {
            // Verifica se o painel do cronômetro está minimizado e vai expandir agora
            const willExpand = domElements.timerWidgetPanel.classList.contains('collapsed');
            if (willExpand) {
                // Se o cronômetro vai ser expandido, recolhemos o Spotify para liberar espaço na tela móvel
                if (domElements.spotifyWidgetPanel) {
                    domElements.spotifyWidgetPanel.classList.add('collapsed');
                }
            }
            domElements.timerWidgetPanel.classList.toggle('collapsed');
        });
    }
    
    if (domElements.btnSpotifyConnectAction) {
        domElements.btnSpotifyConnectAction.addEventListener('click', loginComSpotify);
    }
    
    if (domElements.spotifyPlaylistsDropdown) {
        domElements.spotifyPlaylistsDropdown.addEventListener('change', (e) => {
            const playlistUri = e.target.value;
            if (playlistUri) {
                playSpotifyPlaylist(playlistUri);
            }
        });
    }
    
    if (domElements.spotifyMediaToggle) {
        domElements.spotifyMediaToggle.addEventListener('click', () => {
            const action = domElements.spotifyMediaToggle.getAttribute('data-action') || 'play';
            controlSpotifyPlayback(action);
        });
    }
    
    if (domElements.spotifyMediaNext) {
        domElements.spotifyMediaNext.addEventListener('click', () => {
            controlSpotifyPlayback('next');
        });
    }
    
    if (domElements.spotifyMediaPrev) {
        domElements.spotifyMediaPrev.addEventListener('click', () => {
            controlSpotifyPlayback('prev');
        });
    }
    
    // Ouvinte para controle de volume do Spotify com controle de arrastar para evitar conflito com polling
    if (domElements.spotifyVolumeSlider) {
        domElements.spotifyVolumeSlider.addEventListener('input', (e) => {
            const vol = parseInt(e.target.value);
            debouncedSetSpotifyVolume(vol);
        });
    }
}

// Configuração do Client ID do Spotify (criado no painel do Spotify Developer pelo usuário)
const spotifyClientId = '0232c66efa4149669ffd28181ecadafb'; // Client ID oficial da aplicação do usuário

// Normaliza a URL de redirecionamento para remover 'index.html' se presente no final, garantindo consistência com o painel do Spotify Developer
const spotifyRedirectUri = (window.location.origin + window.location.pathname).replace(/\/index\.html$/, '/');

// Inicializador principal do aplicativo
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se retornou do Spotify com um Token de acesso na URL
    checarTokenDeRetornoSpotify();
    
    // Configura os escutadores de eventos
    initializeEventListeners();
    
    // Configura o widget do Spotify
    inicializarSpotifyWidget();
    
    // Aplica gênero ativo
    switchGender(activeGender);
    
    // Vai para a tela inicial (Hub) por padrão
    switchView('hub');
    
    // Garante que o timer inicie limpo e atualizado
    timerTimeLeft = 0;
    updateTimerUI();
});
