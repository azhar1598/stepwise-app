// pages/index.js
"use client";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { TextInput, PasswordInput, Button, Divider } from "@mantine/core";
import { Mail, Lock, ArrowRight, User2Icon } from "lucide-react";
import logo from "../../public/stepwise-logo.png";
import loginBg from "../../public/login-bg.jpg";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <Head>
        <title>SERVISE+ | Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src={loginBg}
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>
      </div>

      <div className="absolute top-10 left-20">
        <Image
          src={logo}
          alt="Logo"
          width={200}
          height={100}
          priority
          className="drop-shadow-lg "
          // bg-white/20 transition duration-300 border-0 rounded-lg backdrop-blur-sm
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-lg px-6 mt-12">
        {/* Logo */}

        <div className="space--8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-white drop-shadow-md">
              Welcome Back
            </h2>
            <p className="text-gray-200 text-lg">
              Sign in to continue to your account
            </p>
          </div>

          <form className="space-y-2 mt-4">
            <TextInput
              placeholder="Email"
              leftSection={<User2Icon size={18} className="text-gray-400" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              styles={{
                input: {
                  height: "54px",
                  fontSize: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                },
              }}
              radius="md"
            />

            <PasswordInput
              placeholder="Password"
              rightSection={<Lock size={18} className="text-gray-400" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              styles={{
                input: {
                  height: "54px",
                  fontSize: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                },
              }}
              radius="md"
            />

            {/* <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-blue-300 hover:text-white font-medium transition duration-300"
              >
                Forgot password?
              </a>
            </div> */}

            <Button
              fullWidth
              size="lg"
              h={50}
              rightSection={<ArrowRight size={18} />}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition duration-300 transform hover:-translate-y-1"
              radius="md"
              styles={{
                root: {
                  height: "54px",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Sign In
            </Button>
          </form>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-400/30"></div>
            <span className="flex-shrink mx-4 text-gray-200">
              Or continue with
            </span>
            <div className="flex-grow border-t border-gray-400/30"></div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="default"
              fullWidth
              className="bg-white/90 hover:bg-white text-gray-700 py-3 font-medium transition duration-300 border-0 backdrop-blur-sm"
              radius="md"
              styles={{
                root: {
                  height: "54px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="#4285F4"
                />
              </svg>
              Sign in with Google
            </Button>

            {/* <Button
              variant="default"
              fullWidth
              className="bg-white/90 hover:bg-white text-gray-700 py-3 font-medium transition duration-300 border-0 backdrop-blur-sm"
              radius="md"
              styles={{
                root: {
                  height: "54px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.2 12c0 3.978-3.222 7.2-7.2 7.2S4.8 15.978 4.8 12 8.022 4.8 12 4.8 19.2 8.022 19.2 12zm-7.2-1.8c-.994 0-1.8.806-1.8 1.8s.806 1.8 1.8 1.8 1.8-.806 1.8-1.8-.806-1.8-1.8-1.8z"
                  fill="#1A56DB"
                />
              </svg>
              Login with Guardian ID
            </Button> */}

            <Button
              variant="default"
              fullWidth
              className="bg-white/90 hover:bg-white text-gray-700 py-3 font-medium transition duration-300 border-0 backdrop-blur-sm"
              radius="md"
              styles={{
                root: {
                  height: "54px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="#6B7280"
                />
              </svg>
              Sign in as Guest
            </Button>
          </div>

          {/* <p className="text-center text-gray-200 mt-">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-blue-300 hover:text-white font-medium transition duration-300"
            >
              Sign up
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
}
