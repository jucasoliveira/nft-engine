import React from 'react';
import { AppProps } from 'next/app';

import '../styles/global.css';
import Header from './components/Header';
import useWeb3 from '../hooks/useWeb3';
import Web3Context from './web3Context';


function MyApp({ Component, pageProps }: AppProps) {
  const web3Context = useWeb3();
  return <div>
            <Web3Context.Provider value={web3Context}>
              <Header/>
              <Component {...pageProps} />
            </Web3Context.Provider>
        </div>;
}


export default MyApp;