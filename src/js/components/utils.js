export function queryMatches(width, prefix = 'max') {
  return window.matchMedia(`(${prefix}-width: ${width}px)`).matches;
}

export const COMMON_MEDIA_QUERIES = {
  TABLET: queryMatches(991.98),
  MOBILE: queryMatches(767.98),
};

// Function to detect mobile or tablet devices
export function isMobileOrTablet() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet|KFAPWI/i.test(navigator.userAgent);
}

export function addClassName(el, className = 'active') {
  el.classList.add(className);
}

export function removeClassName(el, className = 'active') {
  el.classList.remove(className);
}

export function toggleClassName(el, className = 'active') {
  el.classList.toggle(className);
}

export function removeClasses(array, className = 'active') {
  array.forEach((currentEl) => {
    removeClassName(currentEl, className);
  });
}

export function changeText(el, text) {
  el.innerText = text;
}

export function dispatchCustomEvent({ el, event, detail }) {
  el.dispatchEvent(new CustomEvent(event, { detail }));
}

export function wrapElements(elms, wrapClass = 'wrapped', wrapType = 'div') {
  elms.forEach((el) => {
    const wrapEl = document.createElement(wrapType);
    wrapEl.classList = wrapClass;
    el.parentNode.children[1].before(wrapEl)
      .appendChild(wrapEl);
    wrapEl.appendChild(el);
  });
};


export function setPropertyTo({ propertyName, to, propertyValue }) {
  to.style.setProperty(propertyName, propertyValue);
}

export function setItemToSessionStorage(key, content) {
  sessionStorage.setItem(key, JSON.stringify(content));
}
export function getItemFromSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}
export function removeItemFromSessionStorage(key) {
  sessionStorage.removeItem(key);
}