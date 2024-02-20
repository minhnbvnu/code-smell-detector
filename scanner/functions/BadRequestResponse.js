function BadRequestResponse(res, error = null, message = 'Bad request', code = 400, data = null) {
  return makeResponse({
    res,
    code,
    data,
    message,
    error,
  });
}