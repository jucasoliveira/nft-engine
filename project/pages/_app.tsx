import React from 'react';
import { AppProps } from 'next/app';

import '../styles/global.css';
import Header from './components/Header';
import useWeb3 from '../hooks/useWeb3';
import AppWrapper from './appContext';

function MyApp({ Component, pageProps }: AppProps) {
  const web3Context = useWeb3();
  return (
    <AppWrapper value={web3Context}>
      <Header />
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
