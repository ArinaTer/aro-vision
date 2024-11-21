import { addClassName, removeClassName } from '../../components/utils.js';
import getFilterCardsFn from '../components/filterCards.js';
export default function cardsAni() {
  ScrollTrigger.saveStyles('.works__title');
  const initialCards = [...document.querySelectorAll(`[data-work-card]`)];

  if (document.body.classList.contains('home')) {
    mainPageWorks(initialCards);
  } else {
    innerPageWorks(initialCards);
  }
};

function getCardsByColumns(cards) {
  const computedStyles = getComputedStyle(document.querySelector('.works__cards-container'));
  const columnsCount = +computedStyles.getPropertyValue('--columns');
  const rowGap = parseFloat(computedStyles.getPropertyValue('row-gap'));

  const cardsByColumns = [];
  for (let i = 0; i < cards.length; i += columnsCount) {
    const res = [];
    for (let j = 0; j < columnsCount; j++) {
      if (!cards[i + j]) break;
      res.push(cards[i + j]);
    }
    cardsByColumns.push(res);
  }
  return {
    cardsByColumns,
    styles: {
      columnsCount, rowGap
    }
  };
}

function firstLineAni(cards, cardsColumns) {
  gsap.timeline({
    scrollTrigger: {
      trigger: cards[0],
      start: "center bottom",
      end: "+=1",
      // markers: true,
      // once: true,
      onEnter: () => {
        addClassName(document.querySelector('.works'), 'show-ani');
        gsap.to('.works__title', { maskPosition: '30% 46%' });
      },
      // onLeaveBack: () => {
      //   removeClassName(document.querySelector('.works'), 'show-ani');
      //   gsap.to('.works__title', { maskPosition: '30% -60%' });
      // }
    }
  });
  setFirstLineCardsAni(cards, cardsColumns);
}

function otherLinesAni(cards) {
  for (let i = 0; i < cards.length; i++) {
    const trigger = cards[i][0];
    gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "40% bottom",
        end: "+=1",
        // markers: true,
        once: true,
        onEnter: () => {
          cards[i].forEach(card => addClassName(card));
        },
        // onLeaveBack: () => {
        //   cards[i].forEach(card => removeClassName(card));
        // }
      }
    });
  }
}
function otherLinesAniInnerPage(cards, skipRowsCount, rowGap) {
  for (let i = 0; i < cards.length; i++) {
    const cardHeight = cards[i][0].offsetHeight;
    const startTrigger = cardHeight * 0.4;
    const trigger = Math.floor((cardHeight + rowGap) * (skipRowsCount + i) + startTrigger);
    gsap.timeline({
      scrollTrigger: {
        trigger: '.works__cards',
        start: `${trigger} bottom`,
        end: "+=1",
        // markers: true,
        once: true,
        onEnter: () => {
          cards[i].forEach(card => addClassName(card));
        },
        // onLeaveBack: () => {
        //   cards[i].forEach(card => removeClassName(card));
        // }
      }
    });
  }
}
function getVisibleCards(cards) {
  return new Promise((resolve, reject) => {
    const visibleCards = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleCards.push(entry.target);
        }
      });
      observer.disconnect();
      resolve(visibleCards);
    });

    cards.forEach(card => observer.observe(card));
  });

}

function mainPageWorks(initialCards) {
  const { cardsByColumns, styles: { columnsCount } } = getCardsByColumns(initialCards);
  firstLineAni(cardsByColumns[0], columnsCount);
  otherLinesAni(cardsByColumns.slice(1));
}
function innerPageWorks(initialCards) {
  const cards = getFilterCardsFn(initialCards)(initialCards, document.querySelector('[data-dropdown-active]').getAttribute('data-dropdown-active'));
  getVisibleCards(cards)
    .then(visibleCards => {
      const { cardsByColumns, styles: { columnsCount, rowGap } } = getCardsByColumns(cards.slice(visibleCards.length));
      setFirstLineCardsAni(visibleCards, columnsCount);
      otherLinesAniInnerPage(cardsByColumns, visibleCards.length / columnsCount, rowGap);
    });

  window.addEventListener('media-loaded', (params) => {
    setTimeout(() => {
      addClassName(document.querySelector('.works'), 'show-ani');
      gsap.to('.works__title', { maskPosition: '30% 46%' });
    }, 1200);
  });
}

function setFirstLineCardsAni(cards, cardsColumns) {
  const transformY = 100;
  cards.forEach((card, i) => {
    addClassName(card, 'works-ani-top');
    gsap.set(card, { y: transformY * (i % cardsColumns + 1) });
  });
}
/**
 * проиграть анимацию scale сразу у всех
 */

function onSortAction() {
  let isFirstTime = true;
  const cards = [...document.querySelectorAll(`[data-work-card]`)];
  return function endCardsAni() {
    if (!isFirstTime) return;
    cards.forEach(card => addClassName(card));
    isFirstTime = false;
  };
}

export const endCardsAni = onSortAction();