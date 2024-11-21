function getInsertIframeFn() {
  const absolutePath = document.body.classList.contains('home') ? "./" : "../";
  return function insertIframe(iframeWrapper, path) {
    const relativePath = `${absolutePath}files/works/`;
    iframeWrapper.innerHTML =
      `<iframe src="${relativePath}${path}.html" data-work-current="${path}" frameborder="0"></iframe>`;
  };
}

const insertIframe = getInsertIframeFn();

export default insertIframe;