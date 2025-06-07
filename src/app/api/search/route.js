import { NextResponse } from "next/server";
import { connect } from "@/models/dbConfig";
import electroModel from "@/models/electroModel";

// 🔍 Search API (GET)
export async function GET(request) {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const length = searchParams.get("length");
    const runningSetWeight = searchParams.get("runningSetWeight");

    // Validation: Name is required
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    // Build the query dynamically
    let query = {
      name: new RegExp(name, "i"), // Case-insensitive search for name
    };

    if (length) {
      query.length = new RegExp(length, "i"); // Case-insensitive search for length
    }

    if (runningSetWeight) {
      query.runningSetWeight = new RegExp(runningSetWeight, "i");
    }

    const results = await electroModel.find(query).lean();

    return NextResponse.json({ success: true, data: results }, { status: 200 });
  } catch (error) {
    console.error("Error in search API:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
