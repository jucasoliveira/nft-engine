import React, { createContext, useContext } from 'react';

const Web3Context = createContext({
  user: undefined,
  balance: 0,
  contractInstance: undefined,
  networkId: undefined,
  networkType: undefined,
  web3: undefined,
});

export default function AppWrapper({ value, children }) {
  return (
    <React.Fragment>
      <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
    </React.Fragment>
  );
}

export function useAppContext() {
  return useContext(Web3Context);
}
