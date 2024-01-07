function runBidiTransform(textChunk) {
      var str = textChunk.str.join("");
      var bidiResult = (0, _bidi.bidi)(str, -1, textChunk.vertical);
      return {
        str: normalizeWhitespace ? replaceWhitespace(bidiResult.str) : bidiResult.str,
        dir: bidiResult.dir,
        width: textChunk.width,
        height: textChunk.height,
        transform: textChunk.transform,
        fontName: textChunk.fontName
      };
    }