function mapTOC(suite, obj) {
    var ret = obj;
    var key = SUITE_PREFIX + suite.title;

    obj = obj[key] = obj[key] || {suite: suite};
    suite.suites.forEach(function(suite) {
      mapTOC(suite, obj);
    });

    return ret;
  }