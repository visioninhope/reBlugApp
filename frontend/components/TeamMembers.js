import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Loading from './Loading';


export default function Team({ show, setShow }) {
    const [state, setState] = useState(
        {
            emails: [''],
            emailMessage: 'An Invite will be sent to your team members',
            emailSent: false,
            loading: false,
        });

    const addEmailField = () => {
        setState((prevState) => ({
            ...prevState,
            emails: [...prevState.emails, ''],
        }));
    };

    const isEmailValid = (emails) => {
        const emailArray = emails.split(',').map((email) => email.trim());
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailArray.every((email) => emailRegex.test(email));
    };

    const handleChange = (e, index) => {
        e.preventDefault();
        const { name, value } = e.target;

        // Check if the name is 'email' and update the corresponding index in the emails array
        if (name === `email-${index}`) {
            setState((prevState) => {
                const updatedEmails = [...prevState.emails];
                updatedEmails[index] = value;
                return { ...prevState, emails: updatedEmails };
            });
        }
    };

    const sendInvite = async () => {
        try {
            setState((prevState) => ({
                ...prevState,
                loading: true,
            }));

            const response = await fetch('/api/team-members', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emails: state.emails }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response Data:", data);

            return data;
        } catch (error) {
            console.error('Error sending invite:', error);
            throw error;
        } finally {
            setState((prevState) => ({
                ...prevState,
                loading: false,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (state.emails.length === 0) {
            setState((prevState) => ({
                ...prevState,
                emailMessage: 'Please enter at least one email address.',
            }));
            return;
        }

        const validEmails = isEmailValid(state.emails.join(','));
        if (!validEmails) {
            setState((prevState) => ({
                ...prevState,
                emailMessage: 'Please enter valid email addresses separated by commas.',
            }));
            return;
        }

        try {
            const response = await sendInvite();
            console.log("SubmitResponse:", response);

            // response.ok
            if (state.emails) {
                // console.log("InRes", response)
                // const userData = await response.json();
                setState((prevState) => ({
                    ...prevState,
                    emailSent: true,
                }));
            } else {
                throw new Error('Error sending invite');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setState((prevState) => ({
                ...prevState,
                emailMessage: 'An error occurred while sending the invite.',
            }));
        }
    };



    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setShow}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShow(false)} />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                                        <Image
                                            className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
                                            src="/images/Marttwainxyz.png"
                                            alt="logo"
                                            width={400}
                                            height={400}
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Build your Team
                                        </Dialog.Title>
                                        {state.emailSent && (<div className="mt-2">
                                            {state.emailMessage}
                                        </div>)}
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    {state.emailSent ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => setShow(false)}
                                                className="inline-flex mt-3 w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                            >
                                                Close
                                            </button>
                                        </>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <label htmlFor="email" className="block text-sm py-1 font-medium leading-6 text-gray-900">
                                                Members emails
                                            </label>
                                            <p className='text-xs'>Please enter one or more emails</p>
                                            {state.emails.map((email, index) => (
                                                <div key={index}>
                                                    <input
                                                        id={`email-${index}`}
                                                        name={`email-${index}`}
                                                        type="email"
                                                        onChange={(e) => handleChange(e, index)}
                                                        autoComplete="email"
                                                        value={email}
                                                        required
                                                        className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                        placeholder="email@example.com"
                                                    />
                                                    {index === state.emails.length - 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={addEmailField}
                                                            className="text-red-600 hover:text-red-800 font-medium text-sm mt-1 cursor-pointer"
                                                        >
                                                            Add Another Email
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <button
                                                type="submit"
                                                className="inline-flex mt-3 w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
