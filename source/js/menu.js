const nav = document.querySelector('.page-header__nav');
const toggle = document.querySelector('.page-header__toggle');

nav.classList.remove('page-header__nav--nojs');

toggle.addEventListener('click', function () {
  if (nav.classList.contains('page-header__nav--closed')) {
    nav.classList.remove('page-header__nav--closed');
    nav.classList.add('page-header__nav--opened');
  } else {
    nav.classList.add('page-header__nav--closed');
    nav.classList.remove('page-header__nav--opened');
  }
});

