const express = require('express');
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const createTable = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id));`
connection.query(createTable);

const sql1 = `INSERT INTO people(name) values('Everton');`;
connection.query(sql1);

const sql2 = `INSERT INTO people(name) values('João');`;
connection.query(sql2);

app.get('/',(req, res) => {
  const sqlConsulta = `SELECT * FROM people`;
  connection.query(sqlConsulta, function (err, result) {
    if (err) {
      console.log('Erro mysql: ' + err)
      res.send('error: ' + err)
    }

    const lista = `
      <ul>
        ${result.map(p => `<li>${p.name}</li>`).join('')}
      </ul>
    `;

    res.send('<h1>Full Cycle Rocks!</h1>\n' + lista)
  })
});

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
});
