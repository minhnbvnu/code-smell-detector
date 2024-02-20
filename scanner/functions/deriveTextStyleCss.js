function deriveTextStyleCss(frameData) {
  var pgStyles = [];
  var baseStyle = {};
  // override detected settings with these style properties
  var defaultCssStyle = {
    'text-align': 'left',
    'text-transform': 'none',
    'padding-bottom': 0,
    'padding-top': 0,
    'mix-blend-mode': 'normal',
    'font-style': 'normal',
    'height': 'auto',
    'position': 'static' // 'relative' also used (to correct baseline misalignment)
  };
  var defaultAiStyle = {
    opacity: 100 // given as AI style because opacity is converted to several CSS properties
  };
  var currCharStyles;

  forEach(frameData, function(frame) {
    forEach(frame.paragraphs, analyzeParagraphStyle);
  });

  // initialize the base <p> style to be equal to the most common pg style
  if (pgStyles.length > 0) {
    pgStyles.sort(compareCharCount);
    extend(baseStyle, pgStyles[0].cssStyle);
  }
  // override certain base style properties with default values
  extend(baseStyle, defaultCssStyle, convertAiTextStyle(defaultAiStyle));
  return baseStyle;

  function compareCharCount(a, b) {
    return b.count - a.count;
  }
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

  function analyzeTextStyle(aiStyle, text, stylesArr) {
    var cssStyle = convertAiTextStyle(aiStyle);
    var key = getStyleKey(cssStyle);
    var o;
    if (text.length === 0) {
      return {};
    }
    for (var i=0; i<stylesArr.length; i++) {
      if (stylesArr[i].key == key) {
        o = stylesArr[i];
        break;
      }
    }
    if (!o) {
      o = {
        key: key,
        aiStyle: aiStyle,
        cssStyle: cssStyle,
        count: 0
      };
      stylesArr.push(o);
    }
    o.count += text.length;
    // o.count++; // each occurence counts equally
    return cssStyle;
  }
}