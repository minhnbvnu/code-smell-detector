function setTimeoutCallback(index) {
      // Add cursor `|` after current substring unless we are showing last
      // character of the string.
      self.el.setAttribute(
        'placeholder',
        str.substr(0, index + 1) +
          (index === str.length - 1 || !self.options.showCursor
            ? ''
            : self.options.cursor)
      );
      // Call the completion callback when last character is being printed
      if (index === str.length - 1) {
        callback();
      }
    }