function requestBundles() {
    return Promise.resolve(
      data.map(
        ([lang, ...translations]) => withData(translations)(
          new MockResourceBundle(lang)
        )
      )
    );
  }