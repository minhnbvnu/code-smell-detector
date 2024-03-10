function getSymbolScope(symbol) {
                        const { declarations, flags, parent: parent2, valueDeclaration } = symbol;
                        if (valueDeclaration && (valueDeclaration.kind === 215 /* FunctionExpression */ || valueDeclaration.kind === 228 /* ClassExpression */)) {
                            return valueDeclaration;
                        }
                        if (!declarations) {
                            return void 0;
                        }
                        if (flags & (4 /* Property */ | 8192 /* Method */)) {
                            const privateDeclaration = find(declarations, (d) => hasEffectiveModifier(d, 8 /* Private */) || isPrivateIdentifierClassElementDeclaration(d));
                            if (privateDeclaration) {
                                return getAncestor(privateDeclaration, 260 /* ClassDeclaration */);
                            }
                            return void 0;
                        }
                        if (declarations.some(isObjectBindingElementWithoutPropertyName)) {
                            return void 0;
                        }
                        const exposedByParent = parent2 && !(symbol.flags & 262144 /* TypeParameter */);
                        if (exposedByParent && !(isExternalModuleSymbol(parent2) && !parent2.globalExports)) {
                            return void 0;
                        }
                        let scope;
                        for (const declaration of declarations) {
                            const container = getContainerNode(declaration);
                            if (scope && scope !== container) {
                                return void 0;
                            }
                            if (!container || container.kind === 308 /* SourceFile */ && !isExternalOrCommonJsModule(container)) {
                                return void 0;
                            }
                            scope = container;
                            if (isFunctionExpression(scope)) {
                                let next;
                                while (next = getNextJSDocCommentLocation(scope)) {
                                    scope = next;
                                }
                            }
                        }
                        return exposedByParent ? scope.getSourceFile() : scope;
                    }