import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "../utils/contractAbi";

export function useVotingContract() {
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function connectWallet() {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          const contract = new ethers.Contract(contractAddress, abi, signer);

          setAddress(address);
          setSigner(signer);
          setContract(contract);
          setIsConnected(true);

          const admin = await contract.administrator();
          setIsAdmin(admin.toLowerCase() === address.toLowerCase());
        } catch (error) {
          console.error("Failed to connect wallet:", error);
        }
      }
    }

    connectWallet();

    window.addEventListener("ethereum#accountsChanged", () => {
      window.location.reload();
    });
  }, []);

  return { contract, signer, address, isConnected, isAdmin };
}