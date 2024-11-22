import { dispatchCustomEvent, addClassName, removeClassName, isMobileOrTablet } from "./utils.js";

export function videoControl() {
  const videoPassiveveLines = document.querySelectorAll(
    ".video-control__bar_passive"
  );
  const videoActiveLines = document.querySelectorAll(
    ".video-control__bar_active"
  );
  const videoLoadLines = document.querySelectorAll(".video-control__bar_load");
  const videoBtnsPlay = document.querySelectorAll(".video-control__play");
  const videoBtnsPause = document.querySelectorAll(".video-control__pause");
  const videoTimes = document.querySelectorAll(".video-control__time p");
  const videos = document.querySelectorAll("[data-video]");

  const videoControlWrapper = document.querySelectorAll(".video-control");
  const stagesVideoBtn = document.querySelectorAll(".stages__video-play");

  // const videoIsLaoding = document.querySelectorAll(".popup-video__loader");

  const tls = [];

  window.addEventListener("work-page-ready-local", () => {

    const tlVideo = gsap.timeline({
      scrollTrigger: {
        trigger: ".stages",
        start: "top bottom",
        end: "top bottom+=1",
        onEnter: () => {
          runVideo();
        },
      },
    });

    function runVideo() {
      videoActiveLines.forEach((el, i) => {
        const tl = gsap.timeline();
        tl.to(el, {
          width: "100%",
          duration: videos[i].duration,
          ease: "none",
          onComplete: () => {
            tl.restart();
            videos[i].currentTime = 0;
          },
        });
        if (i !== 0) {
          tl.pause();
        }

        tls.push(tl);
        tl.pause();
      });
      const tlnew = gsap.timeline({
        scrollTrigger: {
          trigger: videos[0],
          start: "top bottom",
          end: "top bottom",
          // markers: true,
          onEnter: () => {
            tls[0].play();
            videos[0].play();
            videoIsLoad(videos[0], 0);
          },
        },
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: videos[0],
          start: "top bottom",
          end: "top bottom",
          once: true,
          // markers: true,
          onEnter: () => {
            if (isMobileOrTablet()) {
              videos.forEach((el, i) => {
                if (i !== 0) {
                  el.play()
                  el.pause()
                }
              })
            }
          },
        },
      });
    }
  });

  videos.forEach((video, i) => {
    if (i !== 0) {
      stagesVideoBtn[i].addEventListener("click", () => {
        videoIsLoad(video, i);
        setTimeout(() => {
          stagesVideoBtn[i].classList.add("first-play");
        }, 300);
      });
    }
  });

  function videoIsLoad(video, i) {
    video.addEventListener("waiting", () => {
      tls[i].pause();
      // addClassName(videoIsLaoding[i], "show");
    });
    video.addEventListener("canplay", () => {
      tls[i].play();
      // removeClassName(videoIsLaoding[i], "show");
    });
    video.addEventListener("playing", () => {
      tls[i].play();
      // removeClassName(videoIsLaoding[i], "show");
    });
    video.addEventListener("seeking", () => {
      tls[i].pause();
      // addClassName(videoIsLaoding[i], "show");
    });
    video.addEventListener("seeked", () => {
      tls[i].play();
      // removeClassName(videoIsLaoding[i], "show");
    });
    video.addEventListener("ended", () => {
      tls[i].play();
      // removeClassName(videoIsLaoding[i], "show");
    });
  }

  // console.log(tls)

  if (stagesVideoBtn.length > 0 && videoControlWrapper.length > 0) {
    stagesVideoBtn[0].classList.add("active");
    videoControlWrapper[0].classList.add("active");

    stagesVideoBtn.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        tls[i].play();
        btn.classList.add("active");
        videoControlWrapper[i].classList.add("active");
        videos[i].play();
        videoBtnsPlay[i].classList.remove("active");
        videoBtnsPause[i].classList.add("active");
      });
    });
  } else {
  }

  // перемотка видео
  videoPassiveveLines.forEach((inputRange, i) => {
    inputRange.addEventListener("input", (e) => {
      const inputRangeValue = inputRange.value;
      // videoActiveLines[i].style.cssText = `width:${inputRangeValue}%`;
      tls[i].progress(inputRangeValue / 100).pause();
      setTimeout(() => {
        tls[i].play();
      }, 100);
      videos[i].currentTime = (videos[i].duration * inputRangeValue) / 100;
      videoTimes[i].innerText = `${formatTime(videos[i].currentTime)}`;
    });
  });

  videos.forEach((video, i) => {
    // текушее время видео для линий
    video.addEventListener("timeupdate", () => {
      const value = (video.currentTime * 100) / video.duration;
      // videoActiveLines[i].style.width = `${value}%`;
      videoTimes[i].innerText = `${formatTime(video.currentTime)}`;
      // console.log("work")
    });

    // Загруженная часть видео
    video.addEventListener("progress", () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          const percent = (bufferedEnd / duration) * 100;
          videoLoadLines[i].style.width = `${percent}%`;
        }
      }
    });

    // пауза запуск видео
    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        videoBtnsPlay[i].classList.remove("active");
        videoBtnsPause[i].classList.add("active");
        stagesVideoBtn[i].classList.add("active");
        videoControlWrapper[i].classList.add("active");
        tls[i].play();
      } else {
        video.pause();
        videoBtnsPause[i].classList.remove("active");
        videoBtnsPlay[i].classList.add("active");
        stagesVideoBtn[i].classList.remove("active");
        videoControlWrapper[i].classList.remove("active");
        tls[i].pause();
      }
    });
  });

  // запускаем видео
  videoBtnsPlay.forEach((btn, i) => {
    if (i !== 0) {
      btn.classList.add("active");
    }
    btn.addEventListener("click", () => {
      tls[i].play();
      btn.classList.remove("active");
      videoBtnsPause[i].classList.add("active");
      videos[i].play();
      stagesVideoBtn[i].classList.add("active");
      videoControlWrapper[i].classList.add("active");
    });
  });

  // пазуим видео
  videoBtnsPause.forEach((btn, i) => {
    if (i === 0) {
      btn.classList.add("active");
    }
    btn.addEventListener("click", () => {
      tls[i].pause();
      videos[i].pause();
      btn.classList.remove("active");
      videoBtnsPlay[i].classList.add("active");
      stagesVideoBtn[i].classList.remove("active");
      videoControlWrapper[i].classList.remove("active");
    });
  });

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  videos[0]?.pause();

  // meta loader

  // videos.forEach((video, i) => {
  //   if (video.readyState >= 1) {
  //     if (videos.length - 1 === i) {
  //       dispatchCustomEvent({ el: window, event: "loadedMetaVideo" });
  //       // console.log("loaded video");
  //     }
  //   } else {
  //     video.addEventListener("loadedmetadata", function () {
  //       if (videos.length - 1 === i) {
  //         dispatchCustomEvent({ el: window, event: "loadedMetaVideo" });
  //         // console.log("loading video");
  //       }
  //     });
  //   }
  // });

  // loading is none
}
