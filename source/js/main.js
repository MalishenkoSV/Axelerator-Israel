'use strict';
// programs
(function () {
  var togglesList = document.querySelector('.controls__list');
  var toggles = document.querySelectorAll('.controls__btn');
var programs = document.querySelector('.programs__list');
var programsItems = document.querySelectorAll('.programs__item');
  var generalItem = programs.querySelector('.programs__item--general');
  var academicItem = programs.querySelector('.programs__item--academic');
  var internshipItem = programs.querySelector('.programs__item--internship');
  var volunteeringItem = programs.querySelector('.programs__item--volunteering');
  var religiousItem = programs.querySelector('.programs__item--religious');

  var togglesMap = {
    general: 'controls__btn--general',
    academic: 'controls__btn--academic',
    internship: 'controls__btn--internship',
    volunteering: 'controls__btn--volunteering',
    religious: 'controls__btn--religious'
  };

  // переключение табов в блоке Programs
  togglesList.addEventListener('click', function (evt) {
    if (!evt.target.closest('button').classList.contains('controls__btn--active')) {
      for (var i = 0; i < toggles.length; i++) {
        if (toggles[i].classList.contains('controls__btn--active')) {
          toggles[i].classList.remove('controls__btn--active');
        }
      }

      var toggleButton = evt.target.closest('button');
      toggleButton.classList.add('controls__btn--active');

      for (var j = 0; j < programsItems.length; j++) {
        if (programsItems[j].classList.contains('programs__item--shown')) {
          programsItems[j].classList.remove('programs__item--shown');
        }
      }

      if (toggleButton.classList.contains(togglesMap.general)) {
        generalItem.classList.add('programs__item--shown');
      } else if (toggleButton.classList.contains(togglesMap.academic)) {
        academicItem.classList.add('programs__item--shown');
      } else if (toggleButton.classList.contains(togglesMap.internship)) {
        internshipItem.classList.add('programs__item--shown');
      } else if (toggleButton.classList.contains(togglesMap.volunteering)) {
        volunteeringItem.classList.add('programs__item--shown');
      } else if (toggleButton.classList.contains(togglesMap.religious)) {
        religiousItem.classList.add('programs__item--shown');
      }
    }
  });
})();

// popup
(function () {
var overlay = document.querySelector('.overlay');
var popup = document.querySelector('.popup');
var headerBtn = document.querySelector('.header__link--dashed');
var popupBtn = popup.querySelector('.popup__button');
var closePopupBtn = popup.querySelector('.popup__close');
var feedbackName = popup.querySelector('#details_name');
var phone = popup.querySelector('#details_phone');
var popupConfirm = document.querySelector('.popup__confirm');

var isStorageSupport = true;
var storage = {
  feedbackName: '',
  phone: ''
};


var closePopup = function () {
  popup.classList.remove('popup__item--show');
  popup.classList.remove('popup__error');
  overlay.classList.remove('pop-up-overlay');
  document.removeEventListener('keydown', onPopupEscPress);
};

try {
  storage.feedbackName = localStorage.getItem('feedbackName');
  storage.phone = localStorage.getItem('phone');
} catch (err) {
  isStorageSupport = false;
}

var openPopup = function () {
  popup.classList.add('popup__item--show');
  overlay.classList.add('pop-up-overlay');
  popup.classList.add('popup__error');
  document.addEventListener('keydown', onPopupEscPress);
  checkLocalStorage();
  feedbackName.focus();
};


headerBtn.addEventListener('click', function () {
  openPopup();
});

if (popupBtn && closePopupBtn ) {
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  popupBtn.addEventListener('submit', function (evt) {
    evt.preventDefault();
    closeSuccessModal();
    if (isStorageSupport) {
      localStorage.setItem('feedbackName', feedbackName.value);
      localStorage.setItem('phone', phone.value);

    }
  });

   var closeSuccessModal = function () {
    successModal.classList.add('hidden');
    siteBody.removeAttribute('style');
    siteBody.classList.remove('no-scroll');
    window.scrollTo(0, bodyScrollTop);
    callbackModalOpenBtn.addEventListener('click', openCallbackModal);
  }

  var checkLocalStorage = function () {
    if (feedbackName && storage.feedbackName !== null) {
      feedbackName.value = storage.feedbackName;
    }

    if (phone && storage.phone !== null) {
      phone.value = storage.phone;
    }
  };


  popupBtn.addEventListener('click', function () {
    closePopup();
    popup.classList.remove('popup__item--show');
    overlay.classList.remove('pop-up-overlay');
    popup.classList.remove('popup__error');
  });


  closePopupBtn.addEventListener('click', function () {
    closePopup();
    popup.classList.remove('popup__item--show');
    overlay.classList.remove('pop-up-overlay');
    popup.classList.remove('popup__error');
  });
}

overlay.addEventListener('click', function () {
  closePopup();
  popup.classList.remove('popup__item--show');
    overlay.classList.remove('pop-up-overlay');
    popup.classList.remove('popup__error');
});
})();


