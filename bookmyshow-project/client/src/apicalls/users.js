const { axiosInstance } = require(".");

// Regsiter a new User

export const RegisterUser = async (payload)=>{
   try {
        const response = await axiosInstance.post('api/users/register' , payload)
        return response.data
   } catch (error) {
      return error
   }
}