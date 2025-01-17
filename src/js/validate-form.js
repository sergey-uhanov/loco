export class FormsValidation {

    selectors = {
        form: '[data-js-form]',
        fieldErrors: '[data-js-form-field-errors]',
        selectValue: '#selectValue',
        selectError: '#place-errors',
    }

    errorMessages = {
        valueMissing: () => 'Please fill in this field',
        patternMismatch: ({ title }) => title || 'Data does not match the email format',
        tooShort: ({ minLength }) => `Value too short, minimum characters — ${minLength}`,
        tooLong: ({ maxLength }) => `Value too long, character limit — ${maxLength}`,
    }

    constructor() {
        this.observeSelectChange();
        this.bindEvents();
    }

    manageErrors(fieldControlElement, errorMessages) {
        const fieldErrorsElement = fieldControlElement.parentElement.querySelector(this.selectors.fieldErrors);
        if (!fieldErrorsElement) {
            console.warn('Элемент для отображения ошибок не найден', fieldControlElement);
            return;
        }
        fieldErrorsElement.innerHTML = errorMessages
            .map((message) => `<span class="field__error">${message}</span>`)
            .join('');
    }

    validateField(fieldControlElement) {
        const errors = fieldControlElement.validity;
        const errorMessages = [];

        Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
            if (errors[errorType]) {
                errorMessages.push(getErrorMessage(fieldControlElement));
            }
        });

        this.manageErrors(fieldControlElement, errorMessages);

        const isValid = errorMessages.length === 0;

        fieldControlElement.ariaInvalid = !isValid;

        return isValid;
    }

    validateCustomSelect() {
        const selectValueElement = document.querySelector(this.selectors.selectValue);
        const selectErrorElement = document.querySelector(this.selectors.selectError);

        if (selectValueElement.textContent === 'Property type') {
            selectErrorElement.innerHTML = `<span class="field__error">${'Please select a value'}</span>`;
            return false;
        }

        selectErrorElement.textContent = '';
        return true;
    }

    onBlur(event) {
        const { target } = event;

        const isFormField = target.closest(this.selectors.form);
        const isRequired = target.required;
        if (isFormField && isRequired) {
            this.validateField(target);
        }

        if (target.id === 'buttonSelectValue') {
            this.validateCustomSelect();
        }
    }

    onChange(event) {
        const { target } = event;
        const isRequired = target.required;
        const isToggleType = ['radio', 'checkbox'].includes(target.type);

        if (isToggleType && isRequired) {
            this.validateField(target);
        }
    }

    onSubmit(event) {

        const isFormElement = event.target.matches(this.selectors.form);

        if (!isFormElement) {
            return;
        }

        const isCustomSelectValid = this.validateCustomSelect();
        const requiredControlElements = [...event.target.elements].filter(({ required }) => required);
        let isFormValid = true;
        let firstInvalidFieldControl = null;

        requiredControlElements.forEach((element) => {
            const isFieldValid = this.validateField(element);

            if (!isFieldValid) {
                isFormValid = false;

                if (!firstInvalidFieldControl) {
                    firstInvalidFieldControl = element;
                }
            }
        });

        if (!isFormValid || !isCustomSelectValid) {
            event.preventDefault();

            if (!firstInvalidFieldControl) {
                document.querySelector(this.selectors.selectValue).focus();
            } else {
                firstInvalidFieldControl.focus();
            }
            return;
        }

        // Если валидация пройдена
        event.preventDefault(); // Предотвращаем стандартную отправку формы




        const popup = document.querySelector('.popup__content');
        const submitButton = popup.querySelector('button[type="submit"]');
        submitButton.innerText = 'Loading...';
        submitButton.disabled = true;
        submitButton.style.background='#8187a6'
        submitButton.style.width='181px'
        setTimeout(()=>{
            popup.classList.toggle('popup__content_hiden');
            submitButton.innerText = 'Send Request';
            submitButton.disabled = false;
            submitButton.style.background='#3a3e4b'
            document.querySelector('.popup__content').classList.add('popup__content_hidden');
            document.querySelector('.success-message').classList.remove('success-message_hidden');

            this.clearForm(event.target);

        },3000)


        // // Сбор данных формы
        // const formData = new FormData(event.target);
        //
        // // Пример добавления значения из кастомного select
        // const selectValueElement = document.querySelector(this.selectors.selectValue);
        // if (selectValueElement) {
        //     formData.append('selectValue', selectValueElement.textContent);
        // }
        //
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        // // Отправка данных на сервер
        // fetch('/example-endpoint', {
        //     method: 'POST',
        //     body: formData,
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error('Ошибка при отправке формы');
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log('Успех:', data);
        //         // Здесь можно добавить действия после успешной отправки
        //     })
        //     .catch((error) => {
        //         console.error('Ошибка:', error);
        //         // Обработка ошибок
        //     });


    }

    clearForm(formElement) {
        if (!formElement || !(formElement instanceof HTMLFormElement)) {
            console.warn('Передан неверный элемент формы');
            return;
        }

        // Сбрасываем стандартные поля формы
        formElement.reset();

        // Очищаем кастомные поля, если они есть
        const selectValueElement = document.querySelector(this.selectors.selectValue);
        if (selectValueElement) {
            selectValueElement.textContent = 'Property type'; // Устанавливаем значение по умолчанию
        }

        // Убираем отображаемые ошибки (если есть)
        const errorElements = formElement.querySelectorAll(this.selectors.fieldErrors);
        errorElements.forEach((errorElement) => {
            errorElement.innerHTML = '';
        });

        // Обнуляем состояние aria-invalid для всех полей
        const inputFields = formElement.querySelectorAll('[aria-invalid="true"]');
        inputFields.forEach((field) => {
            field.removeAttribute('aria-invalid');
        });


    }
    observeSelectChange() {
        const selectValueElement = document.querySelector(this.selectors.selectValue);

        if (!selectValueElement) {
            console.warn('Элемент selectValue не найден');
            return;
        }

        const observer = new MutationObserver(() => {
            this.validateCustomSelect();
        });

        observer.observe(selectValueElement, {
            characterData: true,
            childList: true,
            subtree: true,
        });
    }

    bindEvents() {
        document.addEventListener('blur', (event) => this.onBlur(event), { capture: true });
        document.addEventListener('change', (event) => this.onChange(event));
        document.addEventListener('submit', (event) => this.onSubmit(event));
    }
}
