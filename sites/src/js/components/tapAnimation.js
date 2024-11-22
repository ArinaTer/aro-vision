import { COMMON_MEDIA_QUERIES, isMobileOrTablet, addClassName, removeClassName } from './utils.js';
export default function tapAnimation() {
  const els = document.querySelectorAll('.tap-animation');
  const ACTIVE_CLASS = 'tap';
  // const isTouchDevice = isMobileOrTablet();

  /**
   ** use isTouchDevice instead
   */


  if (!COMMON_MEDIA_QUERIES.MOBILE) {
    els.forEach(el => {
      el.addEventListener("mousedown", (e) => {
        onTapDown(el);
      });
      el.addEventListener("mouseup", (e) => {
        onTapOut(el);
      });
    });
  } else {
    els.forEach(el => {
      el.addEventListener("touchstart", (e) => {
        onTapDown(el);
      });
      el.addEventListener("touchend", (e) => {
        onTapOut(el);
      });
    });
  }

  function onTapDown(el) {
    addClassName(el, ACTIVE_CLASS);
  }
  function onTapOut(el) {
    removeClassName(el, ACTIVE_CLASS);
  }
};


