const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');

    const db = client.db();

    app.post('/signup', (req, res) => {
      const user = {
        username: req.body.username,
        password: req.body.password
      };

      db.collection('users').insertOne(user)
        .then(result => {
          console.log(result);
          res.redirect('dashboard.html');
        })
        .catch(error => {
          console.error(error);
          res.redirect(__dirname + '/error.html');
        });
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    app.get('/dashboard.html', (req, res) => {
        res.sendFile(__dirname + '/dashboard.html');
    });

    app.get('/myboard.html', (req, res) => {
        res.sendFile(__dirname + '/myboard.html');
    });
      
  })
  .catch(error => {
    console.error(error);
  });
