import {
  addClassName,
  removeClassName,
  removeClasses,
  queryMatches,
  toggleClassName,
  isMobileOrTablet,
} from "./utils.js";

export function header() {
  const headerLanguageBtn = document.querySelector(".header__language");
  const headerLanguageBtns = document.querySelectorAll(
    ".header__language-list"
  );
  const headerLanguageText = document.querySelector(".header__language-btn p");
  const headerMobOpen = document.querySelector(".header__open-btn");
  const header = document.querySelector(".header");
  const matches = queryMatches(768.98, "max");
  const headerLanguageBtna = document.querySelector(".header__language-btn");
  const headerLanguageBtnShadow = document.querySelector(
    ".header__language-shadow"
  );
  const headerBtns = document.querySelectorAll(".header__nav");

  const isMobile = isMobileOrTablet();
  if (!isMobile) {
    headerLanguageBtn.addEventListener("mouseenter", () => {
      addClassName(headerLanguageBtn);
      addClassName(headerLanguageBtnShadow);
    });
    headerLanguageBtn.addEventListener("mouseleave", () => {
      removeClassName(headerLanguageBtn);
      removeClassName(headerLanguageBtnShadow);
    });
  }
  if (isMobile) {
    headerLanguageBtna.addEventListener("click", () => {
      toggleClassName(headerLanguageBtn);
      toggleClassName(headerLanguageBtnShadow);
    });
  }

  headerLanguageBtnShadow.addEventListener("touchstart", (e) => {
    removeClassName(headerLanguageBtn);
    removeClassName(headerLanguageBtnShadow);
  });

  headerLanguageBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      removeClassName(headerLanguageBtn);
      removeClasses(headerLanguageBtns);
      addClassName(btn);
      removeClassName(headerLanguageBtnShadow);
      headerLanguageText.innerHTML = btn.querySelector("p").innerHTML;
    });
  });

  // header-mob-open
  if (matches) {
    let disableScroll = true;
    headerMobOpen.addEventListener("click", () => {
      if (disableScroll) {
        lenisScroll.stop();
        disableScroll = false;
      } else {
        lenisScroll.start();
        disableScroll = true;
      }
      toggleClassName(headerMobOpen);
      toggleClassName(header, "open-menu");
      toggleClassName(document.body, "open-menu");
    });

    headerBtns.forEach((el) => {
      el.addEventListener("click", () => {
        removeClassName(headerMobOpen);
        removeClassName(document.body, "open-menu");
        lenisScroll.start();
      });
    });
  }
}
