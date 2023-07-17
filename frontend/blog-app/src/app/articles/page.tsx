"use client";

import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const url = "https://fullstack.exercise.applifting.cz/articles";

    if (localStorage.getItem("token") === null) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);

      const config = {
        headers: {
          "X-API-KEY": "a91f604b-9e61-408a-a23b-71075b501ed5",
          Authorization: localStorage.getItem("token"),
        },
      };

      axios
        .get(url, config)
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
        .then((response) => {
          console.log(response.data);
        });
    }
  }, []);

  return (
    <div className="container mx-auto">
      {authenticated ? <p>Logged in</p> : <p>Not logged in</p>}
    </div>
  );
}
