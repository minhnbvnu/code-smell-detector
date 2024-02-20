function ValidateErrorResponse(res, error = null, code = 401, data = null, message = 'validation failed') {
  return res
  // .status(code)
    .json({
      code,
      message,
      error,
      data,
    });
}