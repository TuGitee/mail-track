import express from "express";
import cors from "cors";
import path from "path";

import { createMessage } from "./utils/message.js";
import { addTrack, findTrack, increaseTrackCount } from "./utils/request.js";
import { v4 as uuid } from "uuid";
import { emailCheck } from "./utils/regCheck.js";
import { sendEmail, getEmail } from "./utils/mail.js";
import { hashInfo } from "./utils/hash.js";
import { transparentImage } from "./utils/image.js";

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/", async (req, res) => {
    const { title = "", email = "", uid = null } = req.body;
    if (!emailCheck(email)) return createMessage(res, 400, "Email is not valid!");
    const id = uuid();
    const hash = hashInfo(req.ip, req.headers["user-agent"]);
    addTrack(id, title, uid, email, hash).then((_id) => {
        createMessage(res, 200, "Track created!", `${_id}.jpg`);
    }).catch((err) => {
        createMessage(res, 500, err.message);
    })
})

app.get("/:id.jpg", (req, res) => {
    const id = req.params.id.trim();
    if (!id) return createMessage(res, 400, "Id is null!");
    const hash = hashInfo(req.ip, req.headers["user-agent"]);
    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': transparentImage.length,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    })
    res.end(transparentImage);
    findTrack(id).then(async (track) => {
        console.log(hash, track.hash);
        if (track.is_track && hash !== track.hash) {
            sendEmail(track.email, getEmail(track.id, track.title, track.count + 1));
            increaseTrackCount(track.id);
        }
    }).catch((err) => {
        createMessage(res, 500, err.message);
    })
})

app.on("error", (err) => {
    console.log(err);
})

const server = app.listen(8000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`server: ${host}:${port}`)
});

export default app;

module.exports = app;