export function setActiveMenu(selector) {
    const currentUrl = window.location.pathname; // Получаем текущий путь
    const menuItems = document.querySelectorAll(`${selector} a`); // Ищем ссылки по селектору

    menuItems.forEach(link => {
        if (link.getAttribute('href') === currentUrl) {
            link.parentElement.classList.add('menu-burger__item_active'); // Добавляем класс
        }
    });
    console.log("pojgvbpojbpojpOJvbp;")
}
console.log("pojgvbpojbpojpOJvbp;")