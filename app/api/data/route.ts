import {auth, currentUser} from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const userId = auth();
    const user = await currentUser();

    return NextResponse.json(
        {
            message: 'Authentication successful',
            data: { userId: userId, username: `${user?.firstName} ${user?.lastName}` },
        },
        { status: 200 }
    );
}
