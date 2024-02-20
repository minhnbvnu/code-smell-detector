function transformHeritageClauses(nodes) {
                return factory2.createNodeArray(filter(map(nodes, (clause) => factory2.updateHeritageClause(clause, visitNodes2(factory2.createNodeArray(filter(clause.types, (t) => {
                    return isEntityNameExpression(t.expression) || clause.token === 94 /* ExtendsKeyword */ && t.expression.kind === 104 /* NullKeyword */;
                })), visitDeclarationSubtree, isExpressionWithTypeArguments))), (clause) => clause.types && !!clause.types.length));
            }