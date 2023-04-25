import web3 from "./web3";
import Store from "./build/Store.json";

const instance = new web3.eth.Contract(
  JSON.parse(Store.interface),
  "0x0f5C3D58BB1d738ce932f6565982542B9ce703EB"
);

export default instance;
