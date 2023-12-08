import express from 'express';
const cors = require('cors');
const bodyParser = require('body-parser');
import { connection } from "./db";
import { log } from 'console';
const app = express();
const port = 3001;

app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.json({message: "Hello form server"});

});

app.delete('/weapons/:id', async (req, res) => {

  var id = req.params.id;
  // Execute the query to get all users
  connection.query('DELETE FROM weapons WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Send the users as a JSON response
    res.json({message: "successfully deleted"});
  });
});

app.post('/weapons/create', async (req, res) => {

  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;

  connection.query('INSERT INTO weapons (name, description, price) VALUES (?,?,?)', [name, description, price] , (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    
  });
  res.json({message: req.body});
  // console.log(req.body);
})

app.post('/weapons/edit/:id', async (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;

  connection.query('UPDATE weapons SET name = ? , description = ? , price = ? WHERE id = ? ', [name, description, price, id] , (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    
  });
  res.json({message: req.body});
  // console.log(req.body);
})

app.get('/weapons', async (req, res) => {
  // Execute the query to get all users
  connection.query('SELECT * FROM weapons', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Send the users as a JSON response
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
