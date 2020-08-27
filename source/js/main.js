'use strict';
// programs
(function () {
  var togglesList = document.querySelector('.controls__list');
  var toggles = document.querySelectorAll('.controls__btn');
  var programs = document.querySelectorAll('.programs__list');
  var generalItem = document.querySelector('.programs__description--general');
  var academicItem = document.querySelector('.programs__description--academic');
  var internshipsItem = document.querySelector('.programs__description--internship');
  var volunteeringItem = document.querySelector('.programs__description--volunteering');
  var religiousItem = document.querySelector('.programs__description--religious');

  var togglesMap = {
    general: 'controls__btn--general',
    academic: 'controls__btn--academic',
    internships: 'controls__btn--internships',
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

      for (var j = 0; j < programs.length; j++) {
        if (programs[j].classList.contains('programs__list--shown')) {
          programs[j].classList.remove('programs__list--shown');
        }
      }

      if (toggleButton.classList.contains(togglesMap.general)) {
        generalItem.classList.add('programs__item--shown');
      } else if (toggleButton.classList.contains(togglesMap.academic)) {
        academicItem.classList.add('programs__item--shown');
      } else if (toggleButton.classList.contains(togglesMap.internships)) {
        internshipsItem.classList.add('programs__item--shown');
      } else if (toggleButton.classList.contains(togglesMap.volunteering)) {
        volunteeringItem.classList.add('programs__item--shown');
      } else if (toggleButton.classList.contains(togglesMap.religious)) {
        religiousItem.classList.add('programs__item--shown');
      }
    }
  });
})();
