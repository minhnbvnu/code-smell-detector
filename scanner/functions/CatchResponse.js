function CatchResponse(res, error = null, message = 'Sorry! Something went wrong.', code = 400, data = null) {
  return res
  // .status(code)
    .json({
      code,
      message,
      error,
      data,
    });
}