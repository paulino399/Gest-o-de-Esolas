/**
 * Gestão Centralizada - Script
 * - Gerencia a edição centralizada de alunos e professores
 * - Atualiza automaticamente as informações em todas as páginas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Dados centralizados (em projeto real, viriam de uma API)
    let dadosCentralizados = {
        alunos: [
            {
                id: 1,
                nome: "Ana Silva",
                numero: "2023001",
                turma: "10A",
                curso: "Ciências e Tecnologias",
                contacto: "923456789",
                email: "ana.silva@escola.ao",
                notas: {
                    "1T": [
                        { disciplina: "Matemática", notas: [15, 14, 16], media: 15 },
                        { disciplina: "Português", notas: [13, 14, 15], media: 14 }
                    ],
                    "2T": [
                        { disciplina: "Matemática", notas: [16, 15, 17], media: 16 },
                        { disciplina: "Português", notas: [14, 15, 16], media: 15 }
                    ]
                },
                horarios: [
                    { dia: "Segunda", disciplinas: [
                        { hora: "8:00-8:50", disciplina: "Matemática", professor: "Carlos Mendes", sala: "101" },
                        { hora: "9:00-9:50", disciplina: "Português", professor: "Ana Oliveira", sala: "102" }
                    ]},
                    { dia: "Terça", disciplinas: [
                        { hora: "8:00-8:50", disciplina: "Física", professor: "Maria Fernandes", sala: "201" },
                        { hora: "9:00-9:50", disciplina: "Inglês", professor: "Pedro Costa", sala: "103" }
                    ]}
                ]
            },
            {
                id: 2,
                nome: "João Santos",
                numero: "2023002",
                turma: "10A",
                curso: "Ciências e Tecnologias",
                contacto: "923123456",
                email: "joao.santos@escola.ao",
                notas: {
                    "1T": [
                        { disciplina: "Matemática", notas: [12, 13, 14], media: 13 },
                        { disciplina: "Português", notas: [14, 15, 13], media: 14 }
                    ],
                    "2T": [
                        { disciplina: "Matemática", notas: [14, 15, 16], media: 15 },
                        { disciplina: "Português", notas: [15, 16, 14], media: 15 }
                    ]
                },
                horarios: [
                    { dia: "Segunda", disciplinas: [
                        { hora: "8:00-8:50", disciplina: "Matemática", professor: "Carlos Mendes", sala: "101" },
                        { hora: "9:00-9:50", disciplina: "Português", professor: "Ana Oliveira", sala: "102" }
                    ]},
                    { dia: "Terça", disciplinas: [
                        { hora: "8:00-8:50", disciplina: "Física", professor: "Maria Fernandes", sala: "201" },
                        { hora: "9:00-9:50", disciplina: "Inglês", professor: "Pedro Costa", sala: "103" }
                    ]}
                ]
            }
        ],
        professores: [
            {
                id: 1,
                nome: "Carlos Mendes",
                numero: "P2023001",
                departamento: "Matemática",
                contacto: "923456789",
                email: "carlos.mendes@escola.ao",
                turmas: ["10A", "11B"],
                disciplinas: ["Matemática"],
                horarios: [
                    { dia: "Segunda", disciplinas: [
                        { hora: "8:00-8:50", turma: "10A", disciplina: "Matemática", sala: "101" },
                        { hora: "9:00-9:50", turma: "11B", disciplina: "Matemática", sala: "105" }
                    ]},
                    { dia: "Quarta", disciplinas: [
                        { hora: "10:10-11:00", turma: "10A", disciplina: "Matemática", sala: "101" }
                    ]}
                ]
            },
            {
                id: 2,
                nome: "Ana Oliveira",
                numero: "P2023002",
                departamento: "Português",
                contacto: "923123456",
                email: "ana.oliveira@escola.ao",
                turmas: ["10A", "9C"],
                disciplinas: ["Português"],
                horarios: [
                    { dia: "Segunda", disciplinas: [
                        { hora: "9:00-9:50", turma: "10A", disciplina: "Português", sala: "102" },
                        { hora: "11:10-12:00", turma: "9C", disciplina: "Português", sala: "104" }
                    ]},
                    { dia: "Quinta", disciplinas: [
                        { hora: "8:00-8:50", turma: "10A", disciplina: "Português", sala: "102" }
                    ]}
                ]
            }
        ],
        turmas: [
            {
                id: 1,
                nome: "10A",
                curso: "Ciências e Tecnologias",
                ano: "10º",
                professor: "Carlos Mendes",
                alunos: [1, 2],
                disciplinas: [
                    { nome: "Matemática", professor: "Carlos Mendes" },
                    { nome: "Português", professor: "Ana Oliveira" },
                    { nome: "Física", professor: "Maria Fernandes" }
                ],
                horarios: [
                    { dia: "Segunda", disciplinas: [
                        { hora: "8:00-8:50", disciplina: "Matemática", professor: "Carlos Mendes", sala: "101" },
                        { hora: "9:00-9:50", disciplina: "Português", professor: "Ana Oliveira", sala: "102" }
                    ]},
                    { dia: "Terça", disciplinas: [
                        { hora: "8:00-8:50", disciplina: "Física", professor: "Maria Fernandes", sala: "201" },
                        { hora: "9:00-9:50", disciplina: "Inglês", professor: "Pedro Costa", sala: "103" }
                    ]}
                ]
            }
        ]
    };

    // Elementos DOM
    const userTypeTabs = document.querySelectorAll('.user-type-tab');
    const usersTableBody = document.querySelector('.users-table tbody');
    const addUserBtn = document.querySelector('.add-user-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal-header h2');
    const modalForm = document.querySelector('.modal-form');
    const saveBtn = document.querySelector('.save-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const searchInput = document.querySelector('.search-box input');
    const filterSelect = document.querySelector('.filter-select');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Variáveis de controle
    let currentUserType = 'aluno';
    let editingUserId = null;

    // Inicializar a tabela com alunos
    renderUsersTable(dadosCentralizados.alunos);

    // Alternar entre alunos e professores
    userTypeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            userTypeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentUserType = this.dataset.type;
            renderUsersTable(currentUserType === 'aluno' ? dadosCentralizados.alunos : dadosCentralizados.professores);
        });
    });

    // Abrir modal para adicionar utilizador
    addUserBtn.addEventListener('click', () => openModal(`Adicionar ${currentUserType === 'aluno' ? 'Aluno' : 'Professor'}`));

    // Fechar modal
    cancelBtn.addEventListener('click', closeModal);
    document.querySelector('.close-btn').addEventListener('click', closeModal);

    // Salvar utilizador (adicionar/editar)
    saveBtn.addEventListener('click', saveUser);

    // Pesquisa e filtro
    searchInput.addEventListener('input', filterUsers);
    filterSelect.addEventListener('change', filterUsers);

    // Alternar abas no modal
    modalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            modalTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            document.querySelector(`#${this.dataset.target}`).classList.add('active');
        });
    });

    /**
     * Renderiza a tabela de utilizadores
     * @param {Array} users - Lista de utilizadores
     */
    function renderUsersTable(users) {
        usersTableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.nome}</td>
                <td>${user.numero}</td>
                <td>${currentUserType === 'aluno' ? user.turma : user.departamento}</td>
                <td>${user.contacto}</td>
                <td>${user.email}</td>
                <td class="action-buttons">
                    <button class="edit-btn" data-id="${user.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${user.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });

        // Adicionar eventos aos botões de ação
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = parseInt(e.currentTarget.getAttribute('data-id'));
                editUser(userId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = parseInt(e.currentTarget.getAttribute('data-id'));
                deleteUser(userId);
            });
        });
    }

    /**
     * Abre o modal para adicionar/editar utilizador
     * @param {string} title - Título do modal
     * @param {Object} user - Dados do utilizador (opcional, para edição)
     */
    function openModal(title, user = null) {
        modalTitle.textContent = title;
        modalOverlay.classList.add('active');

        // Resetar abas
        modalTabs[0].classList.add('active');
        tabContents[0].classList.add('active');
        modalTabs.forEach((tab, index) => {
            if (index !== 0) {
                tab.classList.remove('active');
                tabContents[index].classList.remove('active');
            }
        });

        if (user) {
            // Preencher formulário com dados do utilizador
            editingUserId = user.id;
            modalForm.elements['nome'].value = user.nome;
            modalForm.elements['numero'].value = user.numero;
            modalForm.elements['contacto'].value = user.contacto;
            modalForm.elements['email'].value = user.email;

            if (currentUserType === 'aluno') {
                modalForm.elements['turma'].value = user.turma;
                modalForm.elements['curso'].value = user.curso;
                renderNotasTable(user.notas);
            } else {
                modalForm.elements['departamento'].value = user.departamento;
                modalForm.elements['turmas'].value = user.turmas.join(', ');
                modalForm.elements['disciplinas'].value = user.disciplinas.join(', ');
            }
        } else {
            // Limpar formulário
            editingUserId = null;
            modalForm.reset();
            if (currentUserType === 'aluno') {
                document.querySelector('.notas-table tbody').innerHTML = '';
            }
        }
    }

    /**
     * Renderiza a tabela de notas no modal
     * @param {Object} notas - Notas do aluno
     */
    function renderNotasTable(notas) {
        const notasTableBody = document.querySelector('.notas-table tbody');
        notasTableBody.innerHTML = '';

        for (const periodo in notas) {
            notas[periodo].forEach(nota => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${nota.disciplina}</td>
                    <td>${nota.notas.join(', ')}</td>
                    <td>${nota.media}</td>
                    <td>
                        <button class="edit-nota-btn" data-period="${periodo}" data-disciplina="${nota.disciplina}"><i class="fas fa-edit"></i></button>
                        <button class="delete-nota-btn" data-period="${periodo}" data-disciplina="${nota.disciplina}"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                notasTableBody.appendChild(row);
            });
        }

        // Adicionar eventos aos botões de notas
        document.querySelectorAll('.edit-nota-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const periodo = e.currentTarget.dataset.period;
                const disciplina = e.currentTarget.dataset.disciplina;
                editNota(periodo, disciplina);
            });
        });

        document.querySelectorAll('.delete-nota-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const periodo = e.currentTarget.dataset.period;
                const disciplina = e.currentTarget.dataset.disciplina;
                deleteNota(periodo, disciplina);
            });
        });
    }

    /**
     * Edita uma nota
     * @param {string} periodo - Período da nota
     * @param {string} disciplina - Disciplina da nota
     */
    function editNota(periodo, disciplina) {
        const user = currentUserType === 'aluno'
            ? dadosCentralizados.alunos.find(u => u.id === editingUserId)
            : null;

        if (!user) return;

        const nota = user.notas[periodo].find(n => n.disciplina === disciplina);
        if (!nota) return;

        const novasNotas = prompt(`Editar notas de ${disciplina} (${periodo}):`, nota.notas.join(', '));
        if (novasNotas) {
            const notasArray = novasNotas.split(',').map(n => parseFloat(n.trim()));
            const media = notasArray.reduce((a, b) => a + b, 0) / notasArray.length;

            nota.notas = notasArray;
            nota.media = media;

            renderNotasTable(user.notas);
            updateData();
            showMessage('Nota atualizada com sucesso!', 'success');
        }
    }

    /**
     * Apaga uma nota
     * @param {string} periodo - Período da nota
     * @param {string} disciplina - Disciplina da nota
     */
    function deleteNota(periodo, disciplina) {
        if (confirm('Tem a certeza que deseja apagar esta nota?')) {
            const user = currentUserType === 'aluno'
                ? dadosCentralizados.alunos.find(u => u.id === editingUserId)
                : null;

            if (!user) return;

            user.notas[periodo] = user.notas[periodo].filter(n => n.disciplina !== disciplina);
            renderNotasTable(user.notas);
            updateData();
            showMessage('Nota apagada com sucesso!', 'success');
        }
    }

    /**
     * Adiciona uma nova nota
     */
    document.querySelector('.add-nota-btn').addEventListener('click', () => {
        if (currentUserType !== 'aluno') return;

        const periodo = prompt('Digite o período (ex: 1T, 2T, 3T):');
        if (!periodo) return;

        const disciplina = prompt('Digite o nome da disciplina:');
        if (!disciplina) return;

        const notasInput = prompt('Digite as notas separadas por vírgula (ex: 15, 14, 16):');
        if (!notasInput) return;

        const notasArray = notasInput.split(',').map(n => parseFloat(n.trim()));
        const media = notasArray.reduce((a, b) => a + b, 0) / notasArray.length;

        const user = dadosCentralizados.alunos.find(u => u.id === editingUserId);
        if (!user) return;

        if (!user.notas[periodo]) {
            user.notas[periodo] = [];
        }

        user.notas[periodo].push({
            disciplina: disciplina,
            notas: notasArray,
            media: media
        });

        renderNotasTable(user.notas);
        updateData();
        showMessage('Nota adicionada com sucesso!', 'success');
    });

    /**
     * Fecha o modal
     */
    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    /**
     * Guarda o utilizador (adicionar ou editar)
     */
    function saveUser() {
        const formData = {
            nome: modalForm.elements['nome'].value.trim(),
            numero: modalForm.elements['numero'].value.trim(),
            contacto: modalForm.elements['contacto'].value.trim(),
            email: modalForm.elements['email'].value.trim(),
            tipo: currentUserType
        };

        // Campos específicos por tipo de utilizador
        if (currentUserType === 'aluno') {
            formData.turma = modalForm.elements['turma'].value.trim();
            formData.curso = modalForm.elements['curso'].value.trim();
        } else {
            formData.departamento = modalForm.elements['departamento'].value.trim();
            formData.turmas = modalForm.elements['turmas'].value.split(',').map(t => t.trim());
            formData.disciplinas = modalForm.elements['disciplinas'].value.split(',').map(d => d.trim());
        }

        // Validação básica
        if (!formData.nome || !formData.numero || !formData.contacto) {
            showMessage('Por favor, preencha todos os campos obrigatórios!', 'error');
            return;
        }

        if (editingUserId !== null) {
            // Editar utilizador existente
            const userList = currentUserType === 'aluno' ? dadosCentralizados.alunos : dadosCentralizados.professores;
            const index = userList.findIndex(u => u.id === editingUserId);
            userList[index] = { ...userList[index], ...formData };
            showMessage(`${currentUserType === 'aluno' ? 'Aluno' : 'Professor'} atualizado com sucesso!`, 'success');
        } else {
            // Adicionar novo utilizador
            const newUser = {
                id: currentUserType === 'aluno'
                    ? (dadosCentralizados.alunos.length > 0 ? Math.max(...dadosCentralizados.alunos.map(u => u.id)) + 1 : 1)
                    : (dadosCentralizados.professores.length > 0 ? Math.max(...dadosCentralizados.professores.map(u => u.id)) + 1 : 1),
                ...formData,
                notas: currentUserType === 'aluno' ? { "1T": [], "2T": [], "3T": [] } : undefined,
                horarios: []
            };

            if (currentUserType === 'aluno') {
                dadosCentralizados.alunos.push(newUser);
            } else {
                dadosCentralizados.professores.push(newUser);
            }
            showMessage(`${currentUserType === 'aluno' ? 'Aluno' : 'Professor'} adicionado com sucesso!`, 'success');
        }

        updateData();
        renderUsersTable(currentUserType === 'aluno' ? dadosCentralizados.alunos : dadosCentralizados.professores);
        closeModal();
    }

    /**
     * Edita um utilizador
     * @param {number} userId - ID do utilizador
     */
    function editUser(userId) {
        const userList = currentUserType === 'aluno' ? dadosCentralizados.alunos : dadosCentralizados.professores;
        const user = userList.find(u => u.id === userId);
        if (user) {
            openModal(`Editar ${currentUserType === 'aluno' ? 'Aluno' : 'Professor'}`, user);
        }
    }

    /**
     * Apaga um utilizador
     * @param {number} userId - ID do utilizador
     */
    function deleteUser(userId) {
        if (confirm(`Tem a certeza que deseja apagar este ${currentUserType === 'aluno' ? 'aluno' : 'professor'}?`)) {
            if (currentUserType === 'aluno') {
                dadosCentralizados.alunos = dadosCentralizados.alunos.filter(u => u.id !== userId);
            } else {
                dadosCentralizados.professores = dadosCentralizados.professores.filter(u => u.id !== userId);
            }
            updateData();
            showMessage(`${currentUserType === 'aluno' ? 'Aluno' : 'Professor'} apagado com sucesso!`, 'success');
            renderUsersTable(currentUserType === 'aluno' ? dadosCentralizados.alunos : dadosCentralizados.professores);
        }
    }

    /**
     * Filtra utilizadores com base na pesquisa e filtro
     */
    function filterUsers() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        let filteredUsers = currentUserType === 'aluno' ? dadosCentralizados.alunos : dadosCentralizados.professores;

        if (searchTerm) {
            filteredUsers = filteredUsers.filter(user =>
                user.nome.toLowerCase().includes(searchTerm) ||
                user.numero.toLowerCase().includes(searchTerm) ||
                (currentUserType === 'aluno' ? user.turma.toLowerCase().includes(searchTerm) : user.departamento.toLowerCase().includes(searchTerm))
            );
        }

        if (filterValue) {
            filteredUsers = filteredUsers.filter(user =>
                currentUserType === 'aluno' ? user.curso.toLowerCase() === filterValue.toLowerCase() : user.departamento.toLowerCase() === filterValue.toLowerCase()
            );
        }

        renderUsersTable(filteredUsers);
    }

    /**
     * Atualiza os dados centralizados e notifica outras páginas
     */
    function updateData() {
        // Em um projeto real, aqui faríamos uma chamada à API para atualizar os dados
        // e depois notificaríamos todas as páginas abertas (usando WebSockets ou localStorage events)

        // Simulação de atualização em tempo real
        localStorage.setItem('dadosCentralizados', JSON.stringify(dadosCentralizados));

        // Disparar evento para notificar outras abas
        window.dispatchEvent(new Event('storage'));
    }

    /**
     * Mostra mensagem de feedback
     * @param {string} text - Texto da mensagem
     * @param {string} type - Tipo de mensagem (error/success)
     */
    function showMessage(text, type) {
        const messageContainer = document.querySelector('main') || document.querySelector('body');
        const oldMessage = messageContainer.querySelector('.message');
        if (oldMessage) oldMessage.remove();

        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        messageContainer.prepend(message);
        message.style.display = 'block';

        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }

    // Carregar dados do localStorage se existirem
    const savedData = localStorage.getItem('dadosCentralizados');
    if (savedData) {
        dadosCentralizados = JSON.parse(savedData);
        renderUsersTable(currentUserType === 'aluno' ? dadosCentralizados.alunos : dadosCentralizados.professores);
    }

    // Escutar por atualizações de outras abas
    window.addEventListener('storage', function() {
        const updatedData = localStorage.getItem('dadosCentralizados');
        if (updatedData) {
            dadosCentralizados = JSON.parse(updatedData);
            renderUsersTable(currentUserType === 'aluno' ? dadosCentralizados.alunos : dadosCentralizados.professores);
            showMessage('Dados atualizados por outro utilizador!', 'success');
        }
    });
});
