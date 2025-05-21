import { NextRequest, NextResponse } from "next/server";
import promClient from "@/lib/prometheus";

export async function GET(req: NextRequest) {
  return new Response(await promClient.register.metrics(), {
    headers: {
      "Content-Type": promClient.register.contentType,
    },
  });
}
