import { popupOpen, popupClose, allPopupClose } from "./popup.js";

export function formSubmit() {
   document.addEventListener('DOMContentLoaded', function () {

      const forms = document.querySelectorAll('form');

      const errPopup = document.getElementById('err');
      const errHeader = errPopup.querySelector('.popup__header');
      const errMessage = errPopup.querySelector('.popup__text');

      forms.forEach(form => {
         form.addEventListener('submit', formSend);

         async function formSend(e) {
            e.preventDefault();

            let error = formValidate(form);
            let formData = new FormData(form);

            if (error == "") {

               form.classList.add('_sending');
               errMessage.innerHTML = "";

               let response = await fetch('sendmail.php', {
                  method: 'POST',
                  body: formData
               });

               let result = await response.json();

               if (response.ok) {

                  form.classList.remove('_sending');

                  if (result.status == "ok") { // передается из php
                     form.reset(); // очищаем поля формы
                     //document.location.href = '/thx.html';
                     errHeader.innerHTML = result.massage; // передается из php
                     errMessage.innerHTML = "В ближайшее время мы свяжемся с Вами!";
                     popupOpen(errPopup);
                     setTimeout(function () {
                        popupClose(errPopup);
                        allPopupClose();
                     }, 3000);

                  } else {
                     errHeader.innerHTML = result.massage; // передается из php
                     errMessage.innerHTML = "Что-то пошло не так...";
                     popupOpen(errPopup);
                     setTimeout(function () {
                        popupClose(errPopup);
                     }, 3000);
                  }

               } else {
                  form.classList.remove('_sending');
                  errHeader.innerHTML = "Не удалось отправить заявку!";
                  errMessage.innerHTML = "Что-то пошло не так..";
                  popupOpen(errPopup);
                  setTimeout(function () {
                     popupClose(errPopup);
                  }, 3000);
               }

            } else {

               errHeader.innerHTML = "Не удалось отправить заявку!";
               errMessage.innerHTML = error;

               form.classList.remove('_sending');

               popupOpen(errPopup);
               setTimeout(function () {
                  popupClose(errPopup);
               }, 3000);


            }
         }
      });

      function formValidate(form) {
         let error = "";
         let elements = form.elements;

         for (let index = 0; index < elements.length; index++) {
            const input = elements[index];
            formRemoveError(input);
            input.addEventListener('focus', function (e) {
               if (input.classList.contains('_error')) {
                  formRemoveError(input);
               }
            });
            if (input.name == 'name') {
               if (input.value == '') {
                  formAddError(input);
                  error = "Укажите Ваше имя";
                  break;
               }
            } else if (input.name == 'phone') {
               if (phoneTest(input) || input.value == '') {
                  formAddError(input);
                  error = "Укажите правильный номер телефона";
                  break;
               }
            } else if (input.name == 'email') {
               if (emailTest(input) || input.value == '') {
                  formAddError(input);
                  error = "Укажите правильный e-mail";
               }
            }
         }
         return error;
      }

      function formAddError(input) {
         //input.parentElement.classList.add('_error'); // ошибка родителю тоже
         input.classList.add('_error');
      }

      function formRemoveError(input) {
         //input.parentElement.classList.remove('_error'); // ошибка родителю тоже
         input.classList.remove('_error');
      }

      function emailTest(input) {
         return !/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i.test(input.value);
      }
      function phoneTest(input) {
         //return !/^\+\d[\d\(\)\ -]{4,14}\d$/.test(input.value);
         return !/^\+\d\ [\d\(\)\ -]{14}\d$/.test(input.value);
      }
   });
}