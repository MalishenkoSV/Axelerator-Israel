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
var headerBtn = document.querySelector('.header__link');
var formPopup = popup.querySelector('.form');
var closeBtn = popup.querySelector('.popup__button');
var closePopupBtn = popup.querySelector('.popup__close');
var feedbackName = popup.querySelector('#details_name');
var phone = popup.querySelector('#details_phone');

var isStorageSupport = true;
var storage = {
  feedbackName: '',
  phone: ''
};


var closePopup = function () {
  popup.classList.remove('popup__show');
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

if (closeBtn && closePopupBtn ) {
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };
  if (formPopup && closeBtn ) {
    formPopup.addEventListener('submit', function () {
      if (isStorageSupport) {
        localStorage.setItem('feedbackName', feedbackName.value);
        localStorage.setItem('phone', phone.value);
      }
    });
  }

  var checkLocalStorage = function () {
    if (feedbackName && storage.feedbackName !== null) {
      feedbackName.value = storage.feedbackName;
    }

    if (phone && storage.phone !== null) {
      phone.value = storage.phone;
    }
  };

  var openPopup = function () {
    popup.classList.add('popup__show');
    overlay.classList.add('pop-up-overlay');
    popup.classList.add('popup__error');
    document.addEventListener('keydown', onPopupEscPress);
    checkLocalStorage();
    feedbackName.focus();
  };

  headerBtn.addEventListener('click', function () {
    openPopup();
  });

  closeBtn.addEventListener('click', function () {
    closePopup();
  });


  closePopupBtn.addEventListener('click', function () {
    closePopup();
  });
}

overlay.addEventListener('click', function () {
  closePopup();
});
})();
