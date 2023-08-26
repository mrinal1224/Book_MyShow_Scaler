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


export const LoginUser = async (payload)=>{
   try {
      const response = await axiosInstance.post('api/users/login' , payload)
      return response.data
 } catch (error) {
    return error
 }
}

//get Current User
export const GetCurrentUser = async () => {
   try {
       const response = await axiosInstance.get("/api/users/get-current-user");
       return response.data;
   } catch (error) {
       return error;
   }
}


