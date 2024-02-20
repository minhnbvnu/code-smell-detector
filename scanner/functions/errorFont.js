function errorFont() {
        return Promise.resolve(new TranslatedFont('g_font_error',
          new ErrorFont('Font ' + fontName + ' is not available'), font));
      }