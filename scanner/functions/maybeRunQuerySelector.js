function maybeRunQuerySelector(el) {
    return typeof el === 'string' ? document.querySelectorAll(el) : el
}