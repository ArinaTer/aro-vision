export default function titleAni() {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.works__title',
      start: `top-=100 top`,
      end: `+=400`,
      scrub: true,
      // markers: true
    }
  }).to('.works__title h2', { maskPosition: '30% 150%' });
};
