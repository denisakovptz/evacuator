// проверка поддержки webp, добавление класса webp или no-webp для html
export function isWebp() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
   }
   testWebP(function (support) {
      let className = support === true ? 'webp' : 'no-webp';
      document.documentElement.classList.add(className);
   });
}

// класс для корректного отображения изображений _ibg для IE
export function ibg() {
   let ibg = document.querySelectorAll("_ibg");
   for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img')) {
         ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
   }
}


// маска для номера телефона
// use
// maskPhone('селектор элементов', 'маска, если маску не передать то будет работать стандартная +7 (___) ___-__-__');
// пример maskPhone('input[name=phone]',);
export function maskPhone(selector, masked = '+7 (___) ___-__-__') {
   const elems = document.querySelectorAll(selector);

   function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
         def = template.replace(/\D/g, ""),
         val = this.value.replace(/\D/g, "");
      let i = 0,
         newValue = template.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
         });
      i = newValue.indexOf("_");
      if (i !== -1) {
         newValue = newValue.slice(0, i);
      }
      let reg = template.substr(0, this.value.length).replace(/_+/g,
         function (a) {
            return "\\d{1," + a.length + "}";
         }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
         this.value = newValue;
      }
      if (event.type === "blur" && this.value.length < 5) {
         this.value = "";
      }

   }

   for (const elem of elems) {
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);
   }
}


// снятие ховера у ссылок меню для тачпадов
export function notHoverMobile() {
   if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // код для мобильных устройств
      const touchHover = document.querySelectorAll('.faq__title');
      if (touchHover) {
         for (var i = 0; i < touchHover.length; i++) {
            touchHover[i].classList.add('_touch');
         }
      } else {
         // код для обычных устройств
      }
   }
}
