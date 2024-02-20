function isIllegal(lexem, mode) {
      return !ignore_illegals && mode.illegal && mode.illegalRe.test(lexem);
    }