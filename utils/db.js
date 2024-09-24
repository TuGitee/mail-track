import pkg from "pg";
const { Client } = pkg;

export const db = new Client({
	connectionString: process.env.POSTGRES_URL,
})

export const userTableName = "mail_user";
export const trackTableName = "mail_track";

const initDB = (err, client) => {
	if (err) {
		console.log(err);
		return;
	}

	const createUserSQL = `CREATE TABLE IF NOT EXISTS ${userTableName} (id SERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)`;
	const createTrackSQL = `CREATE TABLE IF NOT EXISTS ${trackTableName} (id VARCHAR(255) NOT NULL PRIMARY KEY, time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, uid INT REFERENCES ${userTableName}(id) ON DELETE CASCADE, title VARCHAR(255), email VARCHAR(255) NOT NULL, count INT NOT NULL DEFAULT 0, is_track BOOLEAN NOT NULL DEFAULT TRUE)`;

	client.query(createUserSQL);
	client.query(createTrackSQL);
}

db.connect(initDB);

db.on("error", (err) => {
	db.end().then(() => {
		db.connect(initDB);
	})
})