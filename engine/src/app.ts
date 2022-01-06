import fs from "fs";
import { createCanvas, Image, loadImage } from "canvas";
import {
  format,
  AvatarStyleCount,
  SVGFilter,
  PalettePreset,
} from "./services/config";
import { AvatarConfigExtra, AvatarPart } from "./types";
import { Blob } from "buffer";

const canvas = createCanvas(format.width, format.height);

const ctx = canvas.getContext("2d");

const img = new Image();

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

export const createImage = async (
  fileName: string,
  filePath: string,
  svg: string
): Promise<void> => {
  try {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const dom = new JSDOM(svg);

    // const image = await svgToImg.from(`${svg}`).toPng();

    const svgData = await loadImage(dom);

    console.log("svgData", svgData);

    ctx.drawImage(svgData, format.width, format.height);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./test.png", buffer);
  } catch (err) {
    console.log(err);
  }
};

export const getRandomStyle = (): AvatarConfigExtra => {
  const config = Object.keys(AvatarStyleCount).reduce(
    (prev, next) =>
      Object.assign(prev, {
        [next]: Math.floor(
          Math.random() * (AvatarStyleCount[next as AvatarPart] + 1)
        ),
      }),
    {} as Record<keyof AvatarConfigExtra, number>
  );
  // for harmony
  config.beard = 0;
  config.details = 0;
  config.accessories = 0;

  return config;
};

const rollDicesForBackground = Math.random() * (100 - 0) + 0;
const randomBackground =
  (rollDicesForBackground < 20 &&
    PalettePreset[Math.floor(Math.random() * PalettePreset.length)]) ||
  "#999999";

export const generatePreview = async (edition: number) => {
  const config = { ...getRandomStyle() };
  const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const isFlipped = Math.random() > 0.5;

  const groups = await Promise.all(
    Object.keys(AvatarStyleCount).map(async (type) => {
      var svgRaw = `${fs.readFileSync(
        `${__dirname}/public/avatar/preview/${type}/${
          config[type as AvatarPart]
        }.svg`
      )}`;

      return `<g id="notion-avatar=${type}" ${
        type === "face" ? `fill="${color}"` : ""
      }  ${
        isFlipped ? 'transform="scale(-1,1) translate(-1080, 0)"' : ""
      }   > ${svgRaw.replace(/<svg.*(?=>)>/, "").replace("</svg>", "")}
    </g>`;
    })
  );

  const previewSvg =
    `<svg viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${SVGFilter}
      <g id="notion-avatar" filter="url(#filter)">
        ${groups.join("\n\n")}
      </g>
      </svg>`
      .trim()
      .replace(/(\n|\t)/g, "");

  return previewSvg;
  return `<div
          style="background-color: ${randomBackground}"
        >
        ${previewSvg}
        </div>
  `;
};
