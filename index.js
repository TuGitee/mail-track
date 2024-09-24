import express from "express";
import cors from "cors";

import { createMessage } from "./utils/message.js";
import { addTrack, findTrack, increaseTrackCount } from "./utils/request.js";
import { v4 as uuid } from "uuid";
import { emailCheck } from "./utils/regCheck.js";
import { sendEmail, getEmail } from "./utils/mail.js";

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/", (req, res) => {
    const { title = "", email = "", uid = null } = req.body;
    if (!emailCheck(email)) return createMessage(res, 400, "Email is not valid!");
    const id = uuid();
    addTrack(id, title, uid, email).then((_id) => {
        createMessage(res, 200, "Track created!", `${_id}.jpg`);
    }).catch((err) => {
        createMessage(res, 500, err.message);
    })
})

app.get("/:id.jpg", (req, res) => {
    const id = req.params.id.trim();
    if (!id) return createMessage(res, 400, "Id is null!");
    findTrack(id).then((track) => {
        const transparentImage = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC', 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': transparentImage.length
        })
        if(track.is_track) {
            sendEmail(track.email, getEmail(track.id, track.title, track.count + 1));
            increaseTrackCount(track.id);
        }
        res.end(transparentImage);
    }).catch((err) => {
        createMessage(res, 500, err.message);
    })
})

const server = app.listen(8000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`server: ${host}:${port}`)
});

module.exports = app;