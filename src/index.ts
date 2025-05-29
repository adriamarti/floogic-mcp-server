import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { createGoogleCalendarEvent } from "./tools/google-calendar.js";

// Create server instance
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

// Start Server with stdio transport
const transport = new StdioServerTransport();
server.connect(transport).catch((err) => {
  console.error(err);
  process.exit(1);
});