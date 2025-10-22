import React, { useState } from 'react';
import axios from 'axios';

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({
    filename: '',
    documentType: '',
    generatedFor: ''
  });
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMetadata((prev) => ({
      ...prev,
      filename: e.target.files[0]?.name || ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetadata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));

    try {
      const response = await axios.post('http://localhost:8080/api/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add auth header if needed:
          // 'Authorization': 'Bearer your_token_here'
        },
        withCredentials: true // if using cookies for auth
      });
      setMessage(`Upload successful: ${response.data.filename}`);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    }
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} required /><br /><br />
        <input
          type="text"
          name="documentType"
          placeholder="Document Type"
          value={metadata.documentType}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="text"
          name="generatedFor"
          placeholder="Generated For"
          value={metadata.generatedFor}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadDocument;
