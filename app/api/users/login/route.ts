import User from "@/model/userModel";
import { connect } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { loginValidator } from "@/lib/zod";
import { setToken } from "@/lib/jwt";
import bcryptjs from "bcryptjs";
import { UserInterface } from "@/lib/interfaceTypescript";

connect();

export async function POST(req: NextRequest) {
  try {
    const parsedbody = loginValidator.safeParse(await req.json());
    if (!parsedbody.success) {
      return NextResponse.json({ msg: "Invalid details" }, { status: 400 });
    }
    const { email, password } = parsedbody.data;
    if (!email || !password) {
      return NextResponse.json({ msg: "Invalid details" }, { status: 400 });
    }
    const newUser = await User.findOne({ email }).select("+password");
    if (!newUser) {
      return NextResponse.json({ msg: "User not Found" }, { status: 400 });
    }
    const comparePassword = await bcryptjs.compare(password, newUser.password);
    if (!comparePassword) {
      return NextResponse.json({ msg: "User not Found" }, { status: 400 });
    }

    const token = setToken({
      _id: newUser._id,
      email: newUser.email,
    } as UserInterface);

    const response = NextResponse.json(
      { msg: "User created successfully", newUser },
      { status: 201 }
    );
    response.cookies.set("token", token);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { msg: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { msg: "Internal Server Error", error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
