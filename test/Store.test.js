const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledStore = require("../ethereum/build/Store.json");
const compiledEscrow = require("../ethereum/build/Escrow.json");

let accounts;
let store;
let index;
let escrowAddress;
let escrow;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  store = await new web3.eth.Contract(JSON.parse(compiledStore.interface))
    .deploy({ data: compiledStore.bytecode })
    .send({ from: accounts[0], gas: "3000000" });

  index = await store.methods
    .addProduct("apple", "mobile", "img", "desc", 1)
    .send({
      from: accounts[1],
      gas: "1000000",
    });
  console.log(index);
});

describe("Store", () => {
  it("allows buyer to buy product", async () => {
    const productId = await store.methods.getProductIdAt(0).call();
    console.log(productId);
    const product = await store.methods.getProduct(productId).call();
    console.log(product);
    const initial = await web3.eth.getBalance(accounts[2]);
    console.log("before placing order", web3.utils.fromWei(initial, "ether"));
    await store.methods.placeOrder(productId).send({
      from: accounts[2],
      value: web3.utils.toWei("1", "ether"),
      gas: "1000000",
    });
    const final = await web3.eth.getBalance(accounts[2]);

    console.log("after placing order", web3.utils.fromWei(final, "ether"));

    await store.getPastEvents(
      "OrderCreated",
      {
        filter: { buyer: accounts[2] },
        fromBlock: 0,
        toBlock: "latest",
      },
      (error, events) => {
        if (!error) {
          const obj = JSON.parse(JSON.stringify(events));
          const array = Object.keys(obj);

          escrowAddress = obj[array[0]].returnValues.escrow;
          //   console.log(escrowAddress);
        } else {
          console.log(error);
        }
      }
    );
    console.log("escrow address", escrowAddress);
    escrow = await new web3.eth.Contract(
      JSON.parse(compiledEscrow.interface),
      escrowAddress
    );

    await escrow.methods.accept().send({
      from: accounts[1],
    });
    let sellerBal = await web3.eth.getBalance(accounts[1]);
    console.log("seller balance before delivery", sellerBal);
    await escrow.methods.accept().send({
      from: accounts[2],
    });
    sellerBal = await web3.eth.getBalance(accounts[1]);
    console.log("seller balance after delivery", sellerBal);
    let prod;
    await store.getPastEvents(
      "ProductCreated",
      {
        filter: { seller: accounts[1] },
        fromBlock: 0,
        toBlock: "latest",
      },
      (error, events) => {
        if (!error) {
          const obj = JSON.parse(JSON.stringify(events));
          const array = Object.keys(obj);
          prod = obj[array[0]].returnValues.id;
          // console.log("product created event", obj[array[0]].returnValues.id);
        } else {
          console.log(error);
        }
      }
    );
    const res = await store.methods.getProduct(prod).call();
    console.log(res);

    //searchhhhhhhhhhhhh.........
    let search;
    await store.getPastEvents(
      "ProductCreated",
      {
        filter: { name: "appl" },
        fromBlock: 0,
        toBlock: "latest",
      },
      (error, events) => {
        if (!error) {
          const obj = JSON.parse(JSON.stringify(events));
          const array = Object.keys(obj);
          // console.log(obj[array[0]]);
          search = obj[array[0]].returnValues;
          // console.log("product created event", obj[array[0]].returnValues.id);
        } else {
          console.log(error);
        }
      }
    );
    console.log("search..", search);
    assert.ok(true);
  });
});
