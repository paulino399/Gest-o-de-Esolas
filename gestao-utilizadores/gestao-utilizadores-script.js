/**
 * Gestão de Utilizadores - Script
 * - Gerencia a tabela de utilizadores (alunos e professores), modal de edição/adição, e ações CRUD
 */

document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo (em projeto real, viriam de uma API)
    let alunos = [
        { id: 1, nome: "Ana Silva", numero: "2023001", turma: "10A", curso: "Ciências", contacto: "923456789", email: "ana.silva@escola.ao", tipo: "aluno" },
        { id: 2, nome: "João Santos", numero: "2023002", turma: "11B", curso: "Humanidades", contacto: "923123456", email: "joao.santos@escola.ao", tipo: "aluno" },
        { id: 3, nome: "Maria Fernandes", numero: "2023003", turma: "9C", curso: "Artes", contacto: "923789123", email: "maria.fernandes@escola.ao", tipo: "aluno" }
    ];

    let professores = [
        { id: 1, nome: "Carlos Mendes", numero: "P2023001", departamento: "Matemática", contacto: "923456789", email: "carlos.mendes@escola.ao", tipo: "professor" },
        { id: 2, nome: "Ana Oliveira", numero: "P2023002", departamento: "Português", contacto: "923123456", email: "ana.oliveira@escola.ao", tipo: "professor" },
        { id: 3, nome: "João Pereira", numero: "P2023003", departamento: "Ciências", contacto: "923789123", email: "joao.pereira@escola.ao", tipo: "professor" }
    ];

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
    const userTypeSelect = document.querySelector('#userType');
    const alunoFields = document.querySelector('.aluno-fields');
    const professorFields = document.querySelector('.professor-fields');

    // Variável para guardar o ID do utilizador em edição
    let editingUserId = null;
    let currentUserType = 'aluno';

    // Inicializar a tabela com alunos
    renderUsersTable(alunos);

    // Alternar entre alunos e professores
    userTypeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            userTypeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentUserType = this.dataset.type;
            renderUsersTable(currentUserType === 'aluno' ? alunos : professores);
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

    // Alternar campos do formulário com base no tipo de utilizador
    userTypeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        if (selectedType === 'aluno') {
            alunoFields.classList.add('active');
            professorFields.classList.remove('active');
        } else {
            alunoFields.classList.remove('active');
            professorFields.classList.add('active');
        }
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

        // Definir tipo de utilizador no select
        userTypeSelect.value = currentUserType;

        // Alternar campos do formulário
        if (currentUserType === 'aluno') {
            alunoFields.classList.add('active');
            professorFields.classList.remove('active');
        } else {
            alunoFields.classList.remove('active');
            professorFields.classList.add('active');
        }

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
            } else {
                modalForm.elements['departamento'].value = user.departamento;
            }
        } else {
            // Limpar formulário
            editingUserId = null;
            modalForm.reset();
        }
    }

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
            tipo: userTypeSelect.value
        };

        // Campos específicos por tipo de utilizador
        if (formData.tipo === 'aluno') {
            formData.turma = modalForm.elements['turma'].value.trim();
            formData.curso = modalForm.elements['curso'].value.trim();
        } else {
            formData.departamento = modalForm.elements['departamento'].value.trim();
        }

        // Validação básica
        if (!formData.nome || !formData.numero || !formData.contacto) {
            showMessage('Por favor, preencha todos os campos obrigatórios!', 'error');
            return;
        }

        if (editingUserId !== null) {
            // Editar utilizador existente
            const userList = formData.tipo === 'aluno' ? alunos : professores;
            const index = userList.findIndex(u => u.id === editingUserId);
            userList[index] = { ...userList[index], ...formData };
            showMessage(`${formData.tipo === 'aluno' ? 'Aluno' : 'Professor'} atualizado com sucesso!`, 'success');
        } else {
            // Adicionar novo utilizador
            const newUser = {
                id: formData.tipo === 'aluno'
                    ? (alunos.length > 0 ? Math.max(...alunos.map(u => u.id)) + 1 : 1)
                    : (professores.length > 0 ? Math.max(...professores.map(u => u.id)) + 1 : 1),
                ...formData
            };

            if (formData.tipo === 'aluno') {
                alunos.push(newUser);
            } else {
                professores.push(newUser);
            }
            showMessage(`${formData.tipo === 'aluno' ? 'Aluno' : 'Professor'} adicionado com sucesso!`, 'success');
        }

        renderUsersTable(currentUserType === 'aluno' ? alunos : professores);
        closeModal();
    }

    /**
     * Edita um utilizador
     * @param {number} userId - ID do utilizador
     */
    function editUser(userId) {
        const userList = currentUserType === 'aluno' ? alunos : professores;
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
                alunos = alunos.filter(u => u.id !== userId);
            } else {
                professores = professores.filter(u => u.id !== userId);
            }
            showMessage(`${currentUserType === 'aluno' ? 'Aluno' : 'Professor'} apagado com sucesso!`, 'success');
            renderUsersTable(currentUserType === 'aluno' ? alunos : professores);
        }
    }

    /**
     * Filtra utilizadores com base na pesquisa e filtro
     */
    function filterUsers() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        let filteredUsers = currentUserType === 'aluno' ? alunos : professores;

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
});
