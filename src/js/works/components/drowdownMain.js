import { setItemToSessionStorage } from '../../components/utils.js';

export default function drowdownMain() {
  const dropdownItems = document.querySelectorAll('[data-dropdown-item]');

  dropdownItems.forEach(dropdownItem => {
    dropdownItem.addEventListener("click", (e) => {
      const data = {
        text: dropdownItem.innerText,
        query: dropdownItem.getAttribute('data-dropdown-item')
      };
      setItemToSessionStorage('dropdown-query', data);
      window.open('/works', '_self');
    });
  });
};
