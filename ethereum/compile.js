const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const storePath = path.resolve(__dirname, "contracts", "Store.sol");
const source = fs.readFileSync(storePath, "utf8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.slice(1) + ".json"),
    output[contract]
  );
}
