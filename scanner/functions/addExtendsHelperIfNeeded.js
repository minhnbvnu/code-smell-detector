function addExtendsHelperIfNeeded(statements, node, extendsClauseElement) {
                if (extendsClauseElement) {
                    statements.push(setTextRange(factory2.createExpressionStatement(emitHelpers().createExtendsHelper(factory2.getInternalName(node))), 
                    /*location*/
                    extendsClauseElement));
                }
            }