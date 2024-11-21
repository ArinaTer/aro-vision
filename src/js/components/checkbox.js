export function myCheckbox() {
    document.querySelectorAll('.my-checkbox').forEach(elem => {
        let svg = elem.querySelector('svg');

        elem.addEventListener("click", (e) => {
            elem.classList.add('active')

            gsap.set(svg, {
                '--dot-x': '14px',
                '--dot-y': '-14px',
                '--tick-offset': '20.5px',
                '--tick-array': '16.5px',
                '--drop-s': 1
            })

            gsap.to(elem, {
                keyframes: [{
                    '--border-radius-corner': '70%',
                    duration: .2,
                    delay: .2
                }, {
                    '--border-radius-corner': '50%',
                    duration: .3,
                    clearProps: true
                }]
            })

            gsap.to(svg, {
                '--dot-x': '0px',
                '--dot-y': '0px',
                '--dot-s': 0.5,
                duration: .4,
                delay: .4
            })

            gsap.to(svg, {
                keyframes: [{
                    '--tick-offset': '48px',
                    '--tick-array': '14px',
                    duration: .3,
                    delay: .2
                }, {
                    '--tick-offset': '46.5px',
                    '--tick-array': '16.5px',
                    duration: .35,
                    clearProps: true
                }]
            })

        })

    })
}