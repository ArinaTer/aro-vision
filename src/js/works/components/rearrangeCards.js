export default function rearrangeCards(cards) {
  cards.forEach((card, i) => card.style.setProperty("--grid-order", i + 1));
}