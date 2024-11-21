import { setItemToSessionStorage, getItemFromSessionStorage } from "../../../components/utils.js";

export default function collectWorksHistory(work) {
  const collection = sessionStorage.getItem('worksCollection') ? getItemFromSessionStorage('worksCollection') : [];
  collection.push(work);
  setItemToSessionStorage('worksCollection', collection);
}