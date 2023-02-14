import web3 from "./web3";
import Escrow from "./build/Escrow.json";

export default (address) => {
  return new web3.eth.Contract(JSON.parse(Escrow.interface), address);
};
