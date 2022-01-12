import { NextApiRequest, NextApiResponse } from 'next';
import { uploadFileWithMetadata } from '../../../services/ipfsController';
import { MetaBlob } from '../../../types/types';

export const handleMetaData = async (image: string, metadata: MetaBlob) => {
  const data = image.replace(/^data:image\/\w+;base64,/, '');

  const buf = Buffer.from(data, 'base64');

  const response = await uploadFileWithMetadata(buf, metadata);

  return response;
};

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body } = _req;
    const { image, name, description } = body;
    const response = await handleMetaData(image, { name, description });
    res.status(200).json({ statusCode: 200, message: 'Success', response });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
