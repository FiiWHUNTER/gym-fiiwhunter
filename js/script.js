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
// CLIENTE SUPABASE (BACKEND DE AUTENTICAÇÃO E BANCO DE DADOS)
// ===================================================================
// SUPABASE_URL e SUPABASE_ANON_KEY vêm de js/supabase-config.js, carregado antes deste arquivo
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===================================================================
// VARIÁVEIS GLOBAIS DE ESTADO DA APLICAÇÃO
// ===================================================================
let activeGender = localStorage.getItem('activeGender') || 'homem'; // Gênero ativo (homem / mulher)
let activeDay = parseInt(localStorage.getItem('activeDay')) || 1; // Dia ativo do cronograma (1 a 5)
let activeLevel = localStorage.getItem('activeLevel') || 'intermediario'; // Nível de intensidade (iniciante / intermediario / avancado)
let activeView = 'hub'; // Nome da tela ativa no sistema SPA (hub / workouts / progress / diet)
let authMode = 'signin'; // Modo ativo da tela de autenticação ('signin' / 'signup')
let progressRecordsCache = []; // Cache em memória do histórico de evolução física buscado do Supabase

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
    btnLogout: document.getElementById('btn-logout'),
    appNavBar: document.getElementById('app-nav-bar'),
    navTitleText: document.getElementById('nav-title-text'),

    // Elementos da tela de Autenticação (Supabase Auth)
    viewAuth: document.getElementById('view-auth'),
    formAuth: document.getElementById('form-auth'),
    inputAuthEmail: document.getElementById('input-auth-email'),
    inputAuthPassword: document.getElementById('input-auth-password'),
    authErrorMsg: document.getElementById('auth-error-msg'),
    authSubtitle: document.getElementById('auth-subtitle'),
    btnAuthSubmit: document.getElementById('btn-auth-submit'),
    authToggleText: document.getElementById('auth-toggle-text'),
    btnAuthToggleMode: document.getElementById('btn-auth-toggle-mode'),

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
    timerBubbleTime: document.getElementById('timer-bubble-time'), // Elemento de exibição do tempo na bolha colapsada do celular
    
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

    // Elementos de Treinos Customizados (Modais)
    modalCustomWorkout: document.getElementById('modal-custom-workout'),
    btnOpenCustomWorkoutModal: document.getElementById('btn-open-custom-workout-modal'),
    btnCloseWorkoutModal: document.getElementById('btn-close-workout-modal'),
    formCustomWorkout: document.getElementById('form-custom-workout'),
    inputCustomMuscle: document.getElementById('input-custom-muscle'),
    inputCustomInfo: document.getElementById('input-custom-info'),
    customExercisesFieldsContainer: document.getElementById('custom-exercises-fields-container'),
    btnAddExerciseField: document.getElementById('btn-add-exercise-field'),

    // Elementos do buscador de exercícios reais (Wger)
    wgerCategoryButtons: document.getElementById('wger-category-buttons'),
    wgerResultsList: document.getElementById('wger-results-list'),
    
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
    spotifyMediaNext: document.getElementById('spotify-media-next')
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
// MÓDULO DE AUTENTICAÇÃO (SUPABASE AUTH)
// ===================================================================
/**
 * Oculta todas as telas internas do app (usado antes de trocar de view e no logout)
 */
function hideAllAppViews() {
    const views = [domElements.viewHub, domElements.viewWorkouts, domElements.viewProgress, domElements.viewDiet];
    views.forEach(v => {
        if (v) {
            v.classList.remove('active');
            v.classList.add('hidden');
        }
    });
}

function showAuthError(message) {
    if (!domElements.authErrorMsg) return;
    domElements.authErrorMsg.innerText = message;
    domElements.authErrorMsg.style.display = 'block';
}

function clearAuthError() {
    if (!domElements.authErrorMsg) return;
    domElements.authErrorMsg.style.display = 'none';
    domElements.authErrorMsg.innerText = '';
}

/**
 * Alterna a tela de autenticação entre os modos "Entrar" e "Criar Conta"
 */
