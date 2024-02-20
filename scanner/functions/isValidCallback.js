function isValidCallback(callback) {
        return callback instanceof Function || typeof callback === "string";
      }