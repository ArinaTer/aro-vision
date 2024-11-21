import { queryMatches, setPropertyTo } from "../components/utils.js";

export function imagination() {
  const BIG_MOBILE = queryMatches(767.98, "max");
  const LAPTOP = queryMatches(1570, 'max');
  const imaginationItem = document.querySelectorAll('.imagination__info-item')

  if (!BIG_MOBILE) {
    setPropertyTo({
      propertyName: "--title-height",
      propertyValue: `${document.querySelector('.imagination__title').offsetHeight}px`,
      to: document.querySelector('.imagination')
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".imagination",
        start: `top top`,
        end: `top${LAPTOP ? '+=1000' : '+=1150'}  top`,
        scrub: true,
      },
    });
    tl.to(".imagination__title", {
      maskPosition: `50% 250%`,
      duration: 1,
      delay: 0,
    });
  }


  gsap.utils.toArray(".anim-counter").forEach(function (el, i) {

    var tlCounter = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top-=100% bottom",
        end: "50% top",
        onEnter: () => {
          tlCounter.play();
          gsap.to(imaginationItem[i], { y: 0, opacity: 1, duration: 1 })
        },
        onEnterBack: () => {
          tlCounter.play();
        },
      },
    });


    let target = { val: 0 };
    tlCounter.to(target, {
      val: el.getAttribute("data-number"),
      duration: 2,
      delay: 0,
      onUpdate: function () {
        el.innerText = target.val.toFixed(0);
      },
      onComplete: () => {
        el.classList.add("done");
      },
    },
      0
    );
  });
}