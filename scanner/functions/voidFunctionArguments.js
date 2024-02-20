function voidFunctionArguments(checker, node) {
        // 'new' can be used without any arguments, as in 'let b = new Object;'
        // In this case, there are no argument positions to check, so return early.
        if (!node.arguments) {
            return new Set();
        }
        const thenableReturnIndices = new Set();
        const voidReturnIndices = new Set();
        const type = checker.getTypeAtLocation(node.expression);
        // We can't use checker.getResolvedSignature because it prefers an early '() => void' over a later '() => Promise<void>'
        // See https://github.com/microsoft/TypeScript/issues/48077
        for (const subType of tsutils.unionTypeParts(type)) {
            // Standard function calls and `new` have two different types of signatures
            const signatures = ts.isCallExpression(node)
                ? subType.getCallSignatures()
                : subType.getConstructSignatures();
            for (const signature of signatures) {
                for (const [index, parameter] of signature.parameters.entries()) {
                    const decl = parameter.valueDeclaration;
                    let type = checker.getTypeOfSymbolAtLocation(parameter, node.expression);
                    // If this is a array 'rest' parameter, check all of the argument indices
                    // from the current argument to the end.
                    // Note - we currently do not support 'spread' arguments - adding support for them
                    // is tracked in https://github.com/typescript-eslint/typescript-eslint/issues/5744
                    if (decl && ts.isParameter(decl) && decl.dotDotDotToken) {
                        if (checker.isArrayType(type)) {
                            // Unwrap 'Array<MaybeVoidFunction>' to 'MaybeVoidFunction',
                            // so that we'll handle it in the same way as a non-rest
                            // 'param: MaybeVoidFunction'
                            type = checker.getTypeArguments(type)[0];
                            for (let i = index; i < node.arguments.length; i++) {
                                checkThenableOrVoidArgument(checker, node, type, i, thenableReturnIndices, voidReturnIndices);
                            }
                        }
                        else if (checker.isTupleType(type)) {
                            // Check each type in the tuple - for example, [boolean, () => void] would
                            // add the index of the second tuple parameter to 'voidReturnIndices'
                            const typeArgs = checker.getTypeArguments(type);
                            for (let i = index; i < node.arguments.length && i - index < typeArgs.length; i++) {
                                checkThenableOrVoidArgument(checker, node, typeArgs[i - index], i, thenableReturnIndices, voidReturnIndices);
                            }
                        }
                    }
                    else {
                        checkThenableOrVoidArgument(checker, node, type, index, thenableReturnIndices, voidReturnIndices);
                    }
                }
            }
        }
        for (const index of thenableReturnIndices) {
            voidReturnIndices.delete(index);
        }
        return voidReturnIndices;
    }