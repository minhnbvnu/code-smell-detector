function removeDomEvent(obj, typeArr, handler) {
    function doRemove(type, callback) {
        //mouse wheel in firefox
        if (type === 'mousewheel' && Browser.gecko) {
            type = 'DOMMouseScroll';
        }
        obj.removeEventListener(type, callback, false);
    }
    if (!obj || !obj.removeEventListener || !typeArr) {
        return this;
    }
    const types = typeArr.split(' ');
    for (let i = types.length - 1; i >= 0; i--) {
        const type = types[i];
        if (!type) {
            continue;
        }
        //remove all the listeners if handler is not given.
        if (!handler && obj['Z__' + type]) {
            const handlers = obj['Z__' + type];
            for (let j = 0, jlen = handlers.length; j < jlen; j++) {
                doRemove(handlers[j].callback);
            }
            delete obj['Z__' + type];
            return this;
        }
        const hit = listensDomEvent(obj, type, handler);
        if (hit < 0) {
            return this;
        }
        const hitHandler = obj['Z__' + type][hit];
        doRemove(type, hitHandler.callback);
        obj['Z__' + type].splice(hit, 1);
    }
    return this;
}