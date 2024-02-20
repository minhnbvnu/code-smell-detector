function ErrorResponse(res, error = null, code = 400, data = null, message = 'failed') {
  return res
  // .status(code)
    .json({
      code,
      message,
      error,
      data,
    });
}