/**
 * Calendário Page - Script
 * - Gerencia o calendário, eventos, e ações CRUD
 */

document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo (em projeto real, viriam de uma API)
    let events = [
        { id: 1, title: "Reunião de Pais", date: "2025-11-15", description: "Reunião com os encarregados de educação", time: "15:00" },
        { id: 2, title: "Exame de Matemática", date: "2025-11-20", description: "Exame do 12º ano", time: "09:00" },
        { id: 3, title: "Feira de Ciências", date: "2025-11-25", description: "Apresentação de projetos", time: "10:00" }
    ];

    // Elementos DOM
    const calendarTitle = document.querySelector('.calendar-title');
    const calendarDays = document.querySelector('.calendar-days');
    const eventList = document.querySelector('.event-list tbody');
    const prevMonthBtn = document.querySelector('.calendar-nav button:first-child');
    const nextMonthBtn = document.querySelector('.calendar-nav button:last-child');
    const addEventBtn = document.querySelector('.add-event-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal-header h2');
    const modalForm = document.querySelector('.modal-form');
    const saveBtn = document.querySelector('.save-btn');
    const cancelBtn = document.querySelector('.cancel-btn');

    // Variáveis de controle
    let currentDate = new Date();
    let editingEventId = null;

    // Inicializar o calendário
    renderCalendar(currentDate);
    renderEventList(events);

    // Navegação entre meses
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Abrir modal para adicionar evento
    addEventBtn.addEventListener('click', () => openModal('Adicionar Evento'));

    // Fechar modal
    cancelBtn.addEventListener('click', closeModal);
    document.querySelector('.close-btn').addEventListener('click', closeModal);

    // Salvar evento (adicionar/editar)
    saveBtn.addEventListener('click', saveEvent);

    /**
     * Renderiza o calendário para um mês específico
     * @param {Date} date - Data do mês a renderizar
     */
    function renderCalendar(date) {
        // Atualizar título do calendário
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        calendarTitle.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        // Obter o primeiro e último dia do mês
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        // Obter o dia da semana do primeiro dia do mês (0 = Domingo, 6 = Sábado)
        const startingDay = firstDay.getDay();

        // Obter o número de dias no mês
        const daysInMonth = lastDay.getDate();

        // Obter o número de dias do mês anterior
        const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

        // Limpar dias anteriores
        calendarDays.innerHTML = '';

        // Adicionar dias do mês anterior
        for (let i = 0; i < startingDay; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day empty other-month';
            day.innerHTML = `<div class="calendar-day-header">${prevMonthLastDay - startingDay + i + 1}</div>`;
            calendarDays.appendChild(day);
        }

        // Adicionar dias do mês atual
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';

            if (i === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
                day.classList.add('today');
            }

            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = i;
            day.appendChild(dayHeader);

            // Adicionar eventos do dia
            const dayEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getDate() === i &&
                       eventDate.getMonth() === date.getMonth() &&
                       eventDate.getFullYear() === date.getFullYear();
            });

            if (dayEvents.length > 0) {
                const eventsContainer = document.createElement('div');
                eventsContainer.className = 'calendar-events';

                dayEvents.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'calendar-event';
                    eventElement.textContent = event.time ? `${event.time} - ${event.title}` : event.title;
                    eventElement.dataset.eventId = event.id;
                    eventElement.addEventListener('click', () => editEvent(event.id));
                    eventsContainer.appendChild(eventElement);
                });

                day.appendChild(eventsContainer);
            }

            calendarDays.appendChild(day);
        }

        // Adicionar dias do próximo mês
        const totalDays = startingDay + daysInMonth;
        const rowsNeeded = Math.ceil(totalDays / 7) * 7;
        const daysToAdd = rowsNeeded - totalDays;

        for (let i = 1; i <= daysToAdd; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day empty other-month';
            day.innerHTML = `<div class="calendar-day-header">${i}</div>`;
            calendarDays.appendChild(day);
        }
    }

    /**
     * Renderiza a lista de eventos
     * @param {Array} events - Lista de eventos
     */
    function renderEventList(events) {
        if (!eventList) return;

        eventList.innerHTML = '';

        if (events.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="3" style="text-align: center; padding: 1rem;">Nenhum evento encontrado</td>';
            eventList.appendChild(row);
            return;
        }

        // Ordenar eventos por data
        const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

        sortedEvents.forEach(event => {
            const row = document.createElement('tr');
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });

            row.innerHTML = `
                <td class="event-info">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                </td>
                <td class="event-date">${formattedDate} ${event.time ? `às ${event.time}` : ''}</td>
                <td class="event-actions">
                    <button class="event-edit-btn" data-id="${event.id}"><i class="fas fa-edit"></i></button>
                    <button class="event-delete-btn" data-id="${event.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            eventList.appendChild(row);
        });

        // Adicionar eventos aos botões
        document.querySelectorAll('.event-edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const eventId = parseInt(e.currentTarget.getAttribute('data-id'));
                editEvent(eventId);
            });
        });

        document.querySelectorAll('.event-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const eventId = parseInt(e.currentTarget.getAttribute('data-id'));
                deleteEvent(eventId);
            });
        });
    }

    /**
     * Abre o modal para adicionar/editar evento
     * @param {string} title - Título do modal
     * @param {Object} event - Dados do evento (opcional, para edição)
     */
    function openModal(title, event = null) {
        modalTitle.textContent = title;
        modalOverlay.classList.add('active');

        if (event) {
            // Preencher formulário com dados do evento
            editingEventId = event.id;
            modalForm.elements['title'].value = event.title;
            modalForm.elements['date'].value = event.date;
            modalForm.elements['time'].value = event.time || '';
            modalForm.elements['description'].value = event.description || '';
        } else {
            // Limpar formulário e definir data atual
            editingEventId = null;
            modalForm.reset();
            const today = new Date().toISOString().split('T')[0];
            modalForm.elements['date'].value = today;
        }
    }

    /**
     * Fecha o modal
     */
    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    /**
     * Guarda o evento (adicionar ou editar)
     */
    function saveEvent() {
        const formData = {
            title: modalForm.elements['title'].value.trim(),
            date: modalForm.elements['date'].value,
            time: modalForm.elements['time'].value.trim(),
            description: modalForm.elements['description'].value.trim()
        };

        // Validação básica
        if (!formData.title || !formData.date) {
            showMessage('Por favor, preencha os campos obrigatórios (Título e Data)!', 'error');
            return;
        }

        if (editingEventId !== null) {
            // Editar evento existente
            const index = events.findIndex(e => e.id === editingEventId);
            events[index] = { ...events[index], ...formData, id: editingEventId };
            showMessage('Evento atualizado com sucesso!', 'success');
        } else {
            // Adicionar novo evento
            const newEvent = {
                id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
                ...formData
            };
            events.push(newEvent);
            showMessage('Evento adicionado com sucesso!', 'success');
        }

        renderCalendar(currentDate);
        renderEventList(events);
        closeModal();
    }

    /**
     * Edita um evento
     * @param {number} eventId - ID do evento
     */
    function editEvent(eventId) {
        const event = events.find(e => e.id === eventId);
        if (event) {
            openModal('Editar Evento', event);
        }
    }

    /**
     * Apaga um evento
     * @param {number} eventId - ID do evento
     */
    function deleteEvent(eventId) {
        if (confirm('Tem a certeza que deseja apagar este evento?')) {
            events = events.filter(e => e.id !== eventId);
            showMessage('Evento apagado com sucesso!', 'success');
            renderCalendar(currentDate);
            renderEventList(events);
        }
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