function toggleAuthMode() {
    authMode = authMode === 'signin' ? 'signup' : 'signin';
    clearAuthError();
    if (authMode === 'signup') {
        domElements.authSubtitle.innerText = 'Crie sua conta para começar a treinar';
        domElements.btnAuthSubmit.innerText = 'Criar Conta';
        domElements.authToggleText.innerText = 'Já tem uma conta?';
        domElements.btnAuthToggleMode.innerText = 'Entrar';
    } else {
        domElements.authSubtitle.innerText = 'Entre com sua conta para acessar seu treino';
        domElements.btnAuthSubmit.innerText = 'Entrar';
        domElements.authToggleText.innerText = 'Ainda não tem conta?';
        domElements.btnAuthToggleMode.innerText = 'Criar Conta';
    }
}

/**
 * Cria uma nova conta de usuário no Supabase Auth via e-mail e senha
 */
async function handleSignUp(email, password) {
    const { error } = await supabaseClient.auth.signUp({ email, password });
    if (error) throw error;
}

/**
 * Autentica um usuário existente no Supabase Auth via e-mail e senha
 */
async function handleSignIn(email, password) {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
}

/**
 * Reseta a interface de volta para a tela de login/cadastro (sem chamar o Supabase)
 */
function showAuthScreen() {
    progressRecordsCache = [];
    if (domElements.formAuth) domElements.formAuth.reset();

    hideAllAppViews();
    if (domElements.appNavBar) domElements.appNavBar.style.display = 'none';
    domElements.viewAuth.classList.remove('hidden');
    domElements.viewAuth.classList.add('active');
}

/**
 * Encerra a sessão autenticada do usuário no Supabase e retorna para a tela de login
 */
async function handleSignOut() {
    await supabaseClient.auth.signOut();
    showAuthScreen();
}

/**
 * Executado assim que existe uma sessão Supabase válida: libera o restante do aplicativo
 * e carrega o histórico de evolução física do usuário autenticado
 */
async function onAuthenticated() {
    domElements.viewAuth.classList.remove('active');
    domElements.viewAuth.classList.add('hidden');

    switchView('hub');

    await refreshProgressUI();
    // Atualiza o card de IMC do Hub com os dados recém-carregados
    updateHubSummaryImc(progressRecordsCache);
}

/**
 * Verifica se já existe uma sessão ativa do Supabase ao carregar a página.
 * Caso contrário, a tela de login/cadastro (view-auth) permanece visível.
 */
