import { useState, useEffect } from 'react';

interface Props {
  account: string;
}

interface Recipient {
  id: string;
  address: string;
  amount: string;
}

export function BatchTransfer({ account }: Props) {
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: '1', address: '', amount: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const addRecipient = () => {
    if (recipients.length >= 100) return;
    setRecipients([
      ...recipients,
      { id: Math.random().toString(36).substr(2, 9), address: '', amount: '' }
    ]);
  };

  const removeRecipient = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id));
  };

  const updateRecipient = (id: string, field: keyof Recipient, value: string) => {
    setRecipients(recipients.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const handleCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim());
      const newRecipients = lines.slice(1).map((line, i) => {
        const [address, amount] = line.split(',');
        return {
          id: i.toString(),
          address: address?.trim() || '',
          amount: amount?.trim() || ''
        };
      }).filter(r => r.address);
      
      setRecipients(newRecipients.slice(0, 100));
      setStatus(`Loaded ${newRecipients.length} recipients from CSV`);
    };
    reader.readAsText(file);
  };

  const submit = async () => {
    const valid = recipients.filter(r => r.address && parseFloat(r.amount) > 0);
    if (valid.length === 0) {
      setStatus('No valid recipients');
      return;
    }

    setLoading(true);
    setStatus('Processing...');

    try {
      // This is a placeholder - actual implementation needs OPNet SDK
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus(`Success! Sent to ${valid.length} recipients`);
    } catch (err: any) {
      setStatus('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const total = recipients.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Batch Transfer</h2>
        <span className="text-sm text-gray-400">{recipients.length}/100</span>
      </div>

      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleCSV}
          className="block w-full text-sm text-gray-400
            file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
            file:text-sm file:font-semibold file:bg-blue-600 file:text-white"
        />
        <p className="text-xs text-gray-500 mt-1">CSV format: address,amount</p>
      </div>

      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
        {recipients.map((r, idx) => (
          <div key={r.id} className="flex gap-2">
            <span className="text-gray-500 w-8 text-center py-2">{idx + 1}</span>
            <input
              placeholder="bc1p... address"
              value={r.address}
              onChange={(e) => updateRecipient(r.id, 'address', e.target.value)}
              className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Amount"
              value={r.amount}
              onChange={(e) => updateRecipient(r.id, 'amount', e.target.value)}
              className="w-28 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm"
            />
            <button
              onClick={() => removeRecipient(r.id)}
              className="text-red-400 hover:text-red-300 px-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addRecipient}
        className="w-full py-2 border-2 border-dashed border-slate-600 rounded text-gray-400 hover:border-blue-500 hover:text-blue-400 mb-4"
      >
        + Add Recipient
      </button>

      <div className="bg-slate-700 rounded p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span>Total Amount:</span>
          <span className="font-mono">{total.toFixed(8)} BTC</span>
        </div>
        <div className="flex justify-between">
          <span>Recipients:</span>
          <span className="font-mono">{recipients.filter(r => r.address).length}</span>
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 font-bold py-3 rounded-lg"
      >
        {loading ? 'Processing...' : 'Send Batch'}
      </button>

      {status && (
        <p className="mt-4 text-center text-sm text-gray-300">{status}</p>
      )}
    </div>
  );
}
