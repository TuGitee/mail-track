import pkg from "pg";
const { Client } = pkg;

export const db = new Client({
	connectionString: process.env.POSTGRES_URL,
})

db.connect((err, client) => {
	if (err) {
		console.log(err);
		return;
	}
	
	const createUserSQL = `CREATE TABLE IF NOT EXISTS user (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255))`;
	const createTrackSQL = `CREATE TABLE IF NOT EXISTS track (id NOT NULL PRIMARY KEY, time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, uid INT NOT NULL, title VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, count INT NOT NULL DEFAULT 0, is_track BOOLEAN NOT NULL DEFAULT TRUE)`;

	client.query(createUserSQL);
	client.query(createTrackSQL);
});