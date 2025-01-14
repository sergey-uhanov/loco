import Swiper from 'swiper';
import 'swiper/css';


export function aboutSlider() {
    const swiper = new Swiper('.about-slider', {
        loop: true,
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 12,

    });
}