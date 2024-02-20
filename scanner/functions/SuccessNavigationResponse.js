function SuccessNavigationResponse(res, navigateUrl = null, state = null, message = 'Success', code = 200, error = null) {
  return res
  // .status(code)
    .json({
      code,
      message,
      error,
      navigateUrl,
      state,
    });
}