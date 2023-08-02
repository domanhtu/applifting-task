"use client";

import { useAuth } from "@/contexts/authContext";
import createAxiosInstance from "@/services/api";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import DeleteModal from "@/components/deleteModal";

export default function Page() {
  const { user, setUser } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const api = createAxiosInstance(user);

  const handleOpenModal = (article: Article) => {
    setIsModalOpen(true);
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const deleteArticle = (articleId: string) => {
    if (user) {
      api
        .delete("articles/" + articleId)
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
        .then((response) => {
          if (response && response.status === 204) {
            setArticles((prevArticles) =>
              prevArticles.filter((article) => article.articleId !== articleId)
            );
            handleCloseModal();
          }
        });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      redirect("/login");
    } else {
      if (user) {
        api
          .get("articles")
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
  }, [user, articles]);

  return (
    <div className="mx-auto w-fit my-10">
      {user ? (
        <>
          <div className="flex space-x-5 items-center">
            <h1 className="text-2xl font-semibold">My articles</h1>
            <Link
              href="/article/create"
              className="bg-blue-500 hover:bg-blue-700 p-1.5 rounded text-white"
            >
              Create new article
            </Link>
          </div>

          <table className="table w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2"></th>
                <th className="px-4 py-2 border-b-2">Article title</th>
                <th className="border-b-2">Perex</th>
                <th className="px-4 py-2 border-b-2">Author</th>
                <th className="px-4 py-2 border-b-2"># of comments</th>
                {/* 
                    API response doesn't have author and comments info,
                    would solve this the same way as with images
                    on recent articles page (Array of promises/requests)            
                  */}
                <th className="px-4 py-2 border-b-2">Actions</th>
                {/* 
                    API doesn't have endpoint for mass delete,
                    would make an array of promises to delete
                    checked articles.
                    Also ask the user for confirmation by modal.
                */}
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.articleId}>
                  <td className="px-4 py-2">
                    <input
                      id={article.articleId}
                      type="checkbox"
                      className="form-checkbox"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">{article.title}</td>
                  <td className="px-4 py-2 border-b">{article.perex}</td>
                  <td className="px-4 py-2 border-b">Author</td>
                  <td className="px-4 py-2 border-b">0</td>
                  <td className="px-4 py-2 border-b flex space-x-4">
                    <Link
                      className="py-2 mx-2"
                      href={`/articles/${article.articleId}/edit`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleOpenModal(article)}
                      className="py-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <DeleteModal isOpen={isModalOpen} onClose={handleCloseModal}>
            <h2 className="my-2">
              Are you sure you want to delete article {selectedArticle?.title}?
            </h2>
            <div className="flex justify-end space-x4">
            <button
              className="bg-red-600 text-white px-4 py-2 mx-2 rounded"
              onClick={() => {
                if (selectedArticle) {
                  deleteArticle(selectedArticle.articleId);
                }
              }}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
            </div>
          </DeleteModal>
        </>
      ) : (
        <p>Loading articles...</p>
      )}
    </div>
  );
}
