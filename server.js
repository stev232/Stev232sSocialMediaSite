const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// Require model
const { User } = require('./models');
const { Reaction } = require('./models');
const { Thought } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.get('/api/users', (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/api/users/:_id', (req, res) => {
  User.findOne({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/create', (req, res) => {
  db.collection('bookCollection').insertOne(
    { title: req.body.title, author: req.body.author }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

// To delete a document, we need to convert the string id in body to an ObjectId
app.delete('/delete', (req, res) => {
  // Wrap the id in the ObjectId class to instantiate a new instance
  const bookId = new ObjectId(req.body.id);

  // Use deleteOne() to delete one object
  db.collection('bookCollection').deleteOne(
    // This is the filter. We delete only the document that matches the _id provided in the request body.
    { _id: bookId }
  )
    .then(results => {
      console.log(results);
      res.send(
        results.deletedCount ? 'Document deleted' : 'No document found!'
      );
    })
    .catch(err => {
      if (err) throw err;
    });
});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});