function SocialCallbackResponse(res, navigateUrl, token = null, message, code = 200, status = 'success') {
  return res
  // .status(code)
    .json({
      code,
      status,
      message,
      navigateUrl,
      token,
    });
}