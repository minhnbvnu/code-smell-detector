function getCachedContext(canvasElement, contextAttributes) {
    var gc = canvasElement.getContext('2d', contextAttributes),
        props = {},
        values = {};

    // Stub out all the prototype members of the canvas 2D graphics context:
    Object.keys(Object.getPrototypeOf(gc)).forEach(makeStub);

    // Some older browsers (e.g., Chrome 40) did not have all members of canvas
    // 2D graphics context in the prototype so we make this additional call:
    Object.keys(gc).forEach(makeStub);

    function makeStub(key) {
        if (
            !(key in props) &&
            !/^(webkit|moz|ms|o)[A-Z]/.test(key) &&
            typeof gc[key] !== 'function'
        ) {
            Object.defineProperty(props, key, {
                get: function() {
                    return (values[key] = values[key] || gc[key]);
                },
                set: function(value) {
                    if (value !== values[key]) {
                        gc[key] = values[key] = value;
                    }
                }
            });
        }
    }

    gc.cache = props;

    gc.cache.save = function() {
        gc.save();
        values = Object.create(values);
    };

    gc.cache.restore = function() {
        gc.restore();
        values = Object.getPrototypeOf(values);
    };

    gc.conditionalsStack = [];

    Object.getOwnPropertyNames(Canvas.graphicsContextAliases).forEach(function(alias) {
        gc[alias] = gc[Canvas.graphicsContextAliases[alias]];
    });

    return Object.assign(gc, require('./graphics'));
}