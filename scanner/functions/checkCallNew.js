function checkCallNew(node) {
                const callee = node.callee;
                if (hasExcessParensWithPrecedence(callee, precedence(node))) {
                    if (hasDoubleExcessParens(callee) ||
                        !(isIIFE(node) ||
                            // (new A)(); new (new A)();
                            (callee.type === "NewExpression" &&
                                !isNewExpressionWithParens(callee) &&
                                !(node.type === "NewExpression" &&
                                    !isNewExpressionWithParens(node))) ||
                            // new (a().b)(); new (a.b().c);
                            (node.type === "NewExpression" &&
                                callee.type === "MemberExpression" &&
                                doesMemberExpressionContainCallExpression(callee)) ||
                            // (a?.b)(); (a?.())();
                            (!node.optional &&
                                callee.type === "ChainExpression"))) {
                        report(node.callee);
                    }
                }
                node.arguments
                    .filter(arg => hasExcessParensWithPrecedence(arg, PRECEDENCE_OF_ASSIGNMENT_EXPR))
                    .forEach(report);
            }