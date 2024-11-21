import { queryMatches, setPropertyTo, removeClassName, addClassName } from "../components/utils.js";
import { clearRadio } from "../components/radio.js";

export function specialists() {
    const BIG_MOBILE = queryMatches(767.98, 'max');
    const LAPTOP = queryMatches(1570, 'max');
    const accorButtons = document.querySelectorAll('.specs-accordion__button');
    const accorItems = document.querySelectorAll('.specs-accordion__item');
    const radios = document.querySelectorAll('.my-radio__item');
    const accorWrap = document.querySelector('.specs-accordion')
    const specsText = document.querySelector('.specs__text')
    const specsSub = document.querySelector('.specs__sub')

    accorButtons.forEach((btn, i) => {

        btn.addEventListener('click', () => {
            if (accorItems[i].classList.contains('active')) {
                accorItems[i].classList.remove('active');
                clearRadio()
            } else {
                accorItems.forEach(item => {
                    item.classList.remove('active');
                    clearRadio()
                });

                radios[i].click()
                accorItems[i].classList.add('active');
            }

            accorWrap.style.pointerEvents = 'none'
            setTimeout(() => {
                accorWrap.style.pointerEvents = ''
            }, 1000);
        });

    });

    if (!BIG_MOBILE) {
        setPropertyTo({
            propertyName: "--title-height",
            propertyValue: `${document.querySelector('.specs__title').offsetHeight}px`,
            to: document.querySelector('.specs')
        });
        gsap.timeline({
            scrollTrigger: {
                trigger: '.specs__title',
                scrub: true,
                start: 'top bottom',
                end: '+=400',
            }
        })
            .to('.specs__title', {
                maskPosition: '19% 48%',
            });

        gsap.timeline({
            scrollTrigger: {
                trigger: '.specs__title',
                scrub: true,
                start: 'top-=100 top',
                end: LAPTOP ? '+480' : '+=600',
            }
        })
            .to('.specs__title h2', {
                maskPosition: '20% 150%',
            });
    }

    gsap.timeline({
        scrollTrigger: {
            trigger: '.specs__wrapper',
            start: 'top bottom',
            end: 'top bottom',
            onEnter: () => {
                gsap.to(specsText, {
                    opacity: 1, y: 0
                })
                gsap.to(specsSub, {
                    opacity: 1, y: 0
                })
            }
        }
    })

    gsap.timeline({
        scrollTrigger: {
            trigger: accorWrap,
            start: 'top 90%',
            end: 'top 90%',
            onEnter: () => {
                gsap.to(accorItems, {
                    stagger: 0.15,
                    opacity: 1,
                    y: 0,
                })
            }
        }
    })


}