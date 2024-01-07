function satisfy (matcher, msg) {
      if (msg) flag(this, 'message', msg);
      var obj = flag(this, 'object');
      var result = matcher(obj);
      this.assert(
          result
        , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
        , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
        , flag(this, 'negate') ? false : true
        , result
      );
    }