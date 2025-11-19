/**
 * Escolas Page - Script
 * - Gerencia a tabela de escolas, modal de edição/adição, e ações CRUD
 */

document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo (em projeto real, viriam de uma API)
    let escolas = [
        { id: 1, nome: "Escola Primária de Malanje", nivel: "Primário", localizacao: "Malanje Centro", alunos: 450, contacto: "923 456 789" },
        { id: 2, nome: "Escola Secundária 1º de Maio", nivel: "Secundário", localizacao: "Bairro 1º de Maio", alunos: 800, contacto: "923 123 456" },
        { id: 3, nome: "Liceu de Malanje", nivel: "Secundário", localizacao: "Av. Agostinho Neto", alunos: 1200, contacto: "923 789 123" }
    ];

    // Elementos DOM
    const schoolsTableBody = document.querySelector('.schools-table tbody');
    const addSchoolBtn = document.querySelector('.add-school-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal-header h2');
    const modalForm = document.querySelector('.modal-form');
    const saveBtn = document.querySelector('.save-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const searchInput = document.querySelector('.search-box input');
    const filterSelect = document.querySelector('.filter-select');

    // Variável para guardar o ID da escola em edição
    let editingSchoolId = null;

    // Inicializar a tabela
    renderSchoolsTable(escolas);

    // Abrir modal para adicionar escola
    addSchoolBtn.addEventListener('click', () => openModal('Adicionar Escola'));

    // Fechar modal
    cancelBtn.addEventListener('click', closeModal);
    document.querySelector('.close-btn').addEventListener('click', closeModal);

    // Salvar escola (adicionar/editar)
    saveBtn.addEventListener('click', saveSchool);

    // Pesquisa e filtro
    searchInput.addEventListener('input', filterSchools);
    filterSelect.addEventListener('change', filterSchools);

    /**
     * Renderiza a tabela de escolas
     * @param {Array} schools - Lista de escolas
     */
    function renderSchoolsTable(schools) {
        schoolsTableBody.innerHTML = '';
        schools.forEach(school => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${school.nome}</td>
                <td>${school.nivel}</td>
                <td>${school.localizacao}</td>
                <td>${school.alunos}</td>
                <td>${school.contacto}</td>
                <td class="action-buttons">
                    <button class="edit-btn" data-id="${school.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${school.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            schoolsTableBody.appendChild(row);
        });

        // Adicionar eventos aos botões de ação
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const schoolId = parseInt(e.currentTarget.getAttribute('data-id'));
                editSchool(schoolId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const schoolId = parseInt(e.currentTarget.getAttribute('data-id'));
                deleteSchool(schoolId);
            });
        });
    }

    /**
     * Abre o modal para adicionar/editar escola
     * @param {string} title - Título do modal
     * @param {Object} school - Dados da escola (opcional, para edição)
     */
    function openModal(title, school = null) {
        modalTitle.textContent = title;
        modalOverlay.classList.add('active');

        if (school) {
            // Preencher formulário com dados da escola
            editingSchoolId = school.id;
            modalForm.elements['nome'].value = school.nome;
            modalForm.elements['nivel'].value = school.nivel;
            modalForm.elements['localizacao'].value = school.localizacao;
            modalForm.elements['alunos'].value = school.alunos;
            modalForm.elements['contacto'].value = school.contacto;
            modalForm.elements['descricao'].value = school.descricao || '';
        } else {
            // Limpar formulário
            editingSchoolId = null;
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
     * Guarda a escola (adicionar ou editar)
     */
    function saveSchool() {
        const formData = {
            nome: modalForm.elements['nome'].value.trim(),
            nivel: modalForm.elements['nivel'].value,
            localizacao: modalForm.elements['localizacao'].value.trim(),
            alunos: parseInt(modalForm.elements['alunos'].value) || 0,
            contacto: modalForm.elements['contacto'].value.trim(),
            descricao: modalForm.elements['descricao'].value.trim()
        };

        // Validação básica
        if (!formData.nome || !formData.nivel || !formData.localizacao) {
            showMessage('Por favor, preencha todos os campos obrigatórios!', 'error');
            return;
        }

        if (editingSchoolId !== null) {
            // Editar escola existente
            const index = escolas.findIndex(s => s.id === editingSchoolId);
            escolas[index] = { ...escolas[index], ...formData };
            showMessage('Escola atualizada com sucesso!', 'success');
        } else {
            // Adicionar nova escola
            const newSchool = {
                id: escolas.length > 0 ? Math.max(...escolas.map(s => s.id)) + 1 : 1,
                ...formData
            };
            escolas.push(newSchool);
            showMessage('Escola adicionada com sucesso!', 'success');
        }

        renderSchoolsTable(escolas);
        closeModal();
    }

    /**
     * Edita uma escola
     * @param {number} schoolId - ID da escola
     */
    function editSchool(schoolId) {
        const school = escolas.find(s => s.id === schoolId);
        if (school) {
            openModal('Editar Escola', school);
        }
    }

    /**
     * Apaga uma escola
     * @param {number} schoolId - ID da escola
     */
    function deleteSchool(schoolId) {
        if (confirm('Tem a certeza que deseja apagar esta escola?')) {
            escolas = escolas.filter(s => s.id !== schoolId);
            showMessage('Escola apagada com sucesso!', 'success');
            renderSchoolsTable(escolas);
        }
    }

    /**
     * Filtra escolas com base na pesquisa e filtro
     */
    function filterSchools() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        let filteredSchools = escolas;

        if (searchTerm) {
            filteredSchools = filteredSchools.filter(school =>
                school.nome.toLowerCase().includes(searchTerm) ||
                school.localizacao.toLowerCase().includes(searchTerm) ||
                school.nivel.toLowerCase().includes(searchTerm)
            );
        }

        if (filterValue) {
            filteredSchools = filteredSchools.filter(school =>
                school.nivel.toLowerCase() === filterValue.toLowerCase()
            );
        }

        renderSchoolsTable(filteredSchools);
    }

    /**
     * Mostra mensagem de feedback
     * @param {string} text - Texto da mensagem
     * @param {string} type - Tipo de mensagem (error/success)
     */
    function showMessage(text, type) {
        const messageContainer = document.querySelector('.content') || document.querySelector('main');
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
