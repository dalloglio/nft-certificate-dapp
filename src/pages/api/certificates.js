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

      const certificates = [];

      const ownedCertificates = await contract.getOwnedCertificates(address);

      for (let id = 1; id <= ownedCertificates.length; id++) {
        const uri = await contract.uri(id);
        const certificate = await contract.getMetadata(id);
        const [studentName, courseName, completionDate] = certificate;
        certificates.push({
          id,
          uri,
          studentName,
          courseName,
          completionDate,
        });
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
