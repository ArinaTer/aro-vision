import { Fancybox } from "@fancyapps/ui";
import { bestCollectionsSwiper } from "../components/bestCollectionsSwiper.js";
const parentWindow = window.parent;

const stagesImg = document.querySelectorAll(".fancybox-gallery img");

if (stagesImg.length > 0) {
  stagesImg.forEach(img => {
    img.addEventListener("click", () => {
      parentWindow.document.body.classList.add("gallery-open");
    });
  });
}

export function fancybox() {

  Fancybox.bind("[data-fancybox]", {
    compact: false,
    idle: false,

    animated: false,
    showClass: false,
    hideClass: false,

    dragToClose: false,

    Images: {
      // Disable animation from/to thumbnail on start/close
      zoom: false,
    },
    transition: "fade", // Анимация при открытии
    on: {
      init: () => {
        lenisScroll.stop();
      },
      done: () => {
        const closeBtn = document.querySelector("[data-fancybox-close]");
        closeFancy(closeBtn);
      },
      close: (fancybox) => {
        // Отключаем анимацию только при закрытии
        fancybox.close({ animated: false });
        lenisScroll.start();
        parentWindow.document.body.classList.remove("gallery-open");
      },
    },
  });


  function closeFancy(closebtn) {
    window.addEventListener("click", (e) => {
      const target = e.target;
      if (!target.closest("img")) {
        closebtn.click();
      }
    });
  }
}
