import { NextResponse } from "next/server";

export function GET(req: Request, res: Response) {
  console.log(req);
  console.log(res);
  return NextResponse.json({
    message: "reCAPTCHA verification successful",
  });
}
