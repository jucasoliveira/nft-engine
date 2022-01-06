import { createImage, generatePreview } from "./src/app";
import { defaultEdition } from "./src/services/config";

const myArgs = process.argv.slice(2);

const edition = myArgs.length > 0 ? Number(myArgs[0]) : defaultEdition;

const asyncFunction = async (): Promise<void> => {
  try {
    console.log("Generating preview...");
    const preview = await generatePreview();
    // await createImage("image_1", "./src/public/images", preview);
  } catch (err) {
    console.log(err);
  }
};

asyncFunction();
