function run_and_wait_msg(bus, filter, block = null) {
    return async(function* () {
      if (_.isFunction(filter)) {
        [filter, block] = [null, filter];
      }
      var wait = defer((resolve) => {
        bus.on('sending', (msg) => {
          msg = JSON.parse(msg);
          if (_.isEmpty(filter)) {
            return resolve(msg);
          } else if (msg.op === filter) {
            return resolve(msg);
          }
        });
      });

      yield block();

      return wait;
    });
  }