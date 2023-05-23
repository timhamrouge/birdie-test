import express from "express";
import routes from "./routes/index";

// import { pingController } from "./controllers/ping";

const app = express();

// app.use(pingController);

app.use("/", routes);

export default app;
