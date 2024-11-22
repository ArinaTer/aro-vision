/**
 ** data-preload="url"
 ** data-preload-query="991.98, max"
 */
import "latest-createjs/lib/preloadjs/preloadjs.js";

import { queryMatches, dispatchCustomEvent } from "./utils.js";

const animatePreloader = getAnimatePreloaderFn();


export async function preloader() {
  const mediaToLoad = getSortedMediaElements();
  if (!mediaToLoad.length) {
    animatePreloader(1);
    dispatchCustomEvent({ el: window.parent, event: 'work-page-ready' });
    dispatchCustomEvent({ el: window, event: 'work-page-ready-local' });
    return;
  }
  try {
    const loadedMedia = await getLoadedMedia(getLoadMediaSrc(mediaToLoad));
    setLoadedMedia(loadedMedia, mediaToLoad);

  } catch (error) {
    animatePreloader(1);
    console.log(error);
  }
  dispatchCustomEvent({ el: window.parent, event: 'work-page-ready' });
  dispatchCustomEvent({ el: window, event: 'work-page-ready-local' });
  // console.log("work loader")
}

async function getLoadedMedia(obj) {
  return new Promise((resolve, reject) => {
    const queue = new createjs.LoadQueue(true, null, true);

    queue.on("progress", async (e) => {
      animatePreloader(e.loaded);
    });

    queue.on("complete", () => {
      const urls = obj.reduce((acc, img) => {
        acc[img.id] = URL.createObjectURL(queue.getResult(img.id, true));
        return acc;
      }, {});
      resolve(urls);
    });
    queue.on("error", (error) => {
      reject(error);
    });
    queue.loadManifest(obj);
  });
}

/**
 * untouchable fns
 */
function getSortedMediaElements() {
  const mediaElements = [...document.querySelectorAll("[data-preload]")];
  if (!mediaElements.length) {
    return [];
  }

  const trash = [];
  const sortedMediaElements = mediaElements.filter((mediaElement) => {
    const mediaQuery = mediaElement.getAttribute("data-preload-query");
    if (mediaQuery) {
      const [viewport, constraint] = mediaQuery
        .split(",")
        .map((el) => el.trim());
      const matches = queryMatches(viewport, constraint);
      !matches ? trash.push(mediaElement) : null;
      return matches;
    }
    return true;
  });

  trash.forEach((el) => (el.style.display = "none"));

  return sortedMediaElements;
}

// Script for SAFARI Mobile
function validVideo() { }

function setLoadedMedia(loadedMedia, mediaToLoad) {
  mediaToLoad.forEach((node, i) => {
    const nodeType = node.tagName;
    node.src = loadedMedia[`${i}-${nodeType}`];
  });

  // setTimeout(() => {
  //   document.documentElement.classList.add("loaded");
  //   document.documentElement.classList.remove("loading");
  // }, 500);
}

function getLoadMediaSrc(medias) {
  const res = medias.map((item, i) => {
    const nodeType = item.tagName;
    return new createjs.LoadItem().set({
      id: `${i}-${nodeType}`,
      src: item.getAttribute("data-preload"),
      type: createjs.AbstractLoader.BLOB,
    });
  });
  return res;
}

function getAnimatePreloaderFn() {
  const PARENT_DOCUMENT = window.parent.document;
  const preloaderTotal = PARENT_DOCUMENT.querySelector(".preloader-work__total span");
  const isPreloadOnTrigger = JSON.parse(sessionStorage.getItem('isPreloadOnTrigger'));
  sessionStorage.removeItem('isPreloadOnTrigger')
  if (preloaderTotal && !isPreloadOnTrigger) {
    // preloaderTotal.innerHTML = 0;
    // preloaderCover.style.cssText = `transform: translateX(${0}%)`;

    return function animatePreloader(value) {
      // console.log(value);
      let path = value * 100;
      preloaderTotal.innerHTML = Math.floor(value * 100);
    };
  } else {
    return function animatePreloader(value) {
      // console.log(value);
    };
  }
}
