function getAwaitedTypeOfPromise(type, errorNode, diagnosticMessage, arg0) {
                const promisedType = getPromisedTypeOfPromise(type, errorNode);
                return promisedType && getAwaitedType(promisedType, errorNode, diagnosticMessage, arg0);
            }