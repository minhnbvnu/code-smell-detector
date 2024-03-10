                return !!findAncestor(node, (node2) => {
                    switch (node2.kind) {
                        case 169 /* PropertyDeclaration */:
                            return true;
                        case 299 /* PropertyAssignment */:
                        case 171 /* MethodDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                        case 301 /* SpreadAssignment */:
                        case 164 /* ComputedPropertyName */:
                        case 236 /* TemplateSpan */:
                        case 291 /* JsxExpression */:
                        case 288 /* JsxAttribute */:
                        case 289 /* JsxAttributes */:
                        case 290 /* JsxSpreadAttribute */:
                        case 283 /* JsxOpeningElement */:
                        case 230 /* ExpressionWithTypeArguments */:
                        case 294 /* HeritageClause */:
                            return false;
                        case 216 /* ArrowFunction */:
                        case 241 /* ExpressionStatement */:
                            return isBlock(node2.parent) && isClassStaticBlockDeclaration(node2.parent.parent) ? true : "quit";
                        default:
                            return isExpressionNode(node2) ? false : "quit";
                    }
                });