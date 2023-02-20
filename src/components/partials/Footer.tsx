import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="light:bg-gray-900 rounded-lg bg-white p-4 shadow md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link href={"/"} className="mb-4 flex items-center sm:mb-0">
          <Image
            width={40}
            height={40}
            src="https://res.cloudinary.com/rahulism/image/upload/v1675320361/learnn_mcgkrl.svg"
            className="mr-3 h-8"
            alt="Learnn Logo"
          />
          <span className="light:text-white self-center whitespace-nowrap text-2xl font-semibold">
            Learnn
          </span>
        </Link>
        <ul className="light:text-gray-400 mb-6 flex flex-wrap items-center text-sm text-gray-500 sm:mb-0">
          <li>
            <Link href="/blog" className="mr-4 hover:underline md:mr-6 ">
              Blog
            </Link>
          </li>
          <li>
            <button
              onClick={() => alert("Coming soon!")}
              className="mr-4 hover:underline md:mr-6"
            >
              Roadmaps
            </button>
          </li>
          <li>
            <a
              href="mailto:gamerrahul1122@gmail.com"
              className="mr-4 hover:underline md:mr-6 "
            >
              Support
            </a>
          </li>
          <li>
            <a
              href="mailto:gamerrahul1122@gmail.com"
              className="hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr className="light:border-gray-700 my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <span className="light:text-gray-400 block text-sm text-gray-500 sm:text-center">
        © 2023{" "}
        <a href="https://learnn.cc/" className="hover:underline">
          Learnn
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}

export default Footer;
