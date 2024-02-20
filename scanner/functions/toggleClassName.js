function toggleClassName(element, className, bool) {
    if (!(element = $(element))) return;

    if (Object.isUndefined(bool))
      bool = !hasClassName(element, className);

    var method = Element[bool ? 'addClassName' : 'removeClassName'];
    return method(element, className);
  }