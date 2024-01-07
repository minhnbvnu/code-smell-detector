function addDomEvent(obj, typeArr, handler, context) {
    if (!obj || !obj.addEventListener || !typeArr || !handler) {
        return this;
    }
    const eventHandler = function (e) {
        if (!e) {
            e = window.event;
        }
        handler.call(context || obj, e);
        return;
    };
    const types = typeArr.split(' ');
    for (let i = types.length - 1; i >= 0; i--) {
        const type = types[i];
        if (!type) {
            continue;
        }

        if (!obj['Z__' + type]) {
            obj['Z__' + type] = [];

        }
        const hit = listensDomEvent(obj, type, handler);
        if (hit >= 0) {
            console.warn(obj, `find '${type}' handler:`, handler, ' The old listener function will be removed');
            removeDomEvent(obj, type, handler);
        }
        obj['Z__' + type].push({
            callback: eventHandler,
            src: handler
        });
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
        obj.addEventListener(type, eventHandler, Browser.supportsPassive ? { capture: false, passive: false } : false);
    }
    return this;
}