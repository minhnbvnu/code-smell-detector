function createCaseClause(expression, statements) {
                const node = createBaseNode(292 /* CaseClause */);
                node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
                node.statements = createNodeArray(statements);
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildrenFlags(node.statements);
                node.jsDoc = void 0;
                return node;
            }