import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="absolute z-10 w-full bg-inherit shadow-sm">
      <nav className="light:bg-gray-900 light:border-gray-600 fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white px-2 py-2.5 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link href={"/"} className="flex items-center">
            <Image
              width={40}
              height={40}
              src="https://res.cloudinary.com/rahulism/image/upload/v1675320361/learnn_mcgkrl.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Learnn Logo"
            />
            <span className="light:text-white self-center whitespace-nowrap text-xl font-semibold">
              Learnn
            </span>
          </Link>
          <div className="flex md:order-2">
            <a
              href=" https://twitter.com/intent/tweet?url=https%3A%2F%2Flearnn.cc&via=rahuldotbiz&text=Learn%20anything%20for%20free%20with%20free%20resources%20and%20tools.%20"
              className="light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800 mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0"
            >
             Tweet
            </a>
            <button
              onClick={() => setOpen(!open)}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="light:text-gray-400 light:hover:bg-gray-700 light:focus:ring-gray-600 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              open ? "flex" : "hidden"
            } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
            id="navbar-sticky"
          >
            <ul className="light:bg-gray-800 md:light:bg-gray-900 light:border-gray-700 mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
              <li>
                <Link
                  href="/"
                  className="light:text-white block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="md:light:hover:text-white light:text-gray-400 light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700 block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <button
                  onClick={() => alert("Coming soon!")}
                  className="md:light:hover:text-white light:text-gray-400 light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700 block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Roadmaps
                </button>
              </li>
              <li>
                <a
                  href="mailto:gamerrahul1122@gmail.com"
                  className="md:light:hover:text-white light:text-gray-400 light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700 block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
