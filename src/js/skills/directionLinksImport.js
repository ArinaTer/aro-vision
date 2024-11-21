import {
  getItemFromSessionStorage,
  removeItemFromSessionStorage,
  queryMatches,
} from "../components/utils.js";
export function directionLinksImport() {
  const queryFromSessionStorage = getItemFromSessionStorage(
    "data-direction-links"
  );
  const skillsBtns = document.querySelectorAll(".skills__left-item");
  const radios = document.querySelectorAll(".my-radio__item");
  const isMob = queryMatches(767.97, "max");

  function handleClick(query, buttons, radios) {
    buttons.forEach((btn, i) => {
      if (btn.getAttribute("data-direction") === query) {
        setTimeout(() => {
          radios[i].click();
          btn.click();
          if (isMob) {
            gsap.to(window, {
              scrollTo: {
                y: btn,
                offsetY: 50,
              },
            });
          }
        }, 1000);
      }
    });
  }

  function handleNonMobScenario() {
    if (queryFromSessionStorage) {
      handleClick(queryFromSessionStorage.query, skillsBtns, radios);
      removeItemFromSessionStorage("data-direction-links");
      gsap.to(window, { scrollTo: { y: ".skills__img", offsetY: -150 } });
    } else {
      setTimeout(() => radios[0].click(), 1000);
    }
  }

  function handleMobScenario() {
    if (queryFromSessionStorage) {
      const mobSkillsBtn = document.querySelectorAll(".skills-mob__head");
      handleClick(queryFromSessionStorage.query, mobSkillsBtn, radios);
      removeItemFromSessionStorage("data-direction-links");
    }
  }

  if (!isMob) {
    handleNonMobScenario();
  } else {
    handleMobScenario();
  }
}
