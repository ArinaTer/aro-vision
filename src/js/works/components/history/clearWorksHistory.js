import { removeItemFromSessionStorage } from "../../../components/utils.js";

export default function clearWorksHistory() {
  removeItemFromSessionStorage('worksCollection');
};