async function initAuthGate() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        await onAuthenticated();
    }

    // Reage a encerramentos de sessão que não partiram do botão "Sair"
    // (ex.: token expirado) enquanto o app está aberto
    supabaseClient.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_OUT' && !domElements.viewAuth.classList.contains('active')) {
            showAuthScreen();
        }
    });
}

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
    hideAllAppViews();

    // Exibe a view selecionada e ajusta títulos da barra superior
    let title = "FitTrack";
    if (viewName === 'hub') {
        if (domElements.appNavBar) domElements.appNavBar.style.display = 'none';
        updateHubSummary();
        updateHubSummaryImc(progressRecordsCache);
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
            // Renderiza a partir do cache já buscado do Supabase (ver refreshProgressUI)
            renderProgressHistory(progressRecordsCache);
            recalculateLastImc(progressRecordsCache);
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
    
    // Também grava o atributo de tempo restante diretamente no elemento de título para que o pseudo-elemento CSS (.timer-title::after) possa renderizá-lo
    if (domElements.timerTitleElement) {
        domElements.timerTitleElement.setAttribute('data-time-left', formatTime(timerTimeLeft));
    }

    // Atualiza o texto do elemento HTML de exibição do tempo na bolha do celular para mostrar a contagem de forma nativa e visível
    if (domElements.timerBubbleTime) {
        domElements.timerBubbleTime.innerText = formatTime(timerTimeLeft);
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
// LÓGICA DO MÓDULO DE REGISTROS DE EVOLUÇÃO FÍSICA E IMC (SUPABASE)
// ===================================================================
/**
 * Calcula o IMC a partir do peso (kg) e da altura (cm)
 */
function calcularImc(weight, height) {
    const heightInMeters = height / 100;
    return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

/**
 * Busca no Supabase o histórico de evolução física do usuário autenticado.
 * O Row Level Security da tabela garante que só retornam registros do próprio usuário.
 */
async function fetchProgressRecords() {
    const { data, error } = await supabaseClient
        .from('progress_records')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao buscar histórico de evolução:', error.message);
        return [];
    }
    return data;
}

/**
 * Insere um novo registro de evolução física no Supabase.
 * O user_id é preenchido automaticamente pelo banco (coluna com default auth.uid()).
 */
async function saveProgressRecord(weight, height, time, calories) {
    const imc = calcularImc(weight, height);

    const { error } = await supabaseClient.from('progress_records').insert({
        peso: weight,
        altura: height,
        tempo: time,
        calorias: calories,
        imc: imc
    });

    if (error) {
        console.error('Erro ao salvar registro de evolução:', error.message);
        alert('Não foi possível salvar o registro. Tente novamente.');
    }
}

/**
 * Remove um registro físico específico do histórico pelo seu id
 * @param {string} id Identificador (uuid) do registro no Supabase
 */
async function deleteProgressRecord(id) {
    const { error } = await supabaseClient.from('progress_records').delete().eq('id', id);
    if (error) {
        console.error('Erro ao excluir registro de evolução:', error.message);
        alert('Não foi possível excluir o registro. Tente novamente.');
    }
}

/**
 * Busca o histórico atualizado uma única vez no Supabase e atualiza todas as
 * partes da interface que dependem dele (lista, calculadora de IMC e resumo do Hub)
 */
async function refreshProgressUI() {
    progressRecordsCache = await fetchProgressRecords();
    renderProgressHistory(progressRecordsCache);
    recalculateLastImc(progressRecordsCache);
    updateHubSummaryImc(progressRecordsCache);
}

/**
 * Renderiza a lista de histórico na view a partir dos registros já buscados
 * @param {Array} records Lista de registros vinda do Supabase
 */
function renderProgressHistory(records) {
    if (!domElements.progressHistoryList) return;

    domElements.progressHistoryList.innerHTML = '';

    if (!records || records.length === 0) {
        domElements.progressHistoryList.innerHTML = '<li class="history-empty">Nenhum registro cadastrado ainda.</li>';
        return;
    }

    records.forEach((rec) => {
        const item = document.createElement('li');
        item.className = 'history-item';

        // Define a classe de classificação do IMC
        let imcClass = 'imc-normal';
        if (rec.imc < 18.5) imcClass = 'imc-underweight';
        else if (rec.imc >= 25 && rec.imc < 30) imcClass = 'imc-overweight';
        else if (rec.imc >= 30) imcClass = 'imc-obese';

        // Formata a data de criação do registro (vinda do created_at do Postgres) no padrão brasileiro
        const recordDate = new Date(rec.created_at);
        const dateStr = `${recordDate.getDate().toString().padStart(2, '0')}/${(recordDate.getMonth() + 1).toString().padStart(2, '0')}`;

        item.innerHTML = `
            <div class="history-item-left">
                <span class="date">${dateStr}</span>
                <span class="metrics">${rec.peso}kg | ${rec.altura}cm | ${rec.tempo}min | ${rec.calorias}kcal</span>
            </div>
            <div class="history-item-right">
                <span class="history-imc-badge ${imcClass}">IMC: ${rec.imc}</span>
                <button class="btn-delete-record" data-id="${rec.id}" aria-label="Excluir registro">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;

        // Adiciona ouvinte para deletar registro
        item.querySelector('.btn-delete-record').addEventListener('click', async () => {
            if (confirm('Excluir este registro permanentemente?')) {
                await deleteProgressRecord(rec.id);
                await refreshProgressUI();
            }
        });

        domElements.progressHistoryList.appendChild(item);
    });
}

/**
 * Calcula e atualiza visualmente o painel da calculadora e a barra de ponteiro do IMC
 * @param {Array} records Lista de registros vinda do Supabase
 */
function recalculateLastImc(records) {
    if (!records || records.length === 0) {
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

/**
 * Escapa caracteres especiais de HTML antes de interpolar em innerHTML. Usado sempre que
 * exibimos texto vindo de APIs externas (Wger, Open Food Facts) ou digitado pelo usuário,
 * já que esses dados não são de confiança e podem quebrar o HTML ou injetar script.
 */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
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

// Rótulos e ícones (SVG paths) fixos dos 4 horários de refeição, reaproveitados
// tanto na exibição somente-leitura (renderCustomDiet) quanto no modal de edição
const MEAL_LABELS = {
    breakfast: { titulo: 'Café da Manhã', icone: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
    lunch: { titulo: 'Almoço', icone: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 0 1-3.46 0"/>' },
    snack: { titulo: 'Lanche da Tarde', icone: '<path d="M12 2a10 10 0 1 0 10 10H12V2z"/>' },
    dinner: { titulo: 'Jantar', icone: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/>' }
};

/**
 * Lê a dieta personalizada do LocalStorage e normaliza para a estrutura atual
 * ({ items: [...], notes: "" } por refeição). Migra automaticamente o formato
 * antigo (texto livre) para o campo "notes", sem perder o que o usuário já tinha digitado.
 */
function getCustomDiet() {
    const raw = JSON.parse(localStorage.getItem('customDiet')) || {};
    const normalized = {};

    Object.keys(MEAL_LABELS).forEach(mealKey => {
        const value = raw[mealKey];
        if (typeof value === 'string') {
            normalized[mealKey] = { items: [], notes: value };
        } else if (value && typeof value === 'object') {
            normalized[mealKey] = {
                items: Array.isArray(value.items) ? value.items : [],
                notes: value.notes || ''
            };
        } else {
            normalized[mealKey] = { items: [], notes: '' };
        }
    });

    return normalized;
}

function saveCustomDiet(dietObj) {
    localStorage.setItem('customDiet', JSON.stringify(dietObj));
}

/**
 * Soma os macronutrientes dos alimentos de uma refeição, considerando a
 * quantidade em gramas informada para cada item (os valores da API são por 100g)
 */
function calculateMealTotals(items) {
    return items.reduce((acc, item) => {
        const factor = (item.grams || 0) / 100;
        acc.kcal += (item.kcal100 || 0) * factor;
        acc.protein += (item.protein100 || 0) * factor;
        acc.carbs += (item.carbs100 || 0) * factor;
        acc.fat += (item.fat100 || 0) * factor;
        return acc;
    }, { kcal: 0, protein: 0, carbs: 0, fat: 0 });
}

/**
 * Renderiza a exibição somente-leitura do cardápio personalizado na tela de Dieta
 */
function renderCustomDiet() {
    if (!domElements.customMealsContainer) return;

    const customDiet = getCustomDiet();

    domElements.customMealsContainer.innerHTML = Object.keys(MEAL_LABELS).map(mealKey => {
        const meal = customDiet[mealKey];
        const { titulo, icone } = MEAL_LABELS[mealKey];
        const totals = calculateMealTotals(meal.items);

        const itemsHtml = meal.items.length > 0
            ? `<ul class="meal-card-items">${meal.items.map(item =>
                `<li>${escapeHtml(item.name)} <span>(${item.grams}g)</span></li>`
              ).join('')}</ul>
              <p class="meal-card-totals">${Math.round(totals.kcal)}kcal | P: ${totals.protein.toFixed(1)}g | C: ${totals.carbs.toFixed(1)}g | G: ${totals.fat.toFixed(1)}g</p>`
            : '';

        const notesHtml = meal.notes
            ? `<p class="meal-card-notes">${escapeHtml(meal.notes)}</p>`
            : (meal.items.length === 0 ? '<p>Nenhum alimento cadastrado.</p>' : '');

        return `
            <div class="meal-card">
                <div class="meal-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">${icone}</svg>
                </div>
                <div class="meal-card-content">
                    <h4>${titulo}</h4>
                    ${itemsHtml}
                    ${notesHtml}
                </div>
            </div>
        `;
    }).join('');
}

// ===================================================================
// MÓDULO WGER (BANCO DE EXERCÍCIOS ABERTO E GRATUITO)
// ===================================================================
// Mapa de categorias de grupo muscular do Wger (id oficial da API -> rótulo em português).
// A API pública do Wger não tem endpoint de busca por texto livre funcional (testado:
// /api/v2/exercise/search/ não existe mais e filtros como ?search=/?name__icontains= são
// ignorados pela API atual). O que funciona de forma confiável é filtrar por categoria
// (grupo muscular) em /api/v2/exerciseinfo/, então a navegação é por categoria e não por texto.
const WGER_CATEGORIES = {
    11: 'Peito',
    12: 'Costas',
    9: 'Pernas',
    13: 'Ombros',
    8: 'Braços',
    10: 'Abdômen',
    14: 'Panturrilhas',
    15: 'Cardio'
};

const wgerCategoryCache = {}; // Cache em memória por categoria já buscada nesta sessão, evita refetch

/**
 * Busca os exercícios de uma categoria (grupo muscular) no banco de dados aberto do Wger
 * @param {number} categoryId Id da categoria no Wger (ver WGER_CATEGORIES)
 * @returns {Array|null} Lista de exercícios, [] se a categoria não tiver nenhum, ou null em caso de falha de rede
 */
async function fetchWgerExercisesByCategory(categoryId) {
    if (wgerCategoryCache[categoryId]) {
        return wgerCategoryCache[categoryId];
    }

    try {
        const url = `https://wger.de/api/v2/exerciseinfo/?category=${categoryId}&limit=40&format=json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Wger respondeu ${res.status}`);
        const data = await res.json();

        const exercises = (data.results || [])
            .map(ex => ({ id: ex.id, name: extractWgerExerciseName(ex) }))
            .filter(ex => ex.name)
            .sort((a, b) => a.name.localeCompare(b.name));

        wgerCategoryCache[categoryId] = exercises;
        return exercises;
    } catch (err) {
        console.warn('Não foi possível buscar exercícios no Wger:', err.message);
        return null;
    }
}

/**
 * Extrai o nome do exercício priorizando a tradução em português (language id 7);
 * cai para inglês (id 2) e, por último, para a primeira tradução disponível.
 * A cobertura de português no Wger é parcial por ser um banco de dados colaborativo/aberto
 * (medido empiricamente em ~1/3 dos exercícios) — por isso o fallback para inglês é necessário.
 */
function extractWgerExerciseName(exerciseInfo) {
    const translations = exerciseInfo.translations || [];
    const pt = translations.find(t => t.language === 7);
    if (pt) return pt.name;
    const en = translations.find(t => t.language === 2);
    if (en) return en.name;
    return translations[0] ? translations[0].name : null;
}

/**
 * Renderiza os botões das categorias do Wger no modal de treino customizado
 */
function renderWgerCategoryButtons() {
    if (!domElements.wgerCategoryButtons) return;

    domElements.wgerCategoryButtons.innerHTML = Object.entries(WGER_CATEGORIES).map(([id, label]) =>
        `<button type="button" class="wger-category-btn" data-category="${id}">${label}</button>`
    ).join('');
}

/**
 * Busca e exibe os exercícios da categoria selecionada, e destaca o botão ativo
 * @param {string} categoryId Id da categoria clicada
 * @param {HTMLElement} clickedBtn Botão clicado, para aplicar o destaque visual
 */
async function selectWgerCategory(categoryId, clickedBtn) {
    domElements.wgerCategoryButtons.querySelectorAll('.wger-category-btn').forEach(btn => {
        btn.classList.toggle('active', btn === clickedBtn);
    });

    domElements.wgerResultsList.innerHTML = '<li class="search-status-msg">Buscando exercícios...</li>';

    const exercises = await fetchWgerExercisesByCategory(categoryId);

    if (exercises === null) {
        domElements.wgerResultsList.innerHTML = '<li class="search-status-msg">Não foi possível buscar exercícios agora. Tente novamente.</li>';
        return;
    }
    if (exercises.length === 0) {
        domElements.wgerResultsList.innerHTML = '<li class="search-status-msg">Nenhum exercício encontrado nesta categoria.</li>';
        return;
    }

    domElements.wgerResultsList.innerHTML = exercises.map(ex =>
        `<li class="wger-result-item" data-name="${escapeHtml(ex.name)}">
            <span>${escapeHtml(ex.name)}</span>
            <span class="wger-result-add-icon">+</span>
        </li>`
    ).join('');

    domElements.wgerResultsList.querySelectorAll('.wger-result-item').forEach(li => {
        li.addEventListener('click', () => addWgerExerciseToWorkoutForm(li.getAttribute('data-name')));
    });
}

/**
 * Adiciona uma nova linha ao formulário de treino customizado já com o nome do
 * exercício preenchido — o usuário só precisa completar séries/repetições. A digitação
 * manual continua disponível normalmente, esta é só uma forma mais rápida de preencher.
 */
function addWgerExerciseToWorkoutForm(exerciseName) {
    const row = document.createElement('div');
    row.className = 'custom-exercise-field-row';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'custom-ex-name-input';
    nameInput.required = true;
    nameInput.value = exerciseName; // Atribuição via propriedade: sem risco de quebra de HTML

    const seriesInput = document.createElement('input');
    seriesInput.type = 'text';
    seriesInput.className = 'custom-ex-series-input';
    seriesInput.placeholder = 'Séries/Reps';
    seriesInput.required = true;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn-remove-row';
    removeBtn.setAttribute('aria-label', 'Remover linha');
    removeBtn.innerHTML = '&times;';
    removeBtn.addEventListener('click', () => row.remove());

    row.appendChild(nameInput);
    row.appendChild(seriesInput);
    row.appendChild(removeBtn);
    domElements.customExercisesFieldsContainer.appendChild(row);

    seriesInput.focus();
}

// ===================================================================
// MÓDULO OPEN FOOD FACTS (BUSCA DE ALIMENTOS REAIS PARA AS REFEIÇÕES)
// ===================================================================
// A busca por texto livre da Open Food Facts não tem CORS liberado para chamadas
// diretas do navegador (só a API estruturada por categoria/marca tem CORS, e ela não
// filtra por nome). Por isso a busca passa pela Edge Function "off-search" do Supabase,
// que roda no servidor e repassa a chamada — ver supabase/functions/off-search/index.ts.
let editingCustomDiet = null; // Cópia de trabalho da dieta sendo editada no modal (antes de salvar)

/**
 * Busca alimentos reais por nome via a Edge Function proxy do Supabase
 * @param {string} term Termo de busca digitado pelo usuário
 * @returns {Array|null} Lista de alimentos encontrados, ou null em caso de falha
 */
async function searchFoods(term) {
    try {
        // O nome exibido no painel Supabase é "off-seach", mas o endpoint real publicado
        // ficou com o identificador "dynamic-function" (nome de rota gerado no deploy via editor).
        const { data, error } = await supabaseClient.functions.invoke('dynamic-function', {
            body: { q: term }
        });
        if (error) throw error;
        return data.results || [];
    } catch (err) {
        console.warn('Não foi possível buscar alimentos:', err.message);
        return null;
    }
}

/**
 * Preenche os 4 blocos de refeição do modal com a dieta em edição (editingCustomDiet)
 */
function renderMealBuilders() {
    document.querySelectorAll('.meal-builder').forEach(block => {
        const mealKey = block.getAttribute('data-meal');
        const meal = editingCustomDiet[mealKey];

        block.querySelector('.meal-notes').value = meal.notes;
        block.querySelector('.food-search-input').value = '';
        block.querySelector('.food-search-results').innerHTML = '';
        renderMealItemsList(block, mealKey);
    });
}

/**
 * Renderiza a lista de alimentos já adicionados a uma refeição, com input de gramas
 * e botão de remover, além do subtotal de macros calculado
 */
function renderMealItemsList(block, mealKey) {
    const meal = editingCustomDiet[mealKey];
    const list = block.querySelector('.meal-items-list');
    const totalsEl = block.querySelector('.meal-totals');

    list.innerHTML = meal.items.map((item, idx) => `
        <li class="meal-item" data-index="${idx}">
            <span class="meal-item-name">${escapeHtml(item.name)}</span>
            <input type="number" class="meal-item-grams" value="${item.grams}" min="1">
            <button type="button" class="btn-remove-meal-item" aria-label="Remover alimento">&times;</button>
        </li>
    `).join('');

    const totals = calculateMealTotals(meal.items);
    totalsEl.innerText = meal.items.length > 0
        ? `Total: ${Math.round(totals.kcal)}kcal | P: ${totals.protein.toFixed(1)}g | C: ${totals.carbs.toFixed(1)}g | G: ${totals.fat.toFixed(1)}g`
        : '';

    // Ouvintes da linha: ajustar gramas recalcula o subtotal; remover tira o item da lista
    list.querySelectorAll('.meal-item').forEach(li => {
        const idx = parseInt(li.getAttribute('data-index'));

        li.querySelector('.meal-item-grams').addEventListener('input', (e) => {
            const grams = parseFloat(e.target.value) || 0;
            editingCustomDiet[mealKey].items[idx].grams = grams;
            const newTotals = calculateMealTotals(editingCustomDiet[mealKey].items);
            totalsEl.innerText = `Total: ${Math.round(newTotals.kcal)}kcal | P: ${newTotals.protein.toFixed(1)}g | C: ${newTotals.carbs.toFixed(1)}g | G: ${newTotals.fat.toFixed(1)}g`;
        });

        li.querySelector('.btn-remove-meal-item').addEventListener('click', () => {
            editingCustomDiet[mealKey].items.splice(idx, 1);
            renderMealItemsList(block, mealKey);
        });
    });
}

/**
 * Executa a busca de alimentos para o bloco de refeição informado e exibe os resultados
 */
async function handleFoodSearch(block) {
    const input = block.querySelector('.food-search-input');
    const resultsList = block.querySelector('.food-search-results');
    const term = input.value.trim();

    if (term.length < 2) {
        resultsList.innerHTML = '<li class="search-status-msg">Digite pelo menos 2 caracteres.</li>';
        return;
    }

    resultsList.innerHTML = '<li class="search-status-msg">Buscando...</li>';
    const results = await searchFoods(term);

    if (results === null) {
        resultsList.innerHTML = '<li class="search-status-msg">Não foi possível buscar agora. Tente novamente.</li>';
        return;
    }
    if (results.length === 0) {
        resultsList.innerHTML = '<li class="search-status-msg">Nenhum alimento encontrado.</li>';
        return;
    }

    resultsList.innerHTML = results.map((food, idx) => `
        <li class="food-search-result-item" data-index="${idx}">
            <span>${escapeHtml(food.name)}${food.brand ? ` <span style="color:var(--text-muted)">(${escapeHtml(food.brand)})</span>` : ''}</span>
            <span class="food-search-result-kcal">${Math.round(food.kcal100)}kcal/100g</span>
        </li>
    `).join('');

    const mealKey = block.getAttribute('data-meal');
    resultsList.querySelectorAll('.food-search-result-item').forEach(li => {
        const idx = parseInt(li.getAttribute('data-index'));
        li.addEventListener('click', () => {
            editingCustomDiet[mealKey].items.push({ ...results[idx], grams: 100 });
            renderMealItemsList(block, mealKey);
            resultsList.innerHTML = '';
            input.value = '';
        });
    });
}

// ===================================================================
// SISTEMA DE RESUMO DE DADOS DO HUB INICIAL
// ===================================================================
/**
 * Atualiza o contador de treinos completados exibido na tela inicial (Hub)
 */
function updateHubSummary() {
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
}

/**
 * Atualiza o último IMC exibido no resumo do Hub a partir do cache de registros do Supabase
 * @param {Array} records Lista de registros vinda do Supabase (ver progressRecordsCache)
 */
function updateHubSummaryImc(records) {
    if (!domElements.summaryImcValue) return;
    domElements.summaryImcValue.innerText = (records && records.length > 0) ? records[0].imc : '--';
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
 * Registra uma mensagem de erro detalhada no console baseada na resposta oficial do Spotify ou falhas de rede.
 * Isso evita a exibição de popups nativos intrusivos (alert) na tela do usuário.
 */
function exibirErroSpotify(res, mensagemPadrao) {
    if (res && res.error) {
        const err = res.error;
        // Erro de plano Free (Premium requerido)
        if (err.reason === 'PREMIUM_REQUIRED' || err.status === 403) {
            localStorage.setItem('spotify_user_product', 'free');
            console.warn('O controle de reprodução é um recurso exclusivo para assinantes do Spotify Premium devido a limitações da API do Spotify.');
            return;
        }
        // Erro de dispositivo inativo ou não localizado
        if (err.reason === 'NO_ACTIVE_DEVICE' || err.status === 404) {
            console.warn('Nenhum dispositivo ativo encontrado no seu Spotify. Abra o app do Spotify no celular/computador e comece a tocar uma música.');
            return;
        }
        // Registra qualquer outro erro com código retornado pelo servidor do Spotify
        console.warn(`Erro no Spotify: ${err.message || mensagemPadrao} (Status: ${err.status || 'N/A'})`);
        return;
    }
    // Erro de rede, CORS ou preflight do Safari
    console.warn(`${mensagemPadrao}. Verifique se você possui o Spotify Premium e se o aplicativo está aberto e ativo no seu aparelho.`);
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
    // 0. Escutadores da tela de Autenticação (Supabase Auth)
    if (domElements.formAuth) {
        domElements.formAuth.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearAuthError();

            const email = domElements.inputAuthEmail.value.trim();
            const password = domElements.inputAuthPassword.value;
            const originalLabel = domElements.btnAuthSubmit.innerText;
            domElements.btnAuthSubmit.disabled = true;
            domElements.btnAuthSubmit.innerText = 'Aguarde...';

            try {
                if (authMode === 'signup') {
                    await handleSignUp(email, password);
                    showAuthError('Conta criada! Se a confirmação de e-mail estiver ativa no projeto, verifique sua caixa de entrada antes de entrar.');
                } else {
                    await handleSignIn(email, password);
                    await onAuthenticated();
                }
            } catch (err) {
                showAuthError(err.message || 'Não foi possível autenticar. Tente novamente.');
            } finally {
                domElements.btnAuthSubmit.disabled = false;
                domElements.btnAuthSubmit.innerText = originalLabel;
            }
        });
    }

    if (domElements.btnAuthToggleMode) {
        domElements.btnAuthToggleMode.addEventListener('click', toggleAuthMode);
    }

    if (domElements.btnLogout) {
        domElements.btnLogout.addEventListener('click', () => {
            if (confirm('Deseja realmente sair da sua conta?')) {
                handleSignOut();
            }
        });
    }

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
        domElements.formProgress.addEventListener('submit', async (e) => {
            e.preventDefault();
            const w = parseFloat(domElements.inputWeight.value);
            const h = parseInt(domElements.inputHeight.value);
            const t = parseInt(domElements.inputTime.value);
            const c = parseInt(domElements.inputCalories.value);

            await saveProgressRecord(w, h, t, c);
            await refreshProgressUI();

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
            editingCustomDiet = getCustomDiet();
            renderMealBuilders();
            domElements.modalCustomDiet.style.display = 'flex';
        });
    }

    if (domElements.btnCloseDietModal) {
        domElements.btnCloseDietModal.addEventListener('click', () => {
            domElements.modalCustomDiet.style.display = 'none';
        });
    }

    if (domElements.formCustomDiet) {
        // Botões de busca de alimentos (um por refeição) e tecla Enter no campo de busca
        domElements.formCustomDiet.querySelectorAll('.meal-builder').forEach(block => {
            block.querySelector('.btn-food-search').addEventListener('click', () => handleFoodSearch(block));
            block.querySelector('.food-search-input').addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Evita submeter o formulário ao buscar com Enter
                    handleFoodSearch(block);
                }
            });
        });

        domElements.formCustomDiet.addEventListener('submit', (e) => {
            e.preventDefault();

            // Coleta as observações digitadas em cada refeição antes de salvar
            domElements.formCustomDiet.querySelectorAll('.meal-builder').forEach(block => {
                const mealKey = block.getAttribute('data-meal');
                editingCustomDiet[mealKey].notes = block.querySelector('.meal-notes').value;
            });

            saveCustomDiet(editingCustomDiet);
            domElements.modalCustomDiet.style.display = 'none';
            renderCustomDiet();
        });
    }

    // 6. Ouvintes para o modal de criação de Treinos Customizados
    if (domElements.btnOpenCustomWorkoutModal) {
        domElements.btnOpenCustomWorkoutModal.addEventListener('click', () => {
            // Abre o modal de treino e prepara o buscador de exercícios do Wger
            renderWgerCategoryButtons();
            domElements.wgerResultsList.innerHTML = '';
            domElements.modalCustomWorkout.style.display = 'flex';
        });
    }

    // Delegação de evento nos botões de categoria do Wger (renderizados dinamicamente)
    if (domElements.wgerCategoryButtons) {
        domElements.wgerCategoryButtons.addEventListener('click', (e) => {
            const btn = e.target.closest('.wger-category-btn');
            if (!btn) return;
            selectWgerCategory(btn.getAttribute('data-category'), btn);
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

    // Aplica o tema de gênero ativo (independe de autenticação)
    switchGender(activeGender);

    // Garante que o timer inicie limpo e atualizado
    timerTimeLeft = 0;
    updateTimerUI();

    // Verifica se já existe uma sessão Supabase ativa antes de liberar o restante do app;
    // caso contrário, mantém a tela de login/cadastro (view-auth) visível
    initAuthGate();
});
