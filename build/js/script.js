'use strict';

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

  switchOnJsMode();
  var onToggleClick = createHandler();

  window.addEventListener('resize', function () {
    viewPort = document.documentElement.clientWidth;

    if (isEveryItemExisting && viewPort < DESKTOP_WIDTH) {
      hideNavigation();
      toggle.addEventListener('click', onToggleClick, false);
      console.log('in');
    }

    if (isEveryItemExisting && (viewPort > DESKTOP_WIDTH || viewPort === DESKTOP_WIDTH)) {
      showNavigation();
      toggle.removeEventListener('click', onToggleClick, false);
    }
  });

  function switchOnJsMode() {
    if (isEveryItemExisting && viewPort < DESKTOP_WIDTH) {
      hideNavigation();
      toggle.addEventListener('click', onToggleClick);
    }
  }

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
})();
