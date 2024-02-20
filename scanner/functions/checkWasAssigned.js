function checkWasAssigned(alias, scope) {
                const variable = scope.set.get(alias);
                if (!variable) {
                    return;
                }
                if (variable.defs.some(def => def.node.type === "VariableDeclarator" &&
                    def.node.init !== null)) {
                    return;
                }
                /*
                 * The alias has been declared and not assigned: check it was
                 * assigned later in the same scope.
                 */
                if (!variable.references.some(reference => {
                    const write = reference.writeExpr;
                    return (reference.from === scope &&
                        write && write.type === "ThisExpression" &&
                        write.parent.operator === "=");
                })) {
                    variable.defs.map(def => def.node).forEach(node => {
                        reportBadAssignment(node, alias);
                    });
                }
            }