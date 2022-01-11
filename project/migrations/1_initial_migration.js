const Migrations = artifacts.require('facesNFT');

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
