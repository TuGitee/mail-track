import express from "express";
import cors from "cors";

import { db} from "./utils/db.js";
import { createMessage } from "./utils/message.js";
import { findTrack } from "./utils/request.js";

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.get("/(*).jpg", (req, res) => {
    // 查找内容是否在数据库中
    findTrack(req.params[0]).then((track) => {
        if (track) {
            console.log(track);
        } else {
            res.send("no such track");
        }
    })
})

const server = app.listen(8000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`server: ${host}:${port}`)
});

export { app };