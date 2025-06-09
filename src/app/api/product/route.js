import { NextResponse } from "next/server";
import { connect } from "@/models/dbConfig";
import electroModel from "@/models/electroModel";

// 🔹 Create a new record (POST)
export async function POST(request) {
  try {
    await connect();

    const reqBody = await request.json();
    const {
      name,
      slot,
      connectionType,
      runningWireGauge,
      rpm,
      length,
      runningLength,
      startingLength,
      breadth,
      runningPintchOne,
      runningPintchTwo,
      runningPintchThree,
      runningPintchFour,
      runningPintchFive,
      runningPintchSix,
      startingPintchOne,
      startingPintchTwo,
      startingPintchThree,
      startingPintchFour,
      startingPintchFive,
      startingPintchSix,
      runnigSetWeight,
      startingSetWeight,
      startingWireGauge,
    } = reqBody;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    const existingRecord = await electroModel.findOne({ name }).lean();
    if (existingRecord) {
      return NextResponse.json(
        { success: false, error: "Record already exists" },
        { status: 409 }
      );
    }

    const newRecord = await electroModel.create(reqBody);

    return NextResponse.json(
      {
        success: true,
        message: "Record created successfully",
        data: newRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating record:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 🔹 Get all records (GET)
export async function GET() {
  try {
    await connect();
    const records = await electroModel.find().lean();

    return NextResponse.json({ success: true, data: records }, { status: 200 });
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 🔹 Update a record (PUT)
export async function PUT(request) {
  try {
    await connect();

    const reqBody = await request.json();
    const { id, ...updateFields } = reqBody;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    const updatedRecord = await electroModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return NextResponse.json(
        { success: false, error: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Record updated successfully",
        data: updatedRecord,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 🔹 Delete a record (DELETE)
export async function DELETE(request) {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    const deletedRecord = await electroModel.findByIdAndDelete(id);

    if (!deletedRecord) {
      return NextResponse.json(
        { success: false, error: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Record deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting record:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
