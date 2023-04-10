// spoilerHeight = 250 - высота видимого контента _spoiler__content из css {height: 250px}
// element.style.setProperty('--xxx', '2em'); - переменная размера градиента размытия текста снизу

export function spoilerInit(spoilerHeight) {
   const spoilers = document.querySelectorAll('._spoiler__link');
   if (spoilers.length > 0) {
      for (let item of spoilers) {
         item.addEventListener('click', function (e) {
            e.preventDefault();
            const link = e.target;
            let spoiler = this.closest('._spoiler');
            if (spoiler.classList.contains('_active')) {
               spoiler.classList.remove('_active');
               closeSpoiler(spoiler);
               link.innerHTML = "Подробнее";
            } else {
               spoiler.classList.add('_active');
               openSpoiler(spoiler, spoilerHeight);
               link.innerHTML = "Свернуть";
            }
         })
      }
   }
}

function openSpoiler(theObject, spoilerHeight) {
   const element = theObject.querySelector('._spoiler__content');
   const width = getComputedStyle(element).width;


   element.style.width = width;
   element.style.visibility = 'hidden';
   element.style.height = 'auto';

   const height = getComputedStyle(element).height;

   element.style.width = null;
   element.style.visibility = null;
   element.style.height = spoilerHeight;

   // Force repaint to make sure the
   // animation is triggered correctly.
   getComputedStyle(element).height;

   // Trigger the animation.
   // We use `requestAnimationFrame` because we need
   // to make sure the browser has finished
   // painting after setting the `height`
   // to `0` in the line above.
   requestAnimationFrame(() => {
      element.style.height = height;
      element.style.setProperty('--xxx', 0);
   });

}

function closeSpoiler(theObject) {
   const element = theObject.querySelector('._spoiler__content');

   const height = getComputedStyle(element).height;

   element.style.height = height;

   // Force repaint to make sure the
   // animation is triggered correctly.
   getComputedStyle(element).height;

   requestAnimationFrame(() => {
      element.style.height = null;
      element.style.setProperty('--xxx', '2em');
   });
}
