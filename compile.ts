import path from "path";
import fs from "fs";

const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "nft.sol");
const source = fs.readFileSync(inboxPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "nft.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

console.log(solc.compile(JSON.stringify(input)));
