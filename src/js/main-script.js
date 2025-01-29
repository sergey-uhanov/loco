import {openBurger} from './utils/burger.js'
import {setActiveMenu} from "./utils/active-page.js";
import {initPopup} from "./utils/popup.js";
import {popupSelect} from "./utils/select-popup.js";
import {formsValidation} from "./utils/validate-form.js";
import {elevationCompensation} from "./utils/header.js";


document.addEventListener('DOMContentLoaded', () => {

    elevationCompensation()
    openBurger();
    setActiveMenu('.menu-burger__item');
    initPopup();
    popupSelect()
    formsValidation()

});
