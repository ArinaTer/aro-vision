import { addClassName, dispatchCustomEvent, setItemToSessionStorage } from '../components/utils.js';
import { workClickHandler } from './getworkClickHandler.js';
export default function forWorkPage() {


  handleNextWorks();
  function handleNextWorks() {
    const PARENT_WINDOW = window.parent;
    /**
     ** так как скрипт выполниться после полной загрузки, 
     ** я могу стразу задиспечить новое событие
     */
    /**
     * on load
     */

    if (sessionStorage.getItem('nextWorkInfo')) {
      const nextWorksInfo = getDataFromSessionStorage('nextWorkInfo');
      setNextWorkContent(nextWorksInfo[0]);
      drowAdviseCards(nextWorksInfo);
      playNextContentVideo(nextWorksInfo);
      preloadNextWork(PARENT_WINDOW);
      dispatchCustomEvent({ el: window, event: 'next-work' });
      window.parent.addEventListener('play-next-video', () => {
        document.querySelector('.intro__img video')?.play();
      });
    }
    else {
      console.log('there is no nextWorkInfo in sessionStorage');
    }
  }

  function preloadNextWork(parentWindow) {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.intro.intro-first',
        start: '10% top',
        end: "+=1",
        // markers: {
        //   startColor: "yellow",
        //   endColor: "yellow",
        // },
        once: true,
        onEnter: () => {
          setItemToSessionStorage('isPreloadOnTrigger', true);
          dispatchCustomEvent({ el: parentWindow, event: 'preload-next-work', detail: { isClicked: false } });
          if (!getDataFromSessionStorage('worksCollection')?.length) {
            addClassName(document.body, 'hide-prev-btn');
          }
          worksPagination(parentWindow);
        }
      }
    });
  }
  function showNextWork(parentWindow) {
    dispatchCustomEvent({
      el: parentWindow, event: 'show-next-work', detail: {
        isNextBtn: true
      }
    });
  }
  function setNextWorkContent(nextWorkInfo) {
    const nextWorkIntroMedia = document.querySelector('.intro-second .intro__img');
    const nextWorkIntroTitle = document.querySelector('.intro__bg-title');
    nextWorkIntroTitle.innerHTML = nextWorkInfo.content.title;
    nextWorkIntroMedia.innerHTML = getMediaNextWork(nextWorkInfo);
  }
  function getDataFromSessionStorage(content) {
    return JSON.parse(sessionStorage.getItem(content));
  }
  function worksPagination(parentWindow) {
    let isPreloaded = false;
    let checkIsPreloaded = null;
    parentWindow.addEventListener('work-page-ready', (params) => {
      isPreloaded = true;
    });
    document.querySelectorAll('[data-click]').forEach((el) => {
      el.addEventListener("click", (e) => {
        switch (el.getAttribute('data-click')) {
          case 'prev':
            prevWorkShowHandler(getDataFromSessionStorage('worksCollection'));
            break;
          case 'next':
            document.querySelector(".intro-second").classList.add("introNext");
            lenisScroll.stop();
            addClassName(document.body, 'no-scroll-intro2');
            dispatchCustomEvent({ el: parentWindow, event: 'upscale-intro' });
            if (isPreloaded) {
              setTimeout(() => {
                showNextWork(parentWindow);
              }, 1100);
            } else {
              setTimeout(() => {
                document.body.classList.add("add-loader")
              }, 1100);
              checkIsPreloaded = setInterval(() => {
                if (isPreloaded) {
                  clearInterval(checkIsPreloaded);
                  document.body.classList.remove("add-loader")
                  setTimeout(() => {
                    showNextWork(parentWindow);
                  }, 1100);
                }
              }, 1000);
            }
            break;
          default:
            console.log('there is no such action in showWorkOnClick');
            break;
        }
      });
    });
  }
  function drowAdviseCards(nextWorksInfo) {
    const adviseList = document.querySelector('.advise__list');
    nextWorksInfo.forEach(nextWorkContent => {
      adviseList.innerHTML +=
        `
            <div class="advise__card tap-animation">
                  <a href="#" data-work-name="${nextWorkContent.content.dataWorkName}">
                      <div class="advise__card-img">
                          ${getMediaNextWork(nextWorkContent)}
                      </div>
                      <div class="advise__card-title">
                          <h6>${nextWorkContent.content.title}</h6>
                      </div>
                      <div class="advise__card-text">
                          <span>${nextWorkContent.content.subtitle}</span>
                      </div>
                  </a>
              </div>
      `;
    });

  }
  function prevWorkShowHandler(worksCollection) {
    const last = worksCollection.pop();
    workClickHandler(last, true);
    setItemToSessionStorage('worksCollection', worksCollection);
  }
  function getMediaNextWork(nextWorkInfo) {
    let res = '';
    if (nextWorkInfo.content.isImg) {
      res = `<img src='${nextWorkInfo.content.media}' alt="">`;
    } else {
      res = `<video class="next-work-media" src="${nextWorkInfo.content.media}" loop muted playsinline></video>`;
    }
    return res;
  }
  function playNextContentVideo(nextWorkInfo) {
    const hasVideo = nextWorkInfo.some(el => !el.content.isImg);
    if (!hasVideo) return;
    gsap.timeline({
      scrollTrigger: {
        trigger: ".advise",
        start: "top bottom",
        end: "+=1",
        once: true,
        onEnter: () => {
          document.querySelectorAll('.next-work-media').forEach(video => video.play());
          dispatchCustomEvent({ el: window.parent, event: "play-next-video" });
        }
      }
    });
  }
};
