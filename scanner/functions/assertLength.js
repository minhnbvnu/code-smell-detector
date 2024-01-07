function assertLength (n, msg) {
      if (msg) flag(this, 'message', msg);
      var obj = flag(this, 'object')
        , flagMsg = flag(this, 'message')
        , ssfi = flag(this, 'ssfi');
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
      var len = obj.length;

      this.assert(
          len == n
        , 'expected #{this} to have a length of #{exp} but got #{act}'
        , 'expected #{this} to not have a length of #{act}'
        , n
        , len
      );
    }