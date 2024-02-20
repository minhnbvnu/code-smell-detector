function isLeftSideLowerPrecedence() {
                        const logicalTsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                        const leftTsNode = parserServices.esTreeNodeToTSNodeMap.get(leftNode);
                        const operator = (0, tsutils_1.isBinaryExpression)(logicalTsNode)
                            ? logicalTsNode.operatorToken.kind
                            : ts.SyntaxKind.Unknown;
                        const leftPrecedence = util.getOperatorPrecedence(leftTsNode.kind, operator);
                        return leftPrecedence < util.OperatorPrecedence.LeftHandSide;
                    }