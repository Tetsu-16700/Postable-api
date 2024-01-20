import express from "express";
import authRouter from "./auth/auth.router";
import postRouter from "./posts/post.router";

const app = express();

app.use(express.json());

const globalPrefix = "/api";

// post dcrear post

app.use(globalPrefix, authRouter);
app.use(globalPrefix, postRouter);

const port = 5500;

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
