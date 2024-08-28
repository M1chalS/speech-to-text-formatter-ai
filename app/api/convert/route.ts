import { NextRequest, NextResponse } from "next/server";


export function POST(req: NextRequest) {
    const file = req.body;

    console.log(file);

    return new NextResponse(JSON.stringify({ message: "Hello, World!" }), {
        status: 200,
    });
}