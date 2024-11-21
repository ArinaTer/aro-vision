export function fancyRadioBtns() {
    const radios = document.querySelectorAll('.my-radio__item');
    radios.forEach(radio => {
        radio.addEventListener("click", (e) => {
            // radio.classList.toggle('active');
            let svg = radio.querySelector('svg');

            // if (radio.classList.contains('active')) {
            gsap.to(svg, {
                keyframes: [{
                    '--top-y': '6px',
                    '--top-s-x': 1,
                    '--top-s-y': 1.25,
                    duration: .2,
                    delay: .2
                }, {
                    '--top-y': '0px',
                    '--top-s-x': 1.75,
                    '--top-s-y': 1,
                    duration: .6
                }]
            });
            gsap.to(svg, {
                keyframes: [{
                    '--dot-y': '2px',
                    duration: .3,
                    delay: .2
                }, {
                    '--dot-y': '0px',
                    duration: .3
                }]
            });
            gsap.to(svg, {
                '--drop-y': '0px',
                duration: .6,
                delay: .4,
            });
            // } else {
            //     gsap.to(svg, {
            //         clearProps: true,
            //         duration: 0
            //     });
            // }
        });
    });
}

// Clear Actived Radio
export function clearRadio() {
    const radios = document.querySelectorAll('.my-radio__item');

    radios.forEach(radio => {
        let svg = radio.querySelector('svg');

        gsap.to(svg, {
            clearProps: true,
            duration: 0
        });
    });
}