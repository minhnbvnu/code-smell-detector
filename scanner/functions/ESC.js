function ESC(s) {
      s = s.split("\t").join(Array(options.TabLen || 9).join(" "));
      return pdfEscape(s, flags);
    }