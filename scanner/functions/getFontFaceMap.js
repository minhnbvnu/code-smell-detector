function getFontFaceMap(pdf, fontFaces) {
      if (_fontFaceMap === null) {
        var fontMap = pdf.getFontList();

        var convertedFontFaces = convertToFontFaces(fontMap);

        _fontFaceMap = buildFontFaceMap(convertedFontFaces.concat(fontFaces));
      }

      return _fontFaceMap;
    }