function createTypeOperatorNode(operator, type) {
                const node = createBaseNode(195 /* TypeOperator */);
                node.operator = operator;
                node.type = operator === 146 /* ReadonlyKeyword */ ? parenthesizerRules().parenthesizeOperandOfReadonlyTypeOperator(type) : parenthesizerRules().parenthesizeOperandOfTypeOperator(type);
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }