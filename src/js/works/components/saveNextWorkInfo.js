import { setItemToSessionStorage } from "../../components/utils.js";

export default function saveNextWorkInfo(nextWorkInfo) {
  setItemToSessionStorage('nextWorkInfo', nextWorkInfo);
}