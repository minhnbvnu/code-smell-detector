            function visitDeclarationSubtree(input) {
                if (shouldStripInternal(input))
                    return;
                if (isDeclaration(input)) {
                    if (isDeclarationAndNotVisible(input))
                        return;
                    if (hasDynamicName(input) && !resolver.isLateBound(getParseTreeNode(input))) {
                        return;
                    }
                }
                if (isFunctionLike(input) && resolver.isImplementationOfOverload(input))
                    return;
                if (isSemicolonClassElement(input))
                    return;
                let previousEnclosingDeclaration;
                if (isEnclosingDeclaration(input)) {
                    previousEnclosingDeclaration = enclosingDeclaration;
                    enclosingDeclaration = input;
                }
                const oldDiag = getSymbolAccessibilityDiagnostic;
                const canProduceDiagnostic = canProduceDiagnostics(input);
                const oldWithinObjectLiteralType = suppressNewDiagnosticContexts;
                let shouldEnterSuppressNewDiagnosticsContextContext = (input.kind === 184 /* TypeLiteral */ || input.kind === 197 /* MappedType */) && input.parent.kind !== 262 /* TypeAliasDeclaration */;
                if (isMethodDeclaration(input) || isMethodSignature(input)) {
                    if (hasEffectiveModifier(input, 8 /* Private */)) {
                        if (input.symbol && input.symbol.declarations && input.symbol.declarations[0] !== input)
                            return;
                        return cleanup(factory2.createPropertyDeclaration(ensureModifiers(input), input.name, 
                        /*questionToken*/
                        void 0, 
                        /*type*/
                        void 0, 
                        /*initializer*/
                        void 0));
                    }
                }
                if (canProduceDiagnostic && !suppressNewDiagnosticContexts) {
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input);
                }
                if (isTypeQueryNode(input)) {
                    checkEntityNameVisibility(input.exprName, enclosingDeclaration);
                }
                if (shouldEnterSuppressNewDiagnosticsContextContext) {
                    suppressNewDiagnosticContexts = true;
                }
                if (isProcessedComponent(input)) {
                    switch (input.kind) {
                        case 230 /* ExpressionWithTypeArguments */: {
                            if (isEntityName(input.expression) || isEntityNameExpression(input.expression)) {
                                checkEntityNameVisibility(input.expression, enclosingDeclaration);
                            }
                            const node = visitEachChild(input, visitDeclarationSubtree, context);
                            return cleanup(factory2.updateExpressionWithTypeArguments(node, node.expression, node.typeArguments));
                        }
                        case 180 /* TypeReference */: {
                            checkEntityNameVisibility(input.typeName, enclosingDeclaration);
                            const node = visitEachChild(input, visitDeclarationSubtree, context);
                            return cleanup(factory2.updateTypeReferenceNode(node, node.typeName, node.typeArguments));
                        }
                        case 177 /* ConstructSignature */:
                            return cleanup(factory2.updateConstructSignature(input, ensureTypeParams(input, input.typeParameters), updateParamsList(input, input.parameters), ensureType(input, input.type)));
                        case 173 /* Constructor */: {
                            const ctor = factory2.createConstructorDeclaration(
                            /*modifiers*/
                            ensureModifiers(input), updateParamsList(input, input.parameters, 0 /* None */), 
                            /*body*/
                            void 0);
                            return cleanup(ctor);
                        }
                        case 171 /* MethodDeclaration */: {
                            if (isPrivateIdentifier(input.name)) {
                                return cleanup(
                                /*returnValue*/
                                void 0);
                            }
                            const sig = factory2.createMethodDeclaration(ensureModifiers(input), 
                            /*asteriskToken*/
                            void 0, input.name, input.questionToken, ensureTypeParams(input, input.typeParameters), updateParamsList(input, input.parameters), ensureType(input, input.type), 
                            /*body*/
                            void 0);
                            return cleanup(sig);
                        }
                        case 174 /* GetAccessor */: {
                            if (isPrivateIdentifier(input.name)) {
                                return cleanup(
                                /*returnValue*/
                                void 0);
                            }
                            const accessorType = getTypeAnnotationFromAllAccessorDeclarations(input, resolver.getAllAccessorDeclarations(input));
                            return cleanup(factory2.updateGetAccessorDeclaration(input, ensureModifiers(input), input.name, updateAccessorParamsList(input, hasEffectiveModifier(input, 8 /* Private */)), ensureType(input, accessorType), 
                            /*body*/
                            void 0));
                        }
                        case 175 /* SetAccessor */: {
                            if (isPrivateIdentifier(input.name)) {
                                return cleanup(
                                /*returnValue*/
                                void 0);
                            }
                            return cleanup(factory2.updateSetAccessorDeclaration(input, ensureModifiers(input), input.name, updateAccessorParamsList(input, hasEffectiveModifier(input, 8 /* Private */)), 
                            /*body*/
                            void 0));
                        }
                        case 169 /* PropertyDeclaration */:
                            if (isPrivateIdentifier(input.name)) {
                                return cleanup(
                                /*returnValue*/
                                void 0);
                            }
                            return cleanup(factory2.updatePropertyDeclaration(input, ensureModifiers(input), input.name, input.questionToken, ensureType(input, input.type), ensureNoInitializer(input)));
                        case 168 /* PropertySignature */:
                            if (isPrivateIdentifier(input.name)) {
                                return cleanup(
                                /*returnValue*/
                                void 0);
                            }
                            return cleanup(factory2.updatePropertySignature(input, ensureModifiers(input), input.name, input.questionToken, ensureType(input, input.type)));
                        case 170 /* MethodSignature */: {
                            if (isPrivateIdentifier(input.name)) {
                                return cleanup(
                                /*returnValue*/
                                void 0);
                            }
                            return cleanup(factory2.updateMethodSignature(input, ensureModifiers(input), input.name, input.questionToken, ensureTypeParams(input, input.typeParameters), updateParamsList(input, input.parameters), ensureType(input, input.type)));
                        }
                        case 176 /* CallSignature */: {
                            return cleanup(factory2.updateCallSignature(input, ensureTypeParams(input, input.typeParameters), updateParamsList(input, input.parameters), ensureType(input, input.type)));
                        }
                        case 178 /* IndexSignature */: {
                            return cleanup(factory2.updateIndexSignature(input, ensureModifiers(input), updateParamsList(input, input.parameters), visitNode(input.type, visitDeclarationSubtree, isTypeNode) || factory2.createKeywordTypeNode(131 /* AnyKeyword */)));
                        }
                        case 257 /* VariableDeclaration */: {
                            if (isBindingPattern(input.name)) {
                                return recreateBindingPattern(input.name);
                            }
                            shouldEnterSuppressNewDiagnosticsContextContext = true;
                            suppressNewDiagnosticContexts = true;
                            return cleanup(factory2.updateVariableDeclaration(input, input.name, 
                            /*exclamationToken*/
                            void 0, ensureType(input, input.type), ensureNoInitializer(input)));
                        }
                        case 165 /* TypeParameter */: {
                            if (isPrivateMethodTypeParameter(input) && (input.default || input.constraint)) {
                                return cleanup(factory2.updateTypeParameterDeclaration(input, input.modifiers, input.name, 
                                /*constraint*/
                                void 0, 
                                /*defaultType*/
                                void 0));
                            }
                            return cleanup(visitEachChild(input, visitDeclarationSubtree, context));
                        }
                        case 191 /* ConditionalType */: {
                            const checkType = visitNode(input.checkType, visitDeclarationSubtree, isTypeNode);
                            const extendsType = visitNode(input.extendsType, visitDeclarationSubtree, isTypeNode);
                            const oldEnclosingDecl = enclosingDeclaration;
                            enclosingDeclaration = input.trueType;
                            const trueType = visitNode(input.trueType, visitDeclarationSubtree, isTypeNode);
                            enclosingDeclaration = oldEnclosingDecl;
                            const falseType = visitNode(input.falseType, visitDeclarationSubtree, isTypeNode);
                            Debug.assert(checkType);
                            Debug.assert(extendsType);
                            Debug.assert(trueType);
                            Debug.assert(falseType);
                            return cleanup(factory2.updateConditionalTypeNode(input, checkType, extendsType, trueType, falseType));
                        }
                        case 181 /* FunctionType */: {
                            return cleanup(factory2.updateFunctionTypeNode(input, visitNodes2(input.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration), updateParamsList(input, input.parameters), Debug.checkDefined(visitNode(input.type, visitDeclarationSubtree, isTypeNode))));
                        }
                        case 182 /* ConstructorType */: {
                            return cleanup(factory2.updateConstructorTypeNode(input, ensureModifiers(input), visitNodes2(input.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration), updateParamsList(input, input.parameters), Debug.checkDefined(visitNode(input.type, visitDeclarationSubtree, isTypeNode))));
                        }
                        case 202 /* ImportType */: {
                            if (!isLiteralImportTypeNode(input))
                                return cleanup(input);
                            return cleanup(factory2.updateImportTypeNode(input, factory2.updateLiteralTypeNode(input.argument, rewriteModuleSpecifier(input, input.argument.literal)), input.assertions, input.qualifier, visitNodes2(input.typeArguments, visitDeclarationSubtree, isTypeNode), input.isTypeOf));
                        }
                        default:
                            Debug.assertNever(input, `Attempted to process unhandled node kind: ${Debug.formatSyntaxKind(input.kind)}`);
                    }
                }
                if (isTupleTypeNode(input) && getLineAndCharacterOfPosition(currentSourceFile, input.pos).line === getLineAndCharacterOfPosition(currentSourceFile, input.end).line) {
                    setEmitFlags(input, 1 /* SingleLine */);
                }
                return cleanup(visitEachChild(input, visitDeclarationSubtree, context));
                function cleanup(returnValue) {
                    if (returnValue && canProduceDiagnostic && hasDynamicName(input)) {
                        checkName(input);
                    }
                    if (isEnclosingDeclaration(input)) {
                        enclosingDeclaration = previousEnclosingDeclaration;
                    }
                    if (canProduceDiagnostic && !suppressNewDiagnosticContexts) {
                        getSymbolAccessibilityDiagnostic = oldDiag;
                    }
                    if (shouldEnterSuppressNewDiagnosticsContextContext) {
                        suppressNewDiagnosticContexts = oldWithinObjectLiteralType;
                    }
                    if (returnValue === input) {
                        return returnValue;
                    }
                    return returnValue && setOriginalNode(preserveJsDoc(returnValue, input), input);
                }
            }
            function transformTopLevelDeclaration(input) {
                if (lateMarkedStatements) {
                    while (orderedRemoveItem(lateMarkedStatements, input))
                        ;
                }
                if (shouldStripInternal(input))
                    return;
                switch (input.kind) {
                    case 268 /* ImportEqualsDeclaration */: {
                        return transformImportEqualsDeclaration(input);
                    }
                    case 269 /* ImportDeclaration */: {
                        return transformImportDeclaration(input);
                    }
                }
                if (isDeclaration(input) && isDeclarationAndNotVisible(input))
                    return;
                if (isFunctionLike(input) && resolver.isImplementationOfOverload(input))
                    return;
                let previousEnclosingDeclaration;
                if (isEnclosingDeclaration(input)) {
                    previousEnclosingDeclaration = enclosingDeclaration;
                    enclosingDeclaration = input;
                }
                const canProdiceDiagnostic = canProduceDiagnostics(input);
                const oldDiag = getSymbolAccessibilityDiagnostic;
                if (canProdiceDiagnostic) {
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input);
                }
                const previousNeedsDeclare = needsDeclare;
                switch (input.kind) {
                    case 262 /* TypeAliasDeclaration */: {
                        needsDeclare = false;
                        const clean2 = cleanup(factory2.updateTypeAliasDeclaration(input, ensureModifiers(input), input.name, visitNodes2(input.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration), Debug.checkDefined(visitNode(input.type, visitDeclarationSubtree, isTypeNode))));
                        needsDeclare = previousNeedsDeclare;
                        return clean2;
                    }
                    case 261 /* InterfaceDeclaration */: {
                        return cleanup(factory2.updateInterfaceDeclaration(input, ensureModifiers(input), input.name, ensureTypeParams(input, input.typeParameters), transformHeritageClauses(input.heritageClauses), visitNodes2(input.members, visitDeclarationSubtree, isTypeElement)));
                    }
                    case 259 /* FunctionDeclaration */: {
                        const clean2 = cleanup(factory2.updateFunctionDeclaration(input, ensureModifiers(input), 
                        /*asteriskToken*/
                        void 0, input.name, ensureTypeParams(input, input.typeParameters), updateParamsList(input, input.parameters), ensureType(input, input.type), 
                        /*body*/
                        void 0));
                        if (clean2 && resolver.isExpandoFunctionDeclaration(input) && shouldEmitFunctionProperties(input)) {
                            const props = resolver.getPropertiesOfContainerFunction(input);
                            const fakespace = parseNodeFactory.createModuleDeclaration(
                            /*modifiers*/
                            void 0, clean2.name || factory2.createIdentifier("_default"), factory2.createModuleBlock([]), 16 /* Namespace */);
                            setParent(fakespace, enclosingDeclaration);
                            fakespace.locals = createSymbolTable(props);
                            fakespace.symbol = props[0].parent;
                            const exportMappings = [];
                            let declarations = mapDefined(props, (p) => {
                                if (!p.valueDeclaration || !isPropertyAccessExpression(p.valueDeclaration)) {
                                    return void 0;
                                }
                                getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(p.valueDeclaration);
                                const type = resolver.createTypeOfDeclaration(p.valueDeclaration, fakespace, declarationEmitNodeBuilderFlags, symbolTracker);
                                getSymbolAccessibilityDiagnostic = oldDiag;
                                const nameStr = unescapeLeadingUnderscores(p.escapedName);
                                const isNonContextualKeywordName = isStringANonContextualKeyword(nameStr);
                                const name = isNonContextualKeywordName ? factory2.getGeneratedNameForNode(p.valueDeclaration) : factory2.createIdentifier(nameStr);
                                if (isNonContextualKeywordName) {
                                    exportMappings.push([name, nameStr]);
                                }
                                const varDecl = factory2.createVariableDeclaration(name, 
                                /*exclamationToken*/
                                void 0, type, 
                                /*initializer*/
                                void 0);
                                return factory2.createVariableStatement(isNonContextualKeywordName ? void 0 : [factory2.createToken(93 /* ExportKeyword */)], factory2.createVariableDeclarationList([varDecl]));
                            });
                            if (!exportMappings.length) {
                                declarations = mapDefined(declarations, (declaration) => factory2.updateModifiers(declaration, 0 /* None */));
                            }
                            else {
                                declarations.push(factory2.createExportDeclaration(
                                /*modifiers*/
                                void 0, 
                                /*isTypeOnly*/
                                false, factory2.createNamedExports(map(exportMappings, ([gen, exp]) => {
                                    return factory2.createExportSpecifier(
                                    /*isTypeOnly*/
                                    false, gen, exp);
                                }))));
                            }
                            const namespaceDecl = factory2.createModuleDeclaration(ensureModifiers(input), input.name, factory2.createModuleBlock(declarations), 16 /* Namespace */);
                            if (!hasEffectiveModifier(clean2, 1024 /* Default */)) {
                                return [clean2, namespaceDecl];
                            }
                            const modifiers = factory2.createModifiersFromModifierFlags(getEffectiveModifierFlags(clean2) & ~1025 /* ExportDefault */ | 2 /* Ambient */);
                            const cleanDeclaration = factory2.updateFunctionDeclaration(clean2, modifiers, 
                            /*asteriskToken*/
                            void 0, clean2.name, clean2.typeParameters, clean2.parameters, clean2.type, 
                            /*body*/
                            void 0);
                            const namespaceDeclaration = factory2.updateModuleDeclaration(namespaceDecl, modifiers, namespaceDecl.name, namespaceDecl.body);
                            const exportDefaultDeclaration = factory2.createExportAssignment(
                            /*modifiers*/
                            void 0, 
                            /*isExportEquals*/
                            false, namespaceDecl.name);
                            if (isSourceFile(input.parent)) {
                                resultHasExternalModuleIndicator = true;
                            }
                            resultHasScopeMarker = true;
                            return [cleanDeclaration, namespaceDeclaration, exportDefaultDeclaration];
                        }
                        else {
                            return clean2;
                        }
                    }
                    case 264 /* ModuleDeclaration */: {
                        needsDeclare = false;
                        const inner = input.body;
                        if (inner && inner.kind === 265 /* ModuleBlock */) {
                            const oldNeedsScopeFix = needsScopeFixMarker;
                            const oldHasScopeFix = resultHasScopeMarker;
                            resultHasScopeMarker = false;
                            needsScopeFixMarker = false;
                            const statements = visitNodes2(inner.statements, visitDeclarationStatements, isStatement);
                            let lateStatements = transformAndReplaceLatePaintedStatements(statements);
                            if (input.flags & 16777216 /* Ambient */) {
                                needsScopeFixMarker = false;
                            }
                            if (!isGlobalScopeAugmentation(input) && !hasScopeMarker2(lateStatements) && !resultHasScopeMarker) {
                                if (needsScopeFixMarker) {
                                    lateStatements = factory2.createNodeArray([...lateStatements, createEmptyExports(factory2)]);
                                }
                                else {
                                    lateStatements = visitNodes2(lateStatements, stripExportModifiers, isStatement);
                                }
                            }
                            const body = factory2.updateModuleBlock(inner, lateStatements);
                            needsDeclare = previousNeedsDeclare;
                            needsScopeFixMarker = oldNeedsScopeFix;
                            resultHasScopeMarker = oldHasScopeFix;
                            const mods = ensureModifiers(input);
                            return cleanup(factory2.updateModuleDeclaration(input, mods, isExternalModuleAugmentation(input) ? rewriteModuleSpecifier(input, input.name) : input.name, body));
                        }
                        else {
                            needsDeclare = previousNeedsDeclare;
                            const mods = ensureModifiers(input);
                            needsDeclare = false;
                            visitNode(inner, visitDeclarationStatements);
                            const id = getOriginalNodeId(inner);
                            const body = lateStatementReplacementMap.get(id);
                            lateStatementReplacementMap.delete(id);
                            return cleanup(factory2.updateModuleDeclaration(input, mods, input.name, body));
                        }
                    }
                    case 260 /* ClassDeclaration */: {
                        errorNameNode = input.name;
                        errorFallbackNode = input;
                        const modifiers = factory2.createNodeArray(ensureModifiers(input));
                        const typeParameters = ensureTypeParams(input, input.typeParameters);
                        const ctor = getFirstConstructorWithBody(input);
                        let parameterProperties;
                        if (ctor) {
                            const oldDiag2 = getSymbolAccessibilityDiagnostic;
                            parameterProperties = compact(flatMap(ctor.parameters, (param) => {
                                if (!hasSyntacticModifier(param, 16476 /* ParameterPropertyModifier */) || shouldStripInternal(param))
                                    return;
                                getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(param);
                                if (param.name.kind === 79 /* Identifier */) {
                                    return preserveJsDoc(factory2.createPropertyDeclaration(ensureModifiers(param), param.name, param.questionToken, ensureType(param, param.type), ensureNoInitializer(param)), param);
                                }
                                else {
                                    return walkBindingPattern(param.name);
                                }
                                function walkBindingPattern(pattern) {
                                    let elems;
                                    for (const elem of pattern.elements) {
                                        if (isOmittedExpression(elem))
                                            continue;
                                        if (isBindingPattern(elem.name)) {
                                            elems = concatenate(elems, walkBindingPattern(elem.name));
                                        }
                                        elems = elems || [];
                                        elems.push(factory2.createPropertyDeclaration(ensureModifiers(param), elem.name, 
                                        /*questionToken*/
                                        void 0, ensureType(elem, 
                                        /*type*/
                                        void 0), 
                                        /*initializer*/
                                        void 0));
                                    }
                                    return elems;
                                }
                            }));
                            getSymbolAccessibilityDiagnostic = oldDiag2;
                        }
                        const hasPrivateIdentifier = some(input.members, (member) => !!member.name && isPrivateIdentifier(member.name));
                        const privateIdentifier = hasPrivateIdentifier ? [
                            factory2.createPropertyDeclaration(
                            /*modifiers*/
                            void 0, factory2.createPrivateIdentifier("#private"), 
                            /*questionToken*/
                            void 0, 
                            /*type*/
                            void 0, 
                            /*initializer*/
                            void 0)
                        ] : void 0;
                        const memberNodes = concatenate(concatenate(privateIdentifier, parameterProperties), visitNodes2(input.members, visitDeclarationSubtree, isClassElement));
                        const members = factory2.createNodeArray(memberNodes);
                        const extendsClause = getEffectiveBaseTypeNode(input);
                        if (extendsClause && !isEntityNameExpression(extendsClause.expression) && extendsClause.expression.kind !== 104 /* NullKeyword */) {
                            const oldId = input.name ? unescapeLeadingUnderscores(input.name.escapedText) : "default";
                            const newId = factory2.createUniqueName(`${oldId}_base`, 16 /* Optimistic */);
                            getSymbolAccessibilityDiagnostic = () => ({
                                diagnosticMessage: Diagnostics.extends_clause_of_exported_class_0_has_or_is_using_private_name_1,
                                errorNode: extendsClause,
                                typeName: input.name
                            });
                            const varDecl = factory2.createVariableDeclaration(newId, 
                            /*exclamationToken*/
                            void 0, resolver.createTypeOfExpression(extendsClause.expression, input, declarationEmitNodeBuilderFlags, symbolTracker), 
                            /*initializer*/
                            void 0);
                            const statement = factory2.createVariableStatement(needsDeclare ? [factory2.createModifier(136 /* DeclareKeyword */)] : [], factory2.createVariableDeclarationList([varDecl], 2 /* Const */));
                            const heritageClauses = factory2.createNodeArray(map(input.heritageClauses, (clause) => {
                                if (clause.token === 94 /* ExtendsKeyword */) {
                                    const oldDiag2 = getSymbolAccessibilityDiagnostic;
                                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(clause.types[0]);
                                    const newClause = factory2.updateHeritageClause(clause, map(clause.types, (t) => factory2.updateExpressionWithTypeArguments(t, newId, visitNodes2(t.typeArguments, visitDeclarationSubtree, isTypeNode))));
                                    getSymbolAccessibilityDiagnostic = oldDiag2;
                                    return newClause;
                                }
                                return factory2.updateHeritageClause(clause, visitNodes2(factory2.createNodeArray(filter(clause.types, (t) => isEntityNameExpression(t.expression) || t.expression.kind === 104 /* NullKeyword */)), visitDeclarationSubtree, isExpressionWithTypeArguments));
                            }));
                            return [statement, cleanup(factory2.updateClassDeclaration(input, modifiers, input.name, typeParameters, heritageClauses, members))];
                        }
                        else {
                            const heritageClauses = transformHeritageClauses(input.heritageClauses);
                            return cleanup(factory2.updateClassDeclaration(input, modifiers, input.name, typeParameters, heritageClauses, members));
                        }
                    }
                    case 240 /* VariableStatement */: {
                        return cleanup(transformVariableStatement(input));
                    }
                    case 263 /* EnumDeclaration */: {
                        return cleanup(factory2.updateEnumDeclaration(input, factory2.createNodeArray(ensureModifiers(input)), input.name, factory2.createNodeArray(mapDefined(input.members, (m) => {
                            if (shouldStripInternal(m))
                                return;
                            const constValue = resolver.getConstantValue(m);
                            return preserveJsDoc(factory2.updateEnumMember(m, m.name, constValue !== void 0 ? typeof constValue === "string" ? factory2.createStringLiteral(constValue) : factory2.createNumericLiteral(constValue) : void 0), m);
                        }))));
                    }
                }
                return Debug.assertNever(input, `Unhandled top-level node in declaration emit: ${Debug.formatSyntaxKind(input.kind)}`);
                function cleanup(node) {
                    if (isEnclosingDeclaration(input)) {
                        enclosingDeclaration = previousEnclosingDeclaration;
                    }
                    if (canProdiceDiagnostic) {
                        getSymbolAccessibilityDiagnostic = oldDiag;
                    }
                    if (input.kind === 264 /* ModuleDeclaration */) {
                        needsDeclare = previousNeedsDeclare;
                    }
                    if (node === input) {
                        return node;
                    }
                    errorFallbackNode = void 0;
                    errorNameNode = void 0;
                    return node && setOriginalNode(preserveJsDoc(node, input), input);
                }
            }