function getURL() {
        var url = path.indexOf('//') >= 0 ? path : API_URL + path;
        return url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
      }