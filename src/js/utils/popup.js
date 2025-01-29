import {lockScroll, unlockScroll} from "./scroll-lock.js";

export function initPopup() {
    const openPopupButtons = document.querySelectorAll('.openPopup');
    const closePopup = document.getElementById('closePopup');
    const popup = document.getElementById('popup');

    const againRequestButton = document.querySelector('.success-message__button')
    const popupContainer = document.querySelector('.popup__content ');


    openPopupButtons.forEach((button) => {
        button.addEventListener('click', () => {
            popupContainer.classList.remove('popup__content_close');
            popup.classList.toggle('open');
            popupContainer.classList.add('popup__content_open');
            lockScroll();
        });
    });


    closePopup.addEventListener('click', () => {
        popupContainer.classList.remove('popup__content_open');
        popupContainer.classList.add('popup__content_close');

        unlockScroll();
        resetStatePopup()
    });
    popupContainer.addEventListener('animationend', (e) => {
        if (e.animationName === 'slit-in-vertical2') {
            popup.classList.remove('open');

        }
    })


    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popupContainer.classList.remove('popup__content_open');

            popupContainer.classList.add('popup__content_close');
            unlockScroll();
            resetStatePopup()
        }

    });


    window.addEventListener('click', (event) => {
        if (event.target === againRequestButton) {
            resetStatePopup()
        }
    })

    document.getElementById('file-upload__input').addEventListener('change', function (event) {

        const fileInput = event.target;
        const fileName = fileInput.files[0]
        const fileTextElement = document.querySelector('.file-upload__text');


        if (fileInput.files[0]) {
            return fileTextElement.innerHTML = `File selected: <strong>${fileName}</strong>`;

        }

        fileTextElement.innerHTML = `Attach your file <span>File size not more than 10 MB</span>`;

    });
}


function resetStatePopup() {
    const form = document.querySelector('.popup-form');
    document.querySelector('.popup__content').classList.remove('popup__content_hidden');
    document.querySelector('.success-message').classList.add('success-message_hidden');
    clearForm(form)
}

function clearForm(formElement) {
    if (!formElement || !(formElement instanceof HTMLFormElement)) {
        console.warn('Передан неверный элемент формы');
        return;
    }


    formElement.reset();


    const selectValueElement = document.querySelector('#selectValue');
    if (selectValueElement) {
        selectValueElement.textContent = 'Property type'; // Устанавливаем значение по умолчанию
    }


    const errorElements = formElement.querySelectorAll('[data-js-form-field-errors]');
    errorElements.forEach((errorElement) => {
        errorElement.innerHTML = '';
    });


    const inputFields = formElement.querySelectorAll('[aria-invalid="true"]');
    inputFields.forEach((field) => {
        field.removeAttribute('aria-invalid');
    });


}
