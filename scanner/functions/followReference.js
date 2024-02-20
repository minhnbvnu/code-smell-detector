function followReference(node) {
                const scope = context.getScope();
                const variable = scope.set.get(node.name);
                /* istanbul ignore if */ if (!variable) {
                    return;
                }
                // check all of the definitions
                for (const definition of variable.defs) {
                    // cases we don't care about in this rule
                    if ([
                        scope_manager_1.DefinitionType.ImplicitGlobalVariable,
                        scope_manager_1.DefinitionType.ImportBinding,
                        scope_manager_1.DefinitionType.CatchClause,
                        scope_manager_1.DefinitionType.Parameter,
                    ].includes(definition.type)) {
                        continue;
                    }
                    checkNode(definition.node);
                }
                // follow references to find writes to the variable
                for (const reference of variable.references) {
                    if (
                    // we don't want to check the initialization ref, as this is handled by the declaration check
                    !reference.init &&
                        reference.writeExpr) {
                        checkNode(reference.writeExpr);
                    }
                }
            }