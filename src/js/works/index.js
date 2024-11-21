import cards from "./cards.js";
import titleAni from "./animations/title.js";
import { COMMON_MEDIA_QUERIES } from '../components/utils.js';
import drowdown from "./components/drowdownInner.js";
import toNextBlock from "./animations/toNextBlock.js";
import drowdownAni from "./animations/drowdownAni.js";

export default function works() {
  drowdownAni();
  cards();
  if (!COMMON_MEDIA_QUERIES.MOBILE) {
    titleAni();
    toNextBlock();
  }
};
