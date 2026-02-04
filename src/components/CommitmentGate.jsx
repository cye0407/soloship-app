import { useState } from 'react';
import useStore from '../store/useStore';

export default function CommitmentGate({ onCommit }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="commitment-gate">
      <div className="commitment-content">
        <h1>Before we begin</h1>
        <p className="commitment-intro">
          Building a solo product isn't just about having an idea. Let's be real about what this takes.
        </p>

        <div className="commitment-section">
          <h2>Money</h2>
          <ul>
            <li>Validation budget: €200-500 (paid interviews, landing page tools, small ad spend)</li>
            <li>Domain + basic tools: €50-100</li>
            <li>Total to validate properly: €300-600</li>
          </ul>
        </div>

        <div className="commitment-section">
          <h2>Time</h2>
          <ul>
            <li>5-10 hours per week minimum</li>
            <li>Expect 8-12 weeks to validated concept</li>
            <li>This is a part-time job, not a weekend project</li>
          </ul>
        </div>

        <div className="commitment-section">
          <h2>Discomfort</h2>
          <ul>
            <li>You will show unfinished work to strangers</li>
            <li>You will hear "I don't need this"</li>
            <li>You will put yourself out there before you're ready</li>
          </ul>
        </div>

        <div className="commitment-section">
          <h2>The deal</h2>
          <ul>
            <li>No skipping validation</li>
            <li>Evidence required at every gate</li>
            <li>Claude will push back when you're avoiding the hard parts</li>
          </ul>
        </div>

        <div className="commitment-agreement">
          <label className="commitment-checkbox">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>I understand and I'm ready to commit</span>
          </label>
        </div>

        <button 
          className="btn btn-primary btn-lg btn-full"
          disabled={!agreed}
          onClick={onCommit}
        >
          Begin
        </button>

        <p className="commitment-note">
          If you're not ready, that's okay. Close this and come back when you are.
        </p>
      </div>
    </div>
  );
}
