function newTextChunk() {
        var font = textState.font;
        if (!(font.loadedName in textContent.styles)) {
          textContent.styles[font.loadedName] = {
            fontFamily: font.fallbackName,
            ascent: font.ascent,
            descent: font.descent,
            vertical: font.vertical
          };
        }
        return {
          // |str| is initially an array which we push individual chars to, and
          // then runBidi() overwrites it with the final string.
          str: [],
          dir: null,
          width: 0,
          height: 0,
          transform: null,
          fontName: font.loadedName
        };
      }