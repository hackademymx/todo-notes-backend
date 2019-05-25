const app = require('express')();
const bodyParser = require('body-parser');
const todoNoteOps = require('./entities/TodoNote/operations');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, POST, PATCH, DELETE");
  next();
});

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
