const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
  console.error(
    "Missing Cloudinary configuration. Please check your .env file."
  );
}
export const uploadToCloudinary = async (file) => {
  try {
    // Convert file to base64
    const base64Image = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

    // Create form data
    const formData = new FormData();
    formData.append("file", base64Image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("ছবি আপলোড করতে সমস্যা হয়েছে");
  }
};
