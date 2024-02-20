function Params(params) {
  this.first = function(regex, callback, fallback) {
    for (var i = 0; i < params.length; i++) {
      var param = params[i];
      var match = regex.exec(param);
      if (match) {
        params.splice(i--, 1);
        callback(match);
        return true;
      }
    }
    fallback && fallback();
    return false;
  };
  this.last = function(regex, callback, fallback) {
    for (var i = params.length - 1; i >= 0; i--) {
      var param = params[i];
      var match = regex.exec(param);
      if (match) {
        params.splice(i, 1);
        callback(match);
        return true;
      }
    }
    fallback && fallback();
    return false;
  };
}