import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();
    
    const cookieStore = await cookies(); // ✅ await here
    const token = cookieStore.get("authToken")?.value;

    if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
