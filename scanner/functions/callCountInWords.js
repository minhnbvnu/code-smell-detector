function callCountInWords(callCount) {
      if (callCount == 0) {
        return "never called";
      } else {
        return "called " + times(callCount);
      }
    }