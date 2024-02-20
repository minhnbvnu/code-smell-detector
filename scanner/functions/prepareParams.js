function prepareParams(params, options) {
  // NOTE: first priority to options in URL, second to options and lastly fallback to defaultOptions
  let translations;

  if (params.translations && params.translations.length) {
    translations = typeof params.translations === 'string'
      ? params.translations.split(',')
      : params.translations;
  } else {
    translations = options.translations || defaultOptions.translations;
  }

  return { translations };
}