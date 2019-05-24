const app = require('express')();
const bodyParser = require('body-parser');
const { TodoNote } = require('./db/schemas');

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('TODO api de Rodrigo'));

// CRUD - es un acrónimo

// Create
app.post('/todo', (req, res) => {
  // Crear nota
  const {
    title,
    body,
    date
  } = req.body;

  const newTodo = new TodoNote({ title, body, date });
  newTodo.save((err, savedObject) => {
    return err
      ? res.send('Ocurrió un error')
      : res.send('Nota guardada con éxito');
  });

});

// Read
app.get('/todos', (req, res) => {
  TodoNote.find((err, todosList) => {
    return err
      ? res.send('Ocurrió un error')
      : res.send(todosList);
  });
});

app.get('/todos/:documentId', (req, res) => {
  const { documentId } = req.params;

  TodoNote.find({ _id: documentId }, (err, result) => {
    return err
      ? res.send('Ocurrió un error')
      : res.send(result[0]);
  });
});

// Update
app.patch('/todo', (req, res) => {
  const { documentId, title } = req.body;

  TodoNote.find({ _id: documentId }, (err, result) => {
    const editedNote = new TodoNote(result[0]);
    editedNote.title = title;
    editedNote.save((err, savedObject) => {
      return err
        ? res.send('Ocurrió un error')
        : res.send('Nota editada con éxito');
    })
  });
});

// Delete
app.delete('/todo', (req, res) => {
  const { documentId, title } = req.body;
  TodoNote.findOneAndDelete({ _id: documentId }, (err, result) => {
    return err
      ? res.send('Ocurrió un error')
      : res.send('Nota borrada con éxito');
  });
});

app.listen(5000, () => console.log('Servidor levantado'));