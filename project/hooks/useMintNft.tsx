import { useState, useEffect, useCallback, useContext } from 'react';
import { useAppContext } from '../pages/appContext';

export const useCreateTokenAndSellArt = () => {
  const web3Context = useAppContext();
  const { web3, contractInstance, user } = web3Context;
  const [response, setResponse] = useState({
    data: null,
    isFetching: false,
    error: null,
  });

  const createTokenAndSellArt = useCallback(
    async (artToken) => {
      const { price, tokenURI } = artToken;
      const { utils } = web3;
      const priceInWei = utils.toWei(price.toString(), 'ether');
      try {
        await contractInstance.methods
          .mintItem(user, tokenURI)
          .send({ from: user });
        setResponse({ isFetching: true, data: null, error: null });
      } catch (e) {
        console.log('Error', e);
        setResponse({
          data: null,
          isFetching: false,
          error: e.message,
        });
      }
    },
    [contractInstance.methods, web3, user],
  );
  return {
    response,
    createTokenAndSellArt,
  };
};

export const useCreateMarketItem = () => {
  const web3Context = useAppContext();
  const { web3,  user, tokenInstance, marketInstance  } = web3Context;
  const [response, setResponse] = useState({
    data: {},
    isFetching: false,
    error: null,
  });

  async function createMarketItem({
    url,
    price
  }: any) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const { utils } = web3;
    // Create NFT Token
    try {
        const transaction = await tokenInstance.methods
          .mintItem(url)
          .send({ from: user });
          let tokenId = transaction.events.Transfer.returnValues.tokenId;
          const priceEther = utils.toWei(price.toString(), 'ether');
          setResponse({ isFetching: true, data: null, error: null });

          /* then list the item for sale on the marketplace */
          // const transaction2 = await marketInstance.methods.createMarketItem(process.env.NEXT_PUBLIC_NFT_ADDRESS, tokenId, priceEther).send({ from: user });

          setResponse({
              data: { transaction },
              isFetching: false,
              error: null,
            });

      } catch (e) {
        console.log('Error', e);
        setResponse({
          data: null,
          isFetching: false,
          error: e.message,
        });
      }
    setResponse({
      data: {"tokenId": "0x0"},
      isFetching: false,
      error: null,
    });
  }

  return { ...response, createMarketItem };
};

export const useGetMintedItems = () => {
  const web3Context = useAppContext();
  const { web3,  user, tokenInstance, marketInstance  } = web3Context;
  const [response, setResponse] = useState({
    data: {},
    isFetching: false,
    error: null,
  });

  async function getMintedItem({
    tokenId
  }: any) {
    try {
        const transaction = await tokenInstance.methods
          .fetchMyNFTs(tokenId)
          .send({ from: user });
          console.log(transaction)
          setResponse({ isFetching: true, data: null, error: null });
          setResponse({
              data: { transaction },
              isFetching: false,
              error: null,
            });

      } catch (e) {
        console.log('Error', e);
        setResponse({
          data: null,
          isFetching: false,
          error: e.message,
        });
      }
    setResponse({
      data: {"tokenId": "0x0"},
      isFetching: false,
      error: null,
    });
  }

  return { ...response, getMintedItem };
};
