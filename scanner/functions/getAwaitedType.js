function getAwaitedType(type, errorNode, diagnosticMessage, arg0) {
                const awaitedType = getAwaitedTypeNoAlias(type, errorNode, diagnosticMessage, arg0);
                return awaitedType && createAwaitedTypeIfNeeded(awaitedType);
            }