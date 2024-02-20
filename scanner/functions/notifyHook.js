function notifyHook(e) {

    message_count++;

    var message;

    if (!options.enabled) {
      return;
    }

    if (!e) {
      return;
    }

    if (e && e.length === 1) {
      e = e[0];
    }

    if (/Task .* failed\./.test(e.message)) {
      message = e.message;
    } else if (e.message && e.stack) {
      message = exception(e);
    } else {
      message = e + '';
    }

    if (message_count > 0 && message === 'Aborted due to warnings.') {
      // skip unhelpful message because there was probably another one that was more helpful
      return;
    }

    // shorten message by removing full path
    // TODO - make a global replace
    message = message.replace(cwd, '').replace('\x07', '');

    return notify({
      title: options.title + (grunt.task.current.nameArgs ? ' ' + grunt.task.current.nameArgs : ''),
      message: message,
      duration: options.duration
    });
  }