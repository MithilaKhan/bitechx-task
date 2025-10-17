
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ['/', '/product-details/:id']

export async function middleware(Request: NextRequest) {
    try {
        const url = await Request.nextUrl.pathname
        const cookieStore = await cookies();
        const loginToken = cookieStore.get("accessToken")?.value;


        if (privateRoutes.includes(url) && !loginToken) {
            return NextResponse.redirect(new URL("/login", Request.url));
        }

        NextResponse.next();

    } catch (error) {
        console.error("Error in middleware:", error);
    }

}

export const config = {
    matcher: ['/', '/product-details/:id'],
}