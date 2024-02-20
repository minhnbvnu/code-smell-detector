function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}