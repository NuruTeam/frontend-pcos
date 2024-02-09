import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext';
import ImagePreview from '../components/ImagePreview';
import { Cloudinary } from "@cloudinary/url-gen";
import '../components/ImageUploadForm'; // Import the CSS file

const ImageUploadForm = ({ accessToken }) => {
  const [file, setFile] = useState(null);
  const [diagnosisName, setDiagnosisName] = useState('');
  const [diagnosisDescription, setDiagnosisDescription] = useState('');
  const [diagnosisImageUrl, setDiagnosisImageUrl] = useState('');
  const [uploadType, setUploadType] = useState('file');
  const [predictions, setPredictions] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);
//   const cld = new Cloudinary({ cloud: { cloudName: 'praisecom' } });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDiagnosisImageUrl('');
  };

  const handleLinkChange = (e) => {
    setDiagnosisImageUrl(e.target.value);
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = diagnosisImageUrl;
    //   if (file) {
    //     imageUrl = await uploadToCloudinary();
    //   }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const raw = JSON.stringify({
        "diagnosis_name": diagnosisName,
        "diagnosis_description": diagnosisDescription,
        "diagnosis_image_url": imageUrl
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch("https://5242-41-89-4-66.ngrok-free.app/patient/diagnosis", requestOptions);
      const result = await response.json();
      console.log(result);

      setPredictions(result?.health?.predictions);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    setPredictions(null);
  }, [diagnosisImageUrl]);

  return (
    <div className="container">
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Diagnosis Name" value={diagnosisName} onChange={(e) => setDiagnosisName(e.target.value)} />
        <input type="text" placeholder="Diagnosis Description" value={diagnosisDescription} onChange={(e) => setDiagnosisDescription(e.target.value)} />

        <div>
          <input type="radio" id="file" name="uploadType" value="file" checked={uploadType === 'file'} onChange={() => setUploadType('file')} />
          <label htmlFor="file">Upload File</label>
        </div>
        <div>
          <input type="radio" id="link" name="uploadType" value="link" checked={uploadType === 'link'} onChange={() => setUploadType('link')} />
          <label htmlFor="link">Provide Link</label>
        </div>

        {uploadType === 'file' ? (
          <input type="file" onChange={handleFileChange} />
        ) : (
          <input type="text" placeholder="Image Link" value={diagnosisImageUrl} onChange={handleLinkChange} />
        )}

        <button type="submit">Upload</button>
      </form>

      {predictions && <ImagePreview imageUrl={diagnosisImageUrl} predictions={predictions} />}

    </div>
  );
};

export default ImageUploadForm;
