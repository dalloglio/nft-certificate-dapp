import { ethers } from "ethers";
import NFT from "../../../../nft/artifacts/contracts/NFT.sol/NFT.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(contractAddress, NFT.abi, provider);

      const certificates = [];

      const ownedCertificates = await contract.getOwnedCertificates(address);

      for (let i = 1; i <= ownedCertificates.length; i++) {
        const uri = await contract.uri(i);
        certificates.push({ id: i, uri });
      }

      res.status(200).json(certificates);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Error on getting certificates metadata",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
