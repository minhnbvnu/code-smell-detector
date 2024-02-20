function parseJSON(string, filePath) {
  let data;
  try {
    data = JSON.parse(string);
  } catch (e) {
    try {
      jsonlintParse(string);
    } catch (egood) {
      // Ugly hack to get the line number out of the jsonlint error
      const lineRegex = /line ([0-9]+)/g;
      const results = lineRegex.exec(egood.message);
      let line = 0;
      if (results !== null) {
        line = parseInt(results[1], 10);
      }

      // Return the best error we can
      throw new ParseError(`${filePath}:${line}: ${egood}`);
    }
  }
  return data;
}