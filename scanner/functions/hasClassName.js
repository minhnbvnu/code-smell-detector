function hasClassName(element, className) {
    if (!(element = $(element))) return;

    var elementClassName = element.className;

    if (elementClassName.length === 0) return false;
    if (elementClassName === className) return true;

    return getRegExpForClassName(className).test(elementClassName);
  }