const { sendError, sendSuccess } = require('./response-mixins');

const mongoResponse = (response, mongoPromise) =>
  mongoPromise
    .then(result => sendSuccess(response, result))
    .catch(error => sendError(response, error));

module.exports = { mongoResponse };
