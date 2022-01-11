import React from "react";
import { useRouter } from 'next/router'
// import * as IPFS from 'ipfs-core'
import { request } from 'http';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { CompatibleAgents } from "../../utils/const";

const Mint = () => {
  const router = useRouter()
  const { id } = router.query

  const object = JSON.parse(id as string);

  const { background , svgPreview , DefaultBackgroundConfig} = object;
  const { attributes, price } = svgPreview;


  const name = `${background.color === "#999999" ? "Normal" : "Rare"} - ${svgPreview.isFlipped ? "Flipped" : "Not Flipped"}`

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

  return <div className="bg-white">
  <div className="pt-6">
    <nav aria-label="Breadcrumb">
      <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
        <li>
          <div className="flex items-center">
            <a href="/" className="mr-2 text-sm font-medium text-gray-900">
              Faces NFT
            </a>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>

        <li>
          <div className="flex items-center">
            <a href="#" className="mr-2 text-sm font-medium text-gray-900">
              Mint
            </a>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>

        <li className="text-sm">
          <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
            {name}
          </a>
        </li>
      </ol>
    </nav>

    <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-4 lg:gap-x-5">
      <div
          style={{
            backgroundColor:
                  background.shape === 'none'
                    ? DefaultBackgroundConfig.color
                    : background.color,

          }}
          id="avatar-preview"
          className={`w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none`}
          dangerouslySetInnerHTML={{
            __html: svgPreview.previewSvg,
          }}
        />
    </div>

    <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
      <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {name}
        </h1>
      </div>

      <div className="mt-4 lg:mt-0 lg:row-span-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl text-gray-900">${price}</p>

        <form className="mt-10">

          <button type="submit" className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">MINT</button>
        </form>
      </div>

      <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <div>
          <h3 className="sr-only">Description</h3>

          <div className="space-y-6">
            <p className="text-base text-gray-900">The {name} allows you to fully express your vibrant personality with NFT's.</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

          <div className="mt-4">
            <ul role="list" className="pl-4 list-disc text-sm space-y-2">
              <li className="text-gray-400"><span className="text-gray-600">{background.color === "#999999" ? "Normal" : "Rare"}</span></li>

              <li className="text-gray-400"><span className="text-gray-600">{svgPreview.isFlipped ? "Flipped" : "Not Flipped"}</span></li>

               {attributes.glasses > 0 && <li className="text-gray-400"><span className="text-gray-600">Glasses</span></li>}
              {attributes.accessories > 0 && <li className="text-gray-400"><span className="text-gray-600">Acessories</span></li>}
              {attributes.beard > 0 && <li className="text-gray-400"><span className="text-gray-600">Beard</span></li>}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-medium text-gray-900">Details</h2>

          <div className="mt-4 space-y-6">
            <p className="text-sm text-gray-600">The {name} is limited release.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
}

export default Mint;


/*

        */