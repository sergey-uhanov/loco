import {disablePageScroll, enablePageScroll} from '@fluejs/noscroll';
export function preloader(){
    const preloaderNum = document.querySelector('.preloader__number');
    const preloader = document.querySelector('.preloader');
    let progress = 0;

    disablePageScroll();

    const interval = setInterval(() => {
        progress += 1;
        preloaderNum.textContent = ` ${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            preloaderNum.textContent = 'LIGHT';
            setTimeout(() => {
                preloader.style.display = 'none';
                enablePageScroll();
            }, 1000);
        }
    }, 25);
}