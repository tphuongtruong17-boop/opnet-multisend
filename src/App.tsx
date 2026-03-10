import { useState } from 'react';
import { WalletConnect } from './components/WalletConnect';
import { BatchTransfer } from './components/BatchTransfer';

function App() {
  const [account, setAccount] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">OPNet Multisend</h1>
        <WalletConnect onConnect={setAccount} account={account} />
      </header>
      
      <main className="max-w-4xl mx-auto">
        {account ? (
          <BatchTransfer account={account} />
        ) : (
          <div className="text-center text-gray-400 mt-20">
            <p>Connect wallet to start batch transferring</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
