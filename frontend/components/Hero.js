import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
      </svg>
      <div className="mx-auto px-6 pb-24 pt-10 sm:pb-28 lg:flex lg:px-8 lg:py-36">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
          <div className="mt-20 sm:mt-32 lg:mt-8">
            <a href="#blog-tool" className="sm:inline-flex md:space-x-6 lg:space-x-6">
              <span className="rounded-full mr-2 bg-red-600/10 px-3 py-1 text-sm font-semibold leading-6 text-red-600 ring-1 ring-inset ring-red-600/10">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>AI-powered Article Assistant</span>
                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Every Brand and Marketer has a <span className='text-red-700'>'Thing'.</span>
          </h1>
          <h2 className="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            We solve <span className='text-red-700'>things</span> by providing a unified ecosystem where brands, marketers and bloggers can connect.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Specifically by making blogging interactive, social and useful for marketing through the use of
            software, AI-powered technologies, and automation tools.
          </p>
          <div className="mt-60 flex items-center gap-x-6">
            <a
              href=""
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              For Brands & Marketers
            </a>
            <a href="" className="text-sm font-semibold leading-6 text-gray-900">
              For Bloggers <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src="/images/heroimage.png"
                alt="App screenshot"
                width={950}
                height={640}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
