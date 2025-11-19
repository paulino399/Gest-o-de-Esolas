/**
 * Turma Pages - Script
 * - Gerencia as páginas de detalhes da turma, notas, horário e disciplinas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo (em projeto real, viriam de uma API)
    const turmaInfo = {
        id: 1,
        nome: "10A",
        curso: "Ciências e Tecnologias",
        ano: "10º",
        professor: "Carlos Mendes",
        alunos: 28,
        periodo: "2025/2026",
        horarios: [
            { dia: "Segunda", disciplinas: [
                { hora: "8:00-8:50", disciplina: "Matemática", professor: "Ana Silva", sala: "101" },
                { hora: "9:00-9:50", disciplina: "Português", professor: "João Santos", sala: "102" },
                { hora: "10:10-11:00", disciplina: "Física", professor: "Maria Fernandes", sala: "201" },
                { hora: "11:10-12:00", disciplina: "Inglês", professor: "Pedro Costa", sala: "103" },
                { hora: "12:10-13:00", disciplina: "Química", professor: "Luísa Mendes", sala: "202" }
            ]},
            { dia: "Terça", disciplinas: [
                { hora: "8:00-8:50", disciplina: "Biologia", professor: "Rui Oliveira", sala: "203" },
                { hora: "9:00-9:50", disciplina: "História", professor: "Sofia Pereira", sala: "104" },
                { hora: "10:10-11:00", disciplina: "Matemática", professor: "Ana Silva", sala: "101" },
                { hora: "11:10-12:00", disciplina: "Educação Física", professor: "Nuno Gomes", sala: "Ginásio" },
                { hora: "12:10-13:00", disciplina: "TIC", professor: "Mário Santos", sala: "301" }
            ]},
            { dia: "Quarta", disciplinas: [
                { hora: "8:00-8:50", disciplina: "Português", professor: "João Santos", sala: "102" },
                { hora: "9:00-9:50", disciplina: "Física", professor: "Maria Fernandes", sala: "201" },
                { hora: "10:10-11:00", disciplina: "Filosofia", professor: "Teresa Costa", sala: "105" },
                { hora: "11:10-12:00", disciplina: "Matemática", professor: "Ana Silva", sala: "101" },
                { hora: "12:10-13:00", disciplina: "Geografia", professor: "Paulo Rodrigues", sala: "106" }
            ]},
            { dia: "Quinta", disciplinas: [
                { hora: "8:00-8:50", disciplina: "Química", professor: "Luísa Mendes", sala: "202" },
                { hora: "9:00-9:50", disciplina: "Inglês", professor: "Pedro Costa", sala: "103" },
                { hora: "10:10-11:00", disciplina: "Biologia", professor: "Rui Oliveira", sala: "203" },
                { hora: "11:10-12:00", disciplina: "Português", professor: "João Santos", sala: "102" },
                { hora: "12:10-13:00", disciplina: "Física", professor: "Maria Fernandes", sala: "201" }
            ]},
            { dia: "Sexta", disciplinas: [
                { hora: "8:00-8:50", disciplina: "Matemática", professor: "Ana Silva", sala: "101" },
                { hora: "9:00-9:50", disciplina: "História", professor: "Sofia Pereira", sala: "104" },
                { hora: "10:10-11:00", disciplina: "Geografia", professor: "Paulo Rodrigues", sala: "106" },
                { hora: "11:10-12:00", disciplina: "TIC", professor: "Mário Santos", sala: "301" },
                { hora: "12:10-13:00", disciplina: "Educação Física", professor: "Nuno Gomes", sala: "Ginásio" }
            ]}
        ],
        disciplinas: [
            { nome: "Matemática", professor: "Ana Silva", sala: "101", cargaHoraria: "5h/semana" },
            { nome: "Português", professor: "João Santos", sala: "102", cargaHoraria: "4h/semana" },
            { nome: "Física", professor: "Maria Fernandes", sala: "201", cargaHoraria: "3h/semana" },
            { nome: "Química", professor: "Luísa Mendes", sala: "202", cargaHoraria: "3h/semana" },
            { nome: "Biologia", professor: "Rui Oliveira", sala: "203", cargaHoraria: "2h/semana" },
            { nome: "Inglês", professor: "Pedro Costa", sala: "103", cargaHoraria: "3h/semana" },
            { nome: "História", professor: "Sofia Pereira", sala: "104", cargaHoraria: "2h/semana" },
            { nome: "Geografia", professor: "Paulo Rodrigues", sala: "106", cargaHoraria: "2h/semana" },
            { nome: "Filosofia", professor: "Teresa Costa", sala: "105", cargaHoraria: "2h/semana" },
            { nome: "TIC", professor: "Mário Santos", sala: "301", cargaHoraria: "2h/semana" },
            { nome: "Educação Física", professor: "Nuno Gomes", sala: "Ginásio", cargaHoraria: "2h/semana" }
        ],
        notas: {
            "1T": [
                { disciplina: "Matemática", notas: [15, 14, 16], media: 15 },
                { disciplina: "Português", notas: [13, 14, 15], media: 14 },
                { disciplina: "Física", notas: [12, 13, 14], media: 13 },
                { disciplina: "Química", notas: [14, 15, 13], media: 14 },
                { disciplina: "Biologia", notas: [16, 15, 17], media: 16 }
            ],
            "2T": [
                { disciplina: "Matemática", notas: [16, 15, 17], media: 16 },
                { disciplina: "Português", notas: [14, 15, 16], media: 15 },
                { disciplina: "Física", notas: [14, 15, 14], media: 14.3 },
                { disciplina: "Química", notas: [15, 16, 15], media: 15.3 },
                { disciplina: "Biologia", notas: [17, 16, 18], media: 17 }
            ],
            "3T": [
                { disciplina: "Matemática", notas: [17, 16, 18], media: 17 },
                { disciplina: "Português", notas: [15, 16, 17], media: 16 },
                { disciplina: "Física", notas: [15, 16, 15], media: 15.3 },
                { disciplina: "Química", notas: [16, 17, 16], media: 16.3 },
                { disciplina: "Biologia", notas: [18, 17, 19], media: 18 }
            ]
        }
    };

    // Obter o aluno atual (simulado)
    const currentStudent = {
        nome: "João Silva",
        numero: "2023001",
        turma: turmaInfo.nome
    };

    // Verificar em qual página estamos e carregar os dados correspondentes
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage.includes('turma.html')) {
        loadTurmaPage();
    } else if (currentPage.includes('notas.html')) {
        loadNotasPage();
    } else if (currentPage.includes('horario.html')) {
        loadHorarioPage();
    } else if (currentPage.includes('disciplinas.html')) {
        loadDisciplinasPage();
    }

    /**
     * Carrega a página de detalhes da turma
     */
    function loadTurmaPage() {
        document.querySelector('.student-name').textContent = currentStudent.nome;
        document.querySelector('.class-name').textContent = turmaInfo.nome;

        const classInfoElement = document.querySelector('.class-info');
        classInfoElement.innerHTML = `
            <div class="class-info-item">
                <h3>Curso</h3>
                <p>${turmaInfo.curso}</p>
            </div>
            <div class="class-info-item">
                <h3>Ano Letivo</h3>
                <p>${turmaInfo.ano}</p>
            </div>
            <div class="class-info-item">
                <h3>Professor</h3>
                <p>${turmaInfo.professor}</p>
            </div>
            <div class="class-info-item">
                <h3>Número de Alunos</h3>
                <p>${turmaInfo.alunos}</p>
            </div>
            <div class="class-info-item">
                <h3>Período</h3>
                <p>${turmaInfo.periodo}</p>
            </div>
        `;
    }

    /**
     * Carrega a página de notas
     */
    function loadNotasPage() {
        document.querySelector('.student-name').textContent = currentStudent.nome;
        document.querySelector('.class-name').textContent = turmaInfo.nome;

        // Carregar notas do 1º trimestre por padrão
        loadNotasPeriod('1T');

        // Adicionar eventos aos botões de período
        document.querySelectorAll('.period-selector button').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.period-selector button').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                loadNotasPeriod(this.dataset.period);
            });
        });
    }

    /**
     * Carrega as notas de um período específico
     * @param {string} period - Período (1T, 2T, 3T)
     */
    function loadNotasPeriod(period) {
        const notasTableBody = document.querySelector('.notas-table tbody');
        notasTableBody.innerHTML = '';

        const notasPeriodo = turmaInfo.notas[period];
        let totalMedia = 0;
        let count = 0;

        notasPeriodo.forEach(nota => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${nota.disciplina}</td>
                <td>${nota.notas.join(', ')}</td>
                <td>${nota.media.toFixed(1)}</td>
            `;
            notasTableBody.appendChild(row);
            totalMedia += nota.media;
            count++;
        });

        if (count > 0) {
            const mediaFinal = totalMedia / count;
            const footerRow = document.createElement('tr');
            footerRow.innerHTML = `
                <td colspan="2" style="text-align: right; font-weight: 600;">Média Geral:</td>
                <td style="font-weight: 600; color: var(--success-color);">${mediaFinal.toFixed(1)}</td>
            `;
            notasTableBody.appendChild(footerRow);
        }
    }

    /**
     * Carrega a página de horário
     */
    function loadHorarioPage() {
        document.querySelector('.student-name').textContent = currentStudent.nome;
        document.querySelector('.class-name').textContent = turmaInfo.nome;

        const horarioTable = document.querySelector('.horario-table');
        const tbody = horarioTable.querySelector('tbody');
        tbody.innerHTML = '';

        // Adicionar horários
        turmaInfo.horarios.forEach(day => {
            const row = document.createElement('tr');

            // Célula do dia
            const dayCell = document.createElement('th');
            dayCell.textContent = day.dia;
            row.appendChild(dayCell);

            // Células de horário
            const hours = ["8:00-8:50", "9:00-9:50", "10:10-11:00", "11:10-12:00", "12:10-13:00"];

            hours.forEach(hour => {
                const cell = document.createElement('td');
                const discipline = day.disciplinas.find(d => d.hora === hour);

                if (discipline) {
                    cell.innerHTML = `
                        <strong>${discipline.disciplina}</strong><br>
                        <small>${discipline.professor}</small><br>
                        <small>${discipline.sala}</small>
                    `;
                } else {
                    cell.className = 'empty-cell';
                    cell.textContent = '--';
                }

                row.appendChild(cell);
            });

            tbody.appendChild(row);
        });

        // Adicionar cabeçalho de horas
        const thead = horarioTable.querySelector('thead tr');
        const emptyHeader = document.createElement('th');
        emptyHeader.textContent = '';
        thead.insertBefore(emptyHeader, thead.firstChild);

        const hours = ["8:00-8:50", "9:00-9:50", "10:10-11:00", "11:10-12:00", "12:10-13:00"];
        hours.forEach(hour => {
            const th = document.createElement('th');
            th.className = 'hour-cell';
            th.textContent = hour;
            thead.appendChild(th);
        });
    }

    /**
     * Carrega a página de disciplinas
     */
    function loadDisciplinasPage() {
        document.querySelector('.student-name').textContent = currentStudent.nome;
        document.querySelector('.class-name').textContent = turmaInfo.nome;

        const disciplinasGrid = document.querySelector('.disciplinas-grid');
        disciplinasGrid.innerHTML = '';

        turmaInfo.disciplinas.forEach(disciplina => {
            const card = document.createElement('div');
            card.className = 'disciplina-card';
            card.innerHTML = `
                <h3>${disciplina.nome}</h3>
                <div class="disciplina-info">
                    <p><strong>Professor:</strong> ${disciplina.professor}</p>
                    <p><strong>Sala:</strong> ${disciplina.sala}</p>
                    <p><strong>Carga Horária:</strong> ${disciplina.cargaHoraria}</p>
                </div>
                <div class="disciplina-professor">
                    <img src="professor-avatar.jpg" alt="${disciplina.professor}" class="professor-avatar">
                    <div>
                        <p><strong>${disciplina.professor}</strong></p>
                        <p><small>Professor de ${disciplina.nome}</small></p>
                    </div>
                </div>
            `;
            disciplinasGrid.appendChild(card);
        });
    }
});

// Nas páginas dos alunos/professores, adicionar este código:
window.addEventListener('storage', function() {
    const updatedData = localStorage.getItem('dadosCentralizados');
    if (updatedData) {
        const dados = JSON.parse(updatedData);

        // Atualizar os dados da página com base no ID do utilizador atual
        // Exemplo para página de aluno:
        const alunoId = parseInt(window.location.search.split('=')[1]); // Supondo que o ID vem na URL: aluno.html?id=1
        const alunoAtualizado = dados.alunos.find(a => a.id === alunoId);

        if (alunoAtualizado) {
            // Atualizar a página com os novos dados
            document.querySelector('.student-name').textContent = alunoAtualizado.nome;
            // Atualizar notas, horários, etc.
            renderNotas(alunoAtualizado.notas);
            renderHorario(alunoAtualizado.horarios);

            // Mostrar mensagem de atualização
            showMessage('Os seus dados foram atualizados!', 'success');
        }
    }
});
