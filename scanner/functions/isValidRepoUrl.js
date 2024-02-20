function isValidRepoUrl(url) {
  url = url.toLowerCase().trim();
  url = url.substring(0, 1) === "/" ? url.substring(1) : url;

  const isRelativeUrl = !(url.substring(0,7) === 'http://' || url.substring(0,8) === 'https://' || url.substring(0,4) === 'www.');
  if (isRelativeUrl) {
    return relativeUrlValidator(url);
  }

  return absoluteUrlValidator(url);

}