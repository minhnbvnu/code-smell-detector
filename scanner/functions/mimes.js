function mimes(ms, mode) {
    for (var i = 0; i < ms.length; ++i) CodeMirror.defineMIME(ms[i], mode);
  }