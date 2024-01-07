function handleSetFont(fontName, fontRef) {
      return self.loadFont(fontName, fontRef, resources).then(function (translated) {
        textState.font = translated.font;
        textState.fontMatrix = translated.font.fontMatrix || _util.FONT_IDENTITY_MATRIX;
      });
    }