import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);  // Store the actual file
  const [result, setResult] = useState(null);

  const handleImageUpload = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
    setImageFile(event.target.files[0]);  // Store the selected image file
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', imageFile);  // Attach the image file

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);  // Use actual data returned from the backend
      } else {
        setResult({ error: `Error: ${data.error}` });
      }
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'An error occurred while analyzing the image.' });
    }
  };

  return (
    <div className="App">
      <h1>Shoe Recognition AI</h1>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '300px', marginTop: '20px' }} />
          <br />
          <button onClick={handleSubmit}>Analyze Shoe</button>
        </div>
      )}
      {result && (
        <div className="result">
          {result.error ? (
            <p style={{ color: 'red' }}>{result.error}</p>
          ) : (
            <>
              <h2>Labels:</h2>
              <ul>
                {result.labels.map((label, index) => (
                  <li key={index}>{label}</li>
                ))}
              </ul>
              <h3>Colors:</h3>
              <ul>
                {result.colors.map((color, index) => (
                  <li key={index} style={{ color: color }}>{color}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
