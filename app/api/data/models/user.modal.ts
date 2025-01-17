import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },  
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
});

const User = models?.User || model("User", undefined)

export default User;

// To automatically add a user to your MongoDB database when they sign in using Clerk authentication in a Next.js application with TypeScript, you can follow these steps:
// Set Up MongoDB Connection: Ensure you have a MongoDB connection set up in your Next.js application.
// Handle Clerk Sign-In: Use Clerk's webhook or the onSignIn event to trigger the addition of the user to your MongoDB database.
// Create User Model: Define a user model that matches the structure of the data you want to store in MongoDB.
// Implement the Logic: Write the logic to add or update the user in your MongoDB database upon sign-in.


//We continue to the db.ts file