function generateNameForMethodOrAccessor(node, privateName, prefix, suffix) {
                if (isIdentifier(node.name)) {
                    return generateNameCached(node.name, privateName);
                }
                return makeTempVariableName(0 /* Auto */, 
                /*reservedInNestedScopes*/
                false, privateName, prefix, suffix);
            }