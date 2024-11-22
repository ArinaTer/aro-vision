import { addClassName, dispatchCustomEvent } from '../components/utils.js';

function getworkClickHandler() {
  const parentWindow = window.parent;
  return function workClickHandler(path, isCollect = false) {
    addClassName(parentWindow.document.documentElement, 'show-work-preloader');
    dispatchCustomEvent({
      el: parentWindow, event: 'preload-next-work', detail: {
        currentWork: path,
        isClicked: true
      }
    });
    setTimeout(() => {
      dispatchCustomEvent({
        el: parentWindow, event: 'show-next-work', detail: { isCollect }
      });
    }, 1000);
  };
}
export const workClickHandler = getworkClickHandler();
