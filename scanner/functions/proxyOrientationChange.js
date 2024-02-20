function proxyOrientationChange(fn, scope) {
        return function(e) {
            var args = slice.call(arguments, 0);
            var wasPortrait = isPortrait();
            if (fn.lastOrientation !== wasPortrait) {
                fn.lastOrientation = wasPortrait;
                fn.apply(scope || window, args);
            }
        };
    }