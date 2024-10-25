import React from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';
import DownIcon from './../../../assets/icons/arrow-down-icon.svg';

const FileUpload = ({ width = '473px', height = '504px', onDrop, imagePreview }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`drag-file-upload ${isDragActive ? 'drag-active' : ''}`} style={{ width, height }}>
      <input {...getInputProps()} />
      {imagePreview ? (
        <img src={imagePreview} className="uploaded-image" alt="no uploaded image" />
      ) : (
        <div className="drag-file-upload-content">
          <img src={DownIcon} alt="" />
          <span className="drag-upload-text">{isDragActive ? 'Drop an image here' : 'Drop an image here'}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
