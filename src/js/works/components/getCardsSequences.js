export default function getCardsSequences(cards) {
  return cards.reduce((acc, card) => {
    acc.push({
      path: card.getAttribute("data-work-name"),
      content: {
        media: card.getAttribute("data-work-content-media"),
        isImg: card.getAttribute("data-work-content-media-type") === "img",
        title: card.getAttribute("data-work-content-title"),
        subtitle: card.getAttribute("data-work-content-subtitle"),
        dataWorkName: card.getAttribute('data-work-name')
      }
    });
    return acc;
  }, []);
}