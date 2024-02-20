function algoliasearch(applicationID, apiKey, opts) {
    var cloneDeep = __webpack_require__(27);

    var getDocumentProtocol = __webpack_require__(302);

    opts = cloneDeep(opts || {});

    if (opts.protocol === undefined) {
      opts.protocol = getDocumentProtocol();
    }

    opts._ua = opts._ua || algoliasearch.ua;

    return new AlgoliaSearchBrowser(applicationID, apiKey, opts);
  }