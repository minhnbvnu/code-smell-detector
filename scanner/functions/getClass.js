function getClass(el) {
    return isNil(el.className.baseVal) ? el.className : el.className.baseVal;
}