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
