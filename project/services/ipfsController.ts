/**
 * this is to get tue gateway
 */

/**
 * this is to get the up gateway
 * @type {Bzz}
 */

import { create } from 'ipfs-http-client';
import { MetaBlob, MetaData } from '../types/types';
const url = JSON.parse(`${process.env.NEXT_PUBLIC_IPFS_OPTION}`);
const client = create(url);

const uploadFileMetadata = ({ name, description, image }: MetaData) => {
  const metadata = JSON.stringify({
    name,
    description,
    image
  });
  return client.add(metadata);
};

const uploadFile = async (file: Buffer) => {
  let added = await client.add(file, {
    progress: (prog) => console.log(`received: ${prog}`)
  });
  return `${process.env.NEXT_PUBLIC_IPFS_URI}${added.path}`;
};

export const uploadFileWithMetadata = async (file: Buffer, metadata: MetaBlob) => {
  //   Upload file and get image URI
  const fileUrl = await uploadFile(file);
  console.log('File uploaded to IPFS', fileUrl);
  // Upload metadata
  const added = await uploadFileMetadata({ ...metadata, image: fileUrl });
  return `${process.env.NEXT_PUBLIC_IPFS_URI}${added.path}`;
};
