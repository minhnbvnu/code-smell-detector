function transformDeclarations(context) {
            const throwDiagnostic = () => Debug.fail("Diagnostic emitted without context");
            let getSymbolAccessibilityDiagnostic = throwDiagnostic;
            let needsDeclare = true;
            let isBundledEmit = false;
            let resultHasExternalModuleIndicator = false;
            let needsScopeFixMarker = false;
            let resultHasScopeMarker = false;
            let enclosingDeclaration;
            let necessaryTypeReferences;
            let lateMarkedStatements;
            let lateStatementReplacementMap;
            let suppressNewDiagnosticContexts;
            let exportedModulesFromDeclarationEmit;
            const { factory: factory2 } = context;
            const host = context.getEmitHost();
            const symbolTracker = {
                trackSymbol,
                reportInaccessibleThisError,
                reportInaccessibleUniqueSymbolError,
                reportCyclicStructureError,
                reportPrivateInBaseOfClassExpression,
                reportLikelyUnsafeImportRequiredError,
                reportTruncationError,
                moduleResolverHost: host,
                trackReferencedAmbientModule,
                trackExternalModuleSymbolOfImportTypeNode,
                reportNonlocalAugmentation,
                reportNonSerializableProperty,
                reportImportTypeNodeResolutionModeOverride
            };
            let errorNameNode;
            let errorFallbackNode;
            let currentSourceFile;
            let refs;
            let libs2;
            let emittedImports;
            const resolver = context.getEmitResolver();
            const options = context.getCompilerOptions();
            const { noResolve, stripInternal } = options;
            return transformRoot;
            function recordTypeReferenceDirectivesIfNecessary(typeReferenceDirectives) {
                if (!typeReferenceDirectives) {
                    return;
                }
                necessaryTypeReferences = necessaryTypeReferences || /* @__PURE__ */ new Set();
                for (const ref of typeReferenceDirectives) {
                    necessaryTypeReferences.add(ref);
                }
            }
            function trackReferencedAmbientModule(node, symbol) {
                const directives = resolver.getTypeReferenceDirectivesForSymbol(symbol, 67108863 /* All */);
                if (length(directives)) {
                    return recordTypeReferenceDirectivesIfNecessary(directives);
                }
                const container = getSourceFileOfNode(node);
                refs.set(getOriginalNodeId(container), container);
            }
            function handleSymbolAccessibilityError(symbolAccessibilityResult) {
                if (symbolAccessibilityResult.accessibility === 0 /* Accessible */) {
                    if (symbolAccessibilityResult && symbolAccessibilityResult.aliasesToMakeVisible) {
                        if (!lateMarkedStatements) {
                            lateMarkedStatements = symbolAccessibilityResult.aliasesToMakeVisible;
                        }
                        else {
                            for (const ref of symbolAccessibilityResult.aliasesToMakeVisible) {
                                pushIfUnique(lateMarkedStatements, ref);
                            }
                        }
                    }
                }
                else {
                    const errorInfo = getSymbolAccessibilityDiagnostic(symbolAccessibilityResult);
                    if (errorInfo) {
                        if (errorInfo.typeName) {
                            context.addDiagnostic(createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode, errorInfo.diagnosticMessage, getTextOfNode(errorInfo.typeName), symbolAccessibilityResult.errorSymbolName, symbolAccessibilityResult.errorModuleName));
                        }
                        else {
                            context.addDiagnostic(createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode, errorInfo.diagnosticMessage, symbolAccessibilityResult.errorSymbolName, symbolAccessibilityResult.errorModuleName));
                        }
                        return true;
                    }
                }
                return false;
            }
            function trackExternalModuleSymbolOfImportTypeNode(symbol) {
                if (!isBundledEmit) {
                    (exportedModulesFromDeclarationEmit || (exportedModulesFromDeclarationEmit = [])).push(symbol);
                }
            }
            function trackSymbol(symbol, enclosingDeclaration2, meaning) {
                if (symbol.flags & 262144 /* TypeParameter */)
                    return false;
                const issuedDiagnostic = handleSymbolAccessibilityError(resolver.isSymbolAccessible(symbol, enclosingDeclaration2, meaning, 
                /*shouldComputeAliasesToMakeVisible*/
                true));
                recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForSymbol(symbol, meaning));
                return issuedDiagnostic;
            }
            function reportPrivateInBaseOfClassExpression(propertyName) {
                if (errorNameNode || errorFallbackNode) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.Property_0_of_exported_class_expression_may_not_be_private_or_protected, propertyName));
                }
            }
            function errorDeclarationNameWithFallback() {
                return errorNameNode ? declarationNameToString(errorNameNode) : errorFallbackNode && getNameOfDeclaration(errorFallbackNode) ? declarationNameToString(getNameOfDeclaration(errorFallbackNode)) : errorFallbackNode && isExportAssignment(errorFallbackNode) ? errorFallbackNode.isExportEquals ? "export=" : "default" : "(Missing)";
            }
            function reportInaccessibleUniqueSymbolError() {
                if (errorNameNode || errorFallbackNode) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, errorDeclarationNameWithFallback(), "unique symbol"));
                }
            }
            function reportCyclicStructureError() {
                if (errorNameNode || errorFallbackNode) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialized_A_type_annotation_is_necessary, errorDeclarationNameWithFallback()));
                }
            }
            function reportInaccessibleThisError() {
                if (errorNameNode || errorFallbackNode) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, errorDeclarationNameWithFallback(), "this"));
                }
            }
            function reportLikelyUnsafeImportRequiredError(specifier) {
                if (errorNameNode || errorFallbackNode) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_1_This_is_likely_not_portable_A_type_annotation_is_necessary, errorDeclarationNameWithFallback(), specifier));
                }
            }
            function reportTruncationError() {
                if (errorNameNode || errorFallbackNode) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_type_annotation_is_needed));
                }
            }
            function reportNonlocalAugmentation(containingFile, parentSymbol, symbol) {
                var _a2;
                const primaryDeclaration = (_a2 = parentSymbol.declarations) == null ? void 0 : _a2.find((d) => getSourceFileOfNode(d) === containingFile);
                const augmentingDeclarations = filter(symbol.declarations, (d) => getSourceFileOfNode(d) !== containingFile);
                if (primaryDeclaration && augmentingDeclarations) {
                    for (const augmentations of augmentingDeclarations) {
                        context.addDiagnostic(addRelatedInfo(createDiagnosticForNode(augmentations, Diagnostics.Declaration_augments_declaration_in_another_file_This_cannot_be_serialized), createDiagnosticForNode(primaryDeclaration, Diagnostics.This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_file)));
                    }
                }
            }
            function reportNonSerializableProperty(propertyName) {
                if (errorNameNode || errorFallbackNode) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.The_type_of_this_node_cannot_be_serialized_because_its_property_0_cannot_be_serialized, propertyName));
                }
            }
            function reportImportTypeNodeResolutionModeOverride() {
                if (!isNightly() && (errorNameNode || errorFallbackNode)) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.The_type_of_this_expression_cannot_be_named_without_a_resolution_mode_assertion_which_is_an_unstable_feature_Use_nightly_TypeScript_to_silence_this_error_Try_updating_with_npm_install_D_typescript_next));
                }
            }
            function transformDeclarationsForJS(sourceFile, bundled) {
                const oldDiag = getSymbolAccessibilityDiagnostic;
                getSymbolAccessibilityDiagnostic = (s) => s.errorNode && canProduceDiagnostics(s.errorNode) ? createGetSymbolAccessibilityDiagnosticForNode(s.errorNode)(s) : {
                    diagnosticMessage: s.errorModuleName ? Diagnostics.Declaration_emit_for_this_file_requires_using_private_name_0_from_module_1_An_explicit_type_annotation_may_unblock_declaration_emit : Diagnostics.Declaration_emit_for_this_file_requires_using_private_name_0_An_explicit_type_annotation_may_unblock_declaration_emit,
                    errorNode: s.errorNode || sourceFile
                };
                const result = resolver.getDeclarationStatementsForSourceFile(sourceFile, declarationEmitNodeBuilderFlags, symbolTracker, bundled);
                getSymbolAccessibilityDiagnostic = oldDiag;
                return result;
            }
            function transformRoot(node) {
                if (node.kind === 308 /* SourceFile */ && node.isDeclarationFile) {
                    return node;
                }
                if (node.kind === 309 /* Bundle */) {
                    isBundledEmit = true;
                    refs = /* @__PURE__ */ new Map();
                    libs2 = /* @__PURE__ */ new Map();
                    let hasNoDefaultLib = false;
                    const bundle = factory2.createBundle(map(node.sourceFiles, (sourceFile) => {
                        if (sourceFile.isDeclarationFile)
                            return void 0;
                        hasNoDefaultLib = hasNoDefaultLib || sourceFile.hasNoDefaultLib;
                        currentSourceFile = sourceFile;
                        enclosingDeclaration = sourceFile;
                        lateMarkedStatements = void 0;
                        suppressNewDiagnosticContexts = false;
                        lateStatementReplacementMap = /* @__PURE__ */ new Map();
                        getSymbolAccessibilityDiagnostic = throwDiagnostic;
                        needsScopeFixMarker = false;
                        resultHasScopeMarker = false;
                        collectReferences(sourceFile, refs);
                        collectLibs(sourceFile, libs2);
                        if (isExternalOrCommonJsModule(sourceFile) || isJsonSourceFile(sourceFile)) {
                            resultHasExternalModuleIndicator = false;
                            needsDeclare = false;
                            const statements = isSourceFileJS(sourceFile) ? factory2.createNodeArray(transformDeclarationsForJS(sourceFile, 
                            /*bundled*/
                            true)) : visitNodes2(sourceFile.statements, visitDeclarationStatements, isStatement);
                            const newFile = factory2.updateSourceFile(sourceFile, [factory2.createModuleDeclaration([factory2.createModifier(136 /* DeclareKeyword */)], factory2.createStringLiteral(getResolvedExternalModuleName(context.getEmitHost(), sourceFile)), factory2.createModuleBlock(setTextRange(factory2.createNodeArray(transformAndReplaceLatePaintedStatements(statements)), sourceFile.statements)))], 
                            /*isDeclarationFile*/
                            true, 
                            /*referencedFiles*/
                            [], 
                            /*typeReferences*/
                            [], 
                            /*hasNoDefaultLib*/
                            false, 
                            /*libReferences*/
                            []);
                            return newFile;
                        }
                        needsDeclare = true;
                        const updated2 = isSourceFileJS(sourceFile) ? factory2.createNodeArray(transformDeclarationsForJS(sourceFile)) : visitNodes2(sourceFile.statements, visitDeclarationStatements, isStatement);
                        return factory2.updateSourceFile(sourceFile, transformAndReplaceLatePaintedStatements(updated2), 
                        /*isDeclarationFile*/
                        true, 
                        /*referencedFiles*/
                        [], 
                        /*typeReferences*/
                        [], 
                        /*hasNoDefaultLib*/
                        false, 
                        /*libReferences*/
                        []);
                    }), mapDefined(node.prepends, (prepend) => {
                        if (prepend.kind === 311 /* InputFiles */) {
                            const sourceFile = createUnparsedSourceFile(prepend, "dts", stripInternal);
                            hasNoDefaultLib = hasNoDefaultLib || !!sourceFile.hasNoDefaultLib;
                            collectReferences(sourceFile, refs);
                            recordTypeReferenceDirectivesIfNecessary(map(sourceFile.typeReferenceDirectives, (ref) => [ref.fileName, ref.resolutionMode]));
                            collectLibs(sourceFile, libs2);
                            return sourceFile;
                        }
                        return prepend;
                    }));
                    bundle.syntheticFileReferences = [];
                    bundle.syntheticTypeReferences = getFileReferencesForUsedTypeReferences();
                    bundle.syntheticLibReferences = getLibReferences();
                    bundle.hasNoDefaultLib = hasNoDefaultLib;
                    const outputFilePath2 = getDirectoryPath(normalizeSlashes(getOutputPathsFor(node, host, 
                    /*forceDtsPaths*/
                    true).declarationFilePath));
                    const referenceVisitor2 = mapReferencesIntoArray(bundle.syntheticFileReferences, outputFilePath2);
                    refs.forEach(referenceVisitor2);
                    return bundle;
                }
                needsDeclare = true;
                needsScopeFixMarker = false;
                resultHasScopeMarker = false;
                enclosingDeclaration = node;
                currentSourceFile = node;
                getSymbolAccessibilityDiagnostic = throwDiagnostic;
                isBundledEmit = false;
                resultHasExternalModuleIndicator = false;
                suppressNewDiagnosticContexts = false;
                lateMarkedStatements = void 0;
                lateStatementReplacementMap = /* @__PURE__ */ new Map();
                necessaryTypeReferences = void 0;
                refs = collectReferences(currentSourceFile, /* @__PURE__ */ new Map());
                libs2 = collectLibs(currentSourceFile, /* @__PURE__ */ new Map());
                const references = [];
                const outputFilePath = getDirectoryPath(normalizeSlashes(getOutputPathsFor(node, host, 
                /*forceDtsPaths*/
                true).declarationFilePath));
                const referenceVisitor = mapReferencesIntoArray(references, outputFilePath);
                let combinedStatements;
                if (isSourceFileJS(currentSourceFile)) {
                    combinedStatements = factory2.createNodeArray(transformDeclarationsForJS(node));
                    refs.forEach(referenceVisitor);
                    emittedImports = filter(combinedStatements, isAnyImportSyntax);
                }
                else {
                    const statements = visitNodes2(node.statements, visitDeclarationStatements, isStatement);
                    combinedStatements = setTextRange(factory2.createNodeArray(transformAndReplaceLatePaintedStatements(statements)), node.statements);
                    refs.forEach(referenceVisitor);
                    emittedImports = filter(combinedStatements, isAnyImportSyntax);
                    if (isExternalModule(node) && (!resultHasExternalModuleIndicator || needsScopeFixMarker && !resultHasScopeMarker)) {
                        combinedStatements = setTextRange(factory2.createNodeArray([...combinedStatements, createEmptyExports(factory2)]), combinedStatements);
                    }
                }
                const updated = factory2.updateSourceFile(node, combinedStatements, 
                /*isDeclarationFile*/
                true, references, getFileReferencesForUsedTypeReferences(), node.hasNoDefaultLib, getLibReferences());
                updated.exportedModulesFromDeclarationEmit = exportedModulesFromDeclarationEmit;
                return updated;
                function getLibReferences() {
                    return arrayFrom(libs2.keys(), (lib) => ({ fileName: lib, pos: -1, end: -1 }));
                }
                function getFileReferencesForUsedTypeReferences() {
                    return necessaryTypeReferences ? mapDefined(arrayFrom(necessaryTypeReferences.keys()), getFileReferenceForSpecifierModeTuple) : [];
                }
                function getFileReferenceForSpecifierModeTuple([typeName, mode]) {
                    if (emittedImports) {
                        for (const importStatement of emittedImports) {
                            if (isImportEqualsDeclaration(importStatement) && isExternalModuleReference(importStatement.moduleReference)) {
                                const expr = importStatement.moduleReference.expression;
                                if (isStringLiteralLike(expr) && expr.text === typeName) {
                                    return void 0;
                                }
                            }
                            else if (isImportDeclaration(importStatement) && isStringLiteral(importStatement.moduleSpecifier) && importStatement.moduleSpecifier.text === typeName) {
                                return void 0;
                            }
                        }
                    }
                    return { fileName: typeName, pos: -1, end: -1, ...mode ? { resolutionMode: mode } : void 0 };
                }
                function mapReferencesIntoArray(references2, outputFilePath2) {
                    return (file) => {
                        let declFileName;
                        if (file.isDeclarationFile) {
                            declFileName = file.fileName;
                        }
                        else {
                            if (isBundledEmit && contains(node.sourceFiles, file))
                                return;
                            const paths = getOutputPathsFor(file, host, 
                            /*forceDtsPaths*/
                            true);
                            declFileName = paths.declarationFilePath || paths.jsFilePath || file.fileName;
                        }
                        if (declFileName) {
                            const specifier = getModuleSpecifier(options, currentSourceFile, toPath(outputFilePath2, host.getCurrentDirectory(), host.getCanonicalFileName), toPath(declFileName, host.getCurrentDirectory(), host.getCanonicalFileName), host);
                            if (!pathIsRelative(specifier)) {
                                recordTypeReferenceDirectivesIfNecessary([[
                                        specifier,
                                        /*mode*/
                                        void 0
                                    ]]);
                                return;
                            }
                            let fileName = getRelativePathToDirectoryOrUrl(outputFilePath2, declFileName, host.getCurrentDirectory(), host.getCanonicalFileName, 
                            /*isAbsolutePathAnUrl*/
                            false);
                            if (startsWith(fileName, "./") && hasExtension(fileName)) {
                                fileName = fileName.substring(2);
                            }
                            if (startsWith(fileName, "node_modules/") || pathContainsNodeModules(fileName)) {
                                return;
                            }
                            references2.push({ pos: -1, end: -1, fileName });
                        }
                    };
                }
            }
            function collectReferences(sourceFile, ret) {
                if (noResolve || !isUnparsedSource(sourceFile) && isSourceFileJS(sourceFile))
                    return ret;
                forEach(sourceFile.referencedFiles, (f) => {
                    const elem = host.getSourceFileFromReference(sourceFile, f);
                    if (elem) {
                        ret.set(getOriginalNodeId(elem), elem);
                    }
                });
                return ret;
            }
            function collectLibs(sourceFile, ret) {
                forEach(sourceFile.libReferenceDirectives, (ref) => {
                    const lib = host.getLibFileFromReference(ref);
                    if (lib) {
                        ret.set(toFileNameLowerCase(ref.fileName), true);
                    }
                });
                return ret;
            }
            function filterBindingPatternInitializersAndRenamings(name) {
                if (name.kind === 79 /* Identifier */) {
                    return name;
                }
                else {
                    if (name.kind === 204 /* ArrayBindingPattern */) {
                        return factory2.updateArrayBindingPattern(name, visitNodes2(name.elements, visitBindingElement, isArrayBindingElement));
                    }
                    else {
                        return factory2.updateObjectBindingPattern(name, visitNodes2(name.elements, visitBindingElement, isBindingElement));
                    }
                }
                function visitBindingElement(elem) {
                    if (elem.kind === 229 /* OmittedExpression */) {
                        return elem;
                    }
                    if (elem.propertyName && isIdentifier(elem.propertyName) && isIdentifier(elem.name) && !elem.symbol.isReferenced && !isIdentifierANonContextualKeyword(elem.propertyName)) {
                        return factory2.updateBindingElement(elem, elem.dotDotDotToken, 
                        /* propertyName */
                        void 0, elem.propertyName, shouldPrintWithInitializer(elem) ? elem.initializer : void 0);
                    }
                    return factory2.updateBindingElement(elem, elem.dotDotDotToken, elem.propertyName, filterBindingPatternInitializersAndRenamings(elem.name), shouldPrintWithInitializer(elem) ? elem.initializer : void 0);
                }
            }
            function ensureParameter(p, modifierMask, type) {
                let oldDiag;
                if (!suppressNewDiagnosticContexts) {
                    oldDiag = getSymbolAccessibilityDiagnostic;
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(p);
                }
                const newParam = factory2.updateParameterDeclaration(p, maskModifiers(p, modifierMask), p.dotDotDotToken, filterBindingPatternInitializersAndRenamings(p.name), resolver.isOptionalParameter(p) ? p.questionToken || factory2.createToken(57 /* QuestionToken */) : void 0, ensureType(p, type || p.type, 
                /*ignorePrivate*/
                true), 
                // Ignore private param props, since this type is going straight back into a param
                ensureNoInitializer(p));
                if (!suppressNewDiagnosticContexts) {
                    getSymbolAccessibilityDiagnostic = oldDiag;
                }
                return newParam;
            }
            function shouldPrintWithInitializer(node) {
                return canHaveLiteralInitializer(node) && resolver.isLiteralConstDeclaration(getParseTreeNode(node));
            }
            function ensureNoInitializer(node) {
                if (shouldPrintWithInitializer(node)) {
                    return resolver.createLiteralConstValue(getParseTreeNode(node), symbolTracker);
                }
                return void 0;
            }
            function ensureType(node, type, ignorePrivate) {
                if (!ignorePrivate && hasEffectiveModifier(node, 8 /* Private */)) {
                    return;
                }
                if (shouldPrintWithInitializer(node)) {
                    return;
                }
                const shouldUseResolverType = node.kind === 166 /* Parameter */ && (resolver.isRequiredInitializedParameter(node) || resolver.isOptionalUninitializedParameterProperty(node));
                if (type && !shouldUseResolverType) {
                    return visitNode(type, visitDeclarationSubtree, isTypeNode);
                }
                if (!getParseTreeNode(node)) {
                    return type ? visitNode(type, visitDeclarationSubtree, isTypeNode) : factory2.createKeywordTypeNode(131 /* AnyKeyword */);
                }
                if (node.kind === 175 /* SetAccessor */) {
                    return factory2.createKeywordTypeNode(131 /* AnyKeyword */);
                }
                errorNameNode = node.name;
                let oldDiag;
                if (!suppressNewDiagnosticContexts) {
                    oldDiag = getSymbolAccessibilityDiagnostic;
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(node);
                }
                if (node.kind === 257 /* VariableDeclaration */ || node.kind === 205 /* BindingElement */) {
                    return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));
                }
                if (node.kind === 166 /* Parameter */ || node.kind === 169 /* PropertyDeclaration */ || node.kind === 168 /* PropertySignature */) {
                    if (isPropertySignature(node) || !node.initializer)
                        return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker, shouldUseResolverType));
                    return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker, shouldUseResolverType) || resolver.createTypeOfExpression(node.initializer, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));
                }
                return cleanup(resolver.createReturnTypeOfSignatureDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));
                function cleanup(returnValue) {
                    errorNameNode = void 0;
                    if (!suppressNewDiagnosticContexts) {
                        getSymbolAccessibilityDiagnostic = oldDiag;
                    }
                    return returnValue || factory2.createKeywordTypeNode(131 /* AnyKeyword */);
                }
            }
            function isDeclarationAndNotVisible(node) {
                node = getParseTreeNode(node);
                switch (node.kind) {
                    case 259 /* FunctionDeclaration */:
                    case 264 /* ModuleDeclaration */:
                    case 261 /* InterfaceDeclaration */:
                    case 260 /* ClassDeclaration */:
                    case 262 /* TypeAliasDeclaration */:
                    case 263 /* EnumDeclaration */:
                        return !resolver.isDeclarationVisible(node);
                    case 257 /* VariableDeclaration */:
                        return !getBindingNameVisible(node);
                    case 268 /* ImportEqualsDeclaration */:
                    case 269 /* ImportDeclaration */:
                    case 275 /* ExportDeclaration */:
                    case 274 /* ExportAssignment */:
                        return false;
                    case 172 /* ClassStaticBlockDeclaration */:
                        return true;
                }
                return false;
            }
            function shouldEmitFunctionProperties(input) {
                var _a2;
                if (input.body) {
                    return true;
                }
                const overloadSignatures = (_a2 = input.symbol.declarations) == null ? void 0 : _a2.filter((decl) => isFunctionDeclaration(decl) && !decl.body);
                return !overloadSignatures || overloadSignatures.indexOf(input) === overloadSignatures.length - 1;
            }
            function getBindingNameVisible(elem) {
                if (isOmittedExpression(elem)) {
                    return false;
                }
                if (isBindingPattern(elem.name)) {
                    return some(elem.name.elements, getBindingNameVisible);
                }
                else {
                    return resolver.isDeclarationVisible(elem);
                }
            }
            function updateParamsList(node, params, modifierMask) {
                if (hasEffectiveModifier(node, 8 /* Private */)) {
                    return factory2.createNodeArray();
                }
                const newParams = map(params, (p) => ensureParameter(p, modifierMask));
                if (!newParams) {
                    return factory2.createNodeArray();
                }
                return factory2.createNodeArray(newParams, params.hasTrailingComma);
            }
            function updateAccessorParamsList(input, isPrivate) {
                let newParams;
                if (!isPrivate) {
                    const thisParameter = getThisParameter(input);
                    if (thisParameter) {
                        newParams = [ensureParameter(thisParameter)];
                    }
                }
                if (isSetAccessorDeclaration(input)) {
                    let newValueParameter;
                    if (!isPrivate) {
                        const valueParameter = getSetAccessorValueParameter(input);
                        if (valueParameter) {
                            const accessorType = getTypeAnnotationFromAllAccessorDeclarations(input, resolver.getAllAccessorDeclarations(input));
                            newValueParameter = ensureParameter(valueParameter, 
                            /*modifierMask*/
                            void 0, accessorType);
                        }
                    }
                    if (!newValueParameter) {
                        newValueParameter = factory2.createParameterDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*dotDotDotToken*/
                        void 0, "value");
                    }
                    newParams = append(newParams, newValueParameter);
                }
                return factory2.createNodeArray(newParams || emptyArray);
            }
            function ensureTypeParams(node, params) {
                return hasEffectiveModifier(node, 8 /* Private */) ? void 0 : visitNodes2(params, visitDeclarationSubtree, isTypeParameterDeclaration);
            }
            function isEnclosingDeclaration(node) {
                return isSourceFile(node) || isTypeAliasDeclaration(node) || isModuleDeclaration(node) || isClassDeclaration(node) || isInterfaceDeclaration(node) || isFunctionLike(node) || isIndexSignatureDeclaration(node) || isMappedTypeNode(node);
            }
            function checkEntityNameVisibility(entityName, enclosingDeclaration2) {
                const visibilityResult = resolver.isEntityNameVisible(entityName, enclosingDeclaration2);
                handleSymbolAccessibilityError(visibilityResult);
                recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForEntityName(entityName));
            }
            function preserveJsDoc(updated, original) {
                if (hasJSDocNodes(updated) && hasJSDocNodes(original)) {
                    updated.jsDoc = original.jsDoc;
                }
                return setCommentRange(updated, getCommentRange(original));
            }
            function rewriteModuleSpecifier(parent2, input) {
                if (!input)
                    return void 0;
                resultHasExternalModuleIndicator = resultHasExternalModuleIndicator || parent2.kind !== 264 /* ModuleDeclaration */ && parent2.kind !== 202 /* ImportType */;
                if (isStringLiteralLike(input)) {
                    if (isBundledEmit) {
                        const newName = getExternalModuleNameFromDeclaration(context.getEmitHost(), resolver, parent2);
                        if (newName) {
                            return factory2.createStringLiteral(newName);
                        }
                    }
                    else {
                        const symbol = resolver.getSymbolOfExternalModuleSpecifier(input);
                        if (symbol) {
                            (exportedModulesFromDeclarationEmit || (exportedModulesFromDeclarationEmit = [])).push(symbol);
                        }
                    }
                }
                return input;
            }
            function transformImportEqualsDeclaration(decl) {
                if (!resolver.isDeclarationVisible(decl))
                    return;
                if (decl.moduleReference.kind === 280 /* ExternalModuleReference */) {
                    const specifier = getExternalModuleImportEqualsDeclarationExpression(decl);
                    return factory2.updateImportEqualsDeclaration(decl, decl.modifiers, decl.isTypeOnly, decl.name, factory2.updateExternalModuleReference(decl.moduleReference, rewriteModuleSpecifier(decl, specifier)));
                }
                else {
                    const oldDiag = getSymbolAccessibilityDiagnostic;
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(decl);
                    checkEntityNameVisibility(decl.moduleReference, enclosingDeclaration);
                    getSymbolAccessibilityDiagnostic = oldDiag;
                    return decl;
                }
            }
            function transformImportDeclaration(decl) {
                if (!decl.importClause) {
                    return factory2.updateImportDeclaration(decl, decl.modifiers, decl.importClause, rewriteModuleSpecifier(decl, decl.moduleSpecifier), getResolutionModeOverrideForClauseInNightly(decl.assertClause));
                }
                const visibleDefaultBinding = decl.importClause && decl.importClause.name && resolver.isDeclarationVisible(decl.importClause) ? decl.importClause.name : void 0;
                if (!decl.importClause.namedBindings) {
                    return visibleDefaultBinding && factory2.updateImportDeclaration(decl, decl.modifiers, factory2.updateImportClause(decl.importClause, decl.importClause.isTypeOnly, visibleDefaultBinding, 
                    /*namedBindings*/
                    void 0), rewriteModuleSpecifier(decl, decl.moduleSpecifier), getResolutionModeOverrideForClauseInNightly(decl.assertClause));
                }
                if (decl.importClause.namedBindings.kind === 271 /* NamespaceImport */) {
                    const namedBindings = resolver.isDeclarationVisible(decl.importClause.namedBindings) ? decl.importClause.namedBindings : (
                    /*namedBindings*/
                    void 0);
                    return visibleDefaultBinding || namedBindings ? factory2.updateImportDeclaration(decl, decl.modifiers, factory2.updateImportClause(decl.importClause, decl.importClause.isTypeOnly, visibleDefaultBinding, namedBindings), rewriteModuleSpecifier(decl, decl.moduleSpecifier), getResolutionModeOverrideForClauseInNightly(decl.assertClause)) : void 0;
                }
                const bindingList = mapDefined(decl.importClause.namedBindings.elements, (b) => resolver.isDeclarationVisible(b) ? b : void 0);
                if (bindingList && bindingList.length || visibleDefaultBinding) {
                    return factory2.updateImportDeclaration(decl, decl.modifiers, factory2.updateImportClause(decl.importClause, decl.importClause.isTypeOnly, visibleDefaultBinding, bindingList && bindingList.length ? factory2.updateNamedImports(decl.importClause.namedBindings, bindingList) : void 0), rewriteModuleSpecifier(decl, decl.moduleSpecifier), getResolutionModeOverrideForClauseInNightly(decl.assertClause));
                }
                if (resolver.isImportRequiredByAugmentation(decl)) {
                    return factory2.updateImportDeclaration(decl, decl.modifiers, 
                    /*importClause*/
                    void 0, rewriteModuleSpecifier(decl, decl.moduleSpecifier), getResolutionModeOverrideForClauseInNightly(decl.assertClause));
                }
            }
            function getResolutionModeOverrideForClauseInNightly(assertClause) {
                const mode = getResolutionModeOverrideForClause(assertClause);
                if (mode !== void 0) {
                    if (!isNightly()) {
                        context.addDiagnostic(createDiagnosticForNode(assertClause, Diagnostics.resolution_mode_assertions_are_unstable_Use_nightly_TypeScript_to_silence_this_error_Try_updating_with_npm_install_D_typescript_next));
                    }
                    return assertClause;
                }
                return void 0;
            }
            function transformAndReplaceLatePaintedStatements(statements) {
                while (length(lateMarkedStatements)) {
                    const i = lateMarkedStatements.shift();
                    if (!isLateVisibilityPaintedStatement(i)) {
                        return Debug.fail(`Late replaced statement was found which is not handled by the declaration transformer!: ${Debug.formatSyntaxKind(i.kind)}`);
                    }
                    const priorNeedsDeclare = needsDeclare;
                    needsDeclare = i.parent && isSourceFile(i.parent) && !(isExternalModule(i.parent) && isBundledEmit);
                    const result = transformTopLevelDeclaration(i);
                    needsDeclare = priorNeedsDeclare;
                    lateStatementReplacementMap.set(getOriginalNodeId(i), result);
                }
                return visitNodes2(statements, visitLateVisibilityMarkedStatements, isStatement);
                function visitLateVisibilityMarkedStatements(statement) {
                    if (isLateVisibilityPaintedStatement(statement)) {
                        const key = getOriginalNodeId(statement);
                        if (lateStatementReplacementMap.has(key)) {
                            const result = lateStatementReplacementMap.get(key);
                            lateStatementReplacementMap.delete(key);
                            if (result) {
                                if (isArray(result) ? some(result, needsScopeMarker) : needsScopeMarker(result)) {
                                    needsScopeFixMarker = true;
                                }
                                if (isSourceFile(statement.parent) && (isArray(result) ? some(result, isExternalModuleIndicator) : isExternalModuleIndicator(result))) {
                                    resultHasExternalModuleIndicator = true;
                                }
                            }
                            return result;
                        }
                    }
                    return statement;
                }
            }
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
            function isPrivateMethodTypeParameter(node) {
                return node.parent.kind === 171 /* MethodDeclaration */ && hasEffectiveModifier(node.parent, 8 /* Private */);
            }
            function visitDeclarationStatements(input) {
                if (!isPreservedDeclarationStatement(input)) {
                    return;
                }
                if (shouldStripInternal(input))
                    return;
                switch (input.kind) {
                    case 275 /* ExportDeclaration */: {
                        if (isSourceFile(input.parent)) {
                            resultHasExternalModuleIndicator = true;
                        }
                        resultHasScopeMarker = true;
                        return factory2.updateExportDeclaration(input, input.modifiers, input.isTypeOnly, input.exportClause, rewriteModuleSpecifier(input, input.moduleSpecifier), getResolutionModeOverrideForClause(input.assertClause) ? input.assertClause : void 0);
                    }
                    case 274 /* ExportAssignment */: {
                        if (isSourceFile(input.parent)) {
                            resultHasExternalModuleIndicator = true;
                        }
                        resultHasScopeMarker = true;
                        if (input.expression.kind === 79 /* Identifier */) {
                            return input;
                        }
                        else {
                            const newId = factory2.createUniqueName("_default", 16 /* Optimistic */);
                            getSymbolAccessibilityDiagnostic = () => ({
                                diagnosticMessage: Diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0,
                                errorNode: input
                            });
                            errorFallbackNode = input;
                            const varDecl = factory2.createVariableDeclaration(newId, 
                            /*exclamationToken*/
                            void 0, resolver.createTypeOfExpression(input.expression, input, declarationEmitNodeBuilderFlags, symbolTracker), 
                            /*initializer*/
                            void 0);
                            errorFallbackNode = void 0;
                            const statement = factory2.createVariableStatement(needsDeclare ? [factory2.createModifier(136 /* DeclareKeyword */)] : [], factory2.createVariableDeclarationList([varDecl], 2 /* Const */));
                            preserveJsDoc(statement, input);
                            removeAllComments(input);
                            return [statement, factory2.updateExportAssignment(input, input.modifiers, newId)];
                        }
                    }
                }
                const result = transformTopLevelDeclaration(input);
                lateStatementReplacementMap.set(getOriginalNodeId(input), result);
                return input;
            }
            function stripExportModifiers(statement) {
                if (isImportEqualsDeclaration(statement) || hasEffectiveModifier(statement, 1024 /* Default */) || !canHaveModifiers(statement)) {
                    return statement;
                }
                const modifiers = factory2.createModifiersFromModifierFlags(getEffectiveModifierFlags(statement) & (258047 /* All */ ^ 1 /* Export */));
                return factory2.updateModifiers(statement, modifiers);
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
            function transformVariableStatement(input) {
                if (!forEach(input.declarationList.declarations, getBindingNameVisible))
                    return;
                const nodes = visitNodes2(input.declarationList.declarations, visitDeclarationSubtree, isVariableDeclaration);
                if (!length(nodes))
                    return;
                return factory2.updateVariableStatement(input, factory2.createNodeArray(ensureModifiers(input)), factory2.updateVariableDeclarationList(input.declarationList, nodes));
            }
            function recreateBindingPattern(d) {
                return flatten(mapDefined(d.elements, (e) => recreateBindingElement(e)));
            }
            function recreateBindingElement(e) {
                if (e.kind === 229 /* OmittedExpression */) {
                    return;
                }
                if (e.name) {
                    if (!getBindingNameVisible(e))
                        return;
                    if (isBindingPattern(e.name)) {
                        return recreateBindingPattern(e.name);
                    }
                    else {
                        return factory2.createVariableDeclaration(e.name, 
                        /*exclamationToken*/
                        void 0, ensureType(e, 
                        /*type*/
                        void 0), 
                        /*initializer*/
                        void 0);
                    }
                }
            }
            function checkName(node) {
                let oldDiag;
                if (!suppressNewDiagnosticContexts) {
                    oldDiag = getSymbolAccessibilityDiagnostic;
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNodeName(node);
                }
                errorNameNode = node.name;
                Debug.assert(resolver.isLateBound(getParseTreeNode(node)));
                const decl = node;
                const entityName = decl.name.expression;
                checkEntityNameVisibility(entityName, enclosingDeclaration);
                if (!suppressNewDiagnosticContexts) {
                    getSymbolAccessibilityDiagnostic = oldDiag;
                }
                errorNameNode = void 0;
            }
            function shouldStripInternal(node) {
                return !!stripInternal && !!node && isInternalDeclaration(node, currentSourceFile);
            }
            function isScopeMarker2(node) {
                return isExportAssignment(node) || isExportDeclaration(node);
            }
            function hasScopeMarker2(statements) {
                return some(statements, isScopeMarker2);
            }
            function ensureModifiers(node) {
                const currentFlags = getEffectiveModifierFlags(node);
                const newFlags = ensureModifierFlags(node);
                if (currentFlags === newFlags) {
                    return visitArray(node.modifiers, (n) => tryCast(n, isModifier), isModifier);
                }
                return factory2.createModifiersFromModifierFlags(newFlags);
            }
            function ensureModifierFlags(node) {
                let mask2 = 258047 /* All */ ^ (4 /* Public */ | 512 /* Async */ | 16384 /* Override */);
                let additions = needsDeclare && !isAlwaysType(node) ? 2 /* Ambient */ : 0 /* None */;
                const parentIsFile = node.parent.kind === 308 /* SourceFile */;
                if (!parentIsFile || isBundledEmit && parentIsFile && isExternalModule(node.parent)) {
                    mask2 ^= 2 /* Ambient */;
                    additions = 0 /* None */;
                }
                return maskModifierFlags(node, mask2, additions);
            }
            function getTypeAnnotationFromAllAccessorDeclarations(node, accessors) {
                let accessorType = getTypeAnnotationFromAccessor(node);
                if (!accessorType && node !== accessors.firstAccessor) {
                    accessorType = getTypeAnnotationFromAccessor(accessors.firstAccessor);
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(accessors.firstAccessor);
                }
                if (!accessorType && accessors.secondAccessor && node !== accessors.secondAccessor) {
                    accessorType = getTypeAnnotationFromAccessor(accessors.secondAccessor);
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(accessors.secondAccessor);
                }
                return accessorType;
            }
            function transformHeritageClauses(nodes) {
                return factory2.createNodeArray(filter(map(nodes, (clause) => factory2.updateHeritageClause(clause, visitNodes2(factory2.createNodeArray(filter(clause.types, (t) => {
                    return isEntityNameExpression(t.expression) || clause.token === 94 /* ExtendsKeyword */ && t.expression.kind === 104 /* NullKeyword */;
                })), visitDeclarationSubtree, isExpressionWithTypeArguments))), (clause) => clause.types && !!clause.types.length));
            }
        }