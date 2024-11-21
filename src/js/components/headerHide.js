import { addClassName, removeClassName, queryMatches } from "./utils.js";

export function headerHide() {
  addClassName(document.body, "show-header");
  const headerLanguageBtn = document.querySelector(".header__language");
  const header = document.querySelector(".header");
  const matches = queryMatches(768.98, "max");

  if (!matches) {
    let lastScrollTop = 0;
    let timeout;
    let isHeaderShown = true;

    window.addEventListener("media-loaded", () => {
      setTimeout(() => {
        addClassName(document.body, "start-animation-header");

        window.addEventListener("scroll", function () {
          clearTimeout(timeout);

          let scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          if (scrollTop > lastScrollTop) {
            // Прокрутка вниз
            if (isHeaderShown) {
              removeClassName(document.body, "show-header");
              isHeaderShown = false;
            }
          } else {
            // Прокрутка вверх
            if (!isHeaderShown) {
              addClassName(document.body, "show-header");
              isHeaderShown = true;
            }
          }

          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Для Mobile или Negative scrolling

          // Устанавливаем таймаут, чтобы добавить класс при остановке прокрутки
          timeout = setTimeout(function () {
            if (!isHeaderShown) {
              addClassName(document.body, "show-header");
              isHeaderShown = true;
            }
          }, 100);
        });
      }, 1200);
    });
  }
}
