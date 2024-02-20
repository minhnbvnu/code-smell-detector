function hasCookieType(topicName) {
    var a = $cookies.getAll();
    return a[topicName] ? true : false;
  }