import web3 from "./web3";
import Store from "./build/Store.json";

const instance = new web3.eth.Contract(
  JSON.parse(Store.interface),
  "0x5E848c6aB7f0F29AfC8b9003b8B6C73f3fDa1015"
);

export default instance;
