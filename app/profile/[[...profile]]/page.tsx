import { UserProfile } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Profile() {
    // Fetch user data and display it here.
    // For example, using Next.js's API routes:
    // const { data } = await fetch('/api/user')
    // const user = data.user

    // ...

    // Render the user's profile information.
    // Example:
    // <h2>{user.email}</h2>
    // <img src={user.avatar_url} alt={user.name} />
    // <p>{user.bio}</p>

    // Return the profile component.

    const userId = auth()
    const isAuth = !!userId

    //Fetch the user data and display it here.
    const user = await currentUser()

    //Check if the user is not logged in redirect to the home page
    if (!isAuth) {
        redirect('/')
    }

  return (
    <div className='flex items-center justify-center mt-5'>
        <h1 className='text-2xl'>{user?.username}</h1>
        <UserProfile />
    </div>
  )
}
