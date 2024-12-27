export const openBurger = () => {
	const containerMenuBurger = document.querySelector('.menu-burger');
	const burgerButton = document.querySelector('.icon-menu');

	burgerButton.addEventListener('click', () => {
		containerMenuBurger.classList.toggle('menu-burger_hidden');
		burgerButton.classList.toggle('icon-menu_open');
	});
	console.log("pojgvbpojbpojpOJvbp;")
};

