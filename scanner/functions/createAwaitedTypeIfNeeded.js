function createAwaitedTypeIfNeeded(type) {
                if (isAwaitedTypeNeeded(type)) {
                    const awaitedType = tryCreateAwaitedType(type);
                    if (awaitedType) {
                        return awaitedType;
                    }
                }
                Debug.assert(isAwaitedTypeInstantiation(type) || getPromisedTypeOfPromise(type) === void 0, "type provided should not be a non-generic 'promise'-like.");
                return type;
            }