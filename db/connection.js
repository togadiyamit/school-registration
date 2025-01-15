const Pool = require("pg");



function executeQuery(query) {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "school",
    password: "Mit@2003",
    port: 5432,
  });

  pool.query(query, (err, res) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log(res.raws[0]);
    }
  });
}

module.exports = {executeQuery}