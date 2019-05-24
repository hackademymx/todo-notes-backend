const { TodoNote } = require('./schema');

const createNewTodoNote = (req, res) => {

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
};

const getAllTodoNotes = (req, res) => {
  TodoNote.find((err, todosList) => {
    return err
      ? res.send('Ocurrió un error')
      : res.send(todosList);
  });
};

const getSpecificTodoNote = (req, res) => {
  const { documentId } = req.params;

  TodoNote.find({ _id: documentId }, (err, result) => {
    return err
      ? res.send('Ocurrió un error')
      : res.send(result[0]);
  });
};

const updateSpecificTodoNote = (req, res) => {
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
};

const deleteSpecificNote = (req, res) => {
  const { documentId, title } = req.body;
  TodoNote.findOneAndDelete({ _id: documentId }, (err, result) => {
    return err
      ? res.send('Ocurrió un error')
      : res.send('Nota borrada con éxito');
  });
};

module.exports = {
  createNewTodoNote,
  getAllTodoNotes,
  getSpecificTodoNote,
  updateSpecificTodoNote,
  deleteSpecificNote
};