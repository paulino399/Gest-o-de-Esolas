/**
 * Dashboard Script
 * - Gerencia o logout, nome do utilizador e interatividade dos cards
 */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Exibir nome do utilizador (simulado)
    const userName = localStorage.getItem('userName') || "Utilizador";
    const userType = localStorage.getItem('userType') || "Visitante";
    document.getElementById('userName').textContent = userName;

    // 2. Destaque do link ativo
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });

    // 3. Logout
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Tem a certeza que deseja sair?')) {
                // Limpar dados da sessão (simulado)
                localStorage.removeItem('userName');
                localStorage.removeItem('userType');
                window.location.href = 'index.html';
            }
        });
    }

    // 4. Efeito de loading nos cards (opcional)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Evitar efeito se o card for um link
            if (this.getAttribute('href')) return;

            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        });
    });

    // 5. Função para atualizar o nome do utilizador (caso necessário)
    window.updateUserName = function(name) {
        document.getElementById('userName').textContent = name;
        localStorage.setItem('userName', name);
    };
});
