"use client";

import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { redirect } from 'next/navigation'

export default function Page() {
  const { token, setToken } = useAuth();

  useEffect(() => {
    const url = "https://fullstack.exercise.applifting.cz/articles";

    if (!token) {
      redirect('/login');
    } else {
      const config = {
        headers: {
          "X-API-KEY": "a91f604b-9e61-408a-a23b-71075b501ed5",
          Authorization: token
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
      {token ? <p>Logged in</p> : <p>Not logged in</p>}
    </div>
  );
}
