/**
 * Login Page - Script
 * - Gerencia o processo de login, validação e redirecionamento
 */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const button = loginForm.querySelector('button[type="submit"]');

    // Simulação de credenciais (em projeto real, usar backend)
    const validCredentials = {
        'admin': { password: 'admin123', redirect: 'dashboard.html' },
        'aluno': { password: 'aluno123', redirect: 'aluno.html' },
        'professor': { password: 'prof123', redirect: 'professor.html' }
    };

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Limpar mensagens anteriores
        const oldMessage = loginForm.querySelector('.message');
        if (oldMessage) oldMessage.remove();

        const username = this.querySelector('input[type="text"]').value.trim();
        const password = this.querySelector('input[type="password"]').value.trim();
        const userType = this.querySelector('select').value;

        // Validação básica
        if (!username || !password || !userType) {
            showMessage('Por favor, preencha todos os campos!', 'error');
            return;
        }

        // Simular loading
        button.classList.add('loading');
        button.disabled = true;

        // Simular verificação de credenciais (substituir por chamada API real)
        setTimeout(function() {
            // Verificar credenciais (simulação)
            if (validCredentials[userType] && password === validCredentials[userType].password) {
                // Guardar dados do utilizador (simulação)
                localStorage.setItem('userName', username);
                localStorage.setItem('userType', userType);

                // Redirecionar
                showMessage('Login efetuado com sucesso! Redirecionando...', 'success');
                setTimeout(() => {
                    window.location.href = validCredentials[userType].redirect;
                }, 1000);
            } else {
                showMessage('Credenciais inválidas. Tente novamente.', 'error');
                button.classList.remove('loading');
                button.disabled = false;
            }
        }, 1500); // Simular atraso de rede
    });

    /**
     * Mostra mensagem de feedback
     * @param {string} text - Texto da mensagem
     * @param {string} type - Tipo de mensagem (error/success)
     */
    function showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        loginForm.appendChild(message);
        message.style.display = 'block';

        // Remover mensagem após 5 segundos
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 300);
        }, 5000);
    }
});
