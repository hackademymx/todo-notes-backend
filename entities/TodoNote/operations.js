const { TodoNote } = require('./schema');
const { mongoResponse } = require('../../mixins/mongo-mixins');

const createNewTodoNote = (req, res) => {

  const {
    title,
    body,
    date
  } = req.body;

  const newTodo = new TodoNote({ title, body, date });
  return mongoResponse(res, newTodo.save());

};

const getAllTodoNotes = (req, res) => mongoResponse(res, TodoNote.find());

const getSpecificTodoNote = (req, res) => {
  const { documentId } = req.params;
  return mongoResponse(res, TodoNote.find({ _id: documentId }));
};

const updateSpecificTodoNote = (req, res) => {
  const { documentId, title } = req.body;

  return TodoNote.find({ _id: documentId })
    .then(result => {
      const editedNote = new TodoNote(result[0]);
      editedNote.title = title;
      return mongoResponse(res, editedNote.save());
    })
    .catch(err => sendError(err));
};

const deleteSpecificNote = (req, res) => {
  const { documentId } = req.query;
  return mongoResponse(res, TodoNote.findOneAndDelete({ _id: documentId }));
};

module.exports = {
  createNewTodoNote,
  getAllTodoNotes,
  getSpecificTodoNote,
  updateSpecificTodoNote,
  deleteSpecificNote
};