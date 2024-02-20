function isThisSpecifiedInParameters(originalFunc) {
                const firstArg = originalFunc.params[0];
                return (firstArg &&
                    firstArg.type === utils_1.AST_NODE_TYPES.Identifier &&
                    firstArg.name === 'this');
            }