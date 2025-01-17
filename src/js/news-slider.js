import Swiper from 'swiper'; // Основной импорт
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';

export function initNewsSlider() {
    const newsSwiper = new Swiper('.news-swiper', {
        modules: [Navigation, Pagination],
        direction: 'horizontal',
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 0,
        grabCursor: true,
        navigation: {
            nextEl: '.news-swiper__button-next',
            prevEl: '.news-swiper__button-prev',
        },
        on: {
            init: function () {
                initSlideNumbers(this);
                totalValueSlides(this)
            },
            slideChange: function () {
                updateVisibleSlideNumbers(this);
                totalValueSlides(this)
            },

        },
    });
    const filterButtons = document.querySelectorAll('.filter-button');
    const filterButtonsPc = document.querySelectorAll('.news-slider-section__filter-button');

    const slides = document.querySelectorAll('.swiper-slide');

    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {

            filterButtons.forEach(btn => btn.classList.remove('news-slider-section__filter-button-active'));

            const clickedButton = event.target.closest('.filter-button');
            if (!clickedButton) return;

            // Добавляем класс 'active' на текущую кнопку

            clickedButton.classList.add('news-slider-section__filter-button-active');

            const filter = button.getAttribute('data-filter');

            // Убираем старые слайды
            const swiperWrapper = document.querySelector('.swiper-wrapper');
            swiperWrapper.innerHTML = '';

            // Добавляем только подходящие под фильтр
            const filteredSlides = Array.from(slides).filter(slide =>
                filter === 'all' || slide.getAttribute('data-topic') === filter
            );
            filteredSlides.forEach(slide => swiperWrapper.appendChild(slide));

            // Перезапуск Swiper
            newsSwiper.update();
            newsSwiper.slideTo(0); // Переходим на первый слайд
            totalValueSlides(newsSwiper);
        });
    });

}

function totalValueSlides(swiper){
    const totalSlidesEl = document.querySelector('.news-swiper__total-slides');
    const isEndNear = swiper.activeIndex <= swiper.slides.length - 3

    if(swiper.slides.length < 4 ) {
        totalSlidesEl.textContent = ''
        return
    }

    if (totalSlidesEl && isEndNear) {
        swiper.slides.length > 9
            ? totalSlidesEl.textContent = `${swiper.slides.length}`
    : totalSlidesEl.textContent = `0${swiper.slides.length}`;
    }else {
        totalSlidesEl.textContent = ''
    }

}

function initSlideNumbers(swiper) {
    const paginationEl = document.querySelector('.news-swiper__pagination');

    if (paginationEl) {
        renderPagination(swiper, paginationEl);
    } else {
        console.warn('.news-swiper__pagination не найден в DOM.');
    }
}

function renderPagination(swiper, paginationEl) {
    const currentSlide = swiper.activeIndex + 1;
    const totalSlides = swiper.slides.length;

    // Вычисляем диапазон отображаемых слайдов
    const visibleSlides = calculateVisibleSlides(currentSlide, totalSlides);

    // Обновляем HTML пагинации
    paginationEl.innerHTML = visibleSlides
        .map((slideNumber) => {
            const formattedNumber = slideNumber.toString().padStart(2, '0');
            return `<span class="news-swiper__pagination-item ${
                slideNumber === currentSlide ? 'active' : ''
            }">${formattedNumber}</span>`;
        })
        .join(' ');

    // Добавляем многоточия, если нужно
    if (visibleSlides[0] > 1) {
        paginationEl.innerHTML = `... ${paginationEl.innerHTML}`;
    }
    if (visibleSlides[visibleSlides.length - 1] < totalSlides) {
        paginationEl.innerHTML += ' ...';
    }
}

function calculateVisibleSlides(current, total) {
    if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);

    if (current === 1) return [1, 2, 3];
    if (current === total) return [total - 2, total - 1, total];

    return [current - 1, current, current + 1];
}

function updateVisibleSlideNumbers(swiper) {
    const paginationEl = document.querySelector('.news-swiper__pagination');
    if (paginationEl) {
        renderPagination(swiper, paginationEl);
    }
}
