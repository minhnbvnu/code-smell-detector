function combineCaptchaError({ fieldKey, message }) {
  // error
  const error = new Error();
  error.code = 422;
  error.message = [
    {
      keyword: 'x-captcha',
      params: [],
      message,
      dataPath: `/captcha/${fieldKey}`,
      schemaPath: `#/properties/captcha/${fieldKey}/x-captcha`,
    },
  ];
  return error;
}