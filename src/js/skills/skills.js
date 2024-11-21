import {
  addClassName,
  removeClassName,
  removeClasses,
  queryMatches,
  toggleClassName,
} from "../components/utils.js";

import { clearRadio } from "../components/radio.js";

export function skills() {
  const skillsBtns = document.querySelectorAll(".skills__left-item");
  const skillsContent = document.querySelectorAll(".skills__right-content");
  const skillsAnimationCard = document.querySelector(".skills__animation");
  const skillsBtnsMob = document.querySelectorAll(".skills-mob__head");
  const skillsItems = document.querySelectorAll(".skills-mob__item");
  const skillsWrap = document.querySelector(".skills__left");
  const radios = document.querySelectorAll(".my-radio__item");
  const skillsScrollContent = document.querySelectorAll(
    ".skills__right .skills__right-content__wrapper"
  );
  const radiosMob = document.querySelectorAll(
    ".skills-mob__button .my-radio__item"
  );

  const isMob = queryMatches(767.97, "max");
  if (!isMob) {
    skillsBtns.forEach((el, i) => {
      // ScrollTrigger.refresh(true);
      el.addEventListener("click", () => {
        addClassName(skillsAnimationCard);
        removeClasses(skillsBtns);
        removeClasses(skillsContent);
        addClassName(el);
        addClassName(skillsContent[i]);
        gsap.to(skillsScrollContent[i], {
          duration: 0,
          scrollTo: { y: 0 },
        });
        setTimeout(() => {
          removeClassName(skillsAnimationCard);
        }, 300);

        skillsWrap.style.pointerEvents = "none";
        setTimeout(() => {
          skillsWrap.style.pointerEvents = "";
        }, 1000);

        clearRadio();
        radios[i].click();
      });
    });

    const scrollContent = document.querySelectorAll(
      ".skills__right-content__wrapper"
    );
    const scrollWrapper = document.querySelectorAll(".skills__right-content");
    scrollContent.forEach((el, i) => {
      const tlTextScroll = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top+=10 top",
          end: "top+=10 top",
          scroller: el,
          // markers: true,
          onEnter: () => {
            addClassName(scrollWrapper[i], "show-skills-before");
          },
          onEnterBack: () => {
            removeClassName(scrollWrapper[i], "show-skills-before");
          },
        },
      });
    });
  } else {
    skillsBtnsMob.forEach((el, i) => {
      let isOpen = false;
      el.addEventListener("click", () => {
        if (!isOpen) {
          radioBtnMob(document.querySelectorAll(".my-radio__item-mob")[i]);
          isOpen = true;
        } else {
          clearBtnMob(document.querySelectorAll(".my-radio__item-mob")[i]);
          isOpen = false;
        }
        toggleClassName(skillsItems[i], "skills-open-card");
        el.style.cssText = "pointer-events:none";
        setTimeout(() => {
          el.style.cssText = "pointer-events:auto";
        }, 800);
      });
    });

    function radioBtnMob(radio) {
      let svg = radio.querySelector("svg");
      gsap.to(svg, {
        keyframes: [
          {
            "--top-y": "6px",
            "--top-s-x": 1,
            "--top-s-y": 1.25,
            duration: 0.2,
            delay: 0.2,
          },
          {
            "--top-y": "0px",
            "--top-s-x": 1.75,
            "--top-s-y": 1,
            duration: 0.6,
          },
        ],
      });
      gsap.to(svg, {
        keyframes: [
          {
            "--dot-y": "2px",
            duration: 0.3,
            delay: 0.2,
          },
          {
            "--dot-y": "0px",
            duration: 0.3,
          },
        ],
      });
      gsap.to(svg, {
        "--drop-y": "0px",
        duration: 0.6,
        delay: 0.4,
      });
    }
    function clearBtnMob(radio) {
      let svg = radio.querySelector("svg");
      gsap.to(svg, {
        clearProps: true,
        duration: 0,
      });
    }
  }
}
