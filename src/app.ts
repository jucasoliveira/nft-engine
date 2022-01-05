import fs from "fs";
import { createCanvas, loadImage } from "canvas";
import {
  layersOrder,
  format,
  rarity,
  defaultEdition,
  getElements,
} from "./services/config";

const canvas = createCanvas(format.width, format.height);

const ctx = canvas.getContext("2d");

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

const buildDir = `${process.env.PWD}/public/images`;
const metDataFile = "_metadata.json";
const layersDir = `${process.env.PWD}/layers`;

let metadata: {
  hash: string;
  decodedHash: any[];
  edition: string;
  date: number;
  attributes: any[];
}[] = [];
let attributes: { id: any; layer: any; name: any; rarity: any }[] = [];
let hash: any[] = [];
let decodedHash: { [x: number]: any }[] = [];
const Exists = new Map();

const layersSetup = (layersOrder: any[]) => {
  const layers = layersOrder.map(
    (layer: { name: string; number: number }, index) => ({
      id: index,
      name: layer.name,
      location: `${layersDir}/${layer.name}/`,
      elements: getElements(`${layersDir}/${layer.name}/`),
      position: { x: 0, y: 0 },
      size: { width: format.width, height: format.height },
      number: layer.number,
    })
  );
  return layers;
};

export const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
};

const saveLayer = (
  _canvas: { toBuffer: (arg0: string) => string | NodeJS.ArrayBufferView },
  _edition: string
) => {
  fs.writeFileSync(
    `${buildDir}/${_edition}.png`,
    _canvas.toBuffer("image/png")
  );
};

const addMetadata = (_edition: any) => {
  let dateTime = Date.now();
  let tempMetadata = {
    hash: hash.join(""),
    decodedHash: decodedHash,
    edition: _edition,
    date: dateTime,
    attributes: attributes,
  };
  metadata.push(tempMetadata);
  attributes = [];
  hash = [];
  decodedHash = [];
};

const addAttributes = (
  _element: { id: any; name: any; rarity: any },
  _layer: { id?: any; name?: string; number?: number }
) => {
  let tempAttr = {
    id: _element.id,
    layer: _layer.name,
    name: _element.name,
    rarity: _element.rarity,
  };
  attributes.push(tempAttr);
  hash.push(_layer.id);
  hash.push(_element.id);
  decodedHash.push({ [_layer.id]: _element.id });
};

const drawLayer = async (
  _layer: {
    id?: number;
    name?: string;
    location: any;
    elements: any;
    position: any;
    size: any;
    number: any;
  },
  _edition: any
) => {
  const rand = Math.random();
  let element = _layer.elements[Math.floor(rand * _layer.number)]
    ? _layer.elements[Math.floor(rand * _layer.number)]
    : null;
  if (element) {
    addAttributes(element, _layer);
    const image = await loadImage(`${_layer.location}${element.fileName}`);

    ctx.drawImage(
      image,
      _layer.position.x,
      _layer.position.y,
      _layer.size.width,
      _layer.size.height
    );
    saveLayer(canvas, _edition);
  }
};

export const createFiles = async (edition: number) => {
  const layers = layersSetup(layersOrder);

  let numDupes = 0;
  for (let i = 1; i <= edition; i++) {
    await layers.forEach(async (layer) => {
      await drawLayer(layer, i);
    });

    let key = hash.toString();
    if (Exists.has(key)) {
      console.log(
        `Duplicate creation for edition ${i}. Same as edition ${Exists.get(
          key
        )}`
      );
      numDupes++;
      if (numDupes > edition) break; //prevents infinite loop if no more unique items can be created
      i--;
    } else {
      Exists.set(key, i);
      addMetadata(i);
      console.log("Creating edition " + i);
    }
  }
};

export const createMetaData = () => {
  fs.stat(`${buildDir}/${metDataFile}`, (err) => {
    if (err == null || err.code === "ENOENT") {
      fs.writeFileSync(
        `${buildDir}/${metDataFile}`,
        JSON.stringify(metadata, null, 2)
      );
    } else {
      console.log("Oh no, error: ", err.code);
    }
  });
};
