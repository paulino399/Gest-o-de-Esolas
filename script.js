// Feedback Widget
document.querySelector('.feedback-widget').addEventListener('click', function() {
    alert('Obrigado pelo seu feedback!');
});

// Search Functionality
document.querySelector('.search-box button').addEventListener('click', function(e) {
    e.preventDefault();
    const searchTerm = document.querySelector('.search-box input').value;
    if (searchTerm.trim()) {
        alert('A pesquisar por: ' + searchTerm);
        // Aqui podes implementar a lógica de pesquisa real
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.news-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    prevBtn.addEventListener('click', function() {
        slider.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', function() {
        slider.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const button = loginForm.querySelector('button');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simular loading
        button.classList.add('loading');
        button.disabled = true;

        // Simular verificação de credenciais (substituir pela lógica real)
        setTimeout(function() {
            const userType = loginForm.querySelector('select').value;
            const username = loginForm.querySelector('input[type="text"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            // Aqui podes adicionar a lógica real de autenticação
            // Exemplo: if (username === "admin" && password === "123") { ... }

            // Para demo, sempre redireciona
            if (userType) {
                // Redirecionar conforme o tipo de utilizador
                let redirectPage = 'dashboard.html';
                if (userType === 'aluno') {
                    redirectPage = 'aluno.html';
                } else if (userType === 'professor') {
                    redirectPage = 'professor.html';
                }

                // Mostrar mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'message success';
                successMessage.textContent = 'Login efetuado com sucesso! Redirecionando...';
                loginForm.appendChild(successMessage);
                successMessage.style.display = 'block';

                // Redirecionar após 1 segundo
                setTimeout(function() {
                    window.location.href = redirectPage;
                }, 1000);
            } else {
                // Mostrar mensagem de erro
                const errorMessage = document.createElement('div');
                errorMessage.className = 'message error';
                errorMessage.textContent = 'Por favor, preencha todos os campos!';
                loginForm.appendChild(errorMessage);
                errorMessage.style.display = 'block';
                button.classList.remove('loading');
                button.disabled = false;
            }
        }, 1500); // Simular atraso de rede
    });
});


// Função para simular o nome do utilizador (substituir pela lógica real)
document.addEventListener('DOMContentLoaded', function() {
    // Simular nome do utilizador (em um projeto real, viria da sessão)
    const userName = localStorage.getItem('userName') || "[Nome do Utilizador]";
    document.getElementById('userName').textContent = userName;

    // Logout
    document.querySelector('.logout').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Tem certeza que deseja sair?')) {
            // Limpar dados da sessão (em um projeto real)
            localStorage.removeItem('userName');
            localStorage.removeItem('userType');
            window.location.href = 'index.html';
        }
    });

    // Destaque do link ativo
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Efeito de loading nos cards (opcional)
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        });
    });
});
