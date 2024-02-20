function assertEqual (val, msg) {
        if (msg) flag(this, 'message', msg);
        var obj = flag(this, 'object');
        if (flag(this, 'deep')) {
          return this.eql(val);
        } else {
          this.assert(
              val === obj
            , 'expected #{this} to equal #{exp}'
            , 'expected #{this} to not equal #{exp}'
            , val
            , this._obj
            , true
          );
        }
      }