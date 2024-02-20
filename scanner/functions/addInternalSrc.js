function addInternalSrc(elem, src) {
    var i;
    i = {
      id: "(internal)",
      elem: elem,
      value: src
    };
    JSHINT.internals.push(i);
    return i;
  }