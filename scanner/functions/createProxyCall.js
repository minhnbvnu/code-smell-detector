function createProxyCall(proxy, thisValue, args, returnValue, exception, id, errorWithCallStack) {
    if (typeof id !== "number") {
        throw new TypeError("Call id is not a number");
    }

    var firstArg, lastArg;

    if (args.length > 0) {
        firstArg = args[0];
        lastArg = args[args.length - 1];
    }

    var proxyCall = Object.create(callProto);
    var callback = lastArg && typeof lastArg === "function" ? lastArg : undefined;

    proxyCall.proxy = proxy;
    proxyCall.thisValue = thisValue;
    proxyCall.args = args;
    proxyCall.firstArg = firstArg;
    proxyCall.lastArg = lastArg;
    proxyCall.callback = callback;
    proxyCall.returnValue = returnValue;
    proxyCall.exception = exception;
    proxyCall.callId = id;
    proxyCall.errorWithCallStack = errorWithCallStack;

    return proxyCall;
}