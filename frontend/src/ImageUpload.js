import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onResultReceived }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', image);

      try {
        const response = await axios.post('http://localhost:5000/analyze', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        onResultReceived(response.data);
      } catch (error) {
        console.error('Error:', error);
        onResultReceived({ error: 'An error occurred while analyzing the image.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <button type="submit" disabled={!image || loading}>
        {loading ? 'Analyzing...' : 'Analyze Fashion'}
      </button>
    </form>
  );
};

export default ImageUpload;