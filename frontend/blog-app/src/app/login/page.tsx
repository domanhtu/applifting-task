"use client";

import useLogin from "@/hooks/useLogin";
import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/authContext";
import { redirect } from "next/navigation";

/**
 * Submit button fires handleSubmit func, that reads value from inputs and passes themt to login callback func,
 * in contrast to the traditional way, where we store input values with state management.
 */

export default function Page() {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const { data, call: login } = useLogin();
  const { setUser } = useAuth();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    usernameRef.current = event.target.value;
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    passwordRef.current = event.target.value;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = usernameRef.current;
    const password = passwordRef.current;

    await login(username, password);
  };

  useEffect(() => {
    if (data) {
      const user: User = {
        username: usernameRef.current,
        token: data.access_token
      }
      setUser(user);
      redirect('/articles');
    }
  }, [data, setUser]);

  return (
    <div className="mx-auto mt-10 w-full bg-white rounded-lg shadow-2xl sm:max-w-md">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
          Log In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Username
            </label>
            <input
              onChange={handleUsernameChange}
              type="username"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="me@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              onChange={handlePasswordChange}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
