import supabase from "@/config/supabase";
import { NextResponse } from "next/server";
import moment from "moment-timezone";
import { siteConfig } from "@/config/site";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const OTP_EXPIRATION_TIME = 15;

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request) {
  const headers = {
    ...corsHeaders,
  };

  try {
    const { mobile, otp } = await request.json();

    // Validate input
    if (!mobile || !otp) {
      return NextResponse.json(
        { error: "Mobile number and OTP are required." },
        { status: 400, headers }
      );
    }

    // Fetch user by mobile number and check OTP
    const { data: user, error: userError } = await supabase
      .from("verified_users")
      .select("otp, sent_at")
      .eq("mobile", mobile)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Invalid mobile number or OTP." },
        { status: 404, headers }
      );
    }

    const { otp: storedOtp, sent_at } = user;

    // Check if OTP matches
    if (storedOtp !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP." },
        { status: 401, headers }
      );
    }

    // Parse `sent_at` in IST timezone
    const sentAtIST = moment().tz(sent_at, siteConfig.timeZone);
    const currentIST = moment().tz(siteConfig.timeZone);

    // Check OTP expiration (15 minutes)
    if (currentIST.diff(sentAtIST, "minutes") > OTP_EXPIRATION_TIME) {
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 410, headers }
      );
    }

    // OTP verification successful
    return NextResponse.json(
      { message: "OTP verified successfully." },
      { status: 200, headers }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during OTP verification." },
      { status: 500, headers }
    );
  }
}
