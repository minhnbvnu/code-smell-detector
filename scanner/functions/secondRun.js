function secondRun(callback) {
        debug('second run');
        commit = {hash: 'hash2', dir: 'dir2'};

        // remove old container so new one is created
        s._driver._containers = {};

        s._driver.start(function(err) {
          // Use setTimeout so that hooks are run before callback is invoked
          setTimeout(callback.bind(null, err), 1000);
        });
      }