function getArgumentInfoForCompletions(node, position, sourceFile) {
            const info = getImmediatelyContainingArgumentInfo(node, position, sourceFile);
            return !info || info.isTypeParameterList || info.invocation.kind !== 0 /* Call */ ? void 0 : { invocation: info.invocation.node, argumentCount: info.argumentCount, argumentIndex: info.argumentIndex };
        }