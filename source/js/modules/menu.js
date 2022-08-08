const nav = document.querySelector('.page-header__nav');
const toggle = document.querySelector('.page-header__toggle');
const html = document.documentElement;
const body = document.querySelector('body');
const menuItem = document.querySelector('.menu a');
const menuItems = document.querySelectorAll('.menu a');
const focusTrap = require('focus-trap');

let scrollPosition;

const bodyScrollControl = () => {
  if (nav.classList.contains('page-header__nav--opened')) {
    html.classList.add('menu-opened');
    window.scrollTo(0, scrollPosition);
    html.style.top = '';
    return;
  }

  scrollPosition = window.pageYOffset;
  html.style.top = scrollPosition + 'px';
  html.classList.add('menu-opened');
};

const modalFocusTrap = focusTrap.createFocusTrap(nav, {allowOutsideClick: true});

const closeMenu = () => {
  nav.classList.add('page-header__nav--closed');
  nav.classList.remove('page-header__nav--opened');
  html.classList.remove('menu-opened');
  body.classList.remove('menu-show');
  modalFocusTrap.deactivate();
};

const openMenu = () => {
  if (nav.classList.contains('page-header__nav--closed')) {
    nav.classList.remove('page-header__nav--closed');
    nav.classList.add('page-header__nav--opened');
    bodyScrollControl();
    body.classList.add('menu-show');
    menuItem.focus();
    modalFocusTrap.activate();
  } else {
    closeMenu();
  }
};

const clickLink = () => {
  menuItems.forEach(function (item) {
    item.addEventListener('click', function () {
      closeMenu();
    });
  });
};

const isEscapeKey = (evt) => evt.key === 'Escape';

function escKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    openMenu();
  }
}

function overlayClickHandler(evt) {
  if (nav.contains(evt.target)) {
    return;
  }
  closeMenu();
}

const initMenu = () => {
  nav.classList.remove('page-header__nav--nojs');

  toggle.addEventListener('click', openMenu);

  document.addEventListener('keydown', escKeydownHandler);
  document.addEventListener('click', overlayClickHandler);
  clickLink();
};

export {initMenu};
