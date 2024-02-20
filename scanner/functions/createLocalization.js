function createLocalization(data) {
  function requestBundles() {
    return Promise.resolve(
      data.map(
        ([lang, ...translations]) => withData(translations)(
          new MockResourceBundle(lang)
        )
      )
    );
  }

  function createContext(lang) {
    return new L20n.MessageContext(lang, { useIsolating: false });
  }

  return new L20n.Localization(requestBundles, createContext);
}