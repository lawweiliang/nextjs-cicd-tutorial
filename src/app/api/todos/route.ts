import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { todoCounter } from "@/lib/prometheus";

// GET: Fetch all todos
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(todos);
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

// POST: Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { error: "Title is required and must be a string" },
        { status: 400 }
      );
    }

    const newTodo = await prisma.todo.create({
      data: {
        title: body.title,
        completed: body.completed ?? false,
      },
    });

    // Increment the custom counter
    todoCounter.inc();

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Failed to create todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
