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

export function dispatchCustomEvent({ el, event, detail }) {
  el.dispatchEvent(new CustomEvent(event, { detail }));
}



export function setItemToSessionStorage(key, content) {
  sessionStorage.setItem(key, JSON.stringify(content));
}