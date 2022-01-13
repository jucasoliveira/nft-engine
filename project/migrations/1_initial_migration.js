const Migrations = artifacts.require('facesNFT');
const MigrationMarket = artifacts.require('facesNFTMarket');

module.exports = async function (deployer) {
  deployer.deploy(MigrationMarket).then(async function () {
    const migrationInstance = await MigrationMarket.deployed();
    return deployer.deploy(Migrations, migrationInstance.address);
  });
};
