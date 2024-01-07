function hasClass(el, name) {
    if (el.classList !== undefined) {
        return el.classList.contains(name);
    }
    const className = getClass(el);
    return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
}