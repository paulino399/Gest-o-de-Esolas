/**
 * Portal de Acolhimento - Script
 * - Gerencia o slider de notícias, feedback e pesquisa
 */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Slider de Notícias
    const slider = document.querySelector('.news-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slider && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -320, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }

    // 2. Feedback Widget
    const feedbackWidget = document.querySelector('.feedback-widget');
    if (feedbackWidget) {
        feedbackWidget.addEventListener('click', () => {
            alert('Obrigado pelo seu feedback! Em breve teremos um formulário aqui.');
            // Futuramente: abrir modal de feedback
        });
    }

    // 3. Pesquisa
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = e.target.querySelector('input').value;
            if (searchTerm.trim()) {
                alert(`A pesquisar por: ${searchTerm}`);
                // Futuramente: implementar lógica de pesquisa real
            }
        });
    }

    // 4. Filtros de Pesquisa
    const searchFilters = document.querySelectorAll('.search-filters span');
    searchFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            searchFilters.forEach(f => f.style.color = '');
            filter.style.color = 'var(--secondary-color)';
        });
    });
});
