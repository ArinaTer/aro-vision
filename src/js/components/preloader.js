/**
 ** data-preload="url"
 ** data-preload-query="991.98, max"
 */
import "latest-createjs/lib/preloadjs/preloadjs.js";

import {
  queryMatches,
  setItemToSessionStorage,
  getItemFromSessionStorage,
  removeItemFromSessionStorage,
  isMobileOrTablet,
} from "./utils.js";

const animatePreloader = getAnimatePreloaderFn();

export async function preloader(cb) {
  lenisScroll.stop();

  const mediaToLoad = getSortedMediaElements();
  if (!mediaToLoad.length) {
    animatePreloader(1);
    checkHomePage();

    return;
  }
  try {
    const loadedMedia = await getLoadedMedia(getLoadMediaSrc(mediaToLoad));
    setLoadedMedia(loadedMedia, mediaToLoad);
  } catch (error) {
    animatePreloader(1);
    console.log(error);
  }
  // window.dispatchEvent(new CustomEvent("media-loaded"))
  // commonInstructions(cb);
  checkHomePage();
  // parol();
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
function validVideo() {}

function setLoadedMedia(loadedMedia, mediaToLoad) {
  mediaToLoad.forEach((node, i) => {
    const nodeType = node.tagName;
    node.src = loadedMedia[`${i}-${nodeType}`];
  });
  if (!document.body.classList.contains("home")) {
    setTimeout(() => {
      document.documentElement.classList.add("loaded");
      document.documentElement.classList.remove("loading");
    }, 500);
  }
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
  // const preloaderProgressbar = document.querySelector('.preloader__progressbar');
  const preloaderTotal = document.querySelector(".preloader__total span");
  if (preloaderTotal) {
    return function animatePreloader(value) {
      let path = value * 100;
      preloaderTotal.innerHTML = Math.floor(value * 100);
    };
  } else {
    return function animatePreloader(value) {
      console.log(value);
    };
  }
}

/**
 * cb функция должна реализовывать это - document.documentElement.classList.add("loaded");
 */
function commonInstructions(cb) {
  setTimeout(() => {
    document.documentElement.classList.add("loaded");
    setTimeout(() => {
      document.documentElement.classList.add("loaded-one-second");
      lenisScroll.start();
    }, 1200);
    dispatchEvent(new Event("media-loaded"));
    if (typeof cb === "function") {
      cb();
    } else {
      // document.body.style.overflow = '';
      setTimeout(() => {}, 1200);

      ScrollTrigger.refresh(true);
    }
  }, 500);

  validVideo();
}

let isCorrectParol = false;
function parol() {
  document.querySelector(".parol__submit").addEventListener("click", () => {
    parolCode();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (!isCorrectParol) {
        parolCode();
        // console.log("work");
      }
    }
  });
}

function parolCode() {
  const correctPassword = "9@i#7Nl8";
  const userPassword = document.querySelector(".parol__inputr").value.trim();
  if (userPassword === correctPassword) {
    // console.log("corrext");
    commonInstructions();
    setTimeout(() => {
      document.documentElement.classList.add("loaded");
      document.documentElement.classList.remove("loading");
    }, 500);
    document.querySelector(".parol").style.cssText = "display:none";
    setItemToSessionStorage("parolActive", true);
    document.querySelector(".parol__text").classList.remove("active");
    isCorrectParol = true;
    if (isMobileOrTablet()) {
      gsap.to(window, {
        scrollTo: {
          y: 0,
        },
      });
    }
  } else {
    document.querySelector(".parol__text").classList.add("active");
  }
}

function checkHomePage() {
  if (
    !document.body.classList.contains("home") ||
    getItemFromSessionStorage("parolActive")
  ) {
    commonInstructions();
  } else {
    document.querySelector(".parol").style.cssText = "display:block";

    parol();
  }
}
