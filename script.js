// MetaMask Integration
async function payWithMetaMask() {
  const address = "0xF863fFEd58677449a5bF9Ee0cd78d8D0a2319484"; // твой MetaMask кошелёк
  const ethAmount = "0.01";

  if (typeof window.ethereum !== 'undefined') {
    try {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const tx = {
        from: account,
        to: address,
        value: (parseFloat(ethAmount) * 1e18).toString(16),
      };
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [tx],
      });
      alert("Transaction sent! Thank you.");
    } catch (error) {
      console.error(error);
      alert("Transaction failed.");
    }
  } else {
    alert("Please install MetaMask.");
  }
}

// Phantom Integration
async function payWithPhantom() {
  const solanaAddress = "HyqeirFyPZbAam6QJCCCNiKEpyj4KqSAj6aBDGoqpzg2"; // твой Phantom
  const amount = 0.01;

  if ("solana" in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      try {
        await provider.connect();
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'));
        const transaction = new solanaWeb3.Transaction().add(
          solanaWeb3.SystemProgram.transfer({
            fromPubkey: provider.publicKey,
            toPubkey: new solanaWeb3.PublicKey(solanaAddress),
            lamports: amount * solanaWeb3.LAMPORTS_PER_SOL,
          })
        );
        const { signature } = await provider.signAndSendTransaction(transaction);
        await connection.confirmTransaction(signature);
        alert("Phantom payment successful!");
      } catch (err) {
        console.error(err);
        alert("Transaction failed.");
      }
    }
  } else {
    alert("Please install Phantom Wallet.");
  }
}