export default function toNextBlock() {
  if (!document.querySelector('.direction')) {
    return;
  }
  gsap.timeline({
    scrollTrigger: {
      trigger: '.direction',
      start: `top bottom-=20%`,
      end: `+=${window.innerHeight * 0.75}`,
      // markers: true,
      scrub: true,
    }
  })
    .from('.direction', { y: window.innerHeight * 0.3 })
    .from('.direction__title', { maskPosition: '30% -65%' }, '<-30%')
    .to('.works__black', { opacity: 1 }, '<');
};

