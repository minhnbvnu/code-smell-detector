function isGlobalReference(node) {
                const scope = context.getScope();
                const variable = findVariable(scope, node);
                return variable !== null && variable.scope.type === "global" && variable.defs.length === 0;
            }