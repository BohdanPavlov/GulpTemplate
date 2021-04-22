$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').toggleClass('active');
	});
	const swiper = new Swiper('.main-slider', {
		loop: true,

		pagination: {
			el: '.slider-pagination',
		},

		navigation: {
			nextEl: '.slider__next',
			prevEl: '.slider__prev',
		},
	});
})