import { addClassName, removeClassName, queryMatches } from "../components/utils.js";

export function directions() {
    const direcItems = document.querySelectorAll('.direction__item');
    const directionImgs = document.querySelectorAll('.direction__img');
    const directionImgHeight = directionImgs[0].offsetHeight;
    let flag = 0;
    const UHD_SCREEN = queryMatches(2880, 'min');
    const BIG_MOBILE = queryMatches(767.98, 'max');
    const TABLET = queryMatches(991.98, 'max');

    direcItems.forEach((el, i) => {
        if (i === 0) {
            addClassName(el);
        }
        const triggerPosition = !BIG_MOBILE ? {
            start: `top-=${window.innerHeight * 0.3} ${UHD_SCREEN ? 35 : 45}%`,
            end: `bottom-=${window.innerHeight * 0.3} ${UHD_SCREEN ? 35 : 45}%`,
        } : {
            start: `top ${UHD_SCREEN ? 35 : 45}%`,
            end: `bottom ${UHD_SCREEN ? 35 : 45}%`,
        };
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                ...triggerPosition,
                // invalidateOnRefresh: true,
                // markers: true,
                onEnter: () => {
                    addClassName(el);
                },
                onEnterBack: () => {
                    addClassName(el);
                },
                onLeave: () => {
                    if (i !== direcItems.length - 1) {
                        removeClassName(el);
                    }
                },
                onLeaveBack: () => {
                    if (i !== 0) {
                        removeClassName(el);
                    }
                },

            }
        });
    });

    if (!BIG_MOBILE) {
        /**
         ** title animation
         */

        gsap.timeline({
            scrollTrigger: {
                trigger: '.direction__title',
                start: `top-=${window.innerHeight * 0.4} top`,
                end: '+=400',
                scrub: true,
                invalidateOnRefresh: true,
                // markers: {
                //     startColor: "yellow",
                //     endColor: "yellow"
                // },
            }
        })
            .to('.direction__title h2', { maskPosition: '30% 135%' });

        directionImgs.forEach((el, i) => {
            const elImg = el.querySelector('img');
            const lastEl = directionImgs.length - 1;

            if (i === 0) {
                addClassName(el);
                gsap.set(elImg, { scale: 1 });
            }

            const nextEl = directionImgs[i + 1];
            const nextElImg = nextEl ? nextEl.querySelector('img') : null;

            flag++;

            const imgTl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: `bottom-=${directionImgHeight * 0.25 + window.innerHeight * 0.35} ${UHD_SCREEN ? 35 : 45}%`,
                    end: `bottom+=${directionImgHeight * 0.25 - window.innerHeight * 0.3} ${UHD_SCREEN ? 35 : 45}%`,
                    scrub: true,
                    // markers: true,
                }
            });

            if (i === lastEl) {
                flag = lastEl;
            }

            imgTl.to('.direction__imgs', { y: -el.offsetHeight * flag, duration: 1 }, 0);

            if (i !== lastEl) {
                imgTl.to(elImg, { scale: 0.7, duration: 1 }, 0);
            }

            if (nextElImg) {
                imgTl.to(nextElImg, { scale: 1, duration: 1 }, 0);
            }
        });
    }



}