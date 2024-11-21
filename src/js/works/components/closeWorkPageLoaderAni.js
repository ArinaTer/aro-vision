import { addClassName, removeClassName } from "../../components/utils.js";

export default function closeWorkPageLoaderAni(preloaderWork) {
  setTimeout(() => {
    addClassName(preloaderWork, "hide");
    removeClassName(document.documentElement, "show-work-preloader");
    addClassName(document.documentElement, "work-preloader-hide");
    setTimeout(() => {
      removeClassName(document.documentElement, "pointer-none");
      removeClassName(document.documentElement, "work-preloader-hide");
    }, 750);
  }, 1500);
}