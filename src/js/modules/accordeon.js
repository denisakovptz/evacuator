export function accordeonInit() {
   const accordeons = document.querySelectorAll("._accordeon__item");

   if (accordeons.length > 0) {
      for (let item of accordeons) {
         item.addEventListener("click", function () {
            if (this.classList.contains("_active")) {
               this.classList.remove("_active");
               closeAccordeon(this);
            } else {
               for (let el of accordeons) {
                  el.classList.remove("_active");
                  closeAccordeon(el);
               }
               this.classList.add("_active");
               openAccordeon(this);
            }
         });
      }
   }
}

function openAccordeon(theObject) {
   const element = theObject.querySelector("._accordeon__content");
   const width = getComputedStyle(element).width;

   element.style.width = width;
   element.style.visibility = "hidden";
   element.style.height = "auto";

   const height = getComputedStyle(element).height;

   element.style.width = null;
   element.style.visibility = null;
   element.style.height = 0;

   getComputedStyle(element).height;

   requestAnimationFrame(() => {
      element.style.height = height;
   });
}

function closeAccordeon(theObject) {
   const element = theObject.querySelector("._accordeon__content");
   const height = getComputedStyle(element).height;

   element.style.height = height;

   getComputedStyle(element).height;

   requestAnimationFrame(() => {
      element.style.height = 0;
   });
}
