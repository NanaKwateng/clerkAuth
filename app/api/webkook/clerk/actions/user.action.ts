"use server"

import User from "@/app/api/data/models/user.modal";
import { connect } from "@/db";

export async function createUser(user: any) {
    try {
        await connect();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create user"); // Optional: Rethrow the error for better error handling
    }
}
