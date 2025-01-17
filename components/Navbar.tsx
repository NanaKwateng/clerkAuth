import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
    // Get the user ID from the auth function
    const { userId } = await auth();

    return (
        <div className='rounded-b-xl bg-cyan-950'>
            <ul className="flex justify-between py-4 px-6">
                <div>
                    <Link href="/">
                        <li>Home</li>
                    </Link>
                </div>

                <div className='flex items-center'>
                    <Link href="/client">
                        <li>Client Page</li>
                    </Link>
                </div>

                <div className="flex gap-6 items-center">
                    {!userId ? (
                        <>
                            <Link href="/sign-in">
                                <li>Login</li>
                            </Link>
                            <Link href="/sign-up">
                                <li>Sign Up</li>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/profile">
                                <li>Profile</li>
                            </Link>
                            <UserButton />
                        </>
                    )}
                </div>
            </ul>
        </div>
    );
};

export default Navbar;
