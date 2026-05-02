import { NextResponse } from "next/server";
import { mongoClient } from "@/lib/mongodb";

export async function GET() {
  try {
    await mongoClient.connect();
    await mongoClient.db("booknest").command({ ping: 1 });

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully",
      hasMongoUri: Boolean(process.env.MONGODB_URI),
      hasBetterAuthSecret: Boolean(process.env.BETTER_AUTH_SECRET),
      hasBetterAuthUrl: Boolean(process.env.BETTER_AUTH_URL),
      hasGoogleClientId: Boolean(process.env.GOOGLE_CLIENT_ID),
      hasGoogleClientSecret: Boolean(process.env.GOOGLE_CLIENT_SECRET),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "MongoDB connection failed",
        hasMongoUri: Boolean(process.env.MONGODB_URI),
        hasBetterAuthSecret: Boolean(process.env.BETTER_AUTH_SECRET),
        hasBetterAuthUrl: Boolean(process.env.BETTER_AUTH_URL),
        hasGoogleClientId: Boolean(process.env.GOOGLE_CLIENT_ID),
        hasGoogleClientSecret: Boolean(process.env.GOOGLE_CLIENT_SECRET),
      },
      { status: 500 }
    );
  }
}