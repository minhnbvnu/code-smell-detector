function consumerUUID() {
    var a = $filter('date')(Date.now(), "yyyy-MM-dd-hh-mm-ss-sss");
    //$cookies.put('uuid', $filter('date')(Date.now(), "yyyy-MM-dd-hh-mm-ss-sss")); //TODO milis, do we need the cookie ?
    return a;
  }