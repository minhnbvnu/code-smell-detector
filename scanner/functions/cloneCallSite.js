function cloneCallSite(frame) {
        var object = {};
        Object.getOwnPropertyNames(Object.getPrototypeOf(frame)).forEach(function (name) {
            object[name] = /^(?:is|get)/.test(name) ? function () { return frame[name].call(frame); } : frame[name];
        });
        object.toString = CallSiteToString;
        return object;
    }