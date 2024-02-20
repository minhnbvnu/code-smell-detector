function listenTransition(target, duration, callbackFn) {
        var me = this,
            clear = function() {
                if (target.transitionTimer) clearTimeout(target.transitionTimer);
                target.transitionTimer = null;
                target.removeEventListener(vendor.transitionEndEvent, handler, false);
            },
            handler = function() {
                clear();
                if (callbackFn) callbackFn.call(me);
            };
        clear();
        target.addEventListener(vendor.transitionEndEvent, handler, false);
        target.transitionTimer = setTimeout(handler, duration + 50);
    }