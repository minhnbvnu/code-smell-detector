function NotFoundResponse(res, error = null, message = 'Not found', code = 404, data = null) {
  return makeResponse({
    res,
    code,
    data,
    message,
    error,
  });
}