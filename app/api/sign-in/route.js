import supabase from "@/config/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return new NextResponse(
        JSON.stringify({ error: error.message, code: "AUTH_FAILED" }),
        { status: 401, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const user = data?.user;

    if (!user?.user_metadata?.isVerified) {
      return new NextResponse(
        JSON.stringify({
          error: "User is unverified",
          code: "USER_UNVERIFIED",
        }),
        { status: 403, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "User is verified", data }),
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: "An error occurred", code: "INTERNAL_ERROR" }),
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
