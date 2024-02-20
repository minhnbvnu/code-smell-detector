function isFacebookURL (url) {
  const parsedUrl = new URL(url);
  for (let facebookHostRE of facebookHostREs) {
    if (facebookHostRE.test(parsedUrl.host)) {
      return true;
    }
  }
  return false;
}