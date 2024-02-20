function getProtocol(path) {
  return url.parse(path).protocol === "http:" ? http : https;
}