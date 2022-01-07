import { NextApiRequest, NextApiResponse } from "next";
import * as IPFS from "ipfs-core";

const addFile = async (content, name) => {
  const ipfs = await IPFS.create();
  const addFile = await ipfs.add({
    path: name,
    content,
  });
  return addFile;
};

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body } = _req;
    const { image, name } = body;
    const data = image.replace(/^data:image\/\w+;base64,/, "");

    const buf = Buffer.from(data, "base64");
    //await fs.writeFile("image.png", buf);

    const response = addFile(buf, name);
    res.status(200).json({ statusCode: 200, message: "Success", response });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
