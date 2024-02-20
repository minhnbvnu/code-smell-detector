function addStyleFromTagName(styleSet, tagName, elementStyles, element) {
  switch (tagName) {
    case 'b':
    case 'strong':
      {
        return styleSet.add(_main.INLINE_STYLE.BOLD);
      }
    case 'i':
    case 'em':
      {
        return styleSet.add(_main.INLINE_STYLE.ITALIC);
      }
    case 'ins':
      {
        return styleSet.add(_main.INLINE_STYLE.UNDERLINE);
      }
    case 'code':
      {
        return styleSet.add(_main.INLINE_STYLE.CODE);
      }
    case 'del':
      {
        return styleSet.add(_main.INLINE_STYLE.STRIKETHROUGH);
      }
    case 'span':
      {
        var savedColor = element.style.color;
        if (savedColor.lastIndexOf("rgb") > -1) {
          savedColor = savedColor.substring(savedColor.lastIndexOf("(") + 1, savedColor.length - 1);
          savedColor = savedColor.split(",");
        }
        var savedHex = rgbToHex(parseInt(savedColor[0]), parseInt(savedColor[1]), parseInt(savedColor[2]));
        var savedKey = "";
        Object.keys(_colorConfig.colorStyleMap).map(function (key) {
          if (_colorConfig.colorStyleMap[key].color.toLowerCase() == savedHex.toLowerCase()) {
            savedKey = key;
          }
        });
        return styleSet.add(savedKey);
      }
    default:
      {
        if (elementStyles && elementStyles[tagName]) {
          return styleSet.add(elementStyles[tagName]);
        }

        return styleSet;
      }
  }
}