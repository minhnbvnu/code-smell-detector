function checkFontsLoaded() {
      for (var i = 0, ii = fonts.length; i < ii; i++) {
        var fontObj = fonts[i];
        if (fontObj.loading) {
          return false;
        }
      }

      PdfJS_window.document.documentElement.removeEventListener(
        'pdfjsFontLoad', checkFontsLoaded, false);

      callback();
      return true;
    }