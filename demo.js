const { create } = require("ipfs-http-client");
console.log("again pleej");
async function ipfsClient() {
  const ipfs = await create({
    host: "localhost",
    port: 8080,
    protocol: "https",
  });

  return ipfs;
}

async function saveText() {
  let ipfs = await ipfsClient();
  let res = await ipfs.add("hello");
  console.log(res);
}

saveText();
