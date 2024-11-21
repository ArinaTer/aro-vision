import { setItemToSessionStorage } from "../components/utils.js";

export function directionLinks() {
  const directionBtns = document.querySelectorAll(".direction__item-link");
  const mobDirectionBtns = document.querySelectorAll(
    ".direction__item-icon-mob"
  );

  directionBtns.forEach((directionBtn) => {
    directionBtn.addEventListener("click", () => {
      const directionLinksData = {
        query: directionBtn.getAttribute("data-direction"),
      };
      setItemToSessionStorage("data-direction-links", directionLinksData);
    });
  });

  mobDirectionBtns.forEach((directionBtnMob) => {
    directionBtnMob.addEventListener("click", () => {
      const directionLinksData = {
        query: directionBtnMob.getAttribute("data-direction"),
      };
      setItemToSessionStorage("data-direction-links", directionLinksData);
    });
  });
}
