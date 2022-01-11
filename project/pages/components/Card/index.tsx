import React from "react";
import { AvatarBackgroundConfig, ShapeStyle } from "../../../types/types";
import Button from "../Button";
import Link from 'next/link'




export default function Card({background , ShapeStyleMapping, svgPreview , DefaultBackgroundConfig}) {

  const { attributes, price } = svgPreview;

  return  <Link
            href={{
              pathname: '/mint/[id]',
              query: { id: JSON.stringify({ background , svgPreview , DefaultBackgroundConfig}) },
            }}
          >
            <div className="mt-5 grid gap-y-10  sm:grid-cols-2  ">
              <div className="group relative">
                  <div className="w-full min-h-40 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-40  lg:aspect-none">
                    <div
                      style={{
                        backgroundColor:
                              background.shape === 'none'
                                ? DefaultBackgroundConfig.color
                                : background.color,

                      }}
                      id="avatar-preview"
                      className={`w-full min-h-40 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-75 lg:h-40 lg:aspect-none ${
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
                          {background.color === "#999999" ? "Normal" : "Rare"}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{svgPreview.isFlipped ? "Flipped" : "Not Flipped"}</p>
                      {attributes.glasses > 0 && <p className="mt-1 text-sm text-gray-500">Glasses</p>}
                      {attributes.accessories > 0 && <p className="mt-1 text-sm text-gray-500">Accessories</p>}
                      {attributes.beard > 0 && <p className="mt-1 text-sm text-gray-500">Beard</p>}
                    </div>
                    <p className="text-sm font-medium text-gray-900">${price}</p>
                  </div>
              </div>
            </div>
      </Link>
}