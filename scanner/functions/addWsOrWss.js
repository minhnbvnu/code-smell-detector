function addWsOrWss(url) {
    if ((!/^wss?:\/\//i.test(url)) && (url != "")) {
      url = "ws://" + url;
    }
    return url;
  }