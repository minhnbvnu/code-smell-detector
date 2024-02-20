function grabErrors(message) {
    if (!options.enabled) {
      return;
    }

    if (!message) {
      return;
    }

    var parseMessage = grunt.log.uncolor(message).match(/^\[L([0-9]*).*[0-9]:\s(.*)$/);

    if (parseMessage && parseMessage.length === 3) {

      count++;
      //grunt.log.ok('graberrors ' + count + parseMessage);

      if (count > options.max_jshint_notifications) {
        disable();
        return;
      }

      lineNumber = parseMessage[1];
      reason = parseMessage[2];

      return;
    }

    if (lineNumber && reason) {
      notify({
          title: options.title + (grunt.task.current.nameArgs ? ' ' + grunt.task.current.nameArgs : ''),
          message: [
            filename,
            'Line ' + lineNumber + ': ' + reason,
            message.trim()
          ].join('\n')
        });

      lineNumber = false;
      reason = false;
    }
  }