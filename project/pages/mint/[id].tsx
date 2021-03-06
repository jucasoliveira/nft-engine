import React from 'react';
import { useRouter } from 'next/router';
import html2canvas from 'html2canvas';
import { ShapeStyleMapping } from '../../utils/const';
import { handleMetaData } from '../api/upload';
import { useCreateMarketItem, useCreateTokenAndSellArt } from '../../hooks/useMintNft';
import { GetStaticProps, GetStaticPaths } from 'next';

function Mint ({ id }) {
  // const router = useRouter();
 //  const { id } = router.query;


  const object = JSON.parse(id as string);


  const { background, svgPreview, DefaultBackgroundConfig } = object;
  const { attributes, price } = svgPreview;

  const { createMarketItem } =
    useCreateMarketItem();

  const name = `${background.color === '#999999' ? 'Normal' : 'Rare'} - ${
    svgPreview.isFlipped ? 'Flipped' : 'Not Flipped'
  }`;

  const generateCanvasFromAvatar = async () => {
    const dom: HTMLElement = document.querySelector(
      '#avatar-preview',
    ) as HTMLElement;

    const canvas = await html2canvas(dom, {
      logging: true,
      scale: window.devicePixelRatio,
      width: dom.clientWidth,
      height: dom.clientHeight,
    });
    const imageURL = canvas.toDataURL();

    const a = document.createElement('a');
    a.href = imageURL;
    a.download = `${name}-avatar-${new Date().getTime()}.png`;

    const description = `Has ${attributes.glasses > 0 ? 'Glasses' : ''},${
      attributes.accessories > 0 ? ' Accessories' : ''
    },${attributes.beard > 0 ? ' Beard' : ''}`;

    const metadata = {
      name: `${name} - avatar-${new Date().getTime()}`,
      description,
    };

    const upload = await handleMetaData(imageURL, metadata);

    console.log('MetaData uploaded', upload);

    await createMarketItem({
      url: upload,
      price,
    });

    return upload;
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <a href="/" className="mr-2 text-sm font-medium text-gray-900">
                  Faces NFT
                </a>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-5 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li>
              <div className="flex items-center">
                <a href="#" className="mr-2 text-sm font-medium text-gray-900">
                  Mint
                </a>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-5 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <a
                href="#"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {name}
              </a>
            </li>
          </ol>
        </nav>

        <div className="aspect-w-1 aspect-h-1 mt-6 rounded-md max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-4 lg:gap-x-5 lg:aspect-none">
          <div
            style={{
              backgroundColor:
                background.shape === 'none'
                  ? DefaultBackgroundConfig.color
                  : background.color,
            }}
            id="avatar-preview"
            className={`w-48 h-48 md:w-72 md:h-72 ${
              ShapeStyleMapping[background.shape]
            }`}
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
            <p className="text-3xl text-gray-900">{price / 100} ETH</p>

            <div className="mt-10">
              <button
                onClick={() => generateCanvasFromAvatar()}
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                MINT
              </button>
            </div>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  The {name} allows you to fully express your vibrant
                  personality with NFT's.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      {background.color === '#999999' ? 'Normal' : 'Rare'}
                    </span>
                  </li>

                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      {svgPreview.isFlipped ? 'Flipped' : 'Not Flipped'}
                    </span>
                  </li>

                  {attributes.glasses > 0 && (
                    <li className="text-gray-400">
                      <span className="text-gray-600">Glasses</span>
                    </li>
                  )}
                  {attributes.accessories > 0 && (
                    <li className="text-gray-400">
                      <span className="text-gray-600">Acessories</span>
                    </li>
                  )}
                  {attributes.beard > 0 && (
                    <li className="text-gray-400">
                      <span className="text-gray-600">Beard</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  The {name} is limited release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


Mint.getInitialProps = async ({ query }) => {
  const { id } = query;
  return { id }
}

export default Mint;
