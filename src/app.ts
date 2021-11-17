import express, { Application } from "express";
import mainLoader from "./Loaders";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import routes from "./routes";

global.__basedir = __dirname;

async function startServer() {
  const app: Application = express();
  const PORT = process.env.PORT || 5000;

  await mainLoader({ expressApp: app });

  app.listen(PORT, () => {
    console.log(`
        ################################################
        🛡️  Server listening on port: ${PORT} 🛡️
        ################################################
      `);
  });
}

startServer();
