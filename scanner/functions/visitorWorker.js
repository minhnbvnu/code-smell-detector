function visitorWorker(node, valueIsDiscarded) {
                if (!(node.transformFlags & (4096 /* ContainsDestructuringAssignment */ | 8388608 /* ContainsDynamicImport */ | 268435456 /* ContainsUpdateExpressionForIdentifier */))) {
                    return node;
                }
                switch (node.kind) {
                    case 245 /* ForStatement */:
                        return visitForStatement(node, 
                        /*isTopLevel*/
                        false);
                    case 241 /* ExpressionStatement */:
                        return visitExpressionStatement(node);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node, valueIsDiscarded);
                    case 356 /* PartiallyEmittedExpression */:
                        return visitPartiallyEmittedExpression(node, valueIsDiscarded);
                    case 223 /* BinaryExpression */:
                        if (isDestructuringAssignment(node)) {
                            return visitDestructuringAssignment(node, valueIsDiscarded);
                        }
                        break;
                    case 210 /* CallExpression */:
                        if (isImportCall(node)) {
                            return visitImportCallExpression(node);
                        }
                        break;
                    case 221 /* PrefixUnaryExpression */:
                    case 222 /* PostfixUnaryExpression */:
                        return visitPrefixOrPostfixUnaryExpression(node, valueIsDiscarded);
                }
                return visitEachChild(node, visitor, context);
            }