"use client";

import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
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
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [image, setImage] = useState("");
  const articleId = usePathname();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fetchImage = useFetchImage();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the value directly from the textarea input
    const textareaValue = textareaRef.current?.value;

    if (user) {
      const url = "https://fullstack.exercise.applifting.cz/comments";
      const config = {
        headers: {
          "X-API-KEY": "a91f604b-9e61-408a-a23b-71075b501ed5",
          Authorization: user.token,
        },
      };
      const data = {
        articleId: articleId,
        author: user.username,
        content: textareaValue,
      };

      axios
        .post(url, data, config)
        .then((response) => {
          console.log("Data successfully sent:", response.data);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    }
  };

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
      <div className="lg:flex my-10 lg:w-3/5 mx-auto">
        {article ? (
          <>
            <div className="lg:w-7/12 w-11/12 lg:mx-0 mx-auto">
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

              <hr />
              <div className="my-3 space-y-3">
                <h1 className="font-bold">
                  Comments ({article?.comments.length})
                </h1>
                <div className="flex space-x-2 items-center">
                  <Image
                    className="rounded-full"
                    src="https://cdn.vectorstock.com/i/preview-1x/62/38/avatar-13-vector-42526238.jpg"
                    alt="Rounded avatar"
                    width={40}
                    height={40}
                  />
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="md:flex md:space-y-0 space-x-2 space-y-2 items-center">
                      <textarea
                        id="message"
                        rows={4}
                        cols={40}
                        className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Join the discussion"
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="h-10 px-2 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-xs text-center"
                        >
                          Post comment
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {article.comments.map((comment: MyComment) => (
                  <div
                    className="flex space-x-2 items-center"
                    key={comment.commentId}
                  >
                    asd
                  </div>
                ))}
              </div>
            </div>
            {/* API doesn't have related articles endpoint */}
            <div className="w-2/12 mx-auto">Related articles</div>
          </>
        ) : (
          <>
            <h1>Loading article...</h1>
          </>
        )}
      </div>
    </>
  );
}
