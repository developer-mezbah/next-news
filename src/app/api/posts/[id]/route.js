import prisma from "@/utils/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


// Get single post
export async function GET(req, {params}){
    try {
        const id = params.id;
        console.log(typeof(id));
        const post = await prisma.post.findUnique({where: {id}});
        console.log(post);
        return NextResponse.json(post)
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Could not fetch post"})
    }
}


// update post 
export async function PUT(req,  {params}){
    const session = await getServerSession(authOptions)

    if(!session) {
        return NextResponse.json({error: "Not authenticated!"}, {status: 401})
    }

    const {title, content, links, selectedCategory,imageUrl,publicId} = await req.json();
    const id = params.id;

    try {
        const post = await prisma.post.update({
            where: {id},
            data: {
                title,
                content,
                links,
                catName: selectedCategory,
                imageUrl,
                publicId
            }
        })
        return NextResponse.json(post)
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "error editing post!"})
    }
}

// delete single post
export async function DELETE(req, {params}){
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({error: "Not authenticated!"}, {status: 401});
    }

    const id = params.id;
    try {
        const post = await prisma.post.delete({where: {id}})
        return NextResponse.json(post)
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error deleting the post!"})
    }
}