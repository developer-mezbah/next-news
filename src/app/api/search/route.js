import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";


export async function POST(req, res){
    const reqBody = await req.json()
    try {
        const categories = await prisma.Post.findMany({
            where: {title: {contains: reqBody}},
        });
        return NextResponse.json(categories)
    } catch (error) {
        console.log(error);
    }
}