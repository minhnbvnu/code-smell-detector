function runBidi(textChunk) {
        var str = textChunk.str.join('');
        var bidiResult = PDFJS.bidi(str, -1, textState.font.vertical);
        textChunk.str = bidiResult.str;
        textChunk.dir = bidiResult.dir;
        return textChunk;
      }