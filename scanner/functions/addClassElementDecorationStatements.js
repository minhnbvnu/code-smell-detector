function addClassElementDecorationStatements(statements, node, isStatic2) {
                addRange(statements, map(generateClassElementDecorationExpressions(node, isStatic2), (expr) => factory2.createExpressionStatement(expr)));
            }