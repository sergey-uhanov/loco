
export function elevationCompensation() {
    const header = document.querySelector('.header');
    const body = document.body; // Получаем body

    if (header && body) {
        const headerHeight = header.offsetHeight;
        body.style.translateX = `-${headerHeight}px`;
    } else {
        console.warn('Header or body element not found!');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            const isHeaderBlack = header.classList.contains('header_dark')

           if (isHeaderBlack) {
               header.style.backgroundColor = 'rgba(239,239,239,0.75)';
           }else{
               header.style.backgroundColor = 'rgba(69,69,69,0.71)';
           }

        } else {
            header.style.backgroundColor = 'transparent';

        }
    });

}