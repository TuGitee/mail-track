import { db } from "./db.js";
export const findTrack = (id) => {
    return new Promise((resolve, reject) =>{
        db.query(`SELECT * FROM track WHERE id = ?`, [id]).then((result) => {
            resolve(result[0]);
        }).catch((err) => {
            reject(err);
        })
    })
}