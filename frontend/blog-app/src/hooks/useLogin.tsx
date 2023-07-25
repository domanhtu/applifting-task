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

  const call = useCallback(async (username: string, password: string) => {
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

    axios
      .post(url, body, config)
      .then((response: AxiosResponse<any> | void) => {
        if (response) {
          setData(response.data);
        }
        else {
          console.error('Response is void (undefined)');
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      ;
  }, []);

  return { data, call };
};

export default useLogin;