// import * as flsFunctions from "./modules/functions.js";
import { ibg, maskPhone, notHoverMobile } from "./modules/functions.js";
//isWebp();
ibg();
maskPhone('input[name=phone]',);
notHoverMobile();

import { accordeonInit } from "./modules/accordeon.js";
accordeonInit();
import { spoilerInit } from "./modules/spoiler.js";
spoilerInit('250px');
import { popupInit } from "./modules/popup.js";
popupInit();
import { formSubmit } from "./modules/forms.js";
formSubmit();

// изменение размера шапки
window.addEventListener('scroll', function () {
   const head = document.querySelector('header');
   if (window.pageYOffset > 100) {
      head.classList.add('_small');
   } else {
      head.classList.remove('_small');
   }
});


// меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   });
}


// плавная прокрутка
document.querySelectorAll('a.scrollto').forEach(link => {
   link.addEventListener('click', function (e) {
      e.preventDefault();
      let href = this.getAttribute('href').substring(1);
      if (href) {
         const scrollTarget = document.getElementById(href);
         const elementPosition = scrollTarget.getBoundingClientRect().top;
         let offsetPosition = elementPosition - document.querySelector('header').offsetHeight;
         // размер шапки уменьшается
         // если шапка большая и экран больше 767.98px то добавляется дополнительный оффсет
         if (!document.querySelector('header').classList.contains('_small') && !(document.documentElement.clientWidth < 767.98)) {
            offsetPosition = offsetPosition + 40;
         }
         window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
         });
      }
      // закрытие меню при клике на ссылку
      if (iconMenu.classList.contains('_active')) {
         document.body.classList.remove('_lock');
         iconMenu.classList.remove('_active');
         menuBody.classList.remove('_active');
      }
   });
});

const headerMenu = document.querySelector('.header__menu');
if (window.location.href.includes('thx') || window.location.href.includes('politics')) {
   headerMenu.classList.add('_hide')
}