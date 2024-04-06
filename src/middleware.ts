import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // if access to root path, redirect to `/agentflows`
    if (pathname === "/") {
        return NextResponse.redirect(new URL("/agentflows", request.url));
    }

    // 對於其他路徑，不進行操作
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
