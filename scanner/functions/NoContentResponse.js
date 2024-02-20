function NoContentResponse(res, error = null, message = 'No content', code = 204, data = null) {
  return makeResponse({
    res,
    code,
    data,
    message,
    error,
  });
}