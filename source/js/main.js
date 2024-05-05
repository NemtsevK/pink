'use strict';
// Блок фильтров для фото
(function () {
  const photoFilters = document.getElementById('photo-filters');
  let filterButtons, filters;

  if (photoFilters) {
    const filtersButtons = photoFilters.querySelector('.form-photo__filters-buttons');

    filterButtons = Array.from(filtersButtons.querySelectorAll('.form-photo__filter-button'));
    filters = Array.from(photoFilters.querySelectorAll('.form-photo__filter'));

    if (filterButtons && filters) {
      filtersButtons.addEventListener('click', clickFiltersButtons);
    }
  }

  function findCurrentButton(element) {
    return element.classList.contains('form-photo__filter-button--current');
  }

  function findCurrentFilter(element) {
    return element.classList.contains('form-photo__filter--current');
  }

  function changeFilters(indexCurrentSlide, indexNextSlide) {
    filters[indexCurrentSlide].classList.remove('form-photo__filter--current');
    filters[indexNextSlide].classList.add('form-photo__filter--current');
  }

  function clickFiltersButtons(event) {
    let element = event.target;

    if (element.classList.contains('form-photo__filter-button')) {
      event.preventDefault();

      let indexCurrentButton = filterButtons.indexOf(filterButtons.find(findCurrentButton));
      let indexNextButton = filterButtons.indexOf(element);

      filterButtons[indexCurrentButton].classList.remove('form-photo__filter-button--current');
      filterButtons[indexNextButton].classList.add('form-photo__filter-button--current');

      let indexCurrentFilter = filters.indexOf(filters.find(findCurrentFilter));
      let indexNextFilter = indexNextButton;

      changeFilters(indexCurrentFilter, indexNextFilter);
    }
  }
})();

// Меню
(function () {
  const pageHeader = document.querySelector('.header');
  const toggleButton = document.getElementById('toggle-button');

  let navWrapper, mainMenu;
  let coordY = window.pageYOffset;

  const SCROLL_Y_VALUE = 70;

  if (pageHeader) {
    pageHeader.classList.add('header--js');

    mainMenu = pageHeader.querySelector('.menu');
    navWrapper = pageHeader.querySelector('.header__nav-wrapper');

    if (mainMenu) {
      mainMenu.classList.add('menu--closed');
    }

    if (navWrapper) {
      navWrapper.setAttribute('data-status', 'closed');
      navWrapper.classList.add('header__nav-wrapper--js');
      navWrapper.classList.add('header__nav-wrapper--transparent');

      window.addEventListener('scroll', scrollWindow);
    }
  }

  if (toggleButton) {
    // toggleButton.classList.add('nav__toggle--js');
    toggleButton.classList.add('nav__toggle--off');
    toggleButton.addEventListener('click', clickToggleButton);
  }

  function clickToggleButton(event) {
    let element = event.target;

    event.preventDefault();
    element.classList.toggle('nav__toggle--off');

    if (mainMenu) {
      mainMenu.classList.toggle('menu--closed');
    }

    if (navWrapper) {
      if (navWrapper.dataset.status === 'closed') {
        navWrapper.dataset.status = 'opened';
      } else {
        navWrapper.dataset.status = 'closed';
      }

      if (navWrapper.classList.contains('header__nav-wrapper--transparent')) {
        navWrapper.classList.remove('header__nav-wrapper--transparent');
      } else {
        if (coordY < SCROLL_Y_VALUE) {
          navWrapper.classList.add('header__nav-wrapper--transparent');
        }
      }
    }
  }

  function scrollWindow() {
    coordY = window.pageYOffset;

    if (navWrapper.dataset.status === 'closed') {
      if (coordY > SCROLL_Y_VALUE) {
        navWrapper.classList.remove('header__nav-wrapper--transparent');
      } else {
        navWrapper.classList.add('header__nav-wrapper--transparent');
      }
    }
  }
})();

// Таблица тарифов
(function () {
  const priceBlock = document.getElementById('price');
  let sliderButtons, priceTable;

  if (priceBlock) {
    const sliderControls = priceBlock.querySelector('.slider-controls');
    priceTable = priceBlock.querySelector('.price__table');

    sliderButtons = Array.from(sliderControls.querySelectorAll('.slider-controls__button'));

    if (sliderButtons) {
      sliderControls.addEventListener('click', clickSliderControls);
    }
  }

  function findCurrentButton(element) {
    return element.classList.contains('slider-controls__button--current');
  }

  function clickSliderControls(event) {
    let element = event.target;

    if (element.classList.contains('slider-controls__button')) {
      let indexCurrentButton = sliderButtons.indexOf(sliderButtons.find(findCurrentButton));
      let indexNextButton = sliderButtons.indexOf(element);

      sliderButtons[indexCurrentButton].classList.remove('slider-controls__button--current');
      sliderButtons[indexNextButton].classList.add('slider-controls__button--current');
      priceTable.style.left = `${(150 - indexNextButton * 100)}%`;
    }
  }
})();

// Блок отзывов
(function () {
  const reviewsSlider = document.getElementById('slider-reviews');
  let sliderButtons, sliderNavButtons, slides;

  if (reviewsSlider) {
    const sliderControls = reviewsSlider.querySelector('.slider-controls');
    const sliderNav = reviewsSlider.querySelector('.slider-nav');

    sliderButtons = Array.from(sliderControls.querySelectorAll('.slider-controls__button'));
    sliderNavButtons = Array.from(sliderNav.querySelectorAll('.slider-nav__slider-button'));
    slides = Array.from(reviewsSlider.querySelectorAll('.slider-reviews__slide'));

    if (slides && sliderButtons) {
      sliderControls.addEventListener('click', clickSliderControls);
      sliderNav.addEventListener('click', clickSliderNav);
    }
  }

  function findCurrentButton(element) {
    return element.classList.contains('slider-controls__button--current');
  }

  function findCurrentSlide(element) {
    return element.classList.contains('slider-reviews__slide--current');
  }

  function changeSlides(indexCurrentSlide, indexNextSlide) {
    slides[indexCurrentSlide].classList.remove('slider-reviews__slide--current');
    slides[indexNextSlide].classList.add('slider-reviews__slide--current');
  }

  function clickSliderControls(event) {
    let element = event.target;

    if (element.classList.contains('slider-controls__button')) {
      event.preventDefault();

      let indexCurrentButton = sliderButtons.indexOf(sliderButtons.find(findCurrentButton));
      let indexNextButton = sliderButtons.indexOf(element);

      sliderButtons[indexCurrentButton].classList.remove('slider-controls__button--current');
      sliderButtons[indexNextButton].classList.add('slider-controls__button--current');

      let indexCurrentSlide = slides.indexOf(slides.find(findCurrentSlide));
      let indexNextSlide = indexNextButton;

      changeSlides(indexCurrentSlide, indexNextSlide);
    }
  }

  function clickSliderNav(event) {
    let element = event.target;

    if (element.classList.contains('slider-nav__slider-button')) {
      event.preventDefault();

      let indexButton = sliderNavButtons.indexOf(element);
      let indexCurrentSlide = slides.indexOf(slides.find(findCurrentSlide));
      let indexNextSlide = indexCurrentSlide;

      switch (indexButton) {
        case 0:
          indexNextSlide -= 1;
          if (indexNextSlide < 0) {
            indexNextSlide = slides.length - 1;
          }
          break;

        case 1:
          indexNextSlide += 1;
          if (indexNextSlide >= slides.length) {
            indexNextSlide = 0;
          }
          break;

        default:
          break;
      }

      changeSlides(indexCurrentSlide, indexNextSlide);
    }
  }
})();

// // Яндекс карта
function init(ymaps) {
  /*eslint-enable*/
  let map = new ymaps.Map('map', {
    center: [59.93863106417265, 30.3230545],
    zoom: 16,
    controls: []
  });

  let placemark = new ymaps.Placemark(
    [59.93867682348719, 30.323043771163896],
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: 'images/icons/map-marker.svg',
      iconImageSize: [35, 35],
      iconImageOffset: [-17.5, -17.5]
    }
  );

  let zoomControl = new ymaps.control.ZoomControl({
    options: {
      position: {
        left: 10,
        bottom: 50
      }
    }
  });

  map.behaviors.disable('scrollZoom');
  map.geoObjects.add(placemark);
  map.controls.add(zoomControl);
}

