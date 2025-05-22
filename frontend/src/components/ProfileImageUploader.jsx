import React, { useRef } from "react";
import { X } from "lucide-react";

const ProfileImageUploader = ({ image, setImage, className = "" }) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className={`relative w-32 h-32 mx-auto sm:mx-0 no-print ${className}`}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 shadow hover:border-blue-400 transition-all cursor-pointer"
        title="Click to upload photo"
      >
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 text-sm px-2 text-center">
            Click to Upload
          </div>
        )}
      </div>

      {image && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setImage("");
          }}
          className="absolute top-0 right-0 bg-white hover:bg-red-100 text-gray-600 rounded-full p-1 shadow-sm border"
          title="Remove Photo"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default ProfileImageUploader;
