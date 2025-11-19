/**
 * Professores Page - Script
 * - Gerencia a tabela de professores, modal de edição/adição, e ações CRUD
 */

document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo (em projeto real, viriam de uma API)
    let professores = [
        { id: 1, nome: "Carlos Mendes", numero: "P2023001", departamento: "Matemática", contacto: "923456789", email: "carlos.mendes@escola.ao" },
        { id: 2, nome: "Ana Oliveira", numero: "P2023002", departamento: "Português", contacto: "923123456", email: "ana.oliveira@escola.ao" },
        { id: 3, nome: "João Pereira", numero: "P2023003", departamento: "Ciências", contacto: "923789123", email: "joao.pereira@escola.ao" }
    ];

    // Elementos DOM
    const teachersTableBody = document.querySelector('.teachers-table tbody');
    const addTeacherBtn = document.querySelector('.add-teacher-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal-header h2');
    const modalForm = document.querySelector('.modal-form');
    const saveBtn = document.querySelector('.save-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const searchInput = document.querySelector('.search-box input');
    const filterSelect = document.querySelector('.filter-select');

    // Variável para guardar o ID do professor em edição
    let editingTeacherId = null;

    // Inicializar a tabela
    renderTeachersTable(professores);

    // Abrir modal para adicionar professor
    addTeacherBtn.addEventListener('click', () => openModal('Adicionar Professor'));

    // Fechar modal
    cancelBtn.addEventListener('click', closeModal);
    document.querySelector('.close-btn').addEventListener('click', closeModal);

    // Salvar professor (adicionar/editar)
    saveBtn.addEventListener('click', saveTeacher);

    // Pesquisa e filtro
    searchInput.addEventListener('input', filterTeachers);
    filterSelect.addEventListener('change', filterTeachers);

    /**
     * Renderiza a tabela de professores
     * @param {Array} teachers - Lista de professores
     */
    function renderTeachersTable(teachers) {
        teachersTableBody.innerHTML = '';
        teachers.forEach(teacher => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${teacher.nome}</td>
                <td>${teacher.numero}</td>
                <td>${teacher.departamento}</td>
                <td>${teacher.contacto}</td>
                <td>${teacher.email}</td>
                <td class="action-buttons">
                    <button class="edit-btn" data-id="${teacher.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${teacher.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            teachersTableBody.appendChild(row);
        });

        // Adicionar eventos aos botões de ação
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const teacherId = parseInt(e.currentTarget.getAttribute('data-id'));
                editTeacher(teacherId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const teacherId = parseInt(e.currentTarget.getAttribute('data-id'));
                deleteTeacher(teacherId);
            });
        });
    }

    /**
     * Abre o modal para adicionar/editar professor
     * @param {string} title - Título do modal
     * @param {Object} teacher - Dados do professor (opcional, para edição)
     */
    function openModal(title, teacher = null) {
        modalTitle.textContent = title;
        modalOverlay.classList.add('active');

        if (teacher) {
            // Preencher formulário com dados do professor
            editingTeacherId = teacher.id;
            modalForm.elements['nome'].value = teacher.nome;
            modalForm.elements['numero'].value = teacher.numero;
            modalForm.elements['departamento'].value = teacher.departamento;
            modalForm.elements['contacto'].value = teacher.contacto;
            modalForm.elements['email'].value = teacher.email;
        } else {
            // Limpar formulário
            editingTeacherId = null;
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
     * Guarda o professor (adicionar ou editar)
     */
    function saveTeacher() {
        const formData = {
            nome: modalForm.elements['nome'].value.trim(),
            numero: modalForm.elements['numero'].value.trim(),
            departamento: modalForm.elements['departamento'].value.trim(),
            contacto: modalForm.elements['contacto'].value.trim(),
            email: modalForm.elements['email'].value.trim()
        };

        // Validação básica
        if (!formData.nome || !formData.numero || !formData.departamento) {
            showMessage('Por favor, preencha todos os campos obrigatórios!', 'error');
            return;
        }

        if (editingTeacherId !== null) {
            // Editar professor existente
            const index = professores.findIndex(t => t.id === editingTeacherId);
            professores[index] = { ...professores[index], ...formData };
            showMessage('Professor atualizado com sucesso!', 'success');
        } else {
            // Adicionar novo professor
            const newTeacher = {
                id: professores.length > 0 ? Math.max(...professores.map(t => t.id)) + 1 : 1,
                ...formData
            };
            professores.push(newTeacher);
            showMessage('Professor adicionado com sucesso!', 'success');
        }

        renderTeachersTable(professores);
        closeModal();
    }

    /**
     * Edita um professor
     * @param {number} teacherId - ID do professor
     */
    function editTeacher(teacherId) {
        const teacher = professores.find(t => t.id === teacherId);
        if (teacher) {
            openModal('Editar Professor', teacher);
        }
    }

    /**
     * Apaga um professor
     * @param {number} teacherId - ID do professor
     */
    function deleteTeacher(teacherId) {
        if (confirm('Tem a certeza que deseja apagar este professor?')) {
            professores = professores.filter(t => t.id !== teacherId);
            showMessage('Professor apagado com sucesso!', 'success');
            renderTeachersTable(professores);
        }
    }

    /**
     * Filtra professores com base na pesquisa e filtro
     */
    function filterTeachers() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        let filteredTeachers = professores;

        if (searchTerm) {
            filteredTeachers = filteredTeachers.filter(teacher =>
                teacher.nome.toLowerCase().includes(searchTerm) ||
                teacher.numero.toLowerCase().includes(searchTerm) ||
                teacher.departamento.toLowerCase().includes(searchTerm)
            );
        }

        if (filterValue) {
            filteredTeachers = filteredTeachers.filter(teacher =>
                teacher.departamento.toLowerCase() === filterValue.toLowerCase()
            );
        }

        renderTeachersTable(filteredTeachers);
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
