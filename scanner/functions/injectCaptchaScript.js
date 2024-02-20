function injectCaptchaScript(element, opts, callback, setValue) {
  var callbackName =
    opts.provider + 'Callback_' + Math.floor(Math.random() * 1000001);
  var attributes = {
    async: true,
    defer: true
  };
  var scriptSrc = scriptForCaptchaProvider(
    opts.provider,
    opts.lang,
    callbackName,
    opts.clientSubdomain,
    opts.siteKey
  );
  if (
    opts.provider === ARKOSE_PROVIDER ||
    opts.provider === AUTH0_V2_CAPTCHA_PROVIDER
  ) {
    var retryCount = 0;
    attributes['data-callback'] = callbackName;
    attributes['onerror'] = function () {
      if (retryCount < MAX_RETRY) {
        removeScript(scriptSrc);
        loadScript(scriptSrc, attributes);
        retryCount++;
        return;
      }
      removeScript(scriptSrc);
      // Optimzation to tell auth0 to fail open if Arkose/auth0_v2 is configured to fail open
      setValue('BYPASS_CAPTCHA');
    };
    window[callbackName] = function (arkose) {
      window.arkose = arkose;
      callback(arkose);
    };
  } else {
    window[callbackName] = function () {
      delete window[callbackName];
      callback();
    };
    if (opts.provider === FRIENDLY_CAPTCHA_PROVIDER) {
      attributes['onload'] = window[callbackName];
    }
  }
  loadScript(scriptSrc, attributes);
}