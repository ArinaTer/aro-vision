import { addClassName, removeClasses, removeClassName, changeText, dispatchCustomEvent, getItemFromSessionStorage, removeItemFromSessionStorage } from '../../components/utils.js';
import { endCardsAni } from '../animations/cards.js';


export default function drowdownInner() {
  const dropdownItems = document.querySelectorAll('[data-dropdown-item]');
  const dropdownActiveItem = document.querySelector('[data-dropdown-active]');

  const queryFromSessionStorage = getItemFromSessionStorage('dropdown-query');
  if (queryFromSessionStorage) {
    drowdownInfoHandler(queryFromSessionStorage.text, queryFromSessionStorage.query);
    removeItemFromSessionStorage('dropdown-query');
  }



  dropdownItems.forEach(dropdownItem => {
    dropdownItem.addEventListener("click", (e) => {
      e.stopPropagation();
      endCardsAni();
      removeClasses(dropdownItems);
      addClassName(dropdownItem);
      removeClassName(document.documentElement, 'drowdown-active');
      drowdownInfoHandler(dropdownItem.innerText, dropdownItem.getAttribute('data-dropdown-item'));
    });
  });

  function drowdownInfoHandler(text, query) {
    dropdownActiveItem.setAttribute('data-dropdown-active', query);
    changeText(dropdownActiveItem, text);
    dispatchCustomEvent({ el: window, event: "filter-cards", detail: { activeQuery: query } });
  }
};

