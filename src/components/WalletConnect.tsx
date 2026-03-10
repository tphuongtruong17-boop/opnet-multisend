import { useState, useEffect } from 'react';

interface Props {
  onConnect: (addr: string | null) => void;
  account: string | null;
}

export function WalletConnect({ onConnect, account }: Props) {
  const [connecting, setConnecting] = useState(false);

  const connect = async () => {
    setConnecting(true);
    try {
      if (typeof window !== 'undefined' && (window as any).unisat) {
        const accounts = await (window as any).unisat.requestAccounts();
        onConnect(accounts[0]);
      } else {
        alert('Please install UniSat wallet');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    onConnect(null);
  };

  return (
    <div className="flex justify-center">
      {!account ? (
        <button
          onClick={connect}
          disabled={connecting}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg"
        >
          {connecting ? 'Connecting...' : 'Connect UniSat Wallet'}
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-sm bg-slate-800 px-4 py-2 rounded">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button
            onClick={disconnect}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
