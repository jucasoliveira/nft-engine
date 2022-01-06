import path from "path";
import fs from "fs";

const solc = require("solc");

const nftPath = path.resolve(__dirname, "contracts", "nft.sol");
const source = fs.readFileSync(nftPath, "utf8");

console.log(solc.compile(source, 1));
