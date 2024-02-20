function functionStub() {
        var args = slice(arguments);
        var matchings = proxy.matchingFakes(args);

        var fnStub =
            pop(
                sort(matchings, function(a, b) {
                    return a.matchingArguments.length - b.matchingArguments.length;
                })
            ) || proxy;
        return getCurrentBehavior(fnStub).invoke(this, arguments);
    }