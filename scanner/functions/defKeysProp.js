function defKeysProp(event, propName, object) {
    var canvas = this;
    Object.defineProperty(object, propName, {
        configurable: true,
        ennumerable: true,
        get: function() {
            var shiftKey;
            if ('shiftKey' in event) {
                fixCurrentKeys.call(canvas, 'SHIFT', shiftKey = event.shiftKey);
            } else {
                shiftKey = canvas.currentKeys.indexOf('SHIFT') >= 0;
            }
            var SHIFT = shiftKey ? 'SHIFT' : '';
            if ('ctrlKey' in event) {
                fixCurrentKeys.call(canvas, 'CTRL' + SHIFT, event.ctrlKey);
            }
            if ('altKey' in event) {
                fixCurrentKeys.call(canvas, 'ALT' + SHIFT, event.altKey);
            }
            return canvas.currentKeys.slice();
        }
    });
    return object;
}