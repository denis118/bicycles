'use strict';

// Показ и скрытие навигации
(function () {
  var DESKTOP_WIDTH = 1024;
  var viewPort = document.documentElement.clientWidth;
  var body = document.body;
  var navigation = document.querySelector('.navigation');
  var toggle = navigation.querySelector('.navigation__toggle');
  var burgerDescription = navigation.querySelector('.navigation__burger-description');
  var crossDescription = navigation.querySelector('.navigation__cross-description');
  var burgerSvg = navigation.querySelector('.navigation__burger-svg');
  var crossSvg = navigation.querySelector('.navigation__cross-svg');
  var navigationList = navigation.querySelector('.navigation__list');

  var checkedItems = [
    navigation,
    toggle,
    burgerDescription,
    crossDescription,
    burgerSvg,
    crossSvg,
    navigationList
  ];

  var isEveryItemExisting = checkedItems.every(function (item) {
    return Boolean(item) === true;
  });

  var onToggleClick = createHandler();

  window.addEventListener('load', function () {
    viewPort = document.documentElement.clientWidth;

    if (isEveryItemExisting && viewPort < DESKTOP_WIDTH) {
      hideNavigation();
      toggle.addEventListener('click', onToggleClick);
    }
  });

  window.addEventListener('resize', function () {
    viewPort = document.documentElement.clientWidth;

    if (isEveryItemExisting && viewPort < DESKTOP_WIDTH) {
      hideNavigation();
      toggle.addEventListener('click', onToggleClick, false);
    }

    if (isEveryItemExisting && (viewPort > DESKTOP_WIDTH || viewPort === DESKTOP_WIDTH)) {
      showNavigation();
      toggle.removeEventListener('click', onToggleClick, false);
    }
  });

  function hideNavigation() {
    navigation.classList.add('navigation--js');
    [
      toggle,
      burgerDescription,
      burgerSvg
    ].forEach(function (item) {
      return item.classList.remove('hidden-entity');
    });

    navigationList.classList.add('hidden-entity');
  }

  function showNavigation() {
    navigation.classList.remove('navigation--js');

    [
      toggle,
      burgerDescription,
      burgerSvg
    ].forEach(function (item) {
      return item.classList.add('hidden-entity');
    });

    navigationList.classList.remove('hidden-entity');
  }

  function createHandler() {
    var flag = false;

    return function () {
      if (!flag) {
        navigation.classList.add('navigation--opened');
        navigationList.classList.remove('hidden-entity');
        toggle.classList.add('navigation__toggle--cross');
        body.classList.add('modal-open');

        [
          burgerDescription,
          burgerSvg
        ].forEach(function (item) {
          return item.classList.add('hidden-entity');
        });

        [
          crossDescription,
          crossSvg
        ].forEach(function (item) {
          return item.classList.remove('hidden-entity');
        });

        flag = true;
      } else {
        navigation.classList.remove('navigation--opened');
        navigationList.classList.add('hidden-entity');
        toggle.classList.remove('navigation__toggle--cross');
        body.classList.remove('modal-open');

        [
          burgerDescription,
          burgerSvg
        ].forEach(function (item) {
          return item.classList.remove('hidden-entity');
        });

        [
          crossDescription,
          crossSvg
        ].forEach(function (item) {
          return item.classList.add('hidden-entity');
        });

        flag = false;
      }
    };
  }

  window.navigationSwitching = {
    desktopWidth: DESKTOP_WIDTH,
    closeNavigation: onToggleClick
  };
})();

// Валидация формы
(function () {
  var generalBlock = document.querySelector('.general-block');
  var form = generalBlock.querySelector('form');
  var phoneInput = form.querySelector('input[type="tel"]');
  var submitButton = form.querySelector('[type="submit"]');

  var checkedItems = [
    phoneInput,
    submitButton
  ];

  var isEveryItemExisting = checkedItems.every(function (item) {
    return Boolean(item) === true;
  });

  if (isEveryItemExisting) {
    submitButton.addEventListener('click', function (evt) {
      var value = typeof phoneInput.value === 'string' ? phoneInput.value : String(phoneInput.value);
      var isEveryCharLetter = value.trim().split('').every(function (char) {
        if (Number(char) === 0) {
          return true;
        }

        return Boolean(Number(char));
      });

      if (!isEveryCharLetter || phoneInput.value === '') {
        evt.preventDefault();
        phoneInput.setCustomValidity('Номер телефона может содержать только цифры');
        phoneInput.reportValidity();
      } else {
        phoneInput.setCustomValidity('');
      }
    });
  }
})();

// Скролл
(function () {
  var navigationList = document.querySelector('.navigation__list');
  navigationList.addEventListener('click', onNavigationListClick, false);

  function onNavigationListClick(evt) {
    evt.preventDefault();

    var isNavigationLink = navigationList.contains(evt.target)
      && Boolean(evt.target.getAttribute('href'));

    if (isNavigationLink) {
      var aimId = evt.target.getAttribute('href');
      var aim = document.querySelector(aimId);

      if (aim) {
        if (document.documentElement.clientWidth
            < window.navigationSwitching.desktopWidth) {
          window.navigationSwitching.closeNavigation();
        }

        aim.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
})();
