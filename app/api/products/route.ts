import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const tableName = "products";

export async function GET(request: Request) {
  let response;
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const term = searchParams.get("term") || "";
  const page = parseInt(searchParams.get("page") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");
  // Start index from 0
  const programLimit = limit - 1;
  const from = page * limit;
  const to = from + programLimit;

  if (id) {
    response = await supabase.from(tableName).select().eq("id", id).single();
  } else {
    response = await supabase
      .from(tableName)
      .select()
      .ilike("name", `%${term}%`)
      .range(from, to);
  }

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const supabase = createClient();
  const data = await request.json();

  const response = await supabase
    .from(tableName)
    .insert(data)
    .select()
    .single();

  return NextResponse.json(response);
}

export async function PATCH(request: Request) {
  const supabase = createClient();
  const data = await request.json();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const response = await supabase
    .from(tableName)
    .update(data)
    .eq("id", id)
    .select()
    .single();

  return NextResponse.json(response);
}

export async function DELETE(request: Request) {
  const supabase = createClient();
  const data = await request.json();

  const response = await supabase.from(tableName).delete().eq("id", data.id);

  return NextResponse.json(response);
}
