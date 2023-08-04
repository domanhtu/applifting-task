"use client";

import { useAuth } from "@/contexts/authContext";
import createAxiosInstance from "@/services/api";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

export default function Page() {
  const { user, setUser } = useAuth();
  const api = createAxiosInstance(user);
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const perexRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFeaturedImage(file);
    }
  };

  const handleImageUpload = async (): Promise<string | null> => {
    if (featuredImage) {
      const formData = new FormData();
      formData.append("image", featuredImage);

      try {
        const response = await api.post("images", formData, {
          headers: {
            "X-API-KEY": "a91f604b-9e61-408a-a23b-71075b501ed5",
            "Content-Type": "multipart/form-data",
            Authorization: user ? user.token : "",
          },
        });

        if (response.data) {
          return response.data[0].imageId
        }
        else {
          return null
        }
      } catch (error) {
        console.error(error);
        return null
      }
    } else {
      return null
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (featuredImage) {
      const imageId = await handleImageUpload();

      if (imageId) {
        const data = {} as { [key: string]: string };

        data["imageId"] = imageId;

        if (titleRef.current) {
          const title = titleRef.current.value;
          data["title"] = title;
        }

        if (perexRef.current) {
          const perex = perexRef.current.value;
          data["perex"] = perex;
        }

        if (contentRef.current) {
          const content = contentRef.current.value;
          data["content"] = content;
        }

        api
          .post("articles", data)
          .then((response) => {
            router.push("/articles/" + response.data.articleId);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login")
    }
  }, [user]);

  return (
    <div className="mx-auto w-11/12 lg:w-3/5 my-10 space-y-2">
      {user ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-5 align-items-center">
              <h1 className="text-4xl font-semibold">Create new article</h1>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Publish Article
              </button>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <h2>Article Title</h2>
                <input
                  ref={titleRef}
                  id="password"
                  placeholder="My First Article"
                  className="w-1/2 border text-gray-900 rounded-lg block p-2.5"
                  required
                ></input>
              </div>

              <div className="space-y-2">
                <h2>Featured image</h2>
                <input type="file" onChange={handleImageSelect} required />
              </div>

              <div className="space-y-2">
                <h2>Perex</h2>
                <textarea
                  ref={perexRef}
                  className="border p-2"
                  placeholder="Supports markdown. Yay!"
                  rows={5}
                  cols={80}
                  required
                ></textarea>
              </div>

              <div className="space-y-2">
                <h2>Content</h2>
                <textarea
                  ref={contentRef}
                  className="border p-2"
                  placeholder="Supports markdown. Yay!"
                  rows={25}
                  cols={80}
                  required
                ></textarea>
              </div>
            </div>
          </form>
        </>
      ) : (
        <p>Loading page...</p>
      )}
    </div>
  );
}
