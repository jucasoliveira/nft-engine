const facesNFT = artifacts.require('facesNFT');

module.exports = function (deployer) {
  deployer.deploy(facesNFT);
};
