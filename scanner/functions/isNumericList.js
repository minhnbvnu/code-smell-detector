function isNumericList(text) {
      var found;
      var patterns = [
        /^[IVXLMCD]{1,2}\.[ \u00a0]/,
        /^[ivxlmcd]{1,2}\.[ \u00a0]/,
        /^[a-z]{1,2}[\.\)][ \u00a0]/,
        /^[A-Z]{1,2}[\.\)][ \u00a0]/,
        /^[0-9]+\.[ \u00a0]/,
        /^[\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]+\.[ \u00a0]/,
        /^[\u58f1\u5f10\u53c2\u56db\u4f0d\u516d\u4e03\u516b\u4e5d\u62fe]+\.[ \u00a0]/
      ];
      text = text.replace(/^[\u00a0 ]+/, '');
      global$4.each(patterns, function (pattern) {
        if (pattern.test(text)) {
          found = true;
          return false;
        }
      });
      return found;
    }