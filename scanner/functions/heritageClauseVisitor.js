function heritageClauseVisitor(node) {
                switch (node.kind) {
                    case 294 /* HeritageClause */:
                        return visitEachChild(node, heritageClauseVisitor, context);
                    case 230 /* ExpressionWithTypeArguments */:
                        return visitExpressionWithTypeArgumentsInHeritageClause(node);
                    default:
                        return visitor(node);
                }
            }