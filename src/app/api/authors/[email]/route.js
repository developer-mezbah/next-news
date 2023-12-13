import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const email = params.email;
    const posts = await prisma.user.findUnique({
      where: { email },
      include: {
        posts: { orderBy: { createdAt: "desc" } },
      },
    });
    return NextResponse.json(posts)
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not fetch post" });
  }
}
