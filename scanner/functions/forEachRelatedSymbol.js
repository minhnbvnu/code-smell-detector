function forEachRelatedSymbol(symbol, location, checker, isForRenamePopulateSearchSymbolSet, onlyIncludeBindingElementAtReferenceLocation, cbSymbol, allowBaseTypes) {
                        const containingObjectLiteralElement = getContainingObjectLiteralElement(location);
                        if (containingObjectLiteralElement) {
                            const shorthandValueSymbol = checker.getShorthandAssignmentValueSymbol(location.parent);
                            if (shorthandValueSymbol && isForRenamePopulateSearchSymbolSet) {
                                return cbSymbol(shorthandValueSymbol, 
                                /*rootSymbol*/
                                void 0, 
                                /*baseSymbol*/
                                void 0, 3 /* SearchedLocalFoundProperty */);
                            }
                            const contextualType = checker.getContextualType(containingObjectLiteralElement.parent);
                            const res2 = contextualType && firstDefined(getPropertySymbolsFromContextualType(containingObjectLiteralElement, checker, contextualType, 
                            /*unionSymbolOk*/
                            true), (sym) => fromRoot(sym, 4 /* SearchedPropertyFoundLocal */));
                            if (res2)
                                return res2;
                            const propertySymbol = getPropertySymbolOfDestructuringAssignment(location, checker);
                            const res1 = propertySymbol && cbSymbol(propertySymbol, 
                            /*rootSymbol*/
                            void 0, 
                            /*baseSymbol*/
                            void 0, 4 /* SearchedPropertyFoundLocal */);
                            if (res1)
                                return res1;
                            const res22 = shorthandValueSymbol && cbSymbol(shorthandValueSymbol, 
                            /*rootSymbol*/
                            void 0, 
                            /*baseSymbol*/
                            void 0, 3 /* SearchedLocalFoundProperty */);
                            if (res22)
                                return res22;
                        }
                        const aliasedSymbol = getMergedAliasedSymbolOfNamespaceExportDeclaration(location, symbol, checker);
                        if (aliasedSymbol) {
                            const res2 = cbSymbol(aliasedSymbol, 
                            /*rootSymbol*/
                            void 0, 
                            /*baseSymbol*/
                            void 0, 1 /* Node */);
                            if (res2)
                                return res2;
                        }
                        const res = fromRoot(symbol);
                        if (res)
                            return res;
                        if (symbol.valueDeclaration && isParameterPropertyDeclaration(symbol.valueDeclaration, symbol.valueDeclaration.parent)) {
                            const paramProps = checker.getSymbolsOfParameterPropertyDeclaration(cast(symbol.valueDeclaration, isParameter), symbol.name);
                            Debug.assert(paramProps.length === 2 && !!(paramProps[0].flags & 1 /* FunctionScopedVariable */) && !!(paramProps[1].flags & 4 /* Property */));
                            return fromRoot(symbol.flags & 1 /* FunctionScopedVariable */ ? paramProps[1] : paramProps[0]);
                        }
                        const exportSpecifier = getDeclarationOfKind(symbol, 278 /* ExportSpecifier */);
                        if (!isForRenamePopulateSearchSymbolSet || exportSpecifier && !exportSpecifier.propertyName) {
                            const localSymbol = exportSpecifier && checker.getExportSpecifierLocalTargetSymbol(exportSpecifier);
                            if (localSymbol) {
                                const res2 = cbSymbol(localSymbol, 
                                /*rootSymbol*/
                                void 0, 
                                /*baseSymbol*/
                                void 0, 1 /* Node */);
                                if (res2)
                                    return res2;
                            }
                        }
                        if (!isForRenamePopulateSearchSymbolSet) {
                            let bindingElementPropertySymbol;
                            if (onlyIncludeBindingElementAtReferenceLocation) {
                                bindingElementPropertySymbol = isObjectBindingElementWithoutPropertyName(location.parent) ? getPropertySymbolFromBindingElement(checker, location.parent) : void 0;
                            }
                            else {
                                bindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol, checker);
                            }
                            return bindingElementPropertySymbol && fromRoot(bindingElementPropertySymbol, 4 /* SearchedPropertyFoundLocal */);
                        }
                        Debug.assert(isForRenamePopulateSearchSymbolSet);
                        const includeOriginalSymbolOfBindingElement = onlyIncludeBindingElementAtReferenceLocation;
                        if (includeOriginalSymbolOfBindingElement) {
                            const bindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol, checker);
                            return bindingElementPropertySymbol && fromRoot(bindingElementPropertySymbol, 4 /* SearchedPropertyFoundLocal */);
                        }
                        function fromRoot(sym, kind) {
                            return firstDefined(checker.getRootSymbols(sym), (rootSymbol) => cbSymbol(sym, rootSymbol, 
                            /*baseSymbol*/
                            void 0, kind) || (rootSymbol.parent && rootSymbol.parent.flags & (32 /* Class */ | 64 /* Interface */) && allowBaseTypes(rootSymbol) ? getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.name, checker, (base) => cbSymbol(sym, rootSymbol, base, kind)) : void 0));
                        }
                        function getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol2, checker2) {
                            const bindingElement = getDeclarationOfKind(symbol2, 205 /* BindingElement */);
                            if (bindingElement && isObjectBindingElementWithoutPropertyName(bindingElement)) {
                                return getPropertySymbolFromBindingElement(checker2, bindingElement);
                            }
                        }
                    }