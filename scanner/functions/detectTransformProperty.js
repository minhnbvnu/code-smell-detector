function detectTransformProperty() {
            var transformProperty = 'transform',
                safariPropertyHack = 'webkitTransform';
            if (typeof document.body.style[transformProperty] !== 'undefined') {

                ['webkit', 'moz', 'o', 'ms'].every(function (prefix) {
                    var e = '-' + prefix + '-transform';
                    if (typeof document.body.style[e] !== 'undefined') {
                        transformProperty = e;
                        return false;
                    }
                    return true;
                });
            } else if (typeof document.body.style[safariPropertyHack] !== 'undefined') {
                transformProperty = '-webkit-transform';
            } else {
                transformProperty = undefined;
            }
            return transformProperty;
        }