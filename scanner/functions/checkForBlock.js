function checkForBlock(node) {
                const scope = context.getScope();
                /*
                 * In ES5, some node type such as `BlockStatement` doesn't have that scope.
                 * `scope.block` is a different node in such a case.
                 */
                if (scope.block === node) {
                    findVariablesInScope(scope);
                }
            }