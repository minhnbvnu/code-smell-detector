function callbackWrapper() {
          disconnect();
          callback();
          connect();
        }