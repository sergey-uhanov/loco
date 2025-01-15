export const customSelect = () => {
    const select = document.querySelector(".select");

    if (select) {
        const toggle = select.querySelector(".select__toggle");
        const menu = select.querySelector(".select__menu");
        const input = select.querySelector(".select__input");


        // Открытие/закрытие меню
        toggle.addEventListener("click", () => {
            const isActive = select.classList.toggle("select--active");
            toggle.setAttribute("aria-expanded", isActive);

        });

        // Выбор значения
        menu.addEventListener("click", (event) => {
            const item = event.target.closest(".select__item");
            if (item) {
                const value = item.dataset.value;
                const text = item.textContent;

                input.value = value; // Устанавливаем значение в скрытый input
                toggle.textContent = text; // Отображаем выбранное значение
                select.classList.remove("select--active"); // Закрываем меню
                toggle.setAttribute("aria-expanded", "false");
            }
        });

        // Закрытие меню при клике вне
        document.addEventListener("click", (event) => {
            if (!select.contains(event.target)) {
                select.classList.remove("select--active");
                toggle.setAttribute("aria-expanded", "false");
            }
        });

    }
}