function checkForVariables(node) {
                if (node.kind !== "var") {
                    return;
                }
                // Defines a predicate to check whether or not a given reference is outside of valid scope.
                const scopeRange = stack[stack.length - 1];
                /**
                 * Check if a reference is out of scope
                 * @param {ASTNode} reference node to examine
                 * @returns {boolean} True is its outside the scope
                 * @private
                 */
                function isOutsideOfScope(reference) {
                    const idRange = reference.identifier.range;
                    return idRange[0] < scopeRange[0] || idRange[1] > scopeRange[1];
                }
                // Gets declared variables, and checks its references.
                const variables = context.getDeclaredVariables(node);
                for (let i = 0; i < variables.length; ++i) {
                    // Reports.
                    variables[i]
                        .references
                        .filter(isOutsideOfScope)
                        .forEach(report);
                }
            }