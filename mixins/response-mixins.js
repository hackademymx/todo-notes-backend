const globalResponse = (res, responseObject) => res.send(responseObject);
const sendSuccess = (res, message, log) => globalResponse(res, { success: message, log });
const sendError = (res, message, log) => globalResponse(res, { error: message, log });

module.exports = { sendSuccess, sendError };