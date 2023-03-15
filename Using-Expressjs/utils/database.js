import mysql from "mysql2";

const database = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-schema",
  password: "Gbalamiluvsukky03",
});

export default database.promise();
