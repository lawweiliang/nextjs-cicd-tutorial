import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch a specific todo by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }
    
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    
    if (!todo) {
      return NextResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(todo);
  } catch (error: any) {
    console.error(`Failed to fetch todo ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch todo" },
      { status: 500 }
    );
  }
}

// PATCH: Update a specific todo
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : undefined,
        completed: body.completed !== undefined ? body.completed : undefined,
      },
    });
    
    return NextResponse.json(updatedTodo);
  } catch (error: any) {
    console.error(`Failed to update todo ${params.id}:`, error);
    
    // Check if the error is due to record not found
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a specific todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }
    
    await prisma.todo.delete({
      where: { id },
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error(`Failed to delete todo ${params.id}:`, error);
    
    // Check if the error is due to record not found
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}