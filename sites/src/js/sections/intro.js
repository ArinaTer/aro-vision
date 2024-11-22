import { dispatchCustomEvent } from '../components/utils.js';

export function intro() {
    let mmIntro = gsap.matchMedia();

    document.querySelectorAll(".scroll-down__link").forEach(link => {
        link.addEventListener("click", () => {
            if (link.closest('.intro-first')) {
                let scrollPercentage = 80;
                let scrollAmount = (window.innerHeight * scrollPercentage) / 100;
                let scrollPosition = window.scrollY + scrollAmount;

                gsap.to(window, { duration: 1, scrollTo: scrollPosition });
            } else {
                let scrollPosition = document.body.scrollHeight - window.innerHeight;

                gsap.to(window, { duration: 1, scrollTo: scrollPosition });
            }
        });
    });


    const introBtnPrev = document.querySelector(".intro__bg-btn-prev");
    const introBtnNext = document.querySelector(".intro__bg-btn-next");
    const introSecond = document.querySelector(".intro-second");

    function scrollToBottomAndToggleClasses(addClass, removeClass) {
        if (isScrolledToBottom()) {
            introSecond.classList.add(addClass);
            introSecond.classList.remove(removeClass);
            return;
        }

        const startScrollY = window.scrollY;
        const endScrollY = document.body.scrollHeight - window.innerHeight;
        const distance = endScrollY - startScrollY;
        const duration = 800;
        const startTime = performance.now();

        function scrollAnimation(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const ease = easeOutQuart(progress);

            window.scrollTo(0, startScrollY + distance * ease);

            if (elapsedTime < duration) {
                requestAnimationFrame(scrollAnimation);
            } else {
                introSecond.classList.add(addClass);
                introSecond.classList.remove(removeClass);
            }
        }

        function easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
        }

        requestAnimationFrame(scrollAnimation);
    }

    function isScrolledToBottom() {
        return (window.innerHeight + window.scrollY) >= document.body.scrollHeight;
    }


    introBtnNext.addEventListener("click", () => {
        scrollToBottomAndToggleClasses("introNext");
    });



    mmIntro.add("(max-width: 4000px) and (min-width: 767.99px)", () => {


        let tlIntro = gsap.timeline({
            scrollTrigger: {
                trigger: ".intro-second",
                start: "top 30%",
                end: "bottom bottom",
                scrub: 2,
                // markers: true
            },
            onComplete: () => {
            }
        });

        tlIntro.to(".intro__container", {
            clipPath: "inset(10% 15% round 18px)",
            ease: "power2.out",
        });

        tlIntro.to(".intro__img", {
            scale: 1.1,
            ease: "power2.out",
        }, "<");
    });
    mmIntro.add("(max-width: 767.98px) and (min-width: 320px)", () => {

        let tlIntro = gsap.timeline({
            scrollTrigger: {
                trigger: ".intro-second",
                start: "top 30%",
                end: "bottom bottom",
                scrub: 2,
                // markers: true
            },
            onComplete: () => {
            }
        });

        tlIntro.to(".intro__container", {
            clipPath: "inset(15% 10% round 0px)",
        });


        tlIntro.to(".intro__img", {
            scale: 1.1,
        }, "<");

    });




    window.parent.addEventListener("show-next-work", (e) => {
        if (e.detail.isNextBtn) {
            console.log('play animation');
            document.body.classList.remove("upscaleIntro")
            document.body.classList.remove("btn-scrollDown")
            if (window.innerWidth < 767.98) {

                gsap.fromTo(".intro-first", {
                    height: "100vh",
                    duration: 0.7,
                }, {
                    height: "43vh",
                    duration: 0.7,
                })
            }


        } else {
            console.log('static');
        }
    });
    window.parent.addEventListener("upscale-intro", (e) => {
        document.body.classList.add("upscaleIntro")
        setTimeout(() => {
            document.body.classList.add("btn-scrollDown")
        }, 1500);

    });
}
