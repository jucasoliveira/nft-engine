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
          id: JSON.stringify({"background":{"color":"#999999","shape":"square"},"svgPreview":{"previewSvg":"<svg viewBox=\"0 0 1080 1080\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">      <defs>  <filter id=\"filter\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\" filterUnits=\"objectBoundingBox\" primitiveUnits=\"userSpaceOnUse\" color-interpolation-filters=\"linearRGB\">    <feMorphology operator=\"dilate\" radius=\"20 20\" in=\"SourceAlpha\" result=\"morphology\"/>    <feFlood flood-color=\"#ffffff\" flood-opacity=\"1\" result=\"flood\"/>    <feComposite in=\"flood\" in2=\"morphology\" operator=\"in\" result=\"composite\"/>    <feMerge result=\"merge\">          <feMergeNode in=\"composite\" result=\"mergeNode\"/>      <feMergeNode in=\"SourceGraphic\" result=\"mergeNode1\"/>      </feMerge>  </filter></defs>      <g id=\"notion-avatar\" filter=\"url(#filter)\">        <g id=\"notion-avatar=face\" fill=\"#cd2e1d\"     > <?xml version=\"1.0\" encoding=\"UTF-8\"?>    <title>Face/ 6</title>    <g id=\"Face/-6\" stroke=\"none\" stroke-width=\"1\"  fill-rule=\"evenodd\" stroke-linecap=\"round\" stroke-linejoin=\"round\">        <path d=\"M532,379 C664.54834,379 772,486.45166 772,619 C772,751.54834 764.54834,899 532,899 C402.610491,899 332.317998,816.086314 305.249034,718.717925 C264.225797,715.291578 232,680.909158 232,639 C232,599.134956 261.158843,566.080325 299.312086,560.00055 C325.599297,455.979213 419.809919,379 532,379 Z M295.858895,624.545187 L304.141105,655.454813\" id=\"Path\" stroke=\"#000000\" stroke-width=\"24\"></path>    </g>    </g><g id=\"notion-avatar=nose\"      > <?xml version=\"1.0\" encoding=\"UTF-8\"?>    <title>Nose/ 9</title>    <g id=\"Nose/-9\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" stroke-linecap=\"round\" stroke-linejoin=\"round\">        <path d=\"M631,694.380659 C663.848549,704.811956 684.630284,697.576454 693.345205,672.674154 C706.417587,635.320703 637.033407,606.392531 660.161467,579\" id=\"Path\" stroke=\"#000000\" stroke-width=\"16\"></path>    </g>    </g><g id=\"notion-avatar=mouth\"      > <?xml version=\"1.0\" encoding=\"UTF-8\"?>    <title>Mouth/ 1</title>    <g id=\"Mouth/-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" stroke-linecap=\"round\" stroke-linejoin=\"round\">        <path d=\"M549,759 C575.12979,773.666667 603.12979,781 633,781 C662.87021,781 682.87021,773.666667 693,759\" id=\"Path\" stroke=\"#000000\" stroke-width=\"16\"></path>    </g>    </g><g id=\"notion-avatar=eyes\"      > <?xml version=\"1.0\" encoding=\"UTF-8\"?>    <title>Eyes/ 9</title>    <g id=\"Eyes/-9\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">        <path d=\"M570,507 C575.854822,507 581.122051,511.025253 584.779642,517.440484 L578,531 L589.369946,531.000208 C589.781247,533.557105 590,536.237678 590,539 C590,556.673112 581.045695,571 570,571 C558.954305,571 550,556.673112 550,539 C550,521.326888 558.954305,507 570,507 Z M708,507 C713.854822,507 719.122051,511.025253 722.779642,517.440484 L716,531 L727.369946,531.000208 C727.781247,533.557105 728,536.237678 728,539 C728,556.673112 719.045695,571 708,571 C696.954305,571 688,556.673112 688,539 C688,521.326888 696.954305,507 708,507 Z\" id=\"Combined-Shape\" fill=\"#000000\"></path>    </g>    </g><g id=\"notion-avatar=eyebrows\"      > <?xml version=\"1.0\" encoding=\"UTF-8\"?>    <title>Eyebrows/ 4</title>    <g id=\"Eyebrows/-4\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" stroke-linecap=\"round\" stroke-linejoin=\"round\">        <g id=\"Group\" transform=\"translate(525.000000, 504.000000)\" stroke=\"#000000\" stroke-width=\"12\">            <path d=\"M0,12 C12.8888889,4 27.8888889,0 45,0 C62.1111111,0 77.1111111,4 90,12\" id=\"Path\"></path>            <path d=\"M138,12 C150.888889,4 165.888889,0 183,0 C200.111111,0 215.111111,4 228,12\" id=\"Path\"></path>        </g>    </g>    </g><g id=\"notion-avatar=glasses\"      > <?xml version=\"1.0\" encoding=\"UTF-8\"?>    <title>Glasses/ 2</title>    <g id=\"Glasses/-2\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" stroke-linecap=\"round\" stroke-linejoin=\"round\">        <path d=\"M574.189838,502.353993 C586.612079,503.247679 601.018598,506.362134 617.409394,511.697357 C622.107339,513.226543 629.521032,514.112461 639.650474,514.355109 L640.336909,514.337568 C650.115498,514.071859 657.30038,513.191789 661.891553,511.697357 C678.282349,506.362134 692.688868,503.247679 705.11111,502.353993 C722.696433,501.088862 751.030506,503.214809 790.113329,508.731836 L791.300947,508.900056 L791.300947,529.629258 C786.297933,531.828279 783.752241,534.010301 783.663873,536.175322 C781.481852,589.634841 763.639862,606 723.65829,606 C685.15235,606 666.860184,585.095985 650.56058,541.630375 C648.424017,535.932875 644.892754,533.024776 639.966791,532.906078 L639.650474,532.90229 C634.559091,532.90229 630.922389,535.811651 628.740368,541.630375 C612.440763,585.095985 594.148598,606 555.642657,606 C515.661085,606 497.819095,589.634841 495.637074,536.175322 C495.548712,534.010446 493.003357,531.828573 488.00101,529.629702 L488,530 L289,550 L293,541 L487.999,509 L488,508.900056 C527.696939,503.258104 556.426885,501.076083 574.189838,502.353993 Z M564.611618,508.971486 C532.97231,506.789465 518.789172,513.335528 512.243109,520.972603 C505.697045,528.609677 493.695928,595.161324 551.51949,598.434355 C609.343052,601.707387 614.798105,534.06473 611.525073,526.427656 C608.252042,518.790581 596.250925,511.153507 564.611618,508.971486 Z M714.580942,508.971486 C682.941634,511.153507 670.940518,518.790581 667.667486,526.427656 C664.394454,534.06473 669.849507,601.707387 727.673069,598.434355 C785.496631,595.161324 773.495514,528.609677 766.949451,520.972603 C760.403387,513.335528 746.220249,506.789465 714.580942,508.971486 Z\" id=\"Combined-Shape\" stroke=\"#000000\" stroke-width=\"4\" fill=\"#000000\"></path>    </g>    </g><g id=\"notion-avatar=hair\"      > <?xml version=\"1.0\" encoding=\"UTF-8\"?>    <title>Hairstyle/ 27</title>    <g id=\"Hairstyle/-27\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" stroke-linecap=\"round\" stroke-linejoin=\"round\">        <path d=\"M469,157 C744,136 814,448 814,525 C814,602 789.644252,616.859223 788,639 C785.528757,672.27668 773.195423,693.27668 751,702 C763,642 765,594.333333 757,559 C749,523.666667 715.53461,470.720366 684,442 C662.976927,422.85309 632.976927,406.85309 594,394 L592.84354,395.787816 C574.012521,424.789816 565,457 540,472 C518.954181,484.627491 457.552319,502.442896 436,516 C406.059704,534.833412 324,689 392,769 C437.333333,822.333333 443,926 409,1080 L37,1080 C72.9628691,984.988198 82.9628691,900.654864 67,827 C54.8790322,771.072195 91.0558208,712.460647 108,637 C124.528113,563.392299 96,516 121,442 C146,368 194,178 469,157 Z\" id=\"Path\" stroke=\"#000000\" stroke-width=\"12\" fill=\"#000000\"></path>    </g>    </g><g id=\"notion-avatar=accessories\"      > <?xml version=\"1.0\" encoding=\"UTF-8\"?>    <title>Accessories/ 0</title>    <g id=\"Accessories/-0\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"></g>    </g><g id=\"notion-avatar=details\"      > <?xml version=\"1.0\" encoding=\"UTF-8\"?>    <title>Details/ 0</title>    <g id=\"Details/-0\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"></g>    </g><g id=\"notion-avatar=beard\"      > <?xml version=\"1.0\" encoding=\"UTF-8\"?>    <title>Beard/ 0</title>    <g id=\"Beard/-0\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"></g>    </g>      </g>      </svg>","isFlipped":false,"attributes":{"face":6,"nose":9,"mouth":1,"eyes":9,"eyebrows":4,"glasses":2,"hair":27,"accessories":0,"details":0,"beard":0},"price":12,"randomBackground":"#999999"},"DefaultBackgroundConfig":{"color":"#e666e6","shape":"square"}}),
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
