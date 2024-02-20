function SyncPromise(fn) {
    var that = this;
    // Value, this will be set to either a resolved value or rejected reason
    that.v = 0;
    // State of the promise
    that.s = PENDING;
    // Callbacks c[0] is fulfillment and c[1] contains rejection callbacks
    /** @type {Callbacks|null} */
    that.c = [[], []];
    /**
     *
     * @param {ArbitraryValue} val
     * @param {0|1} state
     * @returns {void}
     */
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

    /** @type {Resolve} */
    function resolve(val) {
      if (!that.c) ; else if (isPromise(val)) {
        addReject(val.then(resolve), reject);
      } else {
        transist(val, FULFILLED);
      }
    }

    /** @type {Reject} */
    function reject(reason) {
      if (!that.c) ; else if (isPromise(reason)) {
        addReject(reason.then(reject), reject);
      } else {
        transist(reason, REJECTED);
      }
    }
    try {
      fn(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }