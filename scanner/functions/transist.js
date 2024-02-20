function transist(val, state) {
      that.v = val;
      that.s = state;

      // console.log('state', state);
      /** @type {Callbacks} */
      that.c[state].forEach(function (func) {
        func(val);
      });
      // Release memory, but if no handlers have been added, as we
      //   assume that we will resolve/reject (truly) synchronously
      //   and thus we avoid flagging checks about whether we've
      //   already resolved/rejected.
      if ( /** @type {Callbacks} */that.c[state].length) {
        that.c = null;
      }
    }