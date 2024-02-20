function _buildChars(opts) {
      var chars2 = "";
      if (opts.numeric) {
        chars2 += numbers;
      }
      if (opts.letters) {
        chars2 += letters;
      }
      if (opts.special) {
        chars2 += specials;
      }
      for (var i = 0; i <= opts.exclude.length; i++) {
        chars2 = chars2.replace(opts.exclude[i], "");
      }
      return chars2;
    }