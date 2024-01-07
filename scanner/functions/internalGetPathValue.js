function internalGetPathValue(obj, parsed, pathDepth) {
    var temporaryValue = obj;
    var res = null;
    pathDepth = (typeof pathDepth === 'undefined' ? parsed.length : pathDepth);

    for (var i = 0; i < pathDepth; i++) {
      var part = parsed[i];
      if (temporaryValue) {
        if (typeof part.p === 'undefined') {
          temporaryValue = temporaryValue[part.i];
        } else {
          temporaryValue = temporaryValue[part.p];
        }

        if (i === (pathDepth - 1)) {
          res = temporaryValue;
        }
      }
    }

    return res;
  }