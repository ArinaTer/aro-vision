export default function isHashValid(cardsSequeces, hash) {
  return !!cardsSequeces.find((el) => el.path === hash);
};
