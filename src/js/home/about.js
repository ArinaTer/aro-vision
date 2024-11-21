import {
  addClassName,
  removeClassName,
  removeClasses,
  queryMatches,
} from "../components/utils.js";

export function about() {
  const mathcesMob = queryMatches(479.98, "max");
  const matchesPlan = queryMatches(767.98, "max");

  if (!matchesPlan) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about_wrapper",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(".intro__video-wrapper", {
      scale: 0.4,
    });

    tl.to(
      ".about__title h2",
      {
        maskPosition: "45% 50%",
      },
      "<"
    );
    tl.to(
      ".about__info",
      {
        opacity: 1,
      },
      "<"
    );
  }
  if (!mathcesMob) {
    const aboutSliderContent = document.querySelector(
      ".about__slider-content"
    ).offsetHeight;

    const tl2 = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".about_wrapper",
        start: "top+=100 top",
        end: `top+=500 top`,
        scrub: true,
        // markers: true,
      },
    });
    tl2.to(".about__title", {
      maskPosition: "45% 300%",
    });
    tl2.to(
      ".about__animation",
      {
        opacity: -5,
        yPercent: !matchesPlan ? -400 : null,
      },
      "<"
    );

    const tlItems = gsap.timeline({
      scrollTrigger: {
        trigger: ".about__slider",
        start: "top+=250 top",
        end: `top+=${window.innerHeight * 2} top`,
        scrub: true,
        // markers: true,
      },
    });
    const aboutSliderItems = document.querySelectorAll(".about__slider-item");
    const aboutSliderText = document.querySelectorAll(
      ".about__slider-item__text"
    );
    const aboutSliderNumber = document.querySelectorAll(
      ".about__slider-item__number"
    );
    aboutSliderItems.forEach((el, i) => {
      tlItems.to(el, {
        y: 0,
      });

      tlItems.to(
        aboutSliderText[i],
        {
          opacity: 1,
        },
        "<"
      );
      tlItems.to(
        aboutSliderNumber[i],
        {
          maskPosition: "45% 50%",
        },
        "<"
      );
    });
  }
}
