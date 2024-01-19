import express from "express";
import authRouter from "./auth/auth.router";

const app = express();

app.use(express.json());

const globalPrefix = "/api";

app.use(globalPrefix, authRouter);

const port = 5500;

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
