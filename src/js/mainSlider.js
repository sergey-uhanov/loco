import Swiper from 'swiper'; // Основной импорт
import {Navigation, Pagination, Autoplay, Scrollbar} from 'swiper/modules';
import 'swiper/css'; // Подключение стилей
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// Функция инициализации Swiper
export function initSwiper() {
    const swiper = new Swiper('.main-swiper', {
        modules: [Navigation, Pagination, Scrollbar],
        direction: 'horizontal',
        loop: false,
        slidesPerView: "auto",
        lidesPerView: 'auto',
        spaceBetween: 0,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        scrollbar: {
            el: '.main-swiper__scrollbar',
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
            el: '.main-swiper__pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.main-swiper__button-next',
            prevEl: '.main-swiper__button-prev',
        },
        effect: 'slide', // Плавный переход между слайдами
    });
}

function updateProgressBar(swiper) {
    const progress = swiper.progress; // Текущее состояние прогресса (от 0 до 1)
    const scrollbarEl = document.querySelector('.main-swiper__custom-scrollbar');
    if (scrollbarEl) {
        scrollbarEl.style.width = `${progress * 100}%`;
    }
}

function updateSlideNumbers(swiper) {
    const currentSlideEl = document.querySelector('.main-swiper__current-slide');
    const totalSlidesEl = document.querySelector('.main-swiper__total-slides');

    if (currentSlideEl && totalSlidesEl) {
        currentSlideEl.textContent = `0${swiper.realIndex + 1}`;
        totalSlidesEl.textContent = `0${swiper.slides.length}`;
    } else {
        console.warn('Элементы .swiper-current-slide или .swiper-total-slides не найдены в DOM.');
    }
}