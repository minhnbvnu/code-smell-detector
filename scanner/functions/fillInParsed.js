function fillInParsed(key, val) {
    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  }