"use client";

import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useFetchImage from "@/hooks/useFetchImage";

type FinalImagesType = {
  [articleId: string]: string;
};

function formatDate(originalDate: string) {
  const date = new Date(originalDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${month}/${day}/${year}`;
}

export default function Page() {
  const { user, setUser } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [images, setImages] = useState<FinalImagesType>({});
  const fetchImage = useFetchImage();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      redirect("/login");
    } else {
      if (user) {
        const url = "https://fullstack.exercise.applifting.cz/articles";
        const config = {
          headers: {
            "X-API-KEY": "a91f604b-9e61-408a-a23b-71075b501ed5",
            Authorization: user.token,
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
              response.data.items.sort((a: Article, b: Article) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB.getTime() - dateA.getTime();
              });
              setArticles(response.data.items);
            }
          });
      }
    }
  }, [user]);

  useEffect(() => {
    // Check if it's first render
    if (Object.keys(images).length === 0) {
      const finalImages: FinalImagesType = {};

      // Create an array of Promises
      if (user) {
        const imageRequests = articles.map(async (article) => {
          const imageUrl = await fetchImage(article.imageId, user.token);
          if (imageUrl) {
            finalImages[article.articleId] = imageUrl.imageUrl;
          }
        });

        // Wait for all requests to resolve using Promise.all
        Promise.all(imageRequests).then(() => {
          setImages(finalImages);
        });
      }
    }
  }, [articles]);

  return (
    <div className="mx-auto w-11/12 lg:w-3/5 my-10">
      {user ? (
        <>
          <h1 className="text-2xl font-semibold">Recent articles</h1>
          <ul className="my-5 space-y-4">
            {articles.map((article) => (
              <li className="flex space-x-4" key={article.articleId}>
                {images[article.articleId] ? 
                <Image
                className="h-52 w-52"
                src={images[article.articleId]}
                alt="No image"
                width={208}
                height={208}
              />
                :
                <span>Loading image...</span>
                }
                
                <div className="space-y-2">
                  <h2 className="text-lg font-medium">{article.title}</h2>
                  <div className="flex space-x-2 text-gray-500 text-sm">
                    <span>Author</span>
                    <span>•</span>
                    <span>{formatDate(article.createdAt)}</span>
                  </div>
                  <p className="text-sm my-4">{article.perex}</p>
                  <div className="flex space-x-2 text-xs">
                    <Link href={`articles/${article.articleId}`} className="text-sky-500">
                      Read whole article
                    </Link>
                    {/* API response doesn't have comments, so you would have to call GET /ArticleDetail/{id} */}
                    <span className="text-gray-500">0 comments</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading articles...</p>
      )}
    </div>
  );
}
