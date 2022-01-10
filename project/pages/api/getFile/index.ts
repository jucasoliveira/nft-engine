import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import * as IPFS from "ipfs-core";
//Required modules

/*
{
  path: 'Qmc9nYE8ByeZpX5cFRTDSQdzR4x2kg8DWFPu6DMhEf4ZsT',
  cid: CID(Qmc9nYE8ByeZpX5cFRTDSQdzR4x2kg8DWFPu6DMhEf4ZsT),
  size: 12928,
  mode: 420,
  mtime: undefined
}
*/

const getFile = async (ipfsPath) => {
  const ipfs = await IPFS.create();
  // const getFile = await ipfs.get(ipfsPath);
  for await (const buf of ipfs.get(ipfsPath)) {
    console.log(buf);
  }
};
const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    getFile("Qmc9nYE8ByeZpX5cFRTDSQdzR4x2kg8DWFPu6DMhEf4ZsT");
    res.status(200).json({ statusCode: 200, message: "Success" });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
