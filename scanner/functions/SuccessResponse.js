function SuccessResponse(res, data = null, message = 'Success', code = 200, error = null) {
  return res
  // .status(code)
    .json({
      code,
      message,
      error,
      data,
    });
}