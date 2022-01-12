import React from 'react';
import Link from 'next/link';

export default function Card({
  background,
  ShapeStyleMapping,
  svgPreview,
  DefaultBackgroundConfig,
}) {
  const { attributes, price } = svgPreview;
  
  return (
    <Link
      href={{
        pathname: '/mint/[id]',
        query: {
          id: JSON.stringify({ background , svgPreview , DefaultBackgroundConfig}),
        },
      }}
    >
      <div className="mt-5 grid gap-y-10  sm:grid-cols-2  ">
        <div className="group relative">
          <div className="w-48 h-48 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 md:w-72 md:h-72  lg:aspect-none">
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
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href="#">
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {background.color === '#999999' ? 'Normal' : 'Rare'}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {svgPreview.isFlipped ? 'Flipped' : 'Not Flipped'}
              </p>
              {attributes.glasses > 0 && (
                <p className="mt-1 text-sm text-gray-500">Glasses</p>
              )}
              {attributes.accessories > 0 && (
                <p className="mt-1 text-sm text-gray-500">Accessories</p>
              )}
              {attributes.beard > 0 && (
                <p className="mt-1 text-sm text-gray-500">Beard</p>
              )}
            </div>
            <p className="text-sm font-medium text-gray-900">
              {price / 100} ETH
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      background: {
        shape: 'none',
        color: '#999999',
      },
      svgPreview: {
        previewSvg: '',
        isFlipped: false,
        attributes: {
          glasses: 0,
          accessories: 0,
          beard: 0,
        },
      },
      ShapeStyleMapping: {
        none: '',
        circle: 'bg-circle',
        square: 'bg-square',
        triangle: 'bg-triangle',
        star: 'bg-star',
        heart: 'bg-heart',
        diamond: 'bg-diamond',
      },
      DefaultBackgroundConfig: {
        color: '#999999',
      },
    },
  };
}
