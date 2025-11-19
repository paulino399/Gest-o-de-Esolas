/**
 * Turmas Page - Script
 * - Gerencia a tabela de turmas, modal de edição/adição, e ações CRUD
 */

document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo (em projeto real, viriam de uma API)
    let turmas = [
        { id: 1, nome: "10A", curso: "Ciências", ano: "10º", professor: "Carlos Mendes", alunos: 28 },
        { id: 2, nome: "11B", curso: "Humanidades", ano: "11º", professor: "Ana Oliveira", alunos: 25 },
        { id: 3, nome: "9C", curso: "Artes", ano: "9º", professor: "João Pereira", alunos: 22 }
    ];

    // Elementos DOM
    const classesTableBody = document.querySelector('.classes-table tbody');
    const addClassBtn = document.querySelector('.add-class-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal-header h2');
    const modalForm = document.querySelector('.modal-form');
    const saveBtn = document.querySelector('.save-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const searchInput = document.querySelector('.search-box input');
    const filterSelect = document.querySelector('.filter-select');

    // Variável para guardar o ID da turma em edição
    let editingClassId = null;

    // Inicializar a tabela
    renderClassesTable(turmas);

    // Abrir modal para adicionar turma
    addClassBtn.addEventListener('click', () => openModal('Adicionar Turma'));

    // Fechar modal
    cancelBtn.addEventListener('click', closeModal);
    document.querySelector('.close-btn').addEventListener('click', closeModal);

    // Salvar turma (adicionar/editar)
    saveBtn.addEventListener('click', saveClass);

    // Pesquisa e filtro
    searchInput.addEventListener('input', filterClasses);
    filterSelect.addEventListener('change', filterClasses);

    /**
     * Renderiza a tabela de turmas
     * @param {Array} classes - Lista de turmas
     */
    function renderClassesTable(classes) {
        classesTableBody.innerHTML = '';
        classes.forEach(cls => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cls.nome}</td>
                <td>${cls.curso}</td>
                <td>${cls.ano}</td>
                <td>${cls.professor}</td>
                <td>${cls.alunos}</td>
                <td class="action-buttons">
                    <button class="edit-btn" data-id="${cls.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${cls.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            classesTableBody.appendChild(row);
        });

        // Adicionar eventos aos botões de ação
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const classId = parseInt(e.currentTarget.getAttribute('data-id'));
                editClass(classId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const classId = parseInt(e.currentTarget.getAttribute('data-id'));
                deleteClass(classId);
            });
        });
    }

    /**
     * Abre o modal para adicionar/editar turma
     * @param {string} title - Título do modal
     * @param {Object} cls - Dados da turma (opcional, para edição)
     */
    function openModal(title, cls = null) {
        modalTitle.textContent = title;
        modalOverlay.classList.add('active');

        if (cls) {
            // Preencher formulário com dados da turma
            editingClassId = cls.id;
            modalForm.elements['nome'].value = cls.nome;
            modalForm.elements['curso'].value = cls.curso;
            modalForm.elements['ano'].value = cls.ano;
            modalForm.elements['professor'].value = cls.professor;
            modalForm.elements['alunos'].value = cls.alunos;
        } else {
            // Limpar formulário
            editingClassId = null;
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
     * Guarda a turma (adicionar ou editar)
     */
    function saveClass() {
        const formData = {
            nome: modalForm.elements['nome'].value.trim(),
            curso: modalForm.elements['curso'].value.trim(),
            ano: modalForm.elements['ano'].value.trim(),
            professor: modalForm.elements['professor'].value.trim(),
            alunos: parseInt(modalForm.elements['alunos'].value) || 0
        };

        // Validação básica
        if (!formData.nome || !formData.curso || !formData.ano) {
            showMessage('Por favor, preencha todos os campos obrigatórios!', 'error');
            return;
        }

        if (editingClassId !== null) {
            // Editar turma existente
            const index = turmas.findIndex(t => t.id === editingClassId);
            turmas[index] = { ...turmas[index], ...formData };
            showMessage('Turma atualizada com sucesso!', 'success');
        } else {
            // Adicionar nova turma
            const newClass = {
                id: turmas.length > 0 ? Math.max(...turmas.map(t => t.id)) + 1 : 1,
                ...formData
            };
            turmas.push(newClass);
            showMessage('Turma adicionada com sucesso!', 'success');
        }

        renderClassesTable(turmas);
        closeModal();
    }

    /**
     * Edita uma turma
     * @param {number} classId - ID da turma
     */
    function editClass(classId) {
        const cls = turmas.find(t => t.id === classId);
        if (cls) {
            openModal('Editar Turma', cls);
        }
    }

    /**
     * Apaga uma turma
     * @param {number} classId - ID da turma
     */
    function deleteClass(classId) {
        if (confirm('Tem a certeza que deseja apagar esta turma?')) {
            turmas = turmas.filter(t => t.id !== classId);
            showMessage('Turma apagada com sucesso!', 'success');
            renderClassesTable(turmas);
        }
    }

    /**
     * Filtra turmas com base na pesquisa e filtro
     */
    function filterClasses() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        let filteredClasses = turmas;

        if (searchTerm) {
            filteredClasses = filteredClasses.filter(cls =>
                cls.nome.toLowerCase().includes(searchTerm) ||
                cls.curso.toLowerCase().includes(searchTerm) ||
                cls.ano.toLowerCase().includes(searchTerm) ||
                cls.professor.toLowerCase().includes(searchTerm)
            );
        }

        if (filterValue) {
            filteredClasses = filteredClasses.filter(cls =>
                cls.curso.toLowerCase() === filterValue.toLowerCase()
            );
        }

        renderClassesTable(filteredClasses);
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
