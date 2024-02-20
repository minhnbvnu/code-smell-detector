function fakeOpenDialog(result) {
      return function(text, callback) {
        return callback(result);
      }
    }