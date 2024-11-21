import { addClassName, removeClassName, dispatchCustomEvent } from '../../components/utils.js';
export default function infoWorksAni() {
  const rows = document.querySelectorAll('.info-works__row');
  for (let i = 1; i < rows.length; i++) {
    rows[i].style.setProperty('--mt', rows[i].offsetHeight);
  }
  const aniDuration = 3000;
  const infoWorks = document.querySelector('.info-works');
  infoWorks.style.setProperty("--ani-duration", aniDuration / 2);
  let count = 0;
  let intervalForward = null;

  infoWorks.addEventListener('remove-info-prev', (e) => {
    setTimeout(() => {
      removeClassName(rows[e.detail.count], 'info-prev');
    }, aniDuration / 2);
  });
  intervalForward = setInterval(() => {
    removeClassName(rows[count], 'info-active');
    addClassName(rows[count], 'info-prev');
    dispatchCustomEvent({ el: infoWorks, event: "remove-info-prev", detail: { count } });
    count = (count + 1) % rows.length;
    addClassName(rows[count], 'info-active');
  }, aniDuration);
};


