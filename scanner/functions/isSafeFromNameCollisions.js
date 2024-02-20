function isSafeFromNameCollisions(node, scope) {
                if (node.type === "FunctionDeclaration") {
                    // Conditional function declaration. Scope and hoisting are unpredictable, different engines work differently.
                    return false;
                }
                if (node.type !== "BlockStatement") {
                    return true;
                }
                const elseBlockScope = scope.childScopes.find(({ block }) => block === node);
                if (!elseBlockScope) {
                    // ecmaVersion < 6, `else` block statement cannot have its own scope, no possible collisions.
                    return true;
                }
                /*
                 * elseBlockScope is supposed to merge into its upper scope. elseBlockScope.variables array contains
                 * only block-scoped variables (such as let and const variables or class and function declarations)
                 * defined directly in the elseBlockScope. These are exactly the only names that could cause collisions.
                 */
                const namesToCheck = elseBlockScope.variables.map(({ name }) => name);
                return isSafeToDeclare(namesToCheck, scope);
            }