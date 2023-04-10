let unlock = true;
const timeout = 500; // таймаут равен длительности анимации (transition: all 0.5s ease 0s;)

const popupLinks = document.querySelectorAll('._popup-link'); //класс для ссылки на попап
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('._lock-padding'); //класс для фиксированной шапки

export function popupInit() {
   // делегируем обработку кликов по ссылкам с модальными окнами
   if (popupLinks.length > 0) {
      for (let index = 0; index < popupLinks.length; index++) {
         const popupLink = popupLinks[index];
         popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
         });
      }
   }

   // закрытие модального окна по нажатию крестика
   const popupCloseIcon = document.querySelectorAll('.close-popup');
   if (popupCloseIcon.length > 0) {
      for (let index = 0; index < popupCloseIcon.length; index++) {
         const el = popupCloseIcon[index];
         el.addEventListener("click", function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
         });
      }
   }

   // закрытие модального окна по нажаию Esc
   document.addEventListener("keydown", function (e) {
      if (e.key == "Escape") {
         const popupActive = document.querySelector('.popup.open');
         popupClose(popupActive);
      }
   });

   // для ИЕ 11
   (function () {
      // проверям поддержку
      if (!Element.prototype.closest) {
         // реализуем
         Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
               if (node.matches(css)) return node;
               else node = node.parentElement;
            }
            return null;
         }
      }
   })();
   (function () {
      // проверям поддержку
      if (!Element.prototype.matches) {
         // определяем свойство
         Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
      }
   })();
}

// открытие модального окна
export function popupOpen(currentPopup) {
   // если в это время нет анимации
   if (currentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      // закрываем уже открытое окно, но если это 2-е окно с ошибкой
      if (popupActive && currentPopup.id != 'err') {
         popupClose(popupActive, false);
      } else {

         bodyLock();
      }
      currentPopup.classList.add('open');
      // закрываем, если клик за пределами окна
      currentPopup.addEventListener("click", function (e) {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}

// закрытие модального окна
export function popupClose(popupActive, doUnLock = true) {
   if (unlock) {
      const popupAll = document.querySelectorAll('.popup.open');
      popupActive.classList.remove('open');
      if (doUnLock && (popupActive.id != 'err')) {
         bodyUnLock();
      } else if (doUnLock && (popupActive.id == 'err') && (popupAll.length <= 1)) {
         bodyUnLock();
      }
   }
}

// закрытие всех модальных окон (при загрузке страницы, при успешной отправке заявки)
export function allPopupClose() {
   const allPopups = document.querySelectorAll('.popup.open');
   if (allPopups.length > 0) {
      for (const item of allPopups) {
         item.classList.remove('open');
         bodyUnLock();
      }
   }
}

// учитываем ширину вертикального скрола, чтобы попан не дергался при открытии
function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
   // если есть фиксированные элементы (шапка)
   if (lockPadding.length > 0) {
      // то задаем паддинг справа равный ширине скролла
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   // также задаем паддинг body
   body.style.paddingRight = lockPaddingValue;
   // и запрещаем скролл
   body.classList.add('_lock');

   // время на анимацию, чтобы не было ошибки при повторном клике
   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}


function bodyUnLock() {
   setTimeout(function () {
      // убираем паддинги
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }
      body.style.paddingRight = '0px';
      // снимаем запрет скролла
      body.classList.remove('_lock');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}