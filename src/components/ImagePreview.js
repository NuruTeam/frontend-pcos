import React, { useState, useEffect } from 'react';

const ImagePreview = ({ imageUrl, predictions }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
  
    useEffect(() => {
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => setImageLoaded(true);
    }, [imageUrl]);
  
    const renderCysts = () => {
        if (!predictions || !imageLoaded) return null;
      
        const image = document.querySelector('img');
        const { naturalWidth, naturalHeight } = image;
        const aspectRatio = naturalWidth / naturalHeight;
      
        return predictions.map((prediction, index) => {
          const { boundingBox, probability, tagName } = prediction;
          const { top, left, width, height } = boundingBox;
      
          // Filter cysts with a probability above 80%
          if (probability < 0.6) return null;
      
          // Calculate position and size of the cysts relative to the image dimensions
          const cystStyle = {
            position: 'absolute',
            top: `${top * 100 * aspectRatio}%`, // Scale the top position based on aspect ratio
            left: `${left * 100}%`,
            width: `${width * 100}%`,
            height: `${height * 100 * aspectRatio}%`, // Scale the height based on aspect ratio
            border: '2px solid red',
          };
      
          // Calculate percentage probability
          const percentage = (probability * 100).toFixed(2);
      
          return (
            <div key={index} style={cystStyle}>
              <p style={{ margin: '0', color: 'red', fontSize: '12px' }}>{tagName}: {percentage}%</p>
            </div>
          );
        });
      };
      
  
    return (
      <div style={{ position: 'relative', width: 'fit-content', height: 'fit-content', overflow: 'hidden' }}>
        <h2>Image Preview</h2>
        <img
          src={imageUrl}
          alt="Preview"
          style={{ maxWidth: '100%', height: 'auto' }}
          onLoad={() => setImageLoaded(true)}
        />
        {renderCysts()}
      </div>
    );
  };
  
  export default ImagePreview;
  