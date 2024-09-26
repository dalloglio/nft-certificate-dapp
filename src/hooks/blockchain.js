import { connectToMetamask } from "@/utils";
import { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
  provider: null,
  signer: null,
  account: null,
  contract: null,
  isConnected: false,
};

const BlockchainContext = createContext(defaultState);

export const BlockchainProvider = ({ children }) => {
  const [data, setData] = useState(defaultState);

  const connectWallet = async () => {
    try {
      const { provider, signer, account, contract } = await connectToMetamask();
      setData({ provider, signer, account, contract, isConnected: true });
    } catch (error) {
      console.error("Error connecting the wallet", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <BlockchainContext.Provider value={{ ...data, connectWallet }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  return useContext(BlockchainContext);
};
