import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ResultDisplay from './components/ResultDisplay';
import './styles/App.css';

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="App">
      <h1>Fashion Recognition AI</h1>
      <ImageUpload onResultReceived={setResult} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default App;