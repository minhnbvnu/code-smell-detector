function globalForCaptchaProvider(provider) {
  switch (provider) {
    case RECAPTCHA_V2_PROVIDER:
      return window.grecaptcha;
    case RECAPTCHA_ENTERPRISE_PROVIDER:
      return window.grecaptcha.enterprise;
    case HCAPTCHA_PROVIDER:
      return window.hcaptcha;
    case FRIENDLY_CAPTCHA_PROVIDER:
      return window.friendlyChallenge;
    case ARKOSE_PROVIDER:
      return window.arkose;
    case AUTH0_V2_CAPTCHA_PROVIDER:
      return window.turnstile;
    /* istanbul ignore next */
    default:
      throw new Error('Unknown captcha provider');
  }
}