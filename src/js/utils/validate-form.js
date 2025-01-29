export function formsValidation() {
    const selectors = {
        form: '[data-js-form]',
        fieldErrors: '[data-js-form-field-errors]',
        selectValue: '#selectValue',
        selectError: '#place-errors',
    };

    const errorMessages = {
        valueMissing: () => 'Please fill in this field',
        patternMismatch: ({title}) => title || 'Data does not match format',
        tooShort: ({minLength}) => `Value too short, minimum characters — ${minLength}`,
        tooLong: ({maxLength}) => `Value too long, character limit — ${maxLength}`,
    };


    function manageErrors(fieldControlElement, errorMessages) {
        const fieldErrorsElement = fieldControlElement.parentElement.querySelector(selectors.fieldErrors);
        if (!fieldErrorsElement) {
            console.warn('Элемент для отображения ошибок не найден', fieldControlElement);
            return;
        }
        fieldErrorsElement.innerHTML = errorMessages
            .map((message) => `<span class="field__error">${message}</span>`)
            .join('');
    }


    function validateField(fieldControlElement) {
        const errors = fieldControlElement.validity;
        const messages = [];

        Object.entries(errorMessages).forEach(([errorType, getErrorMessage]) => {
            if (errors[errorType]) {
                messages.push(getErrorMessage(fieldControlElement));
            }
        });

        manageErrors(fieldControlElement, messages);

        const isValid = messages.length === 0;
        fieldControlElement.setAttribute('aria-invalid', !isValid);

        return isValid;
    }


    function validateCustomSelect() {
        const selectValueElement = document.querySelector(selectors.selectValue);
        const selectErrorElement = document.querySelector(selectors.selectError);

        if (selectValueElement.textContent === 'Property type') {
            selectErrorElement.innerHTML = `<span class="field__error">${'Please select a value'}</span>`;
            return false;
        }

        selectErrorElement.textContent = '';
        return true;
    }


    function onBlur(event) {
        const {target} = event;

        const isFormField = target.closest(selectors.form);
        const isRequired = target.required;

        if (isFormField && isRequired) {
            validateField(target);
        }

        if (target.id === 'buttonSelectValue') {
            validateCustomSelect();
        }
    }


    function onChange(event) {
        const {target} = event;
        const isRequired = target.required;
        const isToggleType = ['radio', 'checkbox'].includes(target.type);

        if (isToggleType && isRequired) {
            validateField(target);
        }
    }


    function onSubmit(event) {
        const isFormElement = event.target.matches(selectors.form);

        if (!isFormElement) {
            return;
        }

        const isCustomSelectValid = validateCustomSelect();
        const requiredControlElements = [...event.target.elements].filter(({required}) => required);
        let isFormValid = true;
        let firstInvalidFieldControl = null;

        requiredControlElements.forEach((element) => {
            const isFieldValid = validateField(element);

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
                document.querySelector(selectors.selectValue).focus();
            } else {
                firstInvalidFieldControl.focus();
            }
            return;
        }

        event.preventDefault();

        const popup = document.querySelector('.popup__content');
        const submitButton = popup.querySelector('button[type="submit"]');
        submitButton.innerText = 'Loading...';
        submitButton.disabled = true;
        submitButton.style.background = '#8187a6';
        submitButton.style.width = '181px';

        setTimeout(() => {
            popup.classList.toggle('popup__content_hiden');
            submitButton.innerText = 'Send Request';
            submitButton.disabled = false;
            submitButton.style.background = '#3a3e4b';
            document.querySelector('.popup__content').classList.add('popup__content_hidden');
            document.querySelector('.success-message').classList.remove('success-message_hidden');

            clearForm(event.target);
        }, 3000);
    }


    function clearForm(formElement) {
        if (!formElement || !(formElement instanceof HTMLFormElement)) {
            console.warn('Передан неверный элемент формы');
            return;
        }

        formElement.reset();

        const selectValueElement = document.querySelector(selectors.selectValue);
        if (selectValueElement) {
            selectValueElement.textContent = 'Property type'; // Устанавливаем значение по умолчанию
        }

        const errorElements = formElement.querySelectorAll(selectors.fieldErrors);
        errorElements.forEach((errorElement) => {
            errorElement.innerHTML = '';
        });

        const inputFields = formElement.querySelectorAll('[aria-invalid="true"]');
        inputFields.forEach((field) => {
            field.removeAttribute('aria-invalid');
        });
    }


    function observeSelectChange() {
        const selectValueElement = document.querySelector(selectors.selectValue);

        if (!selectValueElement) {
            console.warn('Элемент selectValue не найден');
            return;
        }

        const observer = new MutationObserver(() => {
            validateCustomSelect();
        });

        observer.observe(selectValueElement, {
            characterData: true,
            childList: true,
            subtree: true,
        });
    }


    function bindEvents() {
        document.addEventListener('blur', onBlur, {capture: true});
        document.addEventListener('change', onChange);
        document.addEventListener('submit', onSubmit);
    }


    observeSelectChange();
    bindEvents();
}


