import { NextRequest, NextResponse } from "next/server";

/**
 * Redirect all traffic hitting the legacy host bri-dashboard-hub.vercel.app
 * to the renamed canonical host ad-team-dashboards.vercel.app.
 * Keeps existing bookmarks working after the Bri's Dashboards → Ad Team
 * Dashboards rename (2026-09-11).
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host === "bri-dashboard-hub.vercel.app") {
    const url = new URL(req.url);
    url.host = "ad-team-dashboards.vercel.app";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
