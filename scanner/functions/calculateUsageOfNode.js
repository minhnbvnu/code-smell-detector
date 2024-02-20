function calculateUsageOfNode(node, usage) {
                while (isRightSideOfQualifiedNameOrPropertyAccess(node)) {
                    node = node.parent;
                }
                switch (node.parent.kind) {
                    case 241 /* ExpressionStatement */:
                        inferTypeFromExpressionStatement(node, usage);
                        break;
                    case 222 /* PostfixUnaryExpression */:
                        usage.isNumber = true;
                        break;
                    case 221 /* PrefixUnaryExpression */:
                        inferTypeFromPrefixUnaryExpression(node.parent, usage);
                        break;
                    case 223 /* BinaryExpression */:
                        inferTypeFromBinaryExpression(node, node.parent, usage);
                        break;
                    case 292 /* CaseClause */:
                    case 293 /* DefaultClause */:
                        inferTypeFromSwitchStatementLabel(node.parent, usage);
                        break;
                    case 210 /* CallExpression */:
                    case 211 /* NewExpression */:
                        if (node.parent.expression === node) {
                            inferTypeFromCallExpression(node.parent, usage);
                        }
                        else {
                            inferTypeFromContextualType(node, usage);
                        }
                        break;
                    case 208 /* PropertyAccessExpression */:
                        inferTypeFromPropertyAccessExpression(node.parent, usage);
                        break;
                    case 209 /* ElementAccessExpression */:
                        inferTypeFromPropertyElementExpression(node.parent, node, usage);
                        break;
                    case 299 /* PropertyAssignment */:
                    case 300 /* ShorthandPropertyAssignment */:
                        inferTypeFromPropertyAssignment(node.parent, usage);
                        break;
                    case 169 /* PropertyDeclaration */:
                        inferTypeFromPropertyDeclaration(node.parent, usage);
                        break;
                    case 257 /* VariableDeclaration */: {
                        const { name, initializer } = node.parent;
                        if (node === name) {
                            if (initializer) {
                                addCandidateType(usage, checker.getTypeAtLocation(initializer));
                            }
                            break;
                        }
                    }
                    default:
                        return inferTypeFromContextualType(node, usage);
                }
            }