function searchStringAsUrl(url) {

  if (!/^(https?|chrome):\/\/.*/.exec(url)) {
    url = "http://" + url;
  }

  return url;
}