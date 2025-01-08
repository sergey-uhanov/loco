export const openBurger = () => {
	const containerMenuBurger = document.querySelector('.menu-burger');
	const burgerButton = document.querySelector('.icon-menu');
	const header = document.querySelector('.header');

	burgerButton.addEventListener('click', () => {
		containerMenuBurger.classList.toggle('menu-burger_hidden');
		burgerButton.classList.toggle('icon-menu_open');
		header.classList.remove('header_dark');

		const isOpenBurger = burgerButton.classList.contains('icon-menu_open')
		const activePage = document.location.pathname
		
		if( activePage !== '/' && !isOpenBurger) {
			header.classList.add('header_dark');
		}

	});

};

