import Web3 from 'web3';

const getWeb3 = async (isFirstLoad: Boolean) => {
  try {
    let web3: Web3;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      // Ask User permission to connect to Metamask
      if (!isFirstLoad) {
        try {
          await window.ethereum.enable();
        } catch (err) {
          console.log('Transaction rejected by user:', err);
        }
      }
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask plugin');
      return;
    }

    return web3; // Update web3 into Redux state

    // ...
  } catch (err) {
    console.log('Error in Web3.tsx -> getWeb3(): ', err);
  }
};

export default getWeb3;
