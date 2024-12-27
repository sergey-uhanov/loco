import {openBurger} from './burger.js'
import {setActiveMenu} from "./activePage.js";
import { initSwiper } from './mainSlider.js';
import Swiper from "swiper";


document.addEventListener('DOMContentLoaded', () => {
    initSwiper();
    openBurger();
    setActiveMenu('.menu-burger__item');
});
