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



            clickedButton.classList.add('news-slider-section__filter-button-active');

            const filter = button.getAttribute('data-filter');


            const swiperWrapper = document.querySelector('.swiper-wrapper');
            swiperWrapper.innerHTML = '';


            const filteredSlides = Array.from(slides).filter(slide =>
                filter === 'all' || slide.getAttribute('data-topic') === filter
            );
            filteredSlides.forEach(slide => swiperWrapper.appendChild(slide));


            newsSwiper.update();
            newsSwiper.slideTo(0); // Переходим на первый слайд
            totalValueSlides(newsSwiper);
        });
    });

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


    const visibleSlides = calculateVisibleSlides(currentSlide, totalSlides);


    paginationEl.innerHTML = visibleSlides
        .map((slideNumber) => {
            const formattedNumber = slideNumber.toString().padStart(2, '0');
            return `<span class="news-swiper__pagination-item ${
                slideNumber === currentSlide ? 'active' : ''
            }" data-slide="${slideNumber}">${formattedNumber}</span>`;
        })
        .join(' ');


    if (visibleSlides[0] > 1) {
        paginationEl.innerHTML = `... ${paginationEl.innerHTML}`;
    }
    if (visibleSlides[visibleSlides.length - 1] < totalSlides) {
        paginationEl.innerHTML += ' ...';
    }


    addPaginationClickListeners(swiper);
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

function addPaginationClickListeners(swiper) {
    const paginationItems = document.querySelectorAll('.news-swiper__pagination-item');

    paginationItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            const targetSlide = parseInt(event.target.getAttribute('data-slide'), 10);
            if (!isNaN(targetSlide)) {
                swiper.slideTo(targetSlide - 1); // Переход на нужный слайд (индексация с 0)
            }
        });
    });
}

function totalValueSlides(swiper) {
    const totalSlidesEl = document.querySelector('.news-swiper__total-slides');
    const isEndNear = swiper.activeIndex <= swiper.slides.length - 3;

    if (swiper.slides.length < 4) {
        if (totalSlidesEl) totalSlidesEl.textContent = '';
        return;
    }

    if (totalSlidesEl && isEndNear) {
        totalSlidesEl.textContent =
            swiper.slides.length > 9
                ? `${swiper.slides.length}`
                : `0${swiper.slides.length}`;
    } else if (totalSlidesEl) {
        totalSlidesEl.textContent = '';
    }


    if (totalSlidesEl) {
        totalSlidesEl.removeEventListener('click', goToLastSlide); // Удаляем старый обработчик, чтобы избежать дублирования
        totalSlidesEl.addEventListener('click', goToLastSlide);
    }


    function goToLastSlide() {
        swiper.slideTo(swiper.slides.length - 1); // Переход на последний слайд
    }
}
