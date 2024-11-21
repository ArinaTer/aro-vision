import {
  addClassName,
  removeClassName,
  removeClasses,
  queryMatches,
} from "../components/utils.js";
export function cursor() {
  const mob = queryMatches(767.98, "max");
  // const follower = document.querySelector(".intro__cursor");
  if (!mob) {
    const follower = document.querySelector(".intro__cursor");


    function calculateCriclePosition(clientX, clientY) {
      const x = clientX;
      const y = clientY;
      gsap.to(follower, {
        left: x + "px",
        top: y + "px",
      });
    }

    let clientX;
    let clientY;
    document.addEventListener("mousemove", (e) => {
      clientX = e.clientX;
      clientY = e.clientY;
      calculateCriclePosition(clientX, clientY);
    });

    document
      .querySelector(".intro__video-content")
      .addEventListener("mouseenter", () => {
        addClassName(follower, "mouse-enter");
      });
    document
      .querySelector(".intro__video-content")
      .addEventListener("mouseleave", () => {
        removeClassName(follower, "mouse-enter");
      });
  }
}
