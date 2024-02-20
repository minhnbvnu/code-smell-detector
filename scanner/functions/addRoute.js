function addRoute(routeArray, path, handler) {
    var len = 0;
    for (var i=0, l=routeArray.length; i<l; i++) {
      len += routeArray[i].path.length;
    }

    path = path.substr(len);
    var route = { path: path, handler: handler };
    routeArray.push(route);
  }