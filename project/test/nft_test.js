const nftTest = artifacts.require('nftTest');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract('nftTest', function (/* accounts */) {
  it('should assert true', async function () {
    await nftTest.deployed();
    return assert.isTrue(true);
  });
});
