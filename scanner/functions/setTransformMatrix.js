function setTransformMatrix(el, m) {
    const text = 'matrix(' + (isString(m) ? m : m.join()) + ')';
    if (el.style[TRANSFORM] !== text) {
        el.style[TRANSFORM] = text;
    }
    return this;
}