function tryGetParameterInfo(startingToken, position, sourceFile, checker) {
            const info = getContextualSignatureLocationInfo(startingToken, sourceFile, position, checker);
            if (!info)
                return void 0;
            const { contextualType, argumentIndex, argumentCount, argumentsSpan } = info;
            const nonNullableContextualType = contextualType.getNonNullableType();
            const symbol = nonNullableContextualType.symbol;
            if (symbol === void 0)
                return void 0;
            const signature = lastOrUndefined(nonNullableContextualType.getCallSignatures());
            if (signature === void 0)
                return void 0;
            const invocation = { kind: 2 /* Contextual */, signature, node: startingToken, symbol: chooseBetterSymbol(symbol) };
            return { isTypeParameterList: false, invocation, argumentsSpan, argumentIndex, argumentCount };
        }