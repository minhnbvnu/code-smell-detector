function insertDefaultValueAssignmentForBindingPattern(statements, parameter, name, initializer) {
                if (name.elements.length > 0) {
                    insertStatementAfterCustomPrologue(statements, setEmitFlags(factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList(flattenDestructuringBinding(parameter, visitor, context, 0 /* All */, factory2.getGeneratedNameForNode(parameter)))), 2097152 /* CustomPrologue */));
                    return true;
                }
                else if (initializer) {
                    insertStatementAfterCustomPrologue(statements, setEmitFlags(factory2.createExpressionStatement(factory2.createAssignment(factory2.getGeneratedNameForNode(parameter), Debug.checkDefined(visitNode(initializer, visitor, isExpression)))), 2097152 /* CustomPrologue */));
                    return true;
                }
                return false;
            }