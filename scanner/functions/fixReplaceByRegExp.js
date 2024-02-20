function fixReplaceByRegExp() {
    var re = /t/g;
    if ("t".replace(re,"") !== null && re.exec("t")) {
      return; // it is not necessary
    }
    var _ie_replace = String.prototype.replace;
    String.prototype.replace = function(searchValue, repaceValue) {
      var result = _ie_replace.apply(this, arguments);
      if (searchValue instanceof RegExp && searchValue.global) {
        searchValue.lastIndex = 0;
      }
      return result;
    };
  }