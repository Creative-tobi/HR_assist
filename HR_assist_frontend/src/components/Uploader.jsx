import React from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileCheck, File } from "lucide-react";

const Uploader = ({ file, setFile }) => {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex-grow relative overflow-hidden border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-10 transition-all duration-300 ease-in-out cursor-pointer group
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50 scale-[1.02] shadow-inner"
            : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300"
        }`}>
      <input {...getInputProps()} />

      {!file ? (
        <div className="flex flex-col items-center text-center">
          <div
            className={`p-4 rounded-full mb-4 transition-colors ${isDragActive ? "bg-blue-100 text-blue-600" : "bg-white text-slate-400 group-hover:text-blue-500 shadow-sm"}`}>
            <UploadCloud
              className={`w-10 h-10 ${isDragActive ? "animate-bounce" : ""}`}
            />
          </div>
          <p className="text-slate-700 font-semibold text-lg">
            Drag & drop resume PDF
          </p>
          <p className="text-slate-400 text-sm mt-2">
            or click to browse your computer
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
          <div className="relative">
            <File className="w-16 h-16 text-blue-100 absolute -top-1 -left-1" />
            <FileCheck className="w-16 h-16 text-blue-600 relative z-10" />
          </div>
          <p className="text-slate-800 font-bold text-lg mt-4 truncate max-w-[250px]">
            {file.name}
          </p>
          <p className="text-blue-600 text-sm font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to replace file
          </p>
        </div>
      )}
    </div>
  );
};

export default Uploader;
