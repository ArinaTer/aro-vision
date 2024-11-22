import Lenis from "@studio-freight/lenis";

export function lenis() {
    window.lenisScroll = new Lenis({
        lerp: 0.1,
        normalizeWheel: true,
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
    });

    lenisScroll.on("scroll", ScrollTrigger.update);

    const scrollFn = (time) => {
        lenisScroll.raf(time);
        requestAnimationFrame(scrollFn);
    };

    requestAnimationFrame(scrollFn);

}