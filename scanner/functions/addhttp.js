function addhttp(url) {
    if ((!/^(f|ht)tps?:\/\//i.test(url)) && (url != "")) {
      url = "http://" + url;
    }
    return url;
  }