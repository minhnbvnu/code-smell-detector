function parseText(text) {
    if (!cache) {
      compileRegex();
    }
    var hit = cache.get(text);
    if (hit) {
      return hit;
    }
    if (!tagRE.test(text)) {
      return null;
    }
    var tokens = [];
    var lastIndex = tagRE.lastIndex = 0;
    var match, index, html, value, first, oneTime;
    /* eslint-disable no-cond-assign */
    while (match = tagRE.exec(text)) {
      /* eslint-enable no-cond-assign */
      index = match.index;
      // push text token
      if (index > lastIndex) {
        tokens.push({
          value: text.slice(lastIndex, index)
        });
      }
      // tag token
      html = htmlRE.test(match[0]);
      value = html ? match[1] : match[2];
      first = value.charCodeAt(0);
      oneTime = first === 42; // *
      value = oneTime ? value.slice(1) : value;
      tokens.push({
        tag: true,
        value: value.trim(),
        html: html,
        oneTime: oneTime
      });
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      tokens.push({
        value: text.slice(lastIndex)
      });
    }
    cache.put(text, tokens);
    return tokens;
  }