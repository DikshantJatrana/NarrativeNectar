import { UserInterface } from "@/lib/interfaceTypescript";
import { getToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";

export async function POST(req: NextRequest) {
  try {
    const cookies = req.cookies.get("token")?.value;
    const header = req.headers.get("authorization")?.split(" ")[1];
    const token = cookies || header;
    console.log(token);
    const parsedbody = await req.json();
    console.log(parsedbody);
    const { title, description, category, link, pitch } = parsedbody;
    if (!token) {
      return NextResponse.json({ msg: "Token not found" }, { status: 400 });
    }

    const userToken = getToken(token);
    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id: userToken.id });
    console.log(user);
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 400 });
    }
    const slug = slugify(title as string, { lower: true, strict: true });
    const newdata = {
      _type: "startup",
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: user?._id,
      },
      pitch,
    };

    const newStartup = await writeClient.create(newdata).catch((error) => {
      console.error("Error creating Start-up in Sanity:", error);
      throw error;
    });
    return NextResponse.json(
      { msg: "post created successfully", newStartup },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
