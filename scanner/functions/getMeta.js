function getMeta(head) {
  let availableLangs = [];
  let defaultLang = null;
  let appVersion = null;

  // XXX take last found instead of first?
  const metas = Array.from(head.querySelectorAll(
    'meta[name="availableLanguages"],' +
    'meta[name="defaultLanguage"],' +
    'meta[name="appVersion"]')
  );
  for (const meta of metas) {
    const name = meta.getAttribute('name');
    const content = meta.getAttribute('content').trim();
    switch (name) {
      case 'availableLanguages':
        availableLangs = content.split(',').map(lang => lang.trim());
        break;
      case 'defaultLanguage':
        defaultLang = content;
        break;
      case 'appVersion':
        appVersion = content;
    }
  }

  return {
    defaultLang,
    availableLangs,
    appVersion
  };
}