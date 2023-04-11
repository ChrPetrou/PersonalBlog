import { NextResponse } from "next/server";
import { useTheme } from "providers/ThemeProvider";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const response = NextResponse.next();

  return response;
}
//
//don't match static files

export const config = {
  matcher: ["/"],
};
