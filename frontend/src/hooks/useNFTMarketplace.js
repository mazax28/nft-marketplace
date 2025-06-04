import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MarketplaceAbi from '../abis/Marketplace.json';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const rpcUrl = import.meta.env.VITE_RPC_URL;


// Convierte ipfs:// a una URL usable
const resolveIPFS = (uri) => {
  const gateway = "https://dweb.link/ipfs/";
  if (!uri) return "";
  if (uri.startsWith("ipfs://")) {
    return uri.replace("ipfs://", gateway);
  } else if (uri.includes("/ipfs/")) {
    const hash = uri.split("/ipfs/")[1];
    return `${gateway}${hash}`;
  }
  return uri;
};



export function useNFTMarketplace() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Conexión opcional de la wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Por favor instala MetaMask");
      return;
    }
    try {
      const accs = await window.ethereum.request({ method: "eth_requestAccounts" });
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await browserProvider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, MarketplaceAbi, signer);

      setProvider(browserProvider);
      setSigner(signer);
      setContract(connectedContract);
      setAccount(accs[0]);
    } catch (error) {
      console.error("Error conectando wallet:", error);
    }
  };

  // Cargar NFTs con un provider público
  const loadMarketItems = async () => {
    setLoading(true);
    const items = [];

    try {
      const publicProvider = new ethers.JsonRpcProvider(rpcUrl, {
        name: "sepolia",
        chainId: 11155111 // Verify this is correct for Ephemery
      });
      const readOnlyContract = new ethers.Contract(contractAddress, MarketplaceAbi, publicProvider);

      const tokenCounter = await readOnlyContract.tokenCounter();
      for (let i = 0; i < Number(tokenCounter); i++) {
        try {
          const [owner, price, isSold] = await readOnlyContract.getListing(i);
          if (!isSold && owner !== ethers.ZeroAddress) {
            const tokenURI = await readOnlyContract.tokenURI(i);
            const metadataRes = await fetch(resolveIPFS(tokenURI));
            const metadata = await metadataRes.json();

            items.push({
              tokenId: i,
              owner,
              price: ethers.formatEther(price),
              image: resolveIPFS(metadata.image),
              name: metadata.name,
              description: metadata.description,
            });
          }
        } catch (err) {
          console.warn(`Token ID ${i} inválido:`, err.message);
        }
      }
      setNfts(items);
    } catch (err) {
      console.error("Error al cargar NFTs:", err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMarketItems();
  }, []);

  return {
    provider,
    signer,
    contract,
    account,
    nfts,
    loading,
    connectWallet,
    loadMarketItems,
  };
}