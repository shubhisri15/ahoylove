import React, { useRef, useState } from "react";
import uploadIcon from "../assets/fileupload.svg"; // use your SVG path

export default function FileUploadButton() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);

  const handleClick = () => fileInputRef.current.click();
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="flex flex-col gap-1 text-sm text-gray-700 w-full max-w-[240px]">
      <label>Background image (optional)</label>

      <div className="flex items-center justify-between rounded-xl border-1 border-[#929292] bg-white w-full">
        {/* Upload file button */}
        <div
          onClick={handleClick}
          className="flex items-center gap-2 cursor-pointer border border-gray-300 px-2 py-1 w-5/6 rounded-md shadow-sm hover:bg-gray-50 transition ml-2"
        >
          <img src={uploadIcon} alt="Upload" className="w-4 h-4" />
          <span className="text-blue-500 text-xs">Upload file</span>
        </div>

        {/* File name display */}
        <p className="text-black text-sm font-medium truncate max-w-[150px] text-right">
          {fileName || ""}
        </p>

        {/* Hidden input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          className="invisible"
        />
      </div>
    </div>
  );
}
