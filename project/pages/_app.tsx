import React from 'react';
import { AppProps } from 'next/app';

import '../styles/global.css';
import Header from './components/Header';


function MyApp({ Component, pageProps }: AppProps) {
  return <div>
            <Header/>
            <Component {...pageProps} />
        </div>;
}


export default MyApp;