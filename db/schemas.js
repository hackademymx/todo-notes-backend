const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION || 'pon aquí tu string de conexion', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Me he conecatdo correctamente...')
});

const todoSchema = new mongoose.Schema({
  title: String,
  body: String,
  date: Date
});

const TodoNote = mongoose.model('TodoNote', todoSchema);

module.exports = { TodoNote };
