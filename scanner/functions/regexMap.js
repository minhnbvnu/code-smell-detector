function regexMap(regex, text, callback) {
  while ((result = regex.exec(text)) != null) {
    callback(result);
  }
}