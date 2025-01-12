export function elevationCompensation() {
    const header = document.querySelector('.header');
    const body = document.body; // Получаем body

    if (header && body) {
        const headerHeight = header.offsetHeight;
        body.style.marginTop = `${headerHeight}px`;
    } else {
        console.warn('Header or body element not found!');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.style.backgroundColor = 'rgba(253,206,151,0.71)';

        } else {
            header.style.backgroundColor = 'transparent';

        }
    });

}