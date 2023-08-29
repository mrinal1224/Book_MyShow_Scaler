import { axiosInstance } from ".";

export const AddTheatre = async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/api/theatres/add-theatre",
        payload
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };


  // get all theatres by owner
  export const GetAllTheatresByOwner = async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/api/theatres/get-all-theatres-by-owner",
        payload
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };