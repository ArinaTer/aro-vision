export default function getFilterCardsFn(initialCards) {
  const pinnedCards = initialCards.filter((card) => card.getAttribute('data-work-id') === 'always');
  return function filterCards(cards, query) {
    if (query === 'All') {
      return cards;
    }

    const sorted = [];
    const rest = [...pinnedCards];

    cards.slice(1).forEach(card => {
      if (card.getAttribute('data-work-id') === query) {
        sorted.push(card);
      } else {
        rest.push(card);
      }
    });

    return [...sorted, ...rest];
  };
}