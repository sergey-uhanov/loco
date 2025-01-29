import {openBurger} from './utils/burger.js'
import {setActiveMenu} from "./utils/active-page.js";
import {initSwiper} from './utils/main-slider.js';
import {customSelect} from './utils/select.js';
import {initPopup} from "./utils/popup.js";
import {popupSelect} from "./utils/select-popup.js";
import {initNewsSlider} from "./utils/news-slider.js";
import {newsSelect} from "./utils/news-select.js";
import {smallSlider} from "./utils/small-slider.js";
import {elevationCompensation} from "./utils/header.js";
import {projects} from "./utils/projects.js";
import {aboutSlider} from "./utils/about-slider.js";
import {formsValidation} from "./utils/validate-form.js";


document.addEventListener('DOMContentLoaded', () => {

    initSwiper();
    openBurger();
    setActiveMenu('.menu-burger__item');
    customSelect()
    initPopup();
    popupSelect()
    // new FormsValidation ()
    formsValidation();
    initNewsSlider()
    newsSelect()
    smallSlider()
    elevationCompensation()
    projects()
    aboutSlider()

});
