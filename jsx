// src/pages/index.js

import React, { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const [selectedAccount] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(selectedAccount);
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Quantum NFT Minting dApp</h1>

      {!account ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-white text-purple-700 rounded shadow hover:bg-purple-100"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-lg text-white">Connected: {account}</p>
      )}

      {/* Mint functionality goes here */}
    </div>
  );
}
