import { db, trackTableName } from "./db.js";

export const addTrack = (id, title, uid, email) => new Promise((resolve, reject) => {
    db.query(`INSERT INTO ${trackTableName} (id, title, uid, email) VALUES ($1, $2, $3, $4) RETURNING id`, [id, title, uid, email]).then((result) => {
        resolve(result.rows.pop().id)
    }).catch(reject)
})

export const findTrack = (id) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${trackTableName} WHERE id = $1`, [id])
        .then((result) => {
            if (!result.rowCount) {
                return reject(new Error("No such track"));
            }
            resolve(result.rows.pop());
        })
        .catch(reject);
});

export const findTracks = (uid) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${trackTableName} WHERE uid = $1`, [uid])
        .then((result) => {
            resolve(result.rows);
        })
        .catch(reject);
});

export const increaseTrackCount = (id) => new Promise((resolve, reject) => {
    db.query(`UPDATE ${trackTableName} SET count = count + 1 WHERE id = $1`, [id])
        .then((result) => {
            if (!result.rowCount) {
                return reject(new Error("No such track"));
            }
            resolve(result.rows.pop());
        })
        .catch(reject);
})