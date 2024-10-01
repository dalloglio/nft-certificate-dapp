import { contractAbi, contractAddress } from "@/utils";
import { ethers } from "ethers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );
      const rewards = await contract.viewRewards(address);
      res.status(200).json({ rewards });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Error on getting rewards",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
