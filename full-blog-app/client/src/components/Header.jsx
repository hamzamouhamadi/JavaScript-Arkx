import { Link } from "react-router-dom";
export default function Header() {

  return (
    <div>
      <div class="relative overflow-hidden">
        <div
          aria-hidden="true"
          class="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div class="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-violet-900/50 dark:to-purple-900"></div>
          <div class="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"></div>
        </div>

        <div class="relative z-10">
          <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <div class="max-w-2xl text-center mx-auto">
              <div class="mt-5 max-w-2xl">
                <h1 class="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
                  Welcome to the blog app
                </h1>
              </div>

              <div class="mt-5 max-w-3xl">
                <p class="text-lg text-gray-600 dark:text-gray-400">
                  Sign up to write any blog you want.
                </p>
              </div>

              <div class="mt-8 gap-3 flex justify-center">
                <Link to='/signin'>
                <a
                  class="py-3 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="#"
                >
                  Get started
                </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
