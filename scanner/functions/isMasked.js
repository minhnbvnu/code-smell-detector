function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }