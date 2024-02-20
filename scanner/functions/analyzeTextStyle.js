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