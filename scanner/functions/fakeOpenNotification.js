function fakeOpenNotification(matcher) {
      return function(text) {
        matcher(text);
      }
    }