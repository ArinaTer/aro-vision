import { removeClassName, addClassName, dispatchCustomEvent } from "../components/utils.js";
import getFilterCardsFn from "./components/filterCards.js";
import rearrangeCards from "./components/rearrangeCards.js";
import getCardsSequences from "./components/getCardsSequences.js";
import getNextWork from "./components/getNextWork.js";
import showProject from "./components/showProject.js";
import removeIframe from "./components/removeIframe.js";
import insertIframe from "./components/insertIframe.js";
import clearWorksHistory from "./components/history/clearWorksHistory.js";
import collectWorksHistory from "./components/history/collectWorksHistory.js";
import worksViaUrl from "./url/worksViaUrl.js";
import closeWorkPageLoaderAni from "./components/closeWorkPageLoaderAni.js";
import setHash from "./url/setHash.js";

export default function cards() {
  const isHomePage = document.body.classList.contains("home") || document.body.classList.contains("works-page");
  /**
   * loader
   */
  let isIframeOpen = false;
  const preloaderWork = document.querySelector(".preloader-work");
  const preloaderTotal = document.querySelector(".preloader-work__total span");
  let clearLoaderCountTimeOut = null;
  /**
   * cards
   */
  const cards = [...document.querySelectorAll(`[data-work-card]`)];
  rearrangeCards(cards);
  const filterCards = getFilterCardsFn(cards);
  /**
   * cards sequeces
   */
  let cardsSequeces = getCardsSequences(cards);
  let nextWork;


  /**
   * iframes
   */
  let currentIframe = document.querySelector(".works-iframes__iframe_1");
  let nextIframe = document.querySelector(".works-iframes__iframe_2");

  /**
   * show work
   */

  if (isHomePage) {
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        firstClickHandler(card);
        setHash(card.getAttribute('data-work-name'));
      });
    });
  } else {
    document.querySelectorAll('[data-work-panel]').forEach((card) => {
      card.addEventListener("click", (e) => {
        firstClickHandler(card, (card) => {
          dispatchCustomEvent({ el: window, event: "filter-cards", detail: { activeQuery: card.getAttribute('data-work-id') } });
        });
      });
    });
  }


  /**
   * hide work
   */
  document.querySelector("[data-work-close]").addEventListener("click", (e) => {
    history.replaceState(null, null, ' ');
    clearWorksHistory();
    lenisScroll.start();
    removeClassName(document.documentElement, "show-iframe");
    addClassName(document.documentElement, "show-work-preloader");
    addClassName(document.documentElement, "pointer-none");
    setTimeout(() => {
      removeClassName(document.documentElement, "show-work-preloader");
      addClassName(document.documentElement, "work-preloader-hide");
      setTimeout(() => {
        removeClassName(document.documentElement, "pointer-none");
        removeClassName(document.documentElement, "work-preloader-hide");
        removeClassName(preloaderWork, "hide");
        isIframeOpen = false;
      }, 700);
    }, 700);

    setTimeout(() => {
      removeIframe(currentIframe);
      removeIframe(nextIframe);
    }, 700);
  });

  /**
   * event listeners
   */
  window.addEventListener("preload-next-work", (e) => {
    const currentWork = !e.detail?.currentWork
      ? nextWork
      : e.detail.currentWork;
    isIframeOpen = !e.detail.isClicked;
    if (!isIframeOpen) {
      removeClassName(preloaderWork, "hide");
    }
    insertIframe(nextIframe, currentWork);
    dispatchCustomEvent({
      el: window, event: "get-next-work", detail: {
        currentWork: currentWork,
      }
    });
  });

  window.addEventListener("show-next-work", (e) => {
    setHash(nextIframe.querySelector('iframe').getAttribute('data-work-current'));
    !e.detail?.isCollect ? collectWorksHistory(currentIframe.querySelector('iframe').getAttribute('data-work-current')) : null;
    removeClassName(currentIframe);
    addClassName(nextIframe);
    removeIframe(currentIframe);
    [currentIframe, nextIframe] = [nextIframe, currentIframe];
  });
  window.addEventListener("work-page-ready", (e) => {
    if (!isIframeOpen) {
      isIframeOpen = true;
      addClassName(document.documentElement, "show-iframe");
      closeWorkPageLoaderAni(preloaderWork);
      clearTimeout(clearLoaderCountTimeOut);
      clearLoaderCountTimeOut = setTimeout(() => {
        preloaderTotal.innerHTML = 0;
      }, (1500 + 750));
    }
  });
  window.addEventListener("filter-cards", (e) => {
    const filteredCards = filterCards(cards, e.detail.activeQuery);
    rearrangeCards(filteredCards);
    cardsSequeces = getCardsSequences(filteredCards);
  });
  window.addEventListener("get-next-work", (e) => {
    nextWork = getNextWork({
      cardsSequeces,
      currentWork: e.detail.currentWork
    });
  });
  function firstClickHandler(card, cb = (card) => { }) {
    clearWorksHistory();
    setTimeout(() => {
      lenisScroll.stop();
    }, 700);
    showProject(card, currentIframe);
    addClassName(document.documentElement, "pointer-none");
    cb(card);
    dispatchCustomEvent({
      el: window, event: "get-next-work", detail: {
        currentWork: card.getAttribute("data-work-name"),
      }
    });
  }
  /**
  * for handle url hash
  */
  worksViaUrl(cardsSequeces);
}