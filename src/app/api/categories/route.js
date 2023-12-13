import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories)
    } catch (error) {
        console.log(error);
    }
}