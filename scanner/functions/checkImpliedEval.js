function checkImpliedEval(node) {
                var _a;
                const calleeName = getCalleeName(node.callee);
                if (calleeName == null) {
                    return;
                }
                if (calleeName === FUNCTION_CONSTRUCTOR) {
                    const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node.callee);
                    const type = checker.getTypeAtLocation(tsNode);
                    const symbol = type.getSymbol();
                    if (symbol) {
                        const declarations = (_a = symbol.getDeclarations()) !== null && _a !== void 0 ? _a : [];
                        for (const declaration of declarations) {
                            const sourceFile = declaration.getSourceFile();
                            if (program.isSourceFileDefaultLibrary(sourceFile)) {
                                context.report({ node, messageId: 'noFunctionConstructor' });
                                return;
                            }
                        }
                    }
                    else {
                        context.report({ node, messageId: 'noFunctionConstructor' });
                        return;
                    }
                }
                if (node.arguments.length === 0) {
                    return;
                }
                const [handler] = node.arguments;
                if (EVAL_LIKE_METHODS.has(calleeName) &&
                    !isFunction(handler) &&
                    isReferenceToGlobalFunction(calleeName)) {
                    context.report({ node: handler, messageId: 'noImpliedEvalError' });
                }
            }