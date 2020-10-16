import { config } from "dotenv";
import { resolve } from "path";
import { createServer } from "http";
import app from "./app";

/**
 * creates https server, and gets environment file, with the port
 */
const server = createServer(app);

config({ path: resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => console.log(`running on port ${PORT}`));
