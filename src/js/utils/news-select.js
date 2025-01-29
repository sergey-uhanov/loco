export function newsSelect(){
    const dropdownToggle = document.querySelector('.custom-dropdown__toggle');
    const dropdownMenu = document.querySelector('.custom-dropdown__menu');
    const dropdownItems = document.querySelectorAll('.custom-dropdown__item');


    if(dropdownToggle) {
    dropdownToggle.addEventListener('click', () => {
        const isOpen = dropdownMenu.hasAttribute('hidden');
        dropdownMenu.toggleAttribute('hidden', !isOpen);
        dropdownToggle.setAttribute('aria-expanded', isOpen);
    });


    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            dropdownToggle.firstChild.textContent = item.textContent;
            dropdownMenu.setAttribute('hidden', true);
            dropdownToggle.setAttribute('aria-expanded', false);


            const filter = item.dataset.filter;

        });
    });


    document.addEventListener('click', (event) => {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.setAttribute('hidden', true);
            dropdownToggle.setAttribute('aria-expanded', false);
        }
    });
    }
}