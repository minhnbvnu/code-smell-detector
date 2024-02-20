function l10nStartup() {
    gReadyState = 'interactive';

    // most browsers expose the UI language as `navigator.language'
    // but IE uses `navigator.userLanguage' instead
    var userLocale = navigator.language || navigator.userLanguage;
    consoleLog('loading [' + userLocale + '] resources, ' +
        (gAsyncResourceLoading ? 'asynchronously.' : 'synchronously.'));

    // load the default locale and translate the document if required
    if (document.documentElement.lang === userLocale) {
      loadLocale(userLocale);
    } else {
      loadLocale(userLocale, translateFragment);
    }
  }