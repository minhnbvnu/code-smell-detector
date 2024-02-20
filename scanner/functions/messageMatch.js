function messageMatch(message) {
        if (typeof expected == 'string') {
          return expected == message;
        } else {
          return expected.test(message);
        }
      }