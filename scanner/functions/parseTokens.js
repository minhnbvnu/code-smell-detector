function parseTokens(strs) {
    var tokens = [], plain = "";
    for (var i = 0; i < strs.length; ++i) {
      if (i) plain += "\n";
      var str = strs[i], pos = 0;
      while (pos < str.length) {
        var style = null, text;
        if (str.charAt(pos) == "[" && str.charAt(pos+1) != "[") {
          styleName.lastIndex = pos + 1;
          var m = styleName.exec(str);
          style = m[0].replace(/&/g, " ");
          var textStart = pos + style.length + 2;
          var end = findSingle(str, textStart, "]");
          if (end == null) throw new Error("Unterminated token at " + pos + " in '" + str + "'" + style);
          text = str.slice(textStart, end);
          pos = end + 1;
        } else {
          var end = findSingle(str, pos, "[");
          if (end == null) end = str.length;
          text = str.slice(pos, end);
          pos = end;
        }
        text = text.replace(/\[\[|\]\]/g, function(s) {return s.charAt(0);});
        tokens.push({style: style, text: text});
        plain += text;
      }
    }
    return {tokens: tokens, plain: plain};
  }