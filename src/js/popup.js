export function initPopup() {
    const openPopupButtons = document.querySelectorAll('.openPopup');
    const closePopup = document.getElementById('closePopup');
    const popup = document.getElementById('popup');
    const rightSideElement = document.querySelectorAll('.right-element');
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const againRequestButton = document.querySelector('.success-message__button')
    const popupContainer = document.querySelector('.popup__content ');
    const header = document.querySelector('.header');

    const headerHeight = header.offsetHeight;

    // Открытие popup
    openPopupButtons.forEach((button) => {
        button.addEventListener('click', () => {
            popupContainer.classList.remove('popup__content_close');
            popup.classList.toggle('open');
            popupContainer.classList.add('popup__content_open');
            lockScroll();
        });
    });

    // Закрытие popup
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


    // Закрытие при клике вне области popup
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popupContainer.classList.remove('popup__content_open');

            popupContainer.classList.add('popup__content_close');
            unlockScroll();
            resetStatePopup()
        }

    });

    const scrollController = {
        scrollPosition: 0,
        disabledScroll() {
            this.scrollPosition = window.scrollY;
            this.scrollPosition = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${this.scrollPosition}px`;
            document.body.style.left = '0';
            document.body.style.height = '100vh';
            document.body.style.width = '100vw';
            document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
            document.documentElement.style.scrollBehavior = 'unset';

        },
        enabledScroll() {
            document.body.style.cssText = '';
            window.scroll({top: this.scrollPosition});
            document.documentElement.style.scrollBehavior = '';
            document.body.style.marginTop = `${headerHeight}px`;
        },
    };


    function lockScroll() {

        scrollController.disabledScroll();
        document.body.style.paddingRight = `${scrollBarWidth}px`;
        rightSideElement.forEach((element) => {
            const currentRight = parseInt(getComputedStyle(element).right, 10) || 0;
            element.style.right = `${currentRight + scrollBarWidth}px `;


        });
    }


    function unlockScroll() {

        scrollController.enabledScroll();
        document.body.style.paddingRight = '';
        rightSideElement.forEach((element) => {
            const currentRight = parseInt(getComputedStyle(element).right, 10) || 0;
            element.style.right = `${currentRight - scrollBarWidth}px `;

        });
    }

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

    // Сбрасываем стандартные поля формы
    formElement.reset();

    // Очищаем кастомные поля, если они есть
    const selectValueElement = document.querySelector('#selectValue');
    if (selectValueElement) {
        selectValueElement.textContent = 'Property type'; // Устанавливаем значение по умолчанию
    }

    // Убираем отображаемые ошибки (если есть)
    const errorElements = formElement.querySelectorAll('[data-js-form-field-errors]');
    errorElements.forEach((errorElement) => {
        errorElement.innerHTML = '';
    });

    // Обнуляем состояние aria-invalid для всех полей
    const inputFields = formElement.querySelectorAll('[aria-invalid="true"]');
    inputFields.forEach((field) => {
        field.removeAttribute('aria-invalid');
    });


}
