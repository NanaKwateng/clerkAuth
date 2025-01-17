'use client'
import { useUser } from '@clerk/nextjs'

export default function Client() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return <div className='h-full flex items-center justify-center text-2xl'>Hi there 👋, {user.firstName} welcome to Clerk</div>
}