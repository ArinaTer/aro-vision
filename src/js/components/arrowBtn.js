import { isMobileOrTablet } from "./utils.js";
export function arrowButton() {
  const arrowWrapper = document.querySelectorAll(".arrow-btn__wrapper");
  const arrowContainer = document.querySelectorAll(".arrow-btn__container");
  const arrowBtn = document.querySelectorAll(".arrow-btn");
  const isMob = isMobileOrTablet();

  if (!isMob) {
    arrowWrapper.forEach((el, i) => {
      arrowWrapper[i].addEventListener("mousemove", (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        gsap.to(arrowBtn[i], {
          y: Math.min(Math.max(y, 20), 44) - arrowBtn[i].offsetHeight / 2,
          x: Math.min(Math.max(x, 80), 112) - arrowBtn[i].offsetWidth / 2,
          duration: 0.5,
        });
      });

      arrowWrapper[i].addEventListener("mouseleave", () => {
        gsap.to(arrowBtn[i], {
          x: 0,
          y: 0,
          duration: 0.5,
        });
        gsap.to(arrowContainer[i], {
          scale: 1,
          duration: 0.5,
        });
        gsap.to(arrowBtn[i], {
          scale: 1,
          duration: 0.5,
        });
      });
      arrowWrapper[i].addEventListener("mouseenter", () => {
        gsap.to(arrowContainer[i], {
          scale: 1.5,
          duration: 0.5,
        });
        gsap.to(arrowBtn[i], {
          scale: 0.7,
          duration: 0.5,
        });
      });
    });
  }
}
