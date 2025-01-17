import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex items-center justify-center h-full">
      <SignUp /> 
      {/* The after signOutUrl sends the user back to the home page automatically */}
    </div>
  )
}