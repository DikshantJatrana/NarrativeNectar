import { NextRequest, NextResponse } from "next/server";
import { signupValidator } from "@/lib/zod";
import { setToken } from "@/lib/jwt";
import bcryptjs from "bcryptjs";
import { UserInterface } from "@/lib/interfaceTypescript";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { nanoid } from "nanoid";
import { AUTHOR_BY_EMAIL_QUERY } from "@/sanity/lib/queries";

export async function POST(req: NextRequest) {
  try {
    const parsedbody = signupValidator.safeParse(await req.json());
    if (!parsedbody.success) {
      return NextResponse.json({ msg: "Invalid details" }, { status: 400 });
    }
    const { username, email, password } = parsedbody.data;

    if (!username || !email || !password) {
      return NextResponse.json({ msg: "Invalid details" }, { status: 400 });
    }
    const checkUser = await client.fetch(AUTHOR_BY_EMAIL_QUERY, {
      email: email,
    });
    if (checkUser) {
      return NextResponse.json({ msg: "User Already Exist" }, { status: 400 });
    }
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log(hashedPassword);
    const userData = {
      _type: "author",
      id: nanoid(),
      name: username,
      username: username,
      email: email,
      image: "",
      bio: "",
      password: hashedPassword,
    };

    const newUser = await writeClient.create(userData).catch((error) => {
      console.error("Error creating user in Sanity:", error);
      throw error;
    });
    if (!newUser) {
      return NextResponse.json(
        { msg: "Something Went Wrong" },
        { status: 400 }
      );
    }
    const token = setToken({
      id: newUser.id,
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
