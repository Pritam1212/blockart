const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledStore = require("./build/Store.json");

const provider = new HDWalletProvider(
  "praise purity still aware solution comfort crew initial senior broom slice bubble",
  "https://goerli.infura.io/v3/ca542ab2ca264900b6290b63fba035c2"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledStore.interface)
  )
    .deploy({ data: compiledStore.bytecode })
    .send({ from: accounts[0], gas: "10000000" });

  console.log("contract deployed to ", result.options.address);
};
deploy();
