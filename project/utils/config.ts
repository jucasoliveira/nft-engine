import fs from 'fs';
import { AvatarConfigBase } from '../types/types';

export const layersOrder = [
  { name: 'background', number: 1 },
  { name: 'ball', number: 2 },
  { name: 'eye color', number: 12 },
  { name: 'iris', number: 3 },
  { name: 'shine', number: 1 },
  { name: 'shine', number: 1 },
  { name: 'bottom lid', number: 3 },
  { name: 'top lid', number: 3 },
];

export const format = {
  width: 1000,
  height: 1000,
};

export const rarity = [
  { key: '', val: 'original' },
  { key: '_r', val: 'rare' },
  { key: '_sr', val: 'super rare' },
];

export const PalettePreset = [
  '#fa541c',
  '#faad14',
  '#fadb14',
  '#a0d911',
  '#52c41a',
  '#1890ff',
  '#2f54eb',
  '#722ed1',
  '#eb2f96',
  '#bfbfbf',
];

export const rollDices = Math.random() * (100 - 0) + 0;
export const defaultEdition = 5;

export const AvatarStyleCount: AvatarConfigBase = {
  face: 10,
  nose: 10,
  mouth: 10,
  eyes: 10,
  eyebrows: 10,
  glasses: 10,
  hair: 30,
  accessories: 10,
  details: 10,
  beard: 10,
};

export const SVGFilter = `<defs>
  <filter id="filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
    <feMorphology operator="dilate" radius="20 20" in="SourceAlpha" result="morphology"/>
    <feFlood flood-color="#ffffff" flood-opacity="1" result="flood"/>
    <feComposite in="flood" in2="morphology" operator="in" result="composite"/>
    <feMerge result="merge">
          <feMergeNode in="composite" result="mergeNode"/>
      <feMergeNode in="SourceGraphic" result="mergeNode1"/>
      </feMerge>
  </filter>
</defs>`;

const addRarity = (_str: string | string[]) => {
  let itemRarity;

  rarity.forEach((r) => {
    if (_str.includes(r.key)) {
      itemRarity = r.val;
    }
  });

  return itemRarity;
};

const cleanName = (_str: string) => {
  let name: string = _str.slice(0, -4);
  rarity.forEach((r) => {
    name = name.replace(r.key, '');
  });
  return name;
};

export const getElements = (path: any) => {
  return fs
    .readdirSync(path)
    .filter((item: string) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i: any, index: number) => {
      return {
        id: index + 1,
        name: cleanName(i),
        fileName: i,
        rarity: addRarity(i),
      };
    });
};
