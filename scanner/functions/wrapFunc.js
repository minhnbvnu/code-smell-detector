function wrapFunc(f) {
    var proxy;
    var fakeInstance = function() {
        var firstArg, lastArg;

        if (arguments.length > 0) {
            firstArg = arguments[0];
            lastArg = arguments[arguments.length - 1];
        }

        var callback = lastArg && typeof lastArg === "function" ? lastArg : undefined;

        proxy.firstArg = firstArg;
        proxy.lastArg = lastArg;
        proxy.callback = callback;

        return f && f.apply(this, arguments);
    };
    proxy = createProxy(fakeInstance, f || fakeInstance);

    proxy.displayName = "fake";
    proxy.id = "fake#" + uuid++;

    return proxy;
}