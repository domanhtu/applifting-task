"use client";

import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type FinalImagesType = {
  [articleId: string]: string;
};

type Article = {
  articleId: string;
  title: string;
  perex: string;
  createdAt: string;
  imageId: string;
};

function formatDate(originalDate: string) {
  const date = new Date(originalDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${month}/${day}/${year}`;
}

export default function Page() {
  const { token, setToken } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [images, setImages] = useState<FinalImagesType>({});

  useEffect(() => {
    const url = "https://fullstack.exercise.applifting.cz/articles";

    if (!token) {
      redirect("/login");
    } else {
      const config = {
        headers: {
          "X-API-KEY": "a91f604b-9e61-408a-a23b-71075b501ed5",
          Authorization: token,
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
          if (response && response.data) {
            setArticles(response.data.items);
          }
        });
    }
  }, []);

  useEffect(() => {
    // Check if it's first render
    if (Object.keys(images).length === 0) {
      const finalImages: FinalImagesType = {};

      // Create an array of Promises
      const imageRequests = articles.map((article) => {
        const url = "https://fullstack.exercise.applifting.cz/images/";
        const endpoint = article.imageId;
        const config: AxiosRequestConfig = {
          responseType: "blob",
          headers: {
            "X-API-KEY": "a91f604b-9e61-408a-a23b-71075b501ed5",
            Authorization: token,
          },
        };

        return axios
          .get(url + endpoint, config)
          .then((response) => {
            if (response && response.data) { 
              const blob = new Blob([response.data], {
                type: response.headers["content-type"],
              }); 
              const imageUrl = URL.createObjectURL(blob);
              finalImages[article.articleId] = imageUrl;
            }
          })
          .catch((error) => {
            console.error("Error fetching image:", error);
          });
      });

      // Wait for all requests to resolve using Promise.all
      Promise.all(imageRequests).then(() => {
        setImages(finalImages);
        console.log(finalImages);
      });
    }
  }, [articles]);

  return (
    <div className="mx-auto w-3/5 my-10">
      {token ? (
        <>
          <h1 className="text-2xl font-semibold">Recent articles</h1>
          <ul className="my-5 space-y-4">
            {articles.map((article) => (
              <li className="flex space-x-4" key={article.articleId}>
                <Image
                  className="h-52 w-52"
                  src={images[article.articleId]}
                  alt="No image"
                  width={208}
                  height={208}
                />
                <div className="space-y-2">
                  <h2 className="text-lg font-medium">{article.title}</h2>
                  <div className="flex space-x-2 text-gray-500 text-sm">
                    <span className="">Author</span>
                    <span>•</span>
                    <span>{formatDate(article.createdAt)}</span>
                  </div>
                  <p className="text-sm my-4">{article.perex}</p>
                  <div className="flex space-x-2 text-xs">
                    <Link href="/" className="text-sky-500">
                      Read whole article
                    </Link>
                    <span className="text-gray-500">0 comments</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
