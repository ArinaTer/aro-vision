import { queryMatches, setPropertyTo } from "../components/utils.js";
import { gallery } from "../components/gallery.js";

export function lifestyle() {
  // const BIG_MOBILE = queryMatches(767.98, "max");
  // const imgs = document.querySelectorAll(".lifestyle__masonry a");

  // gallery();
  // if (!BIG_MOBILE) {

  //   setPropertyTo({
  //     propertyName: "--title-height",
  //     propertyValue: `${document.querySelector('.lifestyle__title').offsetHeight}px`,
  //     to: document.querySelector('.lifestyle')
  //   });

  //   gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".lifestyle__title",
  //       scrub: true,
  //       start: "top 80%",
  //       end: "bottom+=200 80%",
  //       onEnter: () => {
  //         document.querySelector('.lifestyle').classList.add('gallery-show')
  //       }
  //     },
  //   })
  //     .to(".lifestyle__title", {
  //       maskPosition: "20% 40%",
  //     })

  //   gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".lifestyle__title",
  //       scrub: true,
  //       start: "top-=50 top",
  //       end: "+=250",
  //     },
  //   })
  //     .to(".lifestyle__title", {
  //       maskPosition: "20% 140%",
  //     });
  // }

  // const galleryVideos = document.querySelectorAll('.lifestyle__masonry video')


  // galleryVideos.forEach(video => {
  //   video.play();
  //   video.currentTIme = 1;
  //   video.pause();


  //   gsap.timeline({
  //     scrollTrigger: {
  //       trigger: video,
  //       start: "top-=200 bottom",
  //       end: "bottom-=200 top",
  //       onEnter: () => {
  //         video.play()
  //       },
  //       onEnterBack: () => {
  //         video.play()
  //       },
  //       onLeave: () => {
  //         video.pause()
  //       },
  //       onLeaveBack: () => {
  //         video.pause()
  //       },

  //     }
  //   })
  // })
}
