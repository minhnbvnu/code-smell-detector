function matchOne(response, reqMethod, reqUrl) {
    var rmeth = response.method;
    var matchMethod = !rmeth || rmeth.toLowerCase() == reqMethod.toLowerCase();
    var url = response.url;
    var matchUrl = !url || url == reqUrl || (typeof url.test == "function" && url.test(reqUrl));

    return matchMethod && matchUrl;
  }