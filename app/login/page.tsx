/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const users = [
    { email: "john.doe@example.com", password: "Passw0rd123!" },
    { email: "jane.smith@example.com", password: "Secure#4567" },
    { email: "alice.brown@example.com", password: "Alice$2025" },
    { email: "bob.jones@example.com", password: "B0b_Rocks987" },
    { email: "charlie.wilson@example.com", password: "CWilson#32" },
    { email: "emily.davis@example.com", password: "Emily!098" },
    { email: "michael.green@example.com", password: "MGreen123@" },
    { email: "sarah.adams@example.com", password: "S@rah2024" },
    { email: "david.taylor@example.com", password: "D4vid_T!m3" },
    { email: "olivia.lee@example.com", password: "Olivia##789" },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const user = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );
    if (user) {
      console.log("user found");
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/home");
    } else {
      console.log("user not found");
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 mt-[70px]">
        <div className="flex flex-col items-center justify-center px-6 mx-auto mt-50 lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500 hover:bg-blue-700"
                >
                  Sign in
                </button>

                <Link
                  href={"/contact"}
                  type="submit"
                  className="text-gray-500 dark:text-gray-300 mt-10"
                >
                  Contuct Us
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
