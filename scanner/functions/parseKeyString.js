function parseKeyString(str) {
      var key, match;
      var keys = [];
      while (str) {
        match = (/<\w+-.+?>|<\w+>|./).exec(str);
        if (match === null)break;
        key = match[0];
        str = str.substring(match.index + key.length);
        keys.push(key);
      }
      return keys;
    }