function addClass(el, name) {
    if (el.classList !== undefined && !hasClass(el, name)) {
        const classes = splitWords(name);
        for (let i = 0, len = classes.length; i < len; i++) {
            el.classList.add(classes[i]);
        }
    } else {
        const className = getClass(el);
        setClass(el, (className ? className + ' ' : '') + name);
    }
    return this;
}