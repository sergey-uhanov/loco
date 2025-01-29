import {initNewsSlider} from "./utils/news-slider.js";
import {newsSelect} from "./utils/news-select.js";
import {smallSlider} from "./utils/small-slider.js";


document.addEventListener('DOMContentLoaded', () => {
    initNewsSlider()
    newsSelect()
    smallSlider()
});
