import { NextRequest, NextResponse } from "next/server";
import { getHidden, getLines } from "./getSudokuGrid";
import { DifficultyLevel } from "@/app/sudoku/types/sudoku-types";

export function GET(req: NextRequest, res: NextResponse) {
  console.log(res);
  const params = req.nextUrl.searchParams;
  const difficulty = Number(params.get("d"));
  if (!difficulty || ![1, 2, 3].includes(difficulty)) {
    return NextResponse.json(
      { error: "Difficulty level is required param" },
      { status: 400 }
    );
  }
  const lines = getLines();
  const hidden = getHidden(difficulty as DifficultyLevel);
  return NextResponse.json({
    lines,
    hidden,
  });
}
