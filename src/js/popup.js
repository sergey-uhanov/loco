export function initPopup() {
    const openPopupButtons = document.querySelectorAll('.openPopup');
    const closePopup = document.getElementById('closePopup');
    const popup = document.getElementById('popup');
    const rightSideElement = document.querySelectorAll('.right-element');
    const vw = document.documentElement.clientWidth / 100;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Открытие popup
    openPopupButtons.forEach((button) => {
        button.addEventListener('click', () => {
            popup.classList.toggle('open');
            lockScroll();
        });
    });

    // Закрытие popup
    closePopup.addEventListener('click', () => {
        popup.classList.toggle('open');
        unlockScroll();
    });

    // Закрытие при клике вне области popup
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.toggle('open');
            unlockScroll();
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
            window.scroll({ top: this.scrollPosition });
            document.documentElement.style.scrollBehavior = '';
        },
    };

    // Блокировка скролла
    function lockScroll() {

        scrollController.disabledScroll();
        document.body.style.paddingRight = `${scrollBarWidth}px`;
        rightSideElement.forEach((element) => {
            const currentRight = parseInt(getComputedStyle(element).right, 10) || 0;
            element.style.right = `${currentRight + scrollBarWidth }px `;


        });
    }

    // Разблокировка скролла
    function unlockScroll() {

        scrollController.enabledScroll();
        document.body.style.paddingRight = '';
        rightSideElement.forEach((element) => {
            const currentRight = parseInt(getComputedStyle(element).right, 10) || 0;
            element.style.right = `${currentRight - scrollBarWidth }px `;

        });
    }
}
