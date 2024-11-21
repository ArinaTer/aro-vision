export function gallery() {
  Fancybox.defaults.Hash = false;

  Fancybox.bind("[data-fancybox]", {
    Image: {
      zoom: false,
    },
    on: {
      init: () => {
        lenisScroll.stop();
      },
      done: () => {
        const backDropBtn = document.querySelector(".fancybox__backdrop");
        const closeBtn = document.querySelector("[data-fancybox-close]");
        closeFancy(closeBtn);
      },
      close: () => {
        lenisScroll.start();
      },
      backdropClick: () => {
        // console.log("work");
      },
    },
  });

  function closeFancy(closebtn) {
    window.addEventListener("click", (e) => {
      const target = e.target;
      if (!target.closest("img")) {
        closebtn.click();
      }
    });
  }
}
