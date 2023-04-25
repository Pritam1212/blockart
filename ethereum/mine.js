const Web3 = require("web3");
const web3 = new Web3("http://localhost:7545");

const advanceBlockAtTime = async () => {
  await web3.currentProvider.send(
    {
      jsonrpc: "2.0",
      method: "evm_increaseTime",
      params: [100], // there are 86400 seconds in a day
      id: new Date().getTime(),
    },
    () => {}
  );

  // return new Promise((resolve, reject) => {
  //   web3.currentProvider.send(
  //     {
  //       jsonrpc: "2.0",
  //       method: "evm_mine",
  //       params: [],
  //       id: new Date().getTime(),
  //     },
  //     (err, _) => {
  //       if (err) {
  //         return reject(err);
  //       }
  //       // const newBlockHash = web3.eth.getBlock("latest").hash;

  //       // return resolve(newBlockHash);
  //     }
  //   );
  // });
};

for (let i = 0; i < 10; i++) {
  // advanceBlockAtTime();
  try {
    web3.currentProvider.send(
      {
        jsonrpc: "2.0",
        method: "evm_mine",
        params: [],
        id: new Date().getTime(),
      },
      () => {}
    );
  } catch (error) {
    continue;
  }
}
