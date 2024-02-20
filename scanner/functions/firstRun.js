function firstRun(callback) {
        s._driver.start(function(err) {
          if (err) return callback(err);

          // Use setTimeout so that hooks are run before callback is invoked
          setTimeout(callback.bind(null, err), 1000);
        });
      }