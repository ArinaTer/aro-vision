import {
  addClassName,
  removeClassName,
  removeClasses,
  toggleClassName,
  queryMatches,
} from "../components/utils.js";
export function career() {
  const isMobSize = queryMatches(767.97, "max");
  const itemBtns = document.querySelectorAll(".career__item-title");
  const items = document.querySelectorAll(".career__item");
  const itemsBtnText = document.querySelectorAll(".career__item-button span p");
  const itemsWrapper = document.querySelector(".career__items");
  const itemsScrollContent = document.querySelectorAll(".career-card__right");
  const careerContent = document.querySelector(".career");
  let isOpen = false;
  let prevActiveIndex = -1;
  let itFirstClick = false;

  itemBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (!isMobSize) {
        lenisScroll.stop();
        if (isOpen && prevActiveIndex !== i) {
          removeClassName(items[prevActiveIndex], "career-card-active");
        }
        if (!isOpen || prevActiveIndex !== i) {
          itemsBtnText.forEach((el) => (el.innerHTML = "Close"));
          addClassName(items[i], "career-card-active");
          addClassName(document.querySelector(".header"), "hide-header-career");
          addClassName(document.querySelector(".footer"), "hide-footer-career");
          setTimeout(() => {
            gsap.to(window, {
              scrollTo: {
                y: items[i],
                offsetY: 0,
              },
            });
          }, 300);
          isOpen = true;
          prevActiveIndex = i;
        } else {
          itemsBtnText.forEach((el) => (el.innerHTML = "View"));
          removeClassName(
            document.querySelector(".header"),
            "hide-header-career"
          );
          removeClassName(
            document.querySelector(".footer"),
            "hide-footer-career"
          );
          removeClassName(items[i], "career-card-active");
          lenisScroll.start();
          isOpen = false;
          prevActiveIndex = -1;
        }

        itemsScrollContent.forEach((el, i) => {
          const tlTextScroll = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top+=10 top",
              end: "top+=10 top",
              scroller: el,
              onEnter: () => {
                addClassName(items[i], "career-shadow-text-show");
              },
              onEnterBack: () => {
                removeClassName(items[i], "career-shadow-text-show");
              },
            },
          });
        });
      } else {
        toggleClassName(items[i], "career-card-active");
        addClassName(careerContent, "career-active-item");
      }
    });
  });

  if (!isMobSize) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".career__wrapper",
        start: "top top",
        end: "top+=400 top",
        scrub: true,
      },
    });

    tl.to(".career__title", {
      maskPosition: "50% 200%",
    });
  } else {
    document
      .querySelectorAll(".career-card__right")
      .forEach((el) => el.removeAttribute("data-lenis-prevent"));
  }
}
