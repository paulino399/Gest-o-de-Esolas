/**
 * Alunos Page - Script
 * - Gerencia a tabela de alunos, modal de edição/adição, e ações CRUD
 */

document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo (em projeto real, viriam de uma API)
    let alunos = [
        { id: 1, nome: "Ana Silva", numero: "2023001", turma: "10A", curso: "Ciências", contacto: "923456789", email: "ana.silva@escola.ao", nota: "18"},
        { id: 2, nome: "João Santos", numero: "2023002", turma: "11B", curso: "Humanidades", contacto: "923123456", email: "joao.santos@escola.ao" , nota: "15" },
        { id: 3, nome: "Maria Fernandes", numero: "2023003", turma: "9C", curso: "Artes", contacto: "923789123", email: "maria.fernandes@escola.ao", nota: "10" }
    ];

    // Elementos DOM
    const studentsTableBody = document.querySelector('.students-table tbody');
    const addStudentBtn = document.querySelector('.add-student-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal-header h2');
    const modalForm = document.querySelector('.modal-form');
    const saveBtn = document.querySelector('.save-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const searchInput = document.querySelector('.search-box input');
    const filterSelect = document.querySelector('.filter-select');

    // Variável para guardar o ID do aluno em edição
    let editingStudentId = null;

    // Inicializar a tabela
    renderStudentsTable(alunos);

    // Abrir modal para adicionar aluno
    addStudentBtn.addEventListener('click', () => openModal('Adicionar Aluno'));

    // Fechar modal
    cancelBtn.addEventListener('click', closeModal);
    document.querySelector('.close-btn').addEventListener('click', closeModal);

    // Salvar aluno (adicionar/editar)
    saveBtn.addEventListener('click', saveStudent);

    // Pesquisa e filtro
    searchInput.addEventListener('input', filterStudents);
    filterSelect.addEventListener('change', filterStudents);

    /**
     * Renderiza a tabela de alunos
     * @param {Array} students - Lista de alunos
     */
    function renderStudentsTable(students) {
        studentsTableBody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.nome}</td>
                <td>${student.numero}</td>
                <td>${student.turma}</td>
                <td>${student.curso}</td>
                <td>${student.contacto}</td>
                <td>${student.email}</td>
                <td>${student.nota}</td>
                <td class="action-buttons">
                    <button class="edit-btn" data-id="${student.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${student.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            studentsTableBody.appendChild(row);
        });

        // Adicionar eventos aos botões de ação
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const studentId = parseInt(e.currentTarget.getAttribute('data-id'));
                editStudent(studentId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const studentId = parseInt(e.currentTarget.getAttribute('data-id'));
                deleteStudent(studentId);
            });
        });
    }

    /**
     * Abre o modal para adicionar/editar aluno
     * @param {string} title - Título do modal
     * @param {Object} student - Dados do aluno (opcional, para edição)
     */
    function openModal(title, student = null) {
        modalTitle.textContent = title;
        modalOverlay.classList.add('active');

        if (student) {
            // Preencher formulário com dados do aluno
            editingStudentId = student.id;
            modalForm.elements['nome'].value = student.nome;
            modalForm.elements['numero'].value = student.numero;
            modalForm.elements['turma'].value = student.turma;
            modalForm.elements['curso'].value = student.curso;
            modalForm.elements['contacto'].value = student.contacto;
            modalForm.elements['email'].value = student.email;
             modalForm.elements['nota'].value = student.nota;
        } else {
            // Limpar formulário
            editingStudentId = null;
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
     * Guarda o aluno (adicionar ou editar)
     */
    function saveStudent() {
        const formData = {
            nome: modalForm.elements['nome'].value.trim(),
            numero: modalForm.elements['numero'].value.trim(),
            turma: modalForm.elements['turma'].value.trim(),
            curso: modalForm.elements['curso'].value.trim(),
            contacto: modalForm.elements['contacto'].value.trim(),
            email: modalForm.elements['email'].value.trim()
          
        };

        // Validação básica
        if (!formData.nome || !formData.numero || !formData.turma) {
            showMessage('Por favor, preencha todos os campos obrigatórios!', 'error');
            return;
        }

        if (editingStudentId !== null) {
            // Editar aluno existente
            const index = alunos.findIndex(s => s.id === editingStudentId);
            alunos[index] = { ...alunos[index], ...formData };
            showMessage('Aluno atualizado com sucesso!', 'success');
        } else {
            // Adicionar novo aluno
            const newStudent = {
                id: alunos.length > 0 ? Math.max(...alunos.map(s => s.id)) + 1 : 1,
                ...formData
            };
            alunos.push(newStudent);
            showMessage('Aluno adicionado com sucesso!', 'success');
        }

        renderStudentsTable(alunos);
        closeModal();
    }

    /**
     * Edita um aluno
     * @param {number} studentId - ID do aluno
     */
    function editStudent(studentId) {
        const student = alunos.find(s => s.id === studentId);
        if (student) {
            openModal('Editar Aluno', student);
        }
    }

    /**
     * Apaga um aluno
     * @param {number} studentId - ID do aluno
     */
    function deleteStudent(studentId) {
        if (confirm('Tem a certeza que deseja apagar este aluno?')) {
            alunos = alunos.filter(s => s.id !== studentId);
            showMessage('Aluno apagado com sucesso!', 'success');
            renderStudentsTable(alunos);
        }
    }

    /**
     * Filtra alunos com base na pesquisa e filtro
     */
    function filterStudents() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        let filteredStudents = alunos;

        if (searchTerm) {
            filteredStudents = filteredStudents.filter(student =>
                student.nome.toLowerCase().includes(searchTerm) ||
                student.numero.toLowerCase().includes(searchTerm) ||
                student.turma.toLowerCase().includes(searchTerm) ||
                student.curso.toLowerCase().includes(searchTerm)
            );
        }

        if (filterValue) {
            filteredStudents = filteredStudents.filter(student =>
                student.curso.toLowerCase() === filterValue.toLowerCase()
            );
        }

        renderStudentsTable(filteredStudents);
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
