import { ethers } from "ethers";
import NFT from "../../../nft/artifacts/contracts/NFT.sol/NFT.json";

export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const contractAbi = NFT.abi;

export const connectToMetamask = async () => {
  if (window.ethereum == undefined) {
    alert("Metamask wallet is not installed");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    await switchToHardhatNetwork();

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const account = accounts[0];
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    console.log("Connected into MetaMask with account:", account);
    return { provider, signer, account, contract };
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
  }
};

export const switchToHardhatNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x7A69" }],
    });
  } catch (error) {
    console.error("Error switching to Hardhat network:", error);
    if (error.code === 4902) {
      await addHardhatNetwork();
    }
  }
};

export const addHardhatNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x7A69",
          chainName: "Hardhat Localhost",
          rpcUrls: ["http://127.0.0.1:8545"],
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          blockExplorerUrls: null,
        },
      ],
    });
  } catch (error) {
    console.error("Error adding Hardhat network:", error);
  }
};
