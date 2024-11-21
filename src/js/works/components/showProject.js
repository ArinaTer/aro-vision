import { addClassName } from '../../components/utils.js';
import insertIframe from './insertIframe.js';

export default function showProject(card, currentIframe) {
  const showDelay = 300;
  addClassName(document.documentElement, 'show-work-preloader');
  insertIframe(currentIframe, card.getAttribute("data-work-name"));
  setTimeout(() => {
    addClassName(currentIframe);
  }, showDelay);
}