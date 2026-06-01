import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "mysql",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10
});

export default pool;