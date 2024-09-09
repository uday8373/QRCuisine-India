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
      return NextResponse.json(
        { error: error.message, code: "AUTH_FAILED" },
        { status: 401 }
      );
    }

    const user = data?.user;

    if (!user?.user_metadata?.isVerified) {
      return NextResponse.json(
        {
          error: "User is unverified",
          code: "USER_UNVERIFIED",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { message: "User is verified", data },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "An error occurred", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS
      "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow these headers
    },
  });
}
