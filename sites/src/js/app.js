import { plugins } from "./components/plugins.js";
import { lenis } from "./components/lenis.js";
import { effects } from "./components/effects.js";
import { intro } from "./sections/intro.js";
import { fancybox } from "./components/fancybox.js";
import { videoControl } from "./components/videoControl.js";
import { arrowButton } from "./components/arrowBtn.js";
import { bestCollectionsSwiper } from "./components/bestCollectionsSwiper.js";

import forWorkPage from "./sections/for-work-page.js";
import showWorkClickHandler from "./sections/showWorkClickHandler.js";
import tapAnimation from "./components/tapAnimation.js";
import { preloader } from "./components/preloader.js";

window.addEventListener("DOMContentLoaded", () => {
  plugins();
  setTimeout(() => {
    preloader();
  }, 700);
  lenis();
  forWorkPage();
  showWorkClickHandler();
  fancybox();
  tapAnimation();

  effects();
  arrowButton();
  bestCollectionsSwiper();
  intro();
  videoControl();
});
window.addEventListener("next-work", (params) => {
  /**
   * * тут раскомментировать
   */
  intro();

});

window.addEventListener("load", () => {
  document.body.classList.add("remove-skeleton");
});

window.parent.addEventListener("work-page-ready", () => {
  setTimeout(() => {
    document.body.classList.add("btn-scrollDown")
  }, 3000);
});

//disable context menu
document.addEventListener('contextmenu', event => {
  event.preventDefault();
});