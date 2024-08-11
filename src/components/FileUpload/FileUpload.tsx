"use client";
import React, { useState, useRef, ChangeEvent, DragEventHandler } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface FileInputProps {
  onFileSelect: (file: File) => void;
}
const FileInput = ({ onFileSelect }: FileInputProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e?.dataTransfer?.files && e.dataTransfer.files[0]) {
      inputRef.current!.files = e.dataTransfer.files;
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={`file-input-container ${dragActive ? "drag-active" : ""}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Input
        ref={inputRef}
        type="file"
        className="input-file"
        onChange={handleChange}
      />
      {/* <Button className="file-upload-btn" onClick={onButtonClick}>
        Choose a file
      </Button> */}
      <p>or drag and drop your file here</p>
    </div>
  );
};

export default FileInput;
