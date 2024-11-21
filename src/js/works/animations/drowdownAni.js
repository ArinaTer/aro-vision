import { addClassName, removeClassName, toggleClassName, queryMatches, isMobileOrTablet } from '../../components/utils.js';

export default function drowdownAni() {
  const drowdown = document.querySelector('[data-dropdown]');
  const IS_MOB = isMobileOrTablet();
  // const IS_MOB = queryMatches(991.98);
  if (!IS_MOB) {
    drowdownHover(drowdown);
  } else {
    drowdownClick(drowdown);
  }
};

function drowdownHover(drowdown) {
  drowdown.addEventListener("mouseenter", (e) => {
    addClassName(document.documentElement, 'drowdown-active');
  });
  drowdown.addEventListener("mouseleave", (e) => {
    removeClassName(document.documentElement, 'drowdown-active');
  });
};
function drowdownClick(drowdown) {
  drowdown.addEventListener("click", (e) => {
    toggleClassName(document.documentElement, 'drowdown-active');
  });
  document.querySelector('.works__shadow').addEventListener("click", (e) => {
    removeClassName(document.documentElement, 'drowdown-active');
  });
}
