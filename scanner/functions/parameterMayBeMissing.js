function parameterMayBeMissing(p) {
                const optional = isTSParameterProperty(p)
                    ? p.parameter.optional
                    : p.optional;
                return p.type === utils_1.AST_NODE_TYPES.RestElement || optional;
            }