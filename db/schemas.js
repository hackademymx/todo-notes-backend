const { mongoose } = require('./db-connection');

const todoSchema = new mongoose.Schema({
  title: String,
  body: String,
  date: Date
});

const TodoNote = mongoose.model('TodoNote', todoSchema);

module.exports = { TodoNote };
