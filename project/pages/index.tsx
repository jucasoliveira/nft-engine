import html2canvas from 'html2canvas';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import { generatePreview } from '../services/randomImage';
import { AvatarBackgroundConfig } from '../types/types';
import { PalettePreset, rollDices } from '../utils/config';
import { CompatibleAgents, DefaultBackgroundConfig, ShapeStyleMapping } from '../utils/const';
import * as IPFS from 'ipfs-core'
import { request } from 'http';
import axios from 'axios';

const IndexPage = ({preview, randomBackground}) => {

  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)

  const [svgPreview, setPreview] = useState('');
    const [background, setBackground] = useState<AvatarBackgroundConfig>(
    DefaultBackgroundConfig,
  );

  useEffect(() => {
    setPreview(preview);
    setBackground({
        color: randomBackground,
        shape: 'square',
      });
      generateCanvasFromAvatar()
  }, []);

  const addFileToIpfs = async (imageURL:string) => {

    var options = {
      method: 'POST',
      url: 'http://localhost:3000/api/addFile',
      headers: {'Content-Type': 'application/json'},
      data: {image: imageURL, name: `avatar-${new Date().getTime()}.png`}
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  const generateCanvasFromAvatar = async () => {
    const dom: HTMLElement = document.querySelector('#avatar-preview') as HTMLElement;

    const canvas = await html2canvas(dom, {
      logging: true,
      scale: window.devicePixelRatio,
      width: dom.clientWidth,
      height: dom.clientHeight,
    });
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isNeedCompatible = CompatibleAgents.some(agent => userAgent.indexOf(agent) >= 0);
      // ga.event({ action: 'generate_canvas', params: { } });

      // base64 only support png svg for now
      const imageURL = canvas.toDataURL();
     
      const a = document.createElement('a');
      a.href = imageURL;
      a.download = `avatar-${new Date().getTime()}.png`;

     // addFileToIpfs(imageURL);

  }
return <div className="md:flex bg-gray-100 rounded-xl">
  <div className="pt-6 text-center md:text-left space-y-4">
    <div
      style={{
        backgroundColor:
              background.shape === 'none'
                ? DefaultBackgroundConfig.color
                : background.color,
          width: '400px',
        height: '400px',

      }}
      id="avatar-preview"
      className={`w-100 h-100 md:w-72 md:h-72 ${
        ShapeStyleMapping[background.shape]
      }`}
      dangerouslySetInnerHTML={{
        __html: svgPreview,
      }}
        />
    <figcaption className="font-medium">
       <button>
      <div>MINT</div>
    </button>
    </figcaption>
  </div>
  </div>
}

export async function getServerSideProps() {
  
  const preview = await generatePreview();
  const randomBackground = rollDices < 20 && PalettePreset[Math.floor(Math.random() * PalettePreset.length)] || '#999999';

  return {
    props: {
      preview,
      randomBackground,
    }, // will be passed to the page component as props
  };
}

export default IndexPage
