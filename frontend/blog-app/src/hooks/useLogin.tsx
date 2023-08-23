import axios, { AxiosResponse } from "axios";
import { useCallback, useState } from "react";

interface ApiResponse {
  access_token: string,
  expires_in: number,
  token_type: string
}

/**
 * Hook for login. Passing username and password and plaintext through arguments, thus not being safe!
 */
const useLogin = () => {
  const [data, setData] = useState<ApiResponse | null>(null);

  const call = useCallback(async (username: string, password: string): Promise<number> => {
    const url = "https://fullstack.exercise.applifting.cz/login";
    const config = {
      headers: {
        "X-API-KEY": "a91f604b-9e61-408a-a23b-71075b501ed5"
      },
    };

    const body = {
      "username": username,
      "password": password
    }

    try {
      const response: AxiosResponse<any> = await axios.post(url, body, config);

      if (response.status === 200) {
        setData(response.data);
      }

      return response.status; 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.status; 
      }

      return 0;
    }
  }, []);

  return { data, call };
};

export default useLogin;