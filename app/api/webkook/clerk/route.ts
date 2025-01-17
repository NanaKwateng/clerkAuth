import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser } from './actions/user.action';

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        });
    }

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error: Could not verify webhook:', err);
        return new Response('Error: Verification error', {
            status: 400,
        });
    }

    // Do something with payload
    const { id } = evt.data;
    const eventType = evt.type;

    // Check if user has been created 
    if (eventType === 'user.created') {
        console.log('User has been created');
        
        const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

        // Constructing the user object
        const user = {
            clerkId: id,
            email: email_addresses[0].email,
            userName: username,
            photo: image_url,
            firstName: first_name,
            lastName: last_name // Corrected variable name from "lastname" to "last_name"
        };

        // Logging the user object (optional)
        console.log(user);

        // Creating the new user in the database
        const newUser = await createUser(user);

        if (newUser) {
            console.log('New user created:', newUser);
        }
    }

    console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
    console.log('Webhook payload:', body);

    return new Response('Webhook received', { status: 200 });
}
