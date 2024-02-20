function assertMost (n, msg) {
        if (msg) flag(this, 'message', msg);
        var obj = flag(this, 'object');
        if (flag(this, 'doLength')) {
          new Assertion(obj, msg).to.have.property('length');
          var len = obj.length;
          this.assert(
              len <= n
            , 'expected #{this} to have a length at most #{exp} but got #{act}'
            , 'expected #{this} to not have a length above #{exp}'
            , n
            , len
          );
        } else {
          this.assert(
              obj <= n
            , 'expected #{this} to be at most ' + n
            , 'expected #{this} to be above ' + n
          );
        }
      }