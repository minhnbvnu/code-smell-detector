function fromContextualType(contextFlags = 4 /* Completions */) {
                const types = getStringLiteralTypes(getContextualTypeFromParent(node, typeChecker, contextFlags));
                if (!types.length) {
                    return;
                }
                return { kind: 2 /* Types */, types, isNewIdentifier: false };
            }