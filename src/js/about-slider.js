import Swiper from 'swiper'; // Основной импорт
import {Navigation, Pagination, Scrollbar} from 'swiper/modules';
import 'swiper/css'; // Подключение стилей
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export function aboutSlider() {
    const swiper = new Swiper('.about-slider', {
        modules: [Navigation, Pagination, Scrollbar],
        loop: true,
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 12,
        scrollbar: {
            el: '.about-slider__scrollbar',
            draggable: true,
            snapOnRelease: true,
        },
        on: {
            init: function () {
                updateSlideNumbers(this);
            },

            slideChange: function () {
                updateProgressBar(this);
                updateSlideNumbers(this);
            },
            progress: function () {
                updateProgressBar(this);
                updateSlideNumbers(this);
            },
        },
        pagination: {
            el: '.about-slider__pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.about-slider__button-next',
            prevEl: '.about-slider__button-prev',
        },
        effect: 'slide',
    });
    function updateProgressBar(swiper) {

        const currentSlideIndex = swiper.realIndex;

        const totalSlides = swiper.slides.length;
        const progress = (currentSlideIndex + 1) / totalSlides;

        const scrollbarEl = document.querySelector('.about-slider__custom-scrollbar');
        if (scrollbarEl) {
            scrollbarEl.style.width = `${progress * 100}%`;
        }
    }

    function updateSlideNumbers(swiper) {
        const currentSlideEl = document.querySelector('.about-slider__current-slide');
        const totalSlidesEl = document.querySelector('.about-slider__total-slides');

        if (currentSlideEl && totalSlidesEl) {
            currentSlideEl.textContent = `0${swiper.realIndex + 1}`;
            totalSlidesEl.textContent = `0${swiper.slides.length}`;
        } else {
            console.warn('Элементы .swiper-current-slide или .swiper-total-slides не найдены в DOM.');
        }
    }

}