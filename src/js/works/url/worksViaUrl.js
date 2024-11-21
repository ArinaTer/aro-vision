import { addClassName, dispatchCustomEvent, removeClassName, COMMON_MEDIA_QUERIES } from "../../components/utils.js";
import closeWorkPageLoaderAni from "../components/closeWorkPageLoaderAni.js";
import insertIframe from "../components/insertIframe.js";
import isHashValid from "./isHashValid.js";

function getWorksViaUrl() {
  const isHomePage = document.body.classList.contains("home") || document.body.classList.contains("works-page");
  if (isHomePage) {
    return function worksViaUrl(cardsSequeces) {
      const HASH = window.location.hash.slice(1);
      if (!HASH) {
        return;
      }

      /**
       * для проигрывания анимации первого блока на главной
       */
      document.documentElement.classList.add("loaded");
      document.documentElement.classList.add("loaded-one-second");
      /**
     * удаление хэша из адреса
     */
      // history.replaceState(null, null, ' ');

      addClassName(document.documentElement, 'show-work-preloader-no-transition');
      setTimeout(() => {
        addClassName(document.documentElement, 'show-work-preloader');
        removeClassName(document.documentElement, 'show-work-preloader-no-transition');
      }, 1000);

      gsap.to(window, {
        scrollTo: {
          y: '.works',
          offsetY: COMMON_MEDIA_QUERIES.MOBILE ? 60 : 0,
        },
      });
      if (isHashValid(cardsSequeces, HASH)) {
        let currentIframe = document.querySelector(".works-iframes__iframe_1");
        addClassName(currentIframe);
        insertIframe(currentIframe, HASH);
        dispatchCustomEvent({
          el: window, event: "get-next-work", detail: {
            currentWork: HASH,
          }
        });
      } else {
        window.addEventListener('media-loaded', () => {
          document.querySelector(".preloader-work__total span").innerHTML = 100;
          closeWorkPageLoaderAni(document.querySelector(".preloader-work"));
        });
      }

    };
  } else {
    return function worksViaUrl(cardsSequeces) {
      // console.log('this fn works only in HomePage \n works sequeces:', cardsSequeces);
    };
  }
}

const worksViaUrl = getWorksViaUrl();
export default worksViaUrl;