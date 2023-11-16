//SignIn
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from './Loading';
import PasswordReset from './PassReset';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    const router = useRouter();


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Attempting to sign in with:", email, password);

            const signInData = await signIn('Credentials', {
                email,
                password,
                callbackUrl: '/dashboard',
                // redirect: false,
            });

            console.log("signInData:", signInData);

            if (!signInData.ok || signInData.error) {
                console.log("SignData is falsy");
                console.log("SignData is falsy", signInData.error);
                console.log("SignData is falsy", signInData.status);
            }

            if (signInData.ok & session) {
                console.log("Sign-in successful!");
                router.push('/dashboard');
            } else {
                console.error('Authentication failed:', signInData.error);
                setErrors(`Authentication failed: ${signInData.error}`);
            }
        } catch (error) {
            console.error('Authentication error:', error.message);
            setErrors(`Authentication error: ${error.message}`);
        }
    };




    const setErrors = (error) => {
        return error.message
    };

    const openModal = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    return (
        <div className="">
            <div className="">
                <>
                    <form onSubmit={handleOnSubmit} className="">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <input
                            type="email"
                            label="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <label htmlFor="password" className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <input
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />

                        {loading && (
                            <button type="submit" className="flex w-full mt-3 items-center justify-center gap-3 rounded-md bg-slate-200 px-3 py-1.5 text-black border shadow-md outline-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]">
                                <Loading size="sm" />
                            </button>
                        )}
                        {!loading && (
                            <button type="submit" className="flex w-full mt-3 items-center justify-center gap-3 rounded-md bg-slate-200 px-3 py-1.5 text-black border shadow-md outline-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]">
                                Sign In
                            </button>
                        )}


                        {/* {isError ? <p className="bg-red-200 rounded text-center m-auto px-2">{error?.message}</p> : null} */}
                    </form>
                    <div className='mt-2 text-right'>
                        <button type='button' onClick={openModal} >Reset password</button>
                    </div>
                </>
                {/* {needsEmailVerification ? (
                    <p className="bg-green-200 rounded text-center m-auto px-2">
                        Please check your mailbox and follow the verification link to verify your email.
                    </p>
                ) : (
                    
                )} */}
            </div>
            <div>
                <p className="text-right mt-3">
                    <Link href="/register">
                        No account yet?{' '}
                        Sign up
                    </Link>
                </p>
            </div>
            <div>
                <PasswordReset open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

export default SignIn;
