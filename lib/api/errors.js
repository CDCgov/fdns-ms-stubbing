const sendError = (res, method, message) => {
  res.status(400).send({
    method,
    message,
    success: false,
  });
};

module.exports = sendError;
