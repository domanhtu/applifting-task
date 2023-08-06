import axios, { AxiosRequestConfig } from "axios";


/**
 * Custom hook for fetching images, returns a promise that needs to be resolved.
 */
const useFetchImage = (): ((imageId: string, token: string | null) => Promise<ImageResponse>) => {
  const fetchImage = async (imageId: string, token: string | null): Promise<ImageResponse> => {
    try {
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const url = `https://fullstack.exercise.applifting.cz/images/${imageId}`;
      const config = {
        responseType: "blob" as const,
        headers: {
          "X-API-KEY": "a91f604b-9e61-408a-a23b-71075b501ed5",
          Authorization: token,
        },
      };

      const response = await axios.get<Blob>(url, config);
      const imageUrl = URL.createObjectURL(response.data);
      return { imageUrl, error: null };
    } catch (error) {
      console.error("Error fetching image:", error);
      return { imageUrl: "", error: "Error fetching image" };
    }
  };

  return fetchImage;
};

export default useFetchImage;