function handleCaptchaProvider(element, options, challenge) {
  var widgetId =
    element.hasAttribute('data-wid') && element.getAttribute('data-wid');

  function setValue(value) {
    var input = element.querySelector('input[name="captcha"]');
    input.value = value || '';
  }

  if (
    challenge.provider === FRIENDLY_CAPTCHA_PROVIDER &&
    window.auth0FCInstance
  ) {
    setValue();
    window.auth0FCInstance.reset();
    return;
  } else if (
    challenge.provider === ARKOSE_PROVIDER &&
    globalForCaptchaProvider(challenge.provider)
  ) {
    setValue();
    globalForCaptchaProvider(challenge.provider).reset();
    return;
  } else if (widgetId) {
    setValue();
    globalForCaptchaProvider(challenge.provider).reset(widgetId);
    return;
  }

  element.innerHTML = options.templates[challenge.provider](challenge);

  var captchaClass;
  switch (challenge.provider) {
    case RECAPTCHA_ENTERPRISE_PROVIDER:
      captchaClass = '.recaptcha';
      break;
    case RECAPTCHA_V2_PROVIDER:
      captchaClass = '.recaptcha';
      break;
    case HCAPTCHA_PROVIDER:
      captchaClass = '.hcaptcha';
      break;
    case FRIENDLY_CAPTCHA_PROVIDER:
      captchaClass = '.friendly-captcha';
      break;
    case ARKOSE_PROVIDER:
      captchaClass = '.arkose';
      break;
    case AUTH0_V2_CAPTCHA_PROVIDER:
      captchaClass = '.auth0_v2';
      break;
  }
  var captchaDiv = element.querySelector(captchaClass);

  injectCaptchaScript(
    element,
    {
      lang: options.lang,
      provider: challenge.provider,
      clientSubdomain: challenge.clientSubdomain,
      siteKey: challenge.siteKey
    },
    function (arkose) {
      var global = globalForCaptchaProvider(challenge.provider);
      if (challenge.provider === ARKOSE_PROVIDER) {
        var retryCount = 0;
        arkose.setConfig({
          onCompleted: function (response) {
            setValue(response.token);
            captchaSolved();
          },
          onError: function () {
            if (retryCount < MAX_RETRY) {
              setValue();
              arkose.reset();
              // To ensure reset is successful, we need to set a timeout here
              setTimeout(function () {
                arkose.run();
              }, 500);
              retryCount++;
            } else {
              // Optimzation to tell auth0 to fail open if Arkose is configured to fail open
              setValue('BYPASS_CAPTCHA');
            }
          }
        });
      } else if (challenge.provider === FRIENDLY_CAPTCHA_PROVIDER) {
        window.auth0FCInstance = new global.WidgetInstance(captchaDiv, {
          sitekey: challenge.siteKey,
          language: options.lang,
          doneCallback: function (solution) {
            setValue(solution);
          },
          errorCallback: function () {
            setValue();
          }
        });
      } else {
        var renderParams = {
          callback: setValue,
          'expired-callback': function () {
            setValue();
          },
          'error-callback': function () {
            setValue();
          },
          sitekey: challenge.siteKey
        };

        if (challenge.provider === AUTH0_V2_CAPTCHA_PROVIDER) {
          retryCount = 0;
          renderParams.language = options.lang;
          renderParams.theme = 'light';
          renderParams.retry = 'never';
          renderParams['response-field'] = false;
          renderParams['error-callback'] = function () {
            if (retryCount < MAX_RETRY) {
              setValue();
              globalForCaptchaProvider(challenge.provider).reset(widgetId);
              retryCount++;
            } else {
              setValue('BYPASS_CAPTCHA');
            }
            return true;
          };
        }
        widgetId = global.render(captchaDiv, renderParams);
        element.setAttribute('data-wid', widgetId);
      }
    },
    setValue
  );
}