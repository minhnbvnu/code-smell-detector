function checkAwaitedType(type, withAlias, errorNode, diagnosticMessage, arg0) {
                const awaitedType = withAlias ? getAwaitedType(type, errorNode, diagnosticMessage, arg0) : getAwaitedTypeNoAlias(type, errorNode, diagnosticMessage, arg0);
                return awaitedType || errorType;
            }