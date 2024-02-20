function serializeSymbolWorker(symbol, isPrivate, propertyAsAlias) {
                        var _a2, _b, _c, _d;
                        const symbolName2 = unescapeLeadingUnderscores(symbol.escapedName);
                        const isDefault = symbol.escapedName === "default" /* Default */;
                        if (isPrivate && !(context.flags & 131072 /* AllowAnonymousIdentifier */) && isStringANonContextualKeyword(symbolName2) && !isDefault) {
                            context.encounteredError = true;
                            return;
                        }
                        let needsPostExportDefault = isDefault && !!(symbol.flags & -113 /* ExportDoesNotSupportDefaultModifier */ || symbol.flags & 16 /* Function */ && length(getPropertiesOfType(getTypeOfSymbol(symbol)))) && !(symbol.flags & 2097152 /* Alias */);
                        let needsExportDeclaration = !needsPostExportDefault && !isPrivate && isStringANonContextualKeyword(symbolName2) && !isDefault;
                        if (needsPostExportDefault || needsExportDeclaration) {
                            isPrivate = true;
                        }
                        const modifierFlags = (!isPrivate ? 1 /* Export */ : 0) | (isDefault && !needsPostExportDefault ? 1024 /* Default */ : 0);
                        const isConstMergedWithNS = symbol.flags & 1536 /* Module */ && symbol.flags & (2 /* BlockScopedVariable */ | 1 /* FunctionScopedVariable */ | 4 /* Property */) && symbol.escapedName !== "export=" /* ExportEquals */;
                        const isConstMergedWithNSPrintableAsSignatureMerge = isConstMergedWithNS && isTypeRepresentableAsFunctionNamespaceMerge(getTypeOfSymbol(symbol), symbol);
                        if (symbol.flags & (16 /* Function */ | 8192 /* Method */) || isConstMergedWithNSPrintableAsSignatureMerge) {
                            serializeAsFunctionNamespaceMerge(getTypeOfSymbol(symbol), symbol, getInternalSymbolName(symbol, symbolName2), modifierFlags);
                        }
                        if (symbol.flags & 524288 /* TypeAlias */) {
                            serializeTypeAlias(symbol, symbolName2, modifierFlags);
                        }
                        if (symbol.flags & (2 /* BlockScopedVariable */ | 1 /* FunctionScopedVariable */ | 4 /* Property */) && symbol.escapedName !== "export=" /* ExportEquals */ && !(symbol.flags & 4194304 /* Prototype */) && !(symbol.flags & 32 /* Class */) && !(symbol.flags & 8192 /* Method */) && !isConstMergedWithNSPrintableAsSignatureMerge) {
                            if (propertyAsAlias) {
                                const createdExport = serializeMaybeAliasAssignment(symbol);
                                if (createdExport) {
                                    needsExportDeclaration = false;
                                    needsPostExportDefault = false;
                                }
                            }
                            else {
                                const type = getTypeOfSymbol(symbol);
                                const localName = getInternalSymbolName(symbol, symbolName2);
                                if (!(symbol.flags & 16 /* Function */) && isTypeRepresentableAsFunctionNamespaceMerge(type, symbol)) {
                                    serializeAsFunctionNamespaceMerge(type, symbol, localName, modifierFlags);
                                }
                                else {
                                    const flags = !(symbol.flags & 2 /* BlockScopedVariable */) ? ((_a2 = symbol.parent) == null ? void 0 : _a2.valueDeclaration) && isSourceFile((_b = symbol.parent) == null ? void 0 : _b.valueDeclaration) ? 2 /* Const */ : void 0 : isConstVariable(symbol) ? 2 /* Const */ : 1 /* Let */;
                                    const name = needsPostExportDefault || !(symbol.flags & 4 /* Property */) ? localName : getUnusedName(localName, symbol);
                                    let textRange = symbol.declarations && find(symbol.declarations, (d) => isVariableDeclaration(d));
                                    if (textRange && isVariableDeclarationList(textRange.parent) && textRange.parent.declarations.length === 1) {
                                        textRange = textRange.parent.parent;
                                    }
                                    const propertyAccessRequire = (_c = symbol.declarations) == null ? void 0 : _c.find(isPropertyAccessExpression);
                                    if (propertyAccessRequire && isBinaryExpression(propertyAccessRequire.parent) && isIdentifier(propertyAccessRequire.parent.right) && ((_d = type.symbol) == null ? void 0 : _d.valueDeclaration) && isSourceFile(type.symbol.valueDeclaration)) {
                                        const alias = localName === propertyAccessRequire.parent.right.escapedText ? void 0 : propertyAccessRequire.parent.right;
                                        addResult(factory.createExportDeclaration(
                                        /*modifiers*/
                                        void 0, 
                                        /*isTypeOnly*/
                                        false, factory.createNamedExports([factory.createExportSpecifier(
                                            /*isTypeOnly*/
                                            false, alias, localName)])), 0 /* None */);
                                        context.tracker.trackSymbol(type.symbol, context.enclosingDeclaration, 111551 /* Value */);
                                    }
                                    else {
                                        const statement = setTextRange(factory.createVariableStatement(
                                        /*modifiers*/
                                        void 0, factory.createVariableDeclarationList([
                                            factory.createVariableDeclaration(name, 
                                            /*exclamationToken*/
                                            void 0, serializeTypeForDeclaration(context, type, symbol, enclosingDeclaration, includePrivateSymbol, bundled))
                                        ], flags)), textRange);
                                        addResult(statement, name !== localName ? modifierFlags & ~1 /* Export */ : modifierFlags);
                                        if (name !== localName && !isPrivate) {
                                            addResult(factory.createExportDeclaration(
                                            /*modifiers*/
                                            void 0, 
                                            /*isTypeOnly*/
                                            false, factory.createNamedExports([factory.createExportSpecifier(
                                                /*isTypeOnly*/
                                                false, name, localName)])), 0 /* None */);
                                            needsExportDeclaration = false;
                                            needsPostExportDefault = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (symbol.flags & 384 /* Enum */) {
                            serializeEnum(symbol, symbolName2, modifierFlags);
                        }
                        if (symbol.flags & 32 /* Class */) {
                            if (symbol.flags & 4 /* Property */ && symbol.valueDeclaration && isBinaryExpression(symbol.valueDeclaration.parent) && isClassExpression(symbol.valueDeclaration.parent.right)) {
                                serializeAsAlias(symbol, getInternalSymbolName(symbol, symbolName2), modifierFlags);
                            }
                            else {
                                serializeAsClass(symbol, getInternalSymbolName(symbol, symbolName2), modifierFlags);
                            }
                        }
                        if (symbol.flags & (512 /* ValueModule */ | 1024 /* NamespaceModule */) && (!isConstMergedWithNS || isTypeOnlyNamespace(symbol)) || isConstMergedWithNSPrintableAsSignatureMerge) {
                            serializeModule(symbol, symbolName2, modifierFlags);
                        }
                        if (symbol.flags & 64 /* Interface */ && !(symbol.flags & 32 /* Class */)) {
                            serializeInterface(symbol, symbolName2, modifierFlags);
                        }
                        if (symbol.flags & 2097152 /* Alias */) {
                            serializeAsAlias(symbol, getInternalSymbolName(symbol, symbolName2), modifierFlags);
                        }
                        if (symbol.flags & 4 /* Property */ && symbol.escapedName === "export=" /* ExportEquals */) {
                            serializeMaybeAliasAssignment(symbol);
                        }
                        if (symbol.flags & 8388608 /* ExportStar */) {
                            if (symbol.declarations) {
                                for (const node of symbol.declarations) {
                                    const resolvedModule = resolveExternalModuleName(node, node.moduleSpecifier);
                                    if (!resolvedModule)
                                        continue;
                                    addResult(factory.createExportDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    node.isTypeOnly, 
                                    /*exportClause*/
                                    void 0, factory.createStringLiteral(getSpecifierForModuleSymbol(resolvedModule, context))), 0 /* None */);
                                }
                            }
                        }
                        if (needsPostExportDefault) {
                            addResult(factory.createExportAssignment(
                            /*modifiers*/
                            void 0, 
                            /*isExportAssignment*/
                            false, factory.createIdentifier(getInternalSymbolName(symbol, symbolName2))), 0 /* None */);
                        }
                        else if (needsExportDeclaration) {
                            addResult(factory.createExportDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*isTypeOnly*/
                            false, factory.createNamedExports([factory.createExportSpecifier(
                                /*isTypeOnly*/
                                false, getInternalSymbolName(symbol, symbolName2), symbolName2)])), 0 /* None */);
                        }
                    }