import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

function serveStatic(app: express.Express) {
  // In production, serve from dist/public directory
  const distPath = path.resolve(__dirname, "..", "dist", "public");
  
  // Fallback to current directory structure if dist/public doesn't exist
  const fallbackPath = path.resolve(__dirname, "..", "public");
  
  const staticPath = fs.existsSync(distPath) ? distPath : fallbackPath;

  if (!fs.existsSync(staticPath)) {
    console.error(`Could not find static files at ${staticPath}`);
    console.log("Available paths:");
    console.log("- __dirname:", __dirname);
    console.log("- distPath:", distPath);
    console.log("- fallbackPath:", fallbackPath);
  }

  app.use(express.static(staticPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(staticPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Application not found");
    }
  });
}

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error(err);
  });

  // Serve static files in production
  serveStatic(app);

  // Use Railway's PORT environment variable in production
  const port = Number(process.env.PORT) || 3000;
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    console.log(`serving on port ${port}`);
  });
})();