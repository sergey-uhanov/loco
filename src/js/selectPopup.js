export function popupSelect  (){
    const select = document.querySelector('.custom-select');
    const button = select.querySelector('.custom-select__button');
    const dropdown = select.querySelector('.custom-select__dropdown');
    const items = select.querySelectorAll('.custom-select__item');
    const label = select.querySelector('.custom-select__label');
    // Открыть/закрыть dropdown
    button.addEventListener('click', () => {
        select.classList.toggle('custom-select--open');
    });

    // Выбор элемента
    items.forEach(item => {
        item.addEventListener('click', () => {
            label.textContent = item.textContent;
            select.classList.remove('custom-select--open');
        });
    });

    // Закрыть dropdown при клике вне
    document.addEventListener('click', (e) => {
        if (!select.contains(e.target)) {
            select.classList.remove('custom-select--open');
        }

    });
}
