import { generatePreview } from '../services/randomImage';
import { DefaultBackgroundConfig, ShapeStyleMapping } from '../utils/const';

import Card from './components/Card';

const IndexPage = ({ generateImages }) => {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-3 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">MarketPlace</h1>
        </div>
      </header>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-2 gap-y-1 gap-x-0 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {generateImages &&
              generateImages.map((elm, index) => (
                <Card
                  key={index}
                  background={{
                    color: elm.randomBackground,
                    shape: 'square',
                  }}
                  ShapeStyleMapping={ShapeStyleMapping}
                  DefaultBackgroundConfig={DefaultBackgroundConfig}
                  svgPreview={elm.preview}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const numberToRoll = 8;
  const generateImages = [];
  for (let i = 0; i < numberToRoll; i++) {
    const preview = await generatePreview();
    generateImages.push({
      preview,
      randomBackground: preview.randomBackground,
    });
  }
  12;

  return {
    props: {
      generateImages,
    }, // will be passed to the page component as props
  };
}

export default IndexPage;
