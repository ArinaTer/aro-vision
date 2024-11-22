import { workClickHandler } from './getworkClickHandler.js';

export default function showWorkClickHandler() {
  document.querySelectorAll('[data-work-name]').forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      workClickHandler(el.getAttribute('data-work-name'));
    });
  });
}