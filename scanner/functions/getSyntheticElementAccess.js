function getSyntheticElementAccess(node) {
                const parentAccess = getParentElementAccess(node);
                if (parentAccess && canHaveFlowNode(parentAccess) && parentAccess.flowNode) {
                    const propName = getDestructuringPropertyName(node);
                    if (propName) {
                        const literal = setTextRange(parseNodeFactory.createStringLiteral(propName), node);
                        const lhsExpr = isLeftHandSideExpression(parentAccess) ? parentAccess : parseNodeFactory.createParenthesizedExpression(parentAccess);
                        const result = setTextRange(parseNodeFactory.createElementAccessExpression(lhsExpr, literal), node);
                        setParent(literal, result);
                        setParent(result, node);
                        if (lhsExpr !== parentAccess) {
                            setParent(lhsExpr, result);
                        }
                        result.flowNode = parentAccess.flowNode;
                        return result;
                    }
                }
            }