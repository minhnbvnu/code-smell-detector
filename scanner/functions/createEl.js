function createEl(tagName, className) {
    const el = document.createElement(tagName);
    if (className) {
        setClass(el, className);
    }
    return el;
}