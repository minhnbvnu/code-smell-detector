function elaborateError(node, source, target, relation, headMessage, containingMessageChain, errorOutputContainer) {
                if (!node || isOrHasGenericConditional(target))
                    return false;
                if (!checkTypeRelatedTo(source, target, relation, 
                /*errorNode*/
                void 0) && elaborateDidYouMeanToCallOrConstruct(node, source, target, relation, headMessage, containingMessageChain, errorOutputContainer)) {
                    return true;
                }
                switch (node.kind) {
                    case 291 /* JsxExpression */:
                    case 214 /* ParenthesizedExpression */:
                        return elaborateError(node.expression, source, target, relation, headMessage, containingMessageChain, errorOutputContainer);
                    case 223 /* BinaryExpression */:
                        switch (node.operatorToken.kind) {
                            case 63 /* EqualsToken */:
                            case 27 /* CommaToken */:
                                return elaborateError(node.right, source, target, relation, headMessage, containingMessageChain, errorOutputContainer);
                        }
                        break;
                    case 207 /* ObjectLiteralExpression */:
                        return elaborateObjectLiteral(node, source, target, relation, containingMessageChain, errorOutputContainer);
                    case 206 /* ArrayLiteralExpression */:
                        return elaborateArrayLiteral(node, source, target, relation, containingMessageChain, errorOutputContainer);
                    case 289 /* JsxAttributes */:
                        return elaborateJsxComponents(node, source, target, relation, containingMessageChain, errorOutputContainer);
                    case 216 /* ArrowFunction */:
                        return elaborateArrowFunction(node, source, target, relation, containingMessageChain, errorOutputContainer);
                }
                return false;
            }