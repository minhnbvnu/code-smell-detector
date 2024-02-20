function toIndex(input) {
      const index = answers.indexOf(input);

      if (index >= 0) {
        return index;
      } else {
        return +input;
      }
    }