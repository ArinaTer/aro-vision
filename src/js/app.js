import { plugins } from "./components/plugins.js";
import { lenis } from "./components/lenis.js";
import { header } from "./components/header.js";
import { intro } from "./home/intro.js";
import { about } from "./home/about.js";
import { directions } from "./home/directions.js";
import { footer } from "./components/footer.js";
import { preloader } from "./components/preloader.js";
import { imagination } from "./about/imagination.js";
import works from "./works/index.js";
import { specialists } from "./about/specialists.js";
import { lifestyle } from "./about/lifestyle.js";
import { skills } from "./skills/skills.js";
import { cursor } from "./components/cursor.js";
import { arrowButton } from "./components/arrowBtn.js";
import { careerViewBtn } from "./career/careerViewBtn.js";
import { career } from "./career/career.js";
import { headerScrollTo } from "./components/headerScrollTo.js";
import tapAnimation from "./components/tapAnimation.js";
import { fancyRadioBtns } from "./components/radio.js";
import { popups } from "./components/popup.js";
import { headerHide } from "./components/headerHide.js";
import { myCheckbox } from "./components/checkbox.js";
import { cookie } from "./components/cookie.js";

import { popupVideo } from "./components/popupVideo.js";
import cards from "./works/cards.js";
import infoWorksAni from "./works/animations/info.js";
import drowdownInner from "./works/components/drowdownInner.js";
import drowdownMain from "./works/components/drowdownMain.js";
import cardsAni from "./works/animations/cards.js";
import { directionLinks } from "./home/directionLinks.js";
import { directionLinksImport } from "./skills/directionLinksImport.js";
import { isMobileOrTablet, addClassName } from "./components/utils.js";

window.addEventListener("onbeforeunload", function () {
  window.scrollTo(0, 0);
  gsap.to(window, { duration: 0, scrollTo: 0 });
});
window.addEventListener("unload", function () {
  window.scrollTo(0, 0);
  gsap.to(window, { duration: 0, scrollTo: 0 });
});
window.addEventListener("DOMContentLoaded", () => {
  isMobileOrTablet()
    ? addClassName(document.documentElement, "mob-device")
    : null;
  plugins();
  if (document.body.classList.contains("skills-page")) {
    window.lenisScroll = {
      stop() {},
      start() {},
    };
  } else {
    lenis();
  }
  //
  preloader();
  header();
  arrowButton();
  headerScrollTo();
  headerHide();
  if (document.body.classList.contains("home")) {
    intro();
    directions();
    about();
    infoWorksAni();
    works();
    cardsAni();
    drowdownMain();
    cursor();
    popupVideo();
    directionLinks();
  } else if (document.body.classList.contains("about-page")) {
    imagination();
    specialists();
    lifestyle();
    fancyRadioBtns();
  } else if (document.body.classList.contains("skills-page")) {
    directionLinksImport();
    cards();
    skills();
    fancyRadioBtns();
  } else if (document.body.classList.contains("career-page")) {
    career();
    careerViewBtn();
  } else if (document.body.classList.contains("works-page")) {
    works();
    drowdownInner();
    cardsAni();
  }
  tapAnimation();
  footer();
  popups();
  myCheckbox();
  cookie();

  if (document.body.classList.contains("terms")) {
    const siteURL = document.querySelector(".site-url");
    siteURL.innerHTML = window.location.origin;
    siteURL.setAttribute("href", window.location.origin);
  }
});

//disable context menu
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});
