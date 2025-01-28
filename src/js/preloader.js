import {disablePageScroll, enablePageScroll} from '@fluejs/noscroll';


const preloaderNum = document.querySelector('.preloader__number');
const preloader = document.querySelector('.preloader');

let progress = 0;

disablePageScroll();

const interval = setInterval(() => {
    progress += 1;
    preloaderNum.textContent = ` ${progress}%`;

    if (progress === 100) {
        clearInterval(interval);
    }
}, 50);


window.addEventListener('load', () => {
    clearInterval(interval);
    preloaderNum.textContent = 'LIGHT';

    setTimeout(() => {
        preloader.style.display = 'none';
        enablePageScroll();
    }, 1000);
});
