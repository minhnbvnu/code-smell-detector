function serializeAsAlias(symbol, localName, modifierFlags) {
                        var _a2, _b, _c, _d, _e;
                        const node = getDeclarationOfAliasSymbol(symbol);
                        if (!node)
                            return Debug.fail();
                        const target = getMergedSymbol(getTargetOfAliasDeclaration(node, 
                        /*dontRecursivelyResolve*/
                        true));
                        if (!target) {
                            return;
                        }
                        let verbatimTargetName = isShorthandAmbientModuleSymbol(target) && getSomeTargetNameFromDeclarations(symbol.declarations) || unescapeLeadingUnderscores(target.escapedName);
                        if (verbatimTargetName === "export=" /* ExportEquals */ && allowSyntheticDefaultImports) {
                            verbatimTargetName = "default" /* Default */;
                        }
                        const targetName = getInternalSymbolName(target, verbatimTargetName);
                        includePrivateSymbol(target);
                        switch (node.kind) {
                            case 205 /* BindingElement */:
                                if (((_b = (_a2 = node.parent) == null ? void 0 : _a2.parent) == null ? void 0 : _b.kind) === 257 /* VariableDeclaration */) {
                                    const specifier2 = getSpecifierForModuleSymbol(target.parent || target, context);
                                    const { propertyName } = node;
                                    addResult(factory.createImportDeclaration(
                                    /*modifiers*/
                                    void 0, factory.createImportClause(
                                    /*isTypeOnly*/
                                    false, 
                                    /*name*/
                                    void 0, factory.createNamedImports([factory.createImportSpecifier(
                                        /*isTypeOnly*/
                                        false, propertyName && isIdentifier(propertyName) ? factory.createIdentifier(idText(propertyName)) : void 0, factory.createIdentifier(localName))])), factory.createStringLiteral(specifier2), 
                                    /*importClause*/
                                    void 0), 0 /* None */);
                                    break;
                                }
                                Debug.failBadSyntaxKind(((_c = node.parent) == null ? void 0 : _c.parent) || node, "Unhandled binding element grandparent kind in declaration serialization");
                                break;
                            case 300 /* ShorthandPropertyAssignment */:
                                if (((_e = (_d = node.parent) == null ? void 0 : _d.parent) == null ? void 0 : _e.kind) === 223 /* BinaryExpression */) {
                                    serializeExportSpecifier(unescapeLeadingUnderscores(symbol.escapedName), targetName);
                                }
                                break;
                            case 257 /* VariableDeclaration */:
                                if (isPropertyAccessExpression(node.initializer)) {
                                    const initializer = node.initializer;
                                    const uniqueName = factory.createUniqueName(localName);
                                    const specifier2 = getSpecifierForModuleSymbol(target.parent || target, context);
                                    addResult(factory.createImportEqualsDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    false, uniqueName, factory.createExternalModuleReference(factory.createStringLiteral(specifier2))), 0 /* None */);
                                    addResult(factory.createImportEqualsDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    false, factory.createIdentifier(localName), factory.createQualifiedName(uniqueName, initializer.name)), modifierFlags);
                                    break;
                                }
                            case 268 /* ImportEqualsDeclaration */:
                                if (target.escapedName === "export=" /* ExportEquals */ && some(target.declarations, (d) => isSourceFile(d) && isJsonSourceFile(d))) {
                                    serializeMaybeAliasAssignment(symbol);
                                    break;
                                }
                                const isLocalImport = !(target.flags & 512 /* ValueModule */) && !isVariableDeclaration(node);
                                addResult(factory.createImportEqualsDeclaration(
                                /*modifiers*/
                                void 0, 
                                /*isTypeOnly*/
                                false, factory.createIdentifier(localName), isLocalImport ? symbolToName(target, context, 67108863 /* All */, 
                                /*expectsIdentifier*/
                                false) : factory.createExternalModuleReference(factory.createStringLiteral(getSpecifierForModuleSymbol(target, context)))), isLocalImport ? modifierFlags : 0 /* None */);
                                break;
                            case 267 /* NamespaceExportDeclaration */:
                                addResult(factory.createNamespaceExportDeclaration(idText(node.name)), 0 /* None */);
                                break;
                            case 270 /* ImportClause */: {
                                const generatedSpecifier = getSpecifierForModuleSymbol(target.parent || target, context);
                                const specifier2 = bundled ? factory.createStringLiteral(generatedSpecifier) : node.parent.moduleSpecifier;
                                addResult(factory.createImportDeclaration(
                                /*modifiers*/
                                void 0, factory.createImportClause(
                                /*isTypeOnly*/
                                false, factory.createIdentifier(localName), 
                                /*namedBindings*/
                                void 0), specifier2, node.parent.assertClause), 0 /* None */);
                                break;
                            }
                            case 271 /* NamespaceImport */: {
                                const generatedSpecifier = getSpecifierForModuleSymbol(target.parent || target, context);
                                const specifier2 = bundled ? factory.createStringLiteral(generatedSpecifier) : node.parent.parent.moduleSpecifier;
                                addResult(factory.createImportDeclaration(
                                /*modifiers*/
                                void 0, factory.createImportClause(
                                /*isTypeOnly*/
                                false, 
                                /*importClause*/
                                void 0, factory.createNamespaceImport(factory.createIdentifier(localName))), specifier2, node.parent.parent.assertClause), 0 /* None */);
                                break;
                            }
                            case 277 /* NamespaceExport */:
                                addResult(factory.createExportDeclaration(
                                /*modifiers*/
                                void 0, 
                                /*isTypeOnly*/
                                false, factory.createNamespaceExport(factory.createIdentifier(localName)), factory.createStringLiteral(getSpecifierForModuleSymbol(target, context))), 0 /* None */);
                                break;
                            case 273 /* ImportSpecifier */: {
                                const generatedSpecifier = getSpecifierForModuleSymbol(target.parent || target, context);
                                const specifier2 = bundled ? factory.createStringLiteral(generatedSpecifier) : node.parent.parent.parent.moduleSpecifier;
                                addResult(factory.createImportDeclaration(
                                /*modifiers*/
                                void 0, factory.createImportClause(
                                /*isTypeOnly*/
                                false, 
                                /*importClause*/
                                void 0, factory.createNamedImports([
                                    factory.createImportSpecifier(
                                    /*isTypeOnly*/
                                    false, localName !== verbatimTargetName ? factory.createIdentifier(verbatimTargetName) : void 0, factory.createIdentifier(localName))
                                ])), specifier2, node.parent.parent.parent.assertClause), 0 /* None */);
                                break;
                            }
                            case 278 /* ExportSpecifier */:
                                const specifier = node.parent.parent.moduleSpecifier;
                                serializeExportSpecifier(unescapeLeadingUnderscores(symbol.escapedName), specifier ? verbatimTargetName : targetName, specifier && isStringLiteralLike(specifier) ? factory.createStringLiteral(specifier.text) : void 0);
                                break;
                            case 274 /* ExportAssignment */:
                                serializeMaybeAliasAssignment(symbol);
                                break;
                            case 223 /* BinaryExpression */:
                            case 208 /* PropertyAccessExpression */:
                            case 209 /* ElementAccessExpression */:
                                if (symbol.escapedName === "default" /* Default */ || symbol.escapedName === "export=" /* ExportEquals */) {
                                    serializeMaybeAliasAssignment(symbol);
                                }
                                else {
                                    serializeExportSpecifier(localName, targetName);
                                }
                                break;
                            default:
                                return Debug.failBadSyntaxKind(node, "Unhandled alias declaration kind in symbol serializer!");
                        }
                    }