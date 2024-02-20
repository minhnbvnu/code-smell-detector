function isSafeToDeclare(names, scope) {
                if (names.length === 0) {
                    return true;
                }
                const functionScope = scope.variableScope;
                /*
                 * If this is a function scope, scope.variables will contain parameters, implicit variables such as "arguments",
                 * all function-scoped variables ('var'), and block-scoped variables defined in the scope.
                 * If this is an inner scope, scope.variables will contain block-scoped variables defined in the scope.
                 *
                 * Redeclaring any of these would cause a syntax error, except for the implicit variables.
                 */
                const declaredVariables = scope.variables.filter(({ defs }) => defs.length > 0);
                if (declaredVariables.some(({ name }) => names.includes(name))) {
                    return false;
                }
                // Redeclaring a catch variable would also cause a syntax error.
                if (scope !== functionScope && scope.upper.type === "catch") {
                    if (scope.upper.variables.some(({ name }) => names.includes(name))) {
                        return false;
                    }
                }
                /*
                 * Redeclaring an implicit variable, such as "arguments", would not cause a syntax error.
                 * However, if the variable was used, declaring a new one with the same name would change references
                 * and modify behavior.
                 */
                const usedImplicitVariables = scope.variables.filter(({ defs, references }) => defs.length === 0 && references.length > 0);
                if (usedImplicitVariables.some(({ name }) => names.includes(name))) {
                    return false;
                }
                /*
                 * Declaring a variable with a name that was already used to reference a variable from an upper scope
                 * would change references and modify behavior.
                 */
                if (scope.through.some(t => names.includes(t.identifier.name))) {
                    return false;
                }
                /*
                 * If the scope is an inner scope (not the function scope), an uninitialized `var` variable declared inside
                 * the scope node (directly or in one of its descendants) is neither declared nor 'through' in the scope.
                 *
                 * For example, this would be a syntax error "Identifier 'a' has already been declared":
                 * function foo() { if (bar) { let a; if (baz) { var a; } } }
                 */
                if (scope !== functionScope) {
                    const scopeNodeRange = scope.block.range;
                    const variablesToCheck = functionScope.variables.filter(({ name }) => names.includes(name));
                    if (variablesToCheck.some(v => v.defs.some(({ node: { range } }) => scopeNodeRange[0] <= range[0] && range[1] <= scopeNodeRange[1]))) {
                        return false;
                    }
                }
                return true;
            }