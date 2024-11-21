import {
  addClassName,
  removeClassName,
  removeClasses,
  queryMatches,
  isMobileOrTablet,
} from "../components/utils.js";
export function popupVideo() {
  // const matches = queryMatches(479.98, "max");
  const matches = queryMatches(768.98, "max");
  // Получение DOM элементов

  const getEl = (selector) => document.querySelector(selector);

  const videoWrapper = getEl(".popup-video");
  const videoOpenBtn = getEl(".intro__video video");
  const popupCloseBtn = getEl(".popup-video__close");
  const inputActiveLine = getEl(".popup-video__active-line");
  const video = getEl(".popup-video__content");
  const playVideoBtn = getEl(".popup-video__play-play");
  const pauseVideoBtn = getEl(".popup-video__play-pause");
  const header = getEl(".header");
  const soundBtnOn = getEl(".popup-video__sound-on");
  const soundBtnOff = getEl(".popup-video__sound-off");
  const soundInputRange = getEl(".popup-video__sound-input-range");
  const soundInputActive = getEl(".popup-video__sound-active-line");
  const rangeInput = getEl(".popup-video__input");
  const portrait = document.querySelector(".portrait");
  const bodyShadow = document.querySelector(".shadow-body");

  const introWrapper = document.querySelector(".intro");
  const introVideoContent = document.querySelector(".intro__video-content");
  const videoLoaderLine = document.querySelector(
    ".popup-video__active-line_loader"
  );
  const videoPauseBtn = document.querySelector(".popup-video__pause");
  const videoShadow = document.querySelector(".popup-video__shadow");
  const tl = gsap.timeline();

  const durationVideo = 182.314667;
  // console.log(video);
  // console.log(video.duration);

  tl.to(
    inputActiveLine,
    {
      width: "100%",
      duration: durationVideo,
      ease: "none",
      onComplete: () => {
        tl.restart();
        video.currentTime = 0;
      },
    },
    "<"
  );

  // console.log(video.duration);
  let isPlaying = false;
  let isOpenVideo = false;
  let onePercentVideo = durationVideo / 100;
  let prevVolume = 20;

  tl.pause();
  video.currentTime = 0;
  video.pause();
  // gsap.timeline

  const toggleClass = (el, className) => el.classList.toggle(className);
  const addClass = (el, className = "active") => el.classList.add(className);
  const removeClass = (el, className = "active") =>
    el.classList.remove(className);

  // Открытие попапа
  videoOpenBtn.addEventListener("click", () => {
    lenisScroll.stop();
    addClass(videoWrapper);
    addClass(header, "popup-video-open");
    addClass(portrait);
    addClass(bodyShadow);
    addClass(introWrapper, "hide-for-open-video-popup");
    isOpenVideo = true;
    tl.play();
    tl.progress(0);
    video.currentTime = 0;
    video.play();

    // console.log(isOpenVideo);
  });

  introVideoContent.addEventListener("click", () => {
    video.play();
    addClass(pauseVideoBtn);
    removeClass(playVideoBtn);
    isPlaying = true;
    removeClassName(videoPauseBtn);
  });

  // Закрытие попапа
  popupCloseBtn.addEventListener("click", () => {
    lenisScroll.start();
    removeClass(videoWrapper);
    video.pause();
    addClass(playVideoBtn);
    removeClass(pauseVideoBtn);
    removeClassName(header, "popup-video-open");
    removeClassName(portrait);
    removeClassName(bodyShadow);
    removeClassName(introWrapper, "hide-for-open-video-popup");
    removeClassName(videoShadow);
    video.currentTime = 0;
    video.pause();
    isPlaying = false;
    isOpenVideo = false;
    tl.progress(0);
    tl.pause();
  });

  document.addEventListener("keydown", function (event) {
    if (isOpenVideo) {
      if (event.key === "Escape" || event.keyCode === 27) {
        event.preventDefault();
        lenisScroll.start();
        removeClass(videoWrapper);
        video.pause();
        addClass(playVideoBtn);
        removeClass(pauseVideoBtn);
        removeClassName(header, "popup-video-open");
        removeClassName(portrait);
        removeClassName(bodyShadow);
        removeClassName(introWrapper, "hide-for-open-video-popup");
        removeClassName(videoShadow);
        video.currentTime = 0;
        isPlaying = false;
        isOpenVideo = false;
        tl.progress(0);
        tl.pause();
      }
    }
  });

  // Управление воспроизведением видео
  const togglePlayPause = () => {
    if (isPlaying) {
      video.pause();
      addClass(playVideoBtn);
      removeClass(pauseVideoBtn);
      addClassName(videoPauseBtn);
      addClassName(videoShadow);
      tl.pause();
    } else {
      video.play();
      addClass(pauseVideoBtn);
      removeClass(playVideoBtn);
      removeClassName(videoPauseBtn);
      removeClassName(videoShadow);
      tl.play();
    }
    isPlaying = !isPlaying;
  };
  document.addEventListener("keydown", function (event) {
    // Проверяем, что нажата клавиша пробел
    if (isOpenVideo) {
      if (event.key === " " || event.keyCode === 32) {
        if (isPlaying) {
          video.pause();
          addClass(playVideoBtn);
          removeClass(pauseVideoBtn);
          addClassName(videoPauseBtn);
          addClassName(videoShadow);
          tl.pause();
        } else {
          video.play();
          addClass(pauseVideoBtn);
          removeClass(playVideoBtn);
          removeClassName(videoPauseBtn);
          removeClassName(videoShadow);
          tl.play();
        }
        isPlaying = !isPlaying;
      }
    }
  });

  playVideoBtn.addEventListener("click", togglePlayPause);
  pauseVideoBtn.addEventListener("click", togglePlayPause);
  video.addEventListener("click", togglePlayPause);

  // Обновление времени видео
  rangeInput.addEventListener("input", () => {
    // video.pause();

    const value = rangeInput.value;
    video.currentTime = onePercentVideo * value;

    tl.progress(value / 100).pause();
    setTimeout(() => {
      tl.play();
    }, 100);
    tl.play();
  });

  video.addEventListener("timeupdate", () => {
    const value = (video.currentTime * 100) / video.duration;
  });

  // Управление звуком

  video.volume = prevVolume / 100;
  soundInputRange.value = prevVolume;

  const toggleMute = () => {
    video.muted = !video.muted;
    toggleClass(soundBtnOn, "active");
    toggleClass(soundBtnOff, "active");
    soundInputRange.value = video.muted ? 0 : prevVolume;
    soundInputActive.style.width = `${soundInputRange.value}%`;
  };

  soundBtnOn.addEventListener("click", toggleMute);
  soundBtnOff.addEventListener("click", toggleMute);

  soundInputRange.addEventListener("input", () => {
    const value = soundInputRange.value;
    video.volume = value / 100;
    prevVolume = value;
    soundInputActive.style.width = `${value}%`;

    if (value <= 5) {
      video.muted = true;
      addClass(soundBtnOff);
      removeClass(soundBtnOn);
    } else {
      video.muted = false;
      addClass(soundBtnOn);
      removeClass(soundBtnOff);
    }
  });

  if (matches) {
    const logo = document.querySelector(".preloader__logo");
    window.addEventListener("media-loaded", () => {
      setTimeout(() => {
        logo.style.cssText = "display:none";
      }, 2000);
    });
    const controlBar = document.querySelector(".popup-video__control");
    const closeBtn = document.querySelector(".popup-video__close");
    const soundBtn = document.querySelector(".popup-video__sound");
    const inputRange = document.querySelector(".popup-video__bar");
    const playBtn = document.querySelector(".popup-video__play");

    soundBtn.style.cssText = "display:none";
    function verPostion() {
      const bottomHeight = (window.innerHeight - window.innerWidth / 1.78) / 2;
      video.style.cssText = `width:${window.innerWidth}px;height:${
        window.innerWidth / 1.78
      }px`;
      controlBar.style.cssText = `bottom:${bottomHeight}px`;
      closeBtn.style.cssText = `top:${bottomHeight - 60}px;left:15px`;
    }
    function gorPostion() {
      video.style.cssText = `width:100%;height:100%`;
      controlBar.style.cssText = `bottom:0px !important`;
      closeBtn.style.cssText = `top:15px;left:15px !important`;
      inputRange.style.cssText =
        "bottom:0px !important; top:auto; width:100% !important;";
      playBtn.style.cssText = "left: 20px !important;";
    }

    verPostion();

    window.addEventListener("orientationchange", (e) => {
      const isPortraint = window.matchMedia("(orientation: portrait)").matches;
      if (isPortraint) {
        gorPostion();
      } else {
        setTimeout(() => {
          verPostion();
        }, 100);
      }
    });
  }

  function videoLoading() {
    const loadingIcon = document.querySelector(".popup-video__loader");
    function showLoadingIcon() {
      loadingIcon.style.display = "block";
      tl.pause();
    }
    function hideLoadingIcon() {
      loadingIcon.style.display = "none";
      tl.play();
    }
    video.addEventListener("waiting", showLoadingIcon);
    video.addEventListener("canplay", hideLoadingIcon);
    video.addEventListener("playing", hideLoadingIcon);
    video.addEventListener("seeking", showLoadingIcon);
    video.addEventListener("seeked", hideLoadingIcon);
    video.addEventListener("ended", hideLoadingIcon);
    video.addEventListener("pause", () => {
      tl.pause();
    });
  }
  video.addEventListener("progress", () => {
    if (video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      // console.log(`bufferedEnd:${bufferedEnd}`);
      const duration = video.duration;
      if (duration > 0) {
        const percent = (bufferedEnd / duration) * 100;
        if (percent > 90) {
          videoLoaderLine.style.cssText = `width:${100}%`;
        } else {
          videoLoaderLine.style.cssText = `width:${percent}%`;
        }
        // console.log(`percent:${percent}`);
      }
    }
  });

  videoLoading();
}
