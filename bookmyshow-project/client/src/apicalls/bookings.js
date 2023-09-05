import { axiosInstance } from ".";

// make payment
export const MakePayment = async (token, amount) => {
  try {
    const response = await axiosInstance.post("/api/bookings/make-payment", {
      token,
      amount,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
