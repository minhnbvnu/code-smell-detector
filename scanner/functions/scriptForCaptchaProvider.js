function scriptForCaptchaProvider(
  provider,
  lang,
  callback,
  clientSubdomain,
  siteKey
) {
  switch (provider) {
    case RECAPTCHA_V2_PROVIDER:
      return (
        'https://www.recaptcha.net/recaptcha/api.js?hl=' +
        lang +
        '&onload=' +
        callback
      );
    case RECAPTCHA_ENTERPRISE_PROVIDER:
      return (
        'https://www.recaptcha.net/recaptcha/enterprise.js?render=explicit&hl=' +
        lang +
        '&onload=' +
        callback
      );
    case HCAPTCHA_PROVIDER:
      return (
        'https://js.hcaptcha.com/1/api.js?hl=' + lang + '&onload=' + callback
      );
    case FRIENDLY_CAPTCHA_PROVIDER:
      return 'https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.12/widget.min.js';
    case ARKOSE_PROVIDER:
      return (
        'https://' +
        clientSubdomain +
        '.arkoselabs.com/v2/' +
        siteKey +
        '/api.js'
      );
    case AUTH0_V2_CAPTCHA_PROVIDER:
      return (
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=' +
        callback
      );
    /* istanbul ignore next */
    default:
      throw new Error('Unknown captcha provider');
  }
}