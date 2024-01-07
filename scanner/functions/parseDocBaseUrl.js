function parseDocBaseUrl(url) {
  if (url) {
    const absoluteUrl = (0, _util.createValidAbsoluteUrl)(url);

    if (absoluteUrl) {
      return absoluteUrl.href;
    }

    (0, _util.warn)(`Invalid absolute docBaseUrl: "${url}".`);
  }

  return null;
}