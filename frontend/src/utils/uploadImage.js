import { API_PATH } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    // Append Image File to form data
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATH.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data", //Set Header For File Upload
            },
        })
        return response.data; // Return response data
    } catch (error) {
        console.error("Error uploading the image : ", error);
        throw error; // Rethrow error for handling
    }
}

export default uploadImage;