function useOuterVariableScopeInParameter(result, location, lastLocation) {
                const target = getEmitScriptTarget(compilerOptions);
                const functionLocation = location;
                if (isParameter(lastLocation) && functionLocation.body && result.valueDeclaration && result.valueDeclaration.pos >= functionLocation.body.pos && result.valueDeclaration.end <= functionLocation.body.end) {
                    if (target >= 2 /* ES2015 */) {
                        const links = getNodeLinks(functionLocation);
                        if (links.declarationRequiresScopeChange === void 0) {
                            links.declarationRequiresScopeChange = forEach(functionLocation.parameters, requiresScopeChange) || false;
                        }
                        return !links.declarationRequiresScopeChange;
                    }
                }
                return false;
                function requiresScopeChange(node) {
                    return requiresScopeChangeWorker(node.name) || !!node.initializer && requiresScopeChangeWorker(node.initializer);
                }
                function requiresScopeChangeWorker(node) {
                    switch (node.kind) {
                        case 216 /* ArrowFunction */:
                        case 215 /* FunctionExpression */:
                        case 259 /* FunctionDeclaration */:
                        case 173 /* Constructor */:
                            return false;
                        case 171 /* MethodDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                        case 299 /* PropertyAssignment */:
                            return requiresScopeChangeWorker(node.name);
                        case 169 /* PropertyDeclaration */:
                            if (hasStaticModifier(node)) {
                                return target < 99 /* ESNext */ || !useDefineForClassFields;
                            }
                            return requiresScopeChangeWorker(node.name);
                        default:
                            if (isNullishCoalesce(node) || isOptionalChain(node)) {
                                return target < 7 /* ES2020 */;
                            }
                            if (isBindingElement(node) && node.dotDotDotToken && isObjectBindingPattern(node.parent)) {
                                return target < 4 /* ES2017 */;
                            }
                            if (isTypeNode(node))
                                return false;
                            return forEachChild(node, requiresScopeChangeWorker) || false;
                    }
                }
            }