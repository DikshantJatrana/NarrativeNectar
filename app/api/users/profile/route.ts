import User from "@/model/userModel";
import { UserInterface } from "@/lib/interfaceTypescript";
import { getToken } from "@/lib/jwt";
import { connect } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const cookies = req.cookies.get("token")?.value;
    const header = req.headers.get("authorization")?.split(" ")[1];
    const token = cookies || header;

    if (!token) {
      return NextResponse.json({ msg: "Token not found" }, { status: 400 });
    }

    const userToken = getToken(token);
    const user = await User.findById(userToken._id);

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 400 });
    }

    return NextResponse.json(
      { msg: "User Found Successful", user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
