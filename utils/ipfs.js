const { create } = require("ipfs-http-client");
const { modules } = require("web3");

const auth =
  "Basic " +
  Buffer.from(
    process.env.INFURA_ID + ":" + process.env.INFURA_SECRET_KEY
  ).toString("base64");
async function ipfsClient() {
  try {
    const ipfs = await create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth, // infura auth credentials
      },
    });
    // console.log("hereeeeee");
    return ipfs;
  } catch (e) {
    console.log(e);
  }
}

// async function saveText() {
//   let ipfs = await ipfsClient();
//   console.log(ipfs);
//   let result = await ipfs.add(`welcome ${new Date()}`);
//   console.log(result);
// }

// saveText();
const ipfs = await ipfsClient();

modules.export;
