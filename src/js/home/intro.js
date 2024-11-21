import {
  addClassName,
  removeClassName,
  removeClasses,
  queryMatches,
} from "../components/utils.js";
export function intro() {
  window.addEventListener("media-loaded", () => {});
  const mathces = queryMatches(991.98, "max");
  const mathcesMob = queryMatches(767.98, "max");
  const introBtn = document.querySelector(".intro__info-animetion .arrow-btn");
  const cursorText = document.querySelector(".intro__cursor-text");
  const parent = document.querySelector(".intro__video");
  const introCursor = document.querySelector(".intro__cursor");
  const width =
    window.innerWidth -
    (window.innerWidth * (mathces ? 50 : 66) * 2) / window.innerWidth;
  const height = window.innerHeight - 2 * 66;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro__wrapper",
      start: "top+=50 top",
      end: "bottom center",
      scrub: true,
      // markers: true,
      onLeave: () => {
        if (!mathcesMob) {
          removeClassName(introCursor, "mouse-enter");
        }
      },
      onEnterBack: () => {
        if (!mathcesMob) {
          addClassName(introCursor, "mouse-enter");
        }
      },
      onLeaveBack: () => {
        if (!mathcesMob) {
          removeClassName(introCursor, "mouse-enter");
        }
      },
    },
  });
  if (!mathcesMob) {
    tl.to(".intro__info", {
      yPercent: -200,
      alpha: 0,
    });
    tl.to(
      ".intro__text-animation",
      {
        maskPosition: "45% 200%",
      },
      "<"
    );

    tl.to(
      ".intro__video",
      {
        width: `${width}px`,
        height: `${height}px`,
        onComplete: () => {},
      },
      "<"
    );
  }

  const works = document.querySelector(".works");
  let isFirst = true;
  introBtn.addEventListener("click", () => {
    gsap.to(window, {
      delay: 0,
      duration: 1,
      scrollTo: {
        y: works,
        offsetY: window.matchMedia("(max-width:767.98px)") ? 50 : 0,
      },
      onComplete: () => {
        if (isFirst) {
          gsap.to(".works__title", { maskPosition: "30% 46%" });
          addClassName(document.querySelector(".works"), "show-ani");
          isFirst = false;
        }
      },
    });
  });
}
