function checkWrappedMethod(wrappedMethod) {
        var error;

        if (!isFunction(wrappedMethod)) {
            error = new TypeError(
                "Attempted to wrap " + typeof wrappedMethod + " property " + valueToString(property) + " as function"
            );
        } else if (wrappedMethod.restore && wrappedMethod.restore.sinon) {
            error = new TypeError("Attempted to wrap " + valueToString(property) + " which is already wrapped");
        } else if (wrappedMethod.calledBefore) {
            var verb = wrappedMethod.returns ? "stubbed" : "spied on";
            error = new TypeError("Attempted to wrap " + valueToString(property) + " which is already " + verb);
        }

        if (error) {
            if (wrappedMethod && wrappedMethod.stackTraceError) {
                error.stack += "\n--------------\n" + wrappedMethod.stackTraceError.stack;
            }
            throw error;
        }
    }