function cloneAndAnnotateFn(fn, annotation) {
      return extend(function() { return fn.apply(null, arguments); }, fn, annotation);
    }