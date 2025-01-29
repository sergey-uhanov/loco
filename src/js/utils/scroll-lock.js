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
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;
const rightSideElement = document.querySelectorAll('.right-element');
const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

export function lockScroll() {

    scrollController.disabledScroll();
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    rightSideElement.forEach((element) => {
        const currentRight = parseInt(getComputedStyle(element).right, 10) || 0;
        element.style.right = `${currentRight + scrollBarWidth}px `;


    });
}


export function unlockScroll() {

    scrollController.enabledScroll();
    document.body.style.paddingRight = '';
    rightSideElement.forEach((element) => {
        const currentRight = parseInt(getComputedStyle(element).right, 10) || 0;
        element.style.right = `${currentRight - scrollBarWidth}px `;

    });
}