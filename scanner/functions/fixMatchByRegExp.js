function fixMatchByRegExp() {
    var re = /t/g;
    if ("t".match(re) !== null && re.exec("t")) {
      return; // it is not necessary
    }
    var _ie_match = String.prototype.match;
    String.prototype.match = function(searchValue) {
      var result = _ie_match.apply(this, arguments);
      if(searchValue instanceof RegExp && searchValue.global) {
        searchValue.lastIndex = 0;
      }
      return result;
    };
  }