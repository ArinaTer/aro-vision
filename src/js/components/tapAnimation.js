import { COMMON_MEDIA_QUERIES, isMobileOrTablet, wrapElements, addClassName, removeClassName } from './utils.js';
export default function tapAnimation(params) {
  const els = document.querySelectorAll('.tap-animation');
  const ACTIVE_CLASS = 'tap';
  const IS_MOB = isMobileOrTablet();

  /**
   ** use IS_MOB instead
   */


  if (!IS_MOB) {
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


