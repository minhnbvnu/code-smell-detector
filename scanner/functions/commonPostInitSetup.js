function commonPostInitSetup(args, spy) {
        var object = args[0];
        var property = args[1];

        var isSpyingOnEntireObject = typeof property === "undefined" && typeof object === "object";

        if (isSpyingOnEntireObject) {
            var ownMethods = collectOwnMethods(spy);

            forEach(ownMethods, function(method) {
                push(collection, method);
            });

            usePromiseLibrary(promiseLib, ownMethods);
        } else {
            push(collection, spy);
            usePromiseLibrary(promiseLib, spy);
        }

        return spy;
    }