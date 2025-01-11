export function projects() {
    const filterButtons = document.querySelectorAll('.projects__filter-button');
    const postersSections = document.querySelectorAll('.posters-section__posters-wrapper');

    // Функция для фильтрации и отображения секций
    const filterPosters = (filter) => {
        postersSections.forEach((section, index) => {
            const topic = section.getAttribute('data-topic');
            if ( topic === filter) {
                section.style.display = 'flex'; // Показать секцию
            } else {
                section.style.display = 'none'; // Скрыть секцию
            }
        });
    };

    // Установить фильтр по умолчанию при загрузке страницы
    document.addEventListener('DOMContentLoaded', () => {
        filterPosters('house');
    });

    // Добавить обработчики событий на кнопки
    filterButtons.forEach(button => {

        button.addEventListener('click', (event) => {
            // Удалить активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('projects__filter-button-active'));

            // Добавить активный класс к нажатой кнопке
            const clickedButton = event.target.closest('.projects__filter-button');
            if (!clickedButton) return;

            clickedButton.classList.add('projects__filter-button-active');

            // Получить значение фильтра и отфильтровать секции
            const filter = button.getAttribute('data-filter');
            filterPosters(filter);
        });
    });
}
