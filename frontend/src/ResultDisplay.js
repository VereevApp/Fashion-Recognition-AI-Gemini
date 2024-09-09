import React from 'react';

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  if (result.error) {
    return <div className="error">{result.error}</div>;
  }

  return (
    <div className="result">
      <h2>Fashion Analysis Results</h2>
      <h3>Detected Items:</h3>
      <ul>
        {result.items.map((item, index) => (
          <li key={index}>{item.description} (Confidence: {(item.score * 100).toFixed(2)}%)</li>
        ))}
      </ul>
      <h3>Dominant Colors:</h3>
      <div className="color-squares">
        {result.colors.map((color, index) => (
          <div key={index} className="color-square" style={{backgroundColor: color.color}}>
            <span>{color.color}</span>
            <span>{(color.score * 100).toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDisplay;