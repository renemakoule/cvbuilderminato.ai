/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React from "react";
import Image from "next/image";
import { ChevronRight } from 'lucide-react';
import Link from "next/link";
import LogoMinato from "./components/logoMinato";
import AdSystem from './components/AdSystem'

export default function FUIHeroSectionWithLogoClouds() {
  const [state, setState] = React.useState(false);

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "Minato.ai", path: "https://minato-ai.vercel.app/pages/LandingPage" },
    { title: "Search your products", path: "https://minato-ai.vercel.app/" },
  ];

  React.useEffect(() => {
    // Ajouter le script Google Analytics
    const script1 = document.createElement('script');
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-BPZC3KD93L";
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-BPZC3KD93L');
    `;
    document.head.appendChild(script2);

    // Nettoyage
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col bg-black poppins-regular">
      <Image
        className="absolute top-0 z-0 -translate-y-1/2"
        src={"/bg-back.png"}
        width={1000}
        height={1000}
        alt="back bg"
      />

      <div className="absolute -z-1 inset-0  h-[600px] w-full bg-transparent opacity-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div>
      <nav className="relative items-center pt-5 px-4 mx-auto w-full sm:px-8 lg:flex md:space-x-6">
        <div className="flex justify-between">
          <LogoMinato />
          <button
            className="text-gray-500 outline-none md:hidden"
          >
            {state ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <ul
          className={`flex-1 justify-between mt-12 md:text-sm md:font-medium md:flex md:mt-0 ${
            state
              ? "absolute inset-x-0 px-4 border-b bg-white md:border-none md:static"
              : "hidden"
          }`}
        >
          <div className="items-center space-y-5 md:flex md:space-x-6 md:space-y-0 md:ml-12">
            {navigation.map((item, idx) => (
              <li className="text-gray-500 hover:text-purple-400" key={idx}>
                <a href={item.path} target="_blank">{item.title}</a>
              </li>
            ))}
          </div>
          {/* <Link href='/Cv' target="_blank">
          <li className="order-2 py-5 md:py-0">
            <button className="inline-flex h-12 items-center justify-center font-geist rounded-md border border-gray-800 bg-gradient-to-t from-[#8678f9] from-0% to-[#c7d2fe] px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 ">
              Create Cv
            </button>
          </li>
          </Link> */}
        </ul>
      </nav>
      </div>
      <section className="py-28 z-10">
        <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
          <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
            <Link href='/Cv' target="_blank">
            <h1 className="text-sm  text-gray-400 hover:text-purple-400 group font-geist mr-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent  border-[2px] border-white/5 hover:border-purple-500 rounded-3xl w-fit">
              Create your Cv at $0
              <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </h1>
            </Link>
            <h2 className="text-3xl md:text-4xl font-geist font-normal tracking-tighter lg:text-4xl text-transparent bg-clip-text bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
            We help content creators, brands and persona grow and earn money with our AI-powered Minato.ai platform
            </h2>
            <p className="font-geist">
            Do a quick search for your products, and clone your profile all thanks to our Minato.ai platform equipped with AI.
            Want to see how it works? Click on&nbsp;
            <Link href='https://minato-ai.vercel.app/' className="hover:text-purple-400"><u>Minato.ai</u></Link>
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <Link href='/Cv' target="_blank">
              <button className="inline-flex h-12 items-center justify-center font-geist rounded-md border border-gray-800 bg-gradient-to-t from-[#8678f9] from-0% to-[#c7d2fe] px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 ">
                Create Cv
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              </Link>
            </div>
          </div>
          <div className="flex-none mt-14 md:mt-0 md:max-w-xl">
            <img
              src="https://images.unsplash.com/photo-1573164713619-24c711fe7878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
              className=" md:rounded-tl-[108px]"
              alt=""
            />
          </div>
        </div>
        <div className="mt-14 px-4 md:px-8">
          <p className="text-center font-displayAlt text-sm text-gray-700 font-semibold">
            Trusted by the best companies
          </p>
          <div className="flex justify-center items-center flex-wrap gap-x-12 gap-y-6 mt-6">
            <LogoMinato />
          </div>
        </div>
      </section>
      <AdSystem />
    </div>
  );
}

