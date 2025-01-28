export function projects() {
    const filterButtons = document.querySelectorAll('.projects__filter-button');
    const postersSections = document.querySelectorAll('.posters-section__posters-wrapper');


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


    document.addEventListener('DOMContentLoaded', () => {
        filterPosters('house');
    });


    filterButtons.forEach(button => {

        button.addEventListener('click', (event) => {

            filterButtons.forEach(btn => btn.classList.remove('projects__filter-button-active'));


            const clickedButton = event.target.closest('.projects__filter-button');
            if (!clickedButton) return;

            clickedButton.classList.add('projects__filter-button-active');


            const filter = button.getAttribute('data-filter');
            filterPosters(filter);
        });
    });
}
