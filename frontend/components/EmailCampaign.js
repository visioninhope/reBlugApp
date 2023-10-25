import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { useUserData } from '@nhost/nextjs';

export default function EmailCamp() {
    const user = useUserData();

    const baseUrl = "";
    const salesCall = fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify()

    });

    const handleClick = (e) => {
        console.log("form is clickedddd");
    }
    return (
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-12 w-12 rounded-full"
                                src={user?.avatarUrl}
                                alt="profile image"
                            />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Tom Cook</h3>
                            <p className="text-sm text-gray-500">
                                <a href="#">@tom_cook</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ml-5 mt-4 flex flex-shrink-0">
                    <button
                        type="button"
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <PhoneIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Survey</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleClick}
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <EnvelopeIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Email campaign</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleClick}
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <EnvelopeIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Newsletter campaign</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
