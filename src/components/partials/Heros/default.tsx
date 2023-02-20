import Link from "next/link";
import React from "react";

function Default() {
  return (
    <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl sm:max-w-xl md:max-w-2xl">
        <div className="text-center">
          <div className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl">
            <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              Resources. Roadmaps. Freebies.
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              With hundreds of resources and roadmaps, you’ll find all the
              information and tools you need to be successful with Learnn.
            </p>
          </div>
          <form
            target="_blank"
            method="POST"
            action="https://a32f5a4a.sibforms.com/serve/MUIEAL2jRJElo5oejJSrN9YoRJegKBQOpNfVeK75dVRDksFbiUlkFd-zketfuW3hfpUEBDwUDwpMNnoK4gF_b8zwqnJlj6xwD9Mw754fz84iY-xlydgJ9abhZbzcTtxkBcXec_AyA7fmHTECxwvMFL5nb2esjBibmomhUXAuwFHyjxZfdMSyg5o9fchlfj5Qq9JbUlOCbrJ6seE-?isAjax=1&redirect=https://learnn.cc"
            className="mb-4 flex w-full flex-col items-center md:flex-row md:px-16"
          >
            <input
              placeholder="you@future-money.com"
              type="text"
              name="EMAIL"
              className="focus:border-deep-purple-accent-400 focus:shadow-outline mb-3 h-12 w-full flex-grow appearance-none rounded-lg border border-gray-300 bg-white px-4 shadow-sm transition duration-200 focus:outline-none md:mr-2 md:mb-0"
            />
            <button
              type="submit"
              onClick={() => {window.location.href = "https://learnn.cc"}}
              className="mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Subscribe
            </button>
          </form>

          <p className="mx-auto mb-10 max-w-md text-xs text-gray-600 sm:text-sm md:mb-16">
            Worth reading occasional newsletters.
          </p>
          <Link
            href="#learn"
            aria-label="Scroll down"
            className="hover:text-deep-purple-accent-400 hover:border-deep-purple-accent-400 content mx-auto flex h-10 w-10 transform items-center justify-center overflow-hidden rounded-full border border-gray-400 text-gray-600 transition-all duration-300 ease-out hover:scale-110 hover:shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Default;
