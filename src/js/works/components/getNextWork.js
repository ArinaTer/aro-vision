
import saveNextWorkInfo from './saveNextWorkInfo.js';

export default function getNextWork({ cardsSequeces, currentWork }) {
  let nextWorkInfo;
  cardsSequeces.forEach((card, i, arr) => {
    if (card.path === currentWork) {
      const nextWorkIndex = (i + 1) % arr.length;
      nextWorkInfo = getItems(arr, nextWorkIndex);
    }
  });
  saveNextWorkInfo(nextWorkInfo);
  return nextWorkInfo[0].path;
}


function getItems(cards, nextWorkIndex) {
  const LIMIT = 4;
  let index = 0;
  const res = [];
  for (let i = 0; i < LIMIT; i++) {
    let itemToPush = null;
    if (cards[nextWorkIndex + i]) {
      itemToPush = cards[nextWorkIndex + i];
    } else {
      itemToPush = cards[index];
      index++;
    }
    res.push(itemToPush);
  }
  return res;
}