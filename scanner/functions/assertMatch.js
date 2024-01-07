function assertMatch(re, msg) {
      if (msg) flag(this, 'message', msg);
      var obj = flag(this, 'object');
      this.assert(
          re.exec(obj)
        , 'expected #{this} to match ' + re
        , 'expected #{this} not to match ' + re
      );
    }