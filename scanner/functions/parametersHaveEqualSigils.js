function parametersHaveEqualSigils(a, b) {
                const optionalA = isTSParameterProperty(a)
                    ? a.parameter.optional
                    : a.optional;
                const optionalB = isTSParameterProperty(b)
                    ? b.parameter.optional
                    : b.optional;
                return ((a.type === utils_1.AST_NODE_TYPES.RestElement) ===
                    (b.type === utils_1.AST_NODE_TYPES.RestElement) &&
                    (optionalA !== undefined) === (optionalB !== undefined));
            }