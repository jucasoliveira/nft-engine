import fs from 'fs';
import { AvatarConfigExtra, AvatarPart } from '../types/types';
import { AvatarStyleCount, PalettePreset, SVGFilter } from '../utils/config';

export const getRandomStyle = (): AvatarConfigExtra => {
  const config = Object.keys(AvatarStyleCount).reduce(
    (prev, next) =>
      Object.assign(prev, {
        [next]: Math.floor(
          Math.random() * (AvatarStyleCount[next as AvatarPart] + 1),
        ),
      }),
    {} as Record<keyof AvatarConfigExtra, number>,
  );
  // for harmony
  const hasBeard = Math.random() > 0.5;
  config.beard = hasBeard
    ? Math.floor(Math.random() * (AvatarStyleCount.beard + 1))
    : 0;
  config.details = 0;
  config.accessories = 0;

  return config;
};

export const generatePreview = async () => {
  const config = { ...getRandomStyle() };
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const isFlipped = Math.random() > 0.5;

  const groups = await Promise.all(
    Object.keys(AvatarStyleCount).map(async (type) => {
      const svgRaw = `${fs.readFileSync(
        `./public/avatar/preview/${type}/${config[type as AvatarPart]}.svg`,
      )}`;

      return `<g id="notion-avatar=${type}" ${
        type === 'face' ? `fill="${color}"` : ''
      }  ${
        isFlipped ? 'transform="scale(-1,1) translate(-1080, 0)"' : ''
      }   > ${svgRaw.replace(/<svg.*(?=>)>/, '').replace('</svg>', '')}
    </g>`;
    }),
  );

  const previewSvg =
    `<svg viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${SVGFilter}
      <g id="notion-avatar" filter="url(#filter)">
        ${groups.join('\n\n')}
      </g>
      </svg>`
      .trim()
      .replace(/(\n|\t)/g, '');

  const basePrice = 10;
  const randomBackground =
    (Math.random() * (100 - 0) + 0 < 20 &&
      PalettePreset[Math.floor(Math.random() * PalettePreset.length)]) ||
    '#999999';

  const price =
    basePrice +
    (config.beard ? config.beard : 0) +
    (config.accessories ? config.accessories : 0) +
    (config.glasses ? config.glasses : 0) +
    (randomBackground === '#999999' ? 0 : 20);

  return {
    previewSvg,
    isFlipped,
    attributes: config,
    price,
    randomBackground,
  };
};
