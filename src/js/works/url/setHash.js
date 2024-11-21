

function getSetHash() {
  const isHomePage = document.body.classList.contains("home") || document.body.classList.contains("works-page");

  if (isHomePage) {
    return function setHash(workName) {
      window.location.hash = workName;
    };
  } else {
    return function setHash(workName) {
      // console.log('this fn works only in HomePage \n work name:', workName);
    };
  }

}

const setHash = getSetHash();
export default setHash;