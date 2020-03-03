// Slider

var slideshow = document.querySelector('.slideshow');
var slideshowImg = document.querySelectorAll('.slideshow_img');
var counter = 0;


slideshow.classList.add('loaded');

function slider(){
	if (counter == slideshowImg.length - 1) {
		counter = -1;
	}
	counter++;
	var activeElement = document.querySelector('.slideshow_img.active');
	activeElement.classList.remove('active');
	slideshowImg[counter].classList.add('active');
};

setInterval(slider, 5000);

// Slider Main 

var target = document.querySelector('.slider_main');
var mySlider = new SliderMain(target);

function SliderMain (target) {
	var context = this;
	var slide = target.querySelectorAll('.slide');
	var prevButton = target.querySelector('.prev_button');
	var nextButton = target.querySelector('.next_button');
	var pagination = target.querySelectorAll('.pagination div');
	var counter = 0;
	var timeout;

	function init () {
		formatHtml();
		clickEvents();
		timeout = setTimeout(context.next, 5000);
	}


	function clickEvents () {
		prevButton.addEventListener('click', function () {
			context.prev();
		});

		nextButton.addEventListener('click', function () {
			context.next();
		});

		for (var i = 0; i < pagination.length; i++) {
			pagination[i].addEventListener('click', function () {
				context.goTo(parseInt(this.getAttribute('data-id')));
			});
		}

	}

	function formatHtml () {
		var html = '<div class="pagination">';
			for (var i = 0; i < slide.length; i++) {
					html = html + '<div data-id="'+ i +'"></div>';
			}

		html = html + '</div>';
		target.innerHTML = target.innerHTML + html;

		slide = target.querySelectorAll('.slide');
		prevButton = target.querySelector('.prev_button');
		nextButton = target.querySelector('.next_button');
		pagination = target.querySelectorAll('.pagination div');
		setTimeout(function () {
			pagination[0].classList.add('active');
		},1);
	}

	function renderActiveSlide () {
		var activeElement = target.querySelector('.slide.active');
		activeElement.classList.remove('active');
		slide[counter].classList.add('active');
		var activePagination = target.querySelector('.pagination div.active');
		activePagination.classList.remove('active');
		pagination[counter].classList.add('active');
		clearTimeout(timeout);
		timeout = setTimeout(context.next, 5000);

	}

	this.next = function () {
		if (counter == slide.length - 1) {
			counter = -1;
		}
		counter++;
		renderActiveSlide();
	}

	this.prev = function () {
		if (counter == 0) {
			counter = slide.length;
		}
		counter--;
		renderActiveSlide();
	}

	this.goTo = function (slideIndex) {
		counter = slideIndex;
		renderActiveSlide();
	}

	init();
}

//Swiper 

var Swiper = new Swiper ('.swiper-container', {
	direction: 'horizontal',
	loop: true,
	slidesPerView: 1,
	spaceBetween: 20,
	navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    breakpoints: {

    	480: {
    		slidesPerView: 3,
    	},
    	768: {
    		slidesPerView: 4,
    	},
    	1024: {
    		slidesPerView:6,
    	},
    	1280: {
    		slidesPerView: 8,
    	},
    } 
});



// Popups

var accTarget = document.querySelector('.my_acc');
var accLink = document.querySelector('.my_acc_link');
var popupShadow = document.querySelector('.popup_shadow');
var gamesTarget = document.querySelector('.popup_games');
var gamesLink = document.querySelector('.games_link');
var esportsLink = document.querySelector('.esports_link');
var esportsTarget = document.querySelector('.popup_esports');
var gamesPopupLinks = document.querySelectorAll('.blizzard_games div');
var timeoutArray = [];
var popupGamesFooter = document.querySelector('.popup_games_footer');
var gamesHeadings = document.querySelectorAll('.popup_games h2');
var gamesPopupLinks2 = document.querySelectorAll('.activision_games div');
var esportsLinks = document.querySelectorAll('.popup_esports_wrapper div');
var esportsFooter = document.querySelector('.popup_esports_footer');
var languageLink = document.querySelector('.language_choice');
var languageTarget = document.querySelector('.language_list ul');
var currentLanguage = document.querySelector('.language_choice span');
var chooseLanguage = document.querySelectorAll('.language_list ul li a');


accLink.addEventListener('click', function () {
	if (accTarget.classList.contains('active')) {
		accTarget.classList.remove('active');
		accLink.classList.remove('active');
		popupShadow.classList.remove('active');
	}
	else {
		accTarget.classList.add('active');
		accLink.classList.add('active');
		popupShadow.classList.add('active');
	}

});

popupShadow.addEventListener('click', function () {
	accTarget.classList.remove('active');
	accLink.classList.remove('active');

	gameLinksClose();

	esportsLink.classList.remove('active');
	esportsTarget.classList.remove('active');
	for (var i = 0; i < esportsLinks.length; i++) {
		esportsLinks[i].classList.remove('active');
	}
	esportsFooter.classList.remove('active');

	languageTarget.classList.remove('active');
	languageLink.classList.remove('active');

	navbarLeft.classList.remove('active');
	navbarRight.classList.remove('active');

	popupShadow.classList.remove('active');
});

