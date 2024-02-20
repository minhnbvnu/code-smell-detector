function transformInitializedVariable(node, isExportedDeclaration) {
                const createAssignment = isExportedDeclaration ? createExportedVariableAssignment : createNonExportedVariableAssignment;
                return isBindingPattern(node.name) ? flattenDestructuringAssignment(node, visitor, context, 0 /* All */, 
                /*needsValue*/
                false, createAssignment) : node.initializer ? createAssignment(node.name, visitNode(node.initializer, visitor, isExpression)) : node.name;
            }