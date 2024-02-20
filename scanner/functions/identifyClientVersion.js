function identifyClientVersion(client = {}) {
  if (
    client instanceof DocumentClientV3Wrapper ||
    client instanceof DocumentClientV2Wrapper
  ) {
    return DocumentClientVersions.electro;
  }
  for (const [version, methods] of Object.entries(supportedClientVersions)) {
    const hasMethods = methods.every((method) => {
      return method in client && isFunction(client[method]);
    });
    if (hasMethods) {
      return version;
    }
  }
}