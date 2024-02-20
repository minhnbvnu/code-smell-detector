function withTimeout() {
        return driver
          .getFindTimeout()
          .then(function(existingTimeout) {
            return driver
              // set find timeout
              .setFindTimeout(timeout)
              .then(test)
              // restore timeout
              .setFindTimeout(existingTimeout);
          });
      }