function getRootNode(el) {
    if (!el) return el;
    return typeof el === 'object' ?
            el:
            (getArgtype(el) === 'string' ?
            document.querySelector(el):
            null);
  }