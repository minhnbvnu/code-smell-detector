function renderPasswordless(auth0Client, element, options, callback) {
  options = object.merge(defaults).with(options || {});
  function load(done) {
    done = done || noop;
    auth0Client.passwordless.getChallenge(function (err, challenge) {
      if (err) {
        element.innerHTML = options.templates.error(err);
        return done(err);
      }
      if (!challenge.required) {
        element.style.display = 'none';
        element.innerHTML = '';
        return;
      }
      element.style.display = '';
      if (challenge.provider === AUTH0_PROVIDER) {
        handleAuth0Provider(element, options, challenge, load);
      } else if (
        challenge.provider === RECAPTCHA_V2_PROVIDER ||
        challenge.provider === RECAPTCHA_ENTERPRISE_PROVIDER ||
        challenge.provider === HCAPTCHA_PROVIDER ||
        challenge.provider === FRIENDLY_CAPTCHA_PROVIDER ||
        challenge.provider === ARKOSE_PROVIDER ||
        challenge.provider === AUTH0_V2_CAPTCHA_PROVIDER
      ) {
        handleCaptchaProvider(element, options, challenge);
      }
      if (challenge.provider === ARKOSE_PROVIDER) {
        done(null, {
          triggerCaptcha: function (solvedCallback) {
            globalForCaptchaProvider(challenge.provider).run();
            captchaSolved = solvedCallback;
          }
        });
      } else {
        done();
      }
    });
  }

  function getValue() {
    var captchaInput = element.querySelector('input[name="captcha"]');
    if (!captchaInput) {
      return;
    }
    return captchaInput.value;
  }

  load(callback);

  return {
    reload: load,
    getValue: getValue
  };
}