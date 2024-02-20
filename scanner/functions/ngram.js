function ngram(str) {
    str = _.toStr(str);

    var tokens = [],
        word = '';

    _.each(str.split(''), function(char) {
      if (char.match(/\s+/)) {
        word = '';
      } else {
        tokens.push(word+char);
        word += char;
      }
    });

    return tokens;
  }