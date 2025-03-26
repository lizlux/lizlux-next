import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      // Function to send messages
      const sendEvent = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Send initial connection message
      sendEvent({ message: "Connected to SSE" });

      // Send updates every second
      const interval = setInterval(() => {
        sendEvent({ timestamp: new Date().toISOString() });
      }, 1000);

      // Cleanup on stream cancellation
      const cleanup = () => {
        clearInterval(interval);
        controller.close();
      };

      req.signal.addEventListener("abort", cleanup);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   // // You can access query parameters like this:
//   // const { searchParams } = new URL(request.url);
//   // const id = searchParams.get("id");

//   // // Sample data - in a real app, you might fetch this from a database
//   // const data = {
//   //   message: "Hello from the App Router API!",
//   //   id: id || "No ID provided",
//   //   apiKey: process.env.OPEN_AI_API_KEY || "No API key provided",
//   // };

//   // // Return the response
//   // return NextResponse.json(data);

//   const headers = {
//     "Content-Type": "text/event-stream",
//     "Cached-Control": "no-cache",
//     Connection: "Content-Type, keep-alive",
//   };

//   const res = new NextResponse(null, { headers });

//   // res.setHeader("Content-Type", "text/event-stream");
//   // res.setHeader("Cached-Control", "no-cache");
//   // res.setHeader("Connection", "keep-alive");

//   console.log("prompt has been called");
//   const { prompt } = req.query;
//   console.log(prompt);
//   if (!prompt) {
//     console.error("no prompt");
//     res.json({'error': 'no query'});
//   }

//   // When client closes connection, stop sending events
//   req.on("close", () => {
//     res.end();
//   });

//   const stream = await client.chat.completions.create({
//     model: "gpt-4o",
//     messages: [
//       {
//         role: "user",
//         content: prompt,
//       },
//     ],
//     stream: true,
//   });

//   for await (const chunk of stream) {
//     if (chunk.choices[0].finish_reason === "stop") {
//       console.log("time to stop");
//     } else {      const content = chunk.choices[0].delta.content;
//       console.log(content);
//       res.write(`data: ${content}\n\n`);
//     }
//   }

// }