gamesLink.addEventListener('click', function() {
	if (gamesTarget.classList.contains('active')) {
		gameLinksClose();
	}
	else {
		gameLinksOpen();
	}
});

function gameLinksOpen () {
	gamesTarget.classList.add('active');
	gamesLink.classList.add('active');
	popupShadow.classList.add('active');
	for (var i = 0; i < gamesPopupLinks.length; i++) {
		var delay = i * 50;
		timeoutArray.push(setTimeout( function (par) {
			gamesPopupLinks[par].classList.add('active');
		}, delay, i));
	}
	timeoutArray.push(setTimeout(function () {
		popupGamesFooter.classList.add('active')
	}, 500));
	for (var i = 0; i < gamesPopupLinks2.length; i++) {
		var delay = 500 + i * 50;
		timeoutArray.push(setTimeout(function (par) {
			gamesPopupLinks2[par].classList.add('active');
		}, delay, i));
	}
	for (var i = 0; i < gamesHeadings.length; i++) {
		var delay = 500;
		timeoutArray.push(setTimeout(function (par) {
			gamesHeadings[par].classList.add('active');
		}, delay, i));
	}
	
}

function gameLinksClose () {
	gamesTarget.classList.remove('active');
	gamesLink.classList.remove('active');
	popupShadow.classList.remove('active');
	popupGamesFooter.classList.remove('active');
	for (var i = 0; i < timeoutArray.length; i++) {
		clearTimeout(timeoutArray[i]);
	}
	for (var i = 0; i < gamesPopupLinks.length; i++) {
		gamesPopupLinks[i].classList.remove('active');
	}
	for (var i = 0; i < gamesPopupLinks2.length; i++) {
		gamesPopupLinks2[i].classList.remove('active');
	}
	for (var i = 0; i < gamesHeadings.length; i++) {
		gamesHeadings[i].classList.remove('active');
	}
}

esportsLink.addEventListener('click', function () {
	if (esportsTarget.classList.contains('active')) {
		esportsTarget.classList.remove('active');
		esportsLink.classList.remove('active');
		popupShadow.classList.remove('active');
		for (var i = 0; i < esportsLinks.length; i++) {
			esportsLinks[i].classList.remove('active');
		}
		for (var i = 0; i < timeoutArray.length; i++) {
			clearTimeout(timeoutArray[i]);
		}
		esportsFooter.classList.remove('active');
	}

	else {
		esportsTarget.classList.add('active');
		esportsLink.classList.add('active');
		popupShadow.classList.add('active');
		for (var i = 0; i < esportsLinks.length; i++) {
			var delay = i * 50;
			timeoutArray.push(setTimeout( function (par) {
				esportsLinks[par].classList.add('active');
			}, delay, i));
		}
		timeoutArray.push(setTimeout(function () {
			esportsFooter.classList.add('active')
		}, 500));
	}
});

languageLink.addEventListener('click', function () {
	if (languageTarget.classList.contains('active')) {
		languageTarget.classList.remove('active');
		languageLink.classList.remove('active');
		popupShadow.classList.remove('active');
	}
	else {
		languageTarget.classList.add('active');
		languageLink.classList.add('active');
		popupShadow.classList.add('active');
	}
});

for (var i = 0; i < chooseLanguage.length; i++) {
	chooseLanguage[i].addEventListener('click', function (e) {
		e.preventDefault();
		if (this.parentElement.classList.contains('active')) {
			popupShadow.classList.remove('active');
			languageLink.classList.remove('active');
			languageTarget.classList.remove('active');
		}
		else {
			var activeElement = document.querySelector('.language_list ul li.active');
			var rightOne = activeElement.querySelector('.right_one');
			activeElement.classList.remove('active');
			this.parentElement.classList.add('active');
			currentLanguage.innerHTML = this.innerHTML;
			this.parentElement.insertBefore(rightOne, this);
			popupShadow.classList.remove('active');
			languageLink.classList.remove('active');
			languageTarget.classList.remove('active');
		}
	});
}

//Mobile Popups

var navbarLeftButton = document.querySelector('.navbar_left_button');
var navbarLeft = document.querySelector('.navbar_left');
var accMobileButton = document.querySelector('.acc_mobile_button');
var navbarRight = document.querySelector('.navbar_right');
var x = document.querySelectorAll('.x');

navbarLeftButton.addEventListener('click', function() {
	navbarLeft.classList.add('active');
	popupShadow.classList.add('active');
});

accMobileButton.addEventListener('click', function () {
	navbarRight.classList.add('active');
	popupShadow.classList.add('active');
});

for (var i = 0; i < x.length; i++) {
	x[i].addEventListener('click', function () {
		navbarLeft.classList.remove('active');
		popupShadow.classList.remove('active');
		navbarRight.classList.remove('active');
	});
}


