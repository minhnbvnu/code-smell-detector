function generateClassElementDecorationExpressions(node, isStatic2) {
                const members = getDecoratedClassElements(node, isStatic2);
                let expressions;
                for (const member of members) {
                    expressions = append(expressions, generateClassElementDecorationExpression(node, member));
                }
                return expressions;
            }