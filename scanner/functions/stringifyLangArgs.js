function stringifyLangArgs(args) {
  return args.map(function (val) {
    if (val != null && val.inspect) {
      return val.inspect();
    } else {
      try {
        const str = JSON.stringify(val) || val + '';
        // should match all literal line breaks and
        // "u001b" that follow an odd number of backslashes and convert them to ESC
        // we do this because the JSON.stringify process has escaped these characters
        return str.replace(/((?:^|[^\\])(?:\\{2})*)\\u001[bB]/g, '$1\u001b').replace(/[\\]r[\\]n|([\\])?[\\]n/g, (match, precededBacklash) => {
          // precededBacklash not null when "\n" is preceded by a backlash ("\\n")
          // match will be "\\n" and we don't replace it with os.EOL
          return precededBacklash ? match : (_os || _load_os()).default.EOL;
        });
      } catch (e) {
        return util.inspect(val);
      }
    }
  });
}