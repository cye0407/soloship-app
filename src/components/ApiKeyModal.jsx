import { useState } from 'react';
import useStore from '../store/useStore';

export default function ApiKeyModal() {
  const { setApiKey } = useStore();
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!key.trim()) {
      setError('Please enter your API key');
      return;
    }
    
    if (!key.startsWith('sk-ant-')) {
      setError('Invalid API key format. Should start with sk-ant-');
      return;
    }
    
    setApiKey(key.trim());
  };

  return (
    <div className="modal-overlay">
      <div className="modal api-key-modal">
        <div className="modal-icon">🔑</div>
        <h1>Enter your Anthropic API Key</h1>
        <p className="modal-desc">
          Soloship uses Claude as your AI co-founder. Your key is stored locally and never sent to our servers.
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="form-input"
            placeholder="sk-ant-..."
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setError('');
            }}
            autoFocus
          />
          {error && <div className="form-error">{error}</div>}
          
          <button type="submit" className="btn btn-primary btn-full">
            Continue
          </button>
        </form>
        
        <p className="modal-help">
          Get your API key from{' '}
          <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer">
            console.anthropic.com
          </a>
        </p>
      </div>
    </div>
  );
}
