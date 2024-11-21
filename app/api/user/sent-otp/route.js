import supabase from "@/config/supabase";
import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

const generateOtp = () => Math.floor(1000 + Math.random() * 9000);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request) {
  const headers = {
    ...corsHeaders,
  };
  const { mobile } = await request.json();

  if (!mobile) {
    return NextResponse.json(
      { error: "Mobile number is required." },
      { status: 400, headers }
    );
  }

  try {
    // Fetch the user by mobile number
    const { data: user, error: userError } = await supabase
      .from("verified_users")
      .select("id, mobile")
      .eq("mobile", mobile)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Mobile number not found" },
        { status: 404, headers }
      );
    }

    const otp = generateOtp();
    const sentAt = moment.tz(siteConfig.timeZone);

    const { error: saveError } = await supabase
      .from("verified_users")
      .insert({ otp: otp, sent_at: sentAt });

    if (saveError) {
      return NextResponse.json(
        { error: "Failed to save OTP" },
        { status: 500, headers }
      );
    }

    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: siteConfig.FAST2SMS_API_KEY,
      },
      body: JSON.stringify({
        route: "q",
        numbers: mobile,
        message: `Hello,

Your OTP for password recovery is: ${otp}. 

Please use this code within 15 minutes to proceed with your recovery. Do not share this code with anyone.

Thank you,
QRCuisine Team`,
      }),
    });

    const fast2smsResponse = await response.json();

    if (!fast2smsResponse.return) {
      return NextResponse.json(
        { error: "Failed to send OTP" },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200, headers }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500, headers }
    );
  }
}
