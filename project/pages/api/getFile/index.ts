import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { ipfsGet } from '../../../services/ipfsController';

const getFile = async (ipfsPath) => {
  /*
  const ipfs = await IPFS.create();
  // const getFile = await ipfs.get(ipfsPath);
  for await (const buf of ipfs.get(ipfsPath)) {
    console.log(buf);
  }
  */
};
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body } = _req;
    const { hash } = body;
    const getImage = await ipfsGet(hash);
    res.status(200).json({ statusCode: 200, message: 'Success', getImage });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
