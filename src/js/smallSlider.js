import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function smallSlider(){
    const swiper = new Swiper('.small-slider', {
        modules: [Navigation, Pagination],
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 0,
    });
}