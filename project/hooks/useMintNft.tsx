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
        setResponse({ isFetching: false, data: null, error: null });
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
