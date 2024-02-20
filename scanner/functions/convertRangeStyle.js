function convertRangeStyle(range) {
    range.cssStyle = analyzeTextStyle(range.aiStyle, range.text, currCharStyles);
    if (range.warning) {
      warn(range.warning.replace('%s', truncateString(range.text, 35)));
    }
    if (range.aiStyle.aifont && !range.cssStyle['font-family']) {
      warnOnce('Missing a rule for converting font: ' + range.aiStyle.aifont +
        '. Sample text: ' + truncateString(range.text, 35), range.aiStyle.aifont);
    }
  }