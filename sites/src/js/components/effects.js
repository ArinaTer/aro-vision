export function effects() {
  let mmEffects = gsap.matchMedia();

  mmEffects.add("(max-width: 4000px) and (min-width: 767.99px)", () => {
    const tlAnimText = gsap.utils.toArray(".gs-anim");
    tlAnimText.forEach((elem) => {
      gsap.from(elem, {
        yPercent: 100,
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: elem,
          start: "top bottom",
          end: "bottom bottom",
          // markers: true,
        },
      });
    });

    const tlAnimMore = gsap.utils.toArray(".gs-anim-more");
    tlAnimMore.forEach((elem) => {
      gsap.from(elem, {
        yPercent: 100,
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: elem,
          start: "-=200 bottom",
          end: "bottom bottom",
          // markers: true,
        },
      });
    });

    const tlAnimImg = gsap.utils.toArray(".gs-anim-img");
    tlAnimImg.forEach((elem) => {
      gsap.from(elem, {
        yPercent: 10,
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
          end: "bottom bottom",
          // markers: true,
        },
      });
    });
  });
  mmEffects.add("(max-width: 767.98px) and (min-width: 320px)", () => { 
    const tlAnimText = gsap.utils.toArray(".gs-anim");
    tlAnimText.forEach((elem) => {
      gsap.from(elem, {
        yPercent: 10,
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: elem,
          start: "top bottom",
          end: "bottom bottom",
          // markers: true,
        },
      });
    });

    const tlAnimMore = gsap.utils.toArray(".gs-anim-more");
    tlAnimMore.forEach((elem) => {
      gsap.from(elem, {
        yPercent: 10,
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: elem,
          start: "-=200 bottom",
          end: "bottom bottom",
          // markers: true,
        },
      });
    });

    const tlAnimImg = gsap.utils.toArray(".gs-anim-img");
    tlAnimImg.forEach((elem) => {
      gsap.from(elem, {
        yPercent: 10,
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
          end: "bottom bottom",
          // markers: true,
        },
      });
    });
  });
}
