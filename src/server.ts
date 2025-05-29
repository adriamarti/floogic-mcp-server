import { createServer } from 'http';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createGoogleCalendarEvent } from "./tools/google-calendar.js";

// Create MCP server instance
const server = new McpServer({
  name: "floogic-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Add Tools
server.tool(
  "createGoogleCalendarEvent",
  {
    start: z.string(),
    end: z.string(),
    cliente: z.string(),
    email: z.string(),
    contexto: z.string(),
  },
  createGoogleCalendarEvent,
);

// Create HTTP server
const httpServer = createServer(async (req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    // Read request body
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString());

    // Process MCP request
    const result = await server.handle(body);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } catch (error: any) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`MCP Server running at http://localhost:${PORT}`);
}); 