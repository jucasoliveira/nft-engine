import Link from 'next/link'
import { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import { generatePreview } from '../services/randomImage';
import { AvatarBackgroundConfig } from '../types/types';
import { PalettePreset, rollDices } from '../utils/config';
import { DefaultBackgroundConfig, ShapeStyleMapping } from '../utils/const';


const IndexPage = ({preview, randomBackground}) => {

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
  }, []);
  
  return <Layout title="Home | Next.js + TypeScript Example 👋">
    <div className="flex justify-center items-center flex-col">
    <div
      style={{
        backgroundColor:
              background.shape === 'none'
                ? DefaultBackgroundConfig.color
                : background.color,
          width: '600px',
        height: '600px',

      }}
      id="avatar-preview"
      className={`w-100 h-100 md:w-72 md:h-72 ${
        ShapeStyleMapping[background.shape]
      }`}
      dangerouslySetInnerHTML={{
        __html: svgPreview,
      }}
        />
    </div>
  </Layout>
}

export async function getServerSideProps(context) {
  
  const preview = await generatePreview();
  const randomBackground = rollDices < 20 && PalettePreset[Math.floor(Math.random() * PalettePreset.length)] || '#999999';

  console.log(randomBackground);
  return {
    props: {
      preview,
      randomBackground,
    }, // will be passed to the page component as props
  };
}

export default IndexPage
