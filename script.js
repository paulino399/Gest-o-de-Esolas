// Simulação de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const userType = this.querySelector('select').value;
    if (userType === 'aluno') {
        window.location.href = 'aluno.html';
    } else if (userType === 'professor') {
        window.location.href = 'professor.html';
    } else if (userType === 'admin') {
        window.location.href = 'dashboard.html';
    }
});

// Logout
document.querySelector('.logout')?.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Sessão terminada!');
    window.location.href = 'index.html';
});