// отзывы
(function () {
 // слайдер в блоке Отзывы
// для слайдера отзывов
// var reviewsNode = document.querySelector('.reviews');
var reviewsPrevButton = document.querySelector('.navigation__button--forward');
var reviewsNextButton = document.querySelector('.navigation__button--back');
var reviews = Array.prototype.slice.call(document.querySelectorAll('.comment'));
var reviewsStep = 1;

var slideReviewsToNext = function () {
  var currentIndex = 0;
  for (var a = 0; a < reviews.length; a++) {
    if (reviews[a].classList.contains('reviews__item--active')) {
      currentIndex = a;
      break;
    }
  }

  reviews[currentIndex].classList.remove('reviews__item--active');
  reviews[currentIndex].classList.add('reviews__item--hidden');

  if (currentIndex < reviews.length - 1) {
    reviews[currentIndex + reviewsStep].classList.remove('reviews__item--hidden');
    reviews[currentIndex + reviewsStep].classList.add('reviews__item--active');
  } else {
    reviews[0].classList.remove('reviews__item--hidden');
    reviews[0].classList.add('reviews__item--active');
  }
};

var slideReviewsToPrev = function () {
  var currentIndex = 0;
  for (var z = 0; z < reviews.length; z++) {
    if (reviews[z].classList.contains('reviews__item--active')) {
      currentIndex = z;
      break;
    }
  }

  reviews[currentIndex].classList.remove('reviews__item--active');
  reviews[currentIndex].classList.add('reviews__item--hidden');

  if (currentIndex > 0) {
    reviews[currentIndex - reviewsStep].classList.remove('reviews__item--hidden');
    reviews[currentIndex - reviewsStep].classList.add('reviews__item--active');
  } else {
    reviews[reviews.length - 1].classList.remove('reviews__item--hidden');
    reviews[reviews.length - 1].classList.add('reviews__item--active');
  }
};

if (reviewsNextButton && reviews) {
  reviewsNextButton.addEventListener('click', slideReviewsToNext);
}

if (reviewsPrevButton && reviews) {
  reviewsPrevButton.addEventListener('click', slideReviewsToPrev);
}


})();


// mask phone
(function () {
var orderFormTelInput = document.querySelector('.trip__form input[type=tel]');
if (orderFormTelInput) {
  var orderPhoneMask = IMask(orderFormTelInput, {
    mask: '+{7}(000)000 00 00'
  });
}

var contactsFormTelInput = document.querySelector('.callback__form input[type=tel]');
if (contactsFormTelInput) {
  var contactsPhoneMask = IMask(contactsFormTelInput, {
    mask: '+{7}(000)000 00 00'
  });
}

var callbackFormTelInput = document.querySelector('.popup__form input[type=tel]');
if (callbackFormTelInput) {
  var callbackPhoneMask = IMask(callbackFormTelInput, {
    mask: '+{7}(000)000 00 00'
  });
}
})();

// свайп
(function () {
var breakpoint = window.matchMedia('(min-width:768px)');
  var lifeInIsraelSwiper;

  var breakpointChecker = function () {
    if (breakpoint.matches === true) {

      if (lifeInIsraelSwiper !== undefined) {
        lifeInIsraelSwiper.destroy(true, true);
      }

    } else if (breakpoint.matches === false) {
      return enableSwiper();
    }
  };

  var enableSwiper = function () {
    lifeInIsraelSwiper = new Swiper('.live-in .swiper-container', {
      pagination: {
        el: '.livee-in .swiper-pagination',
      },
    });
  };

  breakpoint.addListener(breakpointChecker);

  breakpointChecker();

  var enableCommentsSwiper = function () {
    var commentsSwiper = new Swiper('.comments .swiper-container', {
      pagination: {
        el: '.comments .swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.comments .swiper-button-next',
        prevEl: '.comments .swiper-button-prev',
      },
    });
    return commentsSwiper;
  };

  enableCommentsSwiper();
})();
