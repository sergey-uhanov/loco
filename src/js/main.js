import {openBurger} from './burger.js'
import {setActiveMenu} from "./active-page.js";
import {initSwiper} from './main-slider.js';
import {customSelect} from './select.js';
import {initPopup} from "./popup.js";
import {popupSelect} from "./select-popup.js";
import {FormsValidation} from "./validate-form.js";
import {initNewsSlider} from "./news-slider.js";
import {newsSelect} from "./news-select.js";
import {smallSlider} from "./small-slider.js";
import {elevationCompensation} from "./header.js";
import {projects} from "./projects.js";
import {aboutSlider} from "./about-slider.js";
import {preloader} from "./preloader.js";


document.addEventListener('DOMContentLoaded', () => {

    initSwiper();
    openBurger();
    setActiveMenu('.menu-burger__item');
    customSelect()
    initPopup();
    popupSelect()
    new FormsValidation()
    initNewsSlider()
    newsSelect()
    smallSlider()
    elevationCompensation()
    projects()
    aboutSlider()
    preloader()

});
