const Migrations = artifacts.require("MyNFT");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
