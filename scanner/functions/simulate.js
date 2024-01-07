function simulate(element, eventName) {
    var defaults = extend({}, defaultOptions);
    var options = extend(defaults, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType) {
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');
    }

    if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents') {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else if (eventType === 'MouseEvents') {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView, options.detail, options.pointerX, options.pointerY, options.pointerX, options.pointerY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        } else if (eventType === 'KeyboardEvent') {
            defaults = extend({}, defaultKeyboardOptions);
            options = extend(defaults, arguments[2] || {});
            if (oEvent.initKeyEvent) {
                oEvent.initKeyEvent(eventName, options.bubbles, options.cancelable, document.defaultView, options.ctrl, options.shift, options.alt, options.meta, options.keyCode, options.charCode);
            } else {
                oEvent = document.createEvent("Events");
                // initKeyboardEvent doesn't work property in Chrome, fudge it using plain event
                oEvent.initEvent(eventName, options.bubbles, options.cancelable);
                oEvent.keyCode = options.keyCode;
                oEvent.which = options.keyCode;
            }
        }

        element.dispatchEvent(oEvent);
    } else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}