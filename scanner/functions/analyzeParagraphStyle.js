function analyzeParagraphStyle(pdata) {
    currCharStyles = [];
    forEach(pdata.ranges, convertRangeStyle);
    if (currCharStyles.length > 0) {
      // add most common char style to the pg style, to avoid applying
      // <span> tags to all the text in the paragraph
      currCharStyles.sort(compareCharCount);
      extend(pdata.aiStyle, currCharStyles[0].aiStyle);
    }
    pdata.cssStyle = analyzeTextStyle(pdata.aiStyle, pdata.text, pgStyles);
    if (pdata.aiStyle.blendMode && !pdata.cssStyle['mix-blend-mode']) {
      warnOnce('Missing a rule for converting ' + pdata.aiStyle.blendMode + ' to CSS.');
    }
  }