import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { networkInterfaces } from "node:os";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4179);
const host = process.env.HOST || "0.0.0.0";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".wasm": "application/wasm",
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    const pathname = decodeURIComponent(url.pathname);
    const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
    let filePath = resolve(join(root, safePath));

    if (!filePath.startsWith(resolve(root))) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    let fileStat = await stat(filePath).catch(() => null);
    if (!fileStat) {
      if (request.headers.accept?.includes("text/html") || !extname(filePath)) {
        filePath = join(root, "index.html");
        fileStat = await stat(filePath).catch(() => null);
      }
      if (!fileStat) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }
    }

    if (fileStat.isDirectory()) {
      filePath = join(filePath, "index.html");
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    createReadStream(filePath).pipe(response);
  } catch (error) {
    response.writeHead(500);
    response.end(error instanceof Error ? error.message : "Server error");
  }
}).listen(port, host, () => {
  const localUrl = `http://127.0.0.1:${port}/`;
  const lanUrls = lanAddresses().map((address) => `http://${address}:${port}/`);
  console.log(`LinguaReader running at ${localUrl}`);
  if (host === "0.0.0.0") {
    console.log("Mobile/LAN URLs:");
    for (const url of lanUrls) console.log(`  ${url}`);
  }
});

function lanAddresses() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((item) => item && item.family === "IPv4" && !item.internal)
    .map((item) => item.address);
}
