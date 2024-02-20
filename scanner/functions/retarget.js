function retarget(event) {
        Object.defineProperty(event, "target", {
            get: () => { var _b; return (_b = event.composedPath()[0]) !== null && _b !== void 0 ? _b : null; },
            configurable: true,
        });
        return event;
    }