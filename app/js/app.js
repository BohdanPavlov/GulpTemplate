$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').toggleClass('active');
	});
	const swiper = new Swiper('.main-slider', {
		loop: true,

		autoplay: {
			delay: 3000,
		},

		pagination: {
			el: '.slider-pagination',
		},

		navigation: {
			nextEl: '.slider__next',
			prevEl: '.slider__prev',
		},

	});

	$(".projects__tabs").tabs();

	const playButton = $("#video__play");
	const content = $('.video__content');

	playButton.on("click", function () {
		if (video.paused == true) {
			video.play();
			content.addClass('hidden');
		} else {
			video.pause();
			content.removeClass('hidden');
		}
	});
});