import { queryMatches, addClassName, removeClassName } from "./utils.js";

export function popups() {

    if(window.innerHeight <= 600) {
        document.querySelector('.contact-popup__wrapper').setAttribute('data-lenis-prevent', '')
    }
    
    // const mobile = queryMatches(479, 'max')

    // if (mobile) {
    // console.log('mob');
    // const popupTextarea = document.querySelector('.contact-popup__textarea textarea')
    // popupTextarea.addEventListener('keyup', autosize);

    // function autosize() {
    //     let el = this;
    //     setTimeout(function () {
    //         el.style.cssText = 'height:auto;';
    //         el.style.cssText = 'height:' + el.scrollHeight + 'px';
    //     }, 0);

    // }


    // const fileLabel = document.querySelector(".contact-popup__file label");
    // const inputFile = document.querySelector(".contact-popup__file input");
    // const fileNameLabel = document.querySelector(".contact-popup__file-name p");
    // const resetFileBtn = document.querySelector(".contact-popup__file button");

    // document
    //     .querySelector(".contact-popup__file")
    //     .addEventListener("change", () => {
    //         const fileName = inputFile.files[0].name;

    //         if (fileName.length >= 22) {
    //             fileNameLabel.innerHTML = `${fileName.slice(0, 6)}...${fileName.slice(-8)}`
    //         } else {
    //             fileNameLabel.innerHTML = fileName;
    //         }
    //         addClassName(fileLabel, "disable");
    //         addClassName(resetFileBtn, "show");
    //     });

    // resetFileBtn.addEventListener("click", () => {
    //     fileNameLabel.innerHTML = "Attach file";
    //     removeClassName(fileLabel, "disable");
    //     removeClassName(resetFileBtn, "show");
    //     inputFile.value = "";
    // });

}

