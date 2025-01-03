import {openBurger} from './burger.js'
import {setActiveMenu} from "./activePage.js";
import {initSwiper} from './mainSlider.js';
import {customSelect} from './select.js';
import {initPopup} from "./popup.js";


document.addEventListener('DOMContentLoaded', () => {

    initSwiper();
    openBurger();
    setActiveMenu('.menu-burger__item');
    customSelect()
    initPopup();
});
