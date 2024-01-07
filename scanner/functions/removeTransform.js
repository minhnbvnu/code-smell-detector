function removeTransform(el) {
    if (el.style[TRANSFORM]) {
        el.style[TRANSFORM] = '';
    }
    return this;
}