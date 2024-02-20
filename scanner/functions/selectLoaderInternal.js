function selectLoaderInternal(data, loaders, options, context) {
    const { url, type } = getResourceUrlAndType(data);
    const testUrl = url || context?.url;
    let loader = null;
    let reason = "";
    if (options?.mimeType) {
      loader = findLoaderByMIMEType(loaders, options?.mimeType);
      reason = `match forced by supplied MIME type ${options?.mimeType}`;
    }
    loader = loader || findLoaderByUrl(loaders, testUrl);
    reason = reason || (loader ? `matched url ${testUrl}` : "");
    loader = loader || findLoaderByMIMEType(loaders, type);
    reason = reason || (loader ? `matched MIME type ${type}` : "");
    loader = loader || findLoaderByInitialBytes(loaders, data);
    reason = reason || (loader ? `matched initial data ${getFirstCharacters2(data)}` : "");
    loader = loader || findLoaderByMIMEType(loaders, options?.fallbackMimeType);
    reason = reason || (loader ? `matched fallback MIME type ${type}` : "");
    if (reason) {
      log.log(1, `selectLoader selected ${loader?.name}: ${reason}.`);
    }
    return loader;
  }