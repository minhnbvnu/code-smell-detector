function partiallyUpdate(el, newOptions) {
    elementOptions.set(el, { ...get(el), ...newOptions });
  }