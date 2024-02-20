function SuccessResponsePublishLimit(res, quota_left = null, message = 'Success', code = 200, error = null) {
  return res
  // .status(code)
    .json({
      code,
      message,
      error,
      quota_left,
    });
}