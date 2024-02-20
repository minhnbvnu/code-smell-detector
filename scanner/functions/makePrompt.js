function makePrompt(prefix, desc) {
      var raw = '<span style="font-family: monospace; white-space: pre">' +
          (prefix || "") + '<input type="text" autocorrect="off" ' +
          'autocapitalize="off" spellcheck="false"></span>';
      if (desc)
        raw += ' <span style="color: #888">' + desc + '</span>';
      return raw;
    }