function maybeIterator(fn, output) {
    if (!fn.generator) return output;

    if (!fn.computeRet) {
      // Reuse iterator objects for non-computed return types
      if (fn.generator === true) fn.generator = generatorResult(fn.yieldval, output, fn.async);
      return fn.generator;
    }

    return generatorResult(fn.yieldval, output, fn.async);
  }