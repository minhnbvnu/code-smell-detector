function assertLength (n, msg) {
        if (msg) flag(this, 'message', msg);
        var obj = flag(this, 'object');
        new Assertion(obj, msg).to.have.property('length');
        var len = obj.length;

        this.assert(
            len == n
          , 'expected #{this} to have a length of #{exp} but got #{act}'
          , 'expected #{this} to not have a length of #{act}'
          , n
          , len
        );
      }