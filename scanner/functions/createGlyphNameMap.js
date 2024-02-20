function createGlyphNameMap(glyphs, ids, properties) {
        var glyphNames = properties.glyphNames;
        if (!glyphNames) {
          properties.glyphNameMap = {};
          return;
        }
        var glyphsLength = glyphs.length;
        var glyphNameMap = {};
        var encoding = [];
        for (var i = 0; i < glyphsLength; ++i) {
          var glyphName = glyphNames[ids[i]];
          if (!glyphName)
            continue;
          var unicode = glyphs[i].unicode;
          glyphNameMap[glyphName] = unicode;
          var code = glyphs[i].code;
          encoding[code] = glyphName;
        }
        properties.glyphNameMap = glyphNameMap;
        if (!properties.hasEncoding)
          properties.baseEncoding = encoding;
      }