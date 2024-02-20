function checkDeferredNode(node) {
                var _a2, _b;
                (_a2 = tracing) == null ? void 0 : _a2.push(tracing.Phase.Check, "checkDeferredNode", { kind: node.kind, pos: node.pos, end: node.end, path: node.tracingPath });
                const saveCurrentNode = currentNode;
                currentNode = node;
                instantiationCount = 0;
                switch (node.kind) {
                    case 210 /* CallExpression */:
                    case 211 /* NewExpression */:
                    case 212 /* TaggedTemplateExpression */:
                    case 167 /* Decorator */:
                    case 283 /* JsxOpeningElement */:
                        resolveUntypedCall(node);
                        break;
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                        checkFunctionExpressionOrObjectLiteralMethodDeferred(node);
                        break;
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        checkAccessorDeclaration(node);
                        break;
                    case 228 /* ClassExpression */:
                        checkClassExpressionDeferred(node);
                        break;
                    case 165 /* TypeParameter */:
                        checkTypeParameterDeferred(node);
                        break;
                    case 282 /* JsxSelfClosingElement */:
                        checkJsxSelfClosingElementDeferred(node);
                        break;
                    case 281 /* JsxElement */:
                        checkJsxElementDeferred(node);
                        break;
                }
                currentNode = saveCurrentNode;
                (_b = tracing) == null ? void 0 : _b.pop();
            }