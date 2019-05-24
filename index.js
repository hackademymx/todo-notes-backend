const app = require('express')();
const bodyParser = require('body-parser');
const todoNoteOps = require('./entities/TodoNote/operations');

// Se usa para poder revisar el contenido del body dentro de las peticiones http
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('TODO api de Rodrigo'));

app.route('/todos')
  .get(todoNoteOps.getAllTodoNotes)
  .post(todoNoteOps.createNewTodoNote)
  .patch(todoNoteOps.updateSpecificTodoNote)
  .delete(todoNoteOps.deleteSpecificNote);

app.get('/todos/:documentId', todoNoteOps.getSpecificTodoNote);

app.listen(5000, () => console.log('Servidor levantado'));