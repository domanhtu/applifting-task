"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import axios from "axios";
import Image from "next/image";
import useFetchImage from "@/hooks/useFetchImage";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function formatDate(originalDate: string) {
  const date = new Date(originalDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${month}/${day}/${year}`;
}

export default function Page() {
  const { user, setUser } = useAuth();
  const articleId = usePathname();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [image, setImage] = useState("");
  const fetchImage = useFetchImage();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      redirect("/login");
    } else {
      if (user && articleId) {
        const url = "https://fullstack.exercise.applifting.cz";
        const endpoint = articleId;
        const config = {
          headers: {
            "X-API-KEY": "a91f604b-9e61-408a-a23b-71075b501ed5",
            Authorization: user.token,
          },
        };

        axios
          .get(url + endpoint, config)
          .then((response) => {
            setArticle(response.data);
          })
          .catch(function (error) {
            console.error("Error fetching article:", error);
          });
      }
    }
  }, [articleId, user]);

  useEffect(() => {
    if (article && user) {
      fetchImage(article.imageId, user.token)
        .then((imageResponse: ImageResponse) => {
          setImage(imageResponse.imageUrl);
        })
        .catch((imageResponse: ImageResponse) => {
          console.error(imageResponse.error);
        });
    }
  }, [article]);

  return (
    <>
      <div className="flex my-10 w-3/5 mx-auto">
        <div className="w-6/12">
          {article ? (
            <>
              <h1 className="text-2xl font-semibold">{article.title}</h1>
              <div className=" my-3 flex space-x-2 text-gray-500 text-sm">
                <span>Author</span>
                <span>•</span>
                <span>{formatDate(article.createdAt)}</span>
              </div>
              {image ? (
                <Image
                  className="w-auto h-auto"
                  src={image}
                  alt="No image"
                  width={400}
                  height={400}
                />
              ) : (
                <span>Loading image...</span>
              )}

              <div className="prose markdown-content my-3">
                <ReactMarkdown remarkPlugins={[gfm]}>
                  {article.content}
                </ReactMarkdown>
              </div>
            </>
          ) : (
            <span>
              <h1>Loading article...</h1>
            </span>
          )}
          <hr />
          <div className="my-3">
            <h1 className="font-bold">Comments</h1>
          </div>
        </div>
        <div className="w-2/12 mx-auto">Related articles</div>
      </div>
    </>
  );
}
