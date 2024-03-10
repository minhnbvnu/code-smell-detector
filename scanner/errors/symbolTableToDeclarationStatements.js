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
                    function addResult(node, additionalModifierFlags) {
                        if (canHaveModifiers(node)) {
                            let newModifierFlags = 0 /* None */;
                            const enclosingDeclaration2 = context.enclosingDeclaration && (isJSDocTypeAlias(context.enclosingDeclaration) ? getSourceFileOfNode(context.enclosingDeclaration) : context.enclosingDeclaration);
                            if (additionalModifierFlags & 1 /* Export */ && enclosingDeclaration2 && (isExportingScope(enclosingDeclaration2) || isModuleDeclaration(enclosingDeclaration2)) && canHaveExportModifier(node)) {
                                newModifierFlags |= 1 /* Export */;
                            }
                            if (addingDeclare && !(newModifierFlags & 1 /* Export */) && (!enclosingDeclaration2 || !(enclosingDeclaration2.flags & 16777216 /* Ambient */)) && (isEnumDeclaration(node) || isVariableStatement(node) || isFunctionDeclaration(node) || isClassDeclaration(node) || isModuleDeclaration(node))) {
                                newModifierFlags |= 2 /* Ambient */;
                            }
                            if (additionalModifierFlags & 1024 /* Default */ && (isClassDeclaration(node) || isInterfaceDeclaration(node) || isFunctionDeclaration(node))) {
                                newModifierFlags |= 1024 /* Default */;
                            }
                            if (newModifierFlags) {
                                node = factory.updateModifiers(node, newModifierFlags | getEffectiveModifierFlags(node));
                            }
                        }
                        results.push(node);
                    }
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
                    function serializeMaybeAliasAssignment(symbol) {
                        if (symbol.flags & 4194304 /* Prototype */) {
                            return false;
                        }
                        const name = unescapeLeadingUnderscores(symbol.escapedName);
                        const isExportEquals = name === "export=" /* ExportEquals */;
                        const isDefault = name === "default" /* Default */;
                        const isExportAssignmentCompatibleSymbolName = isExportEquals || isDefault;
                        const aliasDecl = symbol.declarations && getDeclarationOfAliasSymbol(symbol);
                        const target = aliasDecl && getTargetOfAliasDeclaration(aliasDecl, 
                        /*dontRecursivelyResolve*/
                        true);
                        if (target && length(target.declarations) && some(target.declarations, (d) => getSourceFileOfNode(d) === getSourceFileOfNode(enclosingDeclaration))) {
                            const expr = aliasDecl && (isExportAssignment(aliasDecl) || isBinaryExpression(aliasDecl) ? getExportAssignmentExpression(aliasDecl) : getPropertyAssignmentAliasLikeExpression(aliasDecl));
                            const first2 = expr && isEntityNameExpression(expr) ? getFirstNonModuleExportsIdentifier(expr) : void 0;
                            const referenced = first2 && resolveEntityName(first2, 67108863 /* All */, 
                            /*ignoreErrors*/
                            true, 
                            /*dontResolveAlias*/
                            true, enclosingDeclaration);
                            if (referenced || target) {
                                includePrivateSymbol(referenced || target);
                            }
                            const prevDisableTrackSymbol = context.tracker.disableTrackSymbol;
                            context.tracker.disableTrackSymbol = true;
                            if (isExportAssignmentCompatibleSymbolName) {
                                results.push(factory.createExportAssignment(
                                /*modifiers*/
                                void 0, isExportEquals, symbolToExpression(target, context, 67108863 /* All */)));
                            }
                            else {
                                if (first2 === expr && first2) {
                                    serializeExportSpecifier(name, idText(first2));
                                }
                                else if (expr && isClassExpression(expr)) {
                                    serializeExportSpecifier(name, getInternalSymbolName(target, symbolName(target)));
                                }
                                else {
                                    const varName = getUnusedName(name, symbol);
                                    addResult(factory.createImportEqualsDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    false, factory.createIdentifier(varName), symbolToName(target, context, 67108863 /* All */, 
                                    /*expectsIdentifier*/
                                    false)), 0 /* None */);
                                    serializeExportSpecifier(name, varName);
                                }
                            }
                            context.tracker.disableTrackSymbol = prevDisableTrackSymbol;
                            return true;
                        }
                        else {
                            const varName = getUnusedName(name, symbol);
                            const typeToSerialize = getWidenedType(getTypeOfSymbol(getMergedSymbol(symbol)));
                            if (isTypeRepresentableAsFunctionNamespaceMerge(typeToSerialize, symbol)) {
                                serializeAsFunctionNamespaceMerge(typeToSerialize, symbol, varName, isExportAssignmentCompatibleSymbolName ? 0 /* None */ : 1 /* Export */);
                            }
                            else {
                                const statement = factory.createVariableStatement(
                                /*modifiers*/
                                void 0, factory.createVariableDeclarationList([
                                    factory.createVariableDeclaration(varName, 
                                    /*exclamationToken*/
                                    void 0, serializeTypeForDeclaration(context, typeToSerialize, symbol, enclosingDeclaration, includePrivateSymbol, bundled))
                                ], 2 /* Const */));
                                addResult(statement, target && target.flags & 4 /* Property */ && target.escapedName === "export=" /* ExportEquals */ ? 2 /* Ambient */ : name === varName ? 1 /* Export */ : 0 /* None */);
                            }
                            if (isExportAssignmentCompatibleSymbolName) {
                                results.push(factory.createExportAssignment(
                                /*modifiers*/
                                void 0, isExportEquals, factory.createIdentifier(varName)));
                                return true;
                            }
                            else if (name !== varName) {
                                serializeExportSpecifier(name, varName);
                                return true;
                            }
                            return false;
                        }
                    }
                        return function serializePropertySymbol(p, isStatic2, baseType) {
                            var _a2, _b, _c, _d, _e;
                            const modifierFlags = getDeclarationModifierFlagsFromSymbol(p);
                            const isPrivate = !!(modifierFlags & 8 /* Private */);
                            if (isStatic2 && p.flags & (788968 /* Type */ | 1920 /* Namespace */ | 2097152 /* Alias */)) {
                                return [];
                            }
                            if (p.flags & 4194304 /* Prototype */ || baseType && getPropertyOfType(baseType, p.escapedName) && isReadonlySymbol(getPropertyOfType(baseType, p.escapedName)) === isReadonlySymbol(p) && (p.flags & 16777216 /* Optional */) === (getPropertyOfType(baseType, p.escapedName).flags & 16777216 /* Optional */) && isTypeIdenticalTo(getTypeOfSymbol(p), getTypeOfPropertyOfType(baseType, p.escapedName))) {
                                return [];
                            }
                            const flag = modifierFlags & ~512 /* Async */ | (isStatic2 ? 32 /* Static */ : 0);
                            const name = getPropertyNameNodeForSymbol(p, context);
                            const firstPropertyLikeDecl = (_a2 = p.declarations) == null ? void 0 : _a2.find(or(isPropertyDeclaration, isAccessor, isVariableDeclaration, isPropertySignature, isBinaryExpression, isPropertyAccessExpression));
                            if (p.flags & 98304 /* Accessor */ && useAccessors) {
                                const result = [];
                                if (p.flags & 65536 /* SetAccessor */) {
                                    result.push(setTextRange(factory.createSetAccessorDeclaration(factory.createModifiersFromModifierFlags(flag), name, [factory.createParameterDeclaration(
                                        /*modifiers*/
                                        void 0, 
                                        /*dotDotDotToken*/
                                        void 0, "arg", 
                                        /*questionToken*/
                                        void 0, isPrivate ? void 0 : serializeTypeForDeclaration(context, getTypeOfSymbol(p), p, enclosingDeclaration, includePrivateSymbol, bundled))], 
                                    /*body*/
                                    void 0), ((_b = p.declarations) == null ? void 0 : _b.find(isSetAccessor)) || firstPropertyLikeDecl));
                                }
                                if (p.flags & 32768 /* GetAccessor */) {
                                    const isPrivate2 = modifierFlags & 8 /* Private */;
                                    result.push(setTextRange(factory.createGetAccessorDeclaration(factory.createModifiersFromModifierFlags(flag), name, [], isPrivate2 ? void 0 : serializeTypeForDeclaration(context, getTypeOfSymbol(p), p, enclosingDeclaration, includePrivateSymbol, bundled), 
                                    /*body*/
                                    void 0), ((_c = p.declarations) == null ? void 0 : _c.find(isGetAccessor)) || firstPropertyLikeDecl));
                                }
                                return result;
                            }
                            else if (p.flags & (4 /* Property */ | 3 /* Variable */ | 98304 /* Accessor */)) {
                                return setTextRange(createProperty2(factory.createModifiersFromModifierFlags((isReadonlySymbol(p) ? 64 /* Readonly */ : 0) | flag), name, p.flags & 16777216 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0, isPrivate ? void 0 : serializeTypeForDeclaration(context, getWriteTypeOfSymbol(p), p, enclosingDeclaration, includePrivateSymbol, bundled), 
                                // TODO: https://github.com/microsoft/TypeScript/pull/32372#discussion_r328386357
                                // interface members can't have initializers, however class members _can_
                                /*initializer*/
                                void 0), ((_d = p.declarations) == null ? void 0 : _d.find(or(isPropertyDeclaration, isVariableDeclaration))) || firstPropertyLikeDecl);
                            }
                            if (p.flags & (8192 /* Method */ | 16 /* Function */)) {
                                const type = getTypeOfSymbol(p);
                                const signatures = getSignaturesOfType(type, 0 /* Call */);
                                if (flag & 8 /* Private */) {
                                    return setTextRange(createProperty2(factory.createModifiersFromModifierFlags((isReadonlySymbol(p) ? 64 /* Readonly */ : 0) | flag), name, p.flags & 16777216 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0, 
                                    /*type*/
                                    void 0, 
                                    /*initializer*/
                                    void 0), ((_e = p.declarations) == null ? void 0 : _e.find(isFunctionLikeDeclaration)) || signatures[0] && signatures[0].declaration || p.declarations && p.declarations[0]);
                                }
                                const results2 = [];
                                for (const sig of signatures) {
                                    const decl = signatureToSignatureDeclarationHelper(sig, methodKind, context, {
                                        name,
                                        questionToken: p.flags & 16777216 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0,
                                        modifiers: flag ? factory.createModifiersFromModifierFlags(flag) : void 0
                                    });
                                    const location = sig.declaration && isPrototypePropertyAssignment(sig.declaration.parent) ? sig.declaration.parent : sig.declaration;
                                    results2.push(setTextRange(decl, location));
                                }
                                return results2;
                            }
                            return Debug.fail(`Unhandled class member kind! ${p.__debugFlags || p.flags}`);
                        };