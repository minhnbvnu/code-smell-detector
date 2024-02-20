function grabFilename(message) {

    var parseMessage = grunt.log.uncolor(message).match(/^Linting\s(.*)\.\.\.$/);
    if (parseMessage && parseMessage.length === 2) {
      filename = parseMessage[1];
    }
  }