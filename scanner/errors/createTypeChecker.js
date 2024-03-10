            function lookupOrIssueError(location, message, arg0, arg1, arg2, arg3) {
            function errorSkippedOn(key, location, message, arg0, arg1, arg2, arg3) {
            function createError(location, message, arg0, arg1, arg2, arg3) {
            function error(location, message, arg0, arg1, arg2, arg3) {
            function errorOrSuggestion(isError, location, message, arg0, arg1, arg2, arg3) {
            function errorAndMaybeSuggestAwait(location, maybeMissingAwait, message, arg0, arg1, arg2, arg3) {
            function mergeSymbol(target, source, unidirectional = false) {
                if (!(target.flags & getExcludedSymbolFlags(source.flags)) || (source.flags | target.flags) & 67108864 /* Assignment */) {
                    if (source === target) {
                        return target;
                    }
                    if (!(target.flags & 33554432 /* Transient */)) {
                        const resolvedTarget = resolveSymbol(target);
                        if (resolvedTarget === unknownSymbol) {
                            return source;
                        }
                        target = cloneSymbol(resolvedTarget);
                    }
                    if (source.flags & 512 /* ValueModule */ && target.flags & 512 /* ValueModule */ && target.constEnumOnlyModule && !source.constEnumOnlyModule) {
                        target.constEnumOnlyModule = false;
                    }
                    target.flags |= source.flags;
                    if (source.valueDeclaration) {
                        setValueDeclaration(target, source.valueDeclaration);
                    }
                    addRange(target.declarations, source.declarations);
                    if (source.members) {
                        if (!target.members)
                            target.members = createSymbolTable();
                        mergeSymbolTable(target.members, source.members, unidirectional);
                    }
                    if (source.exports) {
                        if (!target.exports)
                            target.exports = createSymbolTable();
                        mergeSymbolTable(target.exports, source.exports, unidirectional);
                    }
                    if (!unidirectional) {
                        recordMergedSymbol(target, source);
                    }
                }
                else if (target.flags & 1024 /* NamespaceModule */) {
                    if (target !== globalThisSymbol) {
                        error(source.declarations && getNameOfDeclaration(source.declarations[0]), Diagnostics.Cannot_augment_module_0_with_value_exports_because_it_resolves_to_a_non_module_entity, symbolToString(target));
                    }
                }
                else {
                    const isEitherEnum = !!(target.flags & 384 /* Enum */ || source.flags & 384 /* Enum */);
                    const isEitherBlockScoped = !!(target.flags & 2 /* BlockScopedVariable */ || source.flags & 2 /* BlockScopedVariable */);
                    const message = isEitherEnum ? Diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations : isEitherBlockScoped ? Diagnostics.Cannot_redeclare_block_scoped_variable_0 : Diagnostics.Duplicate_identifier_0;
                    const sourceSymbolFile = source.declarations && getSourceFileOfNode(source.declarations[0]);
                    const targetSymbolFile = target.declarations && getSourceFileOfNode(target.declarations[0]);
                    const isSourcePlainJs = isPlainJsFile(sourceSymbolFile, compilerOptions.checkJs);
                    const isTargetPlainJs = isPlainJsFile(targetSymbolFile, compilerOptions.checkJs);
                    const symbolName2 = symbolToString(source);
                    if (sourceSymbolFile && targetSymbolFile && amalgamatedDuplicates && !isEitherEnum && sourceSymbolFile !== targetSymbolFile) {
                        const firstFile = comparePaths(sourceSymbolFile.path, targetSymbolFile.path) === -1 /* LessThan */ ? sourceSymbolFile : targetSymbolFile;
                        const secondFile = firstFile === sourceSymbolFile ? targetSymbolFile : sourceSymbolFile;
                        const filesDuplicates = getOrUpdate(amalgamatedDuplicates, `${firstFile.path}|${secondFile.path}`, () => ({ firstFile, secondFile, conflictingSymbols: /* @__PURE__ */ new Map() }));
                        const conflictingSymbolInfo = getOrUpdate(filesDuplicates.conflictingSymbols, symbolName2, () => ({ isBlockScoped: isEitherBlockScoped, firstFileLocations: [], secondFileLocations: [] }));
                        if (!isSourcePlainJs)
                            addDuplicateLocations(conflictingSymbolInfo.firstFileLocations, source);
                        if (!isTargetPlainJs)
                            addDuplicateLocations(conflictingSymbolInfo.secondFileLocations, target);
                    }
                    else {
                        if (!isSourcePlainJs)
                            addDuplicateDeclarationErrorsForSymbols(source, message, symbolName2, target);
                        if (!isTargetPlainJs)
                            addDuplicateDeclarationErrorsForSymbols(target, message, symbolName2, source);
                    }
                }
                return target;
                function addDuplicateLocations(locs, symbol) {
                    if (symbol.declarations) {
                        for (const decl of symbol.declarations) {
                            pushIfUnique(locs, decl);
                        }
                    }
                }
            }
            function isBlockScopedNameDeclaredBeforeUse(declaration, usage) {
                const declarationFile = getSourceFileOfNode(declaration);
                const useFile = getSourceFileOfNode(usage);
                const declContainer = getEnclosingBlockScopeContainer(declaration);
                if (declarationFile !== useFile) {
                    if (moduleKind && (declarationFile.externalModuleIndicator || useFile.externalModuleIndicator) || !outFile(compilerOptions) || isInTypeQuery(usage) || declaration.flags & 16777216 /* Ambient */) {
                        return true;
                    }
                    if (isUsedInFunctionOrInstanceProperty(usage, declaration)) {
                        return true;
                    }
                    const sourceFiles = host.getSourceFiles();
                    return sourceFiles.indexOf(declarationFile) <= sourceFiles.indexOf(useFile);
                }
                if (declaration.pos <= usage.pos && !(isPropertyDeclaration(declaration) && isThisProperty(usage.parent) && !declaration.initializer && !declaration.exclamationToken)) {
                    if (declaration.kind === 205 /* BindingElement */) {
                        const errorBindingElement = getAncestor(usage, 205 /* BindingElement */);
                        if (errorBindingElement) {
                            return findAncestor(errorBindingElement, isBindingElement) !== findAncestor(declaration, isBindingElement) || declaration.pos < errorBindingElement.pos;
                        }
                        return isBlockScopedNameDeclaredBeforeUse(getAncestor(declaration, 257 /* VariableDeclaration */), usage);
                    }
                    else if (declaration.kind === 257 /* VariableDeclaration */) {
                        return !isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration, usage);
                    }
                    else if (isClassDeclaration(declaration)) {
                        return !findAncestor(usage, (n) => isComputedPropertyName(n) && n.parent.parent === declaration);
                    }
                    else if (isPropertyDeclaration(declaration)) {
                        return !isPropertyImmediatelyReferencedWithinDeclaration(declaration, usage, 
                        /*stopAtAnyPropertyDeclaration*/
                        false);
                    }
                    else if (isParameterPropertyDeclaration(declaration, declaration.parent)) {
                        return !(getEmitScriptTarget(compilerOptions) === 99 /* ESNext */ && useDefineForClassFields && getContainingClass(declaration) === getContainingClass(usage) && isUsedInFunctionOrInstanceProperty(usage, declaration));
                    }
                    return true;
                }
                if (usage.parent.kind === 278 /* ExportSpecifier */ || usage.parent.kind === 274 /* ExportAssignment */ && usage.parent.isExportEquals) {
                    return true;
                }
                if (usage.kind === 274 /* ExportAssignment */ && usage.isExportEquals) {
                    return true;
                }
                if (!!(usage.flags & 8388608 /* JSDoc */) || isInTypeQuery(usage) || isInAmbientOrTypeNode(usage)) {
                    return true;
                }
                if (isUsedInFunctionOrInstanceProperty(usage, declaration)) {
                    if (getEmitScriptTarget(compilerOptions) === 99 /* ESNext */ && useDefineForClassFields && getContainingClass(declaration) && (isPropertyDeclaration(declaration) || isParameterPropertyDeclaration(declaration, declaration.parent))) {
                        return !isPropertyImmediatelyReferencedWithinDeclaration(declaration, usage, 
                        /*stopAtAnyPropertyDeclaration*/
                        true);
                    }
                    else {
                        return true;
                    }
                }
                return false;
                function isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration2, usage2) {
                    switch (declaration2.parent.parent.kind) {
                        case 240 /* VariableStatement */:
                        case 245 /* ForStatement */:
                        case 247 /* ForOfStatement */:
                            if (isSameScopeDescendentOf(usage2, declaration2, declContainer)) {
                                return true;
                            }
                            break;
                    }
                    const grandparent = declaration2.parent.parent;
                    return isForInOrOfStatement(grandparent) && isSameScopeDescendentOf(usage2, grandparent.expression, declContainer);
                }
                function isUsedInFunctionOrInstanceProperty(usage2, declaration2) {
                    return !!findAncestor(usage2, (current) => {
                        if (current === declContainer) {
                            return "quit";
                        }
                        if (isFunctionLike(current)) {
                            return true;
                        }
                        if (isClassStaticBlockDeclaration(current)) {
                            return declaration2.pos < usage2.pos;
                        }
                        const propertyDeclaration = tryCast(current.parent, isPropertyDeclaration);
                        if (propertyDeclaration) {
                            const initializerOfProperty = propertyDeclaration.initializer === current;
                            if (initializerOfProperty) {
                                if (isStatic(current.parent)) {
                                    if (declaration2.kind === 171 /* MethodDeclaration */) {
                                        return true;
                                    }
                                    if (isPropertyDeclaration(declaration2) && getContainingClass(usage2) === getContainingClass(declaration2)) {
                                        const propName = declaration2.name;
                                        if (isIdentifier(propName) || isPrivateIdentifier(propName)) {
                                            const type = getTypeOfSymbol(getSymbolOfDeclaration(declaration2));
                                            const staticBlocks = filter(declaration2.parent.members, isClassStaticBlockDeclaration);
                                            if (isPropertyInitializedInStaticBlocks(propName, type, staticBlocks, declaration2.parent.pos, current.pos)) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                                else {
                                    const isDeclarationInstanceProperty = declaration2.kind === 169 /* PropertyDeclaration */ && !isStatic(declaration2);
                                    if (!isDeclarationInstanceProperty || getContainingClass(usage2) !== getContainingClass(declaration2)) {
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    });
                }
                function isPropertyImmediatelyReferencedWithinDeclaration(declaration2, usage2, stopAtAnyPropertyDeclaration) {
                    if (usage2.end > declaration2.end) {
                        return false;
                    }
                    const ancestorChangingReferenceScope = findAncestor(usage2, (node) => {
                        if (node === declaration2) {
                            return "quit";
                        }
                        switch (node.kind) {
                            case 216 /* ArrowFunction */:
                                return true;
                            case 169 /* PropertyDeclaration */:
                                return stopAtAnyPropertyDeclaration && (isPropertyDeclaration(declaration2) && node.parent === declaration2.parent || isParameterPropertyDeclaration(declaration2, declaration2.parent) && node.parent === declaration2.parent.parent) ? "quit" : true;
                            case 238 /* Block */:
                                switch (node.parent.kind) {
                                    case 174 /* GetAccessor */:
                                    case 171 /* MethodDeclaration */:
                                    case 175 /* SetAccessor */:
                                        return true;
                                    default:
                                        return false;
                                }
                            default:
                                return false;
                        }
                    });
                    return ancestorChangingReferenceScope === void 0;
                }
            }
            function resolveName(location, name, meaning, nameNotFoundMessage, nameArg, isUse, excludeGlobals = false, getSpellingSuggestions = true) {
            function resolveNameHelper(location, name, meaning, nameNotFoundMessage, nameArg, isUse, excludeGlobals, getSpellingSuggestions, lookup) {
                var _a2, _b, _c;
                const originalLocation = location;
                let result;
                let lastLocation;
                let lastSelfReferenceLocation;
                let propertyWithInvalidInitializer;
                let associatedDeclarationForContainingInitializerOrBindingName;
                let withinDeferredContext = false;
                const errorLocation = location;
                let grandparent;
                let isInExternalModule = false;
                loop: while (location) {
                    if (name === "const" && isConstAssertion(location)) {
                        return void 0;
                    }
                    if (canHaveLocals(location) && location.locals && !isGlobalSourceFile(location)) {
                        if (result = lookup(location.locals, name, meaning)) {
                            let useResult = true;
                            if (isFunctionLike(location) && lastLocation && lastLocation !== location.body) {
                                if (meaning & result.flags & 788968 /* Type */ && lastLocation.kind !== 323 /* JSDoc */) {
                                    useResult = result.flags & 262144 /* TypeParameter */ ? lastLocation === location.type || lastLocation.kind === 166 /* Parameter */ || lastLocation.kind === 344 /* JSDocParameterTag */ || lastLocation.kind === 345 /* JSDocReturnTag */ || lastLocation.kind === 165 /* TypeParameter */ : false;
                                }
                                if (meaning & result.flags & 3 /* Variable */) {
                                    if (useOuterVariableScopeInParameter(result, location, lastLocation)) {
                                        useResult = false;
                                    }
                                    else if (result.flags & 1 /* FunctionScopedVariable */) {
                                        useResult = lastLocation.kind === 166 /* Parameter */ || lastLocation === location.type && !!findAncestor(result.valueDeclaration, isParameter);
                                    }
                                }
                            }
                            else if (location.kind === 191 /* ConditionalType */) {
                                useResult = lastLocation === location.trueType;
                            }
                            if (useResult) {
                                break loop;
                            }
                            else {
                                result = void 0;
                            }
                        }
                    }
                    withinDeferredContext = withinDeferredContext || getIsDeferredContext(location, lastLocation);
                    switch (location.kind) {
                        case 308 /* SourceFile */:
                            if (!isExternalOrCommonJsModule(location))
                                break;
                            isInExternalModule = true;
                        case 264 /* ModuleDeclaration */:
                            const moduleExports = ((_a2 = getSymbolOfDeclaration(location)) == null ? void 0 : _a2.exports) || emptySymbols;
                            if (location.kind === 308 /* SourceFile */ || isModuleDeclaration(location) && location.flags & 16777216 /* Ambient */ && !isGlobalScopeAugmentation(location)) {
                                if (result = moduleExports.get("default" /* Default */)) {
                                    const localSymbol = getLocalSymbolForExportDefault(result);
                                    if (localSymbol && result.flags & meaning && localSymbol.escapedName === name) {
                                        break loop;
                                    }
                                    result = void 0;
                                }
                                const moduleExport = moduleExports.get(name);
                                if (moduleExport && moduleExport.flags === 2097152 /* Alias */ && (getDeclarationOfKind(moduleExport, 278 /* ExportSpecifier */) || getDeclarationOfKind(moduleExport, 277 /* NamespaceExport */))) {
                                    break;
                                }
                            }
                            if (name !== "default" /* Default */ && (result = lookup(moduleExports, name, meaning & 2623475 /* ModuleMember */))) {
                                if (isSourceFile(location) && location.commonJsModuleIndicator && !((_b = result.declarations) == null ? void 0 : _b.some(isJSDocTypeAlias))) {
                                    result = void 0;
                                }
                                else {
                                    break loop;
                                }
                            }
                            break;
                        case 263 /* EnumDeclaration */:
                            if (result = lookup(((_c = getSymbolOfDeclaration(location)) == null ? void 0 : _c.exports) || emptySymbols, name, meaning & 8 /* EnumMember */)) {
                                if (nameNotFoundMessage && getIsolatedModules(compilerOptions) && !(location.flags & 16777216 /* Ambient */) && getSourceFileOfNode(location) !== getSourceFileOfNode(result.valueDeclaration)) {
                                    error(errorLocation, Diagnostics.Cannot_access_0_from_another_file_without_qualification_when_1_is_enabled_Use_2_instead, unescapeLeadingUnderscores(name), isolatedModulesLikeFlagName, `${unescapeLeadingUnderscores(getSymbolOfNode(location).escapedName)}.${unescapeLeadingUnderscores(name)}`);
                                }
                                break loop;
                            }
                            break;
                        case 169 /* PropertyDeclaration */:
                            if (!isStatic(location)) {
                                const ctor = findConstructorDeclaration(location.parent);
                                if (ctor && ctor.locals) {
                                    if (lookup(ctor.locals, name, meaning & 111551 /* Value */)) {
                                        Debug.assertNode(location, isPropertyDeclaration);
                                        propertyWithInvalidInitializer = location;
                                    }
                                }
                            }
                            break;
                        case 260 /* ClassDeclaration */:
                        case 228 /* ClassExpression */:
                        case 261 /* InterfaceDeclaration */:
                            if (result = lookup(getSymbolOfDeclaration(location).members || emptySymbols, name, meaning & 788968 /* Type */)) {
                                if (!isTypeParameterSymbolDeclaredInContainer(result, location)) {
                                    result = void 0;
                                    break;
                                }
                                if (lastLocation && isStatic(lastLocation)) {
                                    if (nameNotFoundMessage) {
                                        error(errorLocation, Diagnostics.Static_members_cannot_reference_class_type_parameters);
                                    }
                                    return void 0;
                                }
                                break loop;
                            }
                            if (isClassExpression(location) && meaning & 32 /* Class */) {
                                const className = location.name;
                                if (className && name === className.escapedText) {
                                    result = location.symbol;
                                    break loop;
                                }
                            }
                            break;
                        case 230 /* ExpressionWithTypeArguments */:
                            if (lastLocation === location.expression && location.parent.token === 94 /* ExtendsKeyword */) {
                                const container = location.parent.parent;
                                if (isClassLike(container) && (result = lookup(getSymbolOfDeclaration(container).members, name, meaning & 788968 /* Type */))) {
                                    if (nameNotFoundMessage) {
                                        error(errorLocation, Diagnostics.Base_class_expressions_cannot_reference_class_type_parameters);
                                    }
                                    return void 0;
                                }
                            }
                            break;
                        case 164 /* ComputedPropertyName */:
                            grandparent = location.parent.parent;
                            if (isClassLike(grandparent) || grandparent.kind === 261 /* InterfaceDeclaration */) {
                                if (result = lookup(getSymbolOfDeclaration(grandparent).members, name, meaning & 788968 /* Type */)) {
                                    if (nameNotFoundMessage) {
                                        error(errorLocation, Diagnostics.A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type);
                                    }
                                    return void 0;
                                }
                            }
                            break;
                        case 216 /* ArrowFunction */:
                            if (getEmitScriptTarget(compilerOptions) >= 2 /* ES2015 */) {
                                break;
                            }
                        case 171 /* MethodDeclaration */:
                        case 173 /* Constructor */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                        case 259 /* FunctionDeclaration */:
                            if (meaning & 3 /* Variable */ && name === "arguments") {
                                result = argumentsSymbol;
                                break loop;
                            }
                            break;
                        case 215 /* FunctionExpression */:
                            if (meaning & 3 /* Variable */ && name === "arguments") {
                                result = argumentsSymbol;
                                break loop;
                            }
                            if (meaning & 16 /* Function */) {
                                const functionName = location.name;
                                if (functionName && name === functionName.escapedText) {
                                    result = location.symbol;
                                    break loop;
                                }
                            }
                            break;
                        case 167 /* Decorator */:
                            if (location.parent && location.parent.kind === 166 /* Parameter */) {
                                location = location.parent;
                            }
                            if (location.parent && (isClassElement(location.parent) || location.parent.kind === 260 /* ClassDeclaration */)) {
                                location = location.parent;
                            }
                            break;
                        case 349 /* JSDocTypedefTag */:
                        case 341 /* JSDocCallbackTag */:
                        case 343 /* JSDocEnumTag */:
                            const root = getJSDocRoot(location);
                            if (root) {
                                location = root.parent;
                            }
                            break;
                        case 166 /* Parameter */:
                            if (lastLocation && (lastLocation === location.initializer || lastLocation === location.name && isBindingPattern(lastLocation))) {
                                if (!associatedDeclarationForContainingInitializerOrBindingName) {
                                    associatedDeclarationForContainingInitializerOrBindingName = location;
                                }
                            }
                            break;
                        case 205 /* BindingElement */:
                            if (lastLocation && (lastLocation === location.initializer || lastLocation === location.name && isBindingPattern(lastLocation))) {
                                if (isParameterDeclaration(location) && !associatedDeclarationForContainingInitializerOrBindingName) {
                                    associatedDeclarationForContainingInitializerOrBindingName = location;
                                }
                            }
                            break;
                        case 192 /* InferType */:
                            if (meaning & 262144 /* TypeParameter */) {
                                const parameterName = location.typeParameter.name;
                                if (parameterName && name === parameterName.escapedText) {
                                    result = location.typeParameter.symbol;
                                    break loop;
                                }
                            }
                            break;
                    }
                    if (isSelfReferenceLocation(location)) {
                        lastSelfReferenceLocation = location;
                    }
                    lastLocation = location;
                    location = isJSDocTemplateTag(location) ? getEffectiveContainerForJSDocTemplateTag(location) || location.parent : isJSDocParameterTag(location) || isJSDocReturnTag(location) ? getHostSignatureFromJSDoc(location) || location.parent : location.parent;
                }
                if (isUse && result && (!lastSelfReferenceLocation || result !== lastSelfReferenceLocation.symbol)) {
                    result.isReferenced |= meaning;
                }
                if (!result) {
                    if (lastLocation) {
                        Debug.assertNode(lastLocation, isSourceFile);
                        if (lastLocation.commonJsModuleIndicator && name === "exports" && meaning & lastLocation.symbol.flags) {
                            return lastLocation.symbol;
                        }
                    }
                    if (!excludeGlobals) {
                        result = lookup(globals, name, meaning);
                    }
                }
                if (!result) {
                    if (originalLocation && isInJSFile(originalLocation) && originalLocation.parent) {
                        if (isRequireCall(originalLocation.parent, 
                        /*checkArgumentIsStringLiteralLike*/
                        false)) {
                            return requireSymbol;
                        }
                    }
                }
                function checkAndReportErrorForInvalidInitializer() {
                    if (propertyWithInvalidInitializer && !(useDefineForClassFields && getEmitScriptTarget(compilerOptions) >= 9 /* ES2022 */)) {
                        error(errorLocation, errorLocation && propertyWithInvalidInitializer.type && textRangeContainsPositionInclusive(propertyWithInvalidInitializer.type, errorLocation.pos) ? Diagnostics.Type_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor : Diagnostics.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor, declarationNameToString(propertyWithInvalidInitializer.name), diagnosticName(nameArg));
                        return true;
                    }
                    return false;
                }
                if (!result) {
                    if (nameNotFoundMessage) {
                        addLazyDiagnostic(() => {
                            if (!errorLocation || !checkAndReportErrorForMissingPrefix(errorLocation, name, nameArg) && // TODO: GH#18217
                                !checkAndReportErrorForInvalidInitializer() && !checkAndReportErrorForExtendingInterface(errorLocation) && !checkAndReportErrorForUsingTypeAsNamespace(errorLocation, name, meaning) && !checkAndReportErrorForExportingPrimitiveType(errorLocation, name) && !checkAndReportErrorForUsingNamespaceAsTypeOrValue(errorLocation, name, meaning) && !checkAndReportErrorForUsingTypeAsValue(errorLocation, name, meaning) && !checkAndReportErrorForUsingValueAsType(errorLocation, name, meaning)) {
                                let suggestion;
                                let suggestedLib;
                                if (nameArg) {
                                    suggestedLib = getSuggestedLibForNonExistentName(nameArg);
                                    if (suggestedLib) {
                                        error(errorLocation, nameNotFoundMessage, diagnosticName(nameArg), suggestedLib);
                                    }
                                }
                                if (!suggestedLib && getSpellingSuggestions && suggestionCount < maximumSuggestionCount) {
                                    suggestion = getSuggestedSymbolForNonexistentSymbol(originalLocation, name, meaning);
                                    const isGlobalScopeAugmentationDeclaration = (suggestion == null ? void 0 : suggestion.valueDeclaration) && isAmbientModule(suggestion.valueDeclaration) && isGlobalScopeAugmentation(suggestion.valueDeclaration);
                                    if (isGlobalScopeAugmentationDeclaration) {
                                        suggestion = void 0;
                                    }
                                    if (suggestion) {
                                        const suggestionName = symbolToString(suggestion);
                                        const isUncheckedJS = isUncheckedJSSuggestion(originalLocation, suggestion, 
                                        /*excludeClasses*/
                                        false);
                                        const message = meaning === 1920 /* Namespace */ || nameArg && typeof nameArg !== "string" && nodeIsSynthesized(nameArg) ? Diagnostics.Cannot_find_namespace_0_Did_you_mean_1 : isUncheckedJS ? Diagnostics.Could_not_find_name_0_Did_you_mean_1 : Diagnostics.Cannot_find_name_0_Did_you_mean_1;
                                        const diagnostic = createError(errorLocation, message, diagnosticName(nameArg), suggestionName);
                                        addErrorOrSuggestion(!isUncheckedJS, diagnostic);
                                        if (suggestion.valueDeclaration) {
                                            addRelatedInfo(diagnostic, createDiagnosticForNode(suggestion.valueDeclaration, Diagnostics._0_is_declared_here, suggestionName));
                                        }
                                    }
                                }
                                if (!suggestion && !suggestedLib && nameArg) {
                                    error(errorLocation, nameNotFoundMessage, diagnosticName(nameArg));
                                }
                                suggestionCount++;
                            }
                        });
                    }
                    return void 0;
                }
                else if (nameNotFoundMessage && checkAndReportErrorForInvalidInitializer()) {
                    return void 0;
                }
                if (nameNotFoundMessage) {
                    addLazyDiagnostic(() => {
                        if (errorLocation && (meaning & 2 /* BlockScopedVariable */ || (meaning & 32 /* Class */ || meaning & 384 /* Enum */) && (meaning & 111551 /* Value */) === 111551 /* Value */)) {
                            const exportOrLocalSymbol = getExportSymbolOfValueSymbolIfExported(result);
                            if (exportOrLocalSymbol.flags & 2 /* BlockScopedVariable */ || exportOrLocalSymbol.flags & 32 /* Class */ || exportOrLocalSymbol.flags & 384 /* Enum */) {
                                checkResolvedBlockScopedVariable(exportOrLocalSymbol, errorLocation);
                            }
                        }
                        if (result && isInExternalModule && (meaning & 111551 /* Value */) === 111551 /* Value */ && !(originalLocation.flags & 8388608 /* JSDoc */)) {
                            const merged = getMergedSymbol(result);
                            if (length(merged.declarations) && every(merged.declarations, (d) => isNamespaceExportDeclaration(d) || isSourceFile(d) && !!d.symbol.globalExports)) {
                                errorOrSuggestion(!compilerOptions.allowUmdGlobalAccess, errorLocation, Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead, unescapeLeadingUnderscores(name));
                            }
                        }
                        if (result && associatedDeclarationForContainingInitializerOrBindingName && !withinDeferredContext && (meaning & 111551 /* Value */) === 111551 /* Value */) {
                            const candidate = getMergedSymbol(getLateBoundSymbol(result));
                            const root = getRootDeclaration(associatedDeclarationForContainingInitializerOrBindingName);
                            if (candidate === getSymbolOfDeclaration(associatedDeclarationForContainingInitializerOrBindingName)) {
                                error(errorLocation, Diagnostics.Parameter_0_cannot_reference_itself, declarationNameToString(associatedDeclarationForContainingInitializerOrBindingName.name));
                            }
                            else if (candidate.valueDeclaration && candidate.valueDeclaration.pos > associatedDeclarationForContainingInitializerOrBindingName.pos && root.parent.locals && lookup(root.parent.locals, candidate.escapedName, meaning) === candidate) {
                                error(errorLocation, Diagnostics.Parameter_0_cannot_reference_identifier_1_declared_after_it, declarationNameToString(associatedDeclarationForContainingInitializerOrBindingName.name), declarationNameToString(errorLocation));
                            }
                        }
                        if (result && errorLocation && meaning & 111551 /* Value */ && result.flags & 2097152 /* Alias */ && !(result.flags & 111551 /* Value */) && !isValidTypeOnlyAliasUseSite(errorLocation)) {
                            const typeOnlyDeclaration = getTypeOnlyAliasDeclaration(result, 111551 /* Value */);
                            if (typeOnlyDeclaration) {
                                const message = typeOnlyDeclaration.kind === 278 /* ExportSpecifier */ || typeOnlyDeclaration.kind === 275 /* ExportDeclaration */ || typeOnlyDeclaration.kind === 277 /* NamespaceExport */ ? Diagnostics._0_cannot_be_used_as_a_value_because_it_was_exported_using_export_type : Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type;
                                const unescapedName = unescapeLeadingUnderscores(name);
                                addTypeOnlyDeclarationRelatedInfo(error(errorLocation, message, unescapedName), typeOnlyDeclaration, unescapedName);
                            }
                        }
                    });
                }
                return result;
            }
            function isAliasSymbolDeclaration2(node) {
                return node.kind === 268 /* ImportEqualsDeclaration */ || node.kind === 267 /* NamespaceExportDeclaration */ || node.kind === 270 /* ImportClause */ && !!node.name || node.kind === 271 /* NamespaceImport */ || node.kind === 277 /* NamespaceExport */ || node.kind === 273 /* ImportSpecifier */ || node.kind === 278 /* ExportSpecifier */ || node.kind === 274 /* ExportAssignment */ && exportAssignmentIsAlias(node) || isBinaryExpression(node) && getAssignmentDeclarationKind(node) === 2 /* ModuleExports */ && exportAssignmentIsAlias(node) || isAccessExpression(node) && isBinaryExpression(node.parent) && node.parent.left === node && node.parent.operatorToken.kind === 63 /* EqualsToken */ && isAliasableOrJsExpression(node.parent.right) || node.kind === 300 /* ShorthandPropertyAssignment */ || node.kind === 299 /* PropertyAssignment */ && isAliasableOrJsExpression(node.initializer) || node.kind === 257 /* VariableDeclaration */ && isVariableDeclarationInitializedToBareOrAccessedRequire(node) || node.kind === 205 /* BindingElement */ && isVariableDeclarationInitializedToBareOrAccessedRequire(node.parent.parent);
            }
            function getExternalModuleMember(node, specifier, dontResolveAlias = false) {
                var _a2;
                const moduleSpecifier = getExternalModuleRequireArgument(node) || node.moduleSpecifier;
                const moduleSymbol = resolveExternalModuleName(node, moduleSpecifier);
                const name = !isPropertyAccessExpression(specifier) && specifier.propertyName || specifier.name;
                if (!isIdentifier(name)) {
                    return void 0;
                }
                const suppressInteropError = name.escapedText === "default" /* Default */ && allowSyntheticDefaultImports;
                const targetSymbol = resolveESModuleSymbol(moduleSymbol, moduleSpecifier, 
                /*dontResolveAlias*/
                false, suppressInteropError);
                if (targetSymbol) {
                    if (name.escapedText) {
                        if (isShorthandAmbientModuleSymbol(moduleSymbol)) {
                            return moduleSymbol;
                        }
                        let symbolFromVariable;
                        if (moduleSymbol && moduleSymbol.exports && moduleSymbol.exports.get("export=" /* ExportEquals */)) {
                            symbolFromVariable = getPropertyOfType(getTypeOfSymbol(targetSymbol), name.escapedText, 
                            /*skipObjectFunctionPropertyAugment*/
                            true);
                        }
                        else {
                            symbolFromVariable = getPropertyOfVariable(targetSymbol, name.escapedText);
                        }
                        symbolFromVariable = resolveSymbol(symbolFromVariable, dontResolveAlias);
                        let symbolFromModule = getExportOfModule(targetSymbol, name, specifier, dontResolveAlias);
                        if (symbolFromModule === void 0 && name.escapedText === "default" /* Default */) {
                            const file = (_a2 = moduleSymbol.declarations) == null ? void 0 : _a2.find(isSourceFile);
                            if (isOnlyImportedAsDefault(moduleSpecifier) || canHaveSyntheticDefault(file, moduleSymbol, dontResolveAlias, moduleSpecifier)) {
                                symbolFromModule = resolveExternalModuleSymbol(moduleSymbol, dontResolveAlias) || resolveSymbol(moduleSymbol, dontResolveAlias);
                            }
                        }
                        const symbol = symbolFromModule && symbolFromVariable && symbolFromModule !== symbolFromVariable ? combineValueAndTypeSymbols(symbolFromVariable, symbolFromModule) : symbolFromModule || symbolFromVariable;
                        if (!symbol) {
                            errorNoModuleMemberSymbol(moduleSymbol, targetSymbol, node, name);
                        }
                        return symbol;
                    }
                }
            }
            function markSymbolOfAliasDeclarationIfTypeOnly(aliasDeclaration, immediateTarget, finalTarget, overwriteEmpty, exportStarDeclaration, exportStarName) {
            function resolveEntityName(name, meaning, ignoreErrors, dontResolveAlias, location) {
                if (nodeIsMissing(name)) {
                    return void 0;
                }
                const namespaceMeaning = 1920 /* Namespace */ | (isInJSFile(name) ? meaning & 111551 /* Value */ : 0);
                let symbol;
                if (name.kind === 79 /* Identifier */) {
                    const message = meaning === namespaceMeaning || nodeIsSynthesized(name) ? Diagnostics.Cannot_find_namespace_0 : getCannotFindNameDiagnosticForName(getFirstIdentifier(name));
                    const symbolFromJSPrototype = isInJSFile(name) && !nodeIsSynthesized(name) ? resolveEntityNameFromAssignmentDeclaration(name, meaning) : void 0;
                    symbol = getMergedSymbol(resolveName(location || name, name.escapedText, meaning, ignoreErrors || symbolFromJSPrototype ? void 0 : message, name, 
                    /*isUse*/
                    true, false));
                    if (!symbol) {
                        return getMergedSymbol(symbolFromJSPrototype);
                    }
                }
                else if (name.kind === 163 /* QualifiedName */ || name.kind === 208 /* PropertyAccessExpression */) {
                    const left = name.kind === 163 /* QualifiedName */ ? name.left : name.expression;
                    const right = name.kind === 163 /* QualifiedName */ ? name.right : name.name;
                    let namespace = resolveEntityName(left, namespaceMeaning, ignoreErrors, 
                    /*dontResolveAlias*/
                    false, location);
                    if (!namespace || nodeIsMissing(right)) {
                        return void 0;
                    }
                    else if (namespace === unknownSymbol) {
                        return namespace;
                    }
                    if (namespace.valueDeclaration && isInJSFile(namespace.valueDeclaration) && getEmitModuleResolutionKind(compilerOptions) !== 100 /* Bundler */ && isVariableDeclaration(namespace.valueDeclaration) && namespace.valueDeclaration.initializer && isCommonJsRequire(namespace.valueDeclaration.initializer)) {
                        const moduleName = namespace.valueDeclaration.initializer.arguments[0];
                        const moduleSym = resolveExternalModuleName(moduleName, moduleName);
                        if (moduleSym) {
                            const resolvedModuleSymbol = resolveExternalModuleSymbol(moduleSym);
                            if (resolvedModuleSymbol) {
                                namespace = resolvedModuleSymbol;
                            }
                        }
                    }
                    symbol = getMergedSymbol(getSymbol2(getExportsOfSymbol(namespace), right.escapedText, meaning));
                    if (!symbol) {
                        if (!ignoreErrors) {
                            const namespaceName = getFullyQualifiedName(namespace);
                            const declarationName = declarationNameToString(right);
                            const suggestionForNonexistentModule = getSuggestedSymbolForNonexistentModule(right, namespace);
                            if (suggestionForNonexistentModule) {
                                error(right, Diagnostics._0_has_no_exported_member_named_1_Did_you_mean_2, namespaceName, declarationName, symbolToString(suggestionForNonexistentModule));
                                return void 0;
                            }
                            const containingQualifiedName = isQualifiedName(name) && getContainingQualifiedNameNode(name);
                            const canSuggestTypeof = globalObjectType && meaning & 788968 /* Type */ && containingQualifiedName && !isTypeOfExpression(containingQualifiedName.parent) && tryGetQualifiedNameAsValue(containingQualifiedName);
                            if (canSuggestTypeof) {
                                error(containingQualifiedName, Diagnostics._0_refers_to_a_value_but_is_being_used_as_a_type_here_Did_you_mean_typeof_0, entityNameToString(containingQualifiedName));
                                return void 0;
                            }
                            if (meaning & 1920 /* Namespace */ && isQualifiedName(name.parent)) {
                                const exportedTypeSymbol = getMergedSymbol(getSymbol2(getExportsOfSymbol(namespace), right.escapedText, 788968 /* Type */));
                                if (exportedTypeSymbol) {
                                    error(name.parent.right, Diagnostics.Cannot_access_0_1_because_0_is_a_type_but_not_a_namespace_Did_you_mean_to_retrieve_the_type_of_the_property_1_in_0_with_0_1, symbolToString(exportedTypeSymbol), unescapeLeadingUnderscores(name.parent.right.escapedText));
                                    return void 0;
                                }
                            }
                            error(right, Diagnostics.Namespace_0_has_no_exported_member_1, namespaceName, declarationName);
                        }
                        return void 0;
                    }
                }
                else {
                    throw Debug.assertNever(name, "Unknown entity name kind.");
                }
                Debug.assert((getCheckFlags(symbol) & 1 /* Instantiated */) === 0, "Should never get an instantiated symbol here.");
                if (!nodeIsSynthesized(name) && isEntityName(name) && (symbol.flags & 2097152 /* Alias */ || name.parent.kind === 274 /* ExportAssignment */)) {
                    markSymbolOfAliasDeclarationIfTypeOnly(getAliasDeclarationFromName(name), symbol, 
                    /*finalTarget*/
                    void 0, 
                    /*overwriteEmpty*/
                    true);
                }
                return symbol.flags & meaning || dontResolveAlias ? symbol : resolveAlias(symbol);
            }
            function resolveExternalModule(location, moduleReference, moduleNotFoundError, errorNode, isForAugmentation = false) {
                var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
                if (startsWith(moduleReference, "@types/")) {
                    const diag2 = Diagnostics.Cannot_import_type_declaration_files_Consider_importing_0_instead_of_1;
                    const withoutAtTypePrefix = removePrefix(moduleReference, "@types/");
                    error(errorNode, diag2, withoutAtTypePrefix, moduleReference);
                }
                const ambientModule = tryFindAmbientModule(moduleReference, 
                /*withAugmentations*/
                true);
                if (ambientModule) {
                    return ambientModule;
                }
                const currentSourceFile = getSourceFileOfNode(location);
                const contextSpecifier = isStringLiteralLike(location) ? location : ((_a2 = findAncestor(location, isImportCall)) == null ? void 0 : _a2.arguments[0]) || ((_b = findAncestor(location, isImportDeclaration)) == null ? void 0 : _b.moduleSpecifier) || ((_c = findAncestor(location, isExternalModuleImportEqualsDeclaration)) == null ? void 0 : _c.moduleReference.expression) || ((_d = findAncestor(location, isExportDeclaration)) == null ? void 0 : _d.moduleSpecifier) || ((_e = isModuleDeclaration(location) ? location : location.parent && isModuleDeclaration(location.parent) && location.parent.name === location ? location.parent : void 0) == null ? void 0 : _e.name) || ((_f = isLiteralImportTypeNode(location) ? location : void 0) == null ? void 0 : _f.argument.literal);
                const mode = contextSpecifier && isStringLiteralLike(contextSpecifier) ? getModeForUsageLocation(currentSourceFile, contextSpecifier) : currentSourceFile.impliedNodeFormat;
                const moduleResolutionKind = getEmitModuleResolutionKind(compilerOptions);
                const resolvedModule = getResolvedModule(currentSourceFile, moduleReference, mode);
                const resolutionDiagnostic = resolvedModule && getResolutionDiagnostic(compilerOptions, resolvedModule, currentSourceFile);
                const sourceFile = resolvedModule && (!resolutionDiagnostic || resolutionDiagnostic === Diagnostics.Module_0_was_resolved_to_1_but_jsx_is_not_set) && host.getSourceFile(resolvedModule.resolvedFileName);
                if (sourceFile) {
                    if (resolutionDiagnostic) {
                        error(errorNode, resolutionDiagnostic, moduleReference, resolvedModule.resolvedFileName);
                    }
                    if (resolvedModule.resolvedUsingTsExtension && isDeclarationFileName(moduleReference)) {
                        const importOrExport = ((_g = findAncestor(location, isImportDeclaration)) == null ? void 0 : _g.importClause) || findAncestor(location, or(isImportEqualsDeclaration, isExportDeclaration));
                        if (importOrExport && !importOrExport.isTypeOnly || findAncestor(location, isImportCall)) {
                            error(errorNode, Diagnostics.A_declaration_file_cannot_be_imported_without_import_type_Did_you_mean_to_import_an_implementation_file_0_instead, getSuggestedImportSource(Debug.checkDefined(tryExtractTSExtension(moduleReference))));
                        }
                    }
                    else if (resolvedModule.resolvedUsingTsExtension && !shouldAllowImportingTsExtension(compilerOptions, currentSourceFile.fileName)) {
                        const tsExtension = Debug.checkDefined(tryExtractTSExtension(moduleReference));
                        error(errorNode, Diagnostics.An_import_path_can_only_end_with_a_0_extension_when_allowImportingTsExtensions_is_enabled, tsExtension);
                    }
                    if (sourceFile.symbol) {
                        if (resolvedModule.isExternalLibraryImport && !resolutionExtensionIsTSOrJson(resolvedModule.extension)) {
                            errorOnImplicitAnyModule(
                            /*isError*/
                            false, errorNode, currentSourceFile, mode, resolvedModule, moduleReference);
                        }
                        if (moduleResolutionKind === 3 /* Node16 */ || moduleResolutionKind === 99 /* NodeNext */) {
                            const isSyncImport = currentSourceFile.impliedNodeFormat === 1 /* CommonJS */ && !findAncestor(location, isImportCall) || !!findAncestor(location, isImportEqualsDeclaration);
                            const overrideClauseHost = findAncestor(location, (l) => isImportTypeNode(l) || isExportDeclaration(l) || isImportDeclaration(l));
                            const overrideClause = overrideClauseHost && isImportTypeNode(overrideClauseHost) ? (_h = overrideClauseHost.assertions) == null ? void 0 : _h.assertClause : overrideClauseHost == null ? void 0 : overrideClauseHost.assertClause;
                            if (isSyncImport && sourceFile.impliedNodeFormat === 99 /* ESNext */ && !getResolutionModeOverrideForClause(overrideClause)) {
                                if (findAncestor(location, isImportEqualsDeclaration)) {
                                    error(errorNode, Diagnostics.Module_0_cannot_be_imported_using_this_construct_The_specifier_only_resolves_to_an_ES_module_which_cannot_be_imported_with_require_Use_an_ECMAScript_import_instead, moduleReference);
                                }
                                else {
                                    let diagnosticDetails;
                                    const ext = tryGetExtensionFromPath2(currentSourceFile.fileName);
                                    if (ext === ".ts" /* Ts */ || ext === ".js" /* Js */ || ext === ".tsx" /* Tsx */ || ext === ".jsx" /* Jsx */) {
                                        const scope = currentSourceFile.packageJsonScope;
                                        const targetExt = ext === ".ts" /* Ts */ ? ".mts" /* Mts */ : ext === ".js" /* Js */ ? ".mjs" /* Mjs */ : void 0;
                                        if (scope && !scope.contents.packageJsonContent.type) {
                                            if (targetExt) {
                                                diagnosticDetails = chainDiagnosticMessages(
                                                /*details*/
                                                void 0, Diagnostics.To_convert_this_file_to_an_ECMAScript_module_change_its_file_extension_to_0_or_add_the_field_type_Colon_module_to_1, targetExt, combinePaths(scope.packageDirectory, "package.json"));
                                            }
                                            else {
                                                diagnosticDetails = chainDiagnosticMessages(
                                                /*details*/
                                                void 0, Diagnostics.To_convert_this_file_to_an_ECMAScript_module_add_the_field_type_Colon_module_to_0, combinePaths(scope.packageDirectory, "package.json"));
                                            }
                                        }
                                        else {
                                            if (targetExt) {
                                                diagnosticDetails = chainDiagnosticMessages(
                                                /*details*/
                                                void 0, Diagnostics.To_convert_this_file_to_an_ECMAScript_module_change_its_file_extension_to_0_or_create_a_local_package_json_file_with_type_Colon_module, targetExt);
                                            }
                                            else {
                                                diagnosticDetails = chainDiagnosticMessages(
                                                /*details*/
                                                void 0, Diagnostics.To_convert_this_file_to_an_ECMAScript_module_create_a_local_package_json_file_with_type_Colon_module);
                                            }
                                        }
                                    }
                                    diagnostics.add(createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(errorNode), errorNode, chainDiagnosticMessages(diagnosticDetails, Diagnostics.The_current_file_is_a_CommonJS_module_whose_imports_will_produce_require_calls_however_the_referenced_file_is_an_ECMAScript_module_and_cannot_be_imported_with_require_Consider_writing_a_dynamic_import_0_call_instead, moduleReference)));
                                }
                            }
                        }
                        return getMergedSymbol(sourceFile.symbol);
                    }
                    if (moduleNotFoundError) {
                        error(errorNode, Diagnostics.File_0_is_not_a_module, sourceFile.fileName);
                    }
                    return void 0;
                }
                if (patternAmbientModules) {
                    const pattern = findBestPatternMatch(patternAmbientModules, (_) => _.pattern, moduleReference);
                    if (pattern) {
                        const augmentation = patternAmbientModuleAugmentations && patternAmbientModuleAugmentations.get(moduleReference);
                        if (augmentation) {
                            return getMergedSymbol(augmentation);
                        }
                        return getMergedSymbol(pattern.symbol);
                    }
                }
                if (resolvedModule && !resolutionExtensionIsTSOrJson(resolvedModule.extension) && resolutionDiagnostic === void 0 || resolutionDiagnostic === Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type) {
                    if (isForAugmentation) {
                        const diag2 = Diagnostics.Invalid_module_name_in_augmentation_Module_0_resolves_to_an_untyped_module_at_1_which_cannot_be_augmented;
                        error(errorNode, diag2, moduleReference, resolvedModule.resolvedFileName);
                    }
                    else {
                        errorOnImplicitAnyModule(
                        /*isError*/
                        noImplicitAny && !!moduleNotFoundError, errorNode, currentSourceFile, mode, resolvedModule, moduleReference);
                    }
                    return void 0;
                }
                if (moduleNotFoundError) {
                    if (resolvedModule) {
                        const redirect = host.getProjectReferenceRedirect(resolvedModule.resolvedFileName);
                        if (redirect) {
                            error(errorNode, Diagnostics.Output_file_0_has_not_been_built_from_source_file_1, redirect, resolvedModule.resolvedFileName);
                            return void 0;
                        }
                    }
                    if (resolutionDiagnostic) {
                        error(errorNode, resolutionDiagnostic, moduleReference, resolvedModule.resolvedFileName);
                    }
                    else {
                        const isExtensionlessRelativePathImport = pathIsRelative(moduleReference) && !hasExtension(moduleReference);
                        const resolutionIsNode16OrNext = moduleResolutionKind === 3 /* Node16 */ || moduleResolutionKind === 99 /* NodeNext */;
                        if (!getResolveJsonModule(compilerOptions) && fileExtensionIs(moduleReference, ".json" /* Json */) && moduleResolutionKind !== 1 /* Classic */ && hasJsonModuleEmitEnabled(compilerOptions)) {
                            error(errorNode, Diagnostics.Cannot_find_module_0_Consider_using_resolveJsonModule_to_import_module_with_json_extension, moduleReference);
                        }
                        else if (mode === 99 /* ESNext */ && resolutionIsNode16OrNext && isExtensionlessRelativePathImport) {
                            const absoluteRef = getNormalizedAbsolutePath(moduleReference, getDirectoryPath(currentSourceFile.path));
                            const suggestedExt = (_i = suggestedExtensions.find(([actualExt, _importExt]) => host.fileExists(absoluteRef + actualExt))) == null ? void 0 : _i[1];
                            if (suggestedExt) {
                                error(errorNode, Diagnostics.Relative_import_paths_need_explicit_file_extensions_in_EcmaScript_imports_when_moduleResolution_is_node16_or_nodenext_Did_you_mean_0, moduleReference + suggestedExt);
                            }
                            else {
                                error(errorNode, Diagnostics.Relative_import_paths_need_explicit_file_extensions_in_EcmaScript_imports_when_moduleResolution_is_node16_or_nodenext_Consider_adding_an_extension_to_the_import_path);
                            }
                        }
                        else {
                            error(errorNode, moduleNotFoundError, moduleReference);
                        }
                    }
                }
                return void 0;
                function getSuggestedImportSource(tsExtension) {
                    const importSourceWithoutExtension = removeExtension(moduleReference, tsExtension);
                    if (emitModuleKindIsNonNodeESM(moduleKind) || mode === 99 /* ESNext */) {
                        const preferTs = isDeclarationFileName(moduleReference) && shouldAllowImportingTsExtension(compilerOptions);
                        const ext = tsExtension === ".mts" /* Mts */ || tsExtension === ".d.mts" /* Dmts */ ? preferTs ? ".mts" : ".mjs" : tsExtension === ".cts" /* Cts */ || tsExtension === ".d.mts" /* Dmts */ ? preferTs ? ".cts" : ".cjs" : preferTs ? ".ts" : ".js";
                        return importSourceWithoutExtension + ext;
                    }
                    return importSourceWithoutExtension;
                }
            }
            function errorOnImplicitAnyModule(isError, errorNode, sourceFile, mode, { packageId, resolvedFileName }, moduleReference) {
            function resolveESModuleSymbol(moduleSymbol, referencingLocation, dontResolveAlias, suppressInteropError) {
                var _a2;
                const symbol = resolveExternalModuleSymbol(moduleSymbol, dontResolveAlias);
                if (!dontResolveAlias && symbol) {
                    if (!suppressInteropError && !(symbol.flags & (1536 /* Module */ | 3 /* Variable */)) && !getDeclarationOfKind(symbol, 308 /* SourceFile */)) {
                        const compilerOptionName = moduleKind >= 5 /* ES2015 */ ? "allowSyntheticDefaultImports" : "esModuleInterop";
                        error(referencingLocation, Diagnostics.This_module_can_only_be_referenced_with_ECMAScript_imports_Slashexports_by_turning_on_the_0_flag_and_referencing_its_default_export, compilerOptionName);
                        return symbol;
                    }
                    const referenceParent = referencingLocation.parent;
                    if (isImportDeclaration(referenceParent) && getNamespaceDeclarationNode(referenceParent) || isImportCall(referenceParent)) {
                        const reference = isImportCall(referenceParent) ? referenceParent.arguments[0] : referenceParent.moduleSpecifier;
                        const type = getTypeOfSymbol(symbol);
                        const defaultOnlyType = getTypeWithSyntheticDefaultOnly(type, symbol, moduleSymbol, reference);
                        if (defaultOnlyType) {
                            return cloneTypeAsModuleType(symbol, defaultOnlyType, referenceParent);
                        }
                        const targetFile = (_a2 = moduleSymbol == null ? void 0 : moduleSymbol.declarations) == null ? void 0 : _a2.find(isSourceFile);
                        const isEsmCjsRef = targetFile && isESMFormatImportImportingCommonjsFormatFile(getUsageModeForExpression(reference), targetFile.impliedNodeFormat);
                        if (getESModuleInterop(compilerOptions) || isEsmCjsRef) {
                            let sigs = getSignaturesOfStructuredType(type, 0 /* Call */);
                            if (!sigs || !sigs.length) {
                                sigs = getSignaturesOfStructuredType(type, 1 /* Construct */);
                            }
                            if (sigs && sigs.length || getPropertyOfType(type, "default" /* Default */, 
                            /*skipObjectFunctionPropertyAugment*/
                            true) || isEsmCjsRef) {
                                const moduleType = getTypeWithSyntheticDefaultImportType(type, symbol, moduleSymbol, reference);
                                return cloneTypeAsModuleType(symbol, moduleType, referenceParent);
                            }
                        }
                    }
                }
                return symbol;
            }
            function isAnySymbolAccessible(symbols, enclosingDeclaration, initialSymbol, meaning, shouldComputeAliasesToMakeVisible, allowModules) {
                function getIsDeclarationVisible(declaration) {
                    var _a2, _b;
                    if (!isDeclarationVisible(declaration)) {
                        const anyImportSyntax = getAnyImportSyntax(declaration);
                        if (anyImportSyntax && !hasSyntacticModifier(anyImportSyntax, 1 /* Export */) && // import clause without export
                            isDeclarationVisible(anyImportSyntax.parent)) {
                            return addVisibleAlias(declaration, anyImportSyntax);
                        }
                        else if (isVariableDeclaration(declaration) && isVariableStatement(declaration.parent.parent) && !hasSyntacticModifier(declaration.parent.parent, 1 /* Export */) && // unexported variable statement
                            isDeclarationVisible(declaration.parent.parent.parent)) {
                            return addVisibleAlias(declaration, declaration.parent.parent);
                        }
                        else if (isLateVisibilityPaintedStatement(declaration) && !hasSyntacticModifier(declaration, 1 /* Export */) && isDeclarationVisible(declaration.parent)) {
                            return addVisibleAlias(declaration, declaration);
                        }
                        else if (isBindingElement(declaration)) {
                            if (symbol.flags & 2097152 /* Alias */ && isInJSFile(declaration) && ((_a2 = declaration.parent) == null ? void 0 : _a2.parent) && isVariableDeclaration(declaration.parent.parent) && ((_b = declaration.parent.parent.parent) == null ? void 0 : _b.parent) && isVariableStatement(declaration.parent.parent.parent.parent) && !hasSyntacticModifier(declaration.parent.parent.parent.parent, 1 /* Export */) && declaration.parent.parent.parent.parent.parent && isDeclarationVisible(declaration.parent.parent.parent.parent.parent)) {
                                return addVisibleAlias(declaration, declaration.parent.parent.parent.parent);
                            }
                            else if (symbol.flags & 2 /* BlockScopedVariable */) {
                                const variableStatement = findAncestor(declaration, isVariableStatement);
                                if (hasSyntacticModifier(variableStatement, 1 /* Export */)) {
                                    return true;
                                }
                                if (!isDeclarationVisible(variableStatement.parent)) {
                                    return false;
                                }
                                return addVisibleAlias(declaration, variableStatement);
                            }
                        }
                        return false;
                    }
                    return true;
                }
                function typeToTypeNodeWorker(type, context) {
                    var _a2, _b;
                    if (cancellationToken && cancellationToken.throwIfCancellationRequested) {
                        cancellationToken.throwIfCancellationRequested();
                    }
                    const inTypeAlias = context.flags & 8388608 /* InTypeAlias */;
                    context.flags &= ~8388608 /* InTypeAlias */;
                    if (!type) {
                        if (!(context.flags & 262144 /* AllowEmptyUnionOrIntersection */)) {
                            context.encounteredError = true;
                            return void 0;
                        }
                        context.approximateLength += 3;
                        return factory.createKeywordTypeNode(131 /* AnyKeyword */);
                    }
                    if (!(context.flags & 536870912 /* NoTypeReduction */)) {
                        type = getReducedType(type);
                    }
                    if (type.flags & 1 /* Any */) {
                        if (type.aliasSymbol) {
                            return factory.createTypeReferenceNode(symbolToEntityNameNode(type.aliasSymbol), mapToTypeNodes(type.aliasTypeArguments, context));
                        }
                        if (type === unresolvedType) {
                            return addSyntheticLeadingComment(factory.createKeywordTypeNode(131 /* AnyKeyword */), 3 /* MultiLineCommentTrivia */, "unresolved");
                        }
                        context.approximateLength += 3;
                        return factory.createKeywordTypeNode(type === intrinsicMarkerType ? 139 /* IntrinsicKeyword */ : 131 /* AnyKeyword */);
                    }
                    if (type.flags & 2 /* Unknown */) {
                        return factory.createKeywordTypeNode(157 /* UnknownKeyword */);
                    }
                    if (type.flags & 4 /* String */) {
                        context.approximateLength += 6;
                        return factory.createKeywordTypeNode(152 /* StringKeyword */);
                    }
                    if (type.flags & 8 /* Number */) {
                        context.approximateLength += 6;
                        return factory.createKeywordTypeNode(148 /* NumberKeyword */);
                    }
                    if (type.flags & 64 /* BigInt */) {
                        context.approximateLength += 6;
                        return factory.createKeywordTypeNode(160 /* BigIntKeyword */);
                    }
                    if (type.flags & 16 /* Boolean */ && !type.aliasSymbol) {
                        context.approximateLength += 7;
                        return factory.createKeywordTypeNode(134 /* BooleanKeyword */);
                    }
                    if (type.flags & 1056 /* EnumLike */) {
                        if (type.symbol.flags & 8 /* EnumMember */) {
                            const parentSymbol = getParentOfSymbol(type.symbol);
                            const parentName = symbolToTypeNode(parentSymbol, context, 788968 /* Type */);
                            if (getDeclaredTypeOfSymbol(parentSymbol) === type) {
                                return parentName;
                            }
                            const memberName = symbolName(type.symbol);
                            if (isIdentifierText(memberName, 0 /* ES3 */)) {
                                return appendReferenceToType(parentName, factory.createTypeReferenceNode(memberName, 
                                /*typeArguments*/
                                void 0));
                            }
                            if (isImportTypeNode(parentName)) {
                                parentName.isTypeOf = true;
                                return factory.createIndexedAccessTypeNode(parentName, factory.createLiteralTypeNode(factory.createStringLiteral(memberName)));
                            }
                            else if (isTypeReferenceNode(parentName)) {
                                return factory.createIndexedAccessTypeNode(factory.createTypeQueryNode(parentName.typeName), factory.createLiteralTypeNode(factory.createStringLiteral(memberName)));
                            }
                            else {
                                return Debug.fail("Unhandled type node kind returned from `symbolToTypeNode`.");
                            }
                        }
                        return symbolToTypeNode(type.symbol, context, 788968 /* Type */);
                    }
                    if (type.flags & 128 /* StringLiteral */) {
                        context.approximateLength += type.value.length + 2;
                        return factory.createLiteralTypeNode(setEmitFlags(factory.createStringLiteral(type.value, !!(context.flags & 268435456 /* UseSingleQuotesForStringLiteralType */)), 33554432 /* NoAsciiEscaping */));
                    }
                    if (type.flags & 256 /* NumberLiteral */) {
                        const value = type.value;
                        context.approximateLength += ("" + value).length;
                        return factory.createLiteralTypeNode(value < 0 ? factory.createPrefixUnaryExpression(40 /* MinusToken */, factory.createNumericLiteral(-value)) : factory.createNumericLiteral(value));
                    }
                    if (type.flags & 2048 /* BigIntLiteral */) {
                        context.approximateLength += pseudoBigIntToString(type.value).length + 1;
                        return factory.createLiteralTypeNode(factory.createBigIntLiteral(type.value));
                    }
                    if (type.flags & 512 /* BooleanLiteral */) {
                        context.approximateLength += type.intrinsicName.length;
                        return factory.createLiteralTypeNode(type.intrinsicName === "true" ? factory.createTrue() : factory.createFalse());
                    }
                    if (type.flags & 8192 /* UniqueESSymbol */) {
                        if (!(context.flags & 1048576 /* AllowUniqueESSymbolType */)) {
                            if (isValueSymbolAccessible(type.symbol, context.enclosingDeclaration)) {
                                context.approximateLength += 6;
                                return symbolToTypeNode(type.symbol, context, 111551 /* Value */);
                            }
                            if (context.tracker.reportInaccessibleUniqueSymbolError) {
                                context.tracker.reportInaccessibleUniqueSymbolError();
                            }
                        }
                        context.approximateLength += 13;
                        return factory.createTypeOperatorNode(156 /* UniqueKeyword */, factory.createKeywordTypeNode(153 /* SymbolKeyword */));
                    }
                    if (type.flags & 16384 /* Void */) {
                        context.approximateLength += 4;
                        return factory.createKeywordTypeNode(114 /* VoidKeyword */);
                    }
                    if (type.flags & 32768 /* Undefined */) {
                        context.approximateLength += 9;
                        return factory.createKeywordTypeNode(155 /* UndefinedKeyword */);
                    }
                    if (type.flags & 65536 /* Null */) {
                        context.approximateLength += 4;
                        return factory.createLiteralTypeNode(factory.createNull());
                    }
                    if (type.flags & 131072 /* Never */) {
                        context.approximateLength += 5;
                        return factory.createKeywordTypeNode(144 /* NeverKeyword */);
                    }
                    if (type.flags & 4096 /* ESSymbol */) {
                        context.approximateLength += 6;
                        return factory.createKeywordTypeNode(153 /* SymbolKeyword */);
                    }
                    if (type.flags & 67108864 /* NonPrimitive */) {
                        context.approximateLength += 6;
                        return factory.createKeywordTypeNode(149 /* ObjectKeyword */);
                    }
                    if (isThisTypeParameter(type)) {
                        if (context.flags & 4194304 /* InObjectTypeLiteral */) {
                            if (!context.encounteredError && !(context.flags & 32768 /* AllowThisInObjectLiteral */)) {
                                context.encounteredError = true;
                            }
                            (_b = (_a2 = context.tracker).reportInaccessibleThisError) == null ? void 0 : _b.call(_a2);
                        }
                        context.approximateLength += 4;
                        return factory.createThisTypeNode();
                    }
                    if (!inTypeAlias && type.aliasSymbol && (context.flags & 16384 /* UseAliasDefinedOutsideCurrentScope */ || isTypeSymbolAccessible(type.aliasSymbol, context.enclosingDeclaration))) {
                        const typeArgumentNodes = mapToTypeNodes(type.aliasTypeArguments, context);
                        if (isReservedMemberName(type.aliasSymbol.escapedName) && !(type.aliasSymbol.flags & 32 /* Class */))
                            return factory.createTypeReferenceNode(factory.createIdentifier(""), typeArgumentNodes);
                        if (length(typeArgumentNodes) === 1 && type.aliasSymbol === globalArrayType.symbol) {
                            return factory.createArrayTypeNode(typeArgumentNodes[0]);
                        }
                        return symbolToTypeNode(type.aliasSymbol, context, 788968 /* Type */, typeArgumentNodes);
                    }
                    const objectFlags = getObjectFlags(type);
                    if (objectFlags & 4 /* Reference */) {
                        Debug.assert(!!(type.flags & 524288 /* Object */));
                        return type.node ? visitAndTransformType(type, typeReferenceToTypeNode) : typeReferenceToTypeNode(type);
                    }
                    if (type.flags & 262144 /* TypeParameter */ || objectFlags & 3 /* ClassOrInterface */) {
                        if (type.flags & 262144 /* TypeParameter */ && contains(context.inferTypeParameters, type)) {
                            context.approximateLength += symbolName(type.symbol).length + 6;
                            let constraintNode;
                            const constraint = getConstraintOfTypeParameter(type);
                            if (constraint) {
                                const inferredConstraint = getInferredTypeParameterConstraint(type, 
                                /*omitTypeReferences*/
                                true);
                                if (!(inferredConstraint && isTypeIdenticalTo(constraint, inferredConstraint))) {
                                    context.approximateLength += 9;
                                    constraintNode = constraint && typeToTypeNodeHelper(constraint, context);
                                }
                            }
                            return factory.createInferTypeNode(typeParameterToDeclarationWithConstraint(type, context, constraintNode));
                        }
                        if (context.flags & 4 /* GenerateNamesForShadowedTypeParams */ && type.flags & 262144 /* TypeParameter */ && !isTypeSymbolAccessible(type.symbol, context.enclosingDeclaration)) {
                            const name2 = typeParameterToName(type, context);
                            context.approximateLength += idText(name2).length;
                            return factory.createTypeReferenceNode(factory.createIdentifier(idText(name2)), 
                            /*typeArguments*/
                            void 0);
                        }
                        if (type.symbol) {
                            return symbolToTypeNode(type.symbol, context, 788968 /* Type */);
                        }
                        const name = (type === markerSuperTypeForCheck || type === markerSubTypeForCheck) && varianceTypeParameter && varianceTypeParameter.symbol ? (type === markerSubTypeForCheck ? "sub-" : "super-") + symbolName(varianceTypeParameter.symbol) : "?";
                        return factory.createTypeReferenceNode(factory.createIdentifier(name), 
                        /*typeArguments*/
                        void 0);
                    }
                    if (type.flags & 1048576 /* Union */ && type.origin) {
                        type = type.origin;
                    }
                    if (type.flags & (1048576 /* Union */ | 2097152 /* Intersection */)) {
                        const types = type.flags & 1048576 /* Union */ ? formatUnionTypes(type.types) : type.types;
                        if (length(types) === 1) {
                            return typeToTypeNodeHelper(types[0], context);
                        }
                        const typeNodes = mapToTypeNodes(types, context, 
                        /*isBareList*/
                        true);
                        if (typeNodes && typeNodes.length > 0) {
                            return type.flags & 1048576 /* Union */ ? factory.createUnionTypeNode(typeNodes) : factory.createIntersectionTypeNode(typeNodes);
                        }
                        else {
                            if (!context.encounteredError && !(context.flags & 262144 /* AllowEmptyUnionOrIntersection */)) {
                                context.encounteredError = true;
                            }
                            return void 0;
                        }
                    }
                    if (objectFlags & (16 /* Anonymous */ | 32 /* Mapped */)) {
                        Debug.assert(!!(type.flags & 524288 /* Object */));
                        return createAnonymousTypeNode(type);
                    }
                    if (type.flags & 4194304 /* Index */) {
                        const indexedType = type.type;
                        context.approximateLength += 6;
                        const indexTypeNode = typeToTypeNodeHelper(indexedType, context);
                        return factory.createTypeOperatorNode(141 /* KeyOfKeyword */, indexTypeNode);
                    }
                    if (type.flags & 134217728 /* TemplateLiteral */) {
                        const texts = type.texts;
                        const types = type.types;
                        const templateHead = factory.createTemplateHead(texts[0]);
                        const templateSpans = factory.createNodeArray(map(types, (t, i) => factory.createTemplateLiteralTypeSpan(typeToTypeNodeHelper(t, context), (i < types.length - 1 ? factory.createTemplateMiddle : factory.createTemplateTail)(texts[i + 1]))));
                        context.approximateLength += 2;
                        return factory.createTemplateLiteralType(templateHead, templateSpans);
                    }
                    if (type.flags & 268435456 /* StringMapping */) {
                        const typeNode = typeToTypeNodeHelper(type.type, context);
                        return symbolToTypeNode(type.symbol, context, 788968 /* Type */, [typeNode]);
                    }
                    if (type.flags & 8388608 /* IndexedAccess */) {
                        const objectTypeNode = typeToTypeNodeHelper(type.objectType, context);
                        const indexTypeNode = typeToTypeNodeHelper(type.indexType, context);
                        context.approximateLength += 2;
                        return factory.createIndexedAccessTypeNode(objectTypeNode, indexTypeNode);
                    }
                    if (type.flags & 16777216 /* Conditional */) {
                        return visitAndTransformType(type, (type2) => conditionalTypeToTypeNode(type2));
                    }
                    if (type.flags & 33554432 /* Substitution */) {
                        return typeToTypeNodeHelper(type.baseType, context);
                    }
                    return Debug.fail("Should be unreachable.");
                    function conditionalTypeToTypeNode(type2) {
                        const checkTypeNode = typeToTypeNodeHelper(type2.checkType, context);
                        context.approximateLength += 15;
                        if (context.flags & 4 /* GenerateNamesForShadowedTypeParams */ && type2.root.isDistributive && !(type2.checkType.flags & 262144 /* TypeParameter */)) {
                            const newParam = createTypeParameter(createSymbol(262144 /* TypeParameter */, "T"));
                            const name = typeParameterToName(newParam, context);
                            const newTypeVariable = factory.createTypeReferenceNode(name);
                            context.approximateLength += 37;
                            const newMapper = prependTypeMapping(type2.root.checkType, newParam, type2.mapper);
                            const saveInferTypeParameters2 = context.inferTypeParameters;
                            context.inferTypeParameters = type2.root.inferTypeParameters;
                            const extendsTypeNode2 = typeToTypeNodeHelper(instantiateType(type2.root.extendsType, newMapper), context);
                            context.inferTypeParameters = saveInferTypeParameters2;
                            const trueTypeNode2 = typeToTypeNodeOrCircularityElision(instantiateType(getTypeFromTypeNode(type2.root.node.trueType), newMapper));
                            const falseTypeNode2 = typeToTypeNodeOrCircularityElision(instantiateType(getTypeFromTypeNode(type2.root.node.falseType), newMapper));
                            return factory.createConditionalTypeNode(checkTypeNode, factory.createInferTypeNode(factory.createTypeParameterDeclaration(
                            /*modifiers*/
                            void 0, factory.cloneNode(newTypeVariable.typeName))), factory.createConditionalTypeNode(factory.createTypeReferenceNode(factory.cloneNode(name)), typeToTypeNodeHelper(type2.checkType, context), factory.createConditionalTypeNode(newTypeVariable, extendsTypeNode2, trueTypeNode2, falseTypeNode2), factory.createKeywordTypeNode(144 /* NeverKeyword */)), factory.createKeywordTypeNode(144 /* NeverKeyword */));
                        }
                        const saveInferTypeParameters = context.inferTypeParameters;
                        context.inferTypeParameters = type2.root.inferTypeParameters;
                        const extendsTypeNode = typeToTypeNodeHelper(type2.extendsType, context);
                        context.inferTypeParameters = saveInferTypeParameters;
                        const trueTypeNode = typeToTypeNodeOrCircularityElision(getTrueTypeFromConditionalType(type2));
                        const falseTypeNode = typeToTypeNodeOrCircularityElision(getFalseTypeFromConditionalType(type2));
                        return factory.createConditionalTypeNode(checkTypeNode, extendsTypeNode, trueTypeNode, falseTypeNode);
                    }
                    function typeToTypeNodeOrCircularityElision(type2) {
                        var _a3, _b2, _c;
                        if (type2.flags & 1048576 /* Union */) {
                            if ((_a3 = context.visitedTypes) == null ? void 0 : _a3.has(getTypeId(type2))) {
                                if (!(context.flags & 131072 /* AllowAnonymousIdentifier */)) {
                                    context.encounteredError = true;
                                    (_c = (_b2 = context.tracker) == null ? void 0 : _b2.reportCyclicStructureError) == null ? void 0 : _c.call(_b2);
                                }
                                return createElidedInformationPlaceholder(context);
                            }
                            return visitAndTransformType(type2, (type3) => typeToTypeNodeHelper(type3, context));
                        }
                        return typeToTypeNodeHelper(type2, context);
                    }
                    function isHomomorphicMappedTypeWithNonHomomorphicInstantiation(type2) {
                        return isMappedTypeWithKeyofConstraintDeclaration(type2) && !(getModifiersTypeFromMappedType(type2).flags & 262144 /* TypeParameter */);
                    }
                    function createMappedTypeNodeFromType(type2) {
                        Debug.assert(!!(type2.flags & 524288 /* Object */));
                        const readonlyToken = type2.declaration.readonlyToken ? factory.createToken(type2.declaration.readonlyToken.kind) : void 0;
                        const questionToken = type2.declaration.questionToken ? factory.createToken(type2.declaration.questionToken.kind) : void 0;
                        let appropriateConstraintTypeNode;
                        let newTypeVariable;
                        if (isMappedTypeWithKeyofConstraintDeclaration(type2)) {
                            if (isHomomorphicMappedTypeWithNonHomomorphicInstantiation(type2) && context.flags & 4 /* GenerateNamesForShadowedTypeParams */) {
                                const newParam = createTypeParameter(createSymbol(262144 /* TypeParameter */, "T"));
                                const name = typeParameterToName(newParam, context);
                                newTypeVariable = factory.createTypeReferenceNode(name);
                            }
                            appropriateConstraintTypeNode = factory.createTypeOperatorNode(141 /* KeyOfKeyword */, newTypeVariable || typeToTypeNodeHelper(getModifiersTypeFromMappedType(type2), context));
                        }
                        else {
                            appropriateConstraintTypeNode = typeToTypeNodeHelper(getConstraintTypeFromMappedType(type2), context);
                        }
                        const typeParameterNode = typeParameterToDeclarationWithConstraint(getTypeParameterFromMappedType(type2), context, appropriateConstraintTypeNode);
                        const nameTypeNode = type2.declaration.nameType ? typeToTypeNodeHelper(getNameTypeFromMappedType(type2), context) : void 0;
                        const templateTypeNode = typeToTypeNodeHelper(removeMissingType(getTemplateTypeFromMappedType(type2), !!(getMappedTypeModifiers(type2) & 4 /* IncludeOptional */)), context);
                        const mappedTypeNode = factory.createMappedTypeNode(readonlyToken, typeParameterNode, nameTypeNode, questionToken, templateTypeNode, 
                        /*members*/
                        void 0);
                        context.approximateLength += 10;
                        const result = setEmitFlags(mappedTypeNode, 1 /* SingleLine */);
                        if (isHomomorphicMappedTypeWithNonHomomorphicInstantiation(type2) && context.flags & 4 /* GenerateNamesForShadowedTypeParams */) {
                            const originalConstraint = instantiateType(getConstraintOfTypeParameter(getTypeFromTypeNode(type2.declaration.typeParameter.constraint.type)) || unknownType, type2.mapper);
                            return factory.createConditionalTypeNode(typeToTypeNodeHelper(getModifiersTypeFromMappedType(type2), context), factory.createInferTypeNode(factory.createTypeParameterDeclaration(
                            /*modifiers*/
                            void 0, factory.cloneNode(newTypeVariable.typeName), originalConstraint.flags & 2 /* Unknown */ ? void 0 : typeToTypeNodeHelper(originalConstraint, context))), result, factory.createKeywordTypeNode(144 /* NeverKeyword */));
                        }
                        return result;
                    }
                    function createAnonymousTypeNode(type2) {
                        var _a3, _b2;
                        const typeId = type2.id;
                        const symbol = type2.symbol;
                        if (symbol) {
                            const isInstanceType = isClassInstanceSide(type2) ? 788968 /* Type */ : 111551 /* Value */;
                            if (isJSConstructor(symbol.valueDeclaration)) {
                                return symbolToTypeNode(symbol, context, isInstanceType);
                            }
                            else if (symbol.flags & 32 /* Class */ && !getBaseTypeVariableOfClass(symbol) && !(symbol.valueDeclaration && isClassLike(symbol.valueDeclaration) && context.flags & 2048 /* WriteClassExpressionAsTypeLiteral */ && (!isClassDeclaration(symbol.valueDeclaration) || isSymbolAccessible(symbol, context.enclosingDeclaration, isInstanceType, 
                            /*computeAliases*/
                            false).accessibility !== 0 /* Accessible */)) || symbol.flags & (384 /* Enum */ | 512 /* ValueModule */) || shouldWriteTypeOfFunctionSymbol()) {
                                return symbolToTypeNode(symbol, context, isInstanceType);
                            }
                            else if ((_a3 = context.visitedTypes) == null ? void 0 : _a3.has(typeId)) {
                                const typeAlias = getTypeAliasForTypeLiteral(type2);
                                if (typeAlias) {
                                    return symbolToTypeNode(typeAlias, context, 788968 /* Type */);
                                }
                                else {
                                    return createElidedInformationPlaceholder(context);
                                }
                            }
                            else {
                                return visitAndTransformType(type2, createTypeNodeFromObjectType);
                            }
                        }
                        else {
                            const isInstantiationExpressionType = !!(getObjectFlags(type2) & 8388608 /* InstantiationExpressionType */);
                            if (isInstantiationExpressionType) {
                                const instantiationExpressionType = type2;
                                if (isTypeQueryNode(instantiationExpressionType.node)) {
                                    const typeNode = serializeExistingTypeNode(context, instantiationExpressionType.node);
                                    if (typeNode) {
                                        return typeNode;
                                    }
                                }
                                if ((_b2 = context.visitedTypes) == null ? void 0 : _b2.has(typeId)) {
                                    return createElidedInformationPlaceholder(context);
                                }
                                return visitAndTransformType(type2, createTypeNodeFromObjectType);
                            }
                            return createTypeNodeFromObjectType(type2);
                        }
                        function shouldWriteTypeOfFunctionSymbol() {
                            var _a4;
                            const isStaticMethodSymbol = !!(symbol.flags & 8192 /* Method */) && // typeof static method
                                some(symbol.declarations, (declaration) => isStatic(declaration));
                            const isNonLocalFunctionSymbol = !!(symbol.flags & 16 /* Function */) && (symbol.parent || // is exported function symbol
                                forEach(symbol.declarations, (declaration) => declaration.parent.kind === 308 /* SourceFile */ || declaration.parent.kind === 265 /* ModuleBlock */));
                            if (isStaticMethodSymbol || isNonLocalFunctionSymbol) {
                                return (!!(context.flags & 4096 /* UseTypeOfFunction */) || ((_a4 = context.visitedTypes) == null ? void 0 : _a4.has(typeId))) && // it is type of the symbol uses itself recursively
                                    (!(context.flags & 8 /* UseStructuralFallback */) || isValueSymbolAccessible(symbol, context.enclosingDeclaration));
                            }
                        }
                    }
                    function visitAndTransformType(type2, transform2) {
                        var _a3, _b2;
                        const typeId = type2.id;
                        const isConstructorObject = getObjectFlags(type2) & 16 /* Anonymous */ && type2.symbol && type2.symbol.flags & 32 /* Class */;
                        const id = getObjectFlags(type2) & 4 /* Reference */ && type2.node ? "N" + getNodeId(type2.node) : type2.flags & 16777216 /* Conditional */ ? "N" + getNodeId(type2.root.node) : type2.symbol ? (isConstructorObject ? "+" : "") + getSymbolId(type2.symbol) : void 0;
                        if (!context.visitedTypes) {
                            context.visitedTypes = /* @__PURE__ */ new Set();
                        }
                        if (id && !context.symbolDepth) {
                            context.symbolDepth = /* @__PURE__ */ new Map();
                        }
                        const links = context.enclosingDeclaration && getNodeLinks(context.enclosingDeclaration);
                        const key = `${getTypeId(type2)}|${context.flags}`;
                        if (links) {
                            links.serializedTypes || (links.serializedTypes = /* @__PURE__ */ new Map());
                        }
                        const cachedResult = (_a3 = links == null ? void 0 : links.serializedTypes) == null ? void 0 : _a3.get(key);
                        if (cachedResult) {
                            if (cachedResult.truncating) {
                                context.truncating = true;
                            }
                            context.approximateLength += cachedResult.addedLength;
                            return deepCloneOrReuseNode(cachedResult.node);
                        }
                        let depth;
                        if (id) {
                            depth = context.symbolDepth.get(id) || 0;
                            if (depth > 10) {
                                return createElidedInformationPlaceholder(context);
                            }
                            context.symbolDepth.set(id, depth + 1);
                        }
                        context.visitedTypes.add(typeId);
                        const startLength = context.approximateLength;
                        const result = transform2(type2);
                        const addedLength = context.approximateLength - startLength;
                        if (!context.reportedDiagnostic && !context.encounteredError) {
                            (_b2 = links == null ? void 0 : links.serializedTypes) == null ? void 0 : _b2.set(key, { node: result, truncating: context.truncating, addedLength });
                        }
                        context.visitedTypes.delete(typeId);
                        if (id) {
                            context.symbolDepth.set(id, depth);
                        }
                        return result;
                        function deepCloneOrReuseNode(node) {
                            if (!nodeIsSynthesized(node) && getParseTreeNode(node) === node) {
                                return node;
                            }
                            return setTextRange(factory.cloneNode(visitEachChild(node, deepCloneOrReuseNode, nullTransformationContext, deepCloneOrReuseNodes)), node);
                        }
                        function deepCloneOrReuseNodes(nodes, visitor, test, start, count) {
                            if (nodes && nodes.length === 0) {
                                return setTextRange(factory.createNodeArray(
                                /*nodes*/
                                void 0, nodes.hasTrailingComma), nodes);
                            }
                            return visitNodes2(nodes, visitor, test, start, count);
                        }
                    }
                    function createTypeNodeFromObjectType(type2) {
                        if (isGenericMappedType(type2) || type2.containsError) {
                            return createMappedTypeNodeFromType(type2);
                        }
                        const resolved = resolveStructuredTypeMembers(type2);
                        if (!resolved.properties.length && !resolved.indexInfos.length) {
                            if (!resolved.callSignatures.length && !resolved.constructSignatures.length) {
                                context.approximateLength += 2;
                                return setEmitFlags(factory.createTypeLiteralNode(
                                /*members*/
                                void 0), 1 /* SingleLine */);
                            }
                            if (resolved.callSignatures.length === 1 && !resolved.constructSignatures.length) {
                                const signature = resolved.callSignatures[0];
                                const signatureNode = signatureToSignatureDeclarationHelper(signature, 181 /* FunctionType */, context);
                                return signatureNode;
                            }
                            if (resolved.constructSignatures.length === 1 && !resolved.callSignatures.length) {
                                const signature = resolved.constructSignatures[0];
                                const signatureNode = signatureToSignatureDeclarationHelper(signature, 182 /* ConstructorType */, context);
                                return signatureNode;
                            }
                        }
                        const abstractSignatures = filter(resolved.constructSignatures, (signature) => !!(signature.flags & 4 /* Abstract */));
                        if (some(abstractSignatures)) {
                            const types = map(abstractSignatures, getOrCreateTypeFromSignature);
                            const typeElementCount = resolved.callSignatures.length + (resolved.constructSignatures.length - abstractSignatures.length) + resolved.indexInfos.length + // exclude `prototype` when writing a class expression as a type literal, as per
                                // the logic in `createTypeNodesFromResolvedType`.
                                (context.flags & 2048 /* WriteClassExpressionAsTypeLiteral */ ? countWhere(resolved.properties, (p) => !(p.flags & 4194304 /* Prototype */)) : length(resolved.properties));
                            if (typeElementCount) {
                                types.push(getResolvedTypeWithoutAbstractConstructSignatures(resolved));
                            }
                            return typeToTypeNodeHelper(getIntersectionType(types), context);
                        }
                        const savedFlags = context.flags;
                        context.flags |= 4194304 /* InObjectTypeLiteral */;
                        const members = createTypeNodesFromResolvedType(resolved);
                        context.flags = savedFlags;
                        const typeLiteralNode = factory.createTypeLiteralNode(members);
                        context.approximateLength += 2;
                        setEmitFlags(typeLiteralNode, context.flags & 1024 /* MultilineObjectLiterals */ ? 0 : 1 /* SingleLine */);
                        return typeLiteralNode;
                    }
                    function typeReferenceToTypeNode(type2) {
                        let typeArguments = getTypeArguments(type2);
                        if (type2.target === globalArrayType || type2.target === globalReadonlyArrayType) {
                            if (context.flags & 2 /* WriteArrayAsGenericType */) {
                                const typeArgumentNode = typeToTypeNodeHelper(typeArguments[0], context);
                                return factory.createTypeReferenceNode(type2.target === globalArrayType ? "Array" : "ReadonlyArray", [typeArgumentNode]);
                            }
                            const elementType = typeToTypeNodeHelper(typeArguments[0], context);
                            const arrayType = factory.createArrayTypeNode(elementType);
                            return type2.target === globalArrayType ? arrayType : factory.createTypeOperatorNode(146 /* ReadonlyKeyword */, arrayType);
                        }
                        else if (type2.target.objectFlags & 8 /* Tuple */) {
                            typeArguments = sameMap(typeArguments, (t, i) => removeMissingType(t, !!(type2.target.elementFlags[i] & 2 /* Optional */)));
                            if (typeArguments.length > 0) {
                                const arity = getTypeReferenceArity(type2);
                                const tupleConstituentNodes = mapToTypeNodes(typeArguments.slice(0, arity), context);
                                if (tupleConstituentNodes) {
                                    if (type2.target.labeledElementDeclarations) {
                                        for (let i = 0; i < tupleConstituentNodes.length; i++) {
                                            const flags = type2.target.elementFlags[i];
                                            tupleConstituentNodes[i] = factory.createNamedTupleMember(flags & 12 /* Variable */ ? factory.createToken(25 /* DotDotDotToken */) : void 0, factory.createIdentifier(unescapeLeadingUnderscores(getTupleElementLabel(type2.target.labeledElementDeclarations[i]))), flags & 2 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0, flags & 4 /* Rest */ ? factory.createArrayTypeNode(tupleConstituentNodes[i]) : tupleConstituentNodes[i]);
                                        }
                                    }
                                    else {
                                        for (let i = 0; i < Math.min(arity, tupleConstituentNodes.length); i++) {
                                            const flags = type2.target.elementFlags[i];
                                            tupleConstituentNodes[i] = flags & 12 /* Variable */ ? factory.createRestTypeNode(flags & 4 /* Rest */ ? factory.createArrayTypeNode(tupleConstituentNodes[i]) : tupleConstituentNodes[i]) : flags & 2 /* Optional */ ? factory.createOptionalTypeNode(tupleConstituentNodes[i]) : tupleConstituentNodes[i];
                                        }
                                    }
                                    const tupleTypeNode = setEmitFlags(factory.createTupleTypeNode(tupleConstituentNodes), 1 /* SingleLine */);
                                    return type2.target.readonly ? factory.createTypeOperatorNode(146 /* ReadonlyKeyword */, tupleTypeNode) : tupleTypeNode;
                                }
                            }
                            if (context.encounteredError || context.flags & 524288 /* AllowEmptyTuple */) {
                                const tupleTypeNode = setEmitFlags(factory.createTupleTypeNode([]), 1 /* SingleLine */);
                                return type2.target.readonly ? factory.createTypeOperatorNode(146 /* ReadonlyKeyword */, tupleTypeNode) : tupleTypeNode;
                            }
                            context.encounteredError = true;
                            return void 0;
                        }
                        else if (context.flags & 2048 /* WriteClassExpressionAsTypeLiteral */ && type2.symbol.valueDeclaration && isClassLike(type2.symbol.valueDeclaration) && !isValueSymbolAccessible(type2.symbol, context.enclosingDeclaration)) {
                            return createAnonymousTypeNode(type2);
                        }
                        else {
                            const outerTypeParameters = type2.target.outerTypeParameters;
                            let i = 0;
                            let resultType;
                            if (outerTypeParameters) {
                                const length2 = outerTypeParameters.length;
                                while (i < length2) {
                                    const start = i;
                                    const parent2 = getParentSymbolOfTypeParameter(outerTypeParameters[i]);
                                    do {
                                        i++;
                                    } while (i < length2 && getParentSymbolOfTypeParameter(outerTypeParameters[i]) === parent2);
                                    if (!rangeEquals(outerTypeParameters, typeArguments, start, i)) {
                                        const typeArgumentSlice = mapToTypeNodes(typeArguments.slice(start, i), context);
                                        const flags2 = context.flags;
                                        context.flags |= 16 /* ForbidIndexedAccessSymbolReferences */;
                                        const ref = symbolToTypeNode(parent2, context, 788968 /* Type */, typeArgumentSlice);
                                        context.flags = flags2;
                                        resultType = !resultType ? ref : appendReferenceToType(resultType, ref);
                                    }
                                }
                            }
                            let typeArgumentNodes;
                            if (typeArguments.length > 0) {
                                const typeParameterCount = (type2.target.typeParameters || emptyArray).length;
                                typeArgumentNodes = mapToTypeNodes(typeArguments.slice(i, typeParameterCount), context);
                            }
                            const flags = context.flags;
                            context.flags |= 16 /* ForbidIndexedAccessSymbolReferences */;
                            const finalRef = symbolToTypeNode(type2.symbol, context, 788968 /* Type */, typeArgumentNodes);
                            context.flags = flags;
                            return !resultType ? finalRef : appendReferenceToType(resultType, finalRef);
                        }
                    }
                    function appendReferenceToType(root, ref) {
                        if (isImportTypeNode(root)) {
                            let typeArguments = root.typeArguments;
                            let qualifier = root.qualifier;
                            if (qualifier) {
                                if (isIdentifier(qualifier)) {
                                    if (typeArguments !== getIdentifierTypeArguments(qualifier)) {
                                        qualifier = setIdentifierTypeArguments(factory.cloneNode(qualifier), typeArguments);
                                    }
                                }
                                else {
                                    if (typeArguments !== getIdentifierTypeArguments(qualifier.right)) {
                                        qualifier = factory.updateQualifiedName(qualifier, qualifier.left, setIdentifierTypeArguments(factory.cloneNode(qualifier.right), typeArguments));
                                    }
                                }
                            }
                            typeArguments = ref.typeArguments;
                            const ids = getAccessStack(ref);
                            for (const id of ids) {
                                qualifier = qualifier ? factory.createQualifiedName(qualifier, id) : id;
                            }
                            return factory.updateImportTypeNode(root, root.argument, root.assertions, qualifier, typeArguments, root.isTypeOf);
                        }
                        else {
                            let typeArguments = root.typeArguments;
                            let typeName = root.typeName;
                            if (isIdentifier(typeName)) {
                                if (typeArguments !== getIdentifierTypeArguments(typeName)) {
                                    typeName = setIdentifierTypeArguments(factory.cloneNode(typeName), typeArguments);
                                }
                            }
                            else {
                                if (typeArguments !== getIdentifierTypeArguments(typeName.right)) {
                                    typeName = factory.updateQualifiedName(typeName, typeName.left, setIdentifierTypeArguments(factory.cloneNode(typeName.right), typeArguments));
                                }
                            }
                            typeArguments = ref.typeArguments;
                            const ids = getAccessStack(ref);
                            for (const id of ids) {
                                typeName = factory.createQualifiedName(typeName, id);
                            }
                            return factory.updateTypeReferenceNode(root, typeName, typeArguments);
                        }
                    }
                    function getAccessStack(ref) {
                        let state = ref.typeName;
                        const ids = [];
                        while (!isIdentifier(state)) {
                            ids.unshift(state.right);
                            state = state.left;
                        }
                        ids.unshift(state);
                        return ids;
                    }
                    function createTypeNodesFromResolvedType(resolvedType) {
                        if (checkTruncationLength(context)) {
                            return [factory.createPropertySignature(
                                /*modifiers*/
                                void 0, "...", 
                                /*questionToken*/
                                void 0, 
                                /*type*/
                                void 0)];
                        }
                        const typeElements = [];
                        for (const signature of resolvedType.callSignatures) {
                            typeElements.push(signatureToSignatureDeclarationHelper(signature, 176 /* CallSignature */, context));
                        }
                        for (const signature of resolvedType.constructSignatures) {
                            if (signature.flags & 4 /* Abstract */)
                                continue;
                            typeElements.push(signatureToSignatureDeclarationHelper(signature, 177 /* ConstructSignature */, context));
                        }
                        for (const info of resolvedType.indexInfos) {
                            typeElements.push(indexInfoToIndexSignatureDeclarationHelper(info, context, resolvedType.objectFlags & 1024 /* ReverseMapped */ ? createElidedInformationPlaceholder(context) : void 0));
                        }
                        const properties = resolvedType.properties;
                        if (!properties) {
                            return typeElements;
                        }
                        let i = 0;
                        for (const propertySymbol of properties) {
                            i++;
                            if (context.flags & 2048 /* WriteClassExpressionAsTypeLiteral */) {
                                if (propertySymbol.flags & 4194304 /* Prototype */) {
                                    continue;
                                }
                                if (getDeclarationModifierFlagsFromSymbol(propertySymbol) & (8 /* Private */ | 16 /* Protected */) && context.tracker.reportPrivateInBaseOfClassExpression) {
                                    context.tracker.reportPrivateInBaseOfClassExpression(unescapeLeadingUnderscores(propertySymbol.escapedName));
                                }
                            }
                            if (checkTruncationLength(context) && i + 2 < properties.length - 1) {
                                typeElements.push(factory.createPropertySignature(
                                /*modifiers*/
                                void 0, `... ${properties.length - i} more ...`, 
                                /*questionToken*/
                                void 0, 
                                /*type*/
                                void 0));
                                addPropertyToElementList(properties[properties.length - 1], context, typeElements);
                                break;
                            }
                            addPropertyToElementList(propertySymbol, context, typeElements);
                        }
                        return typeElements.length ? typeElements : void 0;
                    }
                }
                function addPropertyToElementList(propertySymbol, context, typeElements) {
                    var _a2;
                    const propertyIsReverseMapped = !!(getCheckFlags(propertySymbol) & 8192 /* ReverseMapped */);
                    const propertyType = shouldUsePlaceholderForProperty(propertySymbol, context) ? anyType : getNonMissingTypeOfSymbol(propertySymbol);
                    const saveEnclosingDeclaration = context.enclosingDeclaration;
                    context.enclosingDeclaration = void 0;
                    if (context.tracker.canTrackSymbol && isLateBoundName(propertySymbol.escapedName)) {
                        if (propertySymbol.declarations) {
                            const decl = first(propertySymbol.declarations);
                            if (hasLateBindableName(decl)) {
                                if (isBinaryExpression(decl)) {
                                    const name = getNameOfDeclaration(decl);
                                    if (name && isElementAccessExpression(name) && isPropertyAccessEntityNameExpression(name.argumentExpression)) {
                                        trackComputedName(name.argumentExpression, saveEnclosingDeclaration, context);
                                    }
                                }
                                else {
                                    trackComputedName(decl.name.expression, saveEnclosingDeclaration, context);
                                }
                            }
                        }
                        else {
                            context.tracker.reportNonSerializableProperty(symbolToString(propertySymbol));
                        }
                    }
                    context.enclosingDeclaration = propertySymbol.valueDeclaration || ((_a2 = propertySymbol.declarations) == null ? void 0 : _a2[0]) || saveEnclosingDeclaration;
                    const propertyName = getPropertyNameNodeForSymbol(propertySymbol, context);
                    context.enclosingDeclaration = saveEnclosingDeclaration;
                    context.approximateLength += symbolName(propertySymbol).length + 1;
                    const optionalToken = propertySymbol.flags & 16777216 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0;
                    if (propertySymbol.flags & (16 /* Function */ | 8192 /* Method */) && !getPropertiesOfObjectType(propertyType).length && !isReadonlySymbol(propertySymbol)) {
                        const signatures = getSignaturesOfType(filterType(propertyType, (t) => !(t.flags & 32768 /* Undefined */)), 0 /* Call */);
                        for (const signature of signatures) {
                            const methodDeclaration = signatureToSignatureDeclarationHelper(signature, 170 /* MethodSignature */, context, { name: propertyName, questionToken: optionalToken });
                            typeElements.push(preserveCommentsOn(methodDeclaration));
                        }
                    }
                    else {
                        let propertyTypeNode;
                        if (shouldUsePlaceholderForProperty(propertySymbol, context)) {
                            propertyTypeNode = createElidedInformationPlaceholder(context);
                        }
                        else {
                            if (propertyIsReverseMapped) {
                                context.reverseMappedStack || (context.reverseMappedStack = []);
                                context.reverseMappedStack.push(propertySymbol);
                            }
                            propertyTypeNode = propertyType ? serializeTypeForDeclaration(context, propertyType, propertySymbol, saveEnclosingDeclaration) : factory.createKeywordTypeNode(131 /* AnyKeyword */);
                            if (propertyIsReverseMapped) {
                                context.reverseMappedStack.pop();
                            }
                        }
                        const modifiers = isReadonlySymbol(propertySymbol) ? [factory.createToken(146 /* ReadonlyKeyword */)] : void 0;
                        if (modifiers) {
                            context.approximateLength += 9;
                        }
                        const propertySignature = factory.createPropertySignature(modifiers, propertyName, optionalToken, propertyTypeNode);
                        typeElements.push(preserveCommentsOn(propertySignature));
                    }
                    function preserveCommentsOn(node) {
                        var _a3;
                        if (some(propertySymbol.declarations, (d) => d.kind === 351 /* JSDocPropertyTag */)) {
                            const d = (_a3 = propertySymbol.declarations) == null ? void 0 : _a3.find((d2) => d2.kind === 351 /* JSDocPropertyTag */);
                            const commentText = getTextOfJSDocComment(d.comment);
                            if (commentText) {
                                setSyntheticLeadingComments(node, [{ kind: 3 /* MultiLineCommentTrivia */, text: "*\n * " + commentText.replace(/\n/g, "\n * ") + "\n ", pos: -1, end: -1, hasTrailingNewLine: true }]);
                            }
                        }
                        else if (propertySymbol.valueDeclaration) {
                            setCommentRange(node, propertySymbol.valueDeclaration);
                        }
                        return node;
                    }
                }
                function signatureToSignatureDeclarationHelper(signature, kind, context, options) {
                    var _a2, _b, _c, _d, _e;
                    const suppressAny = context.flags & 256 /* SuppressAnyReturnType */;
                    if (suppressAny)
                        context.flags &= ~256 /* SuppressAnyReturnType */;
                    context.approximateLength += 3;
                    let typeParameters;
                    let typeArguments;
                    if (context.flags & 32 /* WriteTypeArgumentsOfSignature */ && signature.target && signature.mapper && signature.target.typeParameters) {
                        typeArguments = signature.target.typeParameters.map((parameter) => typeToTypeNodeHelper(instantiateType(parameter, signature.mapper), context));
                    }
                    else {
                        typeParameters = signature.typeParameters && signature.typeParameters.map((parameter) => typeParameterToDeclaration(parameter, context));
                    }
                    const expandedParams = getExpandedParameters(signature, 
                    /*skipUnionExpanding*/
                    true)[0];
                    let cleanup;
                    if (context.enclosingDeclaration && signature.declaration && signature.declaration !== context.enclosingDeclaration && !isInJSFile(signature.declaration) && some(expandedParams)) {
                        const existingFakeScope = getNodeLinks(context.enclosingDeclaration).fakeScopeForSignatureDeclaration ? context.enclosingDeclaration : void 0;
                        Debug.assertOptionalNode(existingFakeScope, isBlock);
                        const locals = (_a2 = existingFakeScope == null ? void 0 : existingFakeScope.locals) != null ? _a2 : createSymbolTable();
                        let newLocals;
                        for (const param of expandedParams) {
                            if (!locals.has(param.escapedName)) {
                                newLocals = append(newLocals, param.escapedName);
                                locals.set(param.escapedName, param);
                            }
                        }
                        if (newLocals) {
                            let removeNewLocals2 = function () {
                                forEach(newLocals, (s) => locals.delete(s));
                            };
                            var removeNewLocals = removeNewLocals2;
                            if (existingFakeScope) {
                                cleanup = removeNewLocals2;
                            }
                            else {
                                const fakeScope = parseNodeFactory.createBlock(emptyArray);
                                getNodeLinks(fakeScope).fakeScopeForSignatureDeclaration = true;
                                fakeScope.locals = locals;
                                const saveEnclosingDeclaration = context.enclosingDeclaration;
                                setParent(fakeScope, saveEnclosingDeclaration);
                                context.enclosingDeclaration = fakeScope;
                                cleanup = () => {
                                    context.enclosingDeclaration = saveEnclosingDeclaration;
                                    removeNewLocals2();
                                };
                            }
                        }
                    }
                    const parameters = (some(expandedParams, (p) => p !== expandedParams[expandedParams.length - 1] && !!(getCheckFlags(p) & 32768 /* RestParameter */)) ? signature.parameters : expandedParams).map((parameter) => symbolToParameterDeclaration(parameter, context, kind === 173 /* Constructor */, options == null ? void 0 : options.privateSymbolVisitor, options == null ? void 0 : options.bundledImports));
                    const thisParameter = context.flags & 33554432 /* OmitThisParameter */ ? void 0 : tryGetThisParameterDeclaration(signature, context);
                    if (thisParameter) {
                        parameters.unshift(thisParameter);
                    }
                    let returnTypeNode;
                    const typePredicate = getTypePredicateOfSignature(signature);
                    if (typePredicate) {
                        const assertsModifier = typePredicate.kind === 2 /* AssertsThis */ || typePredicate.kind === 3 /* AssertsIdentifier */ ? factory.createToken(129 /* AssertsKeyword */) : void 0;
                        const parameterName = typePredicate.kind === 1 /* Identifier */ || typePredicate.kind === 3 /* AssertsIdentifier */ ? setEmitFlags(factory.createIdentifier(typePredicate.parameterName), 33554432 /* NoAsciiEscaping */) : factory.createThisTypeNode();
                        const typeNode = typePredicate.type && typeToTypeNodeHelper(typePredicate.type, context);
                        returnTypeNode = factory.createTypePredicateNode(assertsModifier, parameterName, typeNode);
                    }
                    else {
                        const returnType = getReturnTypeOfSignature(signature);
                        if (returnType && !(suppressAny && isTypeAny(returnType))) {
                            returnTypeNode = serializeReturnTypeForSignature(context, returnType, signature, options == null ? void 0 : options.privateSymbolVisitor, options == null ? void 0 : options.bundledImports);
                        }
                        else if (!suppressAny) {
                            returnTypeNode = factory.createKeywordTypeNode(131 /* AnyKeyword */);
                        }
                    }
                    let modifiers = options == null ? void 0 : options.modifiers;
                    if (kind === 182 /* ConstructorType */ && signature.flags & 4 /* Abstract */) {
                        const flags = modifiersToFlags(modifiers);
                        modifiers = factory.createModifiersFromModifierFlags(flags | 256 /* Abstract */);
                    }
                    const node = kind === 176 /* CallSignature */ ? factory.createCallSignature(typeParameters, parameters, returnTypeNode) : kind === 177 /* ConstructSignature */ ? factory.createConstructSignature(typeParameters, parameters, returnTypeNode) : kind === 170 /* MethodSignature */ ? factory.createMethodSignature(modifiers, (_b = options == null ? void 0 : options.name) != null ? _b : factory.createIdentifier(""), options == null ? void 0 : options.questionToken, typeParameters, parameters, returnTypeNode) : kind === 171 /* MethodDeclaration */ ? factory.createMethodDeclaration(modifiers, 
                    /*asteriskToken*/
                    void 0, (_c = options == null ? void 0 : options.name) != null ? _c : factory.createIdentifier(""), 
                    /*questionToken*/
                    void 0, typeParameters, parameters, returnTypeNode, 
                    /*body*/
                    void 0) : kind === 173 /* Constructor */ ? factory.createConstructorDeclaration(modifiers, parameters, 
                    /*body*/
                    void 0) : kind === 174 /* GetAccessor */ ? factory.createGetAccessorDeclaration(modifiers, (_d = options == null ? void 0 : options.name) != null ? _d : factory.createIdentifier(""), parameters, returnTypeNode, 
                    /*body*/
                    void 0) : kind === 175 /* SetAccessor */ ? factory.createSetAccessorDeclaration(modifiers, (_e = options == null ? void 0 : options.name) != null ? _e : factory.createIdentifier(""), parameters, 
                    /*body*/
                    void 0) : kind === 178 /* IndexSignature */ ? factory.createIndexSignature(modifiers, parameters, returnTypeNode) : kind === 320 /* JSDocFunctionType */ ? factory.createJSDocFunctionType(parameters, returnTypeNode) : kind === 181 /* FunctionType */ ? factory.createFunctionTypeNode(typeParameters, parameters, returnTypeNode != null ? returnTypeNode : factory.createTypeReferenceNode(factory.createIdentifier(""))) : kind === 182 /* ConstructorType */ ? factory.createConstructorTypeNode(modifiers, typeParameters, parameters, returnTypeNode != null ? returnTypeNode : factory.createTypeReferenceNode(factory.createIdentifier(""))) : kind === 259 /* FunctionDeclaration */ ? factory.createFunctionDeclaration(modifiers, 
                    /*asteriskToken*/
                    void 0, (options == null ? void 0 : options.name) ? cast(options.name, isIdentifier) : factory.createIdentifier(""), typeParameters, parameters, returnTypeNode, 
                    /*body*/
                    void 0) : kind === 215 /* FunctionExpression */ ? factory.createFunctionExpression(modifiers, 
                    /*asteriskToken*/
                    void 0, (options == null ? void 0 : options.name) ? cast(options.name, isIdentifier) : factory.createIdentifier(""), typeParameters, parameters, returnTypeNode, factory.createBlock([])) : kind === 216 /* ArrowFunction */ ? factory.createArrowFunction(modifiers, typeParameters, parameters, returnTypeNode, 
                    /*equalsGreaterThanToken*/
                    void 0, factory.createBlock([])) : Debug.assertNever(kind);
                    if (typeArguments) {
                        node.typeArguments = factory.createNodeArray(typeArguments);
                    }
                    cleanup == null ? void 0 : cleanup();
                    return node;
                }
                function getSpecifierForModuleSymbol(symbol, context, overrideImportMode) {
                    var _a2;
                    let file = getDeclarationOfKind(symbol, 308 /* SourceFile */);
                    if (!file) {
                        const equivalentFileSymbol = firstDefined(symbol.declarations, (d) => getFileSymbolIfFileSymbolExportEqualsContainer(d, symbol));
                        if (equivalentFileSymbol) {
                            file = getDeclarationOfKind(equivalentFileSymbol, 308 /* SourceFile */);
                        }
                    }
                    if (file && file.moduleName !== void 0) {
                        return file.moduleName;
                    }
                    if (!file) {
                        if (context.tracker.trackReferencedAmbientModule) {
                            const ambientDecls = filter(symbol.declarations, isAmbientModule);
                            if (length(ambientDecls)) {
                                for (const decl of ambientDecls) {
                                    context.tracker.trackReferencedAmbientModule(decl, symbol);
                                }
                            }
                        }
                        if (ambientModuleSymbolRegex.test(symbol.escapedName)) {
                            return symbol.escapedName.substring(1, symbol.escapedName.length - 1);
                        }
                    }
                    if (!context.enclosingDeclaration || !context.tracker.moduleResolverHost) {
                        if (ambientModuleSymbolRegex.test(symbol.escapedName)) {
                            return symbol.escapedName.substring(1, symbol.escapedName.length - 1);
                        }
                        return getSourceFileOfNode(getNonAugmentationDeclaration(symbol)).fileName;
                    }
                    const contextFile = getSourceFileOfNode(getOriginalNode(context.enclosingDeclaration));
                    const resolutionMode = overrideImportMode || (contextFile == null ? void 0 : contextFile.impliedNodeFormat);
                    const cacheKey = createModeAwareCacheKey(contextFile.path, resolutionMode);
                    const links = getSymbolLinks(symbol);
                    let specifier = links.specifierCache && links.specifierCache.get(cacheKey);
                    if (!specifier) {
                        const isBundle2 = !!outFile(compilerOptions);
                        const { moduleResolverHost } = context.tracker;
                        const specifierCompilerOptions = isBundle2 ? { ...compilerOptions, baseUrl: moduleResolverHost.getCommonSourceDirectory() } : compilerOptions;
                        specifier = first(getModuleSpecifiers(symbol, checker, specifierCompilerOptions, contextFile, moduleResolverHost, {
                            importModuleSpecifierPreference: isBundle2 ? "non-relative" : "project-relative",
                            importModuleSpecifierEnding: isBundle2 ? "minimal" : resolutionMode === 99 /* ESNext */ ? "js" : void 0
                        }, { overrideImportMode }));
                        (_a2 = links.specifierCache) != null ? _a2 : links.specifierCache = /* @__PURE__ */ new Map();
                        links.specifierCache.set(cacheKey, specifier);
                    }
                    return specifier;
                }
                function symbolToTypeNode(symbol, context, meaning, overrideTypeArguments) {
                    var _a2, _b, _c, _d;
                    const chain = lookupSymbolChain(symbol, context, meaning, !(context.flags & 16384 /* UseAliasDefinedOutsideCurrentScope */));
                    const isTypeOf = meaning === 111551 /* Value */;
                    if (some(chain[0].declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
                        const nonRootParts = chain.length > 1 ? createAccessFromSymbolChain(chain, chain.length - 1, 1) : void 0;
                        const typeParameterNodes = overrideTypeArguments || lookupTypeParameterNodes(chain, 0, context);
                        const contextFile = getSourceFileOfNode(getOriginalNode(context.enclosingDeclaration));
                        const targetFile = getSourceFileOfModule(chain[0]);
                        let specifier;
                        let assertion;
                        if (getEmitModuleResolutionKind(compilerOptions) === 3 /* Node16 */ || getEmitModuleResolutionKind(compilerOptions) === 99 /* NodeNext */) {
                            if ((targetFile == null ? void 0 : targetFile.impliedNodeFormat) === 99 /* ESNext */ && targetFile.impliedNodeFormat !== (contextFile == null ? void 0 : contextFile.impliedNodeFormat)) {
                                specifier = getSpecifierForModuleSymbol(chain[0], context, 99 /* ESNext */);
                                assertion = factory.createImportTypeAssertionContainer(factory.createAssertClause(factory.createNodeArray([
                                    factory.createAssertEntry(factory.createStringLiteral("resolution-mode"), factory.createStringLiteral("import"))
                                ])));
                                (_b = (_a2 = context.tracker).reportImportTypeNodeResolutionModeOverride) == null ? void 0 : _b.call(_a2);
                            }
                        }
                        if (!specifier) {
                            specifier = getSpecifierForModuleSymbol(chain[0], context);
                        }
                        if (!(context.flags & 67108864 /* AllowNodeModulesRelativePaths */) && getEmitModuleResolutionKind(compilerOptions) !== 1 /* Classic */ && specifier.indexOf("/node_modules/") >= 0) {
                            const oldSpecifier = specifier;
                            if (getEmitModuleResolutionKind(compilerOptions) === 3 /* Node16 */ || getEmitModuleResolutionKind(compilerOptions) === 99 /* NodeNext */) {
                                const swappedMode = (contextFile == null ? void 0 : contextFile.impliedNodeFormat) === 99 /* ESNext */ ? 1 /* CommonJS */ : 99 /* ESNext */;
                                specifier = getSpecifierForModuleSymbol(chain[0], context, swappedMode);
                                if (specifier.indexOf("/node_modules/") >= 0) {
                                    specifier = oldSpecifier;
                                }
                                else {
                                    assertion = factory.createImportTypeAssertionContainer(factory.createAssertClause(factory.createNodeArray([
                                        factory.createAssertEntry(factory.createStringLiteral("resolution-mode"), factory.createStringLiteral(swappedMode === 99 /* ESNext */ ? "import" : "require"))
                                    ])));
                                    (_d = (_c = context.tracker).reportImportTypeNodeResolutionModeOverride) == null ? void 0 : _d.call(_c);
                                }
                            }
                            if (!assertion) {
                                context.encounteredError = true;
                                if (context.tracker.reportLikelyUnsafeImportRequiredError) {
                                    context.tracker.reportLikelyUnsafeImportRequiredError(oldSpecifier);
                                }
                            }
                        }
                        const lit = factory.createLiteralTypeNode(factory.createStringLiteral(specifier));
                        if (context.tracker.trackExternalModuleSymbolOfImportTypeNode)
                            context.tracker.trackExternalModuleSymbolOfImportTypeNode(chain[0]);
                        context.approximateLength += specifier.length + 10;
                        if (!nonRootParts || isEntityName(nonRootParts)) {
                            if (nonRootParts) {
                                const lastId = isIdentifier(nonRootParts) ? nonRootParts : nonRootParts.right;
                                setIdentifierTypeArguments(lastId, 
                                /*typeArguments*/
                                void 0);
                            }
                            return factory.createImportTypeNode(lit, assertion, nonRootParts, typeParameterNodes, isTypeOf);
                        }
                        else {
                            const splitNode = getTopmostIndexedAccessType(nonRootParts);
                            const qualifier = splitNode.objectType.typeName;
                            return factory.createIndexedAccessTypeNode(factory.createImportTypeNode(lit, assertion, qualifier, typeParameterNodes, isTypeOf), splitNode.indexType);
                        }
                    }
                    const entityName = createAccessFromSymbolChain(chain, chain.length - 1, 0);
                    if (isIndexedAccessTypeNode(entityName)) {
                        return entityName;
                    }
                    if (isTypeOf) {
                        return factory.createTypeQueryNode(entityName);
                    }
                    else {
                        const lastId = isIdentifier(entityName) ? entityName : entityName.right;
                        const lastTypeArgs = getIdentifierTypeArguments(lastId);
                        setIdentifierTypeArguments(lastId, 
                        /*typeArguments*/
                        void 0);
                        return factory.createTypeReferenceNode(entityName, lastTypeArgs);
                    }
                    function createAccessFromSymbolChain(chain2, index, stopper) {
                        const typeParameterNodes = index === chain2.length - 1 ? overrideTypeArguments : lookupTypeParameterNodes(chain2, index, context);
                        const symbol2 = chain2[index];
                        const parent2 = chain2[index - 1];
                        let symbolName2;
                        if (index === 0) {
                            context.flags |= 16777216 /* InInitialEntityName */;
                            symbolName2 = getNameOfSymbolAsWritten(symbol2, context);
                            context.approximateLength += (symbolName2 ? symbolName2.length : 0) + 1;
                            context.flags ^= 16777216 /* InInitialEntityName */;
                        }
                        else {
                            if (parent2 && getExportsOfSymbol(parent2)) {
                                const exports = getExportsOfSymbol(parent2);
                                forEachEntry(exports, (ex, name) => {
                                    if (getSymbolIfSameReference(ex, symbol2) && !isLateBoundName(name) && name !== "export=" /* ExportEquals */) {
                                        symbolName2 = unescapeLeadingUnderscores(name);
                                        return true;
                                    }
                                });
                            }
                        }
                        if (symbolName2 === void 0) {
                            const name = firstDefined(symbol2.declarations, getNameOfDeclaration);
                            if (name && isComputedPropertyName(name) && isEntityName(name.expression)) {
                                const LHS = createAccessFromSymbolChain(chain2, index - 1, stopper);
                                if (isEntityName(LHS)) {
                                    return factory.createIndexedAccessTypeNode(factory.createParenthesizedType(factory.createTypeQueryNode(LHS)), factory.createTypeQueryNode(name.expression));
                                }
                                return LHS;
                            }
                            symbolName2 = getNameOfSymbolAsWritten(symbol2, context);
                        }
                        context.approximateLength += symbolName2.length + 1;
                        if (!(context.flags & 16 /* ForbidIndexedAccessSymbolReferences */) && parent2 && getMembersOfSymbol(parent2) && getMembersOfSymbol(parent2).get(symbol2.escapedName) && getSymbolIfSameReference(getMembersOfSymbol(parent2).get(symbol2.escapedName), symbol2)) {
                            const LHS = createAccessFromSymbolChain(chain2, index - 1, stopper);
                            if (isIndexedAccessTypeNode(LHS)) {
                                return factory.createIndexedAccessTypeNode(LHS, factory.createLiteralTypeNode(factory.createStringLiteral(symbolName2)));
                            }
                            else {
                                return factory.createIndexedAccessTypeNode(factory.createTypeReferenceNode(LHS, typeParameterNodes), factory.createLiteralTypeNode(factory.createStringLiteral(symbolName2)));
                            }
                        }
                        const identifier = setEmitFlags(factory.createIdentifier(symbolName2), 33554432 /* NoAsciiEscaping */);
                        if (typeParameterNodes)
                            setIdentifierTypeArguments(identifier, factory.createNodeArray(typeParameterNodes));
                        identifier.symbol = symbol2;
                        if (index > stopper) {
                            const LHS = createAccessFromSymbolChain(chain2, index - 1, stopper);
                            if (!isEntityName(LHS)) {
                                return Debug.fail("Impossible construct - an export of an indexed access cannot be reachable");
                            }
                            return factory.createQualifiedName(LHS, identifier);
                        }
                        return identifier;
                    }
                }
                function serializeTypeForDeclaration(context, type, symbol, enclosingDeclaration, includePrivateSymbol, bundled) {
                    function visitExistingNodeTreeSymbols(node) {
                        if (isJSDocAllType(node) || node.kind === 322 /* JSDocNamepathType */) {
                            return factory.createKeywordTypeNode(131 /* AnyKeyword */);
                        }
                        if (isJSDocUnknownType(node)) {
                            return factory.createKeywordTypeNode(157 /* UnknownKeyword */);
                        }
                        if (isJSDocNullableType(node)) {
                            return factory.createUnionTypeNode([visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode), factory.createLiteralTypeNode(factory.createNull())]);
                        }
                        if (isJSDocOptionalType(node)) {
                            return factory.createUnionTypeNode([visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode), factory.createKeywordTypeNode(155 /* UndefinedKeyword */)]);
                        }
                        if (isJSDocNonNullableType(node)) {
                            return visitNode(node.type, visitExistingNodeTreeSymbols);
                        }
                        if (isJSDocVariadicType(node)) {
                            return factory.createArrayTypeNode(visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode));
                        }
                        if (isJSDocTypeLiteral(node)) {
                            return factory.createTypeLiteralNode(map(node.jsDocPropertyTags, (t) => {
                                const name = isIdentifier(t.name) ? t.name : t.name.right;
                                const typeViaParent = getTypeOfPropertyOfType(getTypeFromTypeNode(node), name.escapedText);
                                const overrideTypeNode = typeViaParent && t.typeExpression && getTypeFromTypeNode(t.typeExpression.type) !== typeViaParent ? typeToTypeNodeHelper(typeViaParent, context) : void 0;
                                return factory.createPropertySignature(
                                /*modifiers*/
                                void 0, name, t.isBracketed || t.typeExpression && isJSDocOptionalType(t.typeExpression.type) ? factory.createToken(57 /* QuestionToken */) : void 0, overrideTypeNode || t.typeExpression && visitNode(t.typeExpression.type, visitExistingNodeTreeSymbols, isTypeNode) || factory.createKeywordTypeNode(131 /* AnyKeyword */));
                            }));
                        }
                        if (isTypeReferenceNode(node) && isIdentifier(node.typeName) && node.typeName.escapedText === "") {
                            return setOriginalNode(factory.createKeywordTypeNode(131 /* AnyKeyword */), node);
                        }
                        if ((isExpressionWithTypeArguments(node) || isTypeReferenceNode(node)) && isJSDocIndexSignature(node)) {
                            return factory.createTypeLiteralNode([factory.createIndexSignature(
                                /*modifiers*/
                                void 0, [factory.createParameterDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*dotdotdotToken*/
                                    void 0, "x", 
                                    /*questionToken*/
                                    void 0, visitNode(node.typeArguments[0], visitExistingNodeTreeSymbols, isTypeNode))], visitNode(node.typeArguments[1], visitExistingNodeTreeSymbols, isTypeNode))]);
                        }
                        if (isJSDocFunctionType(node)) {
                            if (isJSDocConstructSignature(node)) {
                                let newTypeNode;
                                return factory.createConstructorTypeNode(
                                /*modifiers*/
                                void 0, visitNodes2(node.typeParameters, visitExistingNodeTreeSymbols, isTypeParameterDeclaration), mapDefined(node.parameters, (p, i) => p.name && isIdentifier(p.name) && p.name.escapedText === "new" ? (newTypeNode = p.type, void 0) : factory.createParameterDeclaration(
                                /*modifiers*/
                                void 0, getEffectiveDotDotDotForParameter(p), getNameForJSDocFunctionParameter(p, i), p.questionToken, visitNode(p.type, visitExistingNodeTreeSymbols, isTypeNode), 
                                /*initializer*/
                                void 0)), visitNode(newTypeNode || node.type, visitExistingNodeTreeSymbols, isTypeNode) || factory.createKeywordTypeNode(131 /* AnyKeyword */));
                            }
                            else {
                                return factory.createFunctionTypeNode(visitNodes2(node.typeParameters, visitExistingNodeTreeSymbols, isTypeParameterDeclaration), map(node.parameters, (p, i) => factory.createParameterDeclaration(
                                /*modifiers*/
                                void 0, getEffectiveDotDotDotForParameter(p), getNameForJSDocFunctionParameter(p, i), p.questionToken, visitNode(p.type, visitExistingNodeTreeSymbols, isTypeNode), 
                                /*initializer*/
                                void 0)), visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode) || factory.createKeywordTypeNode(131 /* AnyKeyword */));
                            }
                        }
                        if (isTypeReferenceNode(node) && isInJSDoc(node) && (!existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(node, getTypeFromTypeNode(node)) || getIntendedTypeFromJSDocTypeReference(node) || unknownSymbol === resolveTypeReferenceName(node, 788968 /* Type */, 
                        /*ignoreErrors*/
                        true))) {
                            return setOriginalNode(typeToTypeNodeHelper(getTypeFromTypeNode(node), context), node);
                        }
                        if (isLiteralImportTypeNode(node)) {
                            const nodeSymbol = getNodeLinks(node).resolvedSymbol;
                            if (isInJSDoc(node) && nodeSymbol && // The import type resolved using jsdoc fallback logic
                                (!node.isTypeOf && !(nodeSymbol.flags & 788968 /* Type */) || // The import type had type arguments autofilled by js fallback logic
                                    !(length(node.typeArguments) >= getMinTypeArgumentCount(getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(nodeSymbol))))) {
                                return setOriginalNode(typeToTypeNodeHelper(getTypeFromTypeNode(node), context), node);
                            }
                            return factory.updateImportTypeNode(node, factory.updateLiteralTypeNode(node.argument, rewriteModuleSpecifier(node, node.argument.literal)), node.assertions, node.qualifier, visitNodes2(node.typeArguments, visitExistingNodeTreeSymbols, isTypeNode), node.isTypeOf);
                        }
                        if (isEntityName(node) || isEntityNameExpression(node)) {
                            const { introducesError, node: result } = trackExistingEntityName(node, context, includePrivateSymbol);
                            hadError = hadError || introducesError;
                            if (result !== node) {
                                return result;
                            }
                        }
                        if (file && isTupleTypeNode(node) && getLineAndCharacterOfPosition(file, node.pos).line === getLineAndCharacterOfPosition(file, node.end).line) {
                            setEmitFlags(node, 1 /* SingleLine */);
                        }
                        return visitEachChild(node, visitExistingNodeTreeSymbols, nullTransformationContext);
                        function getEffectiveDotDotDotForParameter(p) {
                            return p.dotDotDotToken || (p.type && isJSDocVariadicType(p.type) ? factory.createToken(25 /* DotDotDotToken */) : void 0);
                        }
                        function getNameForJSDocFunctionParameter(p, index) {
                            return p.name && isIdentifier(p.name) && p.name.escapedText === "this" ? "this" : getEffectiveDotDotDotForParameter(p) ? `args` : `arg${index}`;
                        }
                        function rewriteModuleSpecifier(parent2, lit) {
                            if (bundled) {
                                if (context.tracker && context.tracker.moduleResolverHost) {
                                    const targetFile = getExternalModuleFileFromDeclaration(parent2);
                                    if (targetFile) {
                                        const getCanonicalFileName = createGetCanonicalFileName(!!host.useCaseSensitiveFileNames);
                                        const resolverHost = {
                                            getCanonicalFileName,
                                            getCurrentDirectory: () => context.tracker.moduleResolverHost.getCurrentDirectory(),
                                            getCommonSourceDirectory: () => context.tracker.moduleResolverHost.getCommonSourceDirectory()
                                        };
                                        const newName = getResolvedExternalModuleName(resolverHost, targetFile);
                                        return factory.createStringLiteral(newName);
                                    }
                                }
                            }
                            else {
                                if (context.tracker && context.tracker.trackExternalModuleSymbolOfImportTypeNode) {
                                    const moduleSym = resolveExternalModuleNameWorker(lit, lit, 
                                    /*moduleNotFoundError*/
                                    void 0);
                                    if (moduleSym) {
                                        context.tracker.trackExternalModuleSymbolOfImportTypeNode(moduleSym);
                                    }
                                }
                            }
                            return lit;
                        }
                    }
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
            function getNameOfSymbolAsWritten(symbol, context) {
                if (context && symbol.escapedName === "default" /* Default */ && !(context.flags & 16384 /* UseAliasDefinedOutsideCurrentScope */) && // If it's not the first part of an entity name, it must print as `default`
                    (!(context.flags & 16777216 /* InInitialEntityName */) || // if the symbol is synthesized, it will only be referenced externally it must print as `default`
                        !symbol.declarations || // if not in the same binding context (source file, module declaration), it must print as `default`
                        context.enclosingDeclaration && findAncestor(symbol.declarations[0], isDefaultBindingContext) !== findAncestor(context.enclosingDeclaration, isDefaultBindingContext))) {
                    return "default";
                }
                if (symbol.declarations && symbol.declarations.length) {
                    let declaration = firstDefined(symbol.declarations, (d) => getNameOfDeclaration(d) ? d : void 0);
                    const name2 = declaration && getNameOfDeclaration(declaration);
                    if (declaration && name2) {
                        if (isCallExpression(declaration) && isBindableObjectDefinePropertyCall(declaration)) {
                            return symbolName(symbol);
                        }
                        if (isComputedPropertyName(name2) && !(getCheckFlags(symbol) & 4096 /* Late */)) {
                            const nameType = getSymbolLinks(symbol).nameType;
                            if (nameType && nameType.flags & 384 /* StringOrNumberLiteral */) {
                                const result = getNameOfSymbolFromNameType(symbol, context);
                                if (result !== void 0) {
                                    return result;
                                }
                            }
                        }
                        return declarationNameToString(name2);
                    }
                    if (!declaration) {
                        declaration = symbol.declarations[0];
                    }
                    if (declaration.parent && declaration.parent.kind === 257 /* VariableDeclaration */) {
                        return declarationNameToString(declaration.parent.name);
                    }
                    switch (declaration.kind) {
                        case 228 /* ClassExpression */:
                        case 215 /* FunctionExpression */:
                        case 216 /* ArrowFunction */:
                            if (context && !context.encounteredError && !(context.flags & 131072 /* AllowAnonymousIdentifier */)) {
                                context.encounteredError = true;
                            }
                            return declaration.kind === 228 /* ClassExpression */ ? "(Anonymous class)" : "(Anonymous function)";
                    }
                }
                const name = getNameOfSymbolFromNameType(symbol, context);
                return name !== void 0 ? name : symbolName(symbol);
            }
                function determineIfDeclarationIsVisible() {
                    switch (node.kind) {
                        case 341 /* JSDocCallbackTag */:
                        case 349 /* JSDocTypedefTag */:
                        case 343 /* JSDocEnumTag */:
                            return !!(node.parent && node.parent.parent && node.parent.parent.parent && isSourceFile(node.parent.parent.parent));
                        case 205 /* BindingElement */:
                            return isDeclarationVisible(node.parent.parent);
                        case 257 /* VariableDeclaration */:
                            if (isBindingPattern(node.name) && !node.name.elements.length) {
                                return false;
                            }
                        case 264 /* ModuleDeclaration */:
                        case 260 /* ClassDeclaration */:
                        case 261 /* InterfaceDeclaration */:
                        case 262 /* TypeAliasDeclaration */:
                        case 259 /* FunctionDeclaration */:
                        case 263 /* EnumDeclaration */:
                        case 268 /* ImportEqualsDeclaration */:
                            if (isExternalModuleAugmentation(node)) {
                                return true;
                            }
                            const parent2 = getDeclarationContainer(node);
                            if (!(getCombinedModifierFlags(node) & 1 /* Export */) && !(node.kind !== 268 /* ImportEqualsDeclaration */ && parent2.kind !== 308 /* SourceFile */ && parent2.flags & 16777216 /* Ambient */)) {
                                return isGlobalSourceFile(parent2);
                            }
                            return isDeclarationVisible(parent2);
                        case 169 /* PropertyDeclaration */:
                        case 168 /* PropertySignature */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                        case 171 /* MethodDeclaration */:
                        case 170 /* MethodSignature */:
                            if (hasEffectiveModifier(node, 8 /* Private */ | 16 /* Protected */)) {
                                return false;
                            }
                        case 173 /* Constructor */:
                        case 177 /* ConstructSignature */:
                        case 176 /* CallSignature */:
                        case 178 /* IndexSignature */:
                        case 166 /* Parameter */:
                        case 265 /* ModuleBlock */:
                        case 181 /* FunctionType */:
                        case 182 /* ConstructorType */:
                        case 184 /* TypeLiteral */:
                        case 180 /* TypeReference */:
                        case 185 /* ArrayType */:
                        case 186 /* TupleType */:
                        case 189 /* UnionType */:
                        case 190 /* IntersectionType */:
                        case 193 /* ParenthesizedType */:
                        case 199 /* NamedTupleMember */:
                            return isDeclarationVisible(node.parent);
                        case 270 /* ImportClause */:
                        case 271 /* NamespaceImport */:
                        case 273 /* ImportSpecifier */:
                            return false;
                        case 165 /* TypeParameter */:
                        case 308 /* SourceFile */:
                        case 267 /* NamespaceExportDeclaration */:
                            return true;
                        case 274 /* ExportAssignment */:
                            return false;
                        default:
                            return false;
                    }
                }
            function getBindingElementTypeFromParentType(declaration, parentType) {
                if (isTypeAny(parentType)) {
                    return parentType;
                }
                const pattern = declaration.parent;
                if (strictNullChecks && declaration.flags & 16777216 /* Ambient */ && isParameterDeclaration(declaration)) {
                    parentType = getNonNullableType(parentType);
                }
                else if (strictNullChecks && pattern.parent.initializer && !(getTypeFacts(getTypeOfInitializer(pattern.parent.initializer)) & 65536 /* EQUndefined */)) {
                    parentType = getTypeWithFacts(parentType, 524288 /* NEUndefined */);
                }
                let type;
                if (pattern.kind === 203 /* ObjectBindingPattern */) {
                    if (declaration.dotDotDotToken) {
                        parentType = getReducedType(parentType);
                        if (parentType.flags & 2 /* Unknown */ || !isValidSpreadType(parentType)) {
                            error(declaration, Diagnostics.Rest_types_may_only_be_created_from_object_types);
                            return errorType;
                        }
                        const literalMembers = [];
                        for (const element of pattern.elements) {
                            if (!element.dotDotDotToken) {
                                literalMembers.push(element.propertyName || element.name);
                            }
                        }
                        type = getRestType(parentType, literalMembers, declaration.symbol);
                    }
                    else {
                        const name = declaration.propertyName || declaration.name;
                        const indexType = getLiteralTypeFromPropertyName(name);
                        const declaredType = getIndexedAccessType(parentType, indexType, 32 /* ExpressionPosition */, name);
                        type = getFlowTypeOfDestructuring(declaration, declaredType);
                    }
                }
                else {
                    const elementType = checkIteratedTypeOrElementType(65 /* Destructuring */ | (declaration.dotDotDotToken ? 0 : 128 /* PossiblyOutOfBounds */), parentType, undefinedType, pattern);
                    const index = pattern.elements.indexOf(declaration);
                    if (declaration.dotDotDotToken) {
                        const baseConstraint = getBaseConstraintOrType(parentType);
                        type = everyType(baseConstraint, isTupleType) ? mapType(baseConstraint, (t) => sliceTupleType(t, index)) : createArrayType(elementType);
                    }
                    else if (isArrayLikeType(parentType)) {
                        const indexType = getNumberLiteralType(index);
                        const accessFlags = 32 /* ExpressionPosition */ | (hasDefaultValue(declaration) ? 16 /* NoTupleBoundsCheck */ : 0);
                        const declaredType = getIndexedAccessTypeOrUndefined(parentType, indexType, accessFlags, declaration.name) || errorType;
                        type = getFlowTypeOfDestructuring(declaration, declaredType);
                    }
                    else {
                        type = elementType;
                    }
                }
                if (!declaration.initializer) {
                    return type;
                }
                if (getEffectiveTypeAnnotationNode(walkUpBindingElementsAndPatterns(declaration))) {
                    return strictNullChecks && !(getTypeFacts(checkDeclarationInitializer(declaration, 0 /* Normal */)) & 16777216 /* IsUndefined */) ? getNonUndefinedType(type) : type;
                }
                return widenTypeInferredFromInitializer(declaration, getUnionType([getNonUndefinedType(type), checkDeclarationInitializer(declaration, 0 /* Normal */)], 2 /* Subtype */));
            }
            function getTypeForVariableLikeDeclaration(declaration, includeOptionality, checkMode) {
                if (isVariableDeclaration(declaration) && declaration.parent.parent.kind === 246 /* ForInStatement */) {
                    const indexType = getIndexType(getNonNullableTypeIfNeeded(checkExpression(declaration.parent.parent.expression, 
                    /*checkMode*/
                    checkMode)));
                    return indexType.flags & (262144 /* TypeParameter */ | 4194304 /* Index */) ? getExtractStringType(indexType) : stringType;
                }
                if (isVariableDeclaration(declaration) && declaration.parent.parent.kind === 247 /* ForOfStatement */) {
                    const forOfStatement = declaration.parent.parent;
                    return checkRightHandSideOfForOf(forOfStatement) || anyType;
                }
                if (isBindingPattern(declaration.parent)) {
                    return getTypeForBindingElement(declaration);
                }
                const isProperty = isPropertyDeclaration(declaration) && !hasAccessorModifier(declaration) || isPropertySignature(declaration) || isJSDocPropertyTag(declaration);
                const isOptional = includeOptionality && isOptionalDeclaration(declaration);
                const declaredType = tryGetTypeFromEffectiveTypeNode(declaration);
                if (isCatchClauseVariableDeclarationOrBindingElement(declaration)) {
                    if (declaredType) {
                        return isTypeAny(declaredType) || declaredType === unknownType ? declaredType : errorType;
                    }
                    return useUnknownInCatchVariables ? unknownType : anyType;
                }
                if (declaredType) {
                    return addOptionality(declaredType, isProperty, isOptional);
                }
                if ((noImplicitAny || isInJSFile(declaration)) && isVariableDeclaration(declaration) && !isBindingPattern(declaration.name) && !(getCombinedModifierFlags(declaration) & 1 /* Export */) && !(declaration.flags & 16777216 /* Ambient */)) {
                    if (!(getCombinedNodeFlags(declaration) & 2 /* Const */) && (!declaration.initializer || isNullOrUndefined3(declaration.initializer))) {
                        return autoType;
                    }
                    if (declaration.initializer && isEmptyArrayLiteral2(declaration.initializer)) {
                        return autoArrayType;
                    }
                }
                if (isParameter(declaration)) {
                    const func = declaration.parent;
                    if (func.kind === 175 /* SetAccessor */ && hasBindableName(func)) {
                        const getter = getDeclarationOfKind(getSymbolOfDeclaration(declaration.parent), 174 /* GetAccessor */);
                        if (getter) {
                            const getterSignature = getSignatureFromDeclaration(getter);
                            const thisParameter = getAccessorThisParameter(func);
                            if (thisParameter && declaration === thisParameter) {
                                Debug.assert(!thisParameter.type);
                                return getTypeOfSymbol(getterSignature.thisParameter);
                            }
                            return getReturnTypeOfSignature(getterSignature);
                        }
                    }
                    const parameterTypeOfTypeTag = getParameterTypeOfTypeTag(func, declaration);
                    if (parameterTypeOfTypeTag)
                        return parameterTypeOfTypeTag;
                    const type = declaration.symbol.escapedName === "this" /* This */ ? getContextualThisParameterType(func) : getContextuallyTypedParameterType(declaration);
                    if (type) {
                        return addOptionality(type, 
                        /*isProperty*/
                        false, isOptional);
                    }
                }
                if (hasOnlyExpressionInitializer(declaration) && !!declaration.initializer) {
                    if (isInJSFile(declaration) && !isParameter(declaration)) {
                        const containerObjectType = getJSContainerObjectType(declaration, getSymbolOfDeclaration(declaration), getDeclaredExpandoInitializer(declaration));
                        if (containerObjectType) {
                            return containerObjectType;
                        }
                    }
                    const type = widenTypeInferredFromInitializer(declaration, checkDeclarationInitializer(declaration, checkMode));
                    return addOptionality(type, isProperty, isOptional);
                }
                if (isPropertyDeclaration(declaration) && (noImplicitAny || isInJSFile(declaration))) {
                    if (!hasStaticModifier(declaration)) {
                        const constructor = findConstructorDeclaration(declaration.parent);
                        const type = constructor ? getFlowTypeInConstructor(declaration.symbol, constructor) : getEffectiveModifierFlags(declaration) & 2 /* Ambient */ ? getTypeOfPropertyInBaseClass(declaration.symbol) : void 0;
                        return type && addOptionality(type, 
                        /*isProperty*/
                        true, isOptional);
                    }
                    else {
                        const staticBlocks = filter(declaration.parent.members, isClassStaticBlockDeclaration);
                        const type = staticBlocks.length ? getFlowTypeInStaticBlocks(declaration.symbol, staticBlocks) : getEffectiveModifierFlags(declaration) & 2 /* Ambient */ ? getTypeOfPropertyInBaseClass(declaration.symbol) : void 0;
                        return type && addOptionality(type, 
                        /*isProperty*/
                        true, isOptional);
                    }
                }
                if (isJsxAttribute(declaration)) {
                    return trueType;
                }
                if (isBindingPattern(declaration.name)) {
                    return getTypeFromBindingPattern(declaration.name, 
                    /*includePatternInType*/
                    false, 
                    /*reportErrors*/
                    true);
                }
                return void 0;
            }
            function getWidenedTypeForAssignmentDeclaration(symbol, resolvedSymbol) {
                const container = getAssignedExpandoInitializer(symbol.valueDeclaration);
                if (container) {
                    const tag = isInJSFile(container) ? getJSDocTypeTag(container) : void 0;
                    if (tag && tag.typeExpression) {
                        return getTypeFromTypeNode(tag.typeExpression);
                    }
                    const containerObjectType = symbol.valueDeclaration && getJSContainerObjectType(symbol.valueDeclaration, symbol, container);
                    return containerObjectType || getWidenedLiteralType(checkExpressionCached(container));
                }
                let type;
                let definedInConstructor = false;
                let definedInMethod = false;
                if (isConstructorDeclaredProperty(symbol)) {
                    type = getFlowTypeInConstructor(symbol, getDeclaringConstructor(symbol));
                }
                if (!type) {
                    let types;
                    if (symbol.declarations) {
                        let jsdocType;
                        for (const declaration of symbol.declarations) {
                            const expression = isBinaryExpression(declaration) || isCallExpression(declaration) ? declaration : isAccessExpression(declaration) ? isBinaryExpression(declaration.parent) ? declaration.parent : declaration : void 0;
                            if (!expression) {
                                continue;
                            }
                            const kind = isAccessExpression(expression) ? getAssignmentDeclarationPropertyAccessKind(expression) : getAssignmentDeclarationKind(expression);
                            if (kind === 4 /* ThisProperty */ || isBinaryExpression(expression) && isPossiblyAliasedThisProperty(expression, kind)) {
                                if (isDeclarationInConstructor(expression)) {
                                    definedInConstructor = true;
                                }
                                else {
                                    definedInMethod = true;
                                }
                            }
                            if (!isCallExpression(expression)) {
                                jsdocType = getAnnotatedTypeForAssignmentDeclaration(jsdocType, expression, symbol, declaration);
                            }
                            if (!jsdocType) {
                                (types || (types = [])).push(isBinaryExpression(expression) || isCallExpression(expression) ? getInitializerTypeFromAssignmentDeclaration(symbol, resolvedSymbol, expression, kind) : neverType);
                            }
                        }
                        type = jsdocType;
                    }
                    if (!type) {
                        if (!length(types)) {
                            return errorType;
                        }
                        let constructorTypes = definedInConstructor && symbol.declarations ? getConstructorDefinedThisAssignmentTypes(types, symbol.declarations) : void 0;
                        if (definedInMethod) {
                            const propType = getTypeOfPropertyInBaseClass(symbol);
                            if (propType) {
                                (constructorTypes || (constructorTypes = [])).push(propType);
                                definedInConstructor = true;
                            }
                        }
                        const sourceTypes = some(constructorTypes, (t) => !!(t.flags & ~98304 /* Nullable */)) ? constructorTypes : types;
                        type = getUnionType(sourceTypes);
                    }
                }
                const widened = getWidenedType(addOptionality(type, 
                /*isProperty*/
                false, definedInMethod && !definedInConstructor));
                if (symbol.valueDeclaration && filterType(widened, (t) => !!(t.flags & ~98304 /* Nullable */)) === neverType) {
                    reportImplicitAny(symbol.valueDeclaration, anyType);
                    return anyType;
                }
                return widened;
            }
            function getInitializerTypeFromAssignmentDeclaration(symbol, resolvedSymbol, expression, kind) {
                if (isCallExpression(expression)) {
                    if (resolvedSymbol) {
                        return getTypeOfSymbol(resolvedSymbol);
                    }
                    const objectLitType = checkExpressionCached(expression.arguments[2]);
                    const valueType = getTypeOfPropertyOfType(objectLitType, "value");
                    if (valueType) {
                        return valueType;
                    }
                    const getFunc = getTypeOfPropertyOfType(objectLitType, "get");
                    if (getFunc) {
                        const getSig = getSingleCallSignature(getFunc);
                        if (getSig) {
                            return getReturnTypeOfSignature(getSig);
                        }
                    }
                    const setFunc = getTypeOfPropertyOfType(objectLitType, "set");
                    if (setFunc) {
                        const setSig = getSingleCallSignature(setFunc);
                        if (setSig) {
                            return getTypeOfFirstParameterOfSignature(setSig);
                        }
                    }
                    return anyType;
                }
                if (containsSameNamedThisProperty(expression.left, expression.right)) {
                    return anyType;
                }
                const isDirectExport = kind === 1 /* ExportsProperty */ && (isPropertyAccessExpression(expression.left) || isElementAccessExpression(expression.left)) && (isModuleExportsAccessExpression(expression.left.expression) || isIdentifier(expression.left.expression) && isExportsIdentifier(expression.left.expression));
                const type = resolvedSymbol ? getTypeOfSymbol(resolvedSymbol) : isDirectExport ? getRegularTypeOfLiteralType(checkExpressionCached(expression.right)) : getWidenedLiteralType(checkExpressionCached(expression.right));
                if (type.flags & 524288 /* Object */ && kind === 2 /* ModuleExports */ && symbol.escapedName === "export=" /* ExportEquals */) {
                    const exportedType = resolveStructuredTypeMembers(type);
                    const members = createSymbolTable();
                    copyEntries(exportedType.members, members);
                    const initialSize = members.size;
                    if (resolvedSymbol && !resolvedSymbol.exports) {
                        resolvedSymbol.exports = createSymbolTable();
                    }
                    (resolvedSymbol || symbol).exports.forEach((s, name) => {
                        var _a2;
                        const exportedMember = members.get(name);
                        if (exportedMember && exportedMember !== s && !(s.flags & 2097152 /* Alias */)) {
                            if (s.flags & 111551 /* Value */ && exportedMember.flags & 111551 /* Value */) {
                                if (s.valueDeclaration && exportedMember.valueDeclaration && getSourceFileOfNode(s.valueDeclaration) !== getSourceFileOfNode(exportedMember.valueDeclaration)) {
                                    const unescapedName = unescapeLeadingUnderscores(s.escapedName);
                                    const exportedMemberName = ((_a2 = tryCast(exportedMember.valueDeclaration, isNamedDeclaration)) == null ? void 0 : _a2.name) || exportedMember.valueDeclaration;
                                    addRelatedInfo(error(s.valueDeclaration, Diagnostics.Duplicate_identifier_0, unescapedName), createDiagnosticForNode(exportedMemberName, Diagnostics._0_was_also_declared_here, unescapedName));
                                    addRelatedInfo(error(exportedMemberName, Diagnostics.Duplicate_identifier_0, unescapedName), createDiagnosticForNode(s.valueDeclaration, Diagnostics._0_was_also_declared_here, unescapedName));
                                }
                                const union = createSymbol(s.flags | exportedMember.flags, name);
                                union.links.type = getUnionType([getTypeOfSymbol(s), getTypeOfSymbol(exportedMember)]);
                                union.valueDeclaration = exportedMember.valueDeclaration;
                                union.declarations = concatenate(exportedMember.declarations, s.declarations);
                                members.set(name, union);
                            }
                            else {
                                members.set(name, mergeSymbol(s, exportedMember));
                            }
                        }
                        else {
                            members.set(name, s);
                        }
                    });
                    const result = createAnonymousType(initialSize !== members.size ? void 0 : exportedType.symbol, 
                    // Only set the type's symbol if it looks to be the same as the original type
                    members, exportedType.callSignatures, exportedType.constructSignatures, exportedType.indexInfos);
                    if (initialSize === members.size) {
                        if (type.aliasSymbol) {
                            result.aliasSymbol = type.aliasSymbol;
                            result.aliasTypeArguments = type.aliasTypeArguments;
                        }
                        if (getObjectFlags(type) & 4 /* Reference */) {
                            result.aliasSymbol = type.symbol;
                            const args = getTypeArguments(type);
                            result.aliasTypeArguments = length(args) ? args : void 0;
                        }
                    }
                    result.objectFlags |= getObjectFlags(type) & 4096 /* JSLiteral */;
                    if (result.symbol && result.symbol.flags & 32 /* Class */ && type === getDeclaredTypeOfClassOrInterface(result.symbol)) {
                        result.objectFlags |= 16777216 /* IsClassInstanceClone */;
                    }
                    return result;
                }
                if (isEmptyArrayLiteralType(type)) {
                    reportImplicitAny(expression, anyArrayType);
                    return anyArrayType;
                }
                return type;
            }
            function getTypeOfVariableOrParameterOrPropertyWorker(symbol) {
                if (symbol.flags & 4194304 /* Prototype */) {
                    return getTypeOfPrototypeProperty(symbol);
                }
                if (symbol === requireSymbol) {
                    return anyType;
                }
                if (symbol.flags & 134217728 /* ModuleExports */ && symbol.valueDeclaration) {
                    const fileSymbol = getSymbolOfDeclaration(getSourceFileOfNode(symbol.valueDeclaration));
                    const result = createSymbol(fileSymbol.flags, "exports");
                    result.declarations = fileSymbol.declarations ? fileSymbol.declarations.slice() : [];
                    result.parent = symbol;
                    result.links.target = fileSymbol;
                    if (fileSymbol.valueDeclaration)
                        result.valueDeclaration = fileSymbol.valueDeclaration;
                    if (fileSymbol.members)
                        result.members = new Map(fileSymbol.members);
                    if (fileSymbol.exports)
                        result.exports = new Map(fileSymbol.exports);
                    const members = createSymbolTable();
                    members.set("exports", result);
                    return createAnonymousType(symbol, members, emptyArray, emptyArray, emptyArray);
                }
                Debug.assertIsDefined(symbol.valueDeclaration);
                const declaration = symbol.valueDeclaration;
                if (isSourceFile(declaration) && isJsonSourceFile(declaration)) {
                    if (!declaration.statements.length) {
                        return emptyObjectType;
                    }
                    return getWidenedType(getWidenedLiteralType(checkExpression(declaration.statements[0].expression)));
                }
                if (isAccessor(declaration)) {
                    return getTypeOfAccessors(symbol);
                }
                if (!pushTypeResolution(symbol, 0 /* Type */)) {
                    if (symbol.flags & 512 /* ValueModule */ && !(symbol.flags & 67108864 /* Assignment */)) {
                        return getTypeOfFuncClassEnumModule(symbol);
                    }
                    return reportCircularityError(symbol);
                }
                let type;
                if (declaration.kind === 274 /* ExportAssignment */) {
                    type = widenTypeForVariableLikeDeclaration(tryGetTypeFromEffectiveTypeNode(declaration) || checkExpressionCached(declaration.expression), declaration);
                }
                else if (isBinaryExpression(declaration) || isInJSFile(declaration) && (isCallExpression(declaration) || (isPropertyAccessExpression(declaration) || isBindableStaticElementAccessExpression(declaration)) && isBinaryExpression(declaration.parent))) {
                    type = getWidenedTypeForAssignmentDeclaration(symbol);
                }
                else if (isPropertyAccessExpression(declaration) || isElementAccessExpression(declaration) || isIdentifier(declaration) || isStringLiteralLike(declaration) || isNumericLiteral(declaration) || isClassDeclaration(declaration) || isFunctionDeclaration(declaration) || isMethodDeclaration(declaration) && !isObjectLiteralMethod(declaration) || isMethodSignature(declaration) || isSourceFile(declaration)) {
                    if (symbol.flags & (16 /* Function */ | 8192 /* Method */ | 32 /* Class */ | 384 /* Enum */ | 512 /* ValueModule */)) {
                        return getTypeOfFuncClassEnumModule(symbol);
                    }
                    type = isBinaryExpression(declaration.parent) ? getWidenedTypeForAssignmentDeclaration(symbol) : tryGetTypeFromEffectiveTypeNode(declaration) || anyType;
                }
                else if (isPropertyAssignment(declaration)) {
                    type = tryGetTypeFromEffectiveTypeNode(declaration) || checkPropertyAssignment(declaration);
                }
                else if (isJsxAttribute(declaration)) {
                    type = tryGetTypeFromEffectiveTypeNode(declaration) || checkJsxAttribute(declaration);
                }
                else if (isShorthandPropertyAssignment(declaration)) {
                    type = tryGetTypeFromEffectiveTypeNode(declaration) || checkExpressionForMutableLocation(declaration.name, 0 /* Normal */);
                }
                else if (isObjectLiteralMethod(declaration)) {
                    type = tryGetTypeFromEffectiveTypeNode(declaration) || checkObjectLiteralMethod(declaration, 0 /* Normal */);
                }
                else if (isParameter(declaration) || isPropertyDeclaration(declaration) || isPropertySignature(declaration) || isVariableDeclaration(declaration) || isBindingElement(declaration) || isJSDocPropertyLikeTag(declaration)) {
                    type = getWidenedTypeForVariableLikeDeclaration(declaration, 
                    /*includeOptionality*/
                    true);
                }
                else if (isEnumDeclaration(declaration)) {
                    type = getTypeOfFuncClassEnumModule(symbol);
                }
                else if (isEnumMember(declaration)) {
                    type = getTypeOfEnumMember(symbol);
                }
                else {
                    return Debug.fail("Unhandled declaration kind! " + Debug.formatSyntaxKind(declaration.kind) + " for " + Debug.formatSymbol(symbol));
                }
                if (!popTypeResolution()) {
                    if (symbol.flags & 512 /* ValueModule */ && !(symbol.flags & 67108864 /* Assignment */)) {
                        return getTypeOfFuncClassEnumModule(symbol);
                    }
                    return reportCircularityError(symbol);
                }
                return type;
            }
            function getTypeOfAccessors(symbol) {
                const links = getSymbolLinks(symbol);
                if (!links.type) {
                    if (!pushTypeResolution(symbol, 0 /* Type */)) {
                        return errorType;
                    }
                    const getter = getDeclarationOfKind(symbol, 174 /* GetAccessor */);
                    const setter = getDeclarationOfKind(symbol, 175 /* SetAccessor */);
                    const accessor = tryCast(getDeclarationOfKind(symbol, 169 /* PropertyDeclaration */), isAutoAccessorPropertyDeclaration);
                    let type = getter && isInJSFile(getter) && getTypeForDeclarationFromJSDocComment(getter) || getAnnotatedAccessorType(getter) || getAnnotatedAccessorType(setter) || getAnnotatedAccessorType(accessor) || getter && getter.body && getReturnTypeFromBody(getter) || accessor && accessor.initializer && getWidenedTypeForVariableLikeDeclaration(accessor, 
                    /*includeOptionality*/
                    true);
                    if (!type) {
                        if (setter && !isPrivateWithinAmbient(setter)) {
                            errorOrSuggestion(noImplicitAny, setter, Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation, symbolToString(symbol));
                        }
                        else if (getter && !isPrivateWithinAmbient(getter)) {
                            errorOrSuggestion(noImplicitAny, getter, Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation, symbolToString(symbol));
                        }
                        else if (accessor && !isPrivateWithinAmbient(accessor)) {
                            errorOrSuggestion(noImplicitAny, accessor, Diagnostics.Member_0_implicitly_has_an_1_type, symbolToString(symbol), "any");
                        }
                        type = anyType;
                    }
                    if (!popTypeResolution()) {
                        if (getAnnotatedAccessorTypeNode(getter)) {
                            error(getter, Diagnostics._0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, symbolToString(symbol));
                        }
                        else if (getAnnotatedAccessorTypeNode(setter)) {
                            error(setter, Diagnostics._0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, symbolToString(symbol));
                        }
                        else if (getAnnotatedAccessorTypeNode(accessor)) {
                            error(setter, Diagnostics._0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, symbolToString(symbol));
                        }
                        else if (getter && noImplicitAny) {
                            error(getter, Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, symbolToString(symbol));
                        }
                        type = anyType;
                    }
                    links.type = type;
                }
                return links.type;
            }
            function getOuterTypeParameters(node, includeThisTypes) {
                while (true) {
                    node = node.parent;
                    if (node && isBinaryExpression(node)) {
                        const assignmentKind = getAssignmentDeclarationKind(node);
                        if (assignmentKind === 6 /* Prototype */ || assignmentKind === 3 /* PrototypeProperty */) {
                            const symbol = getSymbolOfDeclaration(node.left);
                            if (symbol && symbol.parent && !findAncestor(symbol.parent.valueDeclaration, (d) => node === d)) {
                                node = symbol.parent.valueDeclaration;
                            }
                        }
                    }
                    if (!node) {
                        return void 0;
                    }
                    switch (node.kind) {
                        case 260 /* ClassDeclaration */:
                        case 228 /* ClassExpression */:
                        case 261 /* InterfaceDeclaration */:
                        case 176 /* CallSignature */:
                        case 177 /* ConstructSignature */:
                        case 170 /* MethodSignature */:
                        case 181 /* FunctionType */:
                        case 182 /* ConstructorType */:
                        case 320 /* JSDocFunctionType */:
                        case 259 /* FunctionDeclaration */:
                        case 171 /* MethodDeclaration */:
                        case 215 /* FunctionExpression */:
                        case 216 /* ArrowFunction */:
                        case 262 /* TypeAliasDeclaration */:
                        case 348 /* JSDocTemplateTag */:
                        case 349 /* JSDocTypedefTag */:
                        case 343 /* JSDocEnumTag */:
                        case 341 /* JSDocCallbackTag */:
                        case 197 /* MappedType */:
                        case 191 /* ConditionalType */: {
                            const outerTypeParameters = getOuterTypeParameters(node, includeThisTypes);
                            if (node.kind === 197 /* MappedType */) {
                                return append(outerTypeParameters, getDeclaredTypeOfTypeParameter(getSymbolOfDeclaration(node.typeParameter)));
                            }
                            else if (node.kind === 191 /* ConditionalType */) {
                                return concatenate(outerTypeParameters, getInferTypeParameters(node));
                            }
                            const outerAndOwnTypeParameters = appendTypeParameters(outerTypeParameters, getEffectiveTypeParameterDeclarations(node));
                            const thisType = includeThisTypes && (node.kind === 260 /* ClassDeclaration */ || node.kind === 228 /* ClassExpression */ || node.kind === 261 /* InterfaceDeclaration */ || isJSConstructor(node)) && getDeclaredTypeOfClassOrInterface(getSymbolOfDeclaration(node)).thisType;
                            return thisType ? append(outerAndOwnTypeParameters, thisType) : outerAndOwnTypeParameters;
                        }
                        case 344 /* JSDocParameterTag */:
                            const paramSymbol = getParameterSymbolFromJSDoc(node);
                            if (paramSymbol) {
                                node = paramSymbol.valueDeclaration;
                            }
                            break;
                        case 323 /* JSDoc */: {
                            const outerTypeParameters = getOuterTypeParameters(node, includeThisTypes);
                            return node.tags ? appendTypeParameters(outerTypeParameters, flatMap(node.tags, (t) => isJSDocTemplateTag(t) ? t.typeParameters : void 0)) : outerTypeParameters;
                        }
                    }
                }
            }
            function createSignature(declaration, typeParameters, thisParameter, parameters, resolvedReturnType, resolvedTypePredicate, minArgumentCount, flags) {
            function getUnionSignatures(signatureLists) {
                let result;
                let indexWithLengthOverOne;
                for (let i = 0; i < signatureLists.length; i++) {
                    if (signatureLists[i].length === 0)
                        return emptyArray;
                    if (signatureLists[i].length > 1) {
                        indexWithLengthOverOne = indexWithLengthOverOne === void 0 ? i : -1;
                    }
                    for (const signature of signatureLists[i]) {
                        if (!result || !findMatchingSignature(result, signature, 
                        /*partialMatch*/
                        false, 
                        /*ignoreThisTypes*/
                        false, 
                        /*ignoreReturnTypes*/
                        true)) {
                            const unionSignatures = findMatchingSignatures(signatureLists, signature, i);
                            if (unionSignatures) {
                                let s = signature;
                                if (unionSignatures.length > 1) {
                                    let thisParameter = signature.thisParameter;
                                    const firstThisParameterOfUnionSignatures = forEach(unionSignatures, (sig) => sig.thisParameter);
                                    if (firstThisParameterOfUnionSignatures) {
                                        const thisType = getIntersectionType(mapDefined(unionSignatures, (sig) => sig.thisParameter && getTypeOfSymbol(sig.thisParameter)));
                                        thisParameter = createSymbolWithType(firstThisParameterOfUnionSignatures, thisType);
                                    }
                                    s = createUnionSignature(signature, unionSignatures);
                                    s.thisParameter = thisParameter;
                                }
                                (result || (result = [])).push(s);
                            }
                        }
                    }
                }
                if (!length(result) && indexWithLengthOverOne !== -1) {
                    const masterList = signatureLists[indexWithLengthOverOne !== void 0 ? indexWithLengthOverOne : 0];
                    let results = masterList.slice();
                    for (const signatures of signatureLists) {
                        if (signatures !== masterList) {
                            const signature = signatures[0];
                            Debug.assert(!!signature, "getUnionSignatures bails early on empty signature lists and should not have empty lists on second pass");
                            results = !!signature.typeParameters && some(results, (s) => !!s.typeParameters && !compareTypeParametersIdentical(signature.typeParameters, s.typeParameters)) ? void 0 : map(results, (sig) => combineSignaturesOfUnionMembers(sig, signature));
                            if (!results) {
                                break;
                            }
                        }
                    }
                    result = results;
                }
                return result || emptyArray;
            }
            function combineUnionParameters(left, right, mapper) {
                const leftCount = getParameterCount(left);
                const rightCount = getParameterCount(right);
                const longest = leftCount >= rightCount ? left : right;
                const shorter = longest === left ? right : left;
                const longestCount = longest === left ? leftCount : rightCount;
                const eitherHasEffectiveRest = hasEffectiveRestParameter(left) || hasEffectiveRestParameter(right);
                const needsExtraRestElement = eitherHasEffectiveRest && !hasEffectiveRestParameter(longest);
                const params = new Array(longestCount + (needsExtraRestElement ? 1 : 0));
                for (let i = 0; i < longestCount; i++) {
                    let longestParamType = tryGetTypeAtPosition(longest, i);
                    if (longest === right) {
                        longestParamType = instantiateType(longestParamType, mapper);
                    }
                    let shorterParamType = tryGetTypeAtPosition(shorter, i) || unknownType;
                    if (shorter === right) {
                        shorterParamType = instantiateType(shorterParamType, mapper);
                    }
                    const unionParamType = getIntersectionType([longestParamType, shorterParamType]);
                    const isRestParam = eitherHasEffectiveRest && !needsExtraRestElement && i === longestCount - 1;
                    const isOptional = i >= getMinArgumentCount(longest) && i >= getMinArgumentCount(shorter);
                    const leftName = i >= leftCount ? void 0 : getParameterNameAtPosition(left, i);
                    const rightName = i >= rightCount ? void 0 : getParameterNameAtPosition(right, i);
                    const paramName = leftName === rightName ? leftName : !leftName ? rightName : !rightName ? leftName : void 0;
                    const paramSymbol = createSymbol(1 /* FunctionScopedVariable */ | (isOptional && !isRestParam ? 16777216 /* Optional */ : 0), paramName || `arg${i}`);
                    paramSymbol.links.type = isRestParam ? createArrayType(unionParamType) : unionParamType;
                    params[i] = paramSymbol;
                }
                if (needsExtraRestElement) {
                    const restParamSymbol = createSymbol(1 /* FunctionScopedVariable */, "args");
                    restParamSymbol.links.type = createArrayType(getTypeAtPosition(shorter, longestCount));
                    if (shorter === right) {
                        restParamSymbol.links.type = instantiateType(restParamSymbol.links.type, mapper);
                    }
                    params[longestCount] = restParamSymbol;
                }
                return params;
            }
                function addMemberForKeyTypeWorker(keyType, propNameType) {
                    if (isTypeUsableAsPropertyName(propNameType)) {
                        const propName = getPropertyNameFromType(propNameType);
                        const existingProp = members.get(propName);
                        if (existingProp) {
                            existingProp.links.nameType = getUnionType([existingProp.links.nameType, propNameType]);
                            existingProp.links.keyType = getUnionType([existingProp.links.keyType, keyType]);
                        }
                        else {
                            const modifiersProp = isTypeUsableAsPropertyName(keyType) ? getPropertyOfType(modifiersType, getPropertyNameFromType(keyType)) : void 0;
                            const isOptional = !!(templateModifiers & 4 /* IncludeOptional */ || !(templateModifiers & 8 /* ExcludeOptional */) && modifiersProp && modifiersProp.flags & 16777216 /* Optional */);
                            const isReadonly = !!(templateModifiers & 1 /* IncludeReadonly */ || !(templateModifiers & 2 /* ExcludeReadonly */) && modifiersProp && isReadonlySymbol(modifiersProp));
                            const stripOptional = strictNullChecks && !isOptional && modifiersProp && modifiersProp.flags & 16777216 /* Optional */;
                            const lateFlag = modifiersProp ? getIsLateCheckFlag(modifiersProp) : 0;
                            const prop = createSymbol(4 /* Property */ | (isOptional ? 16777216 /* Optional */ : 0), propName, lateFlag | 262144 /* Mapped */ | (isReadonly ? 8 /* Readonly */ : 0) | (stripOptional ? 524288 /* StripOptional */ : 0));
                            prop.links.mappedType = type;
                            prop.links.nameType = propNameType;
                            prop.links.keyType = keyType;
                            if (modifiersProp) {
                                prop.links.syntheticOrigin = modifiersProp;
                                prop.declarations = shouldLinkPropDeclarations ? modifiersProp.declarations : void 0;
                            }
                            members.set(propName, prop);
                        }
                    }
                    else if (isValidIndexKeyType(propNameType) || propNameType.flags & (1 /* Any */ | 32 /* Enum */)) {
                        const indexKeyType = propNameType.flags & (1 /* Any */ | 4 /* String */) ? stringType : propNameType.flags & (8 /* Number */ | 32 /* Enum */) ? numberType : propNameType;
                        const propType = instantiateType(templateType, appendTypeMapping(type.mapper, typeParameter, keyType));
                        const indexInfo = createIndexInfo(indexKeyType, propType, !!(templateModifiers & 1 /* IncludeReadonly */));
                        indexInfos = appendIndexInfo(indexInfos, indexInfo, 
                        /*union*/
                        true);
                    }
                }
                function computeBaseConstraint(t) {
                    if (t.flags & 262144 /* TypeParameter */) {
                        const constraint = getConstraintFromTypeParameter(t);
                        return t.isThisType || !constraint ? constraint : getBaseConstraint(constraint);
                    }
                    if (t.flags & 3145728 /* UnionOrIntersection */) {
                        const types = t.types;
                        const baseTypes = [];
                        let different = false;
                        for (const type2 of types) {
                            const baseType = getBaseConstraint(type2);
                            if (baseType) {
                                if (baseType !== type2) {
                                    different = true;
                                }
                                baseTypes.push(baseType);
                            }
                            else {
                                different = true;
                            }
                        }
                        if (!different) {
                            return t;
                        }
                        return t.flags & 1048576 /* Union */ && baseTypes.length === types.length ? getUnionType(baseTypes) : t.flags & 2097152 /* Intersection */ && baseTypes.length ? getIntersectionType(baseTypes) : void 0;
                    }
                    if (t.flags & 4194304 /* Index */) {
                        return keyofConstraintType;
                    }
                    if (t.flags & 134217728 /* TemplateLiteral */) {
                        const types = t.types;
                        const constraints = mapDefined(types, getBaseConstraint);
                        return constraints.length === types.length ? getTemplateLiteralType(t.texts, constraints) : stringType;
                    }
                    if (t.flags & 268435456 /* StringMapping */) {
                        const constraint = getBaseConstraint(t.type);
                        return constraint && constraint !== t.type ? getStringMappingType(t.symbol, constraint) : stringType;
                    }
                    if (t.flags & 8388608 /* IndexedAccess */) {
                        if (isMappedTypeGenericIndexedAccess(t)) {
                            return getBaseConstraint(substituteIndexedMappedType(t.objectType, t.indexType));
                        }
                        const baseObjectType = getBaseConstraint(t.objectType);
                        const baseIndexType = getBaseConstraint(t.indexType);
                        const baseIndexedAccess = baseObjectType && baseIndexType && getIndexedAccessTypeOrUndefined(baseObjectType, baseIndexType, t.accessFlags);
                        return baseIndexedAccess && getBaseConstraint(baseIndexedAccess);
                    }
                    if (t.flags & 16777216 /* Conditional */) {
                        const constraint = getConstraintFromConditionalType(t);
                        return constraint && getBaseConstraint(constraint);
                    }
                    if (t.flags & 33554432 /* Substitution */) {
                        return getBaseConstraint(getSubstitutionIntersection(t));
                    }
                    return t;
                }
            function createUnionOrIntersectionProperty(containingType, name, skipObjectFunctionPropertyAugment) {
                var _a2, _b, _c;
                let singleProp;
                let propSet;
                let indexTypes;
                const isUnion = containingType.flags & 1048576 /* Union */;
                let optionalFlag;
                let syntheticFlag = 4 /* SyntheticMethod */;
                let checkFlags = isUnion ? 0 : 8 /* Readonly */;
                let mergedInstantiations = false;
                for (const current of containingType.types) {
                    const type = getApparentType(current);
                    if (!(isErrorType(type) || type.flags & 131072 /* Never */)) {
                        const prop = getPropertyOfType(type, name, skipObjectFunctionPropertyAugment);
                        const modifiers = prop ? getDeclarationModifierFlagsFromSymbol(prop) : 0;
                        if (prop) {
                            if (prop.flags & 106500 /* ClassMember */) {
                                optionalFlag != null ? optionalFlag : optionalFlag = isUnion ? 0 /* None */ : 16777216 /* Optional */;
                                if (isUnion) {
                                    optionalFlag |= prop.flags & 16777216 /* Optional */;
                                }
                                else {
                                    optionalFlag &= prop.flags;
                                }
                            }
                            if (!singleProp) {
                                singleProp = prop;
                            }
                            else if (prop !== singleProp) {
                                const isInstantiation = (getTargetSymbol(prop) || prop) === (getTargetSymbol(singleProp) || singleProp);
                                if (isInstantiation && compareProperties2(singleProp, prop, (a, b) => a === b ? -1 /* True */ : 0 /* False */) === -1 /* True */) {
                                    mergedInstantiations = !!singleProp.parent && !!length(getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(singleProp.parent));
                                }
                                else {
                                    if (!propSet) {
                                        propSet = /* @__PURE__ */ new Map();
                                        propSet.set(getSymbolId(singleProp), singleProp);
                                    }
                                    const id = getSymbolId(prop);
                                    if (!propSet.has(id)) {
                                        propSet.set(id, prop);
                                    }
                                }
                            }
                            if (isUnion && isReadonlySymbol(prop)) {
                                checkFlags |= 8 /* Readonly */;
                            }
                            else if (!isUnion && !isReadonlySymbol(prop)) {
                                checkFlags &= ~8 /* Readonly */;
                            }
                            checkFlags |= (!(modifiers & 24 /* NonPublicAccessibilityModifier */) ? 256 /* ContainsPublic */ : 0) | (modifiers & 16 /* Protected */ ? 512 /* ContainsProtected */ : 0) | (modifiers & 8 /* Private */ ? 1024 /* ContainsPrivate */ : 0) | (modifiers & 32 /* Static */ ? 2048 /* ContainsStatic */ : 0);
                            if (!isPrototypeProperty(prop)) {
                                syntheticFlag = 2 /* SyntheticProperty */;
                            }
                        }
                        else if (isUnion) {
                            const indexInfo = !isLateBoundName(name) && getApplicableIndexInfoForName(type, name);
                            if (indexInfo) {
                                checkFlags |= 32 /* WritePartial */ | (indexInfo.isReadonly ? 8 /* Readonly */ : 0);
                                indexTypes = append(indexTypes, isTupleType(type) ? getRestTypeOfTupleType(type) || undefinedType : indexInfo.type);
                            }
                            else if (isObjectLiteralType2(type) && !(getObjectFlags(type) & 2097152 /* ContainsSpread */)) {
                                checkFlags |= 32 /* WritePartial */;
                                indexTypes = append(indexTypes, undefinedType);
                            }
                            else {
                                checkFlags |= 16 /* ReadPartial */;
                            }
                        }
                    }
                }
                if (!singleProp || isUnion && (propSet || checkFlags & 48 /* Partial */) && checkFlags & (1024 /* ContainsPrivate */ | 512 /* ContainsProtected */) && !(propSet && getCommonDeclarationsOfSymbols(propSet.values()))) {
                    return void 0;
                }
                if (!propSet && !(checkFlags & 16 /* ReadPartial */) && !indexTypes) {
                    if (mergedInstantiations) {
                        const links = (_a2 = tryCast(singleProp, isTransientSymbol)) == null ? void 0 : _a2.links;
                        const clone2 = createSymbolWithType(singleProp, links == null ? void 0 : links.type);
                        clone2.parent = (_c = (_b = singleProp.valueDeclaration) == null ? void 0 : _b.symbol) == null ? void 0 : _c.parent;
                        clone2.links.containingType = containingType;
                        clone2.links.mapper = links == null ? void 0 : links.mapper;
                        return clone2;
                    }
                    else {
                        return singleProp;
                    }
                }
                const props = propSet ? arrayFrom(propSet.values()) : [singleProp];
                let declarations;
                let firstType;
                let nameType;
                const propTypes = [];
                let writeTypes;
                let firstValueDeclaration;
                let hasNonUniformValueDeclaration = false;
                for (const prop of props) {
                    if (!firstValueDeclaration) {
                        firstValueDeclaration = prop.valueDeclaration;
                    }
                    else if (prop.valueDeclaration && prop.valueDeclaration !== firstValueDeclaration) {
                        hasNonUniformValueDeclaration = true;
                    }
                    declarations = addRange(declarations, prop.declarations);
                    const type = getTypeOfSymbol(prop);
                    if (!firstType) {
                        firstType = type;
                        nameType = getSymbolLinks(prop).nameType;
                    }
                    const writeType = getWriteTypeOfSymbol(prop);
                    if (writeTypes || writeType !== type) {
                        writeTypes = append(!writeTypes ? propTypes.slice() : writeTypes, writeType);
                    }
                    else if (type !== firstType) {
                        checkFlags |= 64 /* HasNonUniformType */;
                    }
                    if (isLiteralType(type) || isPatternLiteralType(type) || type === uniqueLiteralType) {
                        checkFlags |= 128 /* HasLiteralType */;
                    }
                    if (type.flags & 131072 /* Never */ && type !== uniqueLiteralType) {
                        checkFlags |= 131072 /* HasNeverType */;
                    }
                    propTypes.push(type);
                }
                addRange(propTypes, indexTypes);
                const result = createSymbol(4 /* Property */ | (optionalFlag != null ? optionalFlag : 0), name, syntheticFlag | checkFlags);
                result.links.containingType = containingType;
                if (!hasNonUniformValueDeclaration && firstValueDeclaration) {
                    result.valueDeclaration = firstValueDeclaration;
                    if (firstValueDeclaration.symbol.parent) {
                        result.parent = firstValueDeclaration.symbol.parent;
                    }
                }
                result.declarations = declarations;
                result.links.nameType = nameType;
                if (propTypes.length > 2) {
                    result.links.checkFlags |= 65536 /* DeferredType */;
                    result.links.deferralParent = containingType;
                    result.links.deferralConstituents = propTypes;
                    result.links.deferralWriteConstituents = writeTypes;
                }
                else {
                    result.links.type = isUnion ? getUnionType(propTypes) : getIntersectionType(propTypes);
                    if (writeTypes) {
                        result.links.writeType = isUnion ? getUnionType(writeTypes) : getIntersectionType(writeTypes);
                    }
                }
                return result;
            }
            function getSignatureFromDeclaration(declaration) {
                const links = getNodeLinks(declaration);
                if (!links.resolvedSignature) {
                    const parameters = [];
                    let flags = 0 /* None */;
                    let minArgumentCount = 0;
                    let thisParameter;
                    let hasThisParameter2 = false;
                    const iife = getImmediatelyInvokedFunctionExpression(declaration);
                    const isJSConstructSignature = isJSDocConstructSignature(declaration);
                    const isUntypedSignatureInJSFile = !iife && isInJSFile(declaration) && isValueSignatureDeclaration(declaration) && !hasJSDocParameterTags(declaration) && !getJSDocType(declaration);
                    if (isUntypedSignatureInJSFile) {
                        flags |= 32 /* IsUntypedSignatureInJSFile */;
                    }
                    for (let i = isJSConstructSignature ? 1 : 0; i < declaration.parameters.length; i++) {
                        const param = declaration.parameters[i];
                        let paramSymbol = param.symbol;
                        const type = isJSDocParameterTag(param) ? param.typeExpression && param.typeExpression.type : param.type;
                        if (paramSymbol && !!(paramSymbol.flags & 4 /* Property */) && !isBindingPattern(param.name)) {
                            const resolvedSymbol = resolveName(param, paramSymbol.escapedName, 111551 /* Value */, void 0, void 0, 
                            /*isUse*/
                            false);
                            paramSymbol = resolvedSymbol;
                        }
                        if (i === 0 && paramSymbol.escapedName === "this" /* This */) {
                            hasThisParameter2 = true;
                            thisParameter = param.symbol;
                        }
                        else {
                            parameters.push(paramSymbol);
                        }
                        if (type && type.kind === 198 /* LiteralType */) {
                            flags |= 2 /* HasLiteralTypes */;
                        }
                        const isOptionalParameter2 = isOptionalJSDocPropertyLikeTag(param) || param.initializer || param.questionToken || isRestParameter(param) || iife && parameters.length > iife.arguments.length && !type || isJSDocOptionalParameter(param);
                        if (!isOptionalParameter2) {
                            minArgumentCount = parameters.length;
                        }
                    }
                    if ((declaration.kind === 174 /* GetAccessor */ || declaration.kind === 175 /* SetAccessor */) && hasBindableName(declaration) && (!hasThisParameter2 || !thisParameter)) {
                        const otherKind = declaration.kind === 174 /* GetAccessor */ ? 175 /* SetAccessor */ : 174 /* GetAccessor */;
                        const other = getDeclarationOfKind(getSymbolOfDeclaration(declaration), otherKind);
                        if (other) {
                            thisParameter = getAnnotatedAccessorThisParameter(other);
                        }
                    }
                    if (isInJSFile(declaration)) {
                        const thisTag = getJSDocThisTag(declaration);
                        if (thisTag && thisTag.typeExpression) {
                            thisParameter = createSymbolWithType(createSymbol(1 /* FunctionScopedVariable */, "this" /* This */), getTypeFromTypeNode(thisTag.typeExpression));
                        }
                    }
                    const classType = declaration.kind === 173 /* Constructor */ ? getDeclaredTypeOfClassOrInterface(getMergedSymbol(declaration.parent.symbol)) : void 0;
                    const typeParameters = classType ? classType.localTypeParameters : getTypeParametersFromDeclaration(declaration);
                    if (hasRestParameter(declaration) || isInJSFile(declaration) && maybeAddJsSyntheticRestParameter(declaration, parameters)) {
                        flags |= 1 /* HasRestParameter */;
                    }
                    if (isConstructorTypeNode(declaration) && hasSyntacticModifier(declaration, 256 /* Abstract */) || isConstructorDeclaration(declaration) && hasSyntacticModifier(declaration.parent, 256 /* Abstract */)) {
                        flags |= 4 /* Abstract */;
                    }
                    links.resolvedSignature = createSignature(declaration, typeParameters, thisParameter, parameters, 
                    /*resolvedReturnType*/
                    void 0, 
                    /*resolvedTypePredicate*/
                    void 0, minArgumentCount, flags);
                }
                return links.resolvedSignature;
            }
            function getSignaturesOfSymbol(symbol) {
                if (!symbol || !symbol.declarations)
                    return emptyArray;
                const result = [];
                for (let i = 0; i < symbol.declarations.length; i++) {
                    const decl = symbol.declarations[i];
                    if (!isFunctionLike(decl))
                        continue;
                    if (i > 0 && decl.body) {
                        const previous = symbol.declarations[i - 1];
                        if (decl.parent === previous.parent && decl.kind === previous.kind && decl.pos === previous.end) {
                            continue;
                        }
                    }
                    if (isInJSFile(decl) && decl.jsDoc) {
                        let hasJSDocOverloads = false;
                        for (const node of decl.jsDoc) {
                            if (node.tags) {
                                for (const tag of node.tags) {
                                    if (isJSDocOverloadTag(tag)) {
                                        const jsDocSignature = tag.typeExpression;
                                        if (jsDocSignature.type === void 0 && !isConstructorDeclaration(decl)) {
                                            reportImplicitAny(jsDocSignature, anyType);
                                        }
                                        result.push(getSignatureFromDeclaration(jsDocSignature));
                                        hasJSDocOverloads = true;
                                    }
                                }
                            }
                        }
                        if (hasJSDocOverloads) {
                            continue;
                        }
                    }
                    result.push(!isFunctionExpressionOrArrowFunction(decl) && !isObjectLiteralMethod(decl) && getSignatureOfTypeTag(decl) || getSignatureFromDeclaration(decl));
                }
                return result;
            }
            function getInferredTypeParameterConstraint(typeParameter, omitTypeReferences) {
                var _a2;
                let inferences;
                if ((_a2 = typeParameter.symbol) == null ? void 0 : _a2.declarations) {
                    for (const declaration of typeParameter.symbol.declarations) {
                        if (declaration.parent.kind === 192 /* InferType */) {
                            const [childTypeParameter = declaration.parent, grandParent] = walkUpParenthesizedTypesAndGetParentAndChild(declaration.parent.parent);
                            if (grandParent.kind === 180 /* TypeReference */ && !omitTypeReferences) {
                                const typeReference = grandParent;
                                const typeParameters = getTypeParametersForTypeReferenceOrImport(typeReference);
                                if (typeParameters) {
                                    const index = typeReference.typeArguments.indexOf(childTypeParameter);
                                    if (index < typeParameters.length) {
                                        const declaredConstraint = getConstraintOfTypeParameter(typeParameters[index]);
                                        if (declaredConstraint) {
                                            const mapper = makeDeferredTypeMapper(typeParameters, typeParameters.map((_, index2) => () => {
                                                return getEffectiveTypeArgumentAtIndex(typeReference, typeParameters, index2);
                                            }));
                                            const constraint = instantiateType(declaredConstraint, mapper);
                                            if (constraint !== typeParameter) {
                                                inferences = append(inferences, constraint);
                                            }
                                        }
                                    }
                                }
                            }
                            else if (grandParent.kind === 166 /* Parameter */ && grandParent.dotDotDotToken || grandParent.kind === 188 /* RestType */ || grandParent.kind === 199 /* NamedTupleMember */ && grandParent.dotDotDotToken) {
                                inferences = append(inferences, createArrayType(unknownType));
                            }
                            else if (grandParent.kind === 201 /* TemplateLiteralTypeSpan */) {
                                inferences = append(inferences, stringType);
                            }
                            else if (grandParent.kind === 165 /* TypeParameter */ && grandParent.parent.kind === 197 /* MappedType */) {
                                inferences = append(inferences, keyofConstraintType);
                            }
                            else if (grandParent.kind === 197 /* MappedType */ && grandParent.type && skipParentheses(grandParent.type) === declaration.parent && grandParent.parent.kind === 191 /* ConditionalType */ && grandParent.parent.extendsType === grandParent && grandParent.parent.checkType.kind === 197 /* MappedType */ && grandParent.parent.checkType.type) {
                                const checkMappedType2 = grandParent.parent.checkType;
                                const nodeType = getTypeFromTypeNode(checkMappedType2.type);
                                inferences = append(inferences, instantiateType(nodeType, makeUnaryTypeMapper(getDeclaredTypeOfTypeParameter(getSymbolOfDeclaration(checkMappedType2.typeParameter)), checkMappedType2.typeParameter.constraint ? getTypeFromTypeNode(checkMappedType2.typeParameter.constraint) : keyofConstraintType)));
                            }
                        }
                    }
                }
                return inferences && getIntersectionType(inferences);
            }
            function getIntendedTypeFromJSDocTypeReference(node) {
                if (isIdentifier(node.typeName)) {
                    const typeArgs = node.typeArguments;
                    switch (node.typeName.escapedText) {
                        case "String":
                            checkNoTypeArguments(node);
                            return stringType;
                        case "Number":
                            checkNoTypeArguments(node);
                            return numberType;
                        case "Boolean":
                            checkNoTypeArguments(node);
                            return booleanType;
                        case "Void":
                            checkNoTypeArguments(node);
                            return voidType;
                        case "Undefined":
                            checkNoTypeArguments(node);
                            return undefinedType;
                        case "Null":
                            checkNoTypeArguments(node);
                            return nullType;
                        case "Function":
                        case "function":
                            checkNoTypeArguments(node);
                            return globalFunctionType;
                        case "array":
                            return (!typeArgs || !typeArgs.length) && !noImplicitAny ? anyArrayType : void 0;
                        case "promise":
                            return (!typeArgs || !typeArgs.length) && !noImplicitAny ? createPromiseType(anyType) : void 0;
                        case "Object":
                            if (typeArgs && typeArgs.length === 2) {
                                if (isJSDocIndexSignature(node)) {
                                    const indexed = getTypeFromTypeNode(typeArgs[0]);
                                    const target = getTypeFromTypeNode(typeArgs[1]);
                                    const indexInfo = indexed === stringType || indexed === numberType ? [createIndexInfo(indexed, target, 
                                        /*isReadonly*/
                                        false)] : emptyArray;
                                    return createAnonymousType(void 0, emptySymbols, emptyArray, emptyArray, indexInfo);
                                }
                                return anyType;
                            }
                            checkNoTypeArguments(node);
                            return !noImplicitAny ? anyType : void 0;
                    }
                }
            }
            function mayResolveTypeAlias(node) {
                switch (node.kind) {
                    case 180 /* TypeReference */:
                        return isJSDocTypeReference(node) || !!(resolveTypeReferenceName(node, 788968 /* Type */).flags & 524288 /* TypeAlias */);
                    case 183 /* TypeQuery */:
                        return true;
                    case 195 /* TypeOperator */:
                        return node.operator !== 156 /* UniqueKeyword */ && mayResolveTypeAlias(node.type);
                    case 193 /* ParenthesizedType */:
                    case 187 /* OptionalType */:
                    case 199 /* NamedTupleMember */:
                    case 319 /* JSDocOptionalType */:
                    case 317 /* JSDocNullableType */:
                    case 318 /* JSDocNonNullableType */:
                    case 312 /* JSDocTypeExpression */:
                        return mayResolveTypeAlias(node.type);
                    case 188 /* RestType */:
                        return node.type.kind !== 185 /* ArrayType */ || mayResolveTypeAlias(node.type.elementType);
                    case 189 /* UnionType */:
                    case 190 /* IntersectionType */:
                        return some(node.types, mayResolveTypeAlias);
                    case 196 /* IndexedAccessType */:
                        return mayResolveTypeAlias(node.objectType) || mayResolveTypeAlias(node.indexType);
                    case 191 /* ConditionalType */:
                        return mayResolveTypeAlias(node.checkType) || mayResolveTypeAlias(node.extendsType) || mayResolveTypeAlias(node.trueType) || mayResolveTypeAlias(node.falseType);
                }
                return false;
            }
            function createNormalizedTupleType(target, elementTypes) {
                var _a2, _b, _c;
                if (!(target.combinedFlags & 14 /* NonRequired */)) {
                    return createTypeReference(target, elementTypes);
                }
                if (target.combinedFlags & 8 /* Variadic */) {
                    const unionIndex = findIndex(elementTypes, (t, i) => !!(target.elementFlags[i] & 8 /* Variadic */ && t.flags & (131072 /* Never */ | 1048576 /* Union */)));
                    if (unionIndex >= 0) {
                        return checkCrossProductUnion(map(elementTypes, (t, i) => target.elementFlags[i] & 8 /* Variadic */ ? t : unknownType)) ? mapType(elementTypes[unionIndex], (t) => createNormalizedTupleType(target, replaceElement(elementTypes, unionIndex, t))) : errorType;
                    }
                }
                const expandedTypes = [];
                const expandedFlags = [];
                let expandedDeclarations = [];
                let lastRequiredIndex = -1;
                let firstRestIndex = -1;
                let lastOptionalOrRestIndex = -1;
                for (let i = 0; i < elementTypes.length; i++) {
                    const type = elementTypes[i];
                    const flags = target.elementFlags[i];
                    if (flags & 8 /* Variadic */) {
                        if (type.flags & 58982400 /* InstantiableNonPrimitive */ || isGenericMappedType(type)) {
                            addElement(type, 8 /* Variadic */, (_a2 = target.labeledElementDeclarations) == null ? void 0 : _a2[i]);
                        }
                        else if (isTupleType(type)) {
                            const elements = getTypeArguments(type);
                            if (elements.length + expandedTypes.length >= 1e4) {
                                error(currentNode, isPartOfTypeNode(currentNode) ? Diagnostics.Type_produces_a_tuple_type_that_is_too_large_to_represent : Diagnostics.Expression_produces_a_tuple_type_that_is_too_large_to_represent);
                                return errorType;
                            }
                            forEach(elements, (t, n) => {
                                var _a3;
                                return addElement(t, type.target.elementFlags[n], (_a3 = type.target.labeledElementDeclarations) == null ? void 0 : _a3[n]);
                            });
                        }
                        else {
                            addElement(isArrayLikeType(type) && getIndexTypeOfType(type, numberType) || errorType, 4 /* Rest */, (_b = target.labeledElementDeclarations) == null ? void 0 : _b[i]);
                        }
                    }
                    else {
                        addElement(type, flags, (_c = target.labeledElementDeclarations) == null ? void 0 : _c[i]);
                    }
                }
                for (let i = 0; i < lastRequiredIndex; i++) {
                    if (expandedFlags[i] & 2 /* Optional */)
                        expandedFlags[i] = 1 /* Required */;
                }
                if (firstRestIndex >= 0 && firstRestIndex < lastOptionalOrRestIndex) {
                    expandedTypes[firstRestIndex] = getUnionType(sameMap(expandedTypes.slice(firstRestIndex, lastOptionalOrRestIndex + 1), (t, i) => expandedFlags[firstRestIndex + i] & 8 /* Variadic */ ? getIndexedAccessType(t, numberType) : t));
                    expandedTypes.splice(firstRestIndex + 1, lastOptionalOrRestIndex - firstRestIndex);
                    expandedFlags.splice(firstRestIndex + 1, lastOptionalOrRestIndex - firstRestIndex);
                    expandedDeclarations == null ? void 0 : expandedDeclarations.splice(firstRestIndex + 1, lastOptionalOrRestIndex - firstRestIndex);
                }
                const tupleTarget = getTupleTargetType(expandedFlags, target.readonly, expandedDeclarations);
                return tupleTarget === emptyGenericType ? emptyObjectType : expandedFlags.length ? createTypeReference(tupleTarget, expandedTypes) : tupleTarget;
                function addElement(type, flags, declaration) {
                    if (flags & 1 /* Required */) {
                        lastRequiredIndex = expandedFlags.length;
                    }
                    if (flags & 4 /* Rest */ && firstRestIndex < 0) {
                        firstRestIndex = expandedFlags.length;
                    }
                    if (flags & (2 /* Optional */ | 4 /* Rest */)) {
                        lastOptionalOrRestIndex = expandedFlags.length;
                    }
                    expandedTypes.push(flags & 2 /* Optional */ ? addOptionality(type, 
                    /*isProperty*/
                    true) : type);
                    expandedFlags.push(flags);
                    if (expandedDeclarations && declaration) {
                        expandedDeclarations.push(declaration);
                    }
                    else {
                        expandedDeclarations = void 0;
                    }
                }
            }
            function removeSubtypes(types, hasObjectTypes) {
                var _a2;
                if (types.length < 2) {
                    return types;
                }
                const id = getTypeListId(types);
                const match = subtypeReductionCache.get(id);
                if (match) {
                    return match;
                }
                const hasEmptyObject = hasObjectTypes && some(types, (t) => !!(t.flags & 524288 /* Object */) && !isGenericMappedType(t) && isEmptyResolvedType(resolveStructuredTypeMembers(t)));
                const len = types.length;
                let i = len;
                let count = 0;
                while (i > 0) {
                    i--;
                    const source = types[i];
                    if (hasEmptyObject || source.flags & 469499904 /* StructuredOrInstantiable */) {
                        if (source.flags & 262144 /* TypeParameter */ && getBaseConstraintOrType(source).flags & 1048576 /* Union */) {
                            if (isTypeRelatedTo(source, getUnionType(map(types, (t) => t === source ? neverType : t)), strictSubtypeRelation)) {
                                orderedRemoveItemAt(types, i);
                            }
                            continue;
                        }
                        const keyProperty = source.flags & (524288 /* Object */ | 2097152 /* Intersection */ | 58982400 /* InstantiableNonPrimitive */) ? find(getPropertiesOfType(source), (p) => isUnitType(getTypeOfSymbol(p))) : void 0;
                        const keyPropertyType = keyProperty && getRegularTypeOfLiteralType(getTypeOfSymbol(keyProperty));
                        for (const target of types) {
                            if (source !== target) {
                                if (count === 1e5) {
                                    const estimatedCount = count / (len - i) * len;
                                    if (estimatedCount > 1e6) {
                                        (_a2 = tracing) == null ? void 0 : _a2.instant(tracing.Phase.CheckTypes, "removeSubtypes_DepthLimit", { typeIds: types.map((t) => t.id) });
                                        error(currentNode, Diagnostics.Expression_produces_a_union_type_that_is_too_complex_to_represent);
                                        return void 0;
                                    }
                                }
                                count++;
                                if (keyProperty && target.flags & (524288 /* Object */ | 2097152 /* Intersection */ | 58982400 /* InstantiableNonPrimitive */)) {
                                    const t = getTypeOfPropertyOfType(target, keyProperty.escapedName);
                                    if (t && isUnitType(t) && getRegularTypeOfLiteralType(t) !== keyPropertyType) {
                                        continue;
                                    }
                                }
                                if (isTypeRelatedTo(source, target, strictSubtypeRelation) && (!(getObjectFlags(getTargetType(source)) & 1 /* Class */) || !(getObjectFlags(getTargetType(target)) & 1 /* Class */) || isTypeDerivedFrom(source, target))) {
                                    orderedRemoveItemAt(types, i);
                                    break;
                                }
                            }
                        }
                    }
                }
                subtypeReductionCache.set(id, types);
                return types;
            }
            function getUnionType(types, unionReduction = 1 /* Literal */, aliasSymbol, aliasTypeArguments, origin) {
                if (types.length === 0) {
                    return neverType;
                }
                if (types.length === 1) {
                    return types[0];
                }
                let typeSet = [];
                const includes = addTypesToUnion(typeSet, 0, types);
                if (unionReduction !== 0 /* None */) {
                    if (includes & 3 /* AnyOrUnknown */) {
                        return includes & 1 /* Any */ ? includes & 8388608 /* IncludesWildcard */ ? wildcardType : anyType : includes & 65536 /* Null */ || containsType(typeSet, unknownType) ? unknownType : nonNullUnknownType;
                    }
                    if (includes & 32768 /* Undefined */) {
                        if (typeSet.length >= 2 && typeSet[0] === undefinedType && typeSet[1] === missingType) {
                            orderedRemoveItemAt(typeSet, 1);
                        }
                    }
                    if (includes & (32 /* Enum */ | 2944 /* Literal */ | 8192 /* UniqueESSymbol */ | 134217728 /* TemplateLiteral */ | 268435456 /* StringMapping */) || includes & 16384 /* Void */ && includes & 32768 /* Undefined */) {
                        removeRedundantLiteralTypes(typeSet, includes, !!(unionReduction & 2 /* Subtype */));
                    }
                    if (includes & 128 /* StringLiteral */ && includes & 134217728 /* TemplateLiteral */) {
                        removeStringLiteralsMatchedByTemplateLiterals(typeSet);
                    }
                    if (unionReduction === 2 /* Subtype */) {
                        typeSet = removeSubtypes(typeSet, !!(includes & 524288 /* Object */));
                        if (!typeSet) {
                            return errorType;
                        }
                    }
                    if (typeSet.length === 0) {
                        return includes & 65536 /* Null */ ? includes & 4194304 /* IncludesNonWideningType */ ? nullType : nullWideningType : includes & 32768 /* Undefined */ ? includes & 4194304 /* IncludesNonWideningType */ ? undefinedType : undefinedWideningType : neverType;
                    }
                }
                if (!origin && includes & 1048576 /* Union */) {
                    const namedUnions = [];
                    addNamedUnions(namedUnions, types);
                    const reducedTypes = [];
                    for (const t of typeSet) {
                        if (!some(namedUnions, (union) => containsType(union.types, t))) {
                            reducedTypes.push(t);
                        }
                    }
                    if (!aliasSymbol && namedUnions.length === 1 && reducedTypes.length === 0) {
                        return namedUnions[0];
                    }
                    const namedTypesCount = reduceLeft(namedUnions, (sum, union) => sum + union.types.length, 0);
                    if (namedTypesCount + reducedTypes.length === typeSet.length) {
                        for (const t of namedUnions) {
                            insertType(reducedTypes, t);
                        }
                        origin = createOriginUnionOrIntersectionType(1048576 /* Union */, reducedTypes);
                    }
                }
                const objectFlags = (includes & 36323363 /* NotPrimitiveUnion */ ? 0 : 32768 /* PrimitiveUnion */) | (includes & 2097152 /* Intersection */ ? 16777216 /* ContainsIntersections */ : 0);
                return getUnionTypeFromSortedList(typeSet, objectFlags, aliasSymbol, aliasTypeArguments, origin);
            }
            function getIntersectionType(types, aliasSymbol, aliasTypeArguments, noSupertypeReduction) {
                const typeMembershipMap = /* @__PURE__ */ new Map();
                const includes = addTypesToIntersection(typeMembershipMap, 0, types);
                const typeSet = arrayFrom(typeMembershipMap.values());
                if (includes & 131072 /* Never */) {
                    return contains(typeSet, silentNeverType) ? silentNeverType : neverType;
                }
                if (strictNullChecks && includes & 98304 /* Nullable */ && includes & (524288 /* Object */ | 67108864 /* NonPrimitive */ | 16777216 /* IncludesEmptyObject */) || includes & 67108864 /* NonPrimitive */ && includes & (469892092 /* DisjointDomains */ & ~67108864 /* NonPrimitive */) || includes & 402653316 /* StringLike */ && includes & (469892092 /* DisjointDomains */ & ~402653316 /* StringLike */) || includes & 296 /* NumberLike */ && includes & (469892092 /* DisjointDomains */ & ~296 /* NumberLike */) || includes & 2112 /* BigIntLike */ && includes & (469892092 /* DisjointDomains */ & ~2112 /* BigIntLike */) || includes & 12288 /* ESSymbolLike */ && includes & (469892092 /* DisjointDomains */ & ~12288 /* ESSymbolLike */) || includes & 49152 /* VoidLike */ && includes & (469892092 /* DisjointDomains */ & ~49152 /* VoidLike */)) {
                    return neverType;
                }
                if (includes & 134217728 /* TemplateLiteral */ && includes & 128 /* StringLiteral */ && extractRedundantTemplateLiterals(typeSet)) {
                    return neverType;
                }
                if (includes & 1 /* Any */) {
                    return includes & 8388608 /* IncludesWildcard */ ? wildcardType : anyType;
                }
                if (!strictNullChecks && includes & 98304 /* Nullable */) {
                    return includes & 16777216 /* IncludesEmptyObject */ ? neverType : includes & 32768 /* Undefined */ ? undefinedType : nullType;
                }
                if (includes & 4 /* String */ && includes & (128 /* StringLiteral */ | 134217728 /* TemplateLiteral */ | 268435456 /* StringMapping */) || includes & 8 /* Number */ && includes & 256 /* NumberLiteral */ || includes & 64 /* BigInt */ && includes & 2048 /* BigIntLiteral */ || includes & 4096 /* ESSymbol */ && includes & 8192 /* UniqueESSymbol */ || includes & 16384 /* Void */ && includes & 32768 /* Undefined */ || includes & 16777216 /* IncludesEmptyObject */ && includes & 470302716 /* DefinitelyNonNullable */) {
                    if (!noSupertypeReduction)
                        removeRedundantSupertypes(typeSet, includes);
                }
                if (includes & 262144 /* IncludesMissingType */) {
                    typeSet[typeSet.indexOf(undefinedType)] = missingType;
                }
                if (typeSet.length === 0) {
                    return unknownType;
                }
                if (typeSet.length === 1) {
                    return typeSet[0];
                }
                const id = getTypeListId(typeSet) + getAliasId(aliasSymbol, aliasTypeArguments);
                let result = intersectionTypes.get(id);
                if (!result) {
                    if (includes & 1048576 /* Union */) {
                        if (intersectUnionsOfPrimitiveTypes(typeSet)) {
                            result = getIntersectionType(typeSet, aliasSymbol, aliasTypeArguments);
                        }
                        else if (eachIsUnionContaining(typeSet, 32768 /* Undefined */)) {
                            const containedUndefinedType = some(typeSet, containsMissingType) ? missingType : undefinedType;
                            removeFromEach(typeSet, 32768 /* Undefined */);
                            result = getUnionType([getIntersectionType(typeSet), containedUndefinedType], 1 /* Literal */, aliasSymbol, aliasTypeArguments);
                        }
                        else if (eachIsUnionContaining(typeSet, 65536 /* Null */)) {
                            removeFromEach(typeSet, 65536 /* Null */);
                            result = getUnionType([getIntersectionType(typeSet), nullType], 1 /* Literal */, aliasSymbol, aliasTypeArguments);
                        }
                        else {
                            if (!checkCrossProductUnion(typeSet)) {
                                return errorType;
                            }
                            const constituents = getCrossProductIntersections(typeSet);
                            const origin = some(constituents, (t) => !!(t.flags & 2097152 /* Intersection */)) && getConstituentCountOfTypes(constituents) > getConstituentCountOfTypes(typeSet) ? createOriginUnionOrIntersectionType(2097152 /* Intersection */, typeSet) : void 0;
                            result = getUnionType(constituents, 1 /* Literal */, aliasSymbol, aliasTypeArguments, origin);
                        }
                    }
                    else {
                        result = createIntersectionType(typeSet, aliasSymbol, aliasTypeArguments);
                    }
                    intersectionTypes.set(id, result);
                }
                return result;
            }
            function getPropertyTypeForIndexType(originalObjectType, objectType, indexType, fullIndexType, accessNode, accessFlags) {
                var _a2;
                const accessExpression = accessNode && accessNode.kind === 209 /* ElementAccessExpression */ ? accessNode : void 0;
                const propName = accessNode && isPrivateIdentifier(accessNode) ? void 0 : getPropertyNameFromIndex(indexType, accessNode);
                if (propName !== void 0) {
                    if (accessFlags & 256 /* Contextual */) {
                        return getTypeOfPropertyOfContextualType(objectType, propName) || anyType;
                    }
                    const prop = getPropertyOfType(objectType, propName);
                    if (prop) {
                        if (accessFlags & 64 /* ReportDeprecated */ && accessNode && prop.declarations && isDeprecatedSymbol(prop) && isUncalledFunctionReference(accessNode, prop)) {
                            const deprecatedNode = (_a2 = accessExpression == null ? void 0 : accessExpression.argumentExpression) != null ? _a2 : isIndexedAccessTypeNode(accessNode) ? accessNode.indexType : accessNode;
                            addDeprecatedSuggestion(deprecatedNode, prop.declarations, propName);
                        }
                        if (accessExpression) {
                            markPropertyAsReferenced(prop, accessExpression, isSelfTypeAccess(accessExpression.expression, objectType.symbol));
                            if (isAssignmentToReadonlyEntity(accessExpression, prop, getAssignmentTargetKind(accessExpression))) {
                                error(accessExpression.argumentExpression, Diagnostics.Cannot_assign_to_0_because_it_is_a_read_only_property, symbolToString(prop));
                                return void 0;
                            }
                            if (accessFlags & 8 /* CacheSymbol */) {
                                getNodeLinks(accessNode).resolvedSymbol = prop;
                            }
                            if (isThisPropertyAccessInConstructor(accessExpression, prop)) {
                                return autoType;
                            }
                        }
                        const propType = getTypeOfSymbol(prop);
                        return accessExpression && getAssignmentTargetKind(accessExpression) !== 1 /* Definite */ ? getFlowTypeOfReference(accessExpression, propType) : accessNode && isIndexedAccessTypeNode(accessNode) && containsMissingType(propType) ? getUnionType([propType, undefinedType]) : propType;
                    }
                    if (everyType(objectType, isTupleType) && isNumericLiteralName(propName)) {
                        const index = +propName;
                        if (accessNode && everyType(objectType, (t) => !t.target.hasRestElement) && !(accessFlags & 16 /* NoTupleBoundsCheck */)) {
                            const indexNode = getIndexNodeForAccessExpression(accessNode);
                            if (isTupleType(objectType)) {
                                if (index < 0) {
                                    error(indexNode, Diagnostics.A_tuple_type_cannot_be_indexed_with_a_negative_value);
                                    return undefinedType;
                                }
                                error(indexNode, Diagnostics.Tuple_type_0_of_length_1_has_no_element_at_index_2, typeToString(objectType), getTypeReferenceArity(objectType), unescapeLeadingUnderscores(propName));
                            }
                            else {
                                error(indexNode, Diagnostics.Property_0_does_not_exist_on_type_1, unescapeLeadingUnderscores(propName), typeToString(objectType));
                            }
                        }
                        if (index >= 0) {
                            errorIfWritingToReadonlyIndex(getIndexInfoOfType(objectType, numberType));
                            return mapType(objectType, (t) => {
                                const restType = getRestTypeOfTupleType(t) || undefinedType;
                                return accessFlags & 1 /* IncludeUndefined */ ? getUnionType([restType, missingType]) : restType;
                            });
                        }
                    }
                }
                if (!(indexType.flags & 98304 /* Nullable */) && isTypeAssignableToKind(indexType, 402653316 /* StringLike */ | 296 /* NumberLike */ | 12288 /* ESSymbolLike */)) {
                    if (objectType.flags & (1 /* Any */ | 131072 /* Never */)) {
                        return objectType;
                    }
                    const indexInfo = getApplicableIndexInfo(objectType, indexType) || getIndexInfoOfType(objectType, stringType);
                    if (indexInfo) {
                        if (accessFlags & 2 /* NoIndexSignatures */ && indexInfo.keyType !== numberType) {
                            if (accessExpression) {
                                error(accessExpression, Diagnostics.Type_0_cannot_be_used_to_index_type_1, typeToString(indexType), typeToString(originalObjectType));
                            }
                            return void 0;
                        }
                        if (accessNode && indexInfo.keyType === stringType && !isTypeAssignableToKind(indexType, 4 /* String */ | 8 /* Number */)) {
                            const indexNode = getIndexNodeForAccessExpression(accessNode);
                            error(indexNode, Diagnostics.Type_0_cannot_be_used_as_an_index_type, typeToString(indexType));
                            return accessFlags & 1 /* IncludeUndefined */ ? getUnionType([indexInfo.type, missingType]) : indexInfo.type;
                        }
                        errorIfWritingToReadonlyIndex(indexInfo);
                        if (accessFlags & 1 /* IncludeUndefined */ && !(objectType.symbol && objectType.symbol.flags & (256 /* RegularEnum */ | 128 /* ConstEnum */) && (indexType.symbol && indexType.flags & 1024 /* EnumLiteral */ && getParentOfSymbol(indexType.symbol) === objectType.symbol))) {
                            return getUnionType([indexInfo.type, missingType]);
                        }
                        return indexInfo.type;
                    }
                    if (indexType.flags & 131072 /* Never */) {
                        return neverType;
                    }
                    if (isJSLiteralType(objectType)) {
                        return anyType;
                    }
                    if (accessExpression && !isConstEnumObjectType(objectType)) {
                        if (isObjectLiteralType2(objectType)) {
                            if (noImplicitAny && indexType.flags & (128 /* StringLiteral */ | 256 /* NumberLiteral */)) {
                                diagnostics.add(createDiagnosticForNode(accessExpression, Diagnostics.Property_0_does_not_exist_on_type_1, indexType.value, typeToString(objectType)));
                                return undefinedType;
                            }
                            else if (indexType.flags & (8 /* Number */ | 4 /* String */)) {
                                const types = map(objectType.properties, (property) => {
                                    return getTypeOfSymbol(property);
                                });
                                return getUnionType(append(types, undefinedType));
                            }
                        }
                        if (objectType.symbol === globalThisSymbol && propName !== void 0 && globalThisSymbol.exports.has(propName) && globalThisSymbol.exports.get(propName).flags & 418 /* BlockScoped */) {
                            error(accessExpression, Diagnostics.Property_0_does_not_exist_on_type_1, unescapeLeadingUnderscores(propName), typeToString(objectType));
                        }
                        else if (noImplicitAny && !compilerOptions.suppressImplicitAnyIndexErrors && !(accessFlags & 128 /* SuppressNoImplicitAnyError */)) {
                            if (propName !== void 0 && typeHasStaticProperty(propName, objectType)) {
                                const typeName = typeToString(objectType);
                                error(accessExpression, Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_to_access_the_static_member_2_instead, propName, typeName, typeName + "[" + getTextOfNode(accessExpression.argumentExpression) + "]");
                            }
                            else if (getIndexTypeOfType(objectType, numberType)) {
                                error(accessExpression.argumentExpression, Diagnostics.Element_implicitly_has_an_any_type_because_index_expression_is_not_of_type_number);
                            }
                            else {
                                let suggestion;
                                if (propName !== void 0 && (suggestion = getSuggestionForNonexistentProperty(propName, objectType))) {
                                    if (suggestion !== void 0) {
                                        error(accessExpression.argumentExpression, Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2, propName, typeToString(objectType), suggestion);
                                    }
                                }
                                else {
                                    const suggestion2 = getSuggestionForNonexistentIndexSignature(objectType, accessExpression, indexType);
                                    if (suggestion2 !== void 0) {
                                        error(accessExpression, Diagnostics.Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature_Did_you_mean_to_call_1, typeToString(objectType), suggestion2);
                                    }
                                    else {
                                        let errorInfo;
                                        if (indexType.flags & 1024 /* EnumLiteral */) {
                                            errorInfo = chainDiagnosticMessages(
                                            /* details */
                                            void 0, Diagnostics.Property_0_does_not_exist_on_type_1, "[" + typeToString(indexType) + "]", typeToString(objectType));
                                        }
                                        else if (indexType.flags & 8192 /* UniqueESSymbol */) {
                                            const symbolName2 = getFullyQualifiedName(indexType.symbol, accessExpression);
                                            errorInfo = chainDiagnosticMessages(
                                            /* details */
                                            void 0, Diagnostics.Property_0_does_not_exist_on_type_1, "[" + symbolName2 + "]", typeToString(objectType));
                                        }
                                        else if (indexType.flags & 128 /* StringLiteral */) {
                                            errorInfo = chainDiagnosticMessages(
                                            /* details */
                                            void 0, Diagnostics.Property_0_does_not_exist_on_type_1, indexType.value, typeToString(objectType));
                                        }
                                        else if (indexType.flags & 256 /* NumberLiteral */) {
                                            errorInfo = chainDiagnosticMessages(
                                            /* details */
                                            void 0, Diagnostics.Property_0_does_not_exist_on_type_1, indexType.value, typeToString(objectType));
                                        }
                                        else if (indexType.flags & (8 /* Number */ | 4 /* String */)) {
                                            errorInfo = chainDiagnosticMessages(
                                            /* details */
                                            void 0, Diagnostics.No_index_signature_with_a_parameter_of_type_0_was_found_on_type_1, typeToString(indexType), typeToString(objectType));
                                        }
                                        errorInfo = chainDiagnosticMessages(errorInfo, Diagnostics.Element_implicitly_has_an_any_type_because_expression_of_type_0_can_t_be_used_to_index_type_1, typeToString(fullIndexType), typeToString(objectType));
                                        diagnostics.add(createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(accessExpression), accessExpression, errorInfo));
                                    }
                                }
                            }
                        }
                        return void 0;
                    }
                }
                if (isJSLiteralType(objectType)) {
                    return anyType;
                }
                if (accessNode) {
                    const indexNode = getIndexNodeForAccessExpression(accessNode);
                    if (indexType.flags & (128 /* StringLiteral */ | 256 /* NumberLiteral */)) {
                        error(indexNode, Diagnostics.Property_0_does_not_exist_on_type_1, "" + indexType.value, typeToString(objectType));
                    }
                    else if (indexType.flags & (4 /* String */ | 8 /* Number */)) {
                        error(indexNode, Diagnostics.Type_0_has_no_matching_index_signature_for_type_1, typeToString(objectType), typeToString(indexType));
                    }
                    else {
                        error(indexNode, Diagnostics.Type_0_cannot_be_used_as_an_index_type, typeToString(indexType));
                    }
                }
                if (isTypeAny(indexType)) {
                    return indexType;
                }
                return void 0;
                function errorIfWritingToReadonlyIndex(indexInfo) {
                    if (indexInfo && indexInfo.isReadonly && accessExpression && (isAssignmentTarget(accessExpression) || isDeleteTarget(accessExpression))) {
                        error(accessExpression, Diagnostics.Index_signature_in_type_0_only_permits_reading, typeToString(objectType));
                    }
                }
            }
            function getIndexedAccessType(objectType, indexType, accessFlags = 0 /* None */, accessNode, aliasSymbol, aliasTypeArguments) {
            function getIndexedAccessTypeOrUndefined(objectType, indexType, accessFlags = 0 /* None */, accessNode, aliasSymbol, aliasTypeArguments) {
                if (objectType === wildcardType || indexType === wildcardType) {
                    return wildcardType;
                }
                if (isStringIndexSignatureOnlyType(objectType) && !(indexType.flags & 98304 /* Nullable */) && isTypeAssignableToKind(indexType, 4 /* String */ | 8 /* Number */)) {
                    indexType = stringType;
                }
                if (compilerOptions.noUncheckedIndexedAccess && accessFlags & 32 /* ExpressionPosition */)
                    accessFlags |= 1 /* IncludeUndefined */;
                if (isGenericIndexType(indexType) || (accessNode && accessNode.kind !== 196 /* IndexedAccessType */ ? isGenericTupleType(objectType) && !indexTypeLessThan(indexType, objectType.target.fixedLength) : isGenericObjectType(objectType) && !(isTupleType(objectType) && indexTypeLessThan(indexType, objectType.target.fixedLength)))) {
                    if (objectType.flags & 3 /* AnyOrUnknown */) {
                        return objectType;
                    }
                    const persistentAccessFlags = accessFlags & 1 /* Persistent */;
                    const id = objectType.id + "," + indexType.id + "," + persistentAccessFlags + getAliasId(aliasSymbol, aliasTypeArguments);
                    let type = indexedAccessTypes.get(id);
                    if (!type) {
                        indexedAccessTypes.set(id, type = createIndexedAccessType(objectType, indexType, persistentAccessFlags, aliasSymbol, aliasTypeArguments));
                    }
                    return type;
                }
                const apparentObjectType = getReducedApparentType(objectType);
                if (indexType.flags & 1048576 /* Union */ && !(indexType.flags & 16 /* Boolean */)) {
                    const propTypes = [];
                    let wasMissingProp = false;
                    for (const t of indexType.types) {
                        const propType = getPropertyTypeForIndexType(objectType, apparentObjectType, t, indexType, accessNode, accessFlags | (wasMissingProp ? 128 /* SuppressNoImplicitAnyError */ : 0));
                        if (propType) {
                            propTypes.push(propType);
                        }
                        else if (!accessNode) {
                            return void 0;
                        }
                        else {
                            wasMissingProp = true;
                        }
                    }
                    if (wasMissingProp) {
                        return void 0;
                    }
                    return accessFlags & 4 /* Writing */ ? getIntersectionType(propTypes, aliasSymbol, aliasTypeArguments) : getUnionType(propTypes, 1 /* Literal */, aliasSymbol, aliasTypeArguments);
                }
                return getPropertyTypeForIndexType(objectType, apparentObjectType, indexType, indexType, accessNode, accessFlags | 8 /* CacheSymbol */ | 64 /* ReportDeprecated */);
            }
            function getConditionalType(root, mapper, aliasSymbol, aliasTypeArguments) {
                let result;
                let extraTypes;
                let tailCount = 0;
                while (true) {
                    if (tailCount === 1e3) {
                        error(currentNode, Diagnostics.Type_instantiation_is_excessively_deep_and_possibly_infinite);
                        result = errorType;
                        break;
                    }
                    const checkTuples = isSimpleTupleType(root.node.checkType) && isSimpleTupleType(root.node.extendsType) && length(root.node.checkType.elements) === length(root.node.extendsType.elements);
                    const checkType = instantiateType(getActualTypeVariable(root.checkType), mapper);
                    const checkTypeDeferred = isDeferredType(checkType, checkTuples);
                    const extendsType = instantiateType(root.extendsType, mapper);
                    if (checkType === wildcardType || extendsType === wildcardType) {
                        return wildcardType;
                    }
                    let combinedMapper;
                    if (root.inferTypeParameters) {
                        const freshParams = sameMap(root.inferTypeParameters, maybeCloneTypeParameter);
                        const freshMapper = freshParams !== root.inferTypeParameters ? createTypeMapper(root.inferTypeParameters, freshParams) : void 0;
                        const context = createInferenceContext(freshParams, 
                        /*signature*/
                        void 0, 0 /* None */);
                        if (freshMapper) {
                            const freshCombinedMapper = combineTypeMappers(mapper, freshMapper);
                            for (const p of freshParams) {
                                if (root.inferTypeParameters.indexOf(p) === -1) {
                                    p.mapper = freshCombinedMapper;
                                }
                            }
                        }
                        if (!checkTypeDeferred) {
                            inferTypes(context.inferences, checkType, instantiateType(extendsType, freshMapper), 512 /* NoConstraints */ | 1024 /* AlwaysStrict */);
                        }
                        const innerMapper = combineTypeMappers(freshMapper, context.mapper);
                        combinedMapper = mapper ? combineTypeMappers(innerMapper, mapper) : innerMapper;
                    }
                    const inferredExtendsType = combinedMapper ? instantiateType(root.extendsType, combinedMapper) : extendsType;
                    if (!checkTypeDeferred && !isDeferredType(inferredExtendsType, checkTuples)) {
                        if (!(inferredExtendsType.flags & 3 /* AnyOrUnknown */) && (checkType.flags & 1 /* Any */ || !isTypeAssignableTo(getPermissiveInstantiation(checkType), getPermissiveInstantiation(inferredExtendsType)))) {
                            if (checkType.flags & 1 /* Any */) {
                                (extraTypes || (extraTypes = [])).push(instantiateType(getTypeFromTypeNode(root.node.trueType), combinedMapper || mapper));
                            }
                            const falseType2 = getTypeFromTypeNode(root.node.falseType);
                            if (falseType2.flags & 16777216 /* Conditional */) {
                                const newRoot = falseType2.root;
                                if (newRoot.node.parent === root.node && (!newRoot.isDistributive || newRoot.checkType === root.checkType)) {
                                    root = newRoot;
                                    continue;
                                }
                                if (canTailRecurse(falseType2, mapper)) {
                                    continue;
                                }
                            }
                            result = instantiateType(falseType2, mapper);
                            break;
                        }
                        if (inferredExtendsType.flags & 3 /* AnyOrUnknown */ || isTypeAssignableTo(getRestrictiveInstantiation(checkType), getRestrictiveInstantiation(inferredExtendsType))) {
                            const trueType2 = getTypeFromTypeNode(root.node.trueType);
                            const trueMapper = combinedMapper || mapper;
                            if (canTailRecurse(trueType2, trueMapper)) {
                                continue;
                            }
                            result = instantiateType(trueType2, trueMapper);
                            break;
                        }
                    }
                    result = createType(16777216 /* Conditional */);
                    result.root = root;
                    result.checkType = instantiateType(root.checkType, mapper);
                    result.extendsType = instantiateType(root.extendsType, mapper);
                    result.mapper = mapper;
                    result.combinedMapper = combinedMapper;
                    result.aliasSymbol = aliasSymbol || root.aliasSymbol;
                    result.aliasTypeArguments = aliasSymbol ? aliasTypeArguments : instantiateTypes(root.aliasTypeArguments, mapper);
                    break;
                }
                return extraTypes ? getUnionType(append(extraTypes, result)) : result;
                function canTailRecurse(newType, newMapper) {
                    if (newType.flags & 16777216 /* Conditional */ && newMapper) {
                        const newRoot = newType.root;
                        if (newRoot.outerTypeParameters) {
                            const typeParamMapper = combineTypeMappers(newType.mapper, newMapper);
                            const typeArguments = map(newRoot.outerTypeParameters, (t) => getMappedType(t, typeParamMapper));
                            const newRootMapper = createTypeMapper(newRoot.outerTypeParameters, typeArguments);
                            const newCheckType = newRoot.isDistributive ? getMappedType(newRoot.checkType, newRootMapper) : void 0;
                            if (!newCheckType || newCheckType === newRoot.checkType || !(newCheckType.flags & (1048576 /* Union */ | 131072 /* Never */))) {
                                root = newRoot;
                                mapper = newRootMapper;
                                aliasSymbol = void 0;
                                aliasTypeArguments = void 0;
                                if (newRoot.aliasSymbol) {
                                    tailCount++;
                                }
                                return true;
                            }
                        }
                    }
                    return false;
                }
            }
            function getSpreadType(left, right, symbol, objectFlags, readonly) {
                if (left.flags & 1 /* Any */ || right.flags & 1 /* Any */) {
                    return anyType;
                }
                if (left.flags & 2 /* Unknown */ || right.flags & 2 /* Unknown */) {
                    return unknownType;
                }
                if (left.flags & 131072 /* Never */) {
                    return right;
                }
                if (right.flags & 131072 /* Never */) {
                    return left;
                }
                left = tryMergeUnionOfObjectTypeAndEmptyObject(left, readonly);
                if (left.flags & 1048576 /* Union */) {
                    return checkCrossProductUnion([left, right]) ? mapType(left, (t) => getSpreadType(t, right, symbol, objectFlags, readonly)) : errorType;
                }
                right = tryMergeUnionOfObjectTypeAndEmptyObject(right, readonly);
                if (right.flags & 1048576 /* Union */) {
                    return checkCrossProductUnion([left, right]) ? mapType(right, (t) => getSpreadType(left, t, symbol, objectFlags, readonly)) : errorType;
                }
                if (right.flags & (528 /* BooleanLike */ | 296 /* NumberLike */ | 2112 /* BigIntLike */ | 402653316 /* StringLike */ | 1056 /* EnumLike */ | 67108864 /* NonPrimitive */ | 4194304 /* Index */)) {
                    return left;
                }
                if (isGenericObjectType(left) || isGenericObjectType(right)) {
                    if (isEmptyObjectType(left)) {
                        return right;
                    }
                    if (left.flags & 2097152 /* Intersection */) {
                        const types = left.types;
                        const lastLeft = types[types.length - 1];
                        if (isNonGenericObjectType(lastLeft) && isNonGenericObjectType(right)) {
                            return getIntersectionType(concatenate(types.slice(0, types.length - 1), [getSpreadType(lastLeft, right, symbol, objectFlags, readonly)]));
                        }
                    }
                    return getIntersectionType([left, right]);
                }
                const members = createSymbolTable();
                const skippedPrivateMembers = /* @__PURE__ */ new Set();
                const indexInfos = left === emptyObjectType ? getIndexInfosOfType(right) : getUnionIndexInfos([left, right]);
                for (const rightProp of getPropertiesOfType(right)) {
                    if (getDeclarationModifierFlagsFromSymbol(rightProp) & (8 /* Private */ | 16 /* Protected */)) {
                        skippedPrivateMembers.add(rightProp.escapedName);
                    }
                    else if (isSpreadableProperty(rightProp)) {
                        members.set(rightProp.escapedName, getSpreadSymbol(rightProp, readonly));
                    }
                }
                for (const leftProp of getPropertiesOfType(left)) {
                    if (skippedPrivateMembers.has(leftProp.escapedName) || !isSpreadableProperty(leftProp)) {
                        continue;
                    }
                    if (members.has(leftProp.escapedName)) {
                        const rightProp = members.get(leftProp.escapedName);
                        const rightType = getTypeOfSymbol(rightProp);
                        if (rightProp.flags & 16777216 /* Optional */) {
                            const declarations = concatenate(leftProp.declarations, rightProp.declarations);
                            const flags = 4 /* Property */ | leftProp.flags & 16777216 /* Optional */;
                            const result = createSymbol(flags, leftProp.escapedName);
                            result.links.type = getUnionType([getTypeOfSymbol(leftProp), removeMissingOrUndefinedType(rightType)], 2 /* Subtype */);
                            result.links.leftSpread = leftProp;
                            result.links.rightSpread = rightProp;
                            result.declarations = declarations;
                            result.links.nameType = getSymbolLinks(leftProp).nameType;
                            members.set(leftProp.escapedName, result);
                        }
                    }
                    else {
                        members.set(leftProp.escapedName, getSpreadSymbol(leftProp, readonly));
                    }
                }
                const spread = createAnonymousType(symbol, members, emptyArray, emptyArray, sameMap(indexInfos, (info) => getIndexInfoWithReadonly(info, readonly)));
                spread.objectFlags |= 128 /* ObjectLiteral */ | 131072 /* ContainsObjectOrArrayLiteral */ | 2097152 /* ContainsSpread */ | objectFlags;
                return spread;
            }
            function getTypeFromTypeNodeWorker(node) {
                switch (node.kind) {
                    case 131 /* AnyKeyword */:
                    case 315 /* JSDocAllType */:
                    case 316 /* JSDocUnknownType */:
                        return anyType;
                    case 157 /* UnknownKeyword */:
                        return unknownType;
                    case 152 /* StringKeyword */:
                        return stringType;
                    case 148 /* NumberKeyword */:
                        return numberType;
                    case 160 /* BigIntKeyword */:
                        return bigintType;
                    case 134 /* BooleanKeyword */:
                        return booleanType;
                    case 153 /* SymbolKeyword */:
                        return esSymbolType;
                    case 114 /* VoidKeyword */:
                        return voidType;
                    case 155 /* UndefinedKeyword */:
                        return undefinedType;
                    case 104 /* NullKeyword */:
                        return nullType;
                    case 144 /* NeverKeyword */:
                        return neverType;
                    case 149 /* ObjectKeyword */:
                        return node.flags & 262144 /* JavaScriptFile */ && !noImplicitAny ? anyType : nonPrimitiveType;
                    case 139 /* IntrinsicKeyword */:
                        return intrinsicMarkerType;
                    case 194 /* ThisType */:
                    case 108 /* ThisKeyword */:
                        return getTypeFromThisTypeNode(node);
                    case 198 /* LiteralType */:
                        return getTypeFromLiteralTypeNode(node);
                    case 180 /* TypeReference */:
                        return getTypeFromTypeReference(node);
                    case 179 /* TypePredicate */:
                        return node.assertsModifier ? voidType : booleanType;
                    case 230 /* ExpressionWithTypeArguments */:
                        return getTypeFromTypeReference(node);
                    case 183 /* TypeQuery */:
                        return getTypeFromTypeQueryNode(node);
                    case 185 /* ArrayType */:
                    case 186 /* TupleType */:
                        return getTypeFromArrayOrTupleTypeNode(node);
                    case 187 /* OptionalType */:
                        return getTypeFromOptionalTypeNode(node);
                    case 189 /* UnionType */:
                        return getTypeFromUnionTypeNode(node);
                    case 190 /* IntersectionType */:
                        return getTypeFromIntersectionTypeNode(node);
                    case 317 /* JSDocNullableType */:
                        return getTypeFromJSDocNullableTypeNode(node);
                    case 319 /* JSDocOptionalType */:
                        return addOptionality(getTypeFromTypeNode(node.type));
                    case 199 /* NamedTupleMember */:
                        return getTypeFromNamedTupleTypeNode(node);
                    case 193 /* ParenthesizedType */:
                    case 318 /* JSDocNonNullableType */:
                    case 312 /* JSDocTypeExpression */:
                        return getTypeFromTypeNode(node.type);
                    case 188 /* RestType */:
                        return getTypeFromRestTypeNode(node);
                    case 321 /* JSDocVariadicType */:
                        return getTypeFromJSDocVariadicType(node);
                    case 181 /* FunctionType */:
                    case 182 /* ConstructorType */:
                    case 184 /* TypeLiteral */:
                    case 325 /* JSDocTypeLiteral */:
                    case 320 /* JSDocFunctionType */:
                    case 326 /* JSDocSignature */:
                        return getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node);
                    case 195 /* TypeOperator */:
                        return getTypeFromTypeOperatorNode(node);
                    case 196 /* IndexedAccessType */:
                        return getTypeFromIndexedAccessTypeNode(node);
                    case 197 /* MappedType */:
                        return getTypeFromMappedTypeNode(node);
                    case 191 /* ConditionalType */:
                        return getTypeFromConditionalTypeNode(node);
                    case 192 /* InferType */:
                        return getTypeFromInferTypeNode(node);
                    case 200 /* TemplateLiteralType */:
                        return getTypeFromTemplateTypeNode(node);
                    case 202 /* ImportType */:
                        return getTypeFromImportTypeNode(node);
                    case 79 /* Identifier */:
                    case 163 /* QualifiedName */:
                    case 208 /* PropertyAccessExpression */:
                        const symbol = getSymbolAtLocation(node);
                        return symbol ? getDeclaredTypeOfSymbol(symbol) : errorType;
                    default:
                        return errorType;
                }
            }
            function instantiateTypeWorker(type, mapper, aliasSymbol, aliasTypeArguments) {
                const flags = type.flags;
                if (flags & 262144 /* TypeParameter */) {
                    return getMappedType(type, mapper);
                }
                if (flags & 524288 /* Object */) {
                    const objectFlags = type.objectFlags;
                    if (objectFlags & (4 /* Reference */ | 16 /* Anonymous */ | 32 /* Mapped */)) {
                        if (objectFlags & 4 /* Reference */ && !type.node) {
                            const resolvedTypeArguments = type.resolvedTypeArguments;
                            const newTypeArguments = instantiateTypes(resolvedTypeArguments, mapper);
                            return newTypeArguments !== resolvedTypeArguments ? createNormalizedTypeReference(type.target, newTypeArguments) : type;
                        }
                        if (objectFlags & 1024 /* ReverseMapped */) {
                            return instantiateReverseMappedType(type, mapper);
                        }
                        return getObjectTypeInstantiation(type, mapper, aliasSymbol, aliasTypeArguments);
                    }
                    return type;
                }
                if (flags & 3145728 /* UnionOrIntersection */) {
                    const origin = type.flags & 1048576 /* Union */ ? type.origin : void 0;
                    const types = origin && origin.flags & 3145728 /* UnionOrIntersection */ ? origin.types : type.types;
                    const newTypes = instantiateTypes(types, mapper);
                    if (newTypes === types && aliasSymbol === type.aliasSymbol) {
                        return type;
                    }
                    const newAliasSymbol = aliasSymbol || type.aliasSymbol;
                    const newAliasTypeArguments = aliasSymbol ? aliasTypeArguments : instantiateTypes(type.aliasTypeArguments, mapper);
                    return flags & 2097152 /* Intersection */ || origin && origin.flags & 2097152 /* Intersection */ ? getIntersectionType(newTypes, newAliasSymbol, newAliasTypeArguments) : getUnionType(newTypes, 1 /* Literal */, newAliasSymbol, newAliasTypeArguments);
                }
                if (flags & 4194304 /* Index */) {
                    return getIndexType(instantiateType(type.type, mapper));
                }
                if (flags & 134217728 /* TemplateLiteral */) {
                    return getTemplateLiteralType(type.texts, instantiateTypes(type.types, mapper));
                }
                if (flags & 268435456 /* StringMapping */) {
                    return getStringMappingType(type.symbol, instantiateType(type.type, mapper));
                }
                if (flags & 8388608 /* IndexedAccess */) {
                    const newAliasSymbol = aliasSymbol || type.aliasSymbol;
                    const newAliasTypeArguments = aliasSymbol ? aliasTypeArguments : instantiateTypes(type.aliasTypeArguments, mapper);
                    return getIndexedAccessType(instantiateType(type.objectType, mapper), instantiateType(type.indexType, mapper), type.accessFlags, 
                    /*accessNode*/
                    void 0, newAliasSymbol, newAliasTypeArguments);
                }
                if (flags & 16777216 /* Conditional */) {
                    return getConditionalTypeInstantiation(type, combineTypeMappers(type.mapper, mapper), aliasSymbol, aliasTypeArguments);
                }
                if (flags & 33554432 /* Substitution */) {
                    const newBaseType = instantiateType(type.baseType, mapper);
                    const newConstraint = instantiateType(type.constraint, mapper);
                    if (newBaseType.flags & 8650752 /* TypeVariable */ && isGenericType(newConstraint)) {
                        return getSubstitutionType(newBaseType, newConstraint);
                    }
                    if (newConstraint.flags & 3 /* AnyOrUnknown */ || isTypeAssignableTo(getRestrictiveInstantiation(newBaseType), getRestrictiveInstantiation(newConstraint))) {
                        return newBaseType;
                    }
                    return newBaseType.flags & 8650752 /* TypeVariable */ ? getSubstitutionType(newBaseType, newConstraint) : getIntersectionType([newConstraint, newBaseType]);
                }
                return type;
            }
            function isContextSensitive(node) {
                Debug.assert(node.kind !== 171 /* MethodDeclaration */ || isObjectLiteralMethod(node));
                switch (node.kind) {
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                    case 171 /* MethodDeclaration */:
                    case 259 /* FunctionDeclaration */:
                        return isContextSensitiveFunctionLikeDeclaration(node);
                    case 207 /* ObjectLiteralExpression */:
                        return some(node.properties, isContextSensitive);
                    case 206 /* ArrayLiteralExpression */:
                        return some(node.elements, isContextSensitive);
                    case 224 /* ConditionalExpression */:
                        return isContextSensitive(node.whenTrue) || isContextSensitive(node.whenFalse);
                    case 223 /* BinaryExpression */:
                        return (node.operatorToken.kind === 56 /* BarBarToken */ || node.operatorToken.kind === 60 /* QuestionQuestionToken */) && (isContextSensitive(node.left) || isContextSensitive(node.right));
                    case 299 /* PropertyAssignment */:
                        return isContextSensitive(node.initializer);
                    case 214 /* ParenthesizedExpression */:
                        return isContextSensitive(node.expression);
                    case 289 /* JsxAttributes */:
                        return some(node.properties, isContextSensitive) || isJsxOpeningElement(node.parent) && some(node.parent.parent.children, isContextSensitive);
                    case 288 /* JsxAttribute */: {
                        const { initializer } = node;
                        return !!initializer && isContextSensitive(initializer);
                    }
                    case 291 /* JsxExpression */: {
                        const { expression } = node;
                        return !!expression && isContextSensitive(expression);
                    }
                }
                return false;
            }
            function checkTypeAssignableTo(source, target, errorNode, headMessage, containingMessageChain, errorOutputObject) {
            function checkTypeAssignableToAndOptionallyElaborate(source, target, errorNode, expr, headMessage, containingMessageChain) {
            function checkTypeRelatedToAndOptionallyElaborate(source, target, relation, errorNode, expr, headMessage, containingMessageChain, errorOutputContainer) {
            function elaborateError(node, source, target, relation, headMessage, containingMessageChain, errorOutputContainer) {
            function elaborateDidYouMeanToCallOrConstruct(node, source, target, relation, headMessage, containingMessageChain, errorOutputContainer) {
            function elaborateArrowFunction(node, source, target, relation, containingMessageChain, errorOutputContainer) {
            function elaborateElementwise(iterator, source, target, relation, containingMessageChain, errorOutputContainer) {
                let reportedError = false;
                for (const value of iterator) {
                    const { errorNode: prop, innerExpression: next, nameType, errorMessage } = value;
                    let targetPropType = getBestMatchIndexedAccessTypeOrUndefined(source, target, nameType);
                    if (!targetPropType || targetPropType.flags & 8388608 /* IndexedAccess */)
                        continue;
                    let sourcePropType = getIndexedAccessTypeOrUndefined(source, nameType);
                    if (!sourcePropType)
                        continue;
                    const propName = getPropertyNameFromIndex(nameType, 
                    /*accessNode*/
                    void 0);
                    if (!checkTypeRelatedTo(sourcePropType, targetPropType, relation, 
                    /*errorNode*/
                    void 0)) {
                        const elaborated = next && elaborateError(next, sourcePropType, targetPropType, relation, 
                        /*headMessage*/
                        void 0, containingMessageChain, errorOutputContainer);
                        reportedError = true;
                        if (!elaborated) {
                            const resultObj = errorOutputContainer || {};
                            const specificSource = next ? checkExpressionForMutableLocationWithContextualType(next, sourcePropType) : sourcePropType;
                            if (exactOptionalPropertyTypes && isExactOptionalPropertyMismatch(specificSource, targetPropType)) {
                                const diag2 = createDiagnosticForNode(prop, Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_type_of_the_target, typeToString(specificSource), typeToString(targetPropType));
                                diagnostics.add(diag2);
                                resultObj.errors = [diag2];
                            }
                            else {
                                const targetIsOptional = !!(propName && (getPropertyOfType(target, propName) || unknownSymbol).flags & 16777216 /* Optional */);
                                const sourceIsOptional = !!(propName && (getPropertyOfType(source, propName) || unknownSymbol).flags & 16777216 /* Optional */);
                                targetPropType = removeMissingType(targetPropType, targetIsOptional);
                                sourcePropType = removeMissingType(sourcePropType, targetIsOptional && sourceIsOptional);
                                const result = checkTypeRelatedTo(specificSource, targetPropType, relation, prop, errorMessage, containingMessageChain, resultObj);
                                if (result && specificSource !== sourcePropType) {
                                    checkTypeRelatedTo(sourcePropType, targetPropType, relation, prop, errorMessage, containingMessageChain, resultObj);
                                }
                            }
                            if (resultObj.errors) {
                                const reportedDiag = resultObj.errors[resultObj.errors.length - 1];
                                const propertyName = isTypeUsableAsPropertyName(nameType) ? getPropertyNameFromType(nameType) : void 0;
                                const targetProp = propertyName !== void 0 ? getPropertyOfType(target, propertyName) : void 0;
                                let issuedElaboration = false;
                                if (!targetProp) {
                                    const indexInfo = getApplicableIndexInfo(target, nameType);
                                    if (indexInfo && indexInfo.declaration && !getSourceFileOfNode(indexInfo.declaration).hasNoDefaultLib) {
                                        issuedElaboration = true;
                                        addRelatedInfo(reportedDiag, createDiagnosticForNode(indexInfo.declaration, Diagnostics.The_expected_type_comes_from_this_index_signature));
                                    }
                                }
                                if (!issuedElaboration && (targetProp && length(targetProp.declarations) || target.symbol && length(target.symbol.declarations))) {
                                    const targetNode = targetProp && length(targetProp.declarations) ? targetProp.declarations[0] : target.symbol.declarations[0];
                                    if (!getSourceFileOfNode(targetNode).hasNoDefaultLib) {
                                        addRelatedInfo(reportedDiag, createDiagnosticForNode(targetNode, Diagnostics.The_expected_type_comes_from_property_0_which_is_declared_here_on_type_1, propertyName && !(nameType.flags & 8192 /* UniqueESSymbol */) ? unescapeLeadingUnderscores(propertyName) : typeToString(nameType), typeToString(target)));
                                    }
                                }
                            }
                        }
                    }
                }
                return reportedError;
            }
            function elaborateIterableOrArrayLikeTargetElementwise(iterator, source, target, relation, containingMessageChain, errorOutputContainer) {
                const tupleOrArrayLikeTargetParts = filterType(target, isArrayOrTupleLikeType);
                const nonTupleOrArrayLikeTargetParts = filterType(target, (t) => !isArrayOrTupleLikeType(t));
                const iterationType = nonTupleOrArrayLikeTargetParts !== neverType ? getIterationTypeOfIterable(13 /* ForOf */, 0 /* Yield */, nonTupleOrArrayLikeTargetParts, 
                /*errorNode*/
                void 0) : void 0;
                let reportedError = false;
                for (let status = iterator.next(); !status.done; status = iterator.next()) {
                    const { errorNode: prop, innerExpression: next, nameType, errorMessage } = status.value;
                    let targetPropType = iterationType;
                    const targetIndexedPropType = tupleOrArrayLikeTargetParts !== neverType ? getBestMatchIndexedAccessTypeOrUndefined(source, tupleOrArrayLikeTargetParts, nameType) : void 0;
                    if (targetIndexedPropType && !(targetIndexedPropType.flags & 8388608 /* IndexedAccess */)) {
                        targetPropType = iterationType ? getUnionType([iterationType, targetIndexedPropType]) : targetIndexedPropType;
                    }
                    if (!targetPropType)
                        continue;
                    let sourcePropType = getIndexedAccessTypeOrUndefined(source, nameType);
                    if (!sourcePropType)
                        continue;
                    const propName = getPropertyNameFromIndex(nameType, 
                    /*accessNode*/
                    void 0);
                    if (!checkTypeRelatedTo(sourcePropType, targetPropType, relation, 
                    /*errorNode*/
                    void 0)) {
                        const elaborated = next && elaborateError(next, sourcePropType, targetPropType, relation, 
                        /*headMessage*/
                        void 0, containingMessageChain, errorOutputContainer);
                        reportedError = true;
                        if (!elaborated) {
                            const resultObj = errorOutputContainer || {};
                            const specificSource = next ? checkExpressionForMutableLocationWithContextualType(next, sourcePropType) : sourcePropType;
                            if (exactOptionalPropertyTypes && isExactOptionalPropertyMismatch(specificSource, targetPropType)) {
                                const diag2 = createDiagnosticForNode(prop, Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_type_of_the_target, typeToString(specificSource), typeToString(targetPropType));
                                diagnostics.add(diag2);
                                resultObj.errors = [diag2];
                            }
                            else {
                                const targetIsOptional = !!(propName && (getPropertyOfType(tupleOrArrayLikeTargetParts, propName) || unknownSymbol).flags & 16777216 /* Optional */);
                                const sourceIsOptional = !!(propName && (getPropertyOfType(source, propName) || unknownSymbol).flags & 16777216 /* Optional */);
                                targetPropType = removeMissingType(targetPropType, targetIsOptional);
                                sourcePropType = removeMissingType(sourcePropType, targetIsOptional && sourceIsOptional);
                                const result = checkTypeRelatedTo(specificSource, targetPropType, relation, prop, errorMessage, containingMessageChain, resultObj);
                                if (result && specificSource !== sourcePropType) {
                                    checkTypeRelatedTo(sourcePropType, targetPropType, relation, prop, errorMessage, containingMessageChain, resultObj);
                                }
                            }
                        }
                    }
                }
                return reportedError;
            }
            function elaborateJsxComponents(node, source, target, relation, containingMessageChain, errorOutputContainer) {
            function elaborateArrayLiteral(node, source, target, relation, containingMessageChain, errorOutputContainer) {
            function elaborateObjectLiteral(node, source, target, relation, containingMessageChain, errorOutputContainer) {
            function compareSignaturesRelated(source, target, checkMode, reportErrors2, errorReporter, incompatibleErrorReporter, compareTypes, reportUnreliableMarkers) {
                if (source === target) {
                    return -1 /* True */;
                }
                if (!(checkMode & 16 /* StrictTopSignature */ && isTopSignature(source)) && isTopSignature(target)) {
                    return -1 /* True */;
                }
                if (checkMode & 16 /* StrictTopSignature */ && isTopSignature(source) && !isTopSignature(target)) {
                    return 0 /* False */;
                }
                const targetCount = getParameterCount(target);
                const sourceHasMoreParameters = !hasEffectiveRestParameter(target) && (checkMode & 8 /* StrictArity */ ? hasEffectiveRestParameter(source) || getParameterCount(source) > targetCount : getMinArgumentCount(source) > targetCount);
                if (sourceHasMoreParameters) {
                    return 0 /* False */;
                }
                if (source.typeParameters && source.typeParameters !== target.typeParameters) {
                    target = getCanonicalSignature(target);
                    source = instantiateSignatureInContextOf(source, target, 
                    /*inferenceContext*/
                    void 0, compareTypes);
                }
                const sourceCount = getParameterCount(source);
                const sourceRestType = getNonArrayRestType(source);
                const targetRestType = getNonArrayRestType(target);
                if (sourceRestType || targetRestType) {
                    void instantiateType(sourceRestType || targetRestType, reportUnreliableMarkers);
                }
                const kind = target.declaration ? target.declaration.kind : 0 /* Unknown */;
                const strictVariance = !(checkMode & 3 /* Callback */) && strictFunctionTypes && kind !== 171 /* MethodDeclaration */ && kind !== 170 /* MethodSignature */ && kind !== 173 /* Constructor */;
                let result = -1 /* True */;
                const sourceThisType = getThisTypeOfSignature(source);
                if (sourceThisType && sourceThisType !== voidType) {
                    const targetThisType = getThisTypeOfSignature(target);
                    if (targetThisType) {
                        const related = !strictVariance && compareTypes(sourceThisType, targetThisType, 
                        /*reportErrors*/
                        false) || compareTypes(targetThisType, sourceThisType, reportErrors2);
                        if (!related) {
                            if (reportErrors2) {
                                errorReporter(Diagnostics.The_this_types_of_each_signature_are_incompatible);
                            }
                            return 0 /* False */;
                        }
                        result &= related;
                    }
                }
                const paramCount = sourceRestType || targetRestType ? Math.min(sourceCount, targetCount) : Math.max(sourceCount, targetCount);
                const restIndex = sourceRestType || targetRestType ? paramCount - 1 : -1;
                for (let i = 0; i < paramCount; i++) {
                    const sourceType = i === restIndex ? getRestTypeAtPosition(source, i) : tryGetTypeAtPosition(source, i);
                    const targetType = i === restIndex ? getRestTypeAtPosition(target, i) : tryGetTypeAtPosition(target, i);
                    if (sourceType && targetType) {
                        const sourceSig = checkMode & 3 /* Callback */ ? void 0 : getSingleCallSignature(getNonNullableType(sourceType));
                        const targetSig = checkMode & 3 /* Callback */ ? void 0 : getSingleCallSignature(getNonNullableType(targetType));
                        const callbacks = sourceSig && targetSig && !getTypePredicateOfSignature(sourceSig) && !getTypePredicateOfSignature(targetSig) && (getTypeFacts(sourceType) & 50331648 /* IsUndefinedOrNull */) === (getTypeFacts(targetType) & 50331648 /* IsUndefinedOrNull */);
                        let related = callbacks ? compareSignaturesRelated(targetSig, sourceSig, checkMode & 8 /* StrictArity */ | (strictVariance ? 2 /* StrictCallback */ : 1 /* BivariantCallback */), reportErrors2, errorReporter, incompatibleErrorReporter, compareTypes, reportUnreliableMarkers) : !(checkMode & 3 /* Callback */) && !strictVariance && compareTypes(sourceType, targetType, 
                        /*reportErrors*/
                        false) || compareTypes(targetType, sourceType, reportErrors2);
                        if (related && checkMode & 8 /* StrictArity */ && i >= getMinArgumentCount(source) && i < getMinArgumentCount(target) && compareTypes(sourceType, targetType, 
                        /*reportErrors*/
                        false)) {
                            related = 0 /* False */;
                        }
                        if (!related) {
                            if (reportErrors2) {
                                errorReporter(Diagnostics.Types_of_parameters_0_and_1_are_incompatible, unescapeLeadingUnderscores(getParameterNameAtPosition(source, i)), unescapeLeadingUnderscores(getParameterNameAtPosition(target, i)));
                            }
                            return 0 /* False */;
                        }
                        result &= related;
                    }
                }
                if (!(checkMode & 4 /* IgnoreReturnTypes */)) {
                    const targetReturnType = isResolvingReturnTypeOfSignature(target) ? anyType : target.declaration && isJSConstructor(target.declaration) ? getDeclaredTypeOfClassOrInterface(getMergedSymbol(target.declaration.symbol)) : getReturnTypeOfSignature(target);
                    if (targetReturnType === voidType || targetReturnType === anyType) {
                        return result;
                    }
                    const sourceReturnType = isResolvingReturnTypeOfSignature(source) ? anyType : source.declaration && isJSConstructor(source.declaration) ? getDeclaredTypeOfClassOrInterface(getMergedSymbol(source.declaration.symbol)) : getReturnTypeOfSignature(source);
                    const targetTypePredicate = getTypePredicateOfSignature(target);
                    if (targetTypePredicate) {
                        const sourceTypePredicate = getTypePredicateOfSignature(source);
                        if (sourceTypePredicate) {
                            result &= compareTypePredicateRelatedTo(sourceTypePredicate, targetTypePredicate, reportErrors2, errorReporter, compareTypes);
                        }
                        else if (isIdentifierTypePredicate(targetTypePredicate)) {
                            if (reportErrors2) {
                                errorReporter(Diagnostics.Signature_0_must_be_a_type_predicate, signatureToString(source));
                            }
                            return 0 /* False */;
                        }
                    }
                    else {
                        result &= checkMode & 1 /* BivariantCallback */ && compareTypes(targetReturnType, sourceReturnType, 
                        /*reportErrors*/
                        false) || compareTypes(sourceReturnType, targetReturnType, reportErrors2);
                        if (!result && reportErrors2 && incompatibleErrorReporter) {
                            incompatibleErrorReporter(sourceReturnType, targetReturnType);
                        }
                    }
                }
                return result;
            }
            function isSimpleTypeRelatedTo(source, target, relation, errorReporter) {
                const s = source.flags;
                const t = target.flags;
                if (t & 1 /* Any */ || s & 131072 /* Never */ || source === wildcardType)
                    return true;
                if (t & 2 /* Unknown */ && !(relation === strictSubtypeRelation && s & 1 /* Any */))
                    return true;
                if (t & 131072 /* Never */)
                    return false;
                if (s & 402653316 /* StringLike */ && t & 4 /* String */)
                    return true;
                if (s & 128 /* StringLiteral */ && s & 1024 /* EnumLiteral */ && t & 128 /* StringLiteral */ && !(t & 1024 /* EnumLiteral */) && source.value === target.value)
                    return true;
                if (s & 296 /* NumberLike */ && t & 8 /* Number */)
                    return true;
                if (s & 256 /* NumberLiteral */ && s & 1024 /* EnumLiteral */ && t & 256 /* NumberLiteral */ && !(t & 1024 /* EnumLiteral */) && source.value === target.value)
                    return true;
                if (s & 2112 /* BigIntLike */ && t & 64 /* BigInt */)
                    return true;
                if (s & 528 /* BooleanLike */ && t & 16 /* Boolean */)
                    return true;
                if (s & 12288 /* ESSymbolLike */ && t & 4096 /* ESSymbol */)
                    return true;
                if (s & 32 /* Enum */ && t & 32 /* Enum */ && source.symbol.escapedName === target.symbol.escapedName && isEnumTypeRelatedTo(source.symbol, target.symbol, errorReporter))
                    return true;
                if (s & 1024 /* EnumLiteral */ && t & 1024 /* EnumLiteral */) {
                    if (s & 1048576 /* Union */ && t & 1048576 /* Union */ && isEnumTypeRelatedTo(source.symbol, target.symbol, errorReporter))
                        return true;
                    if (s & 2944 /* Literal */ && t & 2944 /* Literal */ && source.value === target.value && isEnumTypeRelatedTo(source.symbol, target.symbol, errorReporter))
                        return true;
                }
                if (s & 32768 /* Undefined */ && (!strictNullChecks && !(t & 3145728 /* UnionOrIntersection */) || t & (32768 /* Undefined */ | 16384 /* Void */)))
                    return true;
                if (s & 65536 /* Null */ && (!strictNullChecks && !(t & 3145728 /* UnionOrIntersection */) || t & 65536 /* Null */))
                    return true;
                if (s & 524288 /* Object */ && t & 67108864 /* NonPrimitive */ && !(relation === strictSubtypeRelation && isEmptyAnonymousObjectType(source) && !(getObjectFlags(source) & 8192 /* FreshLiteral */)))
                    return true;
                if (relation === assignableRelation || relation === comparableRelation) {
                    if (s & 1 /* Any */)
                        return true;
                    if (s & 8 /* Number */ && (t & 32 /* Enum */ || t & 256 /* NumberLiteral */ && t & 1024 /* EnumLiteral */))
                        return true;
                    if (s & 256 /* NumberLiteral */ && !(s & 1024 /* EnumLiteral */) && (t & 32 /* Enum */ || t & 256 /* NumberLiteral */ && t & 1024 /* EnumLiteral */ && source.value === target.value))
                        return true;
                    if (isUnknownLikeUnionType(target))
                        return true;
                }
                return false;
            }
            function checkTypeRelatedTo(source, target, relation, errorNode, headMessage, containingMessageChain, errorOutputContainer) {
                var _a2;
                let errorInfo;
                let relatedInfo;
                let maybeKeys;
                let sourceStack;
                let targetStack;
                let maybeCount = 0;
                let sourceDepth = 0;
                let targetDepth = 0;
                let expandingFlags = 0 /* None */;
                let overflow = false;
                let overrideNextErrorInfo = 0;
                let lastSkippedInfo;
                let incompatibleStack;
                Debug.assert(relation !== identityRelation || !errorNode, "no error reporting in identity checking");
                const result = isRelatedTo(source, target, 3 /* Both */, 
                /*reportErrors*/
                !!errorNode, headMessage);
                if (incompatibleStack) {
                    reportIncompatibleStack();
                }
                if (overflow) {
                    (_a2 = tracing) == null ? void 0 : _a2.instant(tracing.Phase.CheckTypes, "checkTypeRelatedTo_DepthLimit", { sourceId: source.id, targetId: target.id, depth: sourceDepth, targetDepth });
                    const diag2 = error(errorNode || currentNode, Diagnostics.Excessive_stack_depth_comparing_types_0_and_1, typeToString(source), typeToString(target));
                    if (errorOutputContainer) {
                        (errorOutputContainer.errors || (errorOutputContainer.errors = [])).push(diag2);
                    }
                }
                else if (errorInfo) {
                    if (containingMessageChain) {
                        const chain = containingMessageChain();
                        if (chain) {
                            concatenateDiagnosticMessageChains(chain, errorInfo);
                            errorInfo = chain;
                        }
                    }
                    let relatedInformation;
                    if (headMessage && errorNode && !result && source.symbol) {
                        const links = getSymbolLinks(source.symbol);
                        if (links.originatingImport && !isImportCall(links.originatingImport)) {
                            const helpfulRetry = checkTypeRelatedTo(getTypeOfSymbol(links.target), target, relation, 
                            /*errorNode*/
                            void 0);
                            if (helpfulRetry) {
                                const diag3 = createDiagnosticForNode(links.originatingImport, Diagnostics.Type_originates_at_this_import_A_namespace_style_import_cannot_be_called_or_constructed_and_will_cause_a_failure_at_runtime_Consider_using_a_default_import_or_import_require_here_instead);
                                relatedInformation = append(relatedInformation, diag3);
                            }
                        }
                    }
                    const diag2 = createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(errorNode), errorNode, errorInfo, relatedInformation);
                    if (relatedInfo) {
                        addRelatedInfo(diag2, ...relatedInfo);
                    }
                    if (errorOutputContainer) {
                        (errorOutputContainer.errors || (errorOutputContainer.errors = [])).push(diag2);
                    }
                    if (!errorOutputContainer || !errorOutputContainer.skipLogging) {
                        diagnostics.add(diag2);
                    }
                }
                if (errorNode && errorOutputContainer && errorOutputContainer.skipLogging && result === 0 /* False */) {
                    Debug.assert(!!errorOutputContainer.errors, "missed opportunity to interact with error.");
                }
                return result !== 0 /* False */;
                function resetErrorInfo(saved) {
                    errorInfo = saved.errorInfo;
                    lastSkippedInfo = saved.lastSkippedInfo;
                    incompatibleStack = saved.incompatibleStack;
                    overrideNextErrorInfo = saved.overrideNextErrorInfo;
                    relatedInfo = saved.relatedInfo;
                }
                function captureErrorCalculationState() {
                    return {
                        errorInfo,
                        lastSkippedInfo,
                        incompatibleStack: incompatibleStack == null ? void 0 : incompatibleStack.slice(),
                        overrideNextErrorInfo,
                        relatedInfo: relatedInfo == null ? void 0 : relatedInfo.slice()
                    };
                }
                function reportIncompatibleError(message, arg0, arg1, arg2, arg3) {
                    overrideNextErrorInfo++;
                    lastSkippedInfo = void 0;
                    (incompatibleStack || (incompatibleStack = [])).push([message, arg0, arg1, arg2, arg3]);
                }
                function reportIncompatibleStack() {
                    const stack = incompatibleStack || [];
                    incompatibleStack = void 0;
                    const info = lastSkippedInfo;
                    lastSkippedInfo = void 0;
                    if (stack.length === 1) {
                        reportError(...stack[0]);
                        if (info) {
                            reportRelationError(
                            /*headMessage*/
                            void 0, ...info);
                        }
                        return;
                    }
                    let path = "";
                    const secondaryRootErrors = [];
                    while (stack.length) {
                        const [msg, ...args] = stack.pop();
                        switch (msg.code) {
                            case Diagnostics.Types_of_property_0_are_incompatible.code: {
                                if (path.indexOf("new ") === 0) {
                                    path = `(${path})`;
                                }
                                const str = "" + args[0];
                                if (path.length === 0) {
                                    path = `${str}`;
                                }
                                else if (isIdentifierText(str, getEmitScriptTarget(compilerOptions))) {
                                    path = `${path}.${str}`;
                                }
                                else if (str[0] === "[" && str[str.length - 1] === "]") {
                                    path = `${path}${str}`;
                                }
                                else {
                                    path = `${path}[${str}]`;
                                }
                                break;
                            }
                            case Diagnostics.Call_signature_return_types_0_and_1_are_incompatible.code:
                            case Diagnostics.Construct_signature_return_types_0_and_1_are_incompatible.code:
                            case Diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code:
                            case Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code: {
                                if (path.length === 0) {
                                    let mappedMsg = msg;
                                    if (msg.code === Diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code) {
                                        mappedMsg = Diagnostics.Call_signature_return_types_0_and_1_are_incompatible;
                                    }
                                    else if (msg.code === Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code) {
                                        mappedMsg = Diagnostics.Construct_signature_return_types_0_and_1_are_incompatible;
                                    }
                                    secondaryRootErrors.unshift([mappedMsg, args[0], args[1]]);
                                }
                                else {
                                    const prefix = msg.code === Diagnostics.Construct_signature_return_types_0_and_1_are_incompatible.code || msg.code === Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code ? "new " : "";
                                    const params = msg.code === Diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code || msg.code === Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code ? "" : "...";
                                    path = `${prefix}${path}(${params})`;
                                }
                                break;
                            }
                            case Diagnostics.Type_at_position_0_in_source_is_not_compatible_with_type_at_position_1_in_target.code: {
                                secondaryRootErrors.unshift([Diagnostics.Type_at_position_0_in_source_is_not_compatible_with_type_at_position_1_in_target, args[0], args[1]]);
                                break;
                            }
                            case Diagnostics.Type_at_positions_0_through_1_in_source_is_not_compatible_with_type_at_position_2_in_target.code: {
                                secondaryRootErrors.unshift([Diagnostics.Type_at_positions_0_through_1_in_source_is_not_compatible_with_type_at_position_2_in_target, args[0], args[1], args[2]]);
                                break;
                            }
                            default:
                                return Debug.fail(`Unhandled Diagnostic: ${msg.code}`);
                        }
                    }
                    if (path) {
                        reportError(path[path.length - 1] === ")" ? Diagnostics.The_types_returned_by_0_are_incompatible_between_these_types : Diagnostics.The_types_of_0_are_incompatible_between_these_types, path);
                    }
                    else {
                        secondaryRootErrors.shift();
                    }
                    for (const [msg, ...args] of secondaryRootErrors) {
                        const originalValue = msg.elidedInCompatabilityPyramid;
                        msg.elidedInCompatabilityPyramid = false;
                        reportError(msg, ...args);
                        msg.elidedInCompatabilityPyramid = originalValue;
                    }
                    if (info) {
                        reportRelationError(
                        /*headMessage*/
                        void 0, ...info);
                    }
                }
                function reportError(message, arg0, arg1, arg2, arg3) {
                    Debug.assert(!!errorNode);
                    if (incompatibleStack)
                        reportIncompatibleStack();
                    if (message.elidedInCompatabilityPyramid)
                        return;
                    errorInfo = chainDiagnosticMessages(errorInfo, message, arg0, arg1, arg2, arg3);
                }
                function associateRelatedInfo(info) {
                    Debug.assert(!!errorInfo);
                    if (!relatedInfo) {
                        relatedInfo = [info];
                    }
                    else {
                        relatedInfo.push(info);
                    }
                }
                function reportRelationError(message, source2, target2) {
                    if (incompatibleStack)
                        reportIncompatibleStack();
                    const [sourceType, targetType] = getTypeNamesForErrorDisplay(source2, target2);
                    let generalizedSource = source2;
                    let generalizedSourceType = sourceType;
                    if (isLiteralType(source2) && !typeCouldHaveTopLevelSingletonTypes(target2)) {
                        generalizedSource = getBaseTypeOfLiteralType(source2);
                        Debug.assert(!isTypeAssignableTo(generalizedSource, target2), "generalized source shouldn't be assignable");
                        generalizedSourceType = getTypeNameForErrorDisplay(generalizedSource);
                    }
                    const targetFlags = target2.flags & 8388608 /* IndexedAccess */ && !(source2.flags & 8388608 /* IndexedAccess */) ? target2.objectType.flags : target2.flags;
                    if (targetFlags & 262144 /* TypeParameter */ && target2 !== markerSuperTypeForCheck && target2 !== markerSubTypeForCheck) {
                        const constraint = getBaseConstraintOfType(target2);
                        let needsOriginalSource;
                        if (constraint && (isTypeAssignableTo(generalizedSource, constraint) || (needsOriginalSource = isTypeAssignableTo(source2, constraint)))) {
                            reportError(Diagnostics._0_is_assignable_to_the_constraint_of_type_1_but_1_could_be_instantiated_with_a_different_subtype_of_constraint_2, needsOriginalSource ? sourceType : generalizedSourceType, targetType, typeToString(constraint));
                        }
                        else {
                            errorInfo = void 0;
                            reportError(Diagnostics._0_could_be_instantiated_with_an_arbitrary_type_which_could_be_unrelated_to_1, targetType, generalizedSourceType);
                        }
                    }
                    if (!message) {
                        if (relation === comparableRelation) {
                            message = Diagnostics.Type_0_is_not_comparable_to_type_1;
                        }
                        else if (sourceType === targetType) {
                            message = Diagnostics.Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated;
                        }
                        else if (exactOptionalPropertyTypes && getExactOptionalUnassignableProperties(source2, target2).length) {
                            message = Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties;
                        }
                        else {
                            if (source2.flags & 128 /* StringLiteral */ && target2.flags & 1048576 /* Union */) {
                                const suggestedType = getSuggestedTypeForNonexistentStringLiteralType(source2, target2);
                                if (suggestedType) {
                                    reportError(Diagnostics.Type_0_is_not_assignable_to_type_1_Did_you_mean_2, generalizedSourceType, targetType, typeToString(suggestedType));
                                    return;
                                }
                            }
                            message = Diagnostics.Type_0_is_not_assignable_to_type_1;
                        }
                    }
                    else if (message === Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1 && exactOptionalPropertyTypes && getExactOptionalUnassignableProperties(source2, target2).length) {
                        message = Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties;
                    }
                    reportError(message, generalizedSourceType, targetType);
                }
                function tryElaborateErrorsForPrimitivesAndObjects(source2, target2) {
                    const sourceType = symbolValueDeclarationIsContextSensitive(source2.symbol) ? typeToString(source2, source2.symbol.valueDeclaration) : typeToString(source2);
                    const targetType = symbolValueDeclarationIsContextSensitive(target2.symbol) ? typeToString(target2, target2.symbol.valueDeclaration) : typeToString(target2);
                    if (globalStringType === source2 && stringType === target2 || globalNumberType === source2 && numberType === target2 || globalBooleanType === source2 && booleanType === target2 || getGlobalESSymbolType() === source2 && esSymbolType === target2) {
                        reportError(Diagnostics._0_is_a_primitive_but_1_is_a_wrapper_object_Prefer_using_0_when_possible, targetType, sourceType);
                    }
                }
                function tryElaborateArrayLikeErrors(source2, target2, reportErrors2) {
                    if (isTupleType(source2)) {
                        if (source2.target.readonly && isMutableArrayOrTuple(target2)) {
                            if (reportErrors2) {
                                reportError(Diagnostics.The_type_0_is_readonly_and_cannot_be_assigned_to_the_mutable_type_1, typeToString(source2), typeToString(target2));
                            }
                            return false;
                        }
                        return isArrayOrTupleType(target2);
                    }
                    if (isReadonlyArrayType(source2) && isMutableArrayOrTuple(target2)) {
                        if (reportErrors2) {
                            reportError(Diagnostics.The_type_0_is_readonly_and_cannot_be_assigned_to_the_mutable_type_1, typeToString(source2), typeToString(target2));
                        }
                        return false;
                    }
                    if (isTupleType(target2)) {
                        return isArrayType(source2);
                    }
                    return true;
                }
                function isRelatedToWorker(source2, target2, reportErrors2) {
                    return isRelatedTo(source2, target2, 3 /* Both */, reportErrors2);
                }
                function isRelatedTo(originalSource, originalTarget, recursionFlags = 3 /* Both */, reportErrors2 = false, headMessage2, intersectionState = 0 /* None */) {
                    if (originalSource.flags & 524288 /* Object */ && originalTarget.flags & 134348796 /* Primitive */) {
                        if (relation === comparableRelation && !(originalTarget.flags & 131072 /* Never */) && isSimpleTypeRelatedTo(originalTarget, originalSource, relation) || isSimpleTypeRelatedTo(originalSource, originalTarget, relation, reportErrors2 ? reportError : void 0)) {
                            return -1 /* True */;
                        }
                        if (reportErrors2) {
                            reportErrorResults(originalSource, originalTarget, originalSource, originalTarget, headMessage2);
                        }
                        return 0 /* False */;
                    }
                    const source2 = getNormalizedType(originalSource, 
                    /*writing*/
                    false);
                    let target2 = getNormalizedType(originalTarget, 
                    /*writing*/
                    true);
                    if (source2 === target2)
                        return -1 /* True */;
                    if (relation === identityRelation) {
                        if (source2.flags !== target2.flags)
                            return 0 /* False */;
                        if (source2.flags & 67358815 /* Singleton */)
                            return -1 /* True */;
                        traceUnionsOrIntersectionsTooLarge(source2, target2);
                        return recursiveTypeRelatedTo(source2, target2, 
                        /*reportErrors*/
                        false, 0 /* None */, recursionFlags);
                    }
                    if (source2.flags & 262144 /* TypeParameter */ && getConstraintOfType(source2) === target2) {
                        return -1 /* True */;
                    }
                    if (source2.flags & 470302716 /* DefinitelyNonNullable */ && target2.flags & 1048576 /* Union */) {
                        const types = target2.types;
                        const candidate = types.length === 2 && types[0].flags & 98304 /* Nullable */ ? types[1] : types.length === 3 && types[0].flags & 98304 /* Nullable */ && types[1].flags & 98304 /* Nullable */ ? types[2] : void 0;
                        if (candidate && !(candidate.flags & 98304 /* Nullable */)) {
                            target2 = getNormalizedType(candidate, 
                            /*writing*/
                            true);
                            if (source2 === target2)
                                return -1 /* True */;
                        }
                    }
                    if (relation === comparableRelation && !(target2.flags & 131072 /* Never */) && isSimpleTypeRelatedTo(target2, source2, relation) || isSimpleTypeRelatedTo(source2, target2, relation, reportErrors2 ? reportError : void 0))
                        return -1 /* True */;
                    if (source2.flags & 469499904 /* StructuredOrInstantiable */ || target2.flags & 469499904 /* StructuredOrInstantiable */) {
                        const isPerformingExcessPropertyChecks = !(intersectionState & 2 /* Target */) && (isObjectLiteralType2(source2) && getObjectFlags(source2) & 8192 /* FreshLiteral */);
                        if (isPerformingExcessPropertyChecks) {
                            if (hasExcessProperties(source2, target2, reportErrors2)) {
                                if (reportErrors2) {
                                    reportRelationError(headMessage2, source2, originalTarget.aliasSymbol ? originalTarget : target2);
                                }
                                return 0 /* False */;
                            }
                        }
                        const isPerformingCommonPropertyChecks = (relation !== comparableRelation || isUnitType(source2)) && !(intersectionState & 2 /* Target */) && source2.flags & (134348796 /* Primitive */ | 524288 /* Object */ | 2097152 /* Intersection */) && source2 !== globalObjectType && target2.flags & (524288 /* Object */ | 2097152 /* Intersection */) && isWeakType(target2) && (getPropertiesOfType(source2).length > 0 || typeHasCallOrConstructSignatures(source2));
                        const isComparingJsxAttributes = !!(getObjectFlags(source2) & 2048 /* JsxAttributes */);
                        if (isPerformingCommonPropertyChecks && !hasCommonProperties(source2, target2, isComparingJsxAttributes)) {
                            if (reportErrors2) {
                                const sourceString = typeToString(originalSource.aliasSymbol ? originalSource : source2);
                                const targetString = typeToString(originalTarget.aliasSymbol ? originalTarget : target2);
                                const calls = getSignaturesOfType(source2, 0 /* Call */);
                                const constructs = getSignaturesOfType(source2, 1 /* Construct */);
                                if (calls.length > 0 && isRelatedTo(getReturnTypeOfSignature(calls[0]), target2, 1 /* Source */, 
                                /*reportErrors*/
                                false) || constructs.length > 0 && isRelatedTo(getReturnTypeOfSignature(constructs[0]), target2, 1 /* Source */, 
                                /*reportErrors*/
                                false)) {
                                    reportError(Diagnostics.Value_of_type_0_has_no_properties_in_common_with_type_1_Did_you_mean_to_call_it, sourceString, targetString);
                                }
                                else {
                                    reportError(Diagnostics.Type_0_has_no_properties_in_common_with_type_1, sourceString, targetString);
                                }
                            }
                            return 0 /* False */;
                        }
                        traceUnionsOrIntersectionsTooLarge(source2, target2);
                        const skipCaching = source2.flags & 1048576 /* Union */ && source2.types.length < 4 && !(target2.flags & 1048576 /* Union */) || target2.flags & 1048576 /* Union */ && target2.types.length < 4 && !(source2.flags & 469499904 /* StructuredOrInstantiable */);
                        const result2 = skipCaching ? unionOrIntersectionRelatedTo(source2, target2, reportErrors2, intersectionState) : recursiveTypeRelatedTo(source2, target2, reportErrors2, intersectionState, recursionFlags);
                        if (result2) {
                            return result2;
                        }
                    }
                    if (reportErrors2) {
                        reportErrorResults(originalSource, originalTarget, source2, target2, headMessage2);
                    }
                    return 0 /* False */;
                }
                function reportErrorResults(originalSource, originalTarget, source2, target2, headMessage2) {
                    var _a3, _b;
                    const sourceHasBase = !!getSingleBaseForNonAugmentingSubtype(originalSource);
                    const targetHasBase = !!getSingleBaseForNonAugmentingSubtype(originalTarget);
                    source2 = originalSource.aliasSymbol || sourceHasBase ? originalSource : source2;
                    target2 = originalTarget.aliasSymbol || targetHasBase ? originalTarget : target2;
                    let maybeSuppress = overrideNextErrorInfo > 0;
                    if (maybeSuppress) {
                        overrideNextErrorInfo--;
                    }
                    if (source2.flags & 524288 /* Object */ && target2.flags & 524288 /* Object */) {
                        const currentError = errorInfo;
                        tryElaborateArrayLikeErrors(source2, target2, 
                        /*reportErrors*/
                        true);
                        if (errorInfo !== currentError) {
                            maybeSuppress = !!errorInfo;
                        }
                    }
                    if (source2.flags & 524288 /* Object */ && target2.flags & 134348796 /* Primitive */) {
                        tryElaborateErrorsForPrimitivesAndObjects(source2, target2);
                    }
                    else if (source2.symbol && source2.flags & 524288 /* Object */ && globalObjectType === source2) {
                        reportError(Diagnostics.The_Object_type_is_assignable_to_very_few_other_types_Did_you_mean_to_use_the_any_type_instead);
                    }
                    else if (getObjectFlags(source2) & 2048 /* JsxAttributes */ && target2.flags & 2097152 /* Intersection */) {
                        const targetTypes = target2.types;
                        const intrinsicAttributes = getJsxType(JsxNames.IntrinsicAttributes, errorNode);
                        const intrinsicClassAttributes = getJsxType(JsxNames.IntrinsicClassAttributes, errorNode);
                        if (!isErrorType(intrinsicAttributes) && !isErrorType(intrinsicClassAttributes) && (contains(targetTypes, intrinsicAttributes) || contains(targetTypes, intrinsicClassAttributes))) {
                            return;
                        }
                    }
                    else {
                        errorInfo = elaborateNeverIntersection(errorInfo, originalTarget);
                    }
                    if (!headMessage2 && maybeSuppress) {
                        lastSkippedInfo = [source2, target2];
                        return;
                    }
                    reportRelationError(headMessage2, source2, target2);
                    if (source2.flags & 262144 /* TypeParameter */ && ((_b = (_a3 = source2.symbol) == null ? void 0 : _a3.declarations) == null ? void 0 : _b[0]) && !getConstraintOfType(source2)) {
                        const syntheticParam = cloneTypeParameter(source2);
                        syntheticParam.constraint = instantiateType(target2, makeUnaryTypeMapper(source2, syntheticParam));
                        if (hasNonCircularBaseConstraint(syntheticParam)) {
                            const targetConstraintString = typeToString(target2, source2.symbol.declarations[0]);
                            associateRelatedInfo(createDiagnosticForNode(source2.symbol.declarations[0], Diagnostics.This_type_parameter_might_need_an_extends_0_constraint, targetConstraintString));
                        }
                    }
                }
                function traceUnionsOrIntersectionsTooLarge(source2, target2) {
                    if (!tracing) {
                        return;
                    }
                    if (source2.flags & 3145728 /* UnionOrIntersection */ && target2.flags & 3145728 /* UnionOrIntersection */) {
                        const sourceUnionOrIntersection = source2;
                        const targetUnionOrIntersection = target2;
                        if (sourceUnionOrIntersection.objectFlags & targetUnionOrIntersection.objectFlags & 32768 /* PrimitiveUnion */) {
                            return;
                        }
                        const sourceSize = sourceUnionOrIntersection.types.length;
                        const targetSize = targetUnionOrIntersection.types.length;
                        if (sourceSize * targetSize > 1e6) {
                            tracing.instant(tracing.Phase.CheckTypes, "traceUnionsOrIntersectionsTooLarge_DepthLimit", {
                                sourceId: source2.id,
                                sourceSize,
                                targetId: target2.id,
                                targetSize,
                                pos: errorNode == null ? void 0 : errorNode.pos,
                                end: errorNode == null ? void 0 : errorNode.end
                            });
                        }
                    }
                }
                function getTypeOfPropertyInTypes(types, name) {
                    const appendPropType = (propTypes, type) => {
                        var _a3;
                        type = getApparentType(type);
                        const prop = type.flags & 3145728 /* UnionOrIntersection */ ? getPropertyOfUnionOrIntersectionType(type, name) : getPropertyOfObjectType(type, name);
                        const propType = prop && getTypeOfSymbol(prop) || ((_a3 = getApplicableIndexInfoForName(type, name)) == null ? void 0 : _a3.type) || undefinedType;
                        return append(propTypes, propType);
                    };
                    return getUnionType(reduceLeft(types, appendPropType, 
                    /*initial*/
                    void 0) || emptyArray);
                }
                function hasExcessProperties(source2, target2, reportErrors2) {
                    var _a3;
                    if (!isExcessPropertyCheckTarget(target2) || !noImplicitAny && getObjectFlags(target2) & 4096 /* JSLiteral */) {
                        return false;
                    }
                    const isComparingJsxAttributes = !!(getObjectFlags(source2) & 2048 /* JsxAttributes */);
                    if ((relation === assignableRelation || relation === comparableRelation) && (isTypeSubsetOf(globalObjectType, target2) || !isComparingJsxAttributes && isEmptyObjectType(target2))) {
                        return false;
                    }
                    let reducedTarget = target2;
                    let checkTypes;
                    if (target2.flags & 1048576 /* Union */) {
                        reducedTarget = findMatchingDiscriminantType(source2, target2, isRelatedTo) || filterPrimitivesIfContainsNonPrimitive(target2);
                        checkTypes = reducedTarget.flags & 1048576 /* Union */ ? reducedTarget.types : [reducedTarget];
                    }
                    for (const prop of getPropertiesOfType(source2)) {
                        if (shouldCheckAsExcessProperty(prop, source2.symbol) && !isIgnoredJsxProperty(source2, prop)) {
                            if (!isKnownProperty(reducedTarget, prop.escapedName, isComparingJsxAttributes)) {
                                if (reportErrors2) {
                                    const errorTarget = filterType(reducedTarget, isExcessPropertyCheckTarget);
                                    if (!errorNode)
                                        return Debug.fail();
                                    if (isJsxAttributes(errorNode) || isJsxOpeningLikeElement(errorNode) || isJsxOpeningLikeElement(errorNode.parent)) {
                                        if (prop.valueDeclaration && isJsxAttribute(prop.valueDeclaration) && getSourceFileOfNode(errorNode) === getSourceFileOfNode(prop.valueDeclaration.name)) {
                                            errorNode = prop.valueDeclaration.name;
                                        }
                                        const propName = symbolToString(prop);
                                        const suggestionSymbol = getSuggestedSymbolForNonexistentJSXAttribute(propName, errorTarget);
                                        const suggestion = suggestionSymbol ? symbolToString(suggestionSymbol) : void 0;
                                        if (suggestion) {
                                            reportError(Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2, propName, typeToString(errorTarget), suggestion);
                                        }
                                        else {
                                            reportError(Diagnostics.Property_0_does_not_exist_on_type_1, propName, typeToString(errorTarget));
                                        }
                                    }
                                    else {
                                        const objectLiteralDeclaration = ((_a3 = source2.symbol) == null ? void 0 : _a3.declarations) && firstOrUndefined(source2.symbol.declarations);
                                        let suggestion;
                                        if (prop.valueDeclaration && findAncestor(prop.valueDeclaration, (d) => d === objectLiteralDeclaration) && getSourceFileOfNode(objectLiteralDeclaration) === getSourceFileOfNode(errorNode)) {
                                            const propDeclaration = prop.valueDeclaration;
                                            Debug.assertNode(propDeclaration, isObjectLiteralElementLike);
                                            errorNode = propDeclaration;
                                            const name = propDeclaration.name;
                                            if (isIdentifier(name)) {
                                                suggestion = getSuggestionForNonexistentProperty(name, errorTarget);
                                            }
                                        }
                                        if (suggestion !== void 0) {
                                            reportError(Diagnostics.Object_literal_may_only_specify_known_properties_but_0_does_not_exist_in_type_1_Did_you_mean_to_write_2, symbolToString(prop), typeToString(errorTarget), suggestion);
                                        }
                                        else {
                                            reportError(Diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1, symbolToString(prop), typeToString(errorTarget));
                                        }
                                    }
                                }
                                return true;
                            }
                            if (checkTypes && !isRelatedTo(getTypeOfSymbol(prop), getTypeOfPropertyInTypes(checkTypes, prop.escapedName), 3 /* Both */, reportErrors2)) {
                                if (reportErrors2) {
                                    reportIncompatibleError(Diagnostics.Types_of_property_0_are_incompatible, symbolToString(prop));
                                }
                                return true;
                            }
                        }
                    }
                    return false;
                }
                function shouldCheckAsExcessProperty(prop, container) {
                    return prop.valueDeclaration && container.valueDeclaration && prop.valueDeclaration.parent === container.valueDeclaration;
                }
                function unionOrIntersectionRelatedTo(source2, target2, reportErrors2, intersectionState) {
                    if (source2.flags & 1048576 /* Union */) {
                        return relation === comparableRelation ? someTypeRelatedToType(source2, target2, reportErrors2 && !(source2.flags & 134348796 /* Primitive */), intersectionState) : eachTypeRelatedToType(source2, target2, reportErrors2 && !(source2.flags & 134348796 /* Primitive */), intersectionState);
                    }
                    if (target2.flags & 1048576 /* Union */) {
                        return typeRelatedToSomeType(getRegularTypeOfObjectLiteral(source2), target2, reportErrors2 && !(source2.flags & 134348796 /* Primitive */) && !(target2.flags & 134348796 /* Primitive */));
                    }
                    if (target2.flags & 2097152 /* Intersection */) {
                        return typeRelatedToEachType(source2, target2, reportErrors2, 2 /* Target */);
                    }
                    if (relation === comparableRelation && target2.flags & 134348796 /* Primitive */) {
                        const constraints = sameMap(source2.types, (t) => t.flags & 465829888 /* Instantiable */ ? getBaseConstraintOfType(t) || unknownType : t);
                        if (constraints !== source2.types) {
                            source2 = getIntersectionType(constraints);
                            if (source2.flags & 131072 /* Never */) {
                                return 0 /* False */;
                            }
                            if (!(source2.flags & 2097152 /* Intersection */)) {
                                return isRelatedTo(source2, target2, 1 /* Source */, 
                                /*reportErrors*/
                                false) || isRelatedTo(target2, source2, 1 /* Source */, 
                                /*reportErrors*/
                                false);
                            }
                        }
                    }
                    return someTypeRelatedToType(source2, target2, 
                    /*reportErrors*/
                    false, 1 /* Source */);
                }
                function eachTypeRelatedToSomeType(source2, target2) {
                    let result2 = -1 /* True */;
                    const sourceTypes = source2.types;
                    for (const sourceType of sourceTypes) {
                        const related = typeRelatedToSomeType(sourceType, target2, 
                        /*reportErrors*/
                        false);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }
                function typeRelatedToSomeType(source2, target2, reportErrors2) {
                    const targetTypes = target2.types;
                    if (target2.flags & 1048576 /* Union */) {
                        if (containsType(targetTypes, source2)) {
                            return -1 /* True */;
                        }
                        const match = getMatchingUnionConstituentForType(target2, source2);
                        if (match) {
                            const related = isRelatedTo(source2, match, 2 /* Target */, 
                            /*reportErrors*/
                            false);
                            if (related) {
                                return related;
                            }
                        }
                    }
                    for (const type of targetTypes) {
                        const related = isRelatedTo(source2, type, 2 /* Target */, 
                        /*reportErrors*/
                        false);
                        if (related) {
                            return related;
                        }
                    }
                    if (reportErrors2) {
                        const bestMatchingType = getBestMatchingType(source2, target2, isRelatedTo);
                        if (bestMatchingType) {
                            isRelatedTo(source2, bestMatchingType, 2 /* Target */, 
                            /*reportErrors*/
                            true);
                        }
                    }
                    return 0 /* False */;
                }
                function typeRelatedToEachType(source2, target2, reportErrors2, intersectionState) {
                    let result2 = -1 /* True */;
                    const targetTypes = target2.types;
                    for (const targetType of targetTypes) {
                        const related = isRelatedTo(source2, targetType, 2 /* Target */, reportErrors2, 
                        /*headMessage*/
                        void 0, intersectionState);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }
                function someTypeRelatedToType(source2, target2, reportErrors2, intersectionState) {
                    const sourceTypes = source2.types;
                    if (source2.flags & 1048576 /* Union */ && containsType(sourceTypes, target2)) {
                        return -1 /* True */;
                    }
                    const len = sourceTypes.length;
                    for (let i = 0; i < len; i++) {
                        const related = isRelatedTo(sourceTypes[i], target2, 1 /* Source */, reportErrors2 && i === len - 1, 
                        /*headMessage*/
                        void 0, intersectionState);
                        if (related) {
                            return related;
                        }
                    }
                    return 0 /* False */;
                }
                function getUndefinedStrippedTargetIfNeeded(source2, target2) {
                    if (source2.flags & 1048576 /* Union */ && target2.flags & 1048576 /* Union */ && !(source2.types[0].flags & 32768 /* Undefined */) && target2.types[0].flags & 32768 /* Undefined */) {
                        return extractTypesOfKind(target2, ~32768 /* Undefined */);
                    }
                    return target2;
                }
                function eachTypeRelatedToType(source2, target2, reportErrors2, intersectionState) {
                    let result2 = -1 /* True */;
                    const sourceTypes = source2.types;
                    const undefinedStrippedTarget = getUndefinedStrippedTargetIfNeeded(source2, target2);
                    for (let i = 0; i < sourceTypes.length; i++) {
                        const sourceType = sourceTypes[i];
                        if (undefinedStrippedTarget.flags & 1048576 /* Union */ && sourceTypes.length >= undefinedStrippedTarget.types.length && sourceTypes.length % undefinedStrippedTarget.types.length === 0) {
                            const related2 = isRelatedTo(sourceType, undefinedStrippedTarget.types[i % undefinedStrippedTarget.types.length], 3 /* Both */, 
                            /*reportErrors*/
                            false, 
                            /*headMessage*/
                            void 0, intersectionState);
                            if (related2) {
                                result2 &= related2;
                                continue;
                            }
                        }
                        const related = isRelatedTo(sourceType, target2, 1 /* Source */, reportErrors2, 
                        /*headMessage*/
                        void 0, intersectionState);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }
                function typeArgumentsRelatedTo(sources = emptyArray, targets = emptyArray, variances = emptyArray, reportErrors2, intersectionState) {
                    if (sources.length !== targets.length && relation === identityRelation) {
                        return 0 /* False */;
                    }
                    const length2 = sources.length <= targets.length ? sources.length : targets.length;
                    let result2 = -1 /* True */;
                    for (let i = 0; i < length2; i++) {
                        const varianceFlags = i < variances.length ? variances[i] : 1 /* Covariant */;
                        const variance = varianceFlags & 7 /* VarianceMask */;
                        if (variance !== 4 /* Independent */) {
                            const s = sources[i];
                            const t = targets[i];
                            let related = -1 /* True */;
                            if (varianceFlags & 8 /* Unmeasurable */) {
                                related = relation === identityRelation ? isRelatedTo(s, t, 3 /* Both */, 
                                /*reportErrors*/
                                false) : compareTypesIdentical(s, t);
                            }
                            else if (variance === 1 /* Covariant */) {
                                related = isRelatedTo(s, t, 3 /* Both */, reportErrors2, 
                                /*headMessage*/
                                void 0, intersectionState);
                            }
                            else if (variance === 2 /* Contravariant */) {
                                related = isRelatedTo(t, s, 3 /* Both */, reportErrors2, 
                                /*headMessage*/
                                void 0, intersectionState);
                            }
                            else if (variance === 3 /* Bivariant */) {
                                related = isRelatedTo(t, s, 3 /* Both */, 
                                /*reportErrors*/
                                false);
                                if (!related) {
                                    related = isRelatedTo(s, t, 3 /* Both */, reportErrors2, 
                                    /*headMessage*/
                                    void 0, intersectionState);
                                }
                            }
                            else {
                                related = isRelatedTo(s, t, 3 /* Both */, reportErrors2, 
                                /*headMessage*/
                                void 0, intersectionState);
                                if (related) {
                                    related &= isRelatedTo(t, s, 3 /* Both */, reportErrors2, 
                                    /*headMessage*/
                                    void 0, intersectionState);
                                }
                            }
                            if (!related) {
                                return 0 /* False */;
                            }
                            result2 &= related;
                        }
                    }
                    return result2;
                }
                function recursiveTypeRelatedTo(source2, target2, reportErrors2, intersectionState, recursionFlags) {
                    var _a3, _b, _c;
                    if (overflow) {
                        return 0 /* False */;
                    }
                    const id = getRelationKey(source2, target2, intersectionState, relation, 
                    /*ingnoreConstraints*/
                    false);
                    const entry = relation.get(id);
                    if (entry !== void 0) {
                        if (reportErrors2 && entry & 2 /* Failed */ && !(entry & 4 /* Reported */)) {
                        }
                        else {
                            if (outofbandVarianceMarkerHandler) {
                                const saved = entry & 24 /* ReportsMask */;
                                if (saved & 8 /* ReportsUnmeasurable */) {
                                    instantiateType(source2, reportUnmeasurableMapper);
                                }
                                if (saved & 16 /* ReportsUnreliable */) {
                                    instantiateType(source2, reportUnreliableMapper);
                                }
                            }
                            return entry & 1 /* Succeeded */ ? -1 /* True */ : 0 /* False */;
                        }
                    }
                    if (!maybeKeys) {
                        maybeKeys = [];
                        sourceStack = [];
                        targetStack = [];
                    }
                    else {
                        const broadestEquivalentId = id.startsWith("*") ? getRelationKey(source2, target2, intersectionState, relation, 
                        /*ignoreConstraints*/
                        true) : void 0;
                        for (let i = 0; i < maybeCount; i++) {
                            if (id === maybeKeys[i] || broadestEquivalentId && broadestEquivalentId === maybeKeys[i]) {
                                return 3 /* Maybe */;
                            }
                        }
                        if (sourceDepth === 100 || targetDepth === 100) {
                            overflow = true;
                            return 0 /* False */;
                        }
                    }
                    const maybeStart = maybeCount;
                    maybeKeys[maybeCount] = id;
                    maybeCount++;
                    const saveExpandingFlags = expandingFlags;
                    if (recursionFlags & 1 /* Source */) {
                        sourceStack[sourceDepth] = source2;
                        sourceDepth++;
                        if (!(expandingFlags & 1 /* Source */) && isDeeplyNestedType(source2, sourceStack, sourceDepth))
                            expandingFlags |= 1 /* Source */;
                    }
                    if (recursionFlags & 2 /* Target */) {
                        targetStack[targetDepth] = target2;
                        targetDepth++;
                        if (!(expandingFlags & 2 /* Target */) && isDeeplyNestedType(target2, targetStack, targetDepth))
                            expandingFlags |= 2 /* Target */;
                    }
                    let originalHandler;
                    let propagatingVarianceFlags = 0;
                    if (outofbandVarianceMarkerHandler) {
                        originalHandler = outofbandVarianceMarkerHandler;
                        outofbandVarianceMarkerHandler = (onlyUnreliable) => {
                            propagatingVarianceFlags |= onlyUnreliable ? 16 /* ReportsUnreliable */ : 8 /* ReportsUnmeasurable */;
                            return originalHandler(onlyUnreliable);
                        };
                    }
                    let result2;
                    if (expandingFlags === 3 /* Both */) {
                        (_a3 = tracing) == null ? void 0 : _a3.instant(tracing.Phase.CheckTypes, "recursiveTypeRelatedTo_DepthLimit", {
                            sourceId: source2.id,
                            sourceIdStack: sourceStack.map((t) => t.id),
                            targetId: target2.id,
                            targetIdStack: targetStack.map((t) => t.id),
                            depth: sourceDepth,
                            targetDepth
                        });
                        result2 = 3 /* Maybe */;
                    }
                    else {
                        (_b = tracing) == null ? void 0 : _b.push(tracing.Phase.CheckTypes, "structuredTypeRelatedTo", { sourceId: source2.id, targetId: target2.id });
                        result2 = structuredTypeRelatedTo(source2, target2, reportErrors2, intersectionState);
                        (_c = tracing) == null ? void 0 : _c.pop();
                    }
                    if (outofbandVarianceMarkerHandler) {
                        outofbandVarianceMarkerHandler = originalHandler;
                    }
                    if (recursionFlags & 1 /* Source */) {
                        sourceDepth--;
                    }
                    if (recursionFlags & 2 /* Target */) {
                        targetDepth--;
                    }
                    expandingFlags = saveExpandingFlags;
                    if (result2) {
                        if (result2 === -1 /* True */ || sourceDepth === 0 && targetDepth === 0) {
                            if (result2 === -1 /* True */ || result2 === 3 /* Maybe */) {
                                for (let i = maybeStart; i < maybeCount; i++) {
                                    relation.set(maybeKeys[i], 1 /* Succeeded */ | propagatingVarianceFlags);
                                }
                            }
                            maybeCount = maybeStart;
                        }
                    }
                    else {
                        relation.set(id, (reportErrors2 ? 4 /* Reported */ : 0) | 2 /* Failed */ | propagatingVarianceFlags);
                        maybeCount = maybeStart;
                    }
                    return result2;
                }
                function structuredTypeRelatedTo(source2, target2, reportErrors2, intersectionState) {
                    const saveErrorInfo = captureErrorCalculationState();
                    let result2 = structuredTypeRelatedToWorker(source2, target2, reportErrors2, intersectionState, saveErrorInfo);
                    if (relation !== identityRelation) {
                        if (!result2 && (source2.flags & 2097152 /* Intersection */ || source2.flags & 262144 /* TypeParameter */ && target2.flags & 1048576 /* Union */)) {
                            const constraint = getEffectiveConstraintOfIntersection(source2.flags & 2097152 /* Intersection */ ? source2.types : [source2], !!(target2.flags & 1048576 /* Union */));
                            if (constraint && everyType(constraint, (c) => c !== source2)) {
                                result2 = isRelatedTo(constraint, target2, 1 /* Source */, 
                                /*reportErrors*/
                                false, 
                                /*headMessage*/
                                void 0, intersectionState);
                            }
                        }
                        if (result2 && !(intersectionState & 2 /* Target */) && target2.flags & 2097152 /* Intersection */ && !isGenericObjectType(target2) && source2.flags & (524288 /* Object */ | 2097152 /* Intersection */)) {
                            result2 &= propertiesRelatedTo(source2, target2, reportErrors2, 
                            /*excludedProperties*/
                            void 0, 
                            /*optionalsOnly*/
                            false, 0 /* None */);
                            if (result2 && isObjectLiteralType2(source2) && getObjectFlags(source2) & 8192 /* FreshLiteral */) {
                                result2 &= indexSignaturesRelatedTo(source2, target2, 
                                /*sourceIsPrimitive*/
                                false, reportErrors2, 0 /* None */);
                            }
                        }
                        else if (result2 && isNonGenericObjectType(target2) && !isArrayOrTupleType(target2) && source2.flags & 2097152 /* Intersection */ && getApparentType(source2).flags & 3670016 /* StructuredType */ && !some(source2.types, (t) => t === target2 || !!(getObjectFlags(t) & 262144 /* NonInferrableType */))) {
                            result2 &= propertiesRelatedTo(source2, target2, reportErrors2, 
                            /*excludedProperties*/
                            void 0, 
                            /*optionalsOnly*/
                            true, intersectionState);
                        }
                    }
                    if (result2) {
                        resetErrorInfo(saveErrorInfo);
                    }
                    return result2;
                }
                function structuredTypeRelatedToWorker(source2, target2, reportErrors2, intersectionState, saveErrorInfo) {
                    let result2;
                    let originalErrorInfo;
                    let varianceCheckFailed = false;
                    let sourceFlags = source2.flags;
                    const targetFlags = target2.flags;
                    if (relation === identityRelation) {
                        if (sourceFlags & 3145728 /* UnionOrIntersection */) {
                            let result3 = eachTypeRelatedToSomeType(source2, target2);
                            if (result3) {
                                result3 &= eachTypeRelatedToSomeType(target2, source2);
                            }
                            return result3;
                        }
                        if (sourceFlags & 4194304 /* Index */) {
                            return isRelatedTo(source2.type, target2.type, 3 /* Both */, 
                            /*reportErrors*/
                            false);
                        }
                        if (sourceFlags & 8388608 /* IndexedAccess */) {
                            if (result2 = isRelatedTo(source2.objectType, target2.objectType, 3 /* Both */, 
                            /*reportErrors*/
                            false)) {
                                if (result2 &= isRelatedTo(source2.indexType, target2.indexType, 3 /* Both */, 
                                /*reportErrors*/
                                false)) {
                                    return result2;
                                }
                            }
                        }
                        if (sourceFlags & 16777216 /* Conditional */) {
                            if (source2.root.isDistributive === target2.root.isDistributive) {
                                if (result2 = isRelatedTo(source2.checkType, target2.checkType, 3 /* Both */, 
                                /*reportErrors*/
                                false)) {
                                    if (result2 &= isRelatedTo(source2.extendsType, target2.extendsType, 3 /* Both */, 
                                    /*reportErrors*/
                                    false)) {
                                        if (result2 &= isRelatedTo(getTrueTypeFromConditionalType(source2), getTrueTypeFromConditionalType(target2), 3 /* Both */, 
                                        /*reportErrors*/
                                        false)) {
                                            if (result2 &= isRelatedTo(getFalseTypeFromConditionalType(source2), getFalseTypeFromConditionalType(target2), 3 /* Both */, 
                                            /*reportErrors*/
                                            false)) {
                                                return result2;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (sourceFlags & 33554432 /* Substitution */) {
                            if (result2 = isRelatedTo(source2.baseType, target2.baseType, 3 /* Both */, 
                            /*reportErrors*/
                            false)) {
                                if (result2 &= isRelatedTo(source2.constraint, target2.constraint, 3 /* Both */, 
                                /*reportErrors*/
                                false)) {
                                    return result2;
                                }
                            }
                        }
                        if (!(sourceFlags & 524288 /* Object */)) {
                            return 0 /* False */;
                        }
                    }
                    else if (sourceFlags & 3145728 /* UnionOrIntersection */ || targetFlags & 3145728 /* UnionOrIntersection */) {
                        if (result2 = unionOrIntersectionRelatedTo(source2, target2, reportErrors2, intersectionState)) {
                            return result2;
                        }
                        if (!(sourceFlags & 465829888 /* Instantiable */ || sourceFlags & 524288 /* Object */ && targetFlags & 1048576 /* Union */ || sourceFlags & 2097152 /* Intersection */ && targetFlags & (524288 /* Object */ | 1048576 /* Union */ | 465829888 /* Instantiable */))) {
                            return 0 /* False */;
                        }
                    }
                    if (sourceFlags & (524288 /* Object */ | 16777216 /* Conditional */) && source2.aliasSymbol && source2.aliasTypeArguments && source2.aliasSymbol === target2.aliasSymbol && !(isMarkerType(source2) || isMarkerType(target2))) {
                        const variances = getAliasVariances(source2.aliasSymbol);
                        if (variances === emptyArray) {
                            return 1 /* Unknown */;
                        }
                        const params = getSymbolLinks(source2.aliasSymbol).typeParameters;
                        const minParams = getMinTypeArgumentCount(params);
                        const sourceTypes = fillMissingTypeArguments(source2.aliasTypeArguments, params, minParams, isInJSFile(source2.aliasSymbol.valueDeclaration));
                        const targetTypes = fillMissingTypeArguments(target2.aliasTypeArguments, params, minParams, isInJSFile(source2.aliasSymbol.valueDeclaration));
                        const varianceResult = relateVariances(sourceTypes, targetTypes, variances, intersectionState);
                        if (varianceResult !== void 0) {
                            return varianceResult;
                        }
                    }
                    if (isSingleElementGenericTupleType(source2) && !source2.target.readonly && (result2 = isRelatedTo(getTypeArguments(source2)[0], target2, 1 /* Source */)) || isSingleElementGenericTupleType(target2) && (target2.target.readonly || isMutableArrayOrTuple(getBaseConstraintOfType(source2) || source2)) && (result2 = isRelatedTo(source2, getTypeArguments(target2)[0], 2 /* Target */))) {
                        return result2;
                    }
                    if (targetFlags & 262144 /* TypeParameter */) {
                        if (getObjectFlags(source2) & 32 /* Mapped */ && !source2.declaration.nameType && isRelatedTo(getIndexType(target2), getConstraintTypeFromMappedType(source2), 3 /* Both */)) {
                            if (!(getMappedTypeModifiers(source2) & 4 /* IncludeOptional */)) {
                                const templateType = getTemplateTypeFromMappedType(source2);
                                const indexedAccessType = getIndexedAccessType(target2, getTypeParameterFromMappedType(source2));
                                if (result2 = isRelatedTo(templateType, indexedAccessType, 3 /* Both */, reportErrors2)) {
                                    return result2;
                                }
                            }
                        }
                        if (relation === comparableRelation && sourceFlags & 262144 /* TypeParameter */) {
                            let constraint = getConstraintOfTypeParameter(source2);
                            if (constraint && hasNonCircularBaseConstraint(source2)) {
                                while (constraint && someType(constraint, (c) => !!(c.flags & 262144 /* TypeParameter */))) {
                                    if (result2 = isRelatedTo(constraint, target2, 1 /* Source */, 
                                    /*reportErrors*/
                                    false)) {
                                        return result2;
                                    }
                                    constraint = getConstraintOfTypeParameter(constraint);
                                }
                            }
                            return 0 /* False */;
                        }
                    }
                    else if (targetFlags & 4194304 /* Index */) {
                        const targetType = target2.type;
                        if (sourceFlags & 4194304 /* Index */) {
                            if (result2 = isRelatedTo(targetType, source2.type, 3 /* Both */, 
                            /*reportErrors*/
                            false)) {
                                return result2;
                            }
                        }
                        if (isTupleType(targetType)) {
                            if (result2 = isRelatedTo(source2, getKnownKeysOfTupleType(targetType), 2 /* Target */, reportErrors2)) {
                                return result2;
                            }
                        }
                        else {
                            const constraint = getSimplifiedTypeOrConstraint(targetType);
                            if (constraint) {
                                if (isRelatedTo(source2, getIndexType(constraint, target2.stringsOnly), 2 /* Target */, reportErrors2) === -1 /* True */) {
                                    return -1 /* True */;
                                }
                            }
                            else if (isGenericMappedType(targetType)) {
                                const nameType = getNameTypeFromMappedType(targetType);
                                const constraintType = getConstraintTypeFromMappedType(targetType);
                                let targetKeys;
                                if (nameType && isMappedTypeWithKeyofConstraintDeclaration(targetType)) {
                                    const modifiersType = getApparentType(getModifiersTypeFromMappedType(targetType));
                                    const mappedKeys = [];
                                    forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType(modifiersType, 8576 /* StringOrNumberLiteralOrUnique */, 
                                    /*stringsOnly*/
                                    false, (t) => void mappedKeys.push(instantiateType(nameType, appendTypeMapping(targetType.mapper, getTypeParameterFromMappedType(targetType), t))));
                                    targetKeys = getUnionType([...mappedKeys, nameType]);
                                }
                                else {
                                    targetKeys = nameType || constraintType;
                                }
                                if (isRelatedTo(source2, targetKeys, 2 /* Target */, reportErrors2) === -1 /* True */) {
                                    return -1 /* True */;
                                }
                            }
                        }
                    }
                    else if (targetFlags & 8388608 /* IndexedAccess */) {
                        if (sourceFlags & 8388608 /* IndexedAccess */) {
                            if (result2 = isRelatedTo(source2.objectType, target2.objectType, 3 /* Both */, reportErrors2)) {
                                result2 &= isRelatedTo(source2.indexType, target2.indexType, 3 /* Both */, reportErrors2);
                            }
                            if (result2) {
                                return result2;
                            }
                            if (reportErrors2) {
                                originalErrorInfo = errorInfo;
                            }
                        }
                        if (relation === assignableRelation || relation === comparableRelation) {
                            const objectType = target2.objectType;
                            const indexType = target2.indexType;
                            const baseObjectType = getBaseConstraintOfType(objectType) || objectType;
                            const baseIndexType = getBaseConstraintOfType(indexType) || indexType;
                            if (!isGenericObjectType(baseObjectType) && !isGenericIndexType(baseIndexType)) {
                                const accessFlags = 4 /* Writing */ | (baseObjectType !== objectType ? 2 /* NoIndexSignatures */ : 0);
                                const constraint = getIndexedAccessTypeOrUndefined(baseObjectType, baseIndexType, accessFlags);
                                if (constraint) {
                                    if (reportErrors2 && originalErrorInfo) {
                                        resetErrorInfo(saveErrorInfo);
                                    }
                                    if (result2 = isRelatedTo(source2, constraint, 2 /* Target */, reportErrors2, 
                                    /* headMessage */
                                    void 0, intersectionState)) {
                                        return result2;
                                    }
                                    if (reportErrors2 && originalErrorInfo && errorInfo) {
                                        errorInfo = countMessageChainBreadth([originalErrorInfo]) <= countMessageChainBreadth([errorInfo]) ? originalErrorInfo : errorInfo;
                                    }
                                }
                            }
                        }
                        if (reportErrors2) {
                            originalErrorInfo = void 0;
                        }
                    }
                    else if (isGenericMappedType(target2) && relation !== identityRelation) {
                        const keysRemapped = !!target2.declaration.nameType;
                        const templateType = getTemplateTypeFromMappedType(target2);
                        const modifiers = getMappedTypeModifiers(target2);
                        if (!(modifiers & 8 /* ExcludeOptional */)) {
                            if (!keysRemapped && templateType.flags & 8388608 /* IndexedAccess */ && templateType.objectType === source2 && templateType.indexType === getTypeParameterFromMappedType(target2)) {
                                return -1 /* True */;
                            }
                            if (!isGenericMappedType(source2)) {
                                const targetKeys = keysRemapped ? getNameTypeFromMappedType(target2) : getConstraintTypeFromMappedType(target2);
                                const sourceKeys = getIndexType(source2, 
                                /*stringsOnly*/
                                void 0, 
                                /*noIndexSignatures*/
                                true);
                                const includeOptional = modifiers & 4 /* IncludeOptional */;
                                const filteredByApplicability = includeOptional ? intersectTypes(targetKeys, sourceKeys) : void 0;
                                if (includeOptional ? !(filteredByApplicability.flags & 131072 /* Never */) : isRelatedTo(targetKeys, sourceKeys, 3 /* Both */)) {
                                    const templateType2 = getTemplateTypeFromMappedType(target2);
                                    const typeParameter = getTypeParameterFromMappedType(target2);
                                    const nonNullComponent = extractTypesOfKind(templateType2, ~98304 /* Nullable */);
                                    if (!keysRemapped && nonNullComponent.flags & 8388608 /* IndexedAccess */ && nonNullComponent.indexType === typeParameter) {
                                        if (result2 = isRelatedTo(source2, nonNullComponent.objectType, 2 /* Target */, reportErrors2)) {
                                            return result2;
                                        }
                                    }
                                    else {
                                        const indexingType = keysRemapped ? filteredByApplicability || targetKeys : filteredByApplicability ? getIntersectionType([filteredByApplicability, typeParameter]) : typeParameter;
                                        const indexedAccessType = getIndexedAccessType(source2, indexingType);
                                        if (result2 = isRelatedTo(indexedAccessType, templateType2, 3 /* Both */, reportErrors2)) {
                                            return result2;
                                        }
                                    }
                                }
                                originalErrorInfo = errorInfo;
                                resetErrorInfo(saveErrorInfo);
                            }
                        }
                    }
                    else if (targetFlags & 16777216 /* Conditional */) {
                        if (isDeeplyNestedType(target2, targetStack, targetDepth, 10)) {
                            return 3 /* Maybe */;
                        }
                        const c = target2;
                        if (!c.root.inferTypeParameters && !isDistributionDependent(c.root)) {
                            const skipTrue = !isTypeAssignableTo(getPermissiveInstantiation(c.checkType), getPermissiveInstantiation(c.extendsType));
                            const skipFalse = !skipTrue && isTypeAssignableTo(getRestrictiveInstantiation(c.checkType), getRestrictiveInstantiation(c.extendsType));
                            if (result2 = skipTrue ? -1 /* True */ : isRelatedTo(source2, getTrueTypeFromConditionalType(c), 2 /* Target */, 
                            /*reportErrors*/
                            false, 
                            /*headMessage*/
                            void 0, intersectionState)) {
                                result2 &= skipFalse ? -1 /* True */ : isRelatedTo(source2, getFalseTypeFromConditionalType(c), 2 /* Target */, 
                                /*reportErrors*/
                                false, 
                                /*headMessage*/
                                void 0, intersectionState);
                                if (result2) {
                                    return result2;
                                }
                            }
                        }
                    }
                    else if (targetFlags & 134217728 /* TemplateLiteral */) {
                        if (sourceFlags & 134217728 /* TemplateLiteral */) {
                            if (relation === comparableRelation) {
                                return templateLiteralTypesDefinitelyUnrelated(source2, target2) ? 0 /* False */ : -1 /* True */;
                            }
                            instantiateType(source2, reportUnreliableMapper);
                        }
                        if (isTypeMatchedByTemplateLiteralType(source2, target2)) {
                            return -1 /* True */;
                        }
                    }
                    else if (target2.flags & 268435456 /* StringMapping */) {
                        if (!(source2.flags & 268435456 /* StringMapping */)) {
                            if (isMemberOfStringMapping(source2, target2)) {
                                return -1 /* True */;
                            }
                        }
                    }
                    if (sourceFlags & 8650752 /* TypeVariable */) {
                        if (!(sourceFlags & 8388608 /* IndexedAccess */ && targetFlags & 8388608 /* IndexedAccess */)) {
                            const constraint = getConstraintOfType(source2) || unknownType;
                            if (result2 = isRelatedTo(constraint, target2, 1 /* Source */, 
                            /*reportErrors*/
                            false, 
                            /*headMessage*/
                            void 0, intersectionState)) {
                                return result2;
                            }
                            else if (result2 = isRelatedTo(getTypeWithThisArgument(constraint, source2), target2, 1 /* Source */, reportErrors2 && constraint !== unknownType && !(targetFlags & sourceFlags & 262144 /* TypeParameter */), 
                            /*headMessage*/
                            void 0, intersectionState)) {
                                return result2;
                            }
                            if (isMappedTypeGenericIndexedAccess(source2)) {
                                const indexConstraint = getConstraintOfType(source2.indexType);
                                if (indexConstraint) {
                                    if (result2 = isRelatedTo(getIndexedAccessType(source2.objectType, indexConstraint), target2, 1 /* Source */, reportErrors2)) {
                                        return result2;
                                    }
                                }
                            }
                        }
                    }
                    else if (sourceFlags & 4194304 /* Index */) {
                        if (result2 = isRelatedTo(keyofConstraintType, target2, 1 /* Source */, reportErrors2)) {
                            return result2;
                        }
                    }
                    else if (sourceFlags & 134217728 /* TemplateLiteral */ && !(targetFlags & 524288 /* Object */)) {
                        if (!(targetFlags & 134217728 /* TemplateLiteral */)) {
                            const constraint = getBaseConstraintOfType(source2);
                            if (constraint && constraint !== source2 && (result2 = isRelatedTo(constraint, target2, 1 /* Source */, reportErrors2))) {
                                return result2;
                            }
                        }
                    }
                    else if (sourceFlags & 268435456 /* StringMapping */) {
                        if (targetFlags & 268435456 /* StringMapping */) {
                            if (source2.symbol !== target2.symbol) {
                                return 0 /* False */;
                            }
                            if (result2 = isRelatedTo(source2.type, target2.type, 3 /* Both */, reportErrors2)) {
                                return result2;
                            }
                        }
                        else {
                            const constraint = getBaseConstraintOfType(source2);
                            if (constraint && (result2 = isRelatedTo(constraint, target2, 1 /* Source */, reportErrors2))) {
                                return result2;
                            }
                        }
                    }
                    else if (sourceFlags & 16777216 /* Conditional */) {
                        if (isDeeplyNestedType(source2, sourceStack, sourceDepth, 10)) {
                            return 3 /* Maybe */;
                        }
                        if (targetFlags & 16777216 /* Conditional */) {
                            const sourceParams = source2.root.inferTypeParameters;
                            let sourceExtends = source2.extendsType;
                            let mapper;
                            if (sourceParams) {
                                const ctx = createInferenceContext(sourceParams, 
                                /*signature*/
                                void 0, 0 /* None */, isRelatedToWorker);
                                inferTypes(ctx.inferences, target2.extendsType, sourceExtends, 512 /* NoConstraints */ | 1024 /* AlwaysStrict */);
                                sourceExtends = instantiateType(sourceExtends, ctx.mapper);
                                mapper = ctx.mapper;
                            }
                            if (isTypeIdenticalTo(sourceExtends, target2.extendsType) && (isRelatedTo(source2.checkType, target2.checkType, 3 /* Both */) || isRelatedTo(target2.checkType, source2.checkType, 3 /* Both */))) {
                                if (result2 = isRelatedTo(instantiateType(getTrueTypeFromConditionalType(source2), mapper), getTrueTypeFromConditionalType(target2), 3 /* Both */, reportErrors2)) {
                                    result2 &= isRelatedTo(getFalseTypeFromConditionalType(source2), getFalseTypeFromConditionalType(target2), 3 /* Both */, reportErrors2);
                                }
                                if (result2) {
                                    return result2;
                                }
                            }
                        }
                        else {
                            const distributiveConstraint = hasNonCircularBaseConstraint(source2) ? getConstraintOfDistributiveConditionalType(source2) : void 0;
                            if (distributiveConstraint) {
                                if (result2 = isRelatedTo(distributiveConstraint, target2, 1 /* Source */, reportErrors2)) {
                                    return result2;
                                }
                            }
                        }
                        const defaultConstraint = getDefaultConstraintOfConditionalType(source2);
                        if (defaultConstraint) {
                            if (result2 = isRelatedTo(defaultConstraint, target2, 1 /* Source */, reportErrors2)) {
                                return result2;
                            }
                        }
                    }
                    else {
                        if (relation !== subtypeRelation && relation !== strictSubtypeRelation && isPartialMappedType(target2) && isEmptyObjectType(source2)) {
                            return -1 /* True */;
                        }
                        if (isGenericMappedType(target2)) {
                            if (isGenericMappedType(source2)) {
                                if (result2 = mappedTypeRelatedTo(source2, target2, reportErrors2)) {
                                    return result2;
                                }
                            }
                            return 0 /* False */;
                        }
                        const sourceIsPrimitive = !!(sourceFlags & 134348796 /* Primitive */);
                        if (relation !== identityRelation) {
                            source2 = getApparentType(source2);
                            sourceFlags = source2.flags;
                        }
                        else if (isGenericMappedType(source2)) {
                            return 0 /* False */;
                        }
                        if (getObjectFlags(source2) & 4 /* Reference */ && getObjectFlags(target2) & 4 /* Reference */ && source2.target === target2.target && !isTupleType(source2) && !(isMarkerType(source2) || isMarkerType(target2))) {
                            if (isEmptyArrayLiteralType(source2)) {
                                return -1 /* True */;
                            }
                            const variances = getVariances(source2.target);
                            if (variances === emptyArray) {
                                return 1 /* Unknown */;
                            }
                            const varianceResult = relateVariances(getTypeArguments(source2), getTypeArguments(target2), variances, intersectionState);
                            if (varianceResult !== void 0) {
                                return varianceResult;
                            }
                        }
                        else if (isReadonlyArrayType(target2) ? isArrayOrTupleType(source2) : isArrayType(target2) && isTupleType(source2) && !source2.target.readonly) {
                            if (relation !== identityRelation) {
                                return isRelatedTo(getIndexTypeOfType(source2, numberType) || anyType, getIndexTypeOfType(target2, numberType) || anyType, 3 /* Both */, reportErrors2);
                            }
                            else {
                                return 0 /* False */;
                            }
                        }
                        else if ((relation === subtypeRelation || relation === strictSubtypeRelation) && isEmptyObjectType(target2) && getObjectFlags(target2) & 8192 /* FreshLiteral */ && !isEmptyObjectType(source2)) {
                            return 0 /* False */;
                        }
                        if (sourceFlags & (524288 /* Object */ | 2097152 /* Intersection */) && targetFlags & 524288 /* Object */) {
                            const reportStructuralErrors = reportErrors2 && errorInfo === saveErrorInfo.errorInfo && !sourceIsPrimitive;
                            result2 = propertiesRelatedTo(source2, target2, reportStructuralErrors, 
                            /*excludedProperties*/
                            void 0, 
                            /*optionalsOnly*/
                            false, intersectionState);
                            if (result2) {
                                result2 &= signaturesRelatedTo(source2, target2, 0 /* Call */, reportStructuralErrors, intersectionState);
                                if (result2) {
                                    result2 &= signaturesRelatedTo(source2, target2, 1 /* Construct */, reportStructuralErrors, intersectionState);
                                    if (result2) {
                                        result2 &= indexSignaturesRelatedTo(source2, target2, sourceIsPrimitive, reportStructuralErrors, intersectionState);
                                    }
                                }
                            }
                            if (varianceCheckFailed && result2) {
                                errorInfo = originalErrorInfo || errorInfo || saveErrorInfo.errorInfo;
                            }
                            else if (result2) {
                                return result2;
                            }
                        }
                        if (sourceFlags & (524288 /* Object */ | 2097152 /* Intersection */) && targetFlags & 1048576 /* Union */) {
                            const objectOnlyTarget = extractTypesOfKind(target2, 524288 /* Object */ | 2097152 /* Intersection */ | 33554432 /* Substitution */);
                            if (objectOnlyTarget.flags & 1048576 /* Union */) {
                                const result3 = typeRelatedToDiscriminatedType(source2, objectOnlyTarget);
                                if (result3) {
                                    return result3;
                                }
                            }
                        }
                    }
                    return 0 /* False */;
                    function countMessageChainBreadth(info) {
                        if (!info)
                            return 0;
                        return reduceLeft(info, (value, chain) => value + 1 + countMessageChainBreadth(chain.next), 0);
                    }
                    function relateVariances(sourceTypeArguments, targetTypeArguments, variances, intersectionState2) {
                        if (result2 = typeArgumentsRelatedTo(sourceTypeArguments, targetTypeArguments, variances, reportErrors2, intersectionState2)) {
                            return result2;
                        }
                        if (some(variances, (v) => !!(v & 24 /* AllowsStructuralFallback */))) {
                            originalErrorInfo = void 0;
                            resetErrorInfo(saveErrorInfo);
                            return void 0;
                        }
                        const allowStructuralFallback = targetTypeArguments && hasCovariantVoidArgument(targetTypeArguments, variances);
                        varianceCheckFailed = !allowStructuralFallback;
                        if (variances !== emptyArray && !allowStructuralFallback) {
                            if (varianceCheckFailed && !(reportErrors2 && some(variances, (v) => (v & 7 /* VarianceMask */) === 0 /* Invariant */))) {
                                return 0 /* False */;
                            }
                            originalErrorInfo = errorInfo;
                            resetErrorInfo(saveErrorInfo);
                        }
                    }
                }
                function mappedTypeRelatedTo(source2, target2, reportErrors2) {
                    const modifiersRelated = relation === comparableRelation || (relation === identityRelation ? getMappedTypeModifiers(source2) === getMappedTypeModifiers(target2) : getCombinedMappedTypeOptionality(source2) <= getCombinedMappedTypeOptionality(target2));
                    if (modifiersRelated) {
                        let result2;
                        const targetConstraint = getConstraintTypeFromMappedType(target2);
                        const sourceConstraint = instantiateType(getConstraintTypeFromMappedType(source2), getCombinedMappedTypeOptionality(source2) < 0 ? reportUnmeasurableMapper : reportUnreliableMapper);
                        if (result2 = isRelatedTo(targetConstraint, sourceConstraint, 3 /* Both */, reportErrors2)) {
                            const mapper = createTypeMapper([getTypeParameterFromMappedType(source2)], [getTypeParameterFromMappedType(target2)]);
                            if (instantiateType(getNameTypeFromMappedType(source2), mapper) === instantiateType(getNameTypeFromMappedType(target2), mapper)) {
                                return result2 & isRelatedTo(instantiateType(getTemplateTypeFromMappedType(source2), mapper), getTemplateTypeFromMappedType(target2), 3 /* Both */, reportErrors2);
                            }
                        }
                    }
                    return 0 /* False */;
                }
                function typeRelatedToDiscriminatedType(source2, target2) {
                    var _a3;
                    const sourceProperties = getPropertiesOfType(source2);
                    const sourcePropertiesFiltered = findDiscriminantProperties(sourceProperties, target2);
                    if (!sourcePropertiesFiltered)
                        return 0 /* False */;
                    let numCombinations = 1;
                    for (const sourceProperty of sourcePropertiesFiltered) {
                        numCombinations *= countTypes(getNonMissingTypeOfSymbol(sourceProperty));
                        if (numCombinations > 25) {
                            (_a3 = tracing) == null ? void 0 : _a3.instant(tracing.Phase.CheckTypes, "typeRelatedToDiscriminatedType_DepthLimit", { sourceId: source2.id, targetId: target2.id, numCombinations });
                            return 0 /* False */;
                        }
                    }
                    const sourceDiscriminantTypes = new Array(sourcePropertiesFiltered.length);
                    const excludedProperties = /* @__PURE__ */ new Set();
                    for (let i = 0; i < sourcePropertiesFiltered.length; i++) {
                        const sourceProperty = sourcePropertiesFiltered[i];
                        const sourcePropertyType = getNonMissingTypeOfSymbol(sourceProperty);
                        sourceDiscriminantTypes[i] = sourcePropertyType.flags & 1048576 /* Union */ ? sourcePropertyType.types : [sourcePropertyType];
                        excludedProperties.add(sourceProperty.escapedName);
                    }
                    const discriminantCombinations = cartesianProduct(sourceDiscriminantTypes);
                    const matchingTypes = [];
                    for (const combination of discriminantCombinations) {
                        let hasMatch = false;
                        outer: for (const type of target2.types) {
                            for (let i = 0; i < sourcePropertiesFiltered.length; i++) {
                                const sourceProperty = sourcePropertiesFiltered[i];
                                const targetProperty = getPropertyOfType(type, sourceProperty.escapedName);
                                if (!targetProperty)
                                    continue outer;
                                if (sourceProperty === targetProperty)
                                    continue;
                                const related = propertyRelatedTo(source2, target2, sourceProperty, targetProperty, (_) => combination[i], 
                                /*reportErrors*/
                                false, 0 /* None */, 
                                /*skipOptional*/
                                strictNullChecks || relation === comparableRelation);
                                if (!related) {
                                    continue outer;
                                }
                            }
                            pushIfUnique(matchingTypes, type, equateValues);
                            hasMatch = true;
                        }
                        if (!hasMatch) {
                            return 0 /* False */;
                        }
                    }
                    let result2 = -1 /* True */;
                    for (const type of matchingTypes) {
                        result2 &= propertiesRelatedTo(source2, type, 
                        /*reportErrors*/
                        false, excludedProperties, 
                        /*optionalsOnly*/
                        false, 0 /* None */);
                        if (result2) {
                            result2 &= signaturesRelatedTo(source2, type, 0 /* Call */, 
                            /*reportStructuralErrors*/
                            false, 0 /* None */);
                            if (result2) {
                                result2 &= signaturesRelatedTo(source2, type, 1 /* Construct */, 
                                /*reportStructuralErrors*/
                                false, 0 /* None */);
                                if (result2 && !(isTupleType(source2) && isTupleType(type))) {
                                    result2 &= indexSignaturesRelatedTo(source2, type, 
                                    /*sourceIsPrimitive*/
                                    false, 
                                    /*reportStructuralErrors*/
                                    false, 0 /* None */);
                                }
                            }
                        }
                        if (!result2) {
                            return result2;
                        }
                    }
                    return result2;
                }
                function excludeProperties(properties, excludedProperties) {
                    if (!excludedProperties || properties.length === 0)
                        return properties;
                    let result2;
                    for (let i = 0; i < properties.length; i++) {
                        if (!excludedProperties.has(properties[i].escapedName)) {
                            if (result2) {
                                result2.push(properties[i]);
                            }
                        }
                        else if (!result2) {
                            result2 = properties.slice(0, i);
                        }
                    }
                    return result2 || properties;
                }
                function isPropertySymbolTypeRelated(sourceProp, targetProp, getTypeOfSourceProperty, reportErrors2, intersectionState) {
                    const targetIsOptional = strictNullChecks && !!(getCheckFlags(targetProp) & 48 /* Partial */);
                    const effectiveTarget = addOptionality(getNonMissingTypeOfSymbol(targetProp), 
                    /*isProperty*/
                    false, targetIsOptional);
                    const effectiveSource = getTypeOfSourceProperty(sourceProp);
                    return isRelatedTo(effectiveSource, effectiveTarget, 3 /* Both */, reportErrors2, 
                    /*headMessage*/
                    void 0, intersectionState);
                }
                function propertyRelatedTo(source2, target2, sourceProp, targetProp, getTypeOfSourceProperty, reportErrors2, intersectionState, skipOptional) {
                    const sourcePropFlags = getDeclarationModifierFlagsFromSymbol(sourceProp);
                    const targetPropFlags = getDeclarationModifierFlagsFromSymbol(targetProp);
                    if (sourcePropFlags & 8 /* Private */ || targetPropFlags & 8 /* Private */) {
                        if (sourceProp.valueDeclaration !== targetProp.valueDeclaration) {
                            if (reportErrors2) {
                                if (sourcePropFlags & 8 /* Private */ && targetPropFlags & 8 /* Private */) {
                                    reportError(Diagnostics.Types_have_separate_declarations_of_a_private_property_0, symbolToString(targetProp));
                                }
                                else {
                                    reportError(Diagnostics.Property_0_is_private_in_type_1_but_not_in_type_2, symbolToString(targetProp), typeToString(sourcePropFlags & 8 /* Private */ ? source2 : target2), typeToString(sourcePropFlags & 8 /* Private */ ? target2 : source2));
                                }
                            }
                            return 0 /* False */;
                        }
                    }
                    else if (targetPropFlags & 16 /* Protected */) {
                        if (!isValidOverrideOf(sourceProp, targetProp)) {
                            if (reportErrors2) {
                                reportError(Diagnostics.Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2, symbolToString(targetProp), typeToString(getDeclaringClass(sourceProp) || source2), typeToString(getDeclaringClass(targetProp) || target2));
                            }
                            return 0 /* False */;
                        }
                    }
                    else if (sourcePropFlags & 16 /* Protected */) {
                        if (reportErrors2) {
                            reportError(Diagnostics.Property_0_is_protected_in_type_1_but_public_in_type_2, symbolToString(targetProp), typeToString(source2), typeToString(target2));
                        }
                        return 0 /* False */;
                    }
                    if (relation === strictSubtypeRelation && isReadonlySymbol(sourceProp) && !isReadonlySymbol(targetProp)) {
                        return 0 /* False */;
                    }
                    const related = isPropertySymbolTypeRelated(sourceProp, targetProp, getTypeOfSourceProperty, reportErrors2, intersectionState);
                    if (!related) {
                        if (reportErrors2) {
                            reportIncompatibleError(Diagnostics.Types_of_property_0_are_incompatible, symbolToString(targetProp));
                        }
                        return 0 /* False */;
                    }
                    if (!skipOptional && sourceProp.flags & 16777216 /* Optional */ && targetProp.flags & 106500 /* ClassMember */ && !(targetProp.flags & 16777216 /* Optional */)) {
                        if (reportErrors2) {
                            reportError(Diagnostics.Property_0_is_optional_in_type_1_but_required_in_type_2, symbolToString(targetProp), typeToString(source2), typeToString(target2));
                        }
                        return 0 /* False */;
                    }
                    return related;
                }
                function reportUnmatchedProperty(source2, target2, unmatchedProperty, requireOptionalProperties) {
                    let shouldSkipElaboration = false;
                    if (unmatchedProperty.valueDeclaration && isNamedDeclaration(unmatchedProperty.valueDeclaration) && isPrivateIdentifier(unmatchedProperty.valueDeclaration.name) && source2.symbol && source2.symbol.flags & 32 /* Class */) {
                        const privateIdentifierDescription = unmatchedProperty.valueDeclaration.name.escapedText;
                        const symbolTableKey = getSymbolNameForPrivateIdentifier(source2.symbol, privateIdentifierDescription);
                        if (symbolTableKey && getPropertyOfType(source2, symbolTableKey)) {
                            const sourceName = factory.getDeclarationName(source2.symbol.valueDeclaration);
                            const targetName = factory.getDeclarationName(target2.symbol.valueDeclaration);
                            reportError(Diagnostics.Property_0_in_type_1_refers_to_a_different_member_that_cannot_be_accessed_from_within_type_2, diagnosticName(privateIdentifierDescription), diagnosticName(sourceName.escapedText === "" ? anon : sourceName), diagnosticName(targetName.escapedText === "" ? anon : targetName));
                            return;
                        }
                    }
                    const props = arrayFrom(getUnmatchedProperties(source2, target2, requireOptionalProperties, 
                    /*matchDiscriminantProperties*/
                    false));
                    if (!headMessage || headMessage.code !== Diagnostics.Class_0_incorrectly_implements_interface_1.code && headMessage.code !== Diagnostics.Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclass.code) {
                        shouldSkipElaboration = true;
                    }
                    if (props.length === 1) {
                        const propName = symbolToString(unmatchedProperty, 
                        /*enclosingDeclaration*/
                        void 0, 0 /* None */, 4 /* AllowAnyNodeKind */ | 16 /* WriteComputedProps */);
                        reportError(Diagnostics.Property_0_is_missing_in_type_1_but_required_in_type_2, propName, ...getTypeNamesForErrorDisplay(source2, target2));
                        if (length(unmatchedProperty.declarations)) {
                            associateRelatedInfo(createDiagnosticForNode(unmatchedProperty.declarations[0], Diagnostics._0_is_declared_here, propName));
                        }
                        if (shouldSkipElaboration && errorInfo) {
                            overrideNextErrorInfo++;
                        }
                    }
                    else if (tryElaborateArrayLikeErrors(source2, target2, 
                    /*reportErrors*/
                    false)) {
                        if (props.length > 5) {
                            reportError(Diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2_and_3_more, typeToString(source2), typeToString(target2), map(props.slice(0, 4), (p) => symbolToString(p)).join(", "), props.length - 4);
                        }
                        else {
                            reportError(Diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2, typeToString(source2), typeToString(target2), map(props, (p) => symbolToString(p)).join(", "));
                        }
                        if (shouldSkipElaboration && errorInfo) {
                            overrideNextErrorInfo++;
                        }
                    }
                }
                function propertiesRelatedTo(source2, target2, reportErrors2, excludedProperties, optionalsOnly, intersectionState) {
                    if (relation === identityRelation) {
                        return propertiesIdenticalTo(source2, target2, excludedProperties);
                    }
                    let result2 = -1 /* True */;
                    if (isTupleType(target2)) {
                        if (isArrayOrTupleType(source2)) {
                            if (!target2.target.readonly && (isReadonlyArrayType(source2) || isTupleType(source2) && source2.target.readonly)) {
                                return 0 /* False */;
                            }
                            const sourceArity = getTypeReferenceArity(source2);
                            const targetArity = getTypeReferenceArity(target2);
                            const sourceRestFlag = isTupleType(source2) ? source2.target.combinedFlags & 4 /* Rest */ : 4 /* Rest */;
                            const targetRestFlag = target2.target.combinedFlags & 4 /* Rest */;
                            const sourceMinLength = isTupleType(source2) ? source2.target.minLength : 0;
                            const targetMinLength = target2.target.minLength;
                            if (!sourceRestFlag && sourceArity < targetMinLength) {
                                if (reportErrors2) {
                                    reportError(Diagnostics.Source_has_0_element_s_but_target_requires_1, sourceArity, targetMinLength);
                                }
                                return 0 /* False */;
                            }
                            if (!targetRestFlag && targetArity < sourceMinLength) {
                                if (reportErrors2) {
                                    reportError(Diagnostics.Source_has_0_element_s_but_target_allows_only_1, sourceMinLength, targetArity);
                                }
                                return 0 /* False */;
                            }
                            if (!targetRestFlag && (sourceRestFlag || targetArity < sourceArity)) {
                                if (reportErrors2) {
                                    if (sourceMinLength < targetMinLength) {
                                        reportError(Diagnostics.Target_requires_0_element_s_but_source_may_have_fewer, targetMinLength);
                                    }
                                    else {
                                        reportError(Diagnostics.Target_allows_only_0_element_s_but_source_may_have_more, targetArity);
                                    }
                                }
                                return 0 /* False */;
                            }
                            const sourceTypeArguments = getTypeArguments(source2);
                            const targetTypeArguments = getTypeArguments(target2);
                            const targetStartCount = getStartElementCount(target2.target, 11 /* NonRest */);
                            const targetEndCount = getEndElementCount(target2.target, 11 /* NonRest */);
                            const targetHasRestElement = target2.target.hasRestElement;
                            let canExcludeDiscriminants = !!excludedProperties;
                            for (let sourcePosition = 0; sourcePosition < sourceArity; sourcePosition++) {
                                const sourceFlags = isTupleType(source2) ? source2.target.elementFlags[sourcePosition] : 4 /* Rest */;
                                const sourcePositionFromEnd = sourceArity - 1 - sourcePosition;
                                const targetPosition = targetHasRestElement && sourcePosition >= targetStartCount ? targetArity - 1 - Math.min(sourcePositionFromEnd, targetEndCount) : sourcePosition;
                                const targetFlags = target2.target.elementFlags[targetPosition];
                                if (targetFlags & 8 /* Variadic */ && !(sourceFlags & 8 /* Variadic */)) {
                                    if (reportErrors2) {
                                        reportError(Diagnostics.Source_provides_no_match_for_variadic_element_at_position_0_in_target, targetPosition);
                                    }
                                    return 0 /* False */;
                                }
                                if (sourceFlags & 8 /* Variadic */ && !(targetFlags & 12 /* Variable */)) {
                                    if (reportErrors2) {
                                        reportError(Diagnostics.Variadic_element_at_position_0_in_source_does_not_match_element_at_position_1_in_target, sourcePosition, targetPosition);
                                    }
                                    return 0 /* False */;
                                }
                                if (targetFlags & 1 /* Required */ && !(sourceFlags & 1 /* Required */)) {
                                    if (reportErrors2) {
                                        reportError(Diagnostics.Source_provides_no_match_for_required_element_at_position_0_in_target, targetPosition);
                                    }
                                    return 0 /* False */;
                                }
                                if (canExcludeDiscriminants) {
                                    if (sourceFlags & 12 /* Variable */ || targetFlags & 12 /* Variable */) {
                                        canExcludeDiscriminants = false;
                                    }
                                    if (canExcludeDiscriminants && (excludedProperties == null ? void 0 : excludedProperties.has("" + sourcePosition))) {
                                        continue;
                                    }
                                }
                                const sourceType = removeMissingType(sourceTypeArguments[sourcePosition], !!(sourceFlags & targetFlags & 2 /* Optional */));
                                const targetType = targetTypeArguments[targetPosition];
                                const targetCheckType = sourceFlags & 8 /* Variadic */ && targetFlags & 4 /* Rest */ ? createArrayType(targetType) : removeMissingType(targetType, !!(targetFlags & 2 /* Optional */));
                                const related = isRelatedTo(sourceType, targetCheckType, 3 /* Both */, reportErrors2, 
                                /*headMessage*/
                                void 0, intersectionState);
                                if (!related) {
                                    if (reportErrors2 && (targetArity > 1 || sourceArity > 1)) {
                                        if (targetHasRestElement && sourcePosition >= targetStartCount && sourcePositionFromEnd >= targetEndCount && targetStartCount !== sourceArity - targetEndCount - 1) {
                                            reportIncompatibleError(Diagnostics.Type_at_positions_0_through_1_in_source_is_not_compatible_with_type_at_position_2_in_target, targetStartCount, sourceArity - targetEndCount - 1, targetPosition);
                                        }
                                        else {
                                            reportIncompatibleError(Diagnostics.Type_at_position_0_in_source_is_not_compatible_with_type_at_position_1_in_target, sourcePosition, targetPosition);
                                        }
                                    }
                                    return 0 /* False */;
                                }
                                result2 &= related;
                            }
                            return result2;
                        }
                        if (target2.target.combinedFlags & 12 /* Variable */) {
                            return 0 /* False */;
                        }
                    }
                    const requireOptionalProperties = (relation === subtypeRelation || relation === strictSubtypeRelation) && !isObjectLiteralType2(source2) && !isEmptyArrayLiteralType(source2) && !isTupleType(source2);
                    const unmatchedProperty = getUnmatchedProperty(source2, target2, requireOptionalProperties, 
                    /*matchDiscriminantProperties*/
                    false);
                    if (unmatchedProperty) {
                        if (reportErrors2 && shouldReportUnmatchedPropertyError(source2, target2)) {
                            reportUnmatchedProperty(source2, target2, unmatchedProperty, requireOptionalProperties);
                        }
                        return 0 /* False */;
                    }
                    if (isObjectLiteralType2(target2)) {
                        for (const sourceProp of excludeProperties(getPropertiesOfType(source2), excludedProperties)) {
                            if (!getPropertyOfObjectType(target2, sourceProp.escapedName)) {
                                const sourceType = getTypeOfSymbol(sourceProp);
                                if (!(sourceType.flags & 32768 /* Undefined */)) {
                                    if (reportErrors2) {
                                        reportError(Diagnostics.Property_0_does_not_exist_on_type_1, symbolToString(sourceProp), typeToString(target2));
                                    }
                                    return 0 /* False */;
                                }
                            }
                        }
                    }
                    const properties = getPropertiesOfType(target2);
                    const numericNamesOnly = isTupleType(source2) && isTupleType(target2);
                    for (const targetProp of excludeProperties(properties, excludedProperties)) {
                        const name = targetProp.escapedName;
                        if (!(targetProp.flags & 4194304 /* Prototype */) && (!numericNamesOnly || isNumericLiteralName(name) || name === "length") && (!optionalsOnly || targetProp.flags & 16777216 /* Optional */)) {
                            const sourceProp = getPropertyOfType(source2, name);
                            if (sourceProp && sourceProp !== targetProp) {
                                const related = propertyRelatedTo(source2, target2, sourceProp, targetProp, getNonMissingTypeOfSymbol, reportErrors2, intersectionState, relation === comparableRelation);
                                if (!related) {
                                    return 0 /* False */;
                                }
                                result2 &= related;
                            }
                        }
                    }
                    return result2;
                }
                function propertiesIdenticalTo(source2, target2, excludedProperties) {
                    if (!(source2.flags & 524288 /* Object */ && target2.flags & 524288 /* Object */)) {
                        return 0 /* False */;
                    }
                    const sourceProperties = excludeProperties(getPropertiesOfObjectType(source2), excludedProperties);
                    const targetProperties = excludeProperties(getPropertiesOfObjectType(target2), excludedProperties);
                    if (sourceProperties.length !== targetProperties.length) {
                        return 0 /* False */;
                    }
                    let result2 = -1 /* True */;
                    for (const sourceProp of sourceProperties) {
                        const targetProp = getPropertyOfObjectType(target2, sourceProp.escapedName);
                        if (!targetProp) {
                            return 0 /* False */;
                        }
                        const related = compareProperties2(sourceProp, targetProp, isRelatedTo);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }
                function signaturesRelatedTo(source2, target2, kind, reportErrors2, intersectionState) {
                    var _a3, _b;
                    if (relation === identityRelation) {
                        return signaturesIdenticalTo(source2, target2, kind);
                    }
                    if (target2 === anyFunctionType || source2 === anyFunctionType) {
                        return -1 /* True */;
                    }
                    const sourceIsJSConstructor = source2.symbol && isJSConstructor(source2.symbol.valueDeclaration);
                    const targetIsJSConstructor = target2.symbol && isJSConstructor(target2.symbol.valueDeclaration);
                    const sourceSignatures = getSignaturesOfType(source2, sourceIsJSConstructor && kind === 1 /* Construct */ ? 0 /* Call */ : kind);
                    const targetSignatures = getSignaturesOfType(target2, targetIsJSConstructor && kind === 1 /* Construct */ ? 0 /* Call */ : kind);
                    if (kind === 1 /* Construct */ && sourceSignatures.length && targetSignatures.length) {
                        const sourceIsAbstract = !!(sourceSignatures[0].flags & 4 /* Abstract */);
                        const targetIsAbstract = !!(targetSignatures[0].flags & 4 /* Abstract */);
                        if (sourceIsAbstract && !targetIsAbstract) {
                            if (reportErrors2) {
                                reportError(Diagnostics.Cannot_assign_an_abstract_constructor_type_to_a_non_abstract_constructor_type);
                            }
                            return 0 /* False */;
                        }
                        if (!constructorVisibilitiesAreCompatible(sourceSignatures[0], targetSignatures[0], reportErrors2)) {
                            return 0 /* False */;
                        }
                    }
                    let result2 = -1 /* True */;
                    const incompatibleReporter = kind === 1 /* Construct */ ? reportIncompatibleConstructSignatureReturn : reportIncompatibleCallSignatureReturn;
                    const sourceObjectFlags = getObjectFlags(source2);
                    const targetObjectFlags = getObjectFlags(target2);
                    if (sourceObjectFlags & 64 /* Instantiated */ && targetObjectFlags & 64 /* Instantiated */ && source2.symbol === target2.symbol || sourceObjectFlags & 4 /* Reference */ && targetObjectFlags & 4 /* Reference */ && source2.target === target2.target) {
                        for (let i = 0; i < targetSignatures.length; i++) {
                            const related = signatureRelatedTo(sourceSignatures[i], targetSignatures[i], 
                            /*erase*/
                            true, reportErrors2, intersectionState, incompatibleReporter(sourceSignatures[i], targetSignatures[i]));
                            if (!related) {
                                return 0 /* False */;
                            }
                            result2 &= related;
                        }
                    }
                    else if (sourceSignatures.length === 1 && targetSignatures.length === 1) {
                        const eraseGenerics = relation === comparableRelation || !!compilerOptions.noStrictGenericChecks;
                        const sourceSignature = first(sourceSignatures);
                        const targetSignature = first(targetSignatures);
                        result2 = signatureRelatedTo(sourceSignature, targetSignature, eraseGenerics, reportErrors2, intersectionState, incompatibleReporter(sourceSignature, targetSignature));
                        if (!result2 && reportErrors2 && kind === 1 /* Construct */ && sourceObjectFlags & targetObjectFlags && (((_a3 = targetSignature.declaration) == null ? void 0 : _a3.kind) === 173 /* Constructor */ || ((_b = sourceSignature.declaration) == null ? void 0 : _b.kind) === 173 /* Constructor */)) {
                            const constructSignatureToString = (signature) => signatureToString(signature, 
                            /*enclosingDeclaration*/
                            void 0, 262144 /* WriteArrowStyleSignature */, kind);
                            reportError(Diagnostics.Type_0_is_not_assignable_to_type_1, constructSignatureToString(sourceSignature), constructSignatureToString(targetSignature));
                            reportError(Diagnostics.Types_of_construct_signatures_are_incompatible);
                            return result2;
                        }
                    }
                    else {
                        outer: for (const t of targetSignatures) {
                            const saveErrorInfo = captureErrorCalculationState();
                            let shouldElaborateErrors = reportErrors2;
                            for (const s of sourceSignatures) {
                                const related = signatureRelatedTo(s, t, 
                                /*erase*/
                                true, shouldElaborateErrors, intersectionState, incompatibleReporter(s, t));
                                if (related) {
                                    result2 &= related;
                                    resetErrorInfo(saveErrorInfo);
                                    continue outer;
                                }
                                shouldElaborateErrors = false;
                            }
                            if (shouldElaborateErrors) {
                                reportError(Diagnostics.Type_0_provides_no_match_for_the_signature_1, typeToString(source2), signatureToString(t, 
                                /*enclosingDeclaration*/
                                void 0, 
                                /*flags*/
                                void 0, kind));
                            }
                            return 0 /* False */;
                        }
                    }
                    return result2;
                }
                function shouldReportUnmatchedPropertyError(source2, target2) {
                    const typeCallSignatures = getSignaturesOfStructuredType(source2, 0 /* Call */);
                    const typeConstructSignatures = getSignaturesOfStructuredType(source2, 1 /* Construct */);
                    const typeProperties = getPropertiesOfObjectType(source2);
                    if ((typeCallSignatures.length || typeConstructSignatures.length) && !typeProperties.length) {
                        if (getSignaturesOfType(target2, 0 /* Call */).length && typeCallSignatures.length || getSignaturesOfType(target2, 1 /* Construct */).length && typeConstructSignatures.length) {
                            return true;
                        }
                        return false;
                    }
                    return true;
                }
                function reportIncompatibleCallSignatureReturn(siga, sigb) {
                    if (siga.parameters.length === 0 && sigb.parameters.length === 0) {
                        return (source2, target2) => reportIncompatibleError(Diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1, typeToString(source2), typeToString(target2));
                    }
                    return (source2, target2) => reportIncompatibleError(Diagnostics.Call_signature_return_types_0_and_1_are_incompatible, typeToString(source2), typeToString(target2));
                }
                function reportIncompatibleConstructSignatureReturn(siga, sigb) {
                    if (siga.parameters.length === 0 && sigb.parameters.length === 0) {
                        return (source2, target2) => reportIncompatibleError(Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1, typeToString(source2), typeToString(target2));
                    }
                    return (source2, target2) => reportIncompatibleError(Diagnostics.Construct_signature_return_types_0_and_1_are_incompatible, typeToString(source2), typeToString(target2));
                }
                function signatureRelatedTo(source2, target2, erase, reportErrors2, intersectionState, incompatibleReporter) {
                    const checkMode = relation === subtypeRelation ? 16 /* StrictTopSignature */ : relation === strictSubtypeRelation ? 16 /* StrictTopSignature */ | 8 /* StrictArity */ : 0 /* None */;
                    return compareSignaturesRelated(erase ? getErasedSignature(source2) : source2, erase ? getErasedSignature(target2) : target2, checkMode, reportErrors2, reportError, incompatibleReporter, isRelatedToWorker2, reportUnreliableMapper);
                    function isRelatedToWorker2(source3, target3, reportErrors3) {
                        return isRelatedTo(source3, target3, 3 /* Both */, reportErrors3, 
                        /*headMessage*/
                        void 0, intersectionState);
                    }
                }
                function signaturesIdenticalTo(source2, target2, kind) {
                    const sourceSignatures = getSignaturesOfType(source2, kind);
                    const targetSignatures = getSignaturesOfType(target2, kind);
                    if (sourceSignatures.length !== targetSignatures.length) {
                        return 0 /* False */;
                    }
                    let result2 = -1 /* True */;
                    for (let i = 0; i < sourceSignatures.length; i++) {
                        const related = compareSignaturesIdentical(sourceSignatures[i], targetSignatures[i], 
                        /*partialMatch*/
                        false, 
                        /*ignoreThisTypes*/
                        false, 
                        /*ignoreReturnTypes*/
                        false, isRelatedTo);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }
                function membersRelatedToIndexInfo(source2, targetInfo, reportErrors2, intersectionState) {
                    let result2 = -1 /* True */;
                    const keyType = targetInfo.keyType;
                    const props = source2.flags & 2097152 /* Intersection */ ? getPropertiesOfUnionOrIntersectionType(source2) : getPropertiesOfObjectType(source2);
                    for (const prop of props) {
                        if (isIgnoredJsxProperty(source2, prop)) {
                            continue;
                        }
                        if (isApplicableIndexType(getLiteralTypeFromProperty(prop, 8576 /* StringOrNumberLiteralOrUnique */), keyType)) {
                            const propType = getNonMissingTypeOfSymbol(prop);
                            const type = exactOptionalPropertyTypes || propType.flags & 32768 /* Undefined */ || keyType === numberType || !(prop.flags & 16777216 /* Optional */) ? propType : getTypeWithFacts(propType, 524288 /* NEUndefined */);
                            const related = isRelatedTo(type, targetInfo.type, 3 /* Both */, reportErrors2, 
                            /*headMessage*/
                            void 0, intersectionState);
                            if (!related) {
                                if (reportErrors2) {
                                    reportError(Diagnostics.Property_0_is_incompatible_with_index_signature, symbolToString(prop));
                                }
                                return 0 /* False */;
                            }
                            result2 &= related;
                        }
                    }
                    for (const info of getIndexInfosOfType(source2)) {
                        if (isApplicableIndexType(info.keyType, keyType)) {
                            const related = indexInfoRelatedTo(info, targetInfo, reportErrors2, intersectionState);
                            if (!related) {
                                return 0 /* False */;
                            }
                            result2 &= related;
                        }
                    }
                    return result2;
                }
                function indexInfoRelatedTo(sourceInfo, targetInfo, reportErrors2, intersectionState) {
                    const related = isRelatedTo(sourceInfo.type, targetInfo.type, 3 /* Both */, reportErrors2, 
                    /*headMessage*/
                    void 0, intersectionState);
                    if (!related && reportErrors2) {
                        if (sourceInfo.keyType === targetInfo.keyType) {
                            reportError(Diagnostics._0_index_signatures_are_incompatible, typeToString(sourceInfo.keyType));
                        }
                        else {
                            reportError(Diagnostics._0_and_1_index_signatures_are_incompatible, typeToString(sourceInfo.keyType), typeToString(targetInfo.keyType));
                        }
                    }
                    return related;
                }
                function indexSignaturesRelatedTo(source2, target2, sourceIsPrimitive, reportErrors2, intersectionState) {
                    if (relation === identityRelation) {
                        return indexSignaturesIdenticalTo(source2, target2);
                    }
                    const indexInfos = getIndexInfosOfType(target2);
                    const targetHasStringIndex = some(indexInfos, (info) => info.keyType === stringType);
                    let result2 = -1 /* True */;
                    for (const targetInfo of indexInfos) {
                        const related = relation !== strictSubtypeRelation && !sourceIsPrimitive && targetHasStringIndex && targetInfo.type.flags & 1 /* Any */ ? -1 /* True */ : isGenericMappedType(source2) && targetHasStringIndex ? isRelatedTo(getTemplateTypeFromMappedType(source2), targetInfo.type, 3 /* Both */, reportErrors2) : typeRelatedToIndexInfo(source2, targetInfo, reportErrors2, intersectionState);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }
                function typeRelatedToIndexInfo(source2, targetInfo, reportErrors2, intersectionState) {
                    const sourceInfo = getApplicableIndexInfo(source2, targetInfo.keyType);
                    if (sourceInfo) {
                        return indexInfoRelatedTo(sourceInfo, targetInfo, reportErrors2, intersectionState);
                    }
                    if (!(intersectionState & 1 /* Source */) && (relation !== strictSubtypeRelation || getObjectFlags(source2) & 8192 /* FreshLiteral */) && isObjectTypeWithInferableIndex(source2)) {
                        return membersRelatedToIndexInfo(source2, targetInfo, reportErrors2, intersectionState);
                    }
                    if (reportErrors2) {
                        reportError(Diagnostics.Index_signature_for_type_0_is_missing_in_type_1, typeToString(targetInfo.keyType), typeToString(source2));
                    }
                    return 0 /* False */;
                }
                function indexSignaturesIdenticalTo(source2, target2) {
                    const sourceInfos = getIndexInfosOfType(source2);
                    const targetInfos = getIndexInfosOfType(target2);
                    if (sourceInfos.length !== targetInfos.length) {
                        return 0 /* False */;
                    }
                    for (const targetInfo of targetInfos) {
                        const sourceInfo = getIndexInfoOfType(source2, targetInfo.keyType);
                        if (!(sourceInfo && isRelatedTo(sourceInfo.type, targetInfo.type, 3 /* Both */) && sourceInfo.isReadonly === targetInfo.isReadonly)) {
                            return 0 /* False */;
                        }
                    }
                    return -1 /* True */;
                }
                function constructorVisibilitiesAreCompatible(sourceSignature, targetSignature, reportErrors2) {
                    if (!sourceSignature.declaration || !targetSignature.declaration) {
                        return true;
                    }
                    const sourceAccessibility = getSelectedEffectiveModifierFlags(sourceSignature.declaration, 24 /* NonPublicAccessibilityModifier */);
                    const targetAccessibility = getSelectedEffectiveModifierFlags(targetSignature.declaration, 24 /* NonPublicAccessibilityModifier */);
                    if (targetAccessibility === 8 /* Private */) {
                        return true;
                    }
                    if (targetAccessibility === 16 /* Protected */ && sourceAccessibility !== 8 /* Private */) {
                        return true;
                    }
                    if (targetAccessibility !== 16 /* Protected */ && !sourceAccessibility) {
                        return true;
                    }
                    if (reportErrors2) {
                        reportError(Diagnostics.Cannot_assign_a_0_constructor_type_to_a_1_constructor_type, visibilityToString(sourceAccessibility), visibilityToString(targetAccessibility));
                    }
                    return false;
                }
            }
            function compareSignaturesIdentical(source, target, partialMatch, ignoreThisTypes, ignoreReturnTypes, compareTypes) {
                if (source === target) {
                    return -1 /* True */;
                }
                if (!isMatchingSignature(source, target, partialMatch)) {
                    return 0 /* False */;
                }
                if (length(source.typeParameters) !== length(target.typeParameters)) {
                    return 0 /* False */;
                }
                if (target.typeParameters) {
                    const mapper = createTypeMapper(source.typeParameters, target.typeParameters);
                    for (let i = 0; i < target.typeParameters.length; i++) {
                        const s = source.typeParameters[i];
                        const t = target.typeParameters[i];
                        if (!(s === t || compareTypes(instantiateType(getConstraintFromTypeParameter(s), mapper) || unknownType, getConstraintFromTypeParameter(t) || unknownType) && compareTypes(instantiateType(getDefaultFromTypeParameter(s), mapper) || unknownType, getDefaultFromTypeParameter(t) || unknownType))) {
                            return 0 /* False */;
                        }
                    }
                    source = instantiateSignature(source, mapper, 
                    /*eraseTypeParameters*/
                    true);
                }
                let result = -1 /* True */;
                if (!ignoreThisTypes) {
                    const sourceThisType = getThisTypeOfSignature(source);
                    if (sourceThisType) {
                        const targetThisType = getThisTypeOfSignature(target);
                        if (targetThisType) {
                            const related = compareTypes(sourceThisType, targetThisType);
                            if (!related) {
                                return 0 /* False */;
                            }
                            result &= related;
                        }
                    }
                }
                const targetLen = getParameterCount(target);
                for (let i = 0; i < targetLen; i++) {
                    const s = getTypeAtPosition(source, i);
                    const t = getTypeAtPosition(target, i);
                    const related = compareTypes(t, s);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
                if (!ignoreReturnTypes) {
                    const sourceTypePredicate = getTypePredicateOfSignature(source);
                    const targetTypePredicate = getTypePredicateOfSignature(target);
                    result &= sourceTypePredicate || targetTypePredicate ? compareTypePredicatesIdentical(sourceTypePredicate, targetTypePredicate, compareTypes) : compareTypes(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
                }
                return result;
            }
            function reportImplicitAny(declaration, type, wideningKind) {
                const typeAsString = typeToString(getWidenedType(type));
                if (isInJSFile(declaration) && !isCheckJsEnabledForFile(getSourceFileOfNode(declaration), compilerOptions)) {
                    return;
                }
                let diagnostic;
                switch (declaration.kind) {
                    case 223 /* BinaryExpression */:
                    case 169 /* PropertyDeclaration */:
                    case 168 /* PropertySignature */:
                        diagnostic = noImplicitAny ? Diagnostics.Member_0_implicitly_has_an_1_type : Diagnostics.Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage;
                        break;
                    case 166 /* Parameter */:
                        const param = declaration;
                        if (isIdentifier(param.name)) {
                            const originalKeywordKind = identifierToKeywordKind(param.name);
                            if ((isCallSignatureDeclaration(param.parent) || isMethodSignature(param.parent) || isFunctionTypeNode(param.parent)) && param.parent.parameters.indexOf(param) > -1 && (resolveName(param, param.name.escapedText, 788968 /* Type */, void 0, param.name.escapedText, 
                            /*isUse*/
                            true) || originalKeywordKind && isTypeNodeKind(originalKeywordKind))) {
                                const newName = "arg" + param.parent.parameters.indexOf(param);
                                const typeName = declarationNameToString(param.name) + (param.dotDotDotToken ? "[]" : "");
                                errorOrSuggestion(noImplicitAny, declaration, Diagnostics.Parameter_has_a_name_but_no_type_Did_you_mean_0_Colon_1, newName, typeName);
                                return;
                            }
                        }
                        diagnostic = declaration.dotDotDotToken ? noImplicitAny ? Diagnostics.Rest_parameter_0_implicitly_has_an_any_type : Diagnostics.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage : noImplicitAny ? Diagnostics.Parameter_0_implicitly_has_an_1_type : Diagnostics.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage;
                        break;
                    case 205 /* BindingElement */:
                        diagnostic = Diagnostics.Binding_element_0_implicitly_has_an_1_type;
                        if (!noImplicitAny) {
                            return;
                        }
                        break;
                    case 320 /* JSDocFunctionType */:
                        error(declaration, Diagnostics.Function_type_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeAsString);
                        return;
                    case 326 /* JSDocSignature */:
                        if (noImplicitAny && isJSDocOverloadTag(declaration.parent)) {
                            error(declaration.parent.tagName, Diagnostics.This_overload_implicitly_returns_the_type_0_because_it_lacks_a_return_type_annotation, typeAsString);
                        }
                        return;
                    case 259 /* FunctionDeclaration */:
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                        if (noImplicitAny && !declaration.name) {
                            if (wideningKind === 3 /* GeneratorYield */) {
                                error(declaration, Diagnostics.Generator_implicitly_has_yield_type_0_because_it_does_not_yield_any_values_Consider_supplying_a_return_type_annotation, typeAsString);
                            }
                            else {
                                error(declaration, Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeAsString);
                            }
                            return;
                        }
                        diagnostic = !noImplicitAny ? Diagnostics._0_implicitly_has_an_1_return_type_but_a_better_type_may_be_inferred_from_usage : wideningKind === 3 /* GeneratorYield */ ? Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_yield_type : Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type;
                        break;
                    case 197 /* MappedType */:
                        if (noImplicitAny) {
                            error(declaration, Diagnostics.Mapped_object_type_implicitly_has_an_any_template_type);
                        }
                        return;
                    default:
                        diagnostic = noImplicitAny ? Diagnostics.Variable_0_implicitly_has_an_1_type : Diagnostics.Variable_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage;
                }
                errorOrSuggestion(noImplicitAny, declaration, diagnostic, declarationNameToString(getNameOfDeclaration(declaration)), typeAsString);
            }
                function inferFromTypes(source, target) {
                    if (!couldContainTypeVariables(target)) {
                        return;
                    }
                    if (source === wildcardType) {
                        const savePropagationType = propagationType;
                        propagationType = source;
                        inferFromTypes(target, target);
                        propagationType = savePropagationType;
                        return;
                    }
                    if (source.aliasSymbol && source.aliasSymbol === target.aliasSymbol) {
                        if (source.aliasTypeArguments) {
                            const params = getSymbolLinks(source.aliasSymbol).typeParameters;
                            const minParams = getMinTypeArgumentCount(params);
                            const sourceTypes = fillMissingTypeArguments(source.aliasTypeArguments, params, minParams, isInJSFile(source.aliasSymbol.valueDeclaration));
                            const targetTypes = fillMissingTypeArguments(target.aliasTypeArguments, params, minParams, isInJSFile(source.aliasSymbol.valueDeclaration));
                            inferFromTypeArguments(sourceTypes, targetTypes, getAliasVariances(source.aliasSymbol));
                        }
                        return;
                    }
                    if (source === target && source.flags & 3145728 /* UnionOrIntersection */) {
                        for (const t of source.types) {
                            inferFromTypes(t, t);
                        }
                        return;
                    }
                    if (target.flags & 1048576 /* Union */) {
                        const [tempSources, tempTargets] = inferFromMatchingTypes(source.flags & 1048576 /* Union */ ? source.types : [source], target.types, isTypeOrBaseIdenticalTo);
                        const [sources, targets] = inferFromMatchingTypes(tempSources, tempTargets, isTypeCloselyMatchedBy);
                        if (targets.length === 0) {
                            return;
                        }
                        target = getUnionType(targets);
                        if (sources.length === 0) {
                            inferWithPriority(source, target, 1 /* NakedTypeVariable */);
                            return;
                        }
                        source = getUnionType(sources);
                    }
                    else if (target.flags & 2097152 /* Intersection */ && !every(target.types, isNonGenericObjectType)) {
                        if (!(source.flags & 1048576 /* Union */)) {
                            const [sources, targets] = inferFromMatchingTypes(source.flags & 2097152 /* Intersection */ ? source.types : [source], target.types, isTypeIdenticalTo);
                            if (sources.length === 0 || targets.length === 0) {
                                return;
                            }
                            source = getIntersectionType(sources);
                            target = getIntersectionType(targets);
                        }
                    }
                    else if (target.flags & (8388608 /* IndexedAccess */ | 33554432 /* Substitution */)) {
                        target = getActualTypeVariable(target);
                    }
                    if (target.flags & 8650752 /* TypeVariable */) {
                        if (isFromInferenceBlockedSource(source)) {
                            return;
                        }
                        const inference = getInferenceInfoForType(target);
                        if (inference) {
                            if (getObjectFlags(source) & 262144 /* NonInferrableType */ || source === nonInferrableAnyType) {
                                return;
                            }
                            if (!inference.isFixed) {
                                if (inference.priority === void 0 || priority < inference.priority) {
                                    inference.candidates = void 0;
                                    inference.contraCandidates = void 0;
                                    inference.topLevel = true;
                                    inference.priority = priority;
                                }
                                if (priority === inference.priority) {
                                    const candidate = propagationType || source;
                                    if (contravariant && !bivariant) {
                                        if (!contains(inference.contraCandidates, candidate)) {
                                            inference.contraCandidates = append(inference.contraCandidates, candidate);
                                            clearCachedInferences(inferences);
                                        }
                                    }
                                    else if (!contains(inference.candidates, candidate)) {
                                        inference.candidates = append(inference.candidates, candidate);
                                        clearCachedInferences(inferences);
                                    }
                                }
                                if (!(priority & 128 /* ReturnType */) && target.flags & 262144 /* TypeParameter */ && inference.topLevel && !isTypeParameterAtTopLevel(originalTarget, target)) {
                                    inference.topLevel = false;
                                    clearCachedInferences(inferences);
                                }
                            }
                            inferencePriority = Math.min(inferencePriority, priority);
                            return;
                        }
                        const simplified = getSimplifiedType(target, 
                        /*writing*/
                        false);
                        if (simplified !== target) {
                            inferFromTypes(source, simplified);
                        }
                        else if (target.flags & 8388608 /* IndexedAccess */) {
                            const indexType = getSimplifiedType(target.indexType, 
                            /*writing*/
                            false);
                            if (indexType.flags & 465829888 /* Instantiable */) {
                                const simplified2 = distributeIndexOverObjectType(getSimplifiedType(target.objectType, 
                                /*writing*/
                                false), indexType, 
                                /*writing*/
                                false);
                                if (simplified2 && simplified2 !== target) {
                                    inferFromTypes(source, simplified2);
                                }
                            }
                        }
                    }
                    if (getObjectFlags(source) & 4 /* Reference */ && getObjectFlags(target) & 4 /* Reference */ && (source.target === target.target || isArrayType(source) && isArrayType(target)) && !(source.node && target.node)) {
                        inferFromTypeArguments(getTypeArguments(source), getTypeArguments(target), getVariances(source.target));
                    }
                    else if (source.flags & 4194304 /* Index */ && target.flags & 4194304 /* Index */) {
                        inferFromContravariantTypes(source.type, target.type);
                    }
                    else if ((isLiteralType(source) || source.flags & 4 /* String */) && target.flags & 4194304 /* Index */) {
                        const empty = createEmptyObjectTypeFromStringLiteral(source);
                        inferFromContravariantTypesWithPriority(empty, target.type, 256 /* LiteralKeyof */);
                    }
                    else if (source.flags & 8388608 /* IndexedAccess */ && target.flags & 8388608 /* IndexedAccess */) {
                        inferFromTypes(source.objectType, target.objectType);
                        inferFromTypes(source.indexType, target.indexType);
                    }
                    else if (source.flags & 268435456 /* StringMapping */ && target.flags & 268435456 /* StringMapping */) {
                        if (source.symbol === target.symbol) {
                            inferFromTypes(source.type, target.type);
                        }
                    }
                    else if (source.flags & 33554432 /* Substitution */) {
                        inferFromTypes(source.baseType, target);
                        inferWithPriority(getSubstitutionIntersection(source), target, 4 /* SubstituteSource */);
                    }
                    else if (target.flags & 16777216 /* Conditional */) {
                        invokeOnce(source, target, inferToConditionalType);
                    }
                    else if (target.flags & 3145728 /* UnionOrIntersection */) {
                        inferToMultipleTypes(source, target.types, target.flags);
                    }
                    else if (source.flags & 1048576 /* Union */) {
                        const sourceTypes = source.types;
                        for (const sourceType of sourceTypes) {
                            inferFromTypes(sourceType, target);
                        }
                    }
                    else if (target.flags & 134217728 /* TemplateLiteral */) {
                        inferToTemplateLiteralType(source, target);
                    }
                    else {
                        source = getReducedType(source);
                        if (!(priority & 512 /* NoConstraints */ && source.flags & (2097152 /* Intersection */ | 465829888 /* Instantiable */))) {
                            const apparentSource = getApparentType(source);
                            if (apparentSource !== source && allowComplexConstraintInference && !(apparentSource.flags & (524288 /* Object */ | 2097152 /* Intersection */))) {
                                allowComplexConstraintInference = false;
                                return inferFromTypes(apparentSource, target);
                            }
                            source = apparentSource;
                        }
                        if (source.flags & (524288 /* Object */ | 2097152 /* Intersection */)) {
                            invokeOnce(source, target, inferFromObjectTypes);
                        }
                    }
                }
                                        const matchingType = reduceLeft(constraintTypes, (left, right) => !(right.flags & allTypeFlags) ? left : left.flags & 4 /* String */ ? left : right.flags & 4 /* String */ ? source2 : left.flags & 134217728 /* TemplateLiteral */ ? left : right.flags & 134217728 /* TemplateLiteral */ && isTypeMatchedByTemplateLiteralType(source2, right) ? source2 : left.flags & 268435456 /* StringMapping */ ? left : right.flags & 268435456 /* StringMapping */ && str === applyStringMapping(right.symbol, str) ? source2 : left.flags & 128 /* StringLiteral */ ? left : right.flags & 128 /* StringLiteral */ && right.value === str ? right : left.flags & 8 /* Number */ ? left : right.flags & 8 /* Number */ ? getNumberLiteralType(+str) : left.flags & 32 /* Enum */ ? left : right.flags & 32 /* Enum */ ? getNumberLiteralType(+str) : left.flags & 256 /* NumberLiteral */ ? left : right.flags & 256 /* NumberLiteral */ && right.value === +str ? right : left.flags & 64 /* BigInt */ ? left : right.flags & 64 /* BigInt */ ? parseBigIntLiteralType(str) : left.flags & 2048 /* BigIntLiteral */ ? left : right.flags & 2048 /* BigIntLiteral */ && pseudoBigIntToString(right.value) === str ? right : left.flags & 16 /* Boolean */ ? left : right.flags & 16 /* Boolean */ ? str === "true" ? trueType : str === "false" ? falseType : booleanType : left.flags & 512 /* BooleanLiteral */ ? left : right.flags & 512 /* BooleanLiteral */ && right.intrinsicName === str ? right : left.flags & 32768 /* Undefined */ ? left : right.flags & 32768 /* Undefined */ && right.intrinsicName === str ? right : left.flags & 65536 /* Null */ ? left : right.flags & 65536 /* Null */ && right.intrinsicName === str ? right : left, neverType);
                function inferFromObjectTypes(source, target) {
                    var _a2, _b;
                    if (getObjectFlags(source) & 4 /* Reference */ && getObjectFlags(target) & 4 /* Reference */ && (source.target === target.target || isArrayType(source) && isArrayType(target))) {
                        inferFromTypeArguments(getTypeArguments(source), getTypeArguments(target), getVariances(source.target));
                        return;
                    }
                    if (isGenericMappedType(source) && isGenericMappedType(target)) {
                        inferFromTypes(getConstraintTypeFromMappedType(source), getConstraintTypeFromMappedType(target));
                        inferFromTypes(getTemplateTypeFromMappedType(source), getTemplateTypeFromMappedType(target));
                        const sourceNameType = getNameTypeFromMappedType(source);
                        const targetNameType = getNameTypeFromMappedType(target);
                        if (sourceNameType && targetNameType)
                            inferFromTypes(sourceNameType, targetNameType);
                    }
                    if (getObjectFlags(target) & 32 /* Mapped */ && !target.declaration.nameType) {
                        const constraintType = getConstraintTypeFromMappedType(target);
                        if (inferToMappedType(source, target, constraintType)) {
                            return;
                        }
                    }
                    if (!typesDefinitelyUnrelated(source, target)) {
                        if (isArrayOrTupleType(source)) {
                            if (isTupleType(target)) {
                                const sourceArity = getTypeReferenceArity(source);
                                const targetArity = getTypeReferenceArity(target);
                                const elementTypes = getTypeArguments(target);
                                const elementFlags = target.target.elementFlags;
                                if (isTupleType(source) && isTupleTypeStructureMatching(source, target)) {
                                    for (let i = 0; i < targetArity; i++) {
                                        inferFromTypes(getTypeArguments(source)[i], elementTypes[i]);
                                    }
                                    return;
                                }
                                const startLength = isTupleType(source) ? Math.min(source.target.fixedLength, target.target.fixedLength) : 0;
                                const endLength = Math.min(isTupleType(source) ? getEndElementCount(source.target, 3 /* Fixed */) : 0, target.target.hasRestElement ? getEndElementCount(target.target, 3 /* Fixed */) : 0);
                                for (let i = 0; i < startLength; i++) {
                                    inferFromTypes(getTypeArguments(source)[i], elementTypes[i]);
                                }
                                if (!isTupleType(source) || sourceArity - startLength - endLength === 1 && source.target.elementFlags[startLength] & 4 /* Rest */) {
                                    const restType = getTypeArguments(source)[startLength];
                                    for (let i = startLength; i < targetArity - endLength; i++) {
                                        inferFromTypes(elementFlags[i] & 8 /* Variadic */ ? createArrayType(restType) : restType, elementTypes[i]);
                                    }
                                }
                                else {
                                    const middleLength = targetArity - startLength - endLength;
                                    if (middleLength === 2) {
                                        if (elementFlags[startLength] & elementFlags[startLength + 1] & 8 /* Variadic */) {
                                            const targetInfo = getInferenceInfoForType(elementTypes[startLength]);
                                            if (targetInfo && targetInfo.impliedArity !== void 0) {
                                                inferFromTypes(sliceTupleType(source, startLength, endLength + sourceArity - targetInfo.impliedArity), elementTypes[startLength]);
                                                inferFromTypes(sliceTupleType(source, startLength + targetInfo.impliedArity, endLength), elementTypes[startLength + 1]);
                                            }
                                        }
                                        else if (elementFlags[startLength] & 8 /* Variadic */ && elementFlags[startLength + 1] & 4 /* Rest */) {
                                            const param = (_a2 = getInferenceInfoForType(elementTypes[startLength])) == null ? void 0 : _a2.typeParameter;
                                            const constraint = param && getBaseConstraintOfType(param);
                                            if (constraint && isTupleType(constraint) && !constraint.target.hasRestElement) {
                                                const impliedArity = constraint.target.fixedLength;
                                                inferFromTypes(sliceTupleType(source, startLength, sourceArity - (startLength + impliedArity)), elementTypes[startLength]);
                                                inferFromTypes(getElementTypeOfSliceOfTupleType(source, startLength + impliedArity, endLength), elementTypes[startLength + 1]);
                                            }
                                        }
                                        else if (elementFlags[startLength] & 4 /* Rest */ && elementFlags[startLength + 1] & 8 /* Variadic */) {
                                            const param = (_b = getInferenceInfoForType(elementTypes[startLength + 1])) == null ? void 0 : _b.typeParameter;
                                            const constraint = param && getBaseConstraintOfType(param);
                                            if (constraint && isTupleType(constraint) && !constraint.target.hasRestElement) {
                                                const impliedArity = constraint.target.fixedLength;
                                                const endIndex = sourceArity - getEndElementCount(target.target, 3 /* Fixed */);
                                                const startIndex = endIndex - impliedArity;
                                                const trailingSlice = createTupleType(getTypeArguments(source).slice(startIndex, endIndex), source.target.elementFlags.slice(startIndex, endIndex), 
                                                /*readonly*/
                                                false, source.target.labeledElementDeclarations && source.target.labeledElementDeclarations.slice(startIndex, endIndex));
                                                inferFromTypes(getElementTypeOfSliceOfTupleType(source, startLength, endLength + impliedArity), elementTypes[startLength]);
                                                inferFromTypes(trailingSlice, elementTypes[startLength + 1]);
                                            }
                                        }
                                    }
                                    else if (middleLength === 1 && elementFlags[startLength] & 8 /* Variadic */) {
                                        const endsInOptional = target.target.elementFlags[targetArity - 1] & 2 /* Optional */;
                                        const sourceSlice = sliceTupleType(source, startLength, endLength);
                                        inferWithPriority(sourceSlice, elementTypes[startLength], endsInOptional ? 2 /* SpeculativeTuple */ : 0);
                                    }
                                    else if (middleLength === 1 && elementFlags[startLength] & 4 /* Rest */) {
                                        const restType = getElementTypeOfSliceOfTupleType(source, startLength, endLength);
                                        if (restType) {
                                            inferFromTypes(restType, elementTypes[startLength]);
                                        }
                                    }
                                }
                                for (let i = 0; i < endLength; i++) {
                                    inferFromTypes(getTypeArguments(source)[sourceArity - i - 1], elementTypes[targetArity - i - 1]);
                                }
                                return;
                            }
                            if (isArrayType(target)) {
                                inferFromIndexTypes(source, target);
                                return;
                            }
                        }
                        inferFromProperties(source, target);
                        inferFromSignatures(source, target, 0 /* Call */);
                        inferFromSignatures(source, target, 1 /* Construct */);
                        inferFromIndexTypes(source, target);
                    }
                }
            function getCannotFindNameDiagnosticForName(node) {
                switch (node.escapedText) {
                    case "document":
                    case "console":
                        return Diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_include_dom;
                    case "$":
                        return compilerOptions.types ? Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery_and_then_add_jquery_to_the_types_field_in_your_tsconfig : Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery;
                    case "describe":
                    case "suite":
                    case "it":
                    case "test":
                        return compilerOptions.types ? Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha_and_then_add_jest_or_mocha_to_the_types_field_in_your_tsconfig : Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha;
                    case "process":
                    case "require":
                    case "Buffer":
                    case "module":
                        return compilerOptions.types ? Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode_and_then_add_node_to_the_types_field_in_your_tsconfig : Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode;
                    case "Map":
                    case "Set":
                    case "Promise":
                    case "Symbol":
                    case "WeakMap":
                    case "WeakSet":
                    case "Iterator":
                    case "AsyncIterator":
                    case "SharedArrayBuffer":
                    case "Atomics":
                    case "AsyncIterable":
                    case "AsyncIterableIterator":
                    case "AsyncGenerator":
                    case "AsyncGeneratorFunction":
                    case "BigInt":
                    case "Reflect":
                    case "BigInt64Array":
                    case "BigUint64Array":
                        return Diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_1_or_later;
                    case "await":
                        if (isCallExpression(node.parent)) {
                            return Diagnostics.Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function;
                        }
                    default:
                        if (node.parent.kind === 300 /* ShorthandPropertyAssignment */) {
                            return Diagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer;
                        }
                        else {
                            return Diagnostics.Cannot_find_name_0;
                        }
                }
            }
            function getFlowCacheKey(node, declaredType, initialType, flowContainer) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        if (!isThisInTypeQuery(node)) {
                            const symbol = getResolvedSymbol(node);
                            return symbol !== unknownSymbol ? `${flowContainer ? getNodeId(flowContainer) : "-1"}|${getTypeId(declaredType)}|${getTypeId(initialType)}|${getSymbolId(symbol)}` : void 0;
                        }
                    case 108 /* ThisKeyword */:
                        return `0|${flowContainer ? getNodeId(flowContainer) : "-1"}|${getTypeId(declaredType)}|${getTypeId(initialType)}`;
                    case 232 /* NonNullExpression */:
                    case 214 /* ParenthesizedExpression */:
                        return getFlowCacheKey(node.expression, declaredType, initialType, flowContainer);
                    case 163 /* QualifiedName */:
                        const left = getFlowCacheKey(node.left, declaredType, initialType, flowContainer);
                        return left && left + "." + node.right.escapedText;
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        const propName = getAccessedPropertyName(node);
                        if (propName !== void 0) {
                            const key = getFlowCacheKey(node.expression, declaredType, initialType, flowContainer);
                            return key && key + "." + propName;
                        }
                        break;
                    case 203 /* ObjectBindingPattern */:
                    case 204 /* ArrayBindingPattern */:
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                    case 171 /* MethodDeclaration */:
                        return `${getNodeId(node)}#${getTypeId(declaredType)}`;
                }
                return void 0;
            }
            function isMatchingReference(source, target) {
                switch (target.kind) {
                    case 214 /* ParenthesizedExpression */:
                    case 232 /* NonNullExpression */:
                        return isMatchingReference(source, target.expression);
                    case 223 /* BinaryExpression */:
                        return isAssignmentExpression(target) && isMatchingReference(source, target.left) || isBinaryExpression(target) && target.operatorToken.kind === 27 /* CommaToken */ && isMatchingReference(source, target.right);
                }
                switch (source.kind) {
                    case 233 /* MetaProperty */:
                        return target.kind === 233 /* MetaProperty */ && source.keywordToken === target.keywordToken && source.name.escapedText === target.name.escapedText;
                    case 79 /* Identifier */:
                    case 80 /* PrivateIdentifier */:
                        return isThisInTypeQuery(source) ? target.kind === 108 /* ThisKeyword */ : target.kind === 79 /* Identifier */ && getResolvedSymbol(source) === getResolvedSymbol(target) || (isVariableDeclaration(target) || isBindingElement(target)) && getExportSymbolOfValueSymbolIfExported(getResolvedSymbol(source)) === getSymbolOfDeclaration(target);
                    case 108 /* ThisKeyword */:
                        return target.kind === 108 /* ThisKeyword */;
                    case 106 /* SuperKeyword */:
                        return target.kind === 106 /* SuperKeyword */;
                    case 232 /* NonNullExpression */:
                    case 214 /* ParenthesizedExpression */:
                        return isMatchingReference(source.expression, target);
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        const sourcePropertyName = getAccessedPropertyName(source);
                        const targetPropertyName = isAccessExpression(target) ? getAccessedPropertyName(target) : void 0;
                        return sourcePropertyName !== void 0 && targetPropertyName !== void 0 && targetPropertyName === sourcePropertyName && isMatchingReference(source.expression, target.expression);
                    case 163 /* QualifiedName */:
                        return isAccessExpression(target) && source.right.escapedText === getAccessedPropertyName(target) && isMatchingReference(source.left, target.expression);
                    case 223 /* BinaryExpression */:
                        return isBinaryExpression(source) && source.operatorToken.kind === 27 /* CommaToken */ && isMatchingReference(source.right, target);
                }
                return false;
            }
            function getTypeFacts(type) {
                if (type.flags & (2097152 /* Intersection */ | 465829888 /* Instantiable */)) {
                    type = getBaseConstraintOfType(type) || unknownType;
                }
                const flags = type.flags;
                if (flags & (4 /* String */ | 268435456 /* StringMapping */)) {
                    return strictNullChecks ? 16317953 /* StringStrictFacts */ : 16776705 /* StringFacts */;
                }
                if (flags & (128 /* StringLiteral */ | 134217728 /* TemplateLiteral */)) {
                    const isEmpty = flags & 128 /* StringLiteral */ && type.value === "";
                    return strictNullChecks ? isEmpty ? 12123649 /* EmptyStringStrictFacts */ : 7929345 /* NonEmptyStringStrictFacts */ : isEmpty ? 12582401 /* EmptyStringFacts */ : 16776705 /* NonEmptyStringFacts */;
                }
                if (flags & (8 /* Number */ | 32 /* Enum */)) {
                    return strictNullChecks ? 16317698 /* NumberStrictFacts */ : 16776450 /* NumberFacts */;
                }
                if (flags & 256 /* NumberLiteral */) {
                    const isZero = type.value === 0;
                    return strictNullChecks ? isZero ? 12123394 /* ZeroNumberStrictFacts */ : 7929090 /* NonZeroNumberStrictFacts */ : isZero ? 12582146 /* ZeroNumberFacts */ : 16776450 /* NonZeroNumberFacts */;
                }
                if (flags & 64 /* BigInt */) {
                    return strictNullChecks ? 16317188 /* BigIntStrictFacts */ : 16775940 /* BigIntFacts */;
                }
                if (flags & 2048 /* BigIntLiteral */) {
                    const isZero = isZeroBigInt(type);
                    return strictNullChecks ? isZero ? 12122884 /* ZeroBigIntStrictFacts */ : 7928580 /* NonZeroBigIntStrictFacts */ : isZero ? 12581636 /* ZeroBigIntFacts */ : 16775940 /* NonZeroBigIntFacts */;
                }
                if (flags & 16 /* Boolean */) {
                    return strictNullChecks ? 16316168 /* BooleanStrictFacts */ : 16774920 /* BooleanFacts */;
                }
                if (flags & 528 /* BooleanLike */) {
                    return strictNullChecks ? type === falseType || type === regularFalseType ? 12121864 /* FalseStrictFacts */ : 7927560 /* TrueStrictFacts */ : type === falseType || type === regularFalseType ? 12580616 /* FalseFacts */ : 16774920 /* TrueFacts */;
                }
                if (flags & 524288 /* Object */) {
                    return getObjectFlags(type) & 16 /* Anonymous */ && isEmptyObjectType(type) ? strictNullChecks ? 83427327 /* EmptyObjectStrictFacts */ : 83886079 /* EmptyObjectFacts */ : isFunctionObjectType(type) ? strictNullChecks ? 7880640 /* FunctionStrictFacts */ : 16728e3 /* FunctionFacts */ : strictNullChecks ? 7888800 /* ObjectStrictFacts */ : 16736160 /* ObjectFacts */;
                }
                if (flags & 16384 /* Void */) {
                    return 9830144 /* VoidFacts */;
                }
                if (flags & 32768 /* Undefined */) {
                    return 26607360 /* UndefinedFacts */;
                }
                if (flags & 65536 /* Null */) {
                    return 42917664 /* NullFacts */;
                }
                if (flags & 12288 /* ESSymbolLike */) {
                    return strictNullChecks ? 7925520 /* SymbolStrictFacts */ : 16772880 /* SymbolFacts */;
                }
                if (flags & 67108864 /* NonPrimitive */) {
                    return strictNullChecks ? 7888800 /* ObjectStrictFacts */ : 16736160 /* ObjectFacts */;
                }
                if (flags & 131072 /* Never */) {
                    return 0 /* None */;
                }
                if (flags & 1048576 /* Union */) {
                    return reduceLeft(type.types, (facts, t) => facts | getTypeFacts(t), 0 /* None */);
                }
                if (flags & 2097152 /* Intersection */) {
                    return getIntersectionTypeFacts(type);
                }
                return 83886079 /* UnknownFacts */;
            }
            function isReachableFlowNodeWorker(flow, noCacheCheck) {
                while (true) {
                    if (flow === lastFlowNode) {
                        return lastFlowNodeReachable;
                    }
                    const flags = flow.flags;
                    if (flags & 4096 /* Shared */) {
                        if (!noCacheCheck) {
                            const id = getFlowNodeId(flow);
                            const reachable = flowNodeReachable[id];
                            return reachable !== void 0 ? reachable : flowNodeReachable[id] = isReachableFlowNodeWorker(flow, 
                            /*noCacheCheck*/
                            true);
                        }
                        noCacheCheck = false;
                    }
                    if (flags & (16 /* Assignment */ | 96 /* Condition */ | 256 /* ArrayMutation */)) {
                        flow = flow.antecedent;
                    }
                    else if (flags & 512 /* Call */) {
                        const signature = getEffectsSignature(flow.node);
                        if (signature) {
                            const predicate = getTypePredicateOfSignature(signature);
                            if (predicate && predicate.kind === 3 /* AssertsIdentifier */ && !predicate.type) {
                                const predicateArgument = flow.node.arguments[predicate.parameterIndex];
                                if (predicateArgument && isFalseExpression(predicateArgument)) {
                                    return false;
                                }
                            }
                            if (getReturnTypeOfSignature(signature).flags & 131072 /* Never */) {
                                return false;
                            }
                        }
                        flow = flow.antecedent;
                    }
                    else if (flags & 4 /* BranchLabel */) {
                        return some(flow.antecedents, (f) => isReachableFlowNodeWorker(f, 
                        /*noCacheCheck*/
                        false));
                    }
                    else if (flags & 8 /* LoopLabel */) {
                        const antecedents = flow.antecedents;
                        if (antecedents === void 0 || antecedents.length === 0) {
                            return false;
                        }
                        flow = antecedents[0];
                    }
                    else if (flags & 128 /* SwitchClause */) {
                        if (flow.clauseStart === flow.clauseEnd && isExhaustiveSwitchStatement(flow.switchStatement)) {
                            return false;
                        }
                        flow = flow.antecedent;
                    }
                    else if (flags & 1024 /* ReduceLabel */) {
                        lastFlowNode = void 0;
                        const target = flow.target;
                        const saveAntecedents = target.antecedents;
                        target.antecedents = flow.antecedents;
                        const result = isReachableFlowNodeWorker(flow.antecedent, 
                        /*noCacheCheck*/
                        false);
                        target.antecedents = saveAntecedents;
                        return result;
                    }
                    else {
                        return !(flags & 1 /* Unreachable */);
                    }
                }
            }
                function getTypeAtFlowNode(flow) {
                    var _a3;
                    if (flowDepth === 2e3) {
                        (_a3 = tracing) == null ? void 0 : _a3.instant(tracing.Phase.CheckTypes, "getTypeAtFlowNode_DepthLimit", { flowId: flow.id });
                        flowAnalysisDisabled = true;
                        reportFlowControlError(reference);
                        return errorType;
                    }
                    flowDepth++;
                    let sharedFlow;
                    while (true) {
                        const flags = flow.flags;
                        if (flags & 4096 /* Shared */) {
                            for (let i = sharedFlowStart; i < sharedFlowCount; i++) {
                                if (sharedFlowNodes[i] === flow) {
                                    flowDepth--;
                                    return sharedFlowTypes[i];
                                }
                            }
                            sharedFlow = flow;
                        }
                        let type;
                        if (flags & 16 /* Assignment */) {
                            type = getTypeAtFlowAssignment(flow);
                            if (!type) {
                                flow = flow.antecedent;
                                continue;
                            }
                        }
                        else if (flags & 512 /* Call */) {
                            type = getTypeAtFlowCall(flow);
                            if (!type) {
                                flow = flow.antecedent;
                                continue;
                            }
                        }
                        else if (flags & 96 /* Condition */) {
                            type = getTypeAtFlowCondition(flow);
                        }
                        else if (flags & 128 /* SwitchClause */) {
                            type = getTypeAtSwitchClause(flow);
                        }
                        else if (flags & 12 /* Label */) {
                            if (flow.antecedents.length === 1) {
                                flow = flow.antecedents[0];
                                continue;
                            }
                            type = flags & 4 /* BranchLabel */ ? getTypeAtFlowBranchLabel(flow) : getTypeAtFlowLoopLabel(flow);
                        }
                        else if (flags & 256 /* ArrayMutation */) {
                            type = getTypeAtFlowArrayMutation(flow);
                            if (!type) {
                                flow = flow.antecedent;
                                continue;
                            }
                        }
                        else if (flags & 1024 /* ReduceLabel */) {
                            const target = flow.target;
                            const saveAntecedents = target.antecedents;
                            target.antecedents = flow.antecedents;
                            type = getTypeAtFlowNode(flow.antecedent);
                            target.antecedents = saveAntecedents;
                        }
                        else if (flags & 2 /* Start */) {
                            const container = flow.node;
                            if (container && container !== flowContainer && reference.kind !== 208 /* PropertyAccessExpression */ && reference.kind !== 209 /* ElementAccessExpression */ && reference.kind !== 108 /* ThisKeyword */) {
                                flow = container.flowNode;
                                continue;
                            }
                            type = initialType;
                        }
                        else {
                            type = convertAutoToAny(declaredType);
                        }
                        if (sharedFlow) {
                            sharedFlowNodes[sharedFlowCount] = sharedFlow;
                            sharedFlowTypes[sharedFlowCount] = type;
                            sharedFlowCount++;
                        }
                        flowDepth--;
                        return type;
                    }
                }
                function getTypeAtFlowAssignment(flow) {
                    const node = flow.node;
                    if (isMatchingReference(reference, node)) {
                        if (!isReachableFlowNode(flow)) {
                            return unreachableNeverType;
                        }
                        if (getAssignmentTargetKind(node) === 2 /* Compound */) {
                            const flowType = getTypeAtFlowNode(flow.antecedent);
                            return createFlowType(getBaseTypeOfLiteralType(getTypeFromFlowType(flowType)), isIncomplete(flowType));
                        }
                        if (declaredType === autoType || declaredType === autoArrayType) {
                            if (isEmptyArrayAssignment(node)) {
                                return getEvolvingArrayType(neverType);
                            }
                            const assignedType = getWidenedLiteralType(getInitialOrAssignedType(flow));
                            return isTypeAssignableTo(assignedType, declaredType) ? assignedType : anyArrayType;
                        }
                        if (declaredType.flags & 1048576 /* Union */) {
                            return getAssignmentReducedType(declaredType, getInitialOrAssignedType(flow));
                        }
                        return declaredType;
                    }
                    if (containsMatchingReference(reference, node)) {
                        if (!isReachableFlowNode(flow)) {
                            return unreachableNeverType;
                        }
                        if (isVariableDeclaration(node) && (isInJSFile(node) || isVarConst(node))) {
                            const init = getDeclaredExpandoInitializer(node);
                            if (init && (init.kind === 215 /* FunctionExpression */ || init.kind === 216 /* ArrowFunction */)) {
                                return getTypeAtFlowNode(flow.antecedent);
                            }
                        }
                        return declaredType;
                    }
                    if (isVariableDeclaration(node) && node.parent.parent.kind === 246 /* ForInStatement */ && (isMatchingReference(reference, node.parent.parent.expression) || optionalChainContainsReference(node.parent.parent.expression, reference))) {
                        return getNonNullableTypeIfNeeded(finalizeEvolvingArrayType(getTypeFromFlowType(getTypeAtFlowNode(flow.antecedent))));
                    }
                    return void 0;
                }
                function getCandidateDiscriminantPropertyAccess(expr) {
                    if (isBindingPattern(reference) || isFunctionExpressionOrArrowFunction(reference) || isObjectLiteralMethod(reference)) {
                        if (isIdentifier(expr)) {
                            const symbol = getResolvedSymbol(expr);
                            const declaration = symbol.valueDeclaration;
                            if (declaration && (isBindingElement(declaration) || isParameter(declaration)) && reference === declaration.parent && !declaration.initializer && !declaration.dotDotDotToken) {
                                return declaration;
                            }
                        }
                    }
                    else if (isAccessExpression(expr)) {
                        if (isMatchingReference(reference, expr.expression)) {
                            return expr;
                        }
                    }
                    else if (isIdentifier(expr)) {
                        const symbol = getResolvedSymbol(expr);
                        if (isConstVariable(symbol)) {
                            const declaration = symbol.valueDeclaration;
                            if (isVariableDeclaration(declaration) && !declaration.type && declaration.initializer && isAccessExpression(declaration.initializer) && isMatchingReference(reference, declaration.initializer.expression)) {
                                return declaration.initializer;
                            }
                            if (isBindingElement(declaration) && !declaration.initializer) {
                                const parent2 = declaration.parent.parent;
                                if (isVariableDeclaration(parent2) && !parent2.type && parent2.initializer && (isIdentifier(parent2.initializer) || isAccessExpression(parent2.initializer)) && isMatchingReference(reference, parent2.initializer)) {
                                    return declaration;
                                }
                            }
                        }
                    }
                    return void 0;
                }
                function narrowTypeByBinaryExpression(type, expr, assumeTrue) {
                    switch (expr.operatorToken.kind) {
                        case 63 /* EqualsToken */:
                        case 75 /* BarBarEqualsToken */:
                        case 76 /* AmpersandAmpersandEqualsToken */:
                        case 77 /* QuestionQuestionEqualsToken */:
                            return narrowTypeByTruthiness(narrowType(type, expr.right, assumeTrue), expr.left, assumeTrue);
                        case 34 /* EqualsEqualsToken */:
                        case 35 /* ExclamationEqualsToken */:
                        case 36 /* EqualsEqualsEqualsToken */:
                        case 37 /* ExclamationEqualsEqualsToken */:
                            const operator = expr.operatorToken.kind;
                            const left = getReferenceCandidate(expr.left);
                            const right = getReferenceCandidate(expr.right);
                            if (left.kind === 218 /* TypeOfExpression */ && isStringLiteralLike(right)) {
                                return narrowTypeByTypeof(type, left, operator, right, assumeTrue);
                            }
                            if (right.kind === 218 /* TypeOfExpression */ && isStringLiteralLike(left)) {
                                return narrowTypeByTypeof(type, right, operator, left, assumeTrue);
                            }
                            if (isMatchingReference(reference, left)) {
                                return narrowTypeByEquality(type, operator, right, assumeTrue);
                            }
                            if (isMatchingReference(reference, right)) {
                                return narrowTypeByEquality(type, operator, left, assumeTrue);
                            }
                            if (strictNullChecks) {
                                if (optionalChainContainsReference(left, reference)) {
                                    type = narrowTypeByOptionalChainContainment(type, operator, right, assumeTrue);
                                }
                                else if (optionalChainContainsReference(right, reference)) {
                                    type = narrowTypeByOptionalChainContainment(type, operator, left, assumeTrue);
                                }
                            }
                            const leftAccess = getDiscriminantPropertyAccess(left, type);
                            if (leftAccess) {
                                return narrowTypeByDiscriminantProperty(type, leftAccess, operator, right, assumeTrue);
                            }
                            const rightAccess = getDiscriminantPropertyAccess(right, type);
                            if (rightAccess) {
                                return narrowTypeByDiscriminantProperty(type, rightAccess, operator, left, assumeTrue);
                            }
                            if (isMatchingConstructorReference(left)) {
                                return narrowTypeByConstructor(type, operator, right, assumeTrue);
                            }
                            if (isMatchingConstructorReference(right)) {
                                return narrowTypeByConstructor(type, operator, left, assumeTrue);
                            }
                            break;
                        case 102 /* InstanceOfKeyword */:
                            return narrowTypeByInstanceof(type, expr, assumeTrue);
                        case 101 /* InKeyword */:
                            if (isPrivateIdentifier(expr.left)) {
                                return narrowTypeByPrivateIdentifierInInExpression(type, expr, assumeTrue);
                            }
                            const target = getReferenceCandidate(expr.right);
                            const leftType = getTypeOfExpression(expr.left);
                            if (leftType.flags & 8576 /* StringOrNumberLiteralOrUnique */) {
                                if (containsMissingType(type) && isAccessExpression(reference) && isMatchingReference(reference.expression, target) && getAccessedPropertyName(reference) === getPropertyNameFromType(leftType)) {
                                    return getTypeWithFacts(type, assumeTrue ? 524288 /* NEUndefined */ : 65536 /* EQUndefined */);
                                }
                                if (isMatchingReference(reference, target)) {
                                    return narrowTypeByInKeyword(type, leftType, assumeTrue);
                                }
                            }
                            break;
                        case 27 /* CommaToken */:
                            return narrowType(type, expr.right, assumeTrue);
                        case 55 /* AmpersandAmpersandToken */:
                            return assumeTrue ? narrowType(narrowType(type, expr.left, 
                            /*assumeTrue*/
                            true), expr.right, 
                            /*assumeTrue*/
                            true) : getUnionType([narrowType(type, expr.left, 
                                /*assumeTrue*/
                                false), narrowType(type, expr.right, 
                                /*assumeTrue*/
                                false)]);
                        case 56 /* BarBarToken */:
                            return assumeTrue ? getUnionType([narrowType(type, expr.left, 
                                /*assumeTrue*/
                                true), narrowType(type, expr.right, 
                                /*assumeTrue*/
                                true)]) : narrowType(narrowType(type, expr.left, 
                            /*assumeTrue*/
                            false), expr.right, 
                            /*assumeTrue*/
                            false);
                    }
                    return type;
                }
                function narrowType(type, expr, assumeTrue) {
                    if (isExpressionOfOptionalChainRoot(expr) || isBinaryExpression(expr.parent) && (expr.parent.operatorToken.kind === 60 /* QuestionQuestionToken */ || expr.parent.operatorToken.kind === 77 /* QuestionQuestionEqualsToken */) && expr.parent.left === expr) {
                        return narrowTypeByOptionality(type, expr, assumeTrue);
                    }
                    switch (expr.kind) {
                        case 79 /* Identifier */:
                            if (!isMatchingReference(reference, expr) && inlineLevel < 5) {
                                const symbol = getResolvedSymbol(expr);
                                if (isConstVariable(symbol)) {
                                    const declaration = symbol.valueDeclaration;
                                    if (declaration && isVariableDeclaration(declaration) && !declaration.type && declaration.initializer && isConstantReference(reference)) {
                                        inlineLevel++;
                                        const result = narrowType(type, declaration.initializer, assumeTrue);
                                        inlineLevel--;
                                        return result;
                                    }
                                }
                            }
                        case 108 /* ThisKeyword */:
                        case 106 /* SuperKeyword */:
                        case 208 /* PropertyAccessExpression */:
                        case 209 /* ElementAccessExpression */:
                            return narrowTypeByTruthiness(type, expr, assumeTrue);
                        case 210 /* CallExpression */:
                            return narrowTypeByCallExpression(type, expr, assumeTrue);
                        case 214 /* ParenthesizedExpression */:
                        case 232 /* NonNullExpression */:
                            return narrowType(type, expr.expression, assumeTrue);
                        case 223 /* BinaryExpression */:
                            return narrowTypeByBinaryExpression(type, expr, assumeTrue);
                        case 221 /* PrefixUnaryExpression */:
                            if (expr.operator === 53 /* ExclamationToken */) {
                                return narrowType(type, expr.operand, !assumeTrue);
                            }
                            break;
                    }
                    return type;
                }
            function getNarrowedTypeOfSymbol(symbol, location) {
                var _a2;
                const type = getTypeOfSymbol(symbol);
                const declaration = symbol.valueDeclaration;
                if (declaration) {
                    if (isBindingElement(declaration) && !declaration.initializer && !declaration.dotDotDotToken && declaration.parent.elements.length >= 2) {
                        const parent2 = declaration.parent.parent;
                        if (parent2.kind === 257 /* VariableDeclaration */ && getCombinedNodeFlags(declaration) & 2 /* Const */ || parent2.kind === 166 /* Parameter */) {
                            const links = getNodeLinks(parent2);
                            if (!(links.flags & 16777216 /* InCheckIdentifier */)) {
                                links.flags |= 16777216 /* InCheckIdentifier */;
                                const parentType = getTypeForBindingElementParent(parent2, 0 /* Normal */);
                                const parentTypeConstraint = parentType && mapType(parentType, getBaseConstraintOrType);
                                links.flags &= ~16777216 /* InCheckIdentifier */;
                                if (parentTypeConstraint && parentTypeConstraint.flags & 1048576 /* Union */ && !(parent2.kind === 166 /* Parameter */ && isSymbolAssigned(symbol))) {
                                    const pattern = declaration.parent;
                                    const narrowedType = getFlowTypeOfReference(pattern, parentTypeConstraint, parentTypeConstraint, 
                                    /*flowContainer*/
                                    void 0, location.flowNode);
                                    if (narrowedType.flags & 131072 /* Never */) {
                                        return neverType;
                                    }
                                    return getBindingElementTypeFromParentType(declaration, narrowedType);
                                }
                            }
                        }
                    }
                    if (isParameter(declaration) && !declaration.type && !declaration.initializer && !declaration.dotDotDotToken) {
                        const func = declaration.parent;
                        if (func.parameters.length >= 2 && isContextSensitiveFunctionOrObjectLiteralMethod(func)) {
                            const contextualSignature = getContextualSignature(func);
                            if (contextualSignature && contextualSignature.parameters.length === 1 && signatureHasRestParameter(contextualSignature)) {
                                const restType = getReducedApparentType(instantiateType(getTypeOfSymbol(contextualSignature.parameters[0]), (_a2 = getInferenceContext(func)) == null ? void 0 : _a2.nonFixingMapper));
                                if (restType.flags & 1048576 /* Union */ && everyType(restType, isTupleType) && !isSymbolAssigned(symbol)) {
                                    const narrowedType = getFlowTypeOfReference(func, restType, restType, 
                                    /*flowContainer*/
                                    void 0, location.flowNode);
                                    const index = func.parameters.indexOf(declaration) - (getThisParameter(func) ? 1 : 0);
                                    return getIndexedAccessType(narrowedType, getNumberLiteralType(index));
                                }
                            }
                        }
                    }
                }
                return type;
            }
            function checkIdentifier(node, checkMode) {
                if (isThisInTypeQuery(node)) {
                    return checkThisExpression(node);
                }
                const symbol = getResolvedSymbol(node);
                if (symbol === unknownSymbol) {
                    return errorType;
                }
                if (symbol === argumentsSymbol) {
                    if (isInPropertyInitializerOrClassStaticBlock(node)) {
                        error(node, Diagnostics.arguments_cannot_be_referenced_in_property_initializers);
                        return errorType;
                    }
                    const container = getContainingFunction(node);
                    if (languageVersion < 2 /* ES2015 */) {
                        if (container.kind === 216 /* ArrowFunction */) {
                            error(node, Diagnostics.The_arguments_object_cannot_be_referenced_in_an_arrow_function_in_ES3_and_ES5_Consider_using_a_standard_function_expression);
                        }
                        else if (hasSyntacticModifier(container, 512 /* Async */)) {
                            error(node, Diagnostics.The_arguments_object_cannot_be_referenced_in_an_async_function_or_method_in_ES3_and_ES5_Consider_using_a_standard_function_or_method);
                        }
                    }
                    getNodeLinks(container).flags |= 512 /* CaptureArguments */;
                    return getTypeOfSymbol(symbol);
                }
                if (shouldMarkIdentifierAliasReferenced(node)) {
                    markAliasReferenced(symbol, node);
                }
                const localOrExportSymbol = getExportSymbolOfValueSymbolIfExported(symbol);
                const targetSymbol = checkDeprecatedAliasedSymbol(localOrExportSymbol, node);
                if (isDeprecatedSymbol(targetSymbol) && isUncalledFunctionReference(node, targetSymbol) && targetSymbol.declarations) {
                    addDeprecatedSuggestion(node, targetSymbol.declarations, node.escapedText);
                }
                let declaration = localOrExportSymbol.valueDeclaration;
                if (declaration && localOrExportSymbol.flags & 32 /* Class */) {
                    if (declaration.kind === 260 /* ClassDeclaration */ && nodeIsDecorated(legacyDecorators, declaration)) {
                        let container = getContainingClass(node);
                        while (container !== void 0) {
                            if (container === declaration && container.name !== node) {
                                getNodeLinks(declaration).flags |= 1048576 /* ClassWithConstructorReference */;
                                getNodeLinks(node).flags |= 2097152 /* ConstructorReferenceInClass */;
                                break;
                            }
                            container = getContainingClass(container);
                        }
                    }
                    else if (declaration.kind === 228 /* ClassExpression */) {
                        let container = getThisContainer(node, 
                        /*includeArrowFunctions*/
                        false, 
                        /*includeClassComputedPropertyName*/
                        false);
                        while (container.kind !== 308 /* SourceFile */) {
                            if (container.parent === declaration) {
                                if (isPropertyDeclaration(container) && isStatic(container) || isClassStaticBlockDeclaration(container)) {
                                    getNodeLinks(declaration).flags |= 1048576 /* ClassWithConstructorReference */;
                                    getNodeLinks(node).flags |= 2097152 /* ConstructorReferenceInClass */;
                                }
                                break;
                            }
                            container = getThisContainer(container, 
                            /*includeArrowFunctions*/
                            false, 
                            /*includeClassComputedPropertyName*/
                            false);
                        }
                    }
                }
                checkNestedBlockScopedBinding(node, symbol);
                let type = getNarrowedTypeOfSymbol(localOrExportSymbol, node);
                const assignmentKind = getAssignmentTargetKind(node);
                if (assignmentKind) {
                    if (!(localOrExportSymbol.flags & 3 /* Variable */) && !(isInJSFile(node) && localOrExportSymbol.flags & 512 /* ValueModule */)) {
                        const assignmentError = localOrExportSymbol.flags & 384 /* Enum */ ? Diagnostics.Cannot_assign_to_0_because_it_is_an_enum : localOrExportSymbol.flags & 32 /* Class */ ? Diagnostics.Cannot_assign_to_0_because_it_is_a_class : localOrExportSymbol.flags & 1536 /* Module */ ? Diagnostics.Cannot_assign_to_0_because_it_is_a_namespace : localOrExportSymbol.flags & 16 /* Function */ ? Diagnostics.Cannot_assign_to_0_because_it_is_a_function : localOrExportSymbol.flags & 2097152 /* Alias */ ? Diagnostics.Cannot_assign_to_0_because_it_is_an_import : Diagnostics.Cannot_assign_to_0_because_it_is_not_a_variable;
                        error(node, assignmentError, symbolToString(symbol));
                        return errorType;
                    }
                    if (isReadonlySymbol(localOrExportSymbol)) {
                        if (localOrExportSymbol.flags & 3 /* Variable */) {
                            error(node, Diagnostics.Cannot_assign_to_0_because_it_is_a_constant, symbolToString(symbol));
                        }
                        else {
                            error(node, Diagnostics.Cannot_assign_to_0_because_it_is_a_read_only_property, symbolToString(symbol));
                        }
                        return errorType;
                    }
                }
                const isAlias = localOrExportSymbol.flags & 2097152 /* Alias */;
                if (localOrExportSymbol.flags & 3 /* Variable */) {
                    if (assignmentKind === 1 /* Definite */) {
                        return type;
                    }
                }
                else if (isAlias) {
                    declaration = getDeclarationOfAliasSymbol(symbol);
                }
                else {
                    return type;
                }
                if (!declaration) {
                    return type;
                }
                type = getNarrowableTypeForReference(type, node, checkMode);
                const isParameter2 = getRootDeclaration(declaration).kind === 166 /* Parameter */;
                const declarationContainer = getControlFlowContainer(declaration);
                let flowContainer = getControlFlowContainer(node);
                const isOuterVariable = flowContainer !== declarationContainer;
                const isSpreadDestructuringAssignmentTarget = node.parent && node.parent.parent && isSpreadAssignment(node.parent) && isDestructuringAssignmentTarget(node.parent.parent);
                const isModuleExports = symbol.flags & 134217728 /* ModuleExports */;
                while (flowContainer !== declarationContainer && (flowContainer.kind === 215 /* FunctionExpression */ || flowContainer.kind === 216 /* ArrowFunction */ || isObjectLiteralOrClassExpressionMethodOrAccessor(flowContainer)) && (isConstVariable(localOrExportSymbol) && type !== autoArrayType || isParameter2 && !isSymbolAssigned(localOrExportSymbol))) {
                    flowContainer = getControlFlowContainer(flowContainer);
                }
                const assumeInitialized = isParameter2 || isAlias || isOuterVariable || isSpreadDestructuringAssignmentTarget || isModuleExports || isSameScopedBindingElement(node, declaration) || type !== autoType && type !== autoArrayType && (!strictNullChecks || (type.flags & (3 /* AnyOrUnknown */ | 16384 /* Void */)) !== 0 || isInTypeQuery(node) || isInAmbientOrTypeNode(node) || node.parent.kind === 278 /* ExportSpecifier */) || node.parent.kind === 232 /* NonNullExpression */ || declaration.kind === 257 /* VariableDeclaration */ && declaration.exclamationToken || declaration.flags & 16777216 /* Ambient */;
                const initialType = assumeInitialized ? isParameter2 ? removeOptionalityFromDeclaredType(type, declaration) : type : type === autoType || type === autoArrayType ? undefinedType : getOptionalType(type);
                const flowType = getFlowTypeOfReference(node, type, initialType, flowContainer);
                if (!isEvolvingArrayOperationTarget(node) && (type === autoType || type === autoArrayType)) {
                    if (flowType === autoType || flowType === autoArrayType) {
                        if (noImplicitAny) {
                            error(getNameOfDeclaration(declaration), Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined, symbolToString(symbol), typeToString(flowType));
                            error(node, Diagnostics.Variable_0_implicitly_has_an_1_type, symbolToString(symbol), typeToString(flowType));
                        }
                        return convertAutoToAny(flowType);
                    }
                }
                else if (!assumeInitialized && !containsUndefinedType(type) && containsUndefinedType(flowType)) {
                    error(node, Diagnostics.Variable_0_is_used_before_being_assigned, symbolToString(symbol));
                    return type;
                }
                return assignmentKind ? getBaseTypeOfLiteralType(flowType) : flowType;
            }
            function checkThisExpression(node) {
                const isNodeInTypeQuery = isInTypeQuery(node);
                let container = getThisContainer(node, 
                /* includeArrowFunctions */
                true, 
                /*includeClassComputedPropertyName*/
                true);
                let capturedByArrowFunction = false;
                let thisInComputedPropertyName = false;
                if (container.kind === 173 /* Constructor */) {
                    checkThisBeforeSuper(node, container, Diagnostics.super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class);
                }
                while (true) {
                    if (container.kind === 216 /* ArrowFunction */) {
                        container = getThisContainer(container, 
                        /* includeArrowFunctions */
                        false, !thisInComputedPropertyName);
                        capturedByArrowFunction = true;
                    }
                    if (container.kind === 164 /* ComputedPropertyName */) {
                        container = getThisContainer(container, !capturedByArrowFunction, 
                        /*includeClassComputedPropertyName*/
                        false);
                        thisInComputedPropertyName = true;
                        continue;
                    }
                    break;
                }
                checkThisInStaticClassFieldInitializerInDecoratedClass(node, container);
                if (thisInComputedPropertyName) {
                    error(node, Diagnostics.this_cannot_be_referenced_in_a_computed_property_name);
                }
                else {
                    switch (container.kind) {
                        case 264 /* ModuleDeclaration */:
                            error(node, Diagnostics.this_cannot_be_referenced_in_a_module_or_namespace_body);
                            break;
                        case 263 /* EnumDeclaration */:
                            error(node, Diagnostics.this_cannot_be_referenced_in_current_location);
                            break;
                        case 173 /* Constructor */:
                            if (isInConstructorArgumentInitializer(node, container)) {
                                error(node, Diagnostics.this_cannot_be_referenced_in_constructor_arguments);
                            }
                            break;
                    }
                }
                if (!isNodeInTypeQuery && capturedByArrowFunction && languageVersion < 2 /* ES2015 */) {
                    captureLexicalThis(node, container);
                }
                const type = tryGetThisTypeAt(node, 
                /*includeGlobalThis*/
                true, container);
                if (noImplicitThis) {
                    const globalThisType2 = getTypeOfSymbol(globalThisSymbol);
                    if (type === globalThisType2 && capturedByArrowFunction) {
                        error(node, Diagnostics.The_containing_arrow_function_captures_the_global_value_of_this);
                    }
                    else if (!type) {
                        const diag2 = error(node, Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation);
                        if (!isSourceFile(container)) {
                            const outsideThis = tryGetThisTypeAt(container);
                            if (outsideThis && outsideThis !== globalThisType2) {
                                addRelatedInfo(diag2, createDiagnosticForNode(container, Diagnostics.An_outer_value_of_this_is_shadowed_by_this_container));
                            }
                        }
                    }
                }
                return type || anyType;
            }
            function tryGetThisTypeAt(node, includeGlobalThis = true, container = getThisContainer(node, 
            /*includeArrowFunctions*/
            false, 
            /*includeClassComputedPropertyName*/
            false)) {
                const isInJS = isInJSFile(node);
                if (isFunctionLike(container) && (!isInParameterInitializerBeforeContainingFunction(node) || getThisParameter(container))) {
                    let thisType = getThisTypeOfDeclaration(container) || isInJS && getTypeForThisExpressionFromJSDoc(container);
                    if (!thisType) {
                        const className = getClassNameFromPrototypeMethod(container);
                        if (isInJS && className) {
                            const classSymbol = checkExpression(className).symbol;
                            if (classSymbol && classSymbol.members && classSymbol.flags & 16 /* Function */) {
                                thisType = getDeclaredTypeOfSymbol(classSymbol).thisType;
                            }
                        }
                        else if (isJSConstructor(container)) {
                            thisType = getDeclaredTypeOfSymbol(getMergedSymbol(container.symbol)).thisType;
                        }
                        thisType || (thisType = getContextualThisParameterType(container));
                    }
                    if (thisType) {
                        return getFlowTypeOfReference(node, thisType);
                    }
                }
                if (isClassLike(container.parent)) {
                    const symbol = getSymbolOfDeclaration(container.parent);
                    const type = isStatic(container) ? getTypeOfSymbol(symbol) : getDeclaredTypeOfSymbol(symbol).thisType;
                    return getFlowTypeOfReference(node, type);
                }
                if (isSourceFile(container)) {
                    if (container.commonJsModuleIndicator) {
                        const fileSymbol = getSymbolOfDeclaration(container);
                        return fileSymbol && getTypeOfSymbol(fileSymbol);
                    }
                    else if (container.externalModuleIndicator) {
                        return undefinedType;
                    }
                    else if (includeGlobalThis) {
                        return getTypeOfSymbol(globalThisSymbol);
                    }
                }
            }
            function getClassNameFromPrototypeMethod(container) {
                if (container.kind === 215 /* FunctionExpression */ && isBinaryExpression(container.parent) && getAssignmentDeclarationKind(container.parent) === 3 /* PrototypeProperty */) {
                    return container.parent.left.expression.expression;
                }
                else if (container.kind === 171 /* MethodDeclaration */ && container.parent.kind === 207 /* ObjectLiteralExpression */ && isBinaryExpression(container.parent.parent) && getAssignmentDeclarationKind(container.parent.parent) === 6 /* Prototype */) {
                    return container.parent.parent.left.expression;
                }
                else if (container.kind === 215 /* FunctionExpression */ && container.parent.kind === 299 /* PropertyAssignment */ && container.parent.parent.kind === 207 /* ObjectLiteralExpression */ && isBinaryExpression(container.parent.parent.parent) && getAssignmentDeclarationKind(container.parent.parent.parent) === 6 /* Prototype */) {
                    return container.parent.parent.parent.left.expression;
                }
                else if (container.kind === 215 /* FunctionExpression */ && isPropertyAssignment(container.parent) && isIdentifier(container.parent.name) && (container.parent.name.escapedText === "value" || container.parent.name.escapedText === "get" || container.parent.name.escapedText === "set") && isObjectLiteralExpression(container.parent.parent) && isCallExpression(container.parent.parent.parent) && container.parent.parent.parent.arguments[2] === container.parent.parent && getAssignmentDeclarationKind(container.parent.parent.parent) === 9 /* ObjectDefinePrototypeProperty */) {
                    return container.parent.parent.parent.arguments[0].expression;
                }
                else if (isMethodDeclaration(container) && isIdentifier(container.name) && (container.name.escapedText === "value" || container.name.escapedText === "get" || container.name.escapedText === "set") && isObjectLiteralExpression(container.parent) && isCallExpression(container.parent.parent) && container.parent.parent.arguments[2] === container.parent && getAssignmentDeclarationKind(container.parent.parent) === 9 /* ObjectDefinePrototypeProperty */) {
                    return container.parent.parent.arguments[0].expression;
                }
            }
            function checkSuperExpression(node) {
                const isCallExpression2 = node.parent.kind === 210 /* CallExpression */ && node.parent.expression === node;
                const immediateContainer = getSuperContainer(node, 
                /*stopOnFunctions*/
                true);
                let container = immediateContainer;
                let needToCaptureLexicalThis = false;
                let inAsyncFunction = false;
                if (!isCallExpression2) {
                    while (container && container.kind === 216 /* ArrowFunction */) {
                        if (hasSyntacticModifier(container, 512 /* Async */))
                            inAsyncFunction = true;
                        container = getSuperContainer(container, 
                        /*stopOnFunctions*/
                        true);
                        needToCaptureLexicalThis = languageVersion < 2 /* ES2015 */;
                    }
                    if (container && hasSyntacticModifier(container, 512 /* Async */))
                        inAsyncFunction = true;
                }
                let nodeCheckFlag = 0;
                if (!container || !isLegalUsageOfSuperExpression(container)) {
                    const current = findAncestor(node, (n) => n === container ? "quit" : n.kind === 164 /* ComputedPropertyName */);
                    if (current && current.kind === 164 /* ComputedPropertyName */) {
                        error(node, Diagnostics.super_cannot_be_referenced_in_a_computed_property_name);
                    }
                    else if (isCallExpression2) {
                        error(node, Diagnostics.Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors);
                    }
                    else if (!container || !container.parent || !(isClassLike(container.parent) || container.parent.kind === 207 /* ObjectLiteralExpression */)) {
                        error(node, Diagnostics.super_can_only_be_referenced_in_members_of_derived_classes_or_object_literal_expressions);
                    }
                    else {
                        error(node, Diagnostics.super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class);
                    }
                    return errorType;
                }
                if (!isCallExpression2 && immediateContainer.kind === 173 /* Constructor */) {
                    checkThisBeforeSuper(node, container, Diagnostics.super_must_be_called_before_accessing_a_property_of_super_in_the_constructor_of_a_derived_class);
                }
                if (isStatic(container) || isCallExpression2) {
                    nodeCheckFlag = 32 /* SuperStatic */;
                    if (!isCallExpression2 && languageVersion >= 2 /* ES2015 */ && languageVersion <= 8 /* ES2021 */ && (isPropertyDeclaration(container) || isClassStaticBlockDeclaration(container))) {
                        forEachEnclosingBlockScopeContainer(node.parent, (current) => {
                            if (!isSourceFile(current) || isExternalOrCommonJsModule(current)) {
                                getNodeLinks(current).flags |= 8388608 /* ContainsSuperPropertyInStaticInitializer */;
                            }
                        });
                    }
                }
                else {
                    nodeCheckFlag = 16 /* SuperInstance */;
                }
                getNodeLinks(node).flags |= nodeCheckFlag;
                if (container.kind === 171 /* MethodDeclaration */ && inAsyncFunction) {
                    if (isSuperProperty(node.parent) && isAssignmentTarget(node.parent)) {
                        getNodeLinks(container).flags |= 256 /* MethodWithSuperPropertyAssignmentInAsync */;
                    }
                    else {
                        getNodeLinks(container).flags |= 128 /* MethodWithSuperPropertyAccessInAsync */;
                    }
                }
                if (needToCaptureLexicalThis) {
                    captureLexicalThis(node.parent, container);
                }
                if (container.parent.kind === 207 /* ObjectLiteralExpression */) {
                    if (languageVersion < 2 /* ES2015 */) {
                        error(node, Diagnostics.super_is_only_allowed_in_members_of_object_literal_expressions_when_option_target_is_ES2015_or_higher);
                        return errorType;
                    }
                    else {
                        return anyType;
                    }
                }
                const classLikeDeclaration = container.parent;
                if (!getClassExtendsHeritageElement(classLikeDeclaration)) {
                    error(node, Diagnostics.super_can_only_be_referenced_in_a_derived_class);
                    return errorType;
                }
                const classType = getDeclaredTypeOfSymbol(getSymbolOfDeclaration(classLikeDeclaration));
                const baseClassType = classType && getBaseTypes(classType)[0];
                if (!baseClassType) {
                    return errorType;
                }
                if (container.kind === 173 /* Constructor */ && isInConstructorArgumentInitializer(node, container)) {
                    error(node, Diagnostics.super_cannot_be_referenced_in_constructor_arguments);
                    return errorType;
                }
                return nodeCheckFlag === 32 /* SuperStatic */ ? getBaseConstructorTypeOfClass(classType) : getTypeWithThisArgument(baseClassType, classType.thisType);
                function isLegalUsageOfSuperExpression(container2) {
                    if (isCallExpression2) {
                        return container2.kind === 173 /* Constructor */;
                    }
                    else {
                        if (isClassLike(container2.parent) || container2.parent.kind === 207 /* ObjectLiteralExpression */) {
                            if (isStatic(container2)) {
                                return container2.kind === 171 /* MethodDeclaration */ || container2.kind === 170 /* MethodSignature */ || container2.kind === 174 /* GetAccessor */ || container2.kind === 175 /* SetAccessor */ || container2.kind === 169 /* PropertyDeclaration */ || container2.kind === 172 /* ClassStaticBlockDeclaration */;
                            }
                            else {
                                return container2.kind === 171 /* MethodDeclaration */ || container2.kind === 170 /* MethodSignature */ || container2.kind === 174 /* GetAccessor */ || container2.kind === 175 /* SetAccessor */ || container2.kind === 169 /* PropertyDeclaration */ || container2.kind === 168 /* PropertySignature */ || container2.kind === 173 /* Constructor */;
                            }
                        }
                    }
                    return false;
                }
            }
            function getContextualTypeForAssignmentDeclaration(binaryExpression) {
                var _a2, _b;
                const kind = getAssignmentDeclarationKind(binaryExpression);
                switch (kind) {
                    case 0 /* None */:
                    case 4 /* ThisProperty */:
                        const lhsSymbol = getSymbolForExpression(binaryExpression.left);
                        const decl = lhsSymbol && lhsSymbol.valueDeclaration;
                        if (decl && (isPropertyDeclaration(decl) || isPropertySignature(decl))) {
                            const overallAnnotation = getEffectiveTypeAnnotationNode(decl);
                            return overallAnnotation && instantiateType(getTypeFromTypeNode(overallAnnotation), getSymbolLinks(lhsSymbol).mapper) || (isPropertyDeclaration(decl) ? decl.initializer && getTypeOfExpression(binaryExpression.left) : void 0);
                        }
                        if (kind === 0 /* None */) {
                            return getTypeOfExpression(binaryExpression.left);
                        }
                        return getContextualTypeForThisPropertyAssignment(binaryExpression);
                    case 5 /* Property */:
                        if (isPossiblyAliasedThisProperty(binaryExpression, kind)) {
                            return getContextualTypeForThisPropertyAssignment(binaryExpression);
                        }
                        else if (!canHaveSymbol(binaryExpression.left) || !binaryExpression.left.symbol) {
                            return getTypeOfExpression(binaryExpression.left);
                        }
                        else {
                            const decl2 = binaryExpression.left.symbol.valueDeclaration;
                            if (!decl2) {
                                return void 0;
                            }
                            const lhs = cast(binaryExpression.left, isAccessExpression);
                            const overallAnnotation = getEffectiveTypeAnnotationNode(decl2);
                            if (overallAnnotation) {
                                return getTypeFromTypeNode(overallAnnotation);
                            }
                            else if (isIdentifier(lhs.expression)) {
                                const id = lhs.expression;
                                const parentSymbol = resolveName(id, id.escapedText, 111551 /* Value */, void 0, id.escapedText, 
                                /*isUse*/
                                true);
                                if (parentSymbol) {
                                    const annotated2 = parentSymbol.valueDeclaration && getEffectiveTypeAnnotationNode(parentSymbol.valueDeclaration);
                                    if (annotated2) {
                                        const nameStr = getElementOrPropertyAccessName(lhs);
                                        if (nameStr !== void 0) {
                                            return getTypeOfPropertyOfContextualType(getTypeFromTypeNode(annotated2), nameStr);
                                        }
                                    }
                                    return void 0;
                                }
                            }
                            return isInJSFile(decl2) ? void 0 : getTypeOfExpression(binaryExpression.left);
                        }
                    case 1 /* ExportsProperty */:
                    case 6 /* Prototype */:
                    case 3 /* PrototypeProperty */:
                    case 2 /* ModuleExports */:
                        let valueDeclaration;
                        if (kind !== 2 /* ModuleExports */) {
                            valueDeclaration = canHaveSymbol(binaryExpression.left) ? (_a2 = binaryExpression.left.symbol) == null ? void 0 : _a2.valueDeclaration : void 0;
                        }
                        valueDeclaration || (valueDeclaration = (_b = binaryExpression.symbol) == null ? void 0 : _b.valueDeclaration);
                        const annotated = valueDeclaration && getEffectiveTypeAnnotationNode(valueDeclaration);
                        return annotated ? getTypeFromTypeNode(annotated) : void 0;
                    case 7 /* ObjectDefinePropertyValue */:
                    case 8 /* ObjectDefinePropertyExports */:
                    case 9 /* ObjectDefinePrototypeProperty */:
                        return Debug.fail("Does not apply");
                    default:
                        return Debug.assertNever(kind);
                }
            }
            function getContextualType2(node, contextFlags) {
                var _a2, _b;
                if (node.flags & 33554432 /* InWithStatement */) {
                    return void 0;
                }
                const index = findContextualNode(node, 
                /*includeCaches*/
                !contextFlags);
                if (index >= 0) {
                    return contextualTypes[index];
                }
                const { parent: parent2 } = node;
                switch (parent2.kind) {
                    case 257 /* VariableDeclaration */:
                    case 166 /* Parameter */:
                    case 169 /* PropertyDeclaration */:
                    case 168 /* PropertySignature */:
                    case 205 /* BindingElement */:
                        return getContextualTypeForInitializerExpression(node, contextFlags);
                    case 216 /* ArrowFunction */:
                    case 250 /* ReturnStatement */:
                        return getContextualTypeForReturnExpression(node, contextFlags);
                    case 226 /* YieldExpression */:
                        return getContextualTypeForYieldOperand(parent2, contextFlags);
                    case 220 /* AwaitExpression */:
                        return getContextualTypeForAwaitOperand(parent2, contextFlags);
                    case 210 /* CallExpression */:
                    case 211 /* NewExpression */:
                        return getContextualTypeForArgument(parent2, node);
                    case 167 /* Decorator */:
                        return getContextualTypeForDecorator(parent2);
                    case 213 /* TypeAssertionExpression */:
                    case 231 /* AsExpression */:
                        return isConstTypeReference(parent2.type) ? getContextualType2(parent2, contextFlags) : getTypeFromTypeNode(parent2.type);
                    case 223 /* BinaryExpression */:
                        return getContextualTypeForBinaryOperand(node, contextFlags);
                    case 299 /* PropertyAssignment */:
                    case 300 /* ShorthandPropertyAssignment */:
                        return getContextualTypeForObjectLiteralElement(parent2, contextFlags);
                    case 301 /* SpreadAssignment */:
                        return getContextualType2(parent2.parent, contextFlags);
                    case 206 /* ArrayLiteralExpression */: {
                        const arrayLiteral = parent2;
                        const type = getApparentTypeOfContextualType(arrayLiteral, contextFlags);
                        const spreadIndex = (_b = (_a2 = getNodeLinks(arrayLiteral)).firstSpreadIndex) != null ? _b : _a2.firstSpreadIndex = findIndex(arrayLiteral.elements, isSpreadElement);
                        const elementIndex = indexOfNode(arrayLiteral.elements, node);
                        return getContextualTypeForElementExpression(type, spreadIndex < 0 || elementIndex < spreadIndex ? elementIndex : -1);
                    }
                    case 224 /* ConditionalExpression */:
                        return getContextualTypeForConditionalOperand(node, contextFlags);
                    case 236 /* TemplateSpan */:
                        Debug.assert(parent2.parent.kind === 225 /* TemplateExpression */);
                        return getContextualTypeForSubstitutionExpression(parent2.parent, node);
                    case 214 /* ParenthesizedExpression */: {
                        if (isInJSFile(parent2)) {
                            if (isJSDocSatisfiesExpression(parent2)) {
                                return getTypeFromTypeNode(getJSDocSatisfiesExpressionType(parent2));
                            }
                            const typeTag = getJSDocTypeTag(parent2);
                            if (typeTag && !isConstTypeReference(typeTag.typeExpression.type)) {
                                return getTypeFromTypeNode(typeTag.typeExpression.type);
                            }
                        }
                        return getContextualType2(parent2, contextFlags);
                    }
                    case 232 /* NonNullExpression */:
                        return getContextualType2(parent2, contextFlags);
                    case 235 /* SatisfiesExpression */:
                        return getTypeFromTypeNode(parent2.type);
                    case 274 /* ExportAssignment */:
                        return tryGetTypeFromEffectiveTypeNode(parent2);
                    case 291 /* JsxExpression */:
                        return getContextualTypeForJsxExpression(parent2, contextFlags);
                    case 288 /* JsxAttribute */:
                    case 290 /* JsxSpreadAttribute */:
                        return getContextualTypeForJsxAttribute(parent2, contextFlags);
                    case 283 /* JsxOpeningElement */:
                    case 282 /* JsxSelfClosingElement */:
                        return getContextualJsxElementAttributesType(parent2, contextFlags);
                }
                return void 0;
            }
            function combineIntersectionParameters(left, right, mapper) {
                const leftCount = getParameterCount(left);
                const rightCount = getParameterCount(right);
                const longest = leftCount >= rightCount ? left : right;
                const shorter = longest === left ? right : left;
                const longestCount = longest === left ? leftCount : rightCount;
                const eitherHasEffectiveRest = hasEffectiveRestParameter(left) || hasEffectiveRestParameter(right);
                const needsExtraRestElement = eitherHasEffectiveRest && !hasEffectiveRestParameter(longest);
                const params = new Array(longestCount + (needsExtraRestElement ? 1 : 0));
                for (let i = 0; i < longestCount; i++) {
                    let longestParamType = tryGetTypeAtPosition(longest, i);
                    if (longest === right) {
                        longestParamType = instantiateType(longestParamType, mapper);
                    }
                    let shorterParamType = tryGetTypeAtPosition(shorter, i) || unknownType;
                    if (shorter === right) {
                        shorterParamType = instantiateType(shorterParamType, mapper);
                    }
                    const unionParamType = getUnionType([longestParamType, shorterParamType]);
                    const isRestParam = eitherHasEffectiveRest && !needsExtraRestElement && i === longestCount - 1;
                    const isOptional = i >= getMinArgumentCount(longest) && i >= getMinArgumentCount(shorter);
                    const leftName = i >= leftCount ? void 0 : getParameterNameAtPosition(left, i);
                    const rightName = i >= rightCount ? void 0 : getParameterNameAtPosition(right, i);
                    const paramName = leftName === rightName ? leftName : !leftName ? rightName : !rightName ? leftName : void 0;
                    const paramSymbol = createSymbol(1 /* FunctionScopedVariable */ | (isOptional && !isRestParam ? 16777216 /* Optional */ : 0), paramName || `arg${i}`);
                    paramSymbol.links.type = isRestParam ? createArrayType(unionParamType) : unionParamType;
                    params[i] = paramSymbol;
                }
                if (needsExtraRestElement) {
                    const restParamSymbol = createSymbol(1 /* FunctionScopedVariable */, "args");
                    restParamSymbol.links.type = createArrayType(getTypeAtPosition(shorter, longestCount));
                    if (shorter === right) {
                        restParamSymbol.links.type = instantiateType(restParamSymbol.links.type, mapper);
                    }
                    params[longestCount] = restParamSymbol;
                }
                return params;
            }
            function checkArrayLiteral(node, checkMode, forceTuple) {
                const elements = node.elements;
                const elementCount = elements.length;
                const elementTypes = [];
                const elementFlags = [];
                pushCachedContextualType(node);
                const inDestructuringPattern = isAssignmentTarget(node);
                const inConstContext = isConstContext(node);
                const contextualType = getApparentTypeOfContextualType(node, 
                /*contextFlags*/
                void 0);
                const inTupleContext = !!contextualType && someType(contextualType, isTupleLikeType);
                let hasOmittedExpression = false;
                for (let i = 0; i < elementCount; i++) {
                    const e = elements[i];
                    if (e.kind === 227 /* SpreadElement */) {
                        if (languageVersion < 2 /* ES2015 */) {
                            checkExternalEmitHelpers(e, compilerOptions.downlevelIteration ? 1536 /* SpreadIncludes */ : 1024 /* SpreadArray */);
                        }
                        const spreadType = checkExpression(e.expression, checkMode, forceTuple);
                        if (isArrayLikeType(spreadType)) {
                            elementTypes.push(spreadType);
                            elementFlags.push(8 /* Variadic */);
                        }
                        else if (inDestructuringPattern) {
                            const restElementType = getIndexTypeOfType(spreadType, numberType) || getIteratedTypeOrElementType(65 /* Destructuring */, spreadType, undefinedType, 
                            /*errorNode*/
                            void 0, 
                            /*checkAssignability*/
                            false) || unknownType;
                            elementTypes.push(restElementType);
                            elementFlags.push(4 /* Rest */);
                        }
                        else {
                            elementTypes.push(checkIteratedTypeOrElementType(33 /* Spread */, spreadType, undefinedType, e.expression));
                            elementFlags.push(4 /* Rest */);
                        }
                    }
                    else if (exactOptionalPropertyTypes && e.kind === 229 /* OmittedExpression */) {
                        hasOmittedExpression = true;
                        elementTypes.push(undefinedOrMissingType);
                        elementFlags.push(2 /* Optional */);
                    }
                    else {
                        const type = checkExpressionForMutableLocation(e, checkMode, forceTuple);
                        elementTypes.push(addOptionality(type, 
                        /*isProperty*/
                        true, hasOmittedExpression));
                        elementFlags.push(hasOmittedExpression ? 2 /* Optional */ : 1 /* Required */);
                        if (inTupleContext && checkMode && checkMode & 2 /* Inferential */ && !(checkMode & 4 /* SkipContextSensitive */) && isContextSensitive(e)) {
                            const inferenceContext = getInferenceContext(node);
                            Debug.assert(inferenceContext);
                            addIntraExpressionInferenceSite(inferenceContext, e, type);
                        }
                    }
                }
                popContextualType();
                if (inDestructuringPattern) {
                    return createTupleType(elementTypes, elementFlags);
                }
                if (forceTuple || inConstContext || inTupleContext) {
                    return createArrayLiteralType(createTupleType(elementTypes, elementFlags, 
                    /*readonly*/
                    inConstContext));
                }
                return createArrayLiteralType(createArrayType(elementTypes.length ? getUnionType(sameMap(elementTypes, (t, i) => elementFlags[i] & 8 /* Variadic */ ? getIndexedAccessTypeOrUndefined(t, numberType) || anyType : t), 2 /* Subtype */) : strictNullChecks ? implicitNeverType : undefinedWideningType, inConstContext));
            }
            function checkObjectLiteral(node, checkMode) {
                var _a2;
                const inDestructuringPattern = isAssignmentTarget(node);
                checkGrammarObjectLiteralExpression(node, inDestructuringPattern);
                const allPropertiesTable = strictNullChecks ? createSymbolTable() : void 0;
                let propertiesTable = createSymbolTable();
                let propertiesArray = [];
                let spread = emptyObjectType;
                pushCachedContextualType(node);
                const contextualType = getApparentTypeOfContextualType(node, 
                /*contextFlags*/
                void 0);
                const contextualTypeHasPattern = contextualType && contextualType.pattern && (contextualType.pattern.kind === 203 /* ObjectBindingPattern */ || contextualType.pattern.kind === 207 /* ObjectLiteralExpression */);
                const inConstContext = isConstContext(node);
                const checkFlags = inConstContext ? 8 /* Readonly */ : 0;
                const isInJavascript = isInJSFile(node) && !isInJsonFile(node);
                const enumTag = getJSDocEnumTag(node);
                const isJSObjectLiteral = !contextualType && isInJavascript && !enumTag;
                let objectFlags = freshObjectLiteralFlag;
                let patternWithComputedProperties = false;
                let hasComputedStringProperty = false;
                let hasComputedNumberProperty = false;
                let hasComputedSymbolProperty = false;
                for (const elem of node.properties) {
                    if (elem.name && isComputedPropertyName(elem.name)) {
                        checkComputedPropertyName(elem.name);
                    }
                }
                let offset = 0;
                for (const memberDecl of node.properties) {
                    let member = getSymbolOfDeclaration(memberDecl);
                    const computedNameType = memberDecl.name && memberDecl.name.kind === 164 /* ComputedPropertyName */ ? checkComputedPropertyName(memberDecl.name) : void 0;
                    if (memberDecl.kind === 299 /* PropertyAssignment */ || memberDecl.kind === 300 /* ShorthandPropertyAssignment */ || isObjectLiteralMethod(memberDecl)) {
                        let type = memberDecl.kind === 299 /* PropertyAssignment */ ? checkPropertyAssignment(memberDecl, checkMode) : (
                        // avoid resolving the left side of the ShorthandPropertyAssignment outside of the destructuring
                        // for error recovery purposes. For example, if a user wrote `{ a = 100 }` instead of `{ a: 100 }`.
                        // we don't want to say "could not find 'a'".
                        memberDecl.kind === 300 /* ShorthandPropertyAssignment */ ? checkExpressionForMutableLocation(!inDestructuringPattern && memberDecl.objectAssignmentInitializer ? memberDecl.objectAssignmentInitializer : memberDecl.name, checkMode) : checkObjectLiteralMethod(memberDecl, checkMode));
                        if (isInJavascript) {
                            const jsDocType = getTypeForDeclarationFromJSDocComment(memberDecl);
                            if (jsDocType) {
                                checkTypeAssignableTo(type, jsDocType, memberDecl);
                                type = jsDocType;
                            }
                            else if (enumTag && enumTag.typeExpression) {
                                checkTypeAssignableTo(type, getTypeFromTypeNode(enumTag.typeExpression), memberDecl);
                            }
                        }
                        objectFlags |= getObjectFlags(type) & 458752 /* PropagatingFlags */;
                        const nameType = computedNameType && isTypeUsableAsPropertyName(computedNameType) ? computedNameType : void 0;
                        const prop = nameType ? createSymbol(4 /* Property */ | member.flags, getPropertyNameFromType(nameType), checkFlags | 4096 /* Late */) : createSymbol(4 /* Property */ | member.flags, member.escapedName, checkFlags);
                        if (nameType) {
                            prop.links.nameType = nameType;
                        }
                        if (inDestructuringPattern) {
                            const isOptional = memberDecl.kind === 299 /* PropertyAssignment */ && hasDefaultValue(memberDecl.initializer) || memberDecl.kind === 300 /* ShorthandPropertyAssignment */ && memberDecl.objectAssignmentInitializer;
                            if (isOptional) {
                                prop.flags |= 16777216 /* Optional */;
                            }
                        }
                        else if (contextualTypeHasPattern && !(getObjectFlags(contextualType) & 512 /* ObjectLiteralPatternWithComputedProperties */)) {
                            const impliedProp = getPropertyOfType(contextualType, member.escapedName);
                            if (impliedProp) {
                                prop.flags |= impliedProp.flags & 16777216 /* Optional */;
                            }
                            else if (!compilerOptions.suppressExcessPropertyErrors && !getIndexInfoOfType(contextualType, stringType)) {
                                error(memberDecl.name, Diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1, symbolToString(member), typeToString(contextualType));
                            }
                        }
                        prop.declarations = member.declarations;
                        prop.parent = member.parent;
                        if (member.valueDeclaration) {
                            prop.valueDeclaration = member.valueDeclaration;
                        }
                        prop.links.type = type;
                        prop.links.target = member;
                        member = prop;
                        allPropertiesTable == null ? void 0 : allPropertiesTable.set(prop.escapedName, prop);
                        if (contextualType && checkMode && checkMode & 2 /* Inferential */ && !(checkMode & 4 /* SkipContextSensitive */) && (memberDecl.kind === 299 /* PropertyAssignment */ || memberDecl.kind === 171 /* MethodDeclaration */) && isContextSensitive(memberDecl)) {
                            const inferenceContext = getInferenceContext(node);
                            Debug.assert(inferenceContext);
                            const inferenceNode = memberDecl.kind === 299 /* PropertyAssignment */ ? memberDecl.initializer : memberDecl;
                            addIntraExpressionInferenceSite(inferenceContext, inferenceNode, type);
                        }
                    }
                    else if (memberDecl.kind === 301 /* SpreadAssignment */) {
                        if (languageVersion < 2 /* ES2015 */) {
                            checkExternalEmitHelpers(memberDecl, 2 /* Assign */);
                        }
                        if (propertiesArray.length > 0) {
                            spread = getSpreadType(spread, createObjectLiteralType(), node.symbol, objectFlags, inConstContext);
                            propertiesArray = [];
                            propertiesTable = createSymbolTable();
                            hasComputedStringProperty = false;
                            hasComputedNumberProperty = false;
                            hasComputedSymbolProperty = false;
                        }
                        const type = getReducedType(checkExpression(memberDecl.expression));
                        if (isValidSpreadType(type)) {
                            const mergedType = tryMergeUnionOfObjectTypeAndEmptyObject(type, inConstContext);
                            if (allPropertiesTable) {
                                checkSpreadPropOverrides(mergedType, allPropertiesTable, memberDecl);
                            }
                            offset = propertiesArray.length;
                            if (isErrorType(spread)) {
                                continue;
                            }
                            spread = getSpreadType(spread, mergedType, node.symbol, objectFlags, inConstContext);
                        }
                        else {
                            error(memberDecl, Diagnostics.Spread_types_may_only_be_created_from_object_types);
                            spread = errorType;
                        }
                        continue;
                    }
                    else {
                        Debug.assert(memberDecl.kind === 174 /* GetAccessor */ || memberDecl.kind === 175 /* SetAccessor */);
                        checkNodeDeferred(memberDecl);
                    }
                    if (computedNameType && !(computedNameType.flags & 8576 /* StringOrNumberLiteralOrUnique */)) {
                        if (isTypeAssignableTo(computedNameType, stringNumberSymbolType)) {
                            if (isTypeAssignableTo(computedNameType, numberType)) {
                                hasComputedNumberProperty = true;
                            }
                            else if (isTypeAssignableTo(computedNameType, esSymbolType)) {
                                hasComputedSymbolProperty = true;
                            }
                            else {
                                hasComputedStringProperty = true;
                            }
                            if (inDestructuringPattern) {
                                patternWithComputedProperties = true;
                            }
                        }
                    }
                    else {
                        propertiesTable.set(member.escapedName, member);
                    }
                    propertiesArray.push(member);
                }
                popContextualType();
                if (contextualTypeHasPattern) {
                    const rootPatternParent = findAncestor(contextualType.pattern.parent, (n) => n.kind === 257 /* VariableDeclaration */ || n.kind === 223 /* BinaryExpression */ || n.kind === 166 /* Parameter */);
                    const spreadOrOutsideRootObject = findAncestor(node, (n) => n === rootPatternParent || n.kind === 301 /* SpreadAssignment */);
                    if (spreadOrOutsideRootObject.kind !== 301 /* SpreadAssignment */) {
                        for (const prop of getPropertiesOfType(contextualType)) {
                            if (!propertiesTable.get(prop.escapedName) && !getPropertyOfType(spread, prop.escapedName)) {
                                if (!(prop.flags & 16777216 /* Optional */)) {
                                    error(prop.valueDeclaration || ((_a2 = tryCast(prop, isTransientSymbol)) == null ? void 0 : _a2.links.bindingElement), Diagnostics.Initializer_provides_no_value_for_this_binding_element_and_the_binding_element_has_no_default_value);
                                }
                                propertiesTable.set(prop.escapedName, prop);
                                propertiesArray.push(prop);
                            }
                        }
                    }
                }
                if (isErrorType(spread)) {
                    return errorType;
                }
                if (spread !== emptyObjectType) {
                    if (propertiesArray.length > 0) {
                        spread = getSpreadType(spread, createObjectLiteralType(), node.symbol, objectFlags, inConstContext);
                        propertiesArray = [];
                        propertiesTable = createSymbolTable();
                        hasComputedStringProperty = false;
                        hasComputedNumberProperty = false;
                    }
                    return mapType(spread, (t) => t === emptyObjectType ? createObjectLiteralType() : t);
                }
                return createObjectLiteralType();
                function createObjectLiteralType() {
                    const indexInfos = [];
                    if (hasComputedStringProperty)
                        indexInfos.push(getObjectLiteralIndexInfo(node, offset, propertiesArray, stringType));
                    if (hasComputedNumberProperty)
                        indexInfos.push(getObjectLiteralIndexInfo(node, offset, propertiesArray, numberType));
                    if (hasComputedSymbolProperty)
                        indexInfos.push(getObjectLiteralIndexInfo(node, offset, propertiesArray, esSymbolType));
                    const result = createAnonymousType(node.symbol, propertiesTable, emptyArray, emptyArray, indexInfos);
                    result.objectFlags |= objectFlags | 128 /* ObjectLiteral */ | 131072 /* ContainsObjectOrArrayLiteral */;
                    if (isJSObjectLiteral) {
                        result.objectFlags |= 4096 /* JSLiteral */;
                    }
                    if (patternWithComputedProperties) {
                        result.objectFlags |= 512 /* ObjectLiteralPatternWithComputedProperties */;
                    }
                    if (inDestructuringPattern) {
                        result.pattern = node;
                    }
                    return result;
                }
            }
            function createJsxAttributesTypeFromAttributesProperty(openingLikeElement, checkMode) {
                const attributes = openingLikeElement.attributes;
                const attributesType = getContextualType2(attributes, 0 /* None */);
                const allAttributesTable = strictNullChecks ? createSymbolTable() : void 0;
                let attributesTable = createSymbolTable();
                let spread = emptyJsxObjectType;
                let hasSpreadAnyType = false;
                let typeToIntersect;
                let explicitlySpecifyChildrenAttribute = false;
                let objectFlags = 2048 /* JsxAttributes */;
                const jsxChildrenPropertyName = getJsxElementChildrenPropertyName(getJsxNamespaceAt(openingLikeElement));
                for (const attributeDecl of attributes.properties) {
                    const member = attributeDecl.symbol;
                    if (isJsxAttribute(attributeDecl)) {
                        const exprType = checkJsxAttribute(attributeDecl, checkMode);
                        objectFlags |= getObjectFlags(exprType) & 458752 /* PropagatingFlags */;
                        const attributeSymbol = createSymbol(4 /* Property */ | member.flags, member.escapedName);
                        attributeSymbol.declarations = member.declarations;
                        attributeSymbol.parent = member.parent;
                        if (member.valueDeclaration) {
                            attributeSymbol.valueDeclaration = member.valueDeclaration;
                        }
                        attributeSymbol.links.type = exprType;
                        attributeSymbol.links.target = member;
                        attributesTable.set(attributeSymbol.escapedName, attributeSymbol);
                        allAttributesTable == null ? void 0 : allAttributesTable.set(attributeSymbol.escapedName, attributeSymbol);
                        if (attributeDecl.name.escapedText === jsxChildrenPropertyName) {
                            explicitlySpecifyChildrenAttribute = true;
                        }
                        if (attributesType) {
                            const prop = getPropertyOfType(attributesType, member.escapedName);
                            if (prop && prop.declarations && isDeprecatedSymbol(prop)) {
                                addDeprecatedSuggestion(attributeDecl.name, prop.declarations, attributeDecl.name.escapedText);
                            }
                        }
                    }
                    else {
                        Debug.assert(attributeDecl.kind === 290 /* JsxSpreadAttribute */);
                        if (attributesTable.size > 0) {
                            spread = getSpreadType(spread, createJsxAttributesType(), attributes.symbol, objectFlags, 
                            /*readonly*/
                            false);
                            attributesTable = createSymbolTable();
                        }
                        const exprType = getReducedType(checkExpressionCached(attributeDecl.expression, checkMode));
                        if (isTypeAny(exprType)) {
                            hasSpreadAnyType = true;
                        }
                        if (isValidSpreadType(exprType)) {
                            spread = getSpreadType(spread, exprType, attributes.symbol, objectFlags, 
                            /*readonly*/
                            false);
                            if (allAttributesTable) {
                                checkSpreadPropOverrides(exprType, allAttributesTable, attributeDecl);
                            }
                        }
                        else {
                            error(attributeDecl.expression, Diagnostics.Spread_types_may_only_be_created_from_object_types);
                            typeToIntersect = typeToIntersect ? getIntersectionType([typeToIntersect, exprType]) : exprType;
                        }
                    }
                }
                if (!hasSpreadAnyType) {
                    if (attributesTable.size > 0) {
                        spread = getSpreadType(spread, createJsxAttributesType(), attributes.symbol, objectFlags, 
                        /*readonly*/
                        false);
                    }
                }
                const parent2 = openingLikeElement.parent.kind === 281 /* JsxElement */ ? openingLikeElement.parent : void 0;
                if (parent2 && parent2.openingElement === openingLikeElement && parent2.children.length > 0) {
                    const childrenTypes = checkJsxChildren(parent2, checkMode);
                    if (!hasSpreadAnyType && jsxChildrenPropertyName && jsxChildrenPropertyName !== "") {
                        if (explicitlySpecifyChildrenAttribute) {
                            error(attributes, Diagnostics._0_are_specified_twice_The_attribute_named_0_will_be_overwritten, unescapeLeadingUnderscores(jsxChildrenPropertyName));
                        }
                        const contextualType = getApparentTypeOfContextualType(openingLikeElement.attributes, 
                        /*contextFlags*/
                        void 0);
                        const childrenContextualType = contextualType && getTypeOfPropertyOfContextualType(contextualType, jsxChildrenPropertyName);
                        const childrenPropSymbol = createSymbol(4 /* Property */, jsxChildrenPropertyName);
                        childrenPropSymbol.links.type = childrenTypes.length === 1 ? childrenTypes[0] : childrenContextualType && someType(childrenContextualType, isTupleLikeType) ? createTupleType(childrenTypes) : createArrayType(getUnionType(childrenTypes));
                        childrenPropSymbol.valueDeclaration = factory.createPropertySignature(
                        /*modifiers*/
                        void 0, unescapeLeadingUnderscores(jsxChildrenPropertyName), 
                        /*questionToken*/
                        void 0, 
                        /*type*/
                        void 0);
                        setParent(childrenPropSymbol.valueDeclaration, attributes);
                        childrenPropSymbol.valueDeclaration.symbol = childrenPropSymbol;
                        const childPropMap = createSymbolTable();
                        childPropMap.set(jsxChildrenPropertyName, childrenPropSymbol);
                        spread = getSpreadType(spread, createAnonymousType(attributes.symbol, childPropMap, emptyArray, emptyArray, emptyArray), attributes.symbol, objectFlags, 
                        /*readonly*/
                        false);
                    }
                }
                if (hasSpreadAnyType) {
                    return anyType;
                }
                if (typeToIntersect && spread !== emptyJsxObjectType) {
                    return getIntersectionType([typeToIntersect, spread]);
                }
                return typeToIntersect || (spread === emptyJsxObjectType ? createJsxAttributesType() : spread);
                function createJsxAttributesType() {
                    objectFlags |= freshObjectLiteralFlag;
                    const result = createAnonymousType(attributes.symbol, attributesTable, emptyArray, emptyArray, emptyArray);
                    result.objectFlags |= objectFlags | 128 /* ObjectLiteral */ | 131072 /* ContainsObjectOrArrayLiteral */;
                    return result;
                }
            }
            function checkPropertyAccessibility(node, isSuper, writing, type, prop, reportError = true) {
            function checkPropertyAccessibilityAtLocation(location, isSuper, writing, containingType, prop, errorNode) {
                const flags = getDeclarationModifierFlagsFromSymbol(prop, writing);
                if (isSuper) {
                    if (languageVersion < 2 /* ES2015 */) {
                        if (symbolHasNonMethodDeclaration(prop)) {
                            if (errorNode) {
                                error(errorNode, Diagnostics.Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword);
                            }
                            return false;
                        }
                    }
                    if (flags & 256 /* Abstract */) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.Abstract_method_0_in_class_1_cannot_be_accessed_via_super_expression, symbolToString(prop), typeToString(getDeclaringClass(prop)));
                        }
                        return false;
                    }
                }
                if (flags & 256 /* Abstract */ && symbolHasNonMethodDeclaration(prop) && (isThisProperty(location) || isThisInitializedObjectBindingExpression(location) || isObjectBindingPattern(location.parent) && isThisInitializedDeclaration(location.parent.parent))) {
                    const declaringClassDeclaration = getClassLikeDeclarationOfSymbol(getParentOfSymbol(prop));
                    if (declaringClassDeclaration && isNodeUsedDuringClassInitialization(location)) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.Abstract_property_0_in_class_1_cannot_be_accessed_in_the_constructor, symbolToString(prop), getTextOfIdentifierOrLiteral(declaringClassDeclaration.name));
                        }
                        return false;
                    }
                }
                if (!(flags & 24 /* NonPublicAccessibilityModifier */)) {
                    return true;
                }
                if (flags & 8 /* Private */) {
                    const declaringClassDeclaration = getClassLikeDeclarationOfSymbol(getParentOfSymbol(prop));
                    if (!isNodeWithinClass(location, declaringClassDeclaration)) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.Property_0_is_private_and_only_accessible_within_class_1, symbolToString(prop), typeToString(getDeclaringClass(prop)));
                        }
                        return false;
                    }
                    return true;
                }
                if (isSuper) {
                    return true;
                }
                let enclosingClass = forEachEnclosingClass(location, (enclosingDeclaration) => {
                    const enclosingClass2 = getDeclaredTypeOfSymbol(getSymbolOfDeclaration(enclosingDeclaration));
                    return isClassDerivedFromDeclaringClasses(enclosingClass2, prop, writing);
                });
                if (!enclosingClass) {
                    enclosingClass = getEnclosingClassFromThisParameter(location);
                    enclosingClass = enclosingClass && isClassDerivedFromDeclaringClasses(enclosingClass, prop, writing);
                    if (flags & 32 /* Static */ || !enclosingClass) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses, symbolToString(prop), typeToString(getDeclaringClass(prop) || containingType));
                        }
                        return false;
                    }
                }
                if (flags & 32 /* Static */) {
                    return true;
                }
                if (containingType.flags & 262144 /* TypeParameter */) {
                    containingType = containingType.isThisType ? getConstraintOfTypeParameter(containingType) : getBaseConstraintOfType(containingType);
                }
                if (!containingType || !hasBaseType(containingType, enclosingClass)) {
                    if (errorNode) {
                        error(errorNode, Diagnostics.Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1_This_is_an_instance_of_class_2, symbolToString(prop), typeToString(enclosingClass), typeToString(containingType));
                    }
                    return false;
                }
                return true;
            }
            function checkPropertyAccessExpressionOrQualifiedName(node, left, leftType, right, checkMode) {
                const parentSymbol = getNodeLinks(left).resolvedSymbol;
                const assignmentKind = getAssignmentTargetKind(node);
                const apparentType = getApparentType(assignmentKind !== 0 /* None */ || isMethodAccessForCall(node) ? getWidenedType(leftType) : leftType);
                const isAnyLike = isTypeAny(apparentType) || apparentType === silentNeverType;
                let prop;
                if (isPrivateIdentifier(right)) {
                    if (languageVersion < 99 /* ESNext */) {
                        if (assignmentKind !== 0 /* None */) {
                            checkExternalEmitHelpers(node, 1048576 /* ClassPrivateFieldSet */);
                        }
                        if (assignmentKind !== 1 /* Definite */) {
                            checkExternalEmitHelpers(node, 524288 /* ClassPrivateFieldGet */);
                        }
                    }
                    const lexicallyScopedSymbol = lookupSymbolForPrivateIdentifierDeclaration(right.escapedText, right);
                    if (assignmentKind && lexicallyScopedSymbol && lexicallyScopedSymbol.valueDeclaration && isMethodDeclaration(lexicallyScopedSymbol.valueDeclaration)) {
                        grammarErrorOnNode(right, Diagnostics.Cannot_assign_to_private_method_0_Private_methods_are_not_writable, idText(right));
                    }
                    if (isAnyLike) {
                        if (lexicallyScopedSymbol) {
                            return isErrorType(apparentType) ? errorType : apparentType;
                        }
                        if (!getContainingClass(right)) {
                            grammarErrorOnNode(right, Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies);
                            return anyType;
                        }
                    }
                    prop = lexicallyScopedSymbol ? getPrivateIdentifierPropertyOfType(leftType, lexicallyScopedSymbol) : void 0;
                    if (!prop && checkPrivateIdentifierPropertyAccess(leftType, right, lexicallyScopedSymbol)) {
                        return errorType;
                    }
                    else {
                        const isSetonlyAccessor = prop && prop.flags & 65536 /* SetAccessor */ && !(prop.flags & 32768 /* GetAccessor */);
                        if (isSetonlyAccessor && assignmentKind !== 1 /* Definite */) {
                            error(node, Diagnostics.Private_accessor_was_defined_without_a_getter);
                        }
                    }
                }
                else {
                    if (isAnyLike) {
                        if (isIdentifier(left) && parentSymbol) {
                            markAliasReferenced(parentSymbol, node);
                        }
                        return isErrorType(apparentType) ? errorType : apparentType;
                    }
                    prop = getPropertyOfType(apparentType, right.escapedText, 
                    /*skipObjectFunctionPropertyAugment*/
                    false, 
                    /*includeTypeOnlyMembers*/
                    node.kind === 163 /* QualifiedName */);
                }
                if (isIdentifier(left) && parentSymbol && (getIsolatedModules(compilerOptions) || !(prop && (isConstEnumOrConstEnumOnlyModule(prop) || prop.flags & 8 /* EnumMember */ && node.parent.kind === 302 /* EnumMember */)) || shouldPreserveConstEnums(compilerOptions) && isExportOrExportExpression(node))) {
                    markAliasReferenced(parentSymbol, node);
                }
                let propType;
                if (!prop) {
                    const indexInfo = !isPrivateIdentifier(right) && (assignmentKind === 0 /* None */ || !isGenericObjectType(leftType) || isThisTypeParameter(leftType)) ? getApplicableIndexInfoForName(apparentType, right.escapedText) : void 0;
                    if (!(indexInfo && indexInfo.type)) {
                        const isUncheckedJS = isUncheckedJSSuggestion(node, leftType.symbol, 
                        /*excludeClasses*/
                        true);
                        if (!isUncheckedJS && isJSLiteralType(leftType)) {
                            return anyType;
                        }
                        if (leftType.symbol === globalThisSymbol) {
                            if (globalThisSymbol.exports.has(right.escapedText) && globalThisSymbol.exports.get(right.escapedText).flags & 418 /* BlockScoped */) {
                                error(right, Diagnostics.Property_0_does_not_exist_on_type_1, unescapeLeadingUnderscores(right.escapedText), typeToString(leftType));
                            }
                            else if (noImplicitAny) {
                                error(right, Diagnostics.Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature, typeToString(leftType));
                            }
                            return anyType;
                        }
                        if (right.escapedText && !checkAndReportErrorForExtendingInterface(node)) {
                            reportNonexistentProperty(right, isThisTypeParameter(leftType) ? apparentType : leftType, isUncheckedJS);
                        }
                        return errorType;
                    }
                    if (indexInfo.isReadonly && (isAssignmentTarget(node) || isDeleteTarget(node))) {
                        error(node, Diagnostics.Index_signature_in_type_0_only_permits_reading, typeToString(apparentType));
                    }
                    propType = compilerOptions.noUncheckedIndexedAccess && !isAssignmentTarget(node) ? getUnionType([indexInfo.type, missingType]) : indexInfo.type;
                    if (compilerOptions.noPropertyAccessFromIndexSignature && isPropertyAccessExpression(node)) {
                        error(right, Diagnostics.Property_0_comes_from_an_index_signature_so_it_must_be_accessed_with_0, unescapeLeadingUnderscores(right.escapedText));
                    }
                    if (indexInfo.declaration && getCombinedNodeFlags(indexInfo.declaration) & 268435456 /* Deprecated */) {
                        addDeprecatedSuggestion(right, [indexInfo.declaration], right.escapedText);
                    }
                }
                else {
                    if (isDeprecatedSymbol(prop) && isUncalledFunctionReference(node, prop) && prop.declarations) {
                        addDeprecatedSuggestion(right, prop.declarations, right.escapedText);
                    }
                    checkPropertyNotUsedBeforeDeclaration(prop, node, right);
                    markPropertyAsReferenced(prop, node, isSelfTypeAccess(left, parentSymbol));
                    getNodeLinks(node).resolvedSymbol = prop;
                    const writing = isWriteAccess(node);
                    checkPropertyAccessibility(node, left.kind === 106 /* SuperKeyword */, writing, apparentType, prop);
                    if (isAssignmentToReadonlyEntity(node, prop, assignmentKind)) {
                        error(right, Diagnostics.Cannot_assign_to_0_because_it_is_a_read_only_property, idText(right));
                        return errorType;
                    }
                    propType = isThisPropertyAccessInConstructor(node, prop) ? autoType : writing ? getWriteTypeOfSymbol(prop) : getTypeOfSymbol(prop);
                }
                return getFlowTypeOfAccessExpression(node, prop, propType, right, checkMode);
            }
            function getFlowTypeOfAccessExpression(node, prop, propType, errorNode, checkMode) {
                const assignmentKind = getAssignmentTargetKind(node);
                if (assignmentKind === 1 /* Definite */) {
                    return removeMissingType(propType, !!(prop && prop.flags & 16777216 /* Optional */));
                }
                if (prop && !(prop.flags & (3 /* Variable */ | 4 /* Property */ | 98304 /* Accessor */)) && !(prop.flags & 8192 /* Method */ && propType.flags & 1048576 /* Union */) && !isDuplicatedCommonJSExport(prop.declarations)) {
                    return propType;
                }
                if (propType === autoType) {
                    return getFlowTypeOfProperty(node, prop);
                }
                propType = getNarrowableTypeForReference(propType, node, checkMode);
                let assumeUninitialized = false;
                if (strictNullChecks && strictPropertyInitialization && isAccessExpression(node) && node.expression.kind === 108 /* ThisKeyword */) {
                    const declaration = prop && prop.valueDeclaration;
                    if (declaration && isPropertyWithoutInitializer(declaration)) {
                        if (!isStatic(declaration)) {
                            const flowContainer = getControlFlowContainer(node);
                            if (flowContainer.kind === 173 /* Constructor */ && flowContainer.parent === declaration.parent && !(declaration.flags & 16777216 /* Ambient */)) {
                                assumeUninitialized = true;
                            }
                        }
                    }
                }
                else if (strictNullChecks && prop && prop.valueDeclaration && isPropertyAccessExpression(prop.valueDeclaration) && getAssignmentDeclarationPropertyAccessKind(prop.valueDeclaration) && getControlFlowContainer(node) === getControlFlowContainer(prop.valueDeclaration)) {
                    assumeUninitialized = true;
                }
                const flowType = getFlowTypeOfReference(node, propType, assumeUninitialized ? getOptionalType(propType) : propType);
                if (assumeUninitialized && !containsUndefinedType(propType) && containsUndefinedType(flowType)) {
                    error(errorNode, Diagnostics.Property_0_is_used_before_being_assigned, symbolToString(prop));
                    return propType;
                }
                return assignmentKind ? getBaseTypeOfLiteralType(flowType) : flowType;
            }
                return !!findAncestor(node, (node2) => {
                    switch (node2.kind) {
                        case 169 /* PropertyDeclaration */:
                            return true;
                        case 299 /* PropertyAssignment */:
                        case 171 /* MethodDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                        case 301 /* SpreadAssignment */:
                        case 164 /* ComputedPropertyName */:
                        case 236 /* TemplateSpan */:
                        case 291 /* JsxExpression */:
                        case 288 /* JsxAttribute */:
                        case 289 /* JsxAttributes */:
                        case 290 /* JsxSpreadAttribute */:
                        case 283 /* JsxOpeningElement */:
                        case 230 /* ExpressionWithTypeArguments */:
                        case 294 /* HeritageClause */:
                            return false;
                        case 216 /* ArrowFunction */:
                        case 241 /* ExpressionStatement */:
                            return isBlock(node2.parent) && isClassStaticBlockDeclaration(node2.parent.parent) ? true : "quit";
                        default:
                            return isExpressionNode(node2) ? false : "quit";
                    }
                });
            function hasCorrectArity(node, args, signature, signatureHelpTrailingComma = false) {
                let argCount;
                let callIsIncomplete = false;
                let effectiveParameterCount = getParameterCount(signature);
                let effectiveMinimumArguments = getMinArgumentCount(signature);
                if (node.kind === 212 /* TaggedTemplateExpression */) {
                    argCount = args.length;
                    if (node.template.kind === 225 /* TemplateExpression */) {
                        const lastSpan = last(node.template.templateSpans);
                        callIsIncomplete = nodeIsMissing(lastSpan.literal) || !!lastSpan.literal.isUnterminated;
                    }
                    else {
                        const templateLiteral = node.template;
                        Debug.assert(templateLiteral.kind === 14 /* NoSubstitutionTemplateLiteral */);
                        callIsIncomplete = !!templateLiteral.isUnterminated;
                    }
                }
                else if (node.kind === 167 /* Decorator */) {
                    argCount = getDecoratorArgumentCount(node, signature);
                }
                else if (isJsxOpeningLikeElement(node)) {
                    callIsIncomplete = node.attributes.end === node.end;
                    if (callIsIncomplete) {
                        return true;
                    }
                    argCount = effectiveMinimumArguments === 0 ? args.length : 1;
                    effectiveParameterCount = args.length === 0 ? effectiveParameterCount : 1;
                    effectiveMinimumArguments = Math.min(effectiveMinimumArguments, 1);
                }
                else if (!node.arguments) {
                    Debug.assert(node.kind === 211 /* NewExpression */);
                    return getMinArgumentCount(signature) === 0;
                }
                else {
                    argCount = signatureHelpTrailingComma ? args.length + 1 : args.length;
                    callIsIncomplete = node.arguments.end === node.end;
                    const spreadArgIndex = getSpreadArgumentIndex(args);
                    if (spreadArgIndex >= 0) {
                        return spreadArgIndex >= getMinArgumentCount(signature) && (hasEffectiveRestParameter(signature) || spreadArgIndex < getParameterCount(signature));
                    }
                }
                if (!hasEffectiveRestParameter(signature) && argCount > effectiveParameterCount) {
                    return false;
                }
                if (callIsIncomplete || argCount >= effectiveMinimumArguments) {
                    return true;
                }
                for (let i = argCount; i < effectiveMinimumArguments; i++) {
                    const type = getTypeAtPosition(signature, i);
                    if (filterType(type, isInJSFile(node) && !strictNullChecks ? acceptsVoidUndefinedUnknownOrAny : acceptsVoid).flags & 131072 /* Never */) {
                        return false;
                    }
                }
                return true;
            }
            function inferTypeArguments(node, signature, args, checkMode, context) {
                if (isJsxOpeningLikeElement(node)) {
                    return inferJsxTypeArguments(node, signature, checkMode, context);
                }
                if (node.kind !== 167 /* Decorator */) {
                    const skipBindingPatterns = every(signature.typeParameters, (p) => !!getDefaultFromTypeParameter(p));
                    const contextualType = getContextualType2(node, skipBindingPatterns ? 8 /* SkipBindingPatterns */ : 0 /* None */);
                    if (contextualType) {
                        const inferenceTargetType = getReturnTypeOfSignature(signature);
                        if (couldContainTypeVariables(inferenceTargetType)) {
                            const outerContext = getInferenceContext(node);
                            const isFromBindingPattern = !skipBindingPatterns && getContextualType2(node, 8 /* SkipBindingPatterns */) !== contextualType;
                            if (!isFromBindingPattern) {
                                const outerMapper = getMapperFromContext(cloneInferenceContext(outerContext, 1 /* NoDefault */));
                                const instantiatedType = instantiateType(contextualType, outerMapper);
                                const contextualSignature = getSingleCallSignature(instantiatedType);
                                const inferenceSourceType = contextualSignature && contextualSignature.typeParameters ? getOrCreateTypeFromSignature(getSignatureInstantiationWithoutFillingInTypeArguments(contextualSignature, contextualSignature.typeParameters)) : instantiatedType;
                                inferTypes(context.inferences, inferenceSourceType, inferenceTargetType, 128 /* ReturnType */);
                            }
                            const returnContext = createInferenceContext(signature.typeParameters, signature, context.flags);
                            const returnSourceType = instantiateType(contextualType, outerContext && outerContext.returnMapper);
                            inferTypes(returnContext.inferences, returnSourceType, inferenceTargetType);
                            context.returnMapper = some(returnContext.inferences, hasInferenceCandidates) ? getMapperFromContext(cloneInferredPartOfContext(returnContext)) : void 0;
                        }
                    }
                }
                const restType = getNonArrayRestType(signature);
                const argCount = restType ? Math.min(getParameterCount(signature) - 1, args.length) : args.length;
                if (restType && restType.flags & 262144 /* TypeParameter */) {
                    const info = find(context.inferences, (info2) => info2.typeParameter === restType);
                    if (info) {
                        info.impliedArity = findIndex(args, isSpreadArgument, argCount) < 0 ? args.length - argCount : void 0;
                    }
                }
                const thisType = getThisTypeOfSignature(signature);
                if (thisType && couldContainTypeVariables(thisType)) {
                    const thisArgumentNode = getThisArgumentOfCall(node);
                    inferTypes(context.inferences, getThisArgumentType(thisArgumentNode), thisType);
                }
                for (let i = 0; i < argCount; i++) {
                    const arg = args[i];
                    if (arg.kind !== 229 /* OmittedExpression */ && !(checkMode & 32 /* IsForStringLiteralArgumentCompletions */ && hasSkipDirectInferenceFlag(arg))) {
                        const paramType = getTypeAtPosition(signature, i);
                        if (couldContainTypeVariables(paramType)) {
                            const argType = checkExpressionWithContextualType(arg, paramType, context, checkMode);
                            inferTypes(context.inferences, argType, paramType);
                        }
                    }
                }
                if (restType && couldContainTypeVariables(restType)) {
                    const spreadType = getSpreadArgumentType(args, argCount, args.length, restType, context, checkMode);
                    inferTypes(context.inferences, spreadType, restType);
                }
                return getInferredTypes(context);
            }
            function getSpreadArgumentType(args, index, argCount, restType, context, checkMode) {
            function checkApplicableSignatureForJsxOpeningLikeElement(node, signature, relation, checkMode, reportErrors2, containingMessageChain, errorOutputContainer) {
                function checkTagNameDoesNotExpectTooManyArguments() {
                    var _a2;
                    if (getJsxNamespaceContainerForImplicitImport(node)) {
                        return true;
                    }
                    const tagType = isJsxOpeningElement(node) || isJsxSelfClosingElement(node) && !isJsxIntrinsicIdentifier(node.tagName) ? checkExpression(node.tagName) : void 0;
                    if (!tagType) {
                        return true;
                    }
                    const tagCallSignatures = getSignaturesOfType(tagType, 0 /* Call */);
                    if (!length(tagCallSignatures)) {
                        return true;
                    }
                    const factory2 = getJsxFactoryEntity(node);
                    if (!factory2) {
                        return true;
                    }
                    const factorySymbol = resolveEntityName(factory2, 111551 /* Value */, 
                    /*ignoreErrors*/
                    true, 
                    /*dontResolveAlias*/
                    false, node);
                    if (!factorySymbol) {
                        return true;
                    }
                    const factoryType = getTypeOfSymbol(factorySymbol);
                    const callSignatures = getSignaturesOfType(factoryType, 0 /* Call */);
                    if (!length(callSignatures)) {
                        return true;
                    }
                    let hasFirstParamSignatures = false;
                    let maxParamCount = 0;
                    for (const sig of callSignatures) {
                        const firstparam = getTypeAtPosition(sig, 0);
                        const signaturesOfParam = getSignaturesOfType(firstparam, 0 /* Call */);
                        if (!length(signaturesOfParam))
                            continue;
                        for (const paramSig of signaturesOfParam) {
                            hasFirstParamSignatures = true;
                            if (hasEffectiveRestParameter(paramSig)) {
                                return true;
                            }
                            const paramCount = getParameterCount(paramSig);
                            if (paramCount > maxParamCount) {
                                maxParamCount = paramCount;
                            }
                        }
                    }
                    if (!hasFirstParamSignatures) {
                        return true;
                    }
                    let absoluteMinArgCount = Infinity;
                    for (const tagSig of tagCallSignatures) {
                        const tagRequiredArgCount = getMinArgumentCount(tagSig);
                        if (tagRequiredArgCount < absoluteMinArgCount) {
                            absoluteMinArgCount = tagRequiredArgCount;
                        }
                    }
                    if (absoluteMinArgCount <= maxParamCount) {
                        return true;
                    }
                    if (reportErrors2) {
                        const diag2 = createDiagnosticForNode(node.tagName, Diagnostics.Tag_0_expects_at_least_1_arguments_but_the_JSX_factory_2_provides_at_most_3, entityNameToString(node.tagName), absoluteMinArgCount, entityNameToString(factory2), maxParamCount);
                        const tagNameDeclaration = (_a2 = getSymbolAtLocation(node.tagName)) == null ? void 0 : _a2.valueDeclaration;
                        if (tagNameDeclaration) {
                            addRelatedInfo(diag2, createDiagnosticForNode(tagNameDeclaration, Diagnostics._0_is_declared_here, entityNameToString(node.tagName)));
                        }
                        if (errorOutputContainer && errorOutputContainer.skipLogging) {
                            (errorOutputContainer.errors || (errorOutputContainer.errors = [])).push(diag2);
                        }
                        if (!errorOutputContainer.skipLogging) {
                            diagnostics.add(diag2);
                        }
                    }
                    return false;
                }
            function getSignatureApplicabilityError(node, args, signature, relation, checkMode, reportErrors2, containingMessageChain) {
                const errorOutputContainer = { errors: void 0, skipLogging: true };
                if (isJsxOpeningLikeElement(node)) {
                    if (!checkApplicableSignatureForJsxOpeningLikeElement(node, signature, relation, checkMode, reportErrors2, containingMessageChain, errorOutputContainer)) {
                        Debug.assert(!reportErrors2 || !!errorOutputContainer.errors, "jsx should have errors when reporting errors");
                        return errorOutputContainer.errors || emptyArray;
                    }
                    return void 0;
                }
                const thisType = getThisTypeOfSignature(signature);
                if (thisType && thisType !== voidType && !(isNewExpression(node) || isCallExpression(node) && isSuperProperty(node.expression))) {
                    const thisArgumentNode = getThisArgumentOfCall(node);
                    const thisArgumentType = getThisArgumentType(thisArgumentNode);
                    const errorNode = reportErrors2 ? thisArgumentNode || node : void 0;
                    const headMessage2 = Diagnostics.The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1;
                    if (!checkTypeRelatedTo(thisArgumentType, thisType, relation, errorNode, headMessage2, containingMessageChain, errorOutputContainer)) {
                        Debug.assert(!reportErrors2 || !!errorOutputContainer.errors, "this parameter should have errors when reporting errors");
                        return errorOutputContainer.errors || emptyArray;
                    }
                }
                const headMessage = Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1;
                const restType = getNonArrayRestType(signature);
                const argCount = restType ? Math.min(getParameterCount(signature) - 1, args.length) : args.length;
                for (let i = 0; i < argCount; i++) {
                    const arg = args[i];
                    if (arg.kind !== 229 /* OmittedExpression */) {
                        const paramType = getTypeAtPosition(signature, i);
                        const argType = checkExpressionWithContextualType(arg, paramType, 
                        /*inferenceContext*/
                        void 0, checkMode);
                        const checkArgType = checkMode & 4 /* SkipContextSensitive */ ? getRegularTypeOfObjectLiteral(argType) : argType;
                        if (!checkTypeRelatedToAndOptionallyElaborate(checkArgType, paramType, relation, reportErrors2 ? arg : void 0, arg, headMessage, containingMessageChain, errorOutputContainer)) {
                            Debug.assert(!reportErrors2 || !!errorOutputContainer.errors, "parameter should have errors when reporting errors");
                            maybeAddMissingAwaitInfo(arg, checkArgType, paramType);
                            return errorOutputContainer.errors || emptyArray;
                        }
                    }
                }
                if (restType) {
                    const spreadType = getSpreadArgumentType(args, argCount, args.length, restType, 
                    /*context*/
                    void 0, checkMode);
                    const restArgCount = args.length - argCount;
                    const errorNode = !reportErrors2 ? void 0 : restArgCount === 0 ? node : restArgCount === 1 ? args[argCount] : setTextRangePosEnd(createSyntheticExpression(node, spreadType), args[argCount].pos, args[args.length - 1].end);
                    if (!checkTypeRelatedTo(spreadType, restType, relation, errorNode, headMessage, 
                    /*containingMessageChain*/
                    void 0, errorOutputContainer)) {
                        Debug.assert(!reportErrors2 || !!errorOutputContainer.errors, "rest parameter should have errors when reporting errors");
                        maybeAddMissingAwaitInfo(errorNode, spreadType, restType);
                        return errorOutputContainer.errors || emptyArray;
                    }
                }
                return void 0;
                function maybeAddMissingAwaitInfo(errorNode, source, target) {
                    if (errorNode && reportErrors2 && errorOutputContainer.errors && errorOutputContainer.errors.length) {
                        if (getAwaitedTypeOfPromise(target)) {
                            return;
                        }
                        const awaitedTypeOfSource = getAwaitedTypeOfPromise(source);
                        if (awaitedTypeOfSource && isTypeRelatedTo(awaitedTypeOfSource, target, relation)) {
                            addRelatedInfo(errorOutputContainer.errors[0], createDiagnosticForNode(errorNode, Diagnostics.Did_you_forget_to_use_await));
                        }
                    }
                }
            }
            function getDiagnosticForCallNode(node, message, arg0, arg1, arg2, arg3) {
            function getArgumentArityError(node, signatures, args, headMessage) {
                var _a2;
                const spreadIndex = getSpreadArgumentIndex(args);
                if (spreadIndex > -1) {
                    return createDiagnosticForNode(args[spreadIndex], Diagnostics.A_spread_argument_must_either_have_a_tuple_type_or_be_passed_to_a_rest_parameter);
                }
                let min2 = Number.POSITIVE_INFINITY;
                let max = Number.NEGATIVE_INFINITY;
                let maxBelow = Number.NEGATIVE_INFINITY;
                let minAbove = Number.POSITIVE_INFINITY;
                let closestSignature;
                for (const sig of signatures) {
                    const minParameter = getMinArgumentCount(sig);
                    const maxParameter = getParameterCount(sig);
                    if (minParameter < min2) {
                        min2 = minParameter;
                        closestSignature = sig;
                    }
                    max = Math.max(max, maxParameter);
                    if (minParameter < args.length && minParameter > maxBelow)
                        maxBelow = minParameter;
                    if (args.length < maxParameter && maxParameter < minAbove)
                        minAbove = maxParameter;
                }
                const hasRestParameter2 = some(signatures, hasEffectiveRestParameter);
                const parameterRange = hasRestParameter2 ? min2 : min2 < max ? min2 + "-" + max : min2;
                const isVoidPromiseError = !hasRestParameter2 && parameterRange === 1 && args.length === 0 && isPromiseResolveArityError(node);
                if (isVoidPromiseError && isInJSFile(node)) {
                    return getDiagnosticForCallNode(node, Diagnostics.Expected_1_argument_but_got_0_new_Promise_needs_a_JSDoc_hint_to_produce_a_resolve_that_can_be_called_without_arguments);
                }
                const error2 = isDecorator(node) ? hasRestParameter2 ? Diagnostics.The_runtime_will_invoke_the_decorator_with_1_arguments_but_the_decorator_expects_at_least_0 : Diagnostics.The_runtime_will_invoke_the_decorator_with_1_arguments_but_the_decorator_expects_0 : hasRestParameter2 ? Diagnostics.Expected_at_least_0_arguments_but_got_1 : isVoidPromiseError ? Diagnostics.Expected_0_arguments_but_got_1_Did_you_forget_to_include_void_in_your_type_argument_to_Promise : Diagnostics.Expected_0_arguments_but_got_1;
                if (min2 < args.length && args.length < max) {
                    if (headMessage) {
                        let chain = chainDiagnosticMessages(
                        /*details*/
                        void 0, Diagnostics.No_overload_expects_0_arguments_but_overloads_do_exist_that_expect_either_1_or_2_arguments, args.length, maxBelow, minAbove);
                        chain = chainDiagnosticMessages(chain, headMessage);
                        return getDiagnosticForCallNode(node, chain);
                    }
                    return getDiagnosticForCallNode(node, Diagnostics.No_overload_expects_0_arguments_but_overloads_do_exist_that_expect_either_1_or_2_arguments, args.length, maxBelow, minAbove);
                }
                else if (args.length < min2) {
                    let diagnostic;
                    if (headMessage) {
                        let chain = chainDiagnosticMessages(
                        /*details*/
                        void 0, error2, parameterRange, args.length);
                        chain = chainDiagnosticMessages(chain, headMessage);
                        diagnostic = getDiagnosticForCallNode(node, chain);
                    }
                    else {
                        diagnostic = getDiagnosticForCallNode(node, error2, parameterRange, args.length);
                    }
                    const parameter = (_a2 = closestSignature == null ? void 0 : closestSignature.declaration) == null ? void 0 : _a2.parameters[closestSignature.thisParameter ? args.length + 1 : args.length];
                    if (parameter) {
                        const parameterError = createDiagnosticForNode(parameter, isBindingPattern(parameter.name) ? Diagnostics.An_argument_matching_this_binding_pattern_was_not_provided : isRestParameter(parameter) ? Diagnostics.Arguments_for_the_rest_parameter_0_were_not_provided : Diagnostics.An_argument_for_0_was_not_provided, !parameter.name ? args.length : !isBindingPattern(parameter.name) ? idText(getFirstIdentifier(parameter.name)) : void 0);
                        return addRelatedInfo(diagnostic, parameterError);
                    }
                    return diagnostic;
                }
                else {
                    const errorSpan = factory.createNodeArray(args.slice(max));
                    const pos = first(errorSpan).pos;
                    let end = last(errorSpan).end;
                    if (end === pos) {
                        end++;
                    }
                    setTextRangePosEnd(errorSpan, pos, end);
                    if (headMessage) {
                        let chain = chainDiagnosticMessages(
                        /*details*/
                        void 0, error2, parameterRange, args.length);
                        chain = chainDiagnosticMessages(chain, headMessage);
                        return createDiagnosticForNodeArrayFromMessageChain(getSourceFileOfNode(node), errorSpan, chain);
                    }
                    return createDiagnosticForNodeArray(getSourceFileOfNode(node), errorSpan, error2, parameterRange, args.length);
                }
            }
            function resolveCall(node, signatures, candidatesOutArray, checkMode, callChainFlags, headMessage) {
                const isTaggedTemplate = node.kind === 212 /* TaggedTemplateExpression */;
                const isDecorator2 = node.kind === 167 /* Decorator */;
                const isJsxOpeningOrSelfClosingElement = isJsxOpeningLikeElement(node);
                const reportErrors2 = !isInferencePartiallyBlocked && !candidatesOutArray;
                let typeArguments;
                if (!isDecorator2 && !isSuperCall(node)) {
                    typeArguments = node.typeArguments;
                    if (isTaggedTemplate || isJsxOpeningOrSelfClosingElement || node.expression.kind !== 106 /* SuperKeyword */) {
                        forEach(typeArguments, checkSourceElement);
                    }
                }
                const candidates = candidatesOutArray || [];
                reorderCandidates(signatures, candidates, callChainFlags);
                if (!candidates.length) {
                    if (reportErrors2) {
                        diagnostics.add(getDiagnosticForCallNode(node, Diagnostics.Call_target_does_not_contain_any_signatures));
                    }
                    return resolveErrorCall(node);
                }
                const args = getEffectiveCallArguments(node);
                const isSingleNonGenericCandidate = candidates.length === 1 && !candidates[0].typeParameters;
                let argCheckMode = !isDecorator2 && !isSingleNonGenericCandidate && some(args, isContextSensitive) ? 4 /* SkipContextSensitive */ : 0 /* Normal */;
                argCheckMode |= checkMode & 32 /* IsForStringLiteralArgumentCompletions */;
                let candidatesForArgumentError;
                let candidateForArgumentArityError;
                let candidateForTypeArgumentError;
                let result;
                const signatureHelpTrailingComma = !!(checkMode & 16 /* IsForSignatureHelp */) && node.kind === 210 /* CallExpression */ && node.arguments.hasTrailingComma;
                if (candidates.length > 1) {
                    result = chooseOverload(candidates, subtypeRelation, isSingleNonGenericCandidate, signatureHelpTrailingComma);
                }
                if (!result) {
                    result = chooseOverload(candidates, assignableRelation, isSingleNonGenericCandidate, signatureHelpTrailingComma);
                }
                if (result) {
                    return result;
                }
                result = getCandidateForOverloadFailure(node, candidates, args, !!candidatesOutArray, checkMode);
                getNodeLinks(node).resolvedSignature = result;
                if (reportErrors2) {
                    if (candidatesForArgumentError) {
                        if (candidatesForArgumentError.length === 1 || candidatesForArgumentError.length > 3) {
                            const last2 = candidatesForArgumentError[candidatesForArgumentError.length - 1];
                            let chain;
                            if (candidatesForArgumentError.length > 3) {
                                chain = chainDiagnosticMessages(chain, Diagnostics.The_last_overload_gave_the_following_error);
                                chain = chainDiagnosticMessages(chain, Diagnostics.No_overload_matches_this_call);
                            }
                            if (headMessage) {
                                chain = chainDiagnosticMessages(chain, headMessage);
                            }
                            const diags = getSignatureApplicabilityError(node, args, last2, assignableRelation, 0 /* Normal */, 
                            /*reportErrors*/
                            true, () => chain);
                            if (diags) {
                                for (const d of diags) {
                                    if (last2.declaration && candidatesForArgumentError.length > 3) {
                                        addRelatedInfo(d, createDiagnosticForNode(last2.declaration, Diagnostics.The_last_overload_is_declared_here));
                                    }
                                    addImplementationSuccessElaboration(last2, d);
                                    diagnostics.add(d);
                                }
                            }
                            else {
                                Debug.fail("No error for last overload signature");
                            }
                        }
                        else {
                            const allDiagnostics = [];
                            let max = 0;
                            let min2 = Number.MAX_VALUE;
                            let minIndex = 0;
                            let i = 0;
                            for (const c of candidatesForArgumentError) {
                                const chain2 = () => chainDiagnosticMessages(
                                /*details*/
                                void 0, Diagnostics.Overload_0_of_1_2_gave_the_following_error, i + 1, candidates.length, signatureToString(c));
                                const diags2 = getSignatureApplicabilityError(node, args, c, assignableRelation, 0 /* Normal */, 
                                /*reportErrors*/
                                true, chain2);
                                if (diags2) {
                                    if (diags2.length <= min2) {
                                        min2 = diags2.length;
                                        minIndex = i;
                                    }
                                    max = Math.max(max, diags2.length);
                                    allDiagnostics.push(diags2);
                                }
                                else {
                                    Debug.fail("No error for 3 or fewer overload signatures");
                                }
                                i++;
                            }
                            const diags = max > 1 ? allDiagnostics[minIndex] : flatten(allDiagnostics);
                            Debug.assert(diags.length > 0, "No errors reported for 3 or fewer overload signatures");
                            let chain = chainDiagnosticMessages(map(diags, createDiagnosticMessageChainFromDiagnostic), Diagnostics.No_overload_matches_this_call);
                            if (headMessage) {
                                chain = chainDiagnosticMessages(chain, headMessage);
                            }
                            const related = [...flatMap(diags, (d) => d.relatedInformation)];
                            let diag2;
                            if (every(diags, (d) => d.start === diags[0].start && d.length === diags[0].length && d.file === diags[0].file)) {
                                const { file, start, length: length2 } = diags[0];
                                diag2 = { file, start, length: length2, code: chain.code, category: chain.category, messageText: chain, relatedInformation: related };
                            }
                            else {
                                diag2 = createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(node), node, chain, related);
                            }
                            addImplementationSuccessElaboration(candidatesForArgumentError[0], diag2);
                            diagnostics.add(diag2);
                        }
                    }
                    else if (candidateForArgumentArityError) {
                        diagnostics.add(getArgumentArityError(node, [candidateForArgumentArityError], args, headMessage));
                    }
                    else if (candidateForTypeArgumentError) {
                        checkTypeArguments(candidateForTypeArgumentError, node.typeArguments, 
                        /*reportErrors*/
                        true, headMessage);
                    }
                    else {
                        const signaturesWithCorrectTypeArgumentArity = filter(signatures, (s) => hasCorrectTypeArgumentArity(s, typeArguments));
                        if (signaturesWithCorrectTypeArgumentArity.length === 0) {
                            diagnostics.add(getTypeArgumentArityError(node, signatures, typeArguments, headMessage));
                        }
                        else {
                            diagnostics.add(getArgumentArityError(node, signaturesWithCorrectTypeArgumentArity, args, headMessage));
                        }
                    }
                }
                return result;
                function addImplementationSuccessElaboration(failed, diagnostic) {
                    var _a2, _b;
                    const oldCandidatesForArgumentError = candidatesForArgumentError;
                    const oldCandidateForArgumentArityError = candidateForArgumentArityError;
                    const oldCandidateForTypeArgumentError = candidateForTypeArgumentError;
                    const failedSignatureDeclarations = ((_b = (_a2 = failed.declaration) == null ? void 0 : _a2.symbol) == null ? void 0 : _b.declarations) || emptyArray;
                    const isOverload = failedSignatureDeclarations.length > 1;
                    const implDecl = isOverload ? find(failedSignatureDeclarations, (d) => isFunctionLikeDeclaration(d) && nodeIsPresent(d.body)) : void 0;
                    if (implDecl) {
                        const candidate = getSignatureFromDeclaration(implDecl);
                        const isSingleNonGenericCandidate2 = !candidate.typeParameters;
                        if (chooseOverload([candidate], assignableRelation, isSingleNonGenericCandidate2)) {
                            addRelatedInfo(diagnostic, createDiagnosticForNode(implDecl, Diagnostics.The_call_would_have_succeeded_against_this_implementation_but_implementation_signatures_of_overloads_are_not_externally_visible));
                        }
                    }
                    candidatesForArgumentError = oldCandidatesForArgumentError;
                    candidateForArgumentArityError = oldCandidateForArgumentArityError;
                    candidateForTypeArgumentError = oldCandidateForTypeArgumentError;
                }
                function chooseOverload(candidates2, relation, isSingleNonGenericCandidate2, signatureHelpTrailingComma2 = false) {
                    candidatesForArgumentError = void 0;
                    candidateForArgumentArityError = void 0;
                    candidateForTypeArgumentError = void 0;
                    if (isSingleNonGenericCandidate2) {
                        const candidate = candidates2[0];
                        if (some(typeArguments) || !hasCorrectArity(node, args, candidate, signatureHelpTrailingComma2)) {
                            return void 0;
                        }
                        if (getSignatureApplicabilityError(node, args, candidate, relation, 0 /* Normal */, 
                        /*reportErrors*/
                        false, 
                        /*containingMessageChain*/
                        void 0)) {
                            candidatesForArgumentError = [candidate];
                            return void 0;
                        }
                        return candidate;
                    }
                    for (let candidateIndex = 0; candidateIndex < candidates2.length; candidateIndex++) {
                        const candidate = candidates2[candidateIndex];
                        if (!hasCorrectTypeArgumentArity(candidate, typeArguments) || !hasCorrectArity(node, args, candidate, signatureHelpTrailingComma2)) {
                            continue;
                        }
                        let checkCandidate;
                        let inferenceContext;
                        if (candidate.typeParameters) {
                            let typeArgumentTypes;
                            if (some(typeArguments)) {
                                typeArgumentTypes = checkTypeArguments(candidate, typeArguments, 
                                /*reportErrors*/
                                false);
                                if (!typeArgumentTypes) {
                                    candidateForTypeArgumentError = candidate;
                                    continue;
                                }
                            }
                            else {
                                inferenceContext = createInferenceContext(candidate.typeParameters, candidate, 
                                /*flags*/
                                isInJSFile(node) ? 2 /* AnyDefault */ : 0 /* None */);
                                typeArgumentTypes = inferTypeArguments(node, candidate, args, argCheckMode | 8 /* SkipGenericFunctions */, inferenceContext);
                                argCheckMode |= inferenceContext.flags & 4 /* SkippedGenericFunction */ ? 8 /* SkipGenericFunctions */ : 0 /* Normal */;
                            }
                            checkCandidate = getSignatureInstantiation(candidate, typeArgumentTypes, isInJSFile(candidate.declaration), inferenceContext && inferenceContext.inferredTypeParameters);
                            if (getNonArrayRestType(candidate) && !hasCorrectArity(node, args, checkCandidate, signatureHelpTrailingComma2)) {
                                candidateForArgumentArityError = checkCandidate;
                                continue;
                            }
                        }
                        else {
                            checkCandidate = candidate;
                        }
                        if (getSignatureApplicabilityError(node, args, checkCandidate, relation, argCheckMode, 
                        /*reportErrors*/
                        false, 
                        /*containingMessageChain*/
                        void 0)) {
                            (candidatesForArgumentError || (candidatesForArgumentError = [])).push(checkCandidate);
                            continue;
                        }
                        if (argCheckMode) {
                            argCheckMode = checkMode & 32 /* IsForStringLiteralArgumentCompletions */;
                            if (inferenceContext) {
                                const typeArgumentTypes = inferTypeArguments(node, candidate, args, argCheckMode, inferenceContext);
                                checkCandidate = getSignatureInstantiation(candidate, typeArgumentTypes, isInJSFile(candidate.declaration), inferenceContext.inferredTypeParameters);
                                if (getNonArrayRestType(candidate) && !hasCorrectArity(node, args, checkCandidate, signatureHelpTrailingComma2)) {
                                    candidateForArgumentArityError = checkCandidate;
                                    continue;
                                }
                            }
                            if (getSignatureApplicabilityError(node, args, checkCandidate, relation, argCheckMode, 
                            /*reportErrors*/
                            false, 
                            /*containingMessageChain*/
                            void 0)) {
                                (candidatesForArgumentError || (candidatesForArgumentError = [])).push(checkCandidate);
                                continue;
                            }
                        }
                        candidates2[candidateIndex] = checkCandidate;
                        return checkCandidate;
                    }
                    return void 0;
                }
            }
            function resolveCallExpression(node, candidatesOutArray, checkMode) {
                if (node.expression.kind === 106 /* SuperKeyword */) {
                    const superType = checkSuperExpression(node.expression);
                    if (isTypeAny(superType)) {
                        for (const arg of node.arguments) {
                            checkExpression(arg);
                        }
                        return anySignature;
                    }
                    if (!isErrorType(superType)) {
                        const baseTypeNode = getEffectiveBaseTypeNode(getContainingClass(node));
                        if (baseTypeNode) {
                            const baseConstructors = getInstantiatedConstructorsForTypeArguments(superType, baseTypeNode.typeArguments, baseTypeNode);
                            return resolveCall(node, baseConstructors, candidatesOutArray, checkMode, 0 /* None */);
                        }
                    }
                    return resolveUntypedCall(node);
                }
                let callChainFlags;
                let funcType = checkExpression(node.expression);
                if (isCallChain(node)) {
                    const nonOptionalType = getOptionalExpressionType(funcType, node.expression);
                    callChainFlags = nonOptionalType === funcType ? 0 /* None */ : isOutermostOptionalChain(node) ? 16 /* IsOuterCallChain */ : 8 /* IsInnerCallChain */;
                    funcType = nonOptionalType;
                }
                else {
                    callChainFlags = 0 /* None */;
                }
                funcType = checkNonNullTypeWithReporter(funcType, node.expression, reportCannotInvokePossiblyNullOrUndefinedError);
                if (funcType === silentNeverType) {
                    return silentNeverSignature;
                }
                const apparentType = getApparentType(funcType);
                if (isErrorType(apparentType)) {
                    return resolveErrorCall(node);
                }
                const callSignatures = getSignaturesOfType(apparentType, 0 /* Call */);
                const numConstructSignatures = getSignaturesOfType(apparentType, 1 /* Construct */).length;
                if (isUntypedFunctionCall(funcType, apparentType, callSignatures.length, numConstructSignatures)) {
                    if (!isErrorType(funcType) && node.typeArguments) {
                        error(node, Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                    }
                    return resolveUntypedCall(node);
                }
                if (!callSignatures.length) {
                    if (numConstructSignatures) {
                        error(node, Diagnostics.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new, typeToString(funcType));
                    }
                    else {
                        let relatedInformation;
                        if (node.arguments.length === 1) {
                            const text = getSourceFileOfNode(node).text;
                            if (isLineBreak(text.charCodeAt(skipTrivia(text, node.expression.end, 
                            /* stopAfterLineBreak */
                            true) - 1))) {
                                relatedInformation = createDiagnosticForNode(node.expression, Diagnostics.Are_you_missing_a_semicolon);
                            }
                        }
                        invocationError(node.expression, apparentType, 0 /* Call */, relatedInformation);
                    }
                    return resolveErrorCall(node);
                }
                if (checkMode & 8 /* SkipGenericFunctions */ && !node.typeArguments && callSignatures.some(isGenericFunctionReturningFunction)) {
                    skippedGenericFunction(node, checkMode);
                    return resolvingSignature;
                }
                if (callSignatures.some((sig) => isInJSFile(sig.declaration) && !!getJSDocClassTag(sig.declaration))) {
                    error(node, Diagnostics.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new, typeToString(funcType));
                    return resolveErrorCall(node);
                }
                return resolveCall(node, callSignatures, candidatesOutArray, checkMode, callChainFlags);
            }
            function invocationErrorDetails(errorTarget, apparentType, kind) {
                let errorInfo;
                const isCall = kind === 0 /* Call */;
                const awaitedType = getAwaitedType(apparentType);
                const maybeMissingAwait = awaitedType && getSignaturesOfType(awaitedType, kind).length > 0;
                if (apparentType.flags & 1048576 /* Union */) {
                    const types = apparentType.types;
                    let hasSignatures = false;
                    for (const constituent of types) {
                        const signatures = getSignaturesOfType(constituent, kind);
                        if (signatures.length !== 0) {
                            hasSignatures = true;
                            if (errorInfo) {
                                break;
                            }
                        }
                        else {
                            if (!errorInfo) {
                                errorInfo = chainDiagnosticMessages(errorInfo, isCall ? Diagnostics.Type_0_has_no_call_signatures : Diagnostics.Type_0_has_no_construct_signatures, typeToString(constituent));
                                errorInfo = chainDiagnosticMessages(errorInfo, isCall ? Diagnostics.Not_all_constituents_of_type_0_are_callable : Diagnostics.Not_all_constituents_of_type_0_are_constructable, typeToString(apparentType));
                            }
                            if (hasSignatures) {
                                break;
                            }
                        }
                    }
                    if (!hasSignatures) {
                        errorInfo = chainDiagnosticMessages(
                        /* detials */
                        void 0, isCall ? Diagnostics.No_constituent_of_type_0_is_callable : Diagnostics.No_constituent_of_type_0_is_constructable, typeToString(apparentType));
                    }
                    if (!errorInfo) {
                        errorInfo = chainDiagnosticMessages(errorInfo, isCall ? Diagnostics.Each_member_of_the_union_type_0_has_signatures_but_none_of_those_signatures_are_compatible_with_each_other : Diagnostics.Each_member_of_the_union_type_0_has_construct_signatures_but_none_of_those_signatures_are_compatible_with_each_other, typeToString(apparentType));
                    }
                }
                else {
                    errorInfo = chainDiagnosticMessages(errorInfo, isCall ? Diagnostics.Type_0_has_no_call_signatures : Diagnostics.Type_0_has_no_construct_signatures, typeToString(apparentType));
                }
                let headMessage = isCall ? Diagnostics.This_expression_is_not_callable : Diagnostics.This_expression_is_not_constructable;
                if (isCallExpression(errorTarget.parent) && errorTarget.parent.arguments.length === 0) {
                    const { resolvedSymbol } = getNodeLinks(errorTarget);
                    if (resolvedSymbol && resolvedSymbol.flags & 32768 /* GetAccessor */) {
                        headMessage = Diagnostics.This_expression_is_not_callable_because_it_is_a_get_accessor_Did_you_mean_to_use_it_without;
                    }
                }
                return {
                    messageChain: chainDiagnosticMessages(errorInfo, headMessage),
                    relatedMessage: maybeMissingAwait ? Diagnostics.Did_you_forget_to_use_await : void 0
                };
            }
            function getSymbolOfExpando(node, allowDeclaration) {
                if (!node.parent) {
                    return void 0;
                }
                let name;
                let decl;
                if (isVariableDeclaration(node.parent) && node.parent.initializer === node) {
                    if (!isInJSFile(node) && !(isVarConst(node.parent) && isFunctionLikeDeclaration(node))) {
                        return void 0;
                    }
                    name = node.parent.name;
                    decl = node.parent;
                }
                else if (isBinaryExpression(node.parent)) {
                    const parentNode = node.parent;
                    const parentNodeOperator = node.parent.operatorToken.kind;
                    if (parentNodeOperator === 63 /* EqualsToken */ && (allowDeclaration || parentNode.right === node)) {
                        name = parentNode.left;
                        decl = name;
                    }
                    else if (parentNodeOperator === 56 /* BarBarToken */ || parentNodeOperator === 60 /* QuestionQuestionToken */) {
                        if (isVariableDeclaration(parentNode.parent) && parentNode.parent.initializer === parentNode) {
                            name = parentNode.parent.name;
                            decl = parentNode.parent;
                        }
                        else if (isBinaryExpression(parentNode.parent) && parentNode.parent.operatorToken.kind === 63 /* EqualsToken */ && (allowDeclaration || parentNode.parent.right === parentNode)) {
                            name = parentNode.parent.left;
                            decl = name;
                        }
                        if (!name || !isBindableStaticNameExpression(name) || !isSameEntityName(name, parentNode.left)) {
                            return void 0;
                        }
                    }
                }
                else if (allowDeclaration && isFunctionDeclaration(node)) {
                    name = node.name;
                    decl = node;
                }
                if (!decl || !name || !allowDeclaration && !getExpandoInitializer(node, isPrototypeAccess(name))) {
                    return void 0;
                }
                return getSymbolOfNode(decl);
            }
            function checkCallExpression(node, checkMode) {
                var _a2, _b, _c;
                checkGrammarTypeArguments(node, node.typeArguments);
                const signature = getResolvedSignature(node, 
                /*candidatesOutArray*/
                void 0, checkMode);
                if (signature === resolvingSignature) {
                    return silentNeverType;
                }
                checkDeprecatedSignature(signature, node);
                if (node.expression.kind === 106 /* SuperKeyword */) {
                    return voidType;
                }
                if (node.kind === 211 /* NewExpression */) {
                    const declaration = signature.declaration;
                    if (declaration && declaration.kind !== 173 /* Constructor */ && declaration.kind !== 177 /* ConstructSignature */ && declaration.kind !== 182 /* ConstructorType */ && !(isJSDocSignature(declaration) && ((_b = (_a2 = getJSDocRoot(declaration)) == null ? void 0 : _a2.parent) == null ? void 0 : _b.kind) === 173 /* Constructor */) && !isJSDocConstructSignature(declaration) && !isJSConstructor(declaration)) {
                        if (noImplicitAny) {
                            error(node, Diagnostics.new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type);
                        }
                        return anyType;
                    }
                }
                if (isInJSFile(node) && shouldResolveJsRequire(compilerOptions) && isCommonJsRequire(node)) {
                    return resolveExternalModuleTypeByLiteral(node.arguments[0]);
                }
                const returnType = getReturnTypeOfSignature(signature);
                if (returnType.flags & 12288 /* ESSymbolLike */ && isSymbolOrSymbolForCall(node)) {
                    return getESSymbolLikeTypeForNode(walkUpParenthesizedExpressions(node.parent));
                }
                if (node.kind === 210 /* CallExpression */ && !node.questionDotToken && node.parent.kind === 241 /* ExpressionStatement */ && returnType.flags & 16384 /* Void */ && getTypePredicateOfSignature(signature)) {
                    if (!isDottedName(node.expression)) {
                        error(node.expression, Diagnostics.Assertions_require_the_call_target_to_be_an_identifier_or_qualified_name);
                    }
                    else if (!getEffectsSignature(node)) {
                        const diagnostic = error(node.expression, Diagnostics.Assertions_require_every_name_in_the_call_target_to_be_declared_with_an_explicit_type_annotation);
                        getTypeOfDottedName(node.expression, diagnostic);
                    }
                }
                if (isInJSFile(node)) {
                    const jsSymbol = getSymbolOfExpando(node, 
                    /*allowDeclaration*/
                    false);
                    if ((_c = jsSymbol == null ? void 0 : jsSymbol.exports) == null ? void 0 : _c.size) {
                        const jsAssignmentType = createAnonymousType(jsSymbol, jsSymbol.exports, emptyArray, emptyArray, emptyArray);
                        jsAssignmentType.objectFlags |= 4096 /* JSLiteral */;
                        return getIntersectionType([returnType, jsAssignmentType]);
                    }
                }
                return returnType;
            }
            function getLegacyDecoratorCallSignature(decorator) {
                const { parent: parent2 } = decorator;
                const links = getNodeLinks(parent2);
                if (!links.decoratorSignature) {
                    links.decoratorSignature = anySignature;
                    switch (parent2.kind) {
                        case 260 /* ClassDeclaration */:
                        case 228 /* ClassExpression */: {
                            const node = parent2;
                            const targetType = getTypeOfSymbol(getSymbolOfDeclaration(node));
                            const targetParam = createParameter("target", targetType);
                            links.decoratorSignature = createCallSignature(
                            /*typeParameters*/
                            void 0, 
                            /*thisParameter*/
                            void 0, [targetParam], getUnionType([targetType, voidType]));
                            break;
                        }
                        case 166 /* Parameter */: {
                            const node = parent2;
                            if (!isConstructorDeclaration(node.parent) && !(isMethodDeclaration(node.parent) || isSetAccessorDeclaration(node.parent) && isClassLike(node.parent.parent))) {
                                break;
                            }
                            if (getThisParameter(node.parent) === node) {
                                break;
                            }
                            const index = getThisParameter(node.parent) ? node.parent.parameters.indexOf(node) - 1 : node.parent.parameters.indexOf(node);
                            Debug.assert(index >= 0);
                            const targetType = isConstructorDeclaration(node.parent) ? getTypeOfSymbol(getSymbolOfDeclaration(node.parent.parent)) : getParentTypeOfClassElement(node.parent);
                            const keyType = isConstructorDeclaration(node.parent) ? undefinedType : getClassElementPropertyKeyType(node.parent);
                            const indexType = getNumberLiteralType(index);
                            const targetParam = createParameter("target", targetType);
                            const keyParam = createParameter("propertyKey", keyType);
                            const indexParam = createParameter("parameterIndex", indexType);
                            links.decoratorSignature = createCallSignature(
                            /*typeParameters*/
                            void 0, 
                            /*thisParameter*/
                            void 0, [targetParam, keyParam, indexParam], voidType);
                            break;
                        }
                        case 171 /* MethodDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                        case 169 /* PropertyDeclaration */: {
                            const node = parent2;
                            if (!isClassLike(node.parent))
                                break;
                            const targetType = getParentTypeOfClassElement(node);
                            const targetParam = createParameter("target", targetType);
                            const keyType = getClassElementPropertyKeyType(node);
                            const keyParam = createParameter("propertyKey", keyType);
                            const returnType = isPropertyDeclaration(node) ? voidType : createTypedPropertyDescriptorType(getTypeOfNode(node));
                            const hasPropDesc = languageVersion !== 0 /* ES3 */ && (!isPropertyDeclaration(parent2) || hasAccessorModifier(parent2));
                            if (hasPropDesc) {
                                const descriptorType = createTypedPropertyDescriptorType(getTypeOfNode(node));
                                const descriptorParam = createParameter("descriptor", descriptorType);
                                links.decoratorSignature = createCallSignature(
                                /*typeParameters*/
                                void 0, 
                                /*thisParameter*/
                                void 0, [targetParam, keyParam, descriptorParam], getUnionType([returnType, voidType]));
                            }
                            else {
                                links.decoratorSignature = createCallSignature(
                                /*typeParameters*/
                                void 0, 
                                /*thisParameter*/
                                void 0, [targetParam, keyParam], getUnionType([returnType, voidType]));
                            }
                            break;
                        }
                    }
                }
                return links.decoratorSignature === anySignature ? void 0 : links.decoratorSignature;
            }
            function getReturnTypeFromBody(func, checkMode) {
                if (!func.body) {
                    return errorType;
                }
                const functionFlags = getFunctionFlags(func);
                const isAsync = (functionFlags & 2 /* Async */) !== 0;
                const isGenerator = (functionFlags & 1 /* Generator */) !== 0;
                let returnType;
                let yieldType;
                let nextType;
                let fallbackReturnType = voidType;
                if (func.body.kind !== 238 /* Block */) {
                    returnType = checkExpressionCached(func.body, checkMode && checkMode & ~8 /* SkipGenericFunctions */);
                    if (isAsync) {
                        returnType = unwrapAwaitedType(checkAwaitedType(returnType, 
                        /*withAlias*/
                        false, 
                        /*errorNode*/
                        func, Diagnostics.The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member));
                    }
                }
                else if (isGenerator) {
                    const returnTypes = checkAndAggregateReturnExpressionTypes(func, checkMode);
                    if (!returnTypes) {
                        fallbackReturnType = neverType;
                    }
                    else if (returnTypes.length > 0) {
                        returnType = getUnionType(returnTypes, 2 /* Subtype */);
                    }
                    const { yieldTypes, nextTypes } = checkAndAggregateYieldOperandTypes(func, checkMode);
                    yieldType = some(yieldTypes) ? getUnionType(yieldTypes, 2 /* Subtype */) : void 0;
                    nextType = some(nextTypes) ? getIntersectionType(nextTypes) : void 0;
                }
                else {
                    const types = checkAndAggregateReturnExpressionTypes(func, checkMode);
                    if (!types) {
                        return functionFlags & 2 /* Async */ ? createPromiseReturnType(func, neverType) : neverType;
                    }
                    if (types.length === 0) {
                        return functionFlags & 2 /* Async */ ? createPromiseReturnType(func, voidType) : voidType;
                    }
                    returnType = getUnionType(types, 2 /* Subtype */);
                }
                if (returnType || yieldType || nextType) {
                    if (yieldType)
                        reportErrorsFromWidening(func, yieldType, 3 /* GeneratorYield */);
                    if (returnType)
                        reportErrorsFromWidening(func, returnType, 1 /* FunctionReturn */);
                    if (nextType)
                        reportErrorsFromWidening(func, nextType, 2 /* GeneratorNext */);
                    if (returnType && isUnitType(returnType) || yieldType && isUnitType(yieldType) || nextType && isUnitType(nextType)) {
                        const contextualSignature = getContextualSignatureForFunctionLikeDeclaration(func);
                        const contextualType = !contextualSignature ? void 0 : contextualSignature === getSignatureFromDeclaration(func) ? isGenerator ? void 0 : returnType : instantiateContextualType(getReturnTypeOfSignature(contextualSignature), func, 
                        /*contextFlags*/
                        void 0);
                        if (isGenerator) {
                            yieldType = getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded(yieldType, contextualType, 0 /* Yield */, isAsync);
                            returnType = getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded(returnType, contextualType, 1 /* Return */, isAsync);
                            nextType = getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded(nextType, contextualType, 2 /* Next */, isAsync);
                        }
                        else {
                            returnType = getWidenedLiteralLikeTypeForContextualReturnTypeIfNeeded(returnType, contextualType, isAsync);
                        }
                    }
                    if (yieldType)
                        yieldType = getWidenedType(yieldType);
                    if (returnType)
                        returnType = getWidenedType(returnType);
                    if (nextType)
                        nextType = getWidenedType(nextType);
                }
                if (isGenerator) {
                    return createGeneratorReturnType(yieldType || neverType, returnType || fallbackReturnType, nextType || getContextualIterationType(2 /* Next */, func) || unknownType, isAsync);
                }
                else {
                    return isAsync ? createPromiseType(returnType || fallbackReturnType) : returnType || fallbackReturnType;
                }
            }
            function isAssignmentToReadonlyEntity(expr, symbol, assignmentKind) {
                var _a2, _b;
                if (assignmentKind === 0 /* None */) {
                    return false;
                }
                if (isReadonlySymbol(symbol)) {
                    if (symbol.flags & 4 /* Property */ && isAccessExpression(expr) && expr.expression.kind === 108 /* ThisKeyword */) {
                        const ctor = getContainingFunction(expr);
                        if (!(ctor && (ctor.kind === 173 /* Constructor */ || isJSConstructor(ctor)))) {
                            return true;
                        }
                        if (symbol.valueDeclaration) {
                            const isAssignmentDeclaration2 = isBinaryExpression(symbol.valueDeclaration);
                            const isLocalPropertyDeclaration = ctor.parent === symbol.valueDeclaration.parent;
                            const isLocalParameterProperty = ctor === symbol.valueDeclaration.parent;
                            const isLocalThisPropertyAssignment = isAssignmentDeclaration2 && ((_a2 = symbol.parent) == null ? void 0 : _a2.valueDeclaration) === ctor.parent;
                            const isLocalThisPropertyAssignmentConstructorFunction = isAssignmentDeclaration2 && ((_b = symbol.parent) == null ? void 0 : _b.valueDeclaration) === ctor;
                            const isWriteableSymbol = isLocalPropertyDeclaration || isLocalParameterProperty || isLocalThisPropertyAssignment || isLocalThisPropertyAssignmentConstructorFunction;
                            return !isWriteableSymbol;
                        }
                    }
                    return true;
                }
                if (isAccessExpression(expr)) {
                    const node = skipParentheses(expr.expression);
                    if (node.kind === 79 /* Identifier */) {
                        const symbol2 = getNodeLinks(node).resolvedSymbol;
                        if (symbol2.flags & 2097152 /* Alias */) {
                            const declaration = getDeclarationOfAliasSymbol(symbol2);
                            return !!declaration && declaration.kind === 271 /* NamespaceImport */;
                        }
                    }
                }
                return false;
            }
            function checkAwaitExpressionGrammar(node) {
                const container = getContainingFunctionOrClassStaticBlock(node);
                if (container && isClassStaticBlockDeclaration(container)) {
                    error(node, Diagnostics.Await_expression_cannot_be_used_inside_a_class_static_block);
                }
                else if (!(node.flags & 32768 /* AwaitContext */)) {
                    if (isInTopLevelContext(node)) {
                        const sourceFile = getSourceFileOfNode(node);
                        if (!hasParseDiagnostics(sourceFile)) {
                            let span;
                            if (!isEffectiveExternalModule(sourceFile, compilerOptions)) {
                                span != null ? span : span = getSpanOfTokenAtPosition(sourceFile, node.pos);
                                const diagnostic = createFileDiagnostic(sourceFile, span.start, span.length, Diagnostics.await_expressions_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module);
                                diagnostics.add(diagnostic);
                            }
                            switch (moduleKind) {
                                case 100 /* Node16 */:
                                case 199 /* NodeNext */:
                                    if (sourceFile.impliedNodeFormat === 1 /* CommonJS */) {
                                        span != null ? span : span = getSpanOfTokenAtPosition(sourceFile, node.pos);
                                        diagnostics.add(createFileDiagnostic(sourceFile, span.start, span.length, Diagnostics.The_current_file_is_a_CommonJS_module_and_cannot_use_await_at_the_top_level));
                                        break;
                                    }
                                case 7 /* ES2022 */:
                                case 99 /* ESNext */:
                                case 4 /* System */:
                                    if (languageVersion >= 4 /* ES2017 */) {
                                        break;
                                    }
                                default:
                                    span != null ? span : span = getSpanOfTokenAtPosition(sourceFile, node.pos);
                                    diagnostics.add(createFileDiagnostic(sourceFile, span.start, span.length, Diagnostics.Top_level_await_expressions_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_node16_or_nodenext_and_the_target_option_is_set_to_es2017_or_higher));
                                    break;
                            }
                        }
                    }
                    else {
                        const sourceFile = getSourceFileOfNode(node);
                        if (!hasParseDiagnostics(sourceFile)) {
                            const span = getSpanOfTokenAtPosition(sourceFile, node.pos);
                            const diagnostic = createFileDiagnostic(sourceFile, span.start, span.length, Diagnostics.await_expressions_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules);
                            if (container && container.kind !== 173 /* Constructor */ && (getFunctionFlags(container) & 2 /* Async */) === 0) {
                                const relatedInfo = createDiagnosticForNode(container, Diagnostics.Did_you_mean_to_mark_this_function_as_async);
                                addRelatedInfo(diagnostic, relatedInfo);
                            }
                            diagnostics.add(diagnostic);
                        }
                    }
                }
                if (isInParameterInitializerBeforeContainingFunction(node)) {
                    error(node, Diagnostics.await_expressions_cannot_be_used_in_a_parameter_initializer);
                }
            }
            function isTypeAssignableToKind(source, kind, strict) {
                if (source.flags & kind) {
                    return true;
                }
                if (strict && source.flags & (3 /* AnyOrUnknown */ | 16384 /* Void */ | 32768 /* Undefined */ | 65536 /* Null */)) {
                    return false;
                }
                return !!(kind & 296 /* NumberLike */) && isTypeAssignableTo(source, numberType) || !!(kind & 2112 /* BigIntLike */) && isTypeAssignableTo(source, bigintType) || !!(kind & 402653316 /* StringLike */) && isTypeAssignableTo(source, stringType) || !!(kind & 528 /* BooleanLike */) && isTypeAssignableTo(source, booleanType) || !!(kind & 16384 /* Void */) && isTypeAssignableTo(source, voidType) || !!(kind & 131072 /* Never */) && isTypeAssignableTo(source, neverType) || !!(kind & 65536 /* Null */) && isTypeAssignableTo(source, nullType) || !!(kind & 32768 /* Undefined */) && isTypeAssignableTo(source, undefinedType) || !!(kind & 4096 /* ESSymbol */) && isTypeAssignableTo(source, esSymbolType) || !!(kind & 67108864 /* NonPrimitive */) && isTypeAssignableTo(source, nonPrimitiveType);
            }
            function isSideEffectFree(node) {
                node = skipParentheses(node);
                switch (node.kind) {
                    case 79 /* Identifier */:
                    case 10 /* StringLiteral */:
                    case 13 /* RegularExpressionLiteral */:
                    case 212 /* TaggedTemplateExpression */:
                    case 225 /* TemplateExpression */:
                    case 14 /* NoSubstitutionTemplateLiteral */:
                    case 8 /* NumericLiteral */:
                    case 9 /* BigIntLiteral */:
                    case 110 /* TrueKeyword */:
                    case 95 /* FalseKeyword */:
                    case 104 /* NullKeyword */:
                    case 155 /* UndefinedKeyword */:
                    case 215 /* FunctionExpression */:
                    case 228 /* ClassExpression */:
                    case 216 /* ArrowFunction */:
                    case 206 /* ArrayLiteralExpression */:
                    case 207 /* ObjectLiteralExpression */:
                    case 218 /* TypeOfExpression */:
                    case 232 /* NonNullExpression */:
                    case 282 /* JsxSelfClosingElement */:
                    case 281 /* JsxElement */:
                        return true;
                    case 224 /* ConditionalExpression */:
                        return isSideEffectFree(node.whenTrue) && isSideEffectFree(node.whenFalse);
                    case 223 /* BinaryExpression */:
                        if (isAssignmentOperator(node.operatorToken.kind)) {
                            return false;
                        }
                        return isSideEffectFree(node.left) && isSideEffectFree(node.right);
                    case 221 /* PrefixUnaryExpression */:
                    case 222 /* PostfixUnaryExpression */:
                        switch (node.operator) {
                            case 53 /* ExclamationToken */:
                            case 39 /* PlusToken */:
                            case 40 /* MinusToken */:
                            case 54 /* TildeToken */:
                                return true;
                        }
                        return false;
                    case 219 /* VoidExpression */:
                    case 213 /* TypeAssertionExpression */:
                    case 231 /* AsExpression */:
                    default:
                        return false;
                }
            }
            function checkBinaryLikeExpressionWorker(left, operatorToken, right, leftType, rightType, errorNode) {
                const operator = operatorToken.kind;
                switch (operator) {
                    case 41 /* AsteriskToken */:
                    case 42 /* AsteriskAsteriskToken */:
                    case 66 /* AsteriskEqualsToken */:
                    case 67 /* AsteriskAsteriskEqualsToken */:
                    case 43 /* SlashToken */:
                    case 68 /* SlashEqualsToken */:
                    case 44 /* PercentToken */:
                    case 69 /* PercentEqualsToken */:
                    case 40 /* MinusToken */:
                    case 65 /* MinusEqualsToken */:
                    case 47 /* LessThanLessThanToken */:
                    case 70 /* LessThanLessThanEqualsToken */:
                    case 48 /* GreaterThanGreaterThanToken */:
                    case 71 /* GreaterThanGreaterThanEqualsToken */:
                    case 49 /* GreaterThanGreaterThanGreaterThanToken */:
                    case 72 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                    case 51 /* BarToken */:
                    case 74 /* BarEqualsToken */:
                    case 52 /* CaretToken */:
                    case 78 /* CaretEqualsToken */:
                    case 50 /* AmpersandToken */:
                    case 73 /* AmpersandEqualsToken */:
                        if (leftType === silentNeverType || rightType === silentNeverType) {
                            return silentNeverType;
                        }
                        leftType = checkNonNullType(leftType, left);
                        rightType = checkNonNullType(rightType, right);
                        let suggestedOperator;
                        if (leftType.flags & 528 /* BooleanLike */ && rightType.flags & 528 /* BooleanLike */ && (suggestedOperator = getSuggestedBooleanOperator(operatorToken.kind)) !== void 0) {
                            error(errorNode || operatorToken, Diagnostics.The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead, tokenToString(operatorToken.kind), tokenToString(suggestedOperator));
                            return numberType;
                        }
                        else {
                            const leftOk = checkArithmeticOperandType(left, leftType, Diagnostics.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type, 
                            /*isAwaitValid*/
                            true);
                            const rightOk = checkArithmeticOperandType(right, rightType, Diagnostics.The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type, 
                            /*isAwaitValid*/
                            true);
                            let resultType2;
                            if (isTypeAssignableToKind(leftType, 3 /* AnyOrUnknown */) && isTypeAssignableToKind(rightType, 3 /* AnyOrUnknown */) || // Or, if neither could be bigint, implicit coercion results in a number result
                                !(maybeTypeOfKind(leftType, 2112 /* BigIntLike */) || maybeTypeOfKind(rightType, 2112 /* BigIntLike */))) {
                                resultType2 = numberType;
                            }
                            else if (bothAreBigIntLike(leftType, rightType)) {
                                switch (operator) {
                                    case 49 /* GreaterThanGreaterThanGreaterThanToken */:
                                    case 72 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                                        reportOperatorError();
                                        break;
                                    case 42 /* AsteriskAsteriskToken */:
                                    case 67 /* AsteriskAsteriskEqualsToken */:
                                        if (languageVersion < 3 /* ES2016 */) {
                                            error(errorNode, Diagnostics.Exponentiation_cannot_be_performed_on_bigint_values_unless_the_target_option_is_set_to_es2016_or_later);
                                        }
                                }
                                resultType2 = bigintType;
                            }
                            else {
                                reportOperatorError(bothAreBigIntLike);
                                resultType2 = errorType;
                            }
                            if (leftOk && rightOk) {
                                checkAssignmentOperator(resultType2);
                            }
                            return resultType2;
                        }
                    case 39 /* PlusToken */:
                    case 64 /* PlusEqualsToken */:
                        if (leftType === silentNeverType || rightType === silentNeverType) {
                            return silentNeverType;
                        }
                        if (!isTypeAssignableToKind(leftType, 402653316 /* StringLike */) && !isTypeAssignableToKind(rightType, 402653316 /* StringLike */)) {
                            leftType = checkNonNullType(leftType, left);
                            rightType = checkNonNullType(rightType, right);
                        }
                        let resultType;
                        if (isTypeAssignableToKind(leftType, 296 /* NumberLike */, 
                        /*strict*/
                        true) && isTypeAssignableToKind(rightType, 296 /* NumberLike */, 
                        /*strict*/
                        true)) {
                            resultType = numberType;
                        }
                        else if (isTypeAssignableToKind(leftType, 2112 /* BigIntLike */, 
                        /*strict*/
                        true) && isTypeAssignableToKind(rightType, 2112 /* BigIntLike */, 
                        /*strict*/
                        true)) {
                            resultType = bigintType;
                        }
                        else if (isTypeAssignableToKind(leftType, 402653316 /* StringLike */, 
                        /*strict*/
                        true) || isTypeAssignableToKind(rightType, 402653316 /* StringLike */, 
                        /*strict*/
                        true)) {
                            resultType = stringType;
                        }
                        else if (isTypeAny(leftType) || isTypeAny(rightType)) {
                            resultType = isErrorType(leftType) || isErrorType(rightType) ? errorType : anyType;
                        }
                        if (resultType && !checkForDisallowedESSymbolOperand(operator)) {
                            return resultType;
                        }
                        if (!resultType) {
                            const closeEnoughKind = 296 /* NumberLike */ | 2112 /* BigIntLike */ | 402653316 /* StringLike */ | 3 /* AnyOrUnknown */;
                            reportOperatorError((left2, right2) => isTypeAssignableToKind(left2, closeEnoughKind) && isTypeAssignableToKind(right2, closeEnoughKind));
                            return anyType;
                        }
                        if (operator === 64 /* PlusEqualsToken */) {
                            checkAssignmentOperator(resultType);
                        }
                        return resultType;
                    case 29 /* LessThanToken */:
                    case 31 /* GreaterThanToken */:
                    case 32 /* LessThanEqualsToken */:
                    case 33 /* GreaterThanEqualsToken */:
                        if (checkForDisallowedESSymbolOperand(operator)) {
                            leftType = getBaseTypeOfLiteralTypeForComparison(checkNonNullType(leftType, left));
                            rightType = getBaseTypeOfLiteralTypeForComparison(checkNonNullType(rightType, right));
                            reportOperatorErrorUnless((left2, right2) => {
                                if (isTypeAny(left2) || isTypeAny(right2)) {
                                    return true;
                                }
                                const leftAssignableToNumber = isTypeAssignableTo(left2, numberOrBigIntType);
                                const rightAssignableToNumber = isTypeAssignableTo(right2, numberOrBigIntType);
                                return leftAssignableToNumber && rightAssignableToNumber || !leftAssignableToNumber && !rightAssignableToNumber && areTypesComparable(left2, right2);
                            });
                        }
                        return booleanType;
                    case 34 /* EqualsEqualsToken */:
                    case 35 /* ExclamationEqualsToken */:
                    case 36 /* EqualsEqualsEqualsToken */:
                    case 37 /* ExclamationEqualsEqualsToken */:
                        if (isLiteralExpressionOfObject(left) || isLiteralExpressionOfObject(right)) {
                            const eqType = operator === 34 /* EqualsEqualsToken */ || operator === 36 /* EqualsEqualsEqualsToken */;
                            error(errorNode, Diagnostics.This_condition_will_always_return_0_since_JavaScript_compares_objects_by_reference_not_value, eqType ? "false" : "true");
                        }
                        checkNaNEquality(errorNode, operator, left, right);
                        reportOperatorErrorUnless((left2, right2) => isTypeEqualityComparableTo(left2, right2) || isTypeEqualityComparableTo(right2, left2));
                        return booleanType;
                    case 102 /* InstanceOfKeyword */:
                        return checkInstanceOfExpression(left, right, leftType, rightType);
                    case 101 /* InKeyword */:
                        return checkInExpression(left, right, leftType, rightType);
                    case 55 /* AmpersandAmpersandToken */:
                    case 76 /* AmpersandAmpersandEqualsToken */: {
                        const resultType2 = getTypeFacts(leftType) & 4194304 /* Truthy */ ? getUnionType([extractDefinitelyFalsyTypes(strictNullChecks ? leftType : getBaseTypeOfLiteralType(rightType)), rightType]) : leftType;
                        if (operator === 76 /* AmpersandAmpersandEqualsToken */) {
                            checkAssignmentOperator(rightType);
                        }
                        return resultType2;
                    }
                    case 56 /* BarBarToken */:
                    case 75 /* BarBarEqualsToken */: {
                        const resultType2 = getTypeFacts(leftType) & 8388608 /* Falsy */ ? getUnionType([getNonNullableType(removeDefinitelyFalsyTypes(leftType)), rightType], 2 /* Subtype */) : leftType;
                        if (operator === 75 /* BarBarEqualsToken */) {
                            checkAssignmentOperator(rightType);
                        }
                        return resultType2;
                    }
                    case 60 /* QuestionQuestionToken */:
                    case 77 /* QuestionQuestionEqualsToken */: {
                        const resultType2 = getTypeFacts(leftType) & 262144 /* EQUndefinedOrNull */ ? getUnionType([getNonNullableType(leftType), rightType], 2 /* Subtype */) : leftType;
                        if (operator === 77 /* QuestionQuestionEqualsToken */) {
                            checkAssignmentOperator(rightType);
                        }
                        return resultType2;
                    }
                    case 63 /* EqualsToken */:
                        const declKind = isBinaryExpression(left.parent) ? getAssignmentDeclarationKind(left.parent) : 0 /* None */;
                        checkAssignmentDeclaration(declKind, rightType);
                        if (isAssignmentDeclaration2(declKind)) {
                            if (!(rightType.flags & 524288 /* Object */) || declKind !== 2 /* ModuleExports */ && declKind !== 6 /* Prototype */ && !isEmptyObjectType(rightType) && !isFunctionObjectType(rightType) && !(getObjectFlags(rightType) & 1 /* Class */)) {
                                checkAssignmentOperator(rightType);
                            }
                            return leftType;
                        }
                        else {
                            checkAssignmentOperator(rightType);
                            return rightType;
                        }
                    case 27 /* CommaToken */:
                        if (!compilerOptions.allowUnreachableCode && isSideEffectFree(left) && !isIndirectCall(left.parent)) {
                            const sf = getSourceFileOfNode(left);
                            const sourceText = sf.text;
                            const start = skipTrivia(sourceText, left.pos);
                            const isInDiag2657 = sf.parseDiagnostics.some((diag2) => {
                                if (diag2.code !== Diagnostics.JSX_expressions_must_have_one_parent_element.code)
                                    return false;
                                return textSpanContainsPosition(diag2, start);
                            });
                            if (!isInDiag2657)
                                error(left, Diagnostics.Left_side_of_comma_operator_is_unused_and_has_no_side_effects);
                        }
                        return rightType;
                    default:
                        return Debug.fail();
                }
                function bothAreBigIntLike(left2, right2) {
                    return isTypeAssignableToKind(left2, 2112 /* BigIntLike */) && isTypeAssignableToKind(right2, 2112 /* BigIntLike */);
                }
                function checkAssignmentDeclaration(kind, rightType2) {
                    if (kind === 2 /* ModuleExports */) {
                        for (const prop of getPropertiesOfObjectType(rightType2)) {
                            const propType = getTypeOfSymbol(prop);
                            if (propType.symbol && propType.symbol.flags & 32 /* Class */) {
                                const name = prop.escapedName;
                                const symbol = resolveName(prop.valueDeclaration, name, 788968 /* Type */, void 0, name, 
                                /*isUse*/
                                false);
                                if ((symbol == null ? void 0 : symbol.declarations) && symbol.declarations.some(isJSDocTypedefTag)) {
                                    addDuplicateDeclarationErrorsForSymbols(symbol, Diagnostics.Duplicate_identifier_0, unescapeLeadingUnderscores(name), prop);
                                    addDuplicateDeclarationErrorsForSymbols(prop, Diagnostics.Duplicate_identifier_0, unescapeLeadingUnderscores(name), symbol);
                                }
                            }
                        }
                    }
                }
                function isIndirectCall(node) {
                    return node.parent.kind === 214 /* ParenthesizedExpression */ && isNumericLiteral(node.left) && node.left.text === "0" && (isCallExpression(node.parent.parent) && node.parent.parent.expression === node.parent || node.parent.parent.kind === 212 /* TaggedTemplateExpression */) && // special-case for "eval" because it's the only non-access case where an indirect call actually affects behavior.
                        (isAccessExpression(node.right) || isIdentifier(node.right) && node.right.escapedText === "eval");
                }
                function checkForDisallowedESSymbolOperand(operator2) {
                    const offendingSymbolOperand = maybeTypeOfKindConsideringBaseConstraint(leftType, 12288 /* ESSymbolLike */) ? left : maybeTypeOfKindConsideringBaseConstraint(rightType, 12288 /* ESSymbolLike */) ? right : void 0;
                    if (offendingSymbolOperand) {
                        error(offendingSymbolOperand, Diagnostics.The_0_operator_cannot_be_applied_to_type_symbol, tokenToString(operator2));
                        return false;
                    }
                    return true;
                }
                function getSuggestedBooleanOperator(operator2) {
                    switch (operator2) {
                        case 51 /* BarToken */:
                        case 74 /* BarEqualsToken */:
                            return 56 /* BarBarToken */;
                        case 52 /* CaretToken */:
                        case 78 /* CaretEqualsToken */:
                            return 37 /* ExclamationEqualsEqualsToken */;
                        case 50 /* AmpersandToken */:
                        case 73 /* AmpersandEqualsToken */:
                            return 55 /* AmpersandAmpersandToken */;
                        default:
                            return void 0;
                    }
                }
                function checkAssignmentOperator(valueType) {
                    if (isAssignmentOperator(operator)) {
                        addLazyDiagnostic(checkAssignmentOperatorWorker);
                    }
                    function checkAssignmentOperatorWorker() {
                        if (checkReferenceExpression(left, Diagnostics.The_left_hand_side_of_an_assignment_expression_must_be_a_variable_or_a_property_access, Diagnostics.The_left_hand_side_of_an_assignment_expression_may_not_be_an_optional_property_access)) {
                            let headMessage;
                            if (exactOptionalPropertyTypes && isPropertyAccessExpression(left) && maybeTypeOfKind(valueType, 32768 /* Undefined */)) {
                                const target = getTypeOfPropertyOfType(getTypeOfExpression(left.expression), left.name.escapedText);
                                if (isExactOptionalPropertyMismatch(valueType, target)) {
                                    headMessage = Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_type_of_the_target;
                                }
                            }
                            checkTypeAssignableToAndOptionallyElaborate(valueType, leftType, left, right, headMessage);
                        }
                    }
                }
                function isAssignmentDeclaration2(kind) {
                    var _a2;
                    switch (kind) {
                        case 2 /* ModuleExports */:
                            return true;
                        case 1 /* ExportsProperty */:
                        case 5 /* Property */:
                        case 6 /* Prototype */:
                        case 3 /* PrototypeProperty */:
                        case 4 /* ThisProperty */:
                            const symbol = getSymbolOfNode(left);
                            const init = getAssignedExpandoInitializer(right);
                            return !!init && isObjectLiteralExpression(init) && !!((_a2 = symbol == null ? void 0 : symbol.exports) == null ? void 0 : _a2.size);
                        default:
                            return false;
                    }
                }
                function reportOperatorErrorUnless(typesAreCompatible) {
                    if (!typesAreCompatible(leftType, rightType)) {
                        reportOperatorError(typesAreCompatible);
                        return true;
                    }
                    return false;
                }
                function reportOperatorError(isRelated) {
                    let wouldWorkWithAwait = false;
                    const errNode = errorNode || operatorToken;
                    if (isRelated) {
                        const awaitedLeftType = getAwaitedTypeNoAlias(leftType);
                        const awaitedRightType = getAwaitedTypeNoAlias(rightType);
                        wouldWorkWithAwait = !(awaitedLeftType === leftType && awaitedRightType === rightType) && !!(awaitedLeftType && awaitedRightType) && isRelated(awaitedLeftType, awaitedRightType);
                    }
                    let effectiveLeft = leftType;
                    let effectiveRight = rightType;
                    if (!wouldWorkWithAwait && isRelated) {
                        [effectiveLeft, effectiveRight] = getBaseTypesIfUnrelated(leftType, rightType, isRelated);
                    }
                    const [leftStr, rightStr] = getTypeNamesForErrorDisplay(effectiveLeft, effectiveRight);
                    if (!tryGiveBetterPrimaryError(errNode, wouldWorkWithAwait, leftStr, rightStr)) {
                        errorAndMaybeSuggestAwait(errNode, wouldWorkWithAwait, Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2, tokenToString(operatorToken.kind), leftStr, rightStr);
                    }
                }
                function tryGiveBetterPrimaryError(errNode, maybeMissingAwait, leftStr, rightStr) {
                    switch (operatorToken.kind) {
                        case 36 /* EqualsEqualsEqualsToken */:
                        case 34 /* EqualsEqualsToken */:
                        case 37 /* ExclamationEqualsEqualsToken */:
                        case 35 /* ExclamationEqualsToken */:
                            return errorAndMaybeSuggestAwait(errNode, maybeMissingAwait, Diagnostics.This_comparison_appears_to_be_unintentional_because_the_types_0_and_1_have_no_overlap, leftStr, rightStr);
                        default:
                            return void 0;
                    }
                }
                function checkNaNEquality(errorNode2, operator2, left2, right2) {
                    const isLeftNaN = isGlobalNaN(skipParentheses(left2));
                    const isRightNaN = isGlobalNaN(skipParentheses(right2));
                    if (isLeftNaN || isRightNaN) {
                        const err = error(errorNode2, Diagnostics.This_condition_will_always_return_0, tokenToString(operator2 === 36 /* EqualsEqualsEqualsToken */ || operator2 === 34 /* EqualsEqualsToken */ ? 95 /* FalseKeyword */ : 110 /* TrueKeyword */));
                        if (isLeftNaN && isRightNaN)
                            return;
                        const operatorString = operator2 === 37 /* ExclamationEqualsEqualsToken */ || operator2 === 35 /* ExclamationEqualsToken */ ? tokenToString(53 /* ExclamationToken */) : "";
                        const location = isLeftNaN ? right2 : left2;
                        const expression = skipParentheses(location);
                        addRelatedInfo(err, createDiagnosticForNode(location, Diagnostics.Did_you_mean_0, `${operatorString}Number.isNaN(${isEntityNameExpression(expression) ? entityNameToString(expression) : "..."})`));
                    }
                }
                function isGlobalNaN(expr) {
                    if (isIdentifier(expr) && expr.escapedText === "NaN") {
                        const globalNaNSymbol = getGlobalNaNSymbol();
                        return !!globalNaNSymbol && globalNaNSymbol === getResolvedSymbol(expr);
                    }
                    return false;
                }
            }
            function checkYieldExpression(node) {
                addLazyDiagnostic(checkYieldExpressionGrammar);
                const func = getContainingFunction(node);
                if (!func)
                    return anyType;
                const functionFlags = getFunctionFlags(func);
                if (!(functionFlags & 1 /* Generator */)) {
                    return anyType;
                }
                const isAsync = (functionFlags & 2 /* Async */) !== 0;
                if (node.asteriskToken) {
                    if (isAsync && languageVersion < 99 /* ESNext */) {
                        checkExternalEmitHelpers(node, 26624 /* AsyncDelegatorIncludes */);
                    }
                    if (!isAsync && languageVersion < 2 /* ES2015 */ && compilerOptions.downlevelIteration) {
                        checkExternalEmitHelpers(node, 256 /* Values */);
                    }
                }
                const returnType = getReturnTypeFromAnnotation(func);
                const iterationTypes = returnType && getIterationTypesOfGeneratorFunctionReturnType(returnType, isAsync);
                const signatureYieldType = iterationTypes && iterationTypes.yieldType || anyType;
                const signatureNextType = iterationTypes && iterationTypes.nextType || anyType;
                const resolvedSignatureNextType = isAsync ? getAwaitedType(signatureNextType) || anyType : signatureNextType;
                const yieldExpressionType = node.expression ? checkExpression(node.expression) : undefinedWideningType;
                const yieldedType = getYieldedTypeOfYieldExpression(node, yieldExpressionType, resolvedSignatureNextType, isAsync);
                if (returnType && yieldedType) {
                    checkTypeAssignableToAndOptionallyElaborate(yieldedType, signatureYieldType, node.expression || node, node.expression);
                }
                if (node.asteriskToken) {
                    const use = isAsync ? 19 /* AsyncYieldStar */ : 17 /* YieldStar */;
                    return getIterationTypeOfIterable(use, 1 /* Return */, yieldExpressionType, node.expression) || anyType;
                }
                else if (returnType) {
                    return getIterationTypeOfGeneratorFunctionReturnType(2 /* Next */, returnType, isAsync) || anyType;
                }
                let type = getContextualIterationType(2 /* Next */, func);
                if (!type) {
                    type = anyType;
                    addLazyDiagnostic(() => {
                        if (noImplicitAny && !expressionResultIsUnused(node)) {
                            const contextualType = getContextualType2(node, 
                            /*contextFlags*/
                            void 0);
                            if (!contextualType || isTypeAny(contextualType)) {
                                error(node, Diagnostics.yield_expression_implicitly_results_in_an_any_type_because_its_containing_generator_lacks_a_return_type_annotation);
                            }
                        }
                    });
                }
                return type;
                function checkYieldExpressionGrammar() {
                    if (!(node.flags & 8192 /* YieldContext */)) {
                        grammarErrorOnFirstToken(node, Diagnostics.A_yield_expression_is_only_allowed_in_a_generator_body);
                    }
                    if (isInParameterInitializerBeforeContainingFunction(node)) {
                        error(node, Diagnostics.yield_expressions_cannot_be_used_in_a_parameter_initializer);
                    }
                }
            }
            function isLiteralOfContextualType(candidateType, contextualType) {
                if (contextualType) {
                    if (contextualType.flags & 3145728 /* UnionOrIntersection */) {
                        const types = contextualType.types;
                        return some(types, (t) => isLiteralOfContextualType(candidateType, t));
                    }
                    if (contextualType.flags & 58982400 /* InstantiableNonPrimitive */) {
                        const constraint = getBaseConstraintOfType(contextualType) || unknownType;
                        return maybeTypeOfKind(constraint, 4 /* String */) && maybeTypeOfKind(candidateType, 128 /* StringLiteral */) || maybeTypeOfKind(constraint, 8 /* Number */) && maybeTypeOfKind(candidateType, 256 /* NumberLiteral */) || maybeTypeOfKind(constraint, 64 /* BigInt */) && maybeTypeOfKind(candidateType, 2048 /* BigIntLiteral */) || maybeTypeOfKind(constraint, 4096 /* ESSymbol */) && maybeTypeOfKind(candidateType, 8192 /* UniqueESSymbol */) || isLiteralOfContextualType(candidateType, constraint);
                    }
                    return !!(contextualType.flags & (128 /* StringLiteral */ | 4194304 /* Index */ | 134217728 /* TemplateLiteral */ | 268435456 /* StringMapping */) && maybeTypeOfKind(candidateType, 128 /* StringLiteral */) || contextualType.flags & 256 /* NumberLiteral */ && maybeTypeOfKind(candidateType, 256 /* NumberLiteral */) || contextualType.flags & 2048 /* BigIntLiteral */ && maybeTypeOfKind(candidateType, 2048 /* BigIntLiteral */) || contextualType.flags & 512 /* BooleanLiteral */ && maybeTypeOfKind(candidateType, 512 /* BooleanLiteral */) || contextualType.flags & 8192 /* UniqueESSymbol */ && maybeTypeOfKind(candidateType, 8192 /* UniqueESSymbol */));
                }
                return false;
            }
            function checkExpressionWorker(node, checkMode, forceTuple) {
                const kind = node.kind;
                if (cancellationToken) {
                    switch (kind) {
                        case 228 /* ClassExpression */:
                        case 215 /* FunctionExpression */:
                        case 216 /* ArrowFunction */:
                            cancellationToken.throwIfCancellationRequested();
                    }
                }
                switch (kind) {
                    case 79 /* Identifier */:
                        return checkIdentifier(node, checkMode);
                    case 80 /* PrivateIdentifier */:
                        return checkPrivateIdentifierExpression(node);
                    case 108 /* ThisKeyword */:
                        return checkThisExpression(node);
                    case 106 /* SuperKeyword */:
                        return checkSuperExpression(node);
                    case 104 /* NullKeyword */:
                        return nullWideningType;
                    case 14 /* NoSubstitutionTemplateLiteral */:
                    case 10 /* StringLiteral */:
                        return getFreshTypeOfLiteralType(getStringLiteralType(node.text));
                    case 8 /* NumericLiteral */:
                        checkGrammarNumericLiteral(node);
                        return getFreshTypeOfLiteralType(getNumberLiteralType(+node.text));
                    case 9 /* BigIntLiteral */:
                        checkGrammarBigIntLiteral(node);
                        return getFreshTypeOfLiteralType(getBigIntLiteralType({
                            negative: false,
                            base10Value: parsePseudoBigInt(node.text)
                        }));
                    case 110 /* TrueKeyword */:
                        return trueType;
                    case 95 /* FalseKeyword */:
                        return falseType;
                    case 225 /* TemplateExpression */:
                        return checkTemplateExpression(node);
                    case 13 /* RegularExpressionLiteral */:
                        return globalRegExpType;
                    case 206 /* ArrayLiteralExpression */:
                        return checkArrayLiteral(node, checkMode, forceTuple);
                    case 207 /* ObjectLiteralExpression */:
                        return checkObjectLiteral(node, checkMode);
                    case 208 /* PropertyAccessExpression */:
                        return checkPropertyAccessExpression(node, checkMode);
                    case 163 /* QualifiedName */:
                        return checkQualifiedName(node, checkMode);
                    case 209 /* ElementAccessExpression */:
                        return checkIndexedAccess(node, checkMode);
                    case 210 /* CallExpression */:
                        if (node.expression.kind === 100 /* ImportKeyword */) {
                            return checkImportCallExpression(node);
                        }
                    case 211 /* NewExpression */:
                        return checkCallExpression(node, checkMode);
                    case 212 /* TaggedTemplateExpression */:
                        return checkTaggedTemplateExpression(node);
                    case 214 /* ParenthesizedExpression */:
                        return checkParenthesizedExpression(node, checkMode);
                    case 228 /* ClassExpression */:
                        return checkClassExpression(node);
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                        return checkFunctionExpressionOrObjectLiteralMethod(node, checkMode);
                    case 218 /* TypeOfExpression */:
                        return checkTypeOfExpression(node);
                    case 213 /* TypeAssertionExpression */:
                    case 231 /* AsExpression */:
                        return checkAssertion(node);
                    case 232 /* NonNullExpression */:
                        return checkNonNullAssertion(node);
                    case 230 /* ExpressionWithTypeArguments */:
                        return checkExpressionWithTypeArguments(node);
                    case 235 /* SatisfiesExpression */:
                        return checkSatisfiesExpression(node);
                    case 233 /* MetaProperty */:
                        return checkMetaProperty(node);
                    case 217 /* DeleteExpression */:
                        return checkDeleteExpression(node);
                    case 219 /* VoidExpression */:
                        return checkVoidExpression(node);
                    case 220 /* AwaitExpression */:
                        return checkAwaitExpression(node);
                    case 221 /* PrefixUnaryExpression */:
                        return checkPrefixUnaryExpression(node);
                    case 222 /* PostfixUnaryExpression */:
                        return checkPostfixUnaryExpression(node);
                    case 223 /* BinaryExpression */:
                        return checkBinaryExpression(node, checkMode);
                    case 224 /* ConditionalExpression */:
                        return checkConditionalExpression(node, checkMode);
                    case 227 /* SpreadElement */:
                        return checkSpreadExpression(node, checkMode);
                    case 229 /* OmittedExpression */:
                        return undefinedWideningType;
                    case 226 /* YieldExpression */:
                        return checkYieldExpression(node);
                    case 234 /* SyntheticExpression */:
                        return checkSyntheticExpression(node);
                    case 291 /* JsxExpression */:
                        return checkJsxExpression(node, checkMode);
                    case 281 /* JsxElement */:
                        return checkJsxElement(node, checkMode);
                    case 282 /* JsxSelfClosingElement */:
                        return checkJsxSelfClosingElement(node, checkMode);
                    case 285 /* JsxFragment */:
                        return checkJsxFragment(node);
                    case 289 /* JsxAttributes */:
                        return checkJsxAttributes(node, checkMode);
                    case 283 /* JsxOpeningElement */:
                        Debug.fail("Shouldn't ever directly check a JsxOpeningElement");
                }
                return errorType;
            }
            function checkParameter(node) {
                checkGrammarModifiers(node);
                checkVariableLikeDeclaration(node);
                const func = getContainingFunction(node);
                if (hasSyntacticModifier(node, 16476 /* ParameterPropertyModifier */)) {
                    if (!(func.kind === 173 /* Constructor */ && nodeIsPresent(func.body))) {
                        error(node, Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
                    }
                    if (func.kind === 173 /* Constructor */ && isIdentifier(node.name) && node.name.escapedText === "constructor") {
                        error(node.name, Diagnostics.constructor_cannot_be_used_as_a_parameter_property_name);
                    }
                }
                if (!node.initializer && isOptionalDeclaration(node) && isBindingPattern(node.name) && func.body) {
                    error(node, Diagnostics.A_binding_pattern_parameter_cannot_be_optional_in_an_implementation_signature);
                }
                if (node.name && isIdentifier(node.name) && (node.name.escapedText === "this" || node.name.escapedText === "new")) {
                    if (func.parameters.indexOf(node) !== 0) {
                        error(node, Diagnostics.A_0_parameter_must_be_the_first_parameter, node.name.escapedText);
                    }
                    if (func.kind === 173 /* Constructor */ || func.kind === 177 /* ConstructSignature */ || func.kind === 182 /* ConstructorType */) {
                        error(node, Diagnostics.A_constructor_cannot_have_a_this_parameter);
                    }
                    if (func.kind === 216 /* ArrowFunction */) {
                        error(node, Diagnostics.An_arrow_function_cannot_have_a_this_parameter);
                    }
                    if (func.kind === 174 /* GetAccessor */ || func.kind === 175 /* SetAccessor */) {
                        error(node, Diagnostics.get_and_set_accessors_cannot_declare_this_parameters);
                    }
                }
                if (node.dotDotDotToken && !isBindingPattern(node.name) && !isTypeAssignableTo(getReducedType(getTypeOfSymbol(node.symbol)), anyReadonlyArrayType)) {
                    error(node, Diagnostics.A_rest_parameter_must_be_of_an_array_type);
                }
            }
                function checkAccessorDeclarationDiagnostics() {
                    if (!checkGrammarFunctionLikeDeclaration(node) && !checkGrammarAccessor(node))
                        checkGrammarComputedPropertyName(node.name);
                    checkDecorators(node);
                    checkSignatureDeclaration(node);
                    if (node.kind === 174 /* GetAccessor */) {
                        if (!(node.flags & 16777216 /* Ambient */) && nodeIsPresent(node.body) && node.flags & 256 /* HasImplicitReturn */) {
                            if (!(node.flags & 512 /* HasExplicitReturn */)) {
                                error(node.name, Diagnostics.A_get_accessor_must_return_a_value);
                            }
                        }
                    }
                    if (node.name.kind === 164 /* ComputedPropertyName */) {
                        checkComputedPropertyName(node.name);
                    }
                    if (hasBindableName(node)) {
                        const symbol = getSymbolOfDeclaration(node);
                        const getter = getDeclarationOfKind(symbol, 174 /* GetAccessor */);
                        const setter = getDeclarationOfKind(symbol, 175 /* SetAccessor */);
                        if (getter && setter && !(getNodeCheckFlags(getter) & 1 /* TypeChecked */)) {
                            getNodeLinks(getter).flags |= 1 /* TypeChecked */;
                            const getterFlags = getEffectiveModifierFlags(getter);
                            const setterFlags = getEffectiveModifierFlags(setter);
                            if ((getterFlags & 256 /* Abstract */) !== (setterFlags & 256 /* Abstract */)) {
                                error(getter.name, Diagnostics.Accessors_must_both_be_abstract_or_non_abstract);
                                error(setter.name, Diagnostics.Accessors_must_both_be_abstract_or_non_abstract);
                            }
                            if (getterFlags & 16 /* Protected */ && !(setterFlags & (16 /* Protected */ | 8 /* Private */)) || getterFlags & 8 /* Private */ && !(setterFlags & 8 /* Private */)) {
                                error(getter.name, Diagnostics.A_get_accessor_must_be_at_least_as_accessible_as_the_setter);
                                error(setter.name, Diagnostics.A_get_accessor_must_be_at_least_as_accessible_as_the_setter);
                            }
                            const getterType = getAnnotatedAccessorType(getter);
                            const setterType = getAnnotatedAccessorType(setter);
                            if (getterType && setterType) {
                                checkTypeAssignableTo(getterType, setterType, getter, Diagnostics.The_return_type_of_a_get_accessor_must_be_assignable_to_its_set_accessor_type);
                            }
                        }
                    }
                    const returnType = getTypeOfAccessors(getSymbolOfDeclaration(node));
                    if (node.kind === 174 /* GetAccessor */) {
                        checkAllCodePathsInNonVoidFunctionReturnOrThrow(node, returnType);
                    }
                }
            function checkFunctionOrConstructorSymbolWorker(symbol) {
                function getCanonicalOverload(overloads, implementation) {
                    const implementationSharesContainerWithFirstOverload = implementation !== void 0 && implementation.parent === overloads[0].parent;
                    return implementationSharesContainerWithFirstOverload ? implementation : overloads[0];
                }
                function checkFlagAgreementBetweenOverloads(overloads, implementation, flagsToCheck2, someOverloadFlags, allOverloadFlags) {
                    const someButNotAllOverloadFlags = someOverloadFlags ^ allOverloadFlags;
                    if (someButNotAllOverloadFlags !== 0) {
                        const canonicalFlags = getEffectiveDeclarationFlags(getCanonicalOverload(overloads, implementation), flagsToCheck2);
                        forEach(overloads, (o) => {
                            const deviation = getEffectiveDeclarationFlags(o, flagsToCheck2) ^ canonicalFlags;
                            if (deviation & 1 /* Export */) {
                                error(getNameOfDeclaration(o), Diagnostics.Overload_signatures_must_all_be_exported_or_non_exported);
                            }
                            else if (deviation & 2 /* Ambient */) {
                                error(getNameOfDeclaration(o), Diagnostics.Overload_signatures_must_all_be_ambient_or_non_ambient);
                            }
                            else if (deviation & (8 /* Private */ | 16 /* Protected */)) {
                                error(getNameOfDeclaration(o) || o, Diagnostics.Overload_signatures_must_all_be_public_private_or_protected);
                            }
                            else if (deviation & 256 /* Abstract */) {
                                error(getNameOfDeclaration(o), Diagnostics.Overload_signatures_must_all_be_abstract_or_non_abstract);
                            }
                        });
                    }
                }
                function checkQuestionTokenAgreementBetweenOverloads(overloads, implementation, someHaveQuestionToken2, allHaveQuestionToken2) {
                    if (someHaveQuestionToken2 !== allHaveQuestionToken2) {
                        const canonicalHasQuestionToken = hasQuestionToken(getCanonicalOverload(overloads, implementation));
                        forEach(overloads, (o) => {
                            const deviation = hasQuestionToken(o) !== canonicalHasQuestionToken;
                            if (deviation) {
                                error(getNameOfDeclaration(o), Diagnostics.Overload_signatures_must_all_be_optional_or_required);
                            }
                        });
                    }
                }
                const flagsToCheck = 1 /* Export */ | 2 /* Ambient */ | 8 /* Private */ | 16 /* Protected */ | 256 /* Abstract */;
                let someNodeFlags = 0 /* None */;
                let allNodeFlags = flagsToCheck;
                let someHaveQuestionToken = false;
                let allHaveQuestionToken = true;
                let hasOverloads = false;
                let bodyDeclaration;
                let lastSeenNonAmbientDeclaration;
                let previousDeclaration;
                const declarations = symbol.declarations;
                const isConstructor = (symbol.flags & 16384 /* Constructor */) !== 0;
                function reportImplementationExpectedError(node) {
                    if (node.name && nodeIsMissing(node.name)) {
                        return;
                    }
                    let seen = false;
                    const subsequentNode = forEachChild(node.parent, (c) => {
                        if (seen) {
                            return c;
                        }
                        else {
                            seen = c === node;
                        }
                    });
                    if (subsequentNode && subsequentNode.pos === node.end) {
                        if (subsequentNode.kind === node.kind) {
                            const errorNode2 = subsequentNode.name || subsequentNode;
                            const subsequentName = subsequentNode.name;
                            if (node.name && subsequentName && // both are private identifiers
                                (isPrivateIdentifier(node.name) && isPrivateIdentifier(subsequentName) && node.name.escapedText === subsequentName.escapedText || // Both are computed property names
                                    // TODO: GH#17345: These are methods, so handle computed name case. (`Always allowing computed property names is *not* the correct behavior!)
                                    isComputedPropertyName(node.name) && isComputedPropertyName(subsequentName) || // Both are literal property names that are the same.
                                    isPropertyNameLiteral(node.name) && isPropertyNameLiteral(subsequentName) && getEscapedTextOfIdentifierOrLiteral(node.name) === getEscapedTextOfIdentifierOrLiteral(subsequentName))) {
                                const reportError = (node.kind === 171 /* MethodDeclaration */ || node.kind === 170 /* MethodSignature */) && isStatic(node) !== isStatic(subsequentNode);
                                if (reportError) {
                                    const diagnostic = isStatic(node) ? Diagnostics.Function_overload_must_be_static : Diagnostics.Function_overload_must_not_be_static;
                                    error(errorNode2, diagnostic);
                                }
                                return;
                            }
                            if (nodeIsPresent(subsequentNode.body)) {
                                error(errorNode2, Diagnostics.Function_implementation_name_must_be_0, declarationNameToString(node.name));
                                return;
                            }
                        }
                    }
                    const errorNode = node.name || node;
                    if (isConstructor) {
                        error(errorNode, Diagnostics.Constructor_implementation_is_missing);
                    }
                    else {
                        if (hasSyntacticModifier(node, 256 /* Abstract */)) {
                            error(errorNode, Diagnostics.All_declarations_of_an_abstract_method_must_be_consecutive);
                        }
                        else {
                            error(errorNode, Diagnostics.Function_implementation_is_missing_or_not_immediately_following_the_declaration);
                        }
                    }
                }
                let duplicateFunctionDeclaration = false;
                let multipleConstructorImplementation = false;
                let hasNonAmbientClass = false;
                const functionDeclarations = [];
                if (declarations) {
                    for (const current of declarations) {
                        const node = current;
                        const inAmbientContext = node.flags & 16777216 /* Ambient */;
                        const inAmbientContextOrInterface = node.parent && (node.parent.kind === 261 /* InterfaceDeclaration */ || node.parent.kind === 184 /* TypeLiteral */) || inAmbientContext;
                        if (inAmbientContextOrInterface) {
                            previousDeclaration = void 0;
                        }
                        if ((node.kind === 260 /* ClassDeclaration */ || node.kind === 228 /* ClassExpression */) && !inAmbientContext) {
                            hasNonAmbientClass = true;
                        }
                        if (node.kind === 259 /* FunctionDeclaration */ || node.kind === 171 /* MethodDeclaration */ || node.kind === 170 /* MethodSignature */ || node.kind === 173 /* Constructor */) {
                            functionDeclarations.push(node);
                            const currentNodeFlags = getEffectiveDeclarationFlags(node, flagsToCheck);
                            someNodeFlags |= currentNodeFlags;
                            allNodeFlags &= currentNodeFlags;
                            someHaveQuestionToken = someHaveQuestionToken || hasQuestionToken(node);
                            allHaveQuestionToken = allHaveQuestionToken && hasQuestionToken(node);
                            const bodyIsPresent = nodeIsPresent(node.body);
                            if (bodyIsPresent && bodyDeclaration) {
                                if (isConstructor) {
                                    multipleConstructorImplementation = true;
                                }
                                else {
                                    duplicateFunctionDeclaration = true;
                                }
                            }
                            else if ((previousDeclaration == null ? void 0 : previousDeclaration.parent) === node.parent && previousDeclaration.end !== node.pos) {
                                reportImplementationExpectedError(previousDeclaration);
                            }
                            if (bodyIsPresent) {
                                if (!bodyDeclaration) {
                                    bodyDeclaration = node;
                                }
                            }
                            else {
                                hasOverloads = true;
                            }
                            previousDeclaration = node;
                            if (!inAmbientContextOrInterface) {
                                lastSeenNonAmbientDeclaration = node;
                            }
                        }
                        if (isInJSFile(current) && isFunctionLike(current) && current.jsDoc) {
                            for (const node2 of current.jsDoc) {
                                if (node2.tags) {
                                    for (const tag of node2.tags) {
                                        if (isJSDocOverloadTag(tag)) {
                                            hasOverloads = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (multipleConstructorImplementation) {
                    forEach(functionDeclarations, (declaration) => {
                        error(declaration, Diagnostics.Multiple_constructor_implementations_are_not_allowed);
                    });
                }
                if (duplicateFunctionDeclaration) {
                    forEach(functionDeclarations, (declaration) => {
                        error(getNameOfDeclaration(declaration) || declaration, Diagnostics.Duplicate_function_implementation);
                    });
                }
                if (hasNonAmbientClass && !isConstructor && symbol.flags & 16 /* Function */ && declarations) {
                    const relatedDiagnostics = filter(declarations, (d) => d.kind === 260 /* ClassDeclaration */).map((d) => createDiagnosticForNode(d, Diagnostics.Consider_adding_a_declare_modifier_to_this_class));
                    forEach(declarations, (declaration) => {
                        const diagnostic = declaration.kind === 260 /* ClassDeclaration */ ? Diagnostics.Class_declaration_cannot_implement_overload_list_for_0 : declaration.kind === 259 /* FunctionDeclaration */ ? Diagnostics.Function_with_bodies_can_only_merge_with_classes_that_are_ambient : void 0;
                        if (diagnostic) {
                            addRelatedInfo(error(getNameOfDeclaration(declaration) || declaration, diagnostic, symbolName(symbol)), ...relatedDiagnostics);
                        }
                    });
                }
                if (lastSeenNonAmbientDeclaration && !lastSeenNonAmbientDeclaration.body && !hasSyntacticModifier(lastSeenNonAmbientDeclaration, 256 /* Abstract */) && !lastSeenNonAmbientDeclaration.questionToken) {
                    reportImplementationExpectedError(lastSeenNonAmbientDeclaration);
                }
                if (hasOverloads) {
                    if (declarations) {
                        checkFlagAgreementBetweenOverloads(declarations, bodyDeclaration, flagsToCheck, someNodeFlags, allNodeFlags);
                        checkQuestionTokenAgreementBetweenOverloads(declarations, bodyDeclaration, someHaveQuestionToken, allHaveQuestionToken);
                    }
                    if (bodyDeclaration) {
                        const signatures = getSignaturesOfSymbol(symbol);
                        const bodySignature = getSignatureFromDeclaration(bodyDeclaration);
                        for (const signature of signatures) {
                            if (!isImplementationCompatibleWithOverload(bodySignature, signature)) {
                                const errorNode = signature.declaration && isJSDocSignature(signature.declaration) ? signature.declaration.parent.tagName : signature.declaration;
                                addRelatedInfo(error(errorNode, Diagnostics.This_overload_signature_is_not_compatible_with_its_implementation_signature), createDiagnosticForNode(bodyDeclaration, Diagnostics.The_implementation_signature_is_declared_here));
                                break;
                            }
                        }
                    }
                }
            }
                function getDeclarationSpaces(decl) {
                    let d = decl;
                    switch (d.kind) {
                        case 261 /* InterfaceDeclaration */:
                        case 262 /* TypeAliasDeclaration */:
                        case 349 /* JSDocTypedefTag */:
                        case 341 /* JSDocCallbackTag */:
                        case 343 /* JSDocEnumTag */:
                            return 2 /* ExportType */;
                        case 264 /* ModuleDeclaration */:
                            return isAmbientModule(d) || getModuleInstanceState(d) !== 0 /* NonInstantiated */ ? 4 /* ExportNamespace */ | 1 /* ExportValue */ : 4 /* ExportNamespace */;
                        case 260 /* ClassDeclaration */:
                        case 263 /* EnumDeclaration */:
                        case 302 /* EnumMember */:
                            return 2 /* ExportType */ | 1 /* ExportValue */;
                        case 308 /* SourceFile */:
                            return 2 /* ExportType */ | 1 /* ExportValue */ | 4 /* ExportNamespace */;
                        case 274 /* ExportAssignment */:
                        case 223 /* BinaryExpression */:
                            const node2 = d;
                            const expression = isExportAssignment(node2) ? node2.expression : node2.right;
                            if (!isEntityNameExpression(expression)) {
                                return 1 /* ExportValue */;
                            }
                            d = expression;
                        case 268 /* ImportEqualsDeclaration */:
                        case 271 /* NamespaceImport */:
                        case 270 /* ImportClause */:
                            let result = 0 /* None */;
                            const target = resolveAlias(getSymbolOfDeclaration(d));
                            forEach(target.declarations, (d2) => {
                                result |= getDeclarationSpaces(d2);
                            });
                            return result;
                        case 257 /* VariableDeclaration */:
                        case 205 /* BindingElement */:
                        case 259 /* FunctionDeclaration */:
                        case 273 /* ImportSpecifier */:
                        case 79 /* Identifier */:
                            return 1 /* ExportValue */;
                        case 170 /* MethodSignature */:
                        case 168 /* PropertySignature */:
                            return 2 /* ExportType */;
                        default:
                            return Debug.failBadSyntaxKind(d);
                    }
                }
            function createCallSignature(typeParameters, thisParameter, parameters, returnType, typePredicate, minArgumentCount = parameters.length, flags = 0 /* None */) {
            function createFunctionType(typeParameters, thisParameter, parameters, returnType, typePredicate, minArgumentCount, flags) {
            function checkDecorators(node) {
                if (!canHaveDecorators(node) || !hasDecorators(node) || !node.modifiers || !nodeCanBeDecorated(legacyDecorators, node, node.parent, node.parent.parent)) {
                    return;
                }
                const firstDecorator = find(node.modifiers, isDecorator);
                if (!firstDecorator) {
                    return;
                }
                if (legacyDecorators) {
                    checkExternalEmitHelpers(firstDecorator, 8 /* Decorate */);
                    if (node.kind === 166 /* Parameter */) {
                        checkExternalEmitHelpers(firstDecorator, 32 /* Param */);
                    }
                }
                else if (languageVersion < 99 /* ESNext */) {
                    checkExternalEmitHelpers(firstDecorator, 8 /* ESDecorateAndRunInitializers */);
                    if (isClassDeclaration(node)) {
                        if (!node.name) {
                            checkExternalEmitHelpers(firstDecorator, 8388608 /* SetFunctionName */);
                        }
                        else {
                            const member = getFirstTransformableStaticClassElement(node);
                            if (member) {
                                checkExternalEmitHelpers(firstDecorator, 8388608 /* SetFunctionName */);
                            }
                        }
                    }
                    else if (!isClassExpression(node)) {
                        if (isPrivateIdentifier(node.name) && (isMethodDeclaration(node) || isAccessor(node) || isAutoAccessorPropertyDeclaration(node))) {
                            checkExternalEmitHelpers(firstDecorator, 8388608 /* SetFunctionName */);
                        }
                        if (isComputedPropertyName(node.name)) {
                            checkExternalEmitHelpers(firstDecorator, 16777216 /* PropKey */);
                        }
                    }
                }
                if (compilerOptions.emitDecoratorMetadata) {
                    checkExternalEmitHelpers(firstDecorator, 16 /* Metadata */);
                    switch (node.kind) {
                        case 260 /* ClassDeclaration */:
                            const constructor = getFirstConstructorWithBody(node);
                            if (constructor) {
                                for (const parameter of constructor.parameters) {
                                    markDecoratorMedataDataTypeNodeAsReferenced(getParameterTypeNodeForDecoratorCheck(parameter));
                                }
                            }
                            break;
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            const otherKind = node.kind === 174 /* GetAccessor */ ? 175 /* SetAccessor */ : 174 /* GetAccessor */;
                            const otherAccessor = getDeclarationOfKind(getSymbolOfDeclaration(node), otherKind);
                            markDecoratorMedataDataTypeNodeAsReferenced(getAnnotatedAccessorTypeNode(node) || otherAccessor && getAnnotatedAccessorTypeNode(otherAccessor));
                            break;
                        case 171 /* MethodDeclaration */:
                            for (const parameter of node.parameters) {
                                markDecoratorMedataDataTypeNodeAsReferenced(getParameterTypeNodeForDecoratorCheck(parameter));
                            }
                            markDecoratorMedataDataTypeNodeAsReferenced(getEffectiveReturnTypeNode(node));
                            break;
                        case 169 /* PropertyDeclaration */:
                            markDecoratorMedataDataTypeNodeAsReferenced(getEffectiveTypeAnnotationNode(node));
                            break;
                        case 166 /* Parameter */:
                            markDecoratorMedataDataTypeNodeAsReferenced(getParameterTypeNodeForDecoratorCheck(node));
                            const containingSignature = node.parent;
                            for (const parameter of containingSignature.parameters) {
                                markDecoratorMedataDataTypeNodeAsReferenced(getParameterTypeNodeForDecoratorCheck(parameter));
                            }
                            break;
                    }
                }
                for (const modifier of node.modifiers) {
                    if (isDecorator(modifier)) {
                        checkDecorator(modifier);
                    }
                }
            }
            function checkUnusedIdentifiers(potentiallyUnusedIdentifiers, addDiagnostic) {
                for (const node of potentiallyUnusedIdentifiers) {
                    switch (node.kind) {
                        case 260 /* ClassDeclaration */:
                        case 228 /* ClassExpression */:
                            checkUnusedClassMembers(node, addDiagnostic);
                            checkUnusedTypeParameters(node, addDiagnostic);
                            break;
                        case 308 /* SourceFile */:
                        case 264 /* ModuleDeclaration */:
                        case 238 /* Block */:
                        case 266 /* CaseBlock */:
                        case 245 /* ForStatement */:
                        case 246 /* ForInStatement */:
                        case 247 /* ForOfStatement */:
                            checkUnusedLocalsAndParameters(node, addDiagnostic);
                            break;
                        case 173 /* Constructor */:
                        case 215 /* FunctionExpression */:
                        case 259 /* FunctionDeclaration */:
                        case 216 /* ArrowFunction */:
                        case 171 /* MethodDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            if (node.body) {
                                checkUnusedLocalsAndParameters(node, addDiagnostic);
                            }
                            checkUnusedTypeParameters(node, addDiagnostic);
                            break;
                        case 170 /* MethodSignature */:
                        case 176 /* CallSignature */:
                        case 177 /* ConstructSignature */:
                        case 181 /* FunctionType */:
                        case 182 /* ConstructorType */:
                        case 262 /* TypeAliasDeclaration */:
                        case 261 /* InterfaceDeclaration */:
                            checkUnusedTypeParameters(node, addDiagnostic);
                            break;
                        case 192 /* InferType */:
                            checkUnusedInferTypeParameter(node, addDiagnostic);
                            break;
                        default:
                            Debug.assertNever(node, "Node should not have been registered for unused identifiers check");
                    }
                }
            }
                nodeWithLocals.locals.forEach((local) => {
                    if (local.flags & 262144 /* TypeParameter */ ? !(local.flags & 3 /* Variable */ && !(local.isReferenced & 3 /* Variable */)) : local.isReferenced || local.exportSymbol) {
                        return;
                    }
                    if (local.declarations) {
                        for (const declaration of local.declarations) {
                            if (isValidUnusedLocalDeclaration(declaration)) {
                                continue;
                            }
                            if (isImportedDeclaration(declaration)) {
                                addToGroup(unusedImports, importClauseFromImported(declaration), declaration, getNodeId);
                            }
                            else if (isBindingElement(declaration) && isObjectBindingPattern(declaration.parent)) {
                                const lastElement = last(declaration.parent.elements);
                                if (declaration === lastElement || !last(declaration.parent.elements).dotDotDotToken) {
                                    addToGroup(unusedDestructures, declaration.parent, declaration, getNodeId);
                                }
                            }
                            else if (isVariableDeclaration(declaration)) {
                                addToGroup(unusedVariables, declaration.parent, declaration, getNodeId);
                            }
                            else {
                                const parameter = local.valueDeclaration && tryGetRootParameterDeclaration(local.valueDeclaration);
                                const name = local.valueDeclaration && getNameOfDeclaration(local.valueDeclaration);
                                if (parameter && name) {
                                    if (!isParameterPropertyDeclaration(parameter, parameter.parent) && !parameterIsThisKeyword(parameter) && !isIdentifierThatStartsWithUnderscore(name)) {
                                        if (isBindingElement(declaration) && isArrayBindingPattern(declaration.parent)) {
                                            addToGroup(unusedDestructures, declaration.parent, declaration, getNodeId);
                                        }
                                        else {
                                            addDiagnostic(parameter, 1 /* Parameter */, createDiagnosticForNode(name, Diagnostics._0_is_declared_but_its_value_is_never_read, symbolName(local)));
                                        }
                                    }
                                }
                                else {
                                    errorUnusedLocal(declaration, symbolName(local), addDiagnostic);
                                }
                            }
                        }
                    }
                });
            function checkVariableLikeDeclaration(node) {
                var _a2;
                checkDecorators(node);
                if (!isBindingElement(node)) {
                    checkSourceElement(node.type);
                }
                if (!node.name) {
                    return;
                }
                if (node.name.kind === 164 /* ComputedPropertyName */) {
                    checkComputedPropertyName(node.name);
                    if (hasOnlyExpressionInitializer(node) && node.initializer) {
                        checkExpressionCached(node.initializer);
                    }
                }
                if (isBindingElement(node)) {
                    if (node.propertyName && isIdentifier(node.name) && isParameterDeclaration(node) && nodeIsMissing(getContainingFunction(node).body)) {
                        potentialUnusedRenamedBindingElementsInTypes.push(node);
                        return;
                    }
                    if (isObjectBindingPattern(node.parent) && node.dotDotDotToken && languageVersion < 5 /* ES2018 */) {
                        checkExternalEmitHelpers(node, 4 /* Rest */);
                    }
                    if (node.propertyName && node.propertyName.kind === 164 /* ComputedPropertyName */) {
                        checkComputedPropertyName(node.propertyName);
                    }
                    const parent2 = node.parent.parent;
                    const parentCheckMode = node.dotDotDotToken ? 64 /* RestBindingElement */ : 0 /* Normal */;
                    const parentType = getTypeForBindingElementParent(parent2, parentCheckMode);
                    const name = node.propertyName || node.name;
                    if (parentType && !isBindingPattern(name)) {
                        const exprType = getLiteralTypeFromPropertyName(name);
                        if (isTypeUsableAsPropertyName(exprType)) {
                            const nameText = getPropertyNameFromType(exprType);
                            const property = getPropertyOfType(parentType, nameText);
                            if (property) {
                                markPropertyAsReferenced(property, 
                                /*nodeForCheckWriteOnly*/
                                void 0, 
                                /*isSelfTypeAccess*/
                                false);
                                checkPropertyAccessibility(node, !!parent2.initializer && parent2.initializer.kind === 106 /* SuperKeyword */, 
                                /*writing*/
                                false, parentType, property);
                            }
                        }
                    }
                }
                if (isBindingPattern(node.name)) {
                    if (node.name.kind === 204 /* ArrayBindingPattern */ && languageVersion < 2 /* ES2015 */ && compilerOptions.downlevelIteration) {
                        checkExternalEmitHelpers(node, 512 /* Read */);
                    }
                    forEach(node.name.elements, checkSourceElement);
                }
                if (isParameter(node) && node.initializer && nodeIsMissing(getContainingFunction(node).body)) {
                    error(node, Diagnostics.A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation);
                    return;
                }
                if (isBindingPattern(node.name)) {
                    const needCheckInitializer = hasOnlyExpressionInitializer(node) && node.initializer && node.parent.parent.kind !== 246 /* ForInStatement */;
                    const needCheckWidenedType = !some(node.name.elements, not(isOmittedExpression));
                    if (needCheckInitializer || needCheckWidenedType) {
                        const widenedType = getWidenedTypeForVariableLikeDeclaration(node);
                        if (needCheckInitializer) {
                            const initializerType = checkExpressionCached(node.initializer);
                            if (strictNullChecks && needCheckWidenedType) {
                                checkNonNullNonVoidType(initializerType, node);
                            }
                            else {
                                checkTypeAssignableToAndOptionallyElaborate(initializerType, getWidenedTypeForVariableLikeDeclaration(node), node, node.initializer);
                            }
                        }
                        if (needCheckWidenedType) {
                            if (isArrayBindingPattern(node.name)) {
                                checkIteratedTypeOrElementType(65 /* Destructuring */, widenedType, undefinedType, node);
                            }
                            else if (strictNullChecks) {
                                checkNonNullNonVoidType(widenedType, node);
                            }
                        }
                    }
                    return;
                }
                const symbol = getSymbolOfDeclaration(node);
                if (symbol.flags & 2097152 /* Alias */ && (isVariableDeclarationInitializedToBareOrAccessedRequire(node) || isBindingElementOfBareOrAccessedRequire(node))) {
                    checkAliasSymbol(node);
                    return;
                }
                const type = convertAutoToAny(getTypeOfSymbol(symbol));
                if (node === symbol.valueDeclaration) {
                    const initializer = hasOnlyExpressionInitializer(node) && getEffectiveInitializer(node);
                    if (initializer) {
                        const isJSObjectLiteralInitializer = isInJSFile(node) && isObjectLiteralExpression(initializer) && (initializer.properties.length === 0 || isPrototypeAccess(node.name)) && !!((_a2 = symbol.exports) == null ? void 0 : _a2.size);
                        if (!isJSObjectLiteralInitializer && node.parent.parent.kind !== 246 /* ForInStatement */) {
                            checkTypeAssignableToAndOptionallyElaborate(checkExpressionCached(initializer), type, node, initializer, 
                            /*headMessage*/
                            void 0);
                        }
                    }
                    if (symbol.declarations && symbol.declarations.length > 1) {
                        if (some(symbol.declarations, (d) => d !== node && isVariableLike(d) && !areDeclarationFlagsIdentical(d, node))) {
                            error(node.name, Diagnostics.All_declarations_of_0_must_have_identical_modifiers, declarationNameToString(node.name));
                        }
                    }
                }
                else {
                    const declarationType = convertAutoToAny(getWidenedTypeForVariableLikeDeclaration(node));
                    if (!isErrorType(type) && !isErrorType(declarationType) && !isTypeIdenticalTo(type, declarationType) && !(symbol.flags & 67108864 /* Assignment */)) {
                        errorNextVariableOrPropertyDeclarationMustHaveSameType(symbol.valueDeclaration, type, node, declarationType);
                    }
                    if (hasOnlyExpressionInitializer(node) && node.initializer) {
                        checkTypeAssignableToAndOptionallyElaborate(checkExpressionCached(node.initializer), declarationType, node, node.initializer, 
                        /*headMessage*/
                        void 0);
                    }
                    if (symbol.valueDeclaration && !areDeclarationFlagsIdentical(node, symbol.valueDeclaration)) {
                        error(node.name, Diagnostics.All_declarations_of_0_must_have_identical_modifiers, declarationNameToString(node.name));
                    }
                }
                if (node.kind !== 169 /* PropertyDeclaration */ && node.kind !== 168 /* PropertySignature */) {
                    checkExportsOnMergedDeclarations(node);
                    if (node.kind === 257 /* VariableDeclaration */ || node.kind === 205 /* BindingElement */) {
                        checkVarDeclaredNamesNotShadowed(node);
                    }
                    checkCollisionsForDeclarationName(node, node.name);
                }
            }
                function helper(condExpr2, body2) {
                    const location = isLogicalOrCoalescingBinaryExpression(condExpr2) ? skipParentheses(condExpr2.right) : condExpr2;
                    if (isModuleExportsAccessExpression(location)) {
                        return;
                    }
                    if (isLogicalOrCoalescingBinaryExpression(location)) {
                        bothHelper(location, body2);
                        return;
                    }
                    const type = location === condExpr2 ? condType : checkTruthinessExpression(location);
                    const isPropertyExpressionCast = isPropertyAccessExpression(location) && isTypeAssertion(location.expression);
                    if (!(getTypeFacts(type) & 4194304 /* Truthy */) || isPropertyExpressionCast)
                        return;
                    const callSignatures = getSignaturesOfType(type, 0 /* Call */);
                    const isPromise = !!getAwaitedTypeOfPromise(type);
                    if (callSignatures.length === 0 && !isPromise) {
                        return;
                    }
                    const testedNode = isIdentifier(location) ? location : isPropertyAccessExpression(location) ? location.name : void 0;
                    const testedSymbol = testedNode && getSymbolAtLocation(testedNode);
                    if (!testedSymbol && !isPromise) {
                        return;
                    }
                    const isUsed = testedSymbol && isBinaryExpression(condExpr2.parent) && isSymbolUsedInBinaryExpressionChain(condExpr2.parent, testedSymbol) || testedSymbol && body2 && isSymbolUsedInConditionBody(condExpr2, body2, testedNode, testedSymbol);
                    if (!isUsed) {
                        if (isPromise) {
                            errorAndMaybeSuggestAwait(location, 
                            /*maybeMissingAwait*/
                            true, Diagnostics.This_condition_will_always_return_true_since_this_0_is_always_defined, getTypeNameForErrorDisplay(type));
                        }
                        else {
                            error(location, Diagnostics.This_condition_will_always_return_true_since_this_function_is_always_defined_Did_you_mean_to_call_it_instead);
                        }
                    }
                }
            function getIteratedTypeOrElementType(use, inputType, sentType, errorNode, checkAssignability) {
                const allowAsyncIterables = (use & 2 /* AllowsAsyncIterablesFlag */) !== 0;
                if (inputType === neverType) {
                    reportTypeNotIterableError(errorNode, inputType, allowAsyncIterables);
                    return void 0;
                }
                const uplevelIteration = languageVersion >= 2 /* ES2015 */;
                const downlevelIteration = !uplevelIteration && compilerOptions.downlevelIteration;
                const possibleOutOfBounds = compilerOptions.noUncheckedIndexedAccess && !!(use & 128 /* PossiblyOutOfBounds */);
                if (uplevelIteration || downlevelIteration || allowAsyncIterables) {
                    const iterationTypes = getIterationTypesOfIterable(inputType, use, uplevelIteration ? errorNode : void 0);
                    if (checkAssignability) {
                        if (iterationTypes) {
                            const diagnostic = use & 8 /* ForOfFlag */ ? Diagnostics.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_for_of_will_always_send_0 : use & 32 /* SpreadFlag */ ? Diagnostics.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_array_spread_will_always_send_0 : use & 64 /* DestructuringFlag */ ? Diagnostics.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_array_destructuring_will_always_send_0 : use & 16 /* YieldStarFlag */ ? Diagnostics.Cannot_delegate_iteration_to_value_because_the_next_method_of_its_iterator_expects_type_1_but_the_containing_generator_will_always_send_0 : void 0;
                            if (diagnostic) {
                                checkTypeAssignableTo(sentType, iterationTypes.nextType, errorNode, diagnostic);
                            }
                        }
                    }
                    if (iterationTypes || uplevelIteration) {
                        return possibleOutOfBounds ? includeUndefinedInIndexSignature(iterationTypes && iterationTypes.yieldType) : iterationTypes && iterationTypes.yieldType;
                    }
                }
                let arrayType = inputType;
                let reportedError = false;
                let hasStringConstituent = false;
                if (use & 4 /* AllowsStringInputFlag */) {
                    if (arrayType.flags & 1048576 /* Union */) {
                        const arrayTypes = inputType.types;
                        const filteredTypes = filter(arrayTypes, (t) => !(t.flags & 402653316 /* StringLike */));
                        if (filteredTypes !== arrayTypes) {
                            arrayType = getUnionType(filteredTypes, 2 /* Subtype */);
                        }
                    }
                    else if (arrayType.flags & 402653316 /* StringLike */) {
                        arrayType = neverType;
                    }
                    hasStringConstituent = arrayType !== inputType;
                    if (hasStringConstituent) {
                        if (languageVersion < 1 /* ES5 */) {
                            if (errorNode) {
                                error(errorNode, Diagnostics.Using_a_string_in_a_for_of_statement_is_only_supported_in_ECMAScript_5_and_higher);
                                reportedError = true;
                            }
                        }
                        if (arrayType.flags & 131072 /* Never */) {
                            return possibleOutOfBounds ? includeUndefinedInIndexSignature(stringType) : stringType;
                        }
                    }
                }
                if (!isArrayLikeType(arrayType)) {
                    if (errorNode && !reportedError) {
                        const allowsStrings = !!(use & 4 /* AllowsStringInputFlag */) && !hasStringConstituent;
                        const [defaultDiagnostic, maybeMissingAwait] = getIterationDiagnosticDetails(allowsStrings, downlevelIteration);
                        errorAndMaybeSuggestAwait(errorNode, maybeMissingAwait && !!getAwaitedTypeOfPromise(arrayType), defaultDiagnostic, typeToString(arrayType));
                    }
                    return hasStringConstituent ? possibleOutOfBounds ? includeUndefinedInIndexSignature(stringType) : stringType : void 0;
                }
                const arrayElementType = getIndexTypeOfType(arrayType, numberType);
                if (hasStringConstituent && arrayElementType) {
                    if (arrayElementType.flags & 402653316 /* StringLike */ && !compilerOptions.noUncheckedIndexedAccess) {
                        return stringType;
                    }
                    return getUnionType(possibleOutOfBounds ? [arrayElementType, stringType, undefinedType] : [arrayElementType, stringType], 2 /* Subtype */);
                }
                return use & 128 /* PossiblyOutOfBounds */ ? includeUndefinedInIndexSignature(arrayElementType) : arrayElementType;
                function getIterationDiagnosticDetails(allowsStrings, downlevelIteration2) {
                    var _a2;
                    if (downlevelIteration2) {
                        return allowsStrings ? [Diagnostics.Type_0_is_not_an_array_type_or_a_string_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator, true] : [Diagnostics.Type_0_is_not_an_array_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator, true];
                    }
                    const yieldType = getIterationTypeOfIterable(use, 0 /* Yield */, inputType, 
                    /*errorNode*/
                    void 0);
                    if (yieldType) {
                        return [Diagnostics.Type_0_can_only_be_iterated_through_when_using_the_downlevelIteration_flag_or_with_a_target_of_es2015_or_higher, false];
                    }
                    if (isES2015OrLaterIterable((_a2 = inputType.symbol) == null ? void 0 : _a2.escapedName)) {
                        return [Diagnostics.Type_0_can_only_be_iterated_through_when_using_the_downlevelIteration_flag_or_with_a_target_of_es2015_or_higher, true];
                    }
                    return allowsStrings ? [Diagnostics.Type_0_is_not_an_array_type_or_a_string_type, true] : [Diagnostics.Type_0_is_not_an_array_type, true];
                }
            }
            function getIterationTypesOfIterable(type, use, errorNode) {
                var _a2, _b;
                if (isTypeAny(type)) {
                    return anyIterationTypes;
                }
                if (!(type.flags & 1048576 /* Union */)) {
                    const errorOutputContainer = errorNode ? { errors: void 0 } : void 0;
                    const iterationTypes2 = getIterationTypesOfIterableWorker(type, use, errorNode, errorOutputContainer);
                    if (iterationTypes2 === noIterationTypes) {
                        if (errorNode) {
                            const rootDiag = reportTypeNotIterableError(errorNode, type, !!(use & 2 /* AllowsAsyncIterablesFlag */));
                            if (errorOutputContainer == null ? void 0 : errorOutputContainer.errors) {
                                addRelatedInfo(rootDiag, ...errorOutputContainer.errors);
                            }
                        }
                        return void 0;
                    }
                    else if ((_a2 = errorOutputContainer == null ? void 0 : errorOutputContainer.errors) == null ? void 0 : _a2.length) {
                        for (const diag2 of errorOutputContainer.errors) {
                            diagnostics.add(diag2);
                        }
                    }
                    return iterationTypes2;
                }
                const cacheKey = use & 2 /* AllowsAsyncIterablesFlag */ ? "iterationTypesOfAsyncIterable" : "iterationTypesOfIterable";
                const cachedTypes2 = getCachedIterationTypes(type, cacheKey);
                if (cachedTypes2)
                    return cachedTypes2 === noIterationTypes ? void 0 : cachedTypes2;
                let allIterationTypes;
                for (const constituent of type.types) {
                    const errorOutputContainer = errorNode ? { errors: void 0 } : void 0;
                    const iterationTypes2 = getIterationTypesOfIterableWorker(constituent, use, errorNode, errorOutputContainer);
                    if (iterationTypes2 === noIterationTypes) {
                        if (errorNode) {
                            const rootDiag = reportTypeNotIterableError(errorNode, type, !!(use & 2 /* AllowsAsyncIterablesFlag */));
                            if (errorOutputContainer == null ? void 0 : errorOutputContainer.errors) {
                                addRelatedInfo(rootDiag, ...errorOutputContainer.errors);
                            }
                        }
                        setCachedIterationTypes(type, cacheKey, noIterationTypes);
                        return void 0;
                    }
                    else if ((_b = errorOutputContainer == null ? void 0 : errorOutputContainer.errors) == null ? void 0 : _b.length) {
                        for (const diag2 of errorOutputContainer.errors) {
                            diagnostics.add(diag2);
                        }
                    }
                    allIterationTypes = append(allIterationTypes, iterationTypes2);
                }
                const iterationTypes = allIterationTypes ? combineIterationTypes(allIterationTypes) : noIterationTypes;
                setCachedIterationTypes(type, cacheKey, iterationTypes);
                return iterationTypes === noIterationTypes ? void 0 : iterationTypes;
            }
            function getIterationTypesOfIterableWorker(type, use, errorNode, errorOutputContainer) {
                if (isTypeAny(type)) {
                    return anyIterationTypes;
                }
                let noCache = false;
                if (use & 2 /* AllowsAsyncIterablesFlag */) {
                    const iterationTypes = getIterationTypesOfIterableCached(type, asyncIterationTypesResolver) || getIterationTypesOfIterableFast(type, asyncIterationTypesResolver);
                    if (iterationTypes) {
                        if (iterationTypes === noIterationTypes && errorNode) {
                            noCache = true;
                        }
                        else {
                            return use & 8 /* ForOfFlag */ ? getAsyncFromSyncIterationTypes(iterationTypes, errorNode) : iterationTypes;
                        }
                    }
                }
                if (use & 1 /* AllowsSyncIterablesFlag */) {
                    let iterationTypes = getIterationTypesOfIterableCached(type, syncIterationTypesResolver) || getIterationTypesOfIterableFast(type, syncIterationTypesResolver);
                    if (iterationTypes) {
                        if (iterationTypes === noIterationTypes && errorNode) {
                            noCache = true;
                        }
                        else {
                            if (use & 2 /* AllowsAsyncIterablesFlag */) {
                                if (iterationTypes !== noIterationTypes) {
                                    iterationTypes = getAsyncFromSyncIterationTypes(iterationTypes, errorNode);
                                    return noCache ? iterationTypes : setCachedIterationTypes(type, "iterationTypesOfAsyncIterable", iterationTypes);
                                }
                            }
                            else {
                                return iterationTypes;
                            }
                        }
                    }
                }
                if (use & 2 /* AllowsAsyncIterablesFlag */) {
                    const iterationTypes = getIterationTypesOfIterableSlow(type, asyncIterationTypesResolver, errorNode, errorOutputContainer, noCache);
                    if (iterationTypes !== noIterationTypes) {
                        return iterationTypes;
                    }
                }
                if (use & 1 /* AllowsSyncIterablesFlag */) {
                    let iterationTypes = getIterationTypesOfIterableSlow(type, syncIterationTypesResolver, errorNode, errorOutputContainer, noCache);
                    if (iterationTypes !== noIterationTypes) {
                        if (use & 2 /* AllowsAsyncIterablesFlag */) {
                            iterationTypes = getAsyncFromSyncIterationTypes(iterationTypes, errorNode);
                            return noCache ? iterationTypes : setCachedIterationTypes(type, "iterationTypesOfAsyncIterable", iterationTypes);
                        }
                        else {
                            return iterationTypes;
                        }
                    }
                }
                return noIterationTypes;
            }
            function getIterationTypesOfMethod(type, resolver, methodName, errorNode, errorOutputContainer) {
                var _a2, _b, _c, _d, _e, _f;
                const method = getPropertyOfType(type, methodName);
                if (!method && methodName !== "next") {
                    return void 0;
                }
                const methodType = method && !(methodName === "next" && method.flags & 16777216 /* Optional */) ? methodName === "next" ? getTypeOfSymbol(method) : getTypeWithFacts(getTypeOfSymbol(method), 2097152 /* NEUndefinedOrNull */) : void 0;
                if (isTypeAny(methodType)) {
                    return methodName === "next" ? anyIterationTypes : anyIterationTypesExceptNext;
                }
                const methodSignatures = methodType ? getSignaturesOfType(methodType, 0 /* Call */) : emptyArray;
                if (methodSignatures.length === 0) {
                    if (errorNode) {
                        const diagnostic = methodName === "next" ? resolver.mustHaveANextMethodDiagnostic : resolver.mustBeAMethodDiagnostic;
                        if (errorOutputContainer) {
                            (_a2 = errorOutputContainer.errors) != null ? _a2 : errorOutputContainer.errors = [];
                            errorOutputContainer.errors.push(createDiagnosticForNode(errorNode, diagnostic, methodName));
                        }
                        else {
                            error(errorNode, diagnostic, methodName);
                        }
                    }
                    return methodName === "next" ? noIterationTypes : void 0;
                }
                if ((methodType == null ? void 0 : methodType.symbol) && methodSignatures.length === 1) {
                    const globalGeneratorType = resolver.getGlobalGeneratorType(
                    /*reportErrors*/
                    false);
                    const globalIteratorType = resolver.getGlobalIteratorType(
                    /*reportErrors*/
                    false);
                    const isGeneratorMethod = ((_c = (_b = globalGeneratorType.symbol) == null ? void 0 : _b.members) == null ? void 0 : _c.get(methodName)) === methodType.symbol;
                    const isIteratorMethod = !isGeneratorMethod && ((_e = (_d = globalIteratorType.symbol) == null ? void 0 : _d.members) == null ? void 0 : _e.get(methodName)) === methodType.symbol;
                    if (isGeneratorMethod || isIteratorMethod) {
                        const globalType = isGeneratorMethod ? globalGeneratorType : globalIteratorType;
                        const { mapper } = methodType;
                        return createIterationTypes(getMappedType(globalType.typeParameters[0], mapper), getMappedType(globalType.typeParameters[1], mapper), methodName === "next" ? getMappedType(globalType.typeParameters[2], mapper) : void 0);
                    }
                }
                let methodParameterTypes;
                let methodReturnTypes;
                for (const signature of methodSignatures) {
                    if (methodName !== "throw" && some(signature.parameters)) {
                        methodParameterTypes = append(methodParameterTypes, getTypeAtPosition(signature, 0));
                    }
                    methodReturnTypes = append(methodReturnTypes, getReturnTypeOfSignature(signature));
                }
                let returnTypes;
                let nextType;
                if (methodName !== "throw") {
                    const methodParameterType = methodParameterTypes ? getUnionType(methodParameterTypes) : unknownType;
                    if (methodName === "next") {
                        nextType = methodParameterType;
                    }
                    else if (methodName === "return") {
                        const resolvedMethodParameterType = resolver.resolveIterationType(methodParameterType, errorNode) || anyType;
                        returnTypes = append(returnTypes, resolvedMethodParameterType);
                    }
                }
                let yieldType;
                const methodReturnType = methodReturnTypes ? getIntersectionType(methodReturnTypes) : neverType;
                const resolvedMethodReturnType = resolver.resolveIterationType(methodReturnType, errorNode) || anyType;
                const iterationTypes = getIterationTypesOfIteratorResult(resolvedMethodReturnType);
                if (iterationTypes === noIterationTypes) {
                    if (errorNode) {
                        if (errorOutputContainer) {
                            (_f = errorOutputContainer.errors) != null ? _f : errorOutputContainer.errors = [];
                            errorOutputContainer.errors.push(createDiagnosticForNode(errorNode, resolver.mustHaveAValueDiagnostic, methodName));
                        }
                        else {
                            error(errorNode, resolver.mustHaveAValueDiagnostic, methodName);
                        }
                    }
                    yieldType = anyType;
                    returnTypes = append(returnTypes, anyType);
                }
                else {
                    yieldType = iterationTypes.yieldType;
                    returnTypes = append(returnTypes, iterationTypes.returnType);
                }
                return createIterationTypes(yieldType, getUnionType(returnTypes), nextType);
            }
            function checkReturnStatement(node) {
                var _a2;
                if (checkGrammarStatementInAmbientContext(node)) {
                    return;
                }
                const container = getContainingFunctionOrClassStaticBlock(node);
                if (container && isClassStaticBlockDeclaration(container)) {
                    grammarErrorOnFirstToken(node, Diagnostics.A_return_statement_cannot_be_used_inside_a_class_static_block);
                    return;
                }
                if (!container) {
                    grammarErrorOnFirstToken(node, Diagnostics.A_return_statement_can_only_be_used_within_a_function_body);
                    return;
                }
                const signature = getSignatureFromDeclaration(container);
                const returnType = getReturnTypeOfSignature(signature);
                const functionFlags = getFunctionFlags(container);
                if (strictNullChecks || node.expression || returnType.flags & 131072 /* Never */) {
                    const exprType = node.expression ? checkExpressionCached(node.expression) : undefinedType;
                    if (container.kind === 175 /* SetAccessor */) {
                        if (node.expression) {
                            error(node, Diagnostics.Setters_cannot_return_a_value);
                        }
                    }
                    else if (container.kind === 173 /* Constructor */) {
                        if (node.expression && !checkTypeAssignableToAndOptionallyElaborate(exprType, returnType, node, node.expression)) {
                            error(node, Diagnostics.Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class);
                        }
                    }
                    else if (getReturnTypeFromAnnotation(container)) {
                        const unwrappedReturnType = (_a2 = unwrapReturnType(returnType, functionFlags)) != null ? _a2 : returnType;
                        const unwrappedExprType = functionFlags & 2 /* Async */ ? checkAwaitedType(exprType, 
                        /*withAlias*/
                        false, node, Diagnostics.The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member) : exprType;
                        if (unwrappedReturnType) {
                            checkTypeAssignableToAndOptionallyElaborate(unwrappedExprType, unwrappedReturnType, node, node.expression);
                        }
                    }
                }
                else if (container.kind !== 173 /* Constructor */ && compilerOptions.noImplicitReturns && !isUnwrappedReturnTypeVoidOrAny(container, returnType)) {
                    error(node, Diagnostics.Not_all_code_paths_return_a_value);
                }
            }
            function checkExistingMemberForOverrideModifier(node, staticType, baseStaticType, baseWithThis, type, typeWithThis, member, memberIsParameterProperty, reportErrors2 = true) {
            function checkMemberForOverrideModifier(node, staticType, baseStaticType, baseWithThis, type, typeWithThis, memberHasOverrideModifier, memberHasAbstractModifier, memberIsStatic, memberIsParameterProperty, memberName, errorNode) {
                const isJs = isInJSFile(node);
                const nodeInAmbientContext = !!(node.flags & 16777216 /* Ambient */);
                if (baseWithThis && (memberHasOverrideModifier || compilerOptions.noImplicitOverride)) {
                    const memberEscapedName = escapeLeadingUnderscores(memberName);
                    const thisType = memberIsStatic ? staticType : typeWithThis;
                    const baseType = memberIsStatic ? baseStaticType : baseWithThis;
                    const prop = getPropertyOfType(thisType, memberEscapedName);
                    const baseProp = getPropertyOfType(baseType, memberEscapedName);
                    const baseClassName = typeToString(baseWithThis);
                    if (prop && !baseProp && memberHasOverrideModifier) {
                        if (errorNode) {
                            const suggestion = getSuggestedSymbolForNonexistentClassMember(memberName, baseType);
                            suggestion ? error(errorNode, isJs ? Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base_class_0_Did_you_mean_1 : Diagnostics.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0_Did_you_mean_1, baseClassName, symbolToString(suggestion)) : error(errorNode, isJs ? Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base_class_0 : Diagnostics.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0, baseClassName);
                        }
                        return 2 /* HasInvalidOverride */;
                    }
                    else if (prop && (baseProp == null ? void 0 : baseProp.declarations) && compilerOptions.noImplicitOverride && !nodeInAmbientContext) {
                        const baseHasAbstract = some(baseProp.declarations, hasAbstractModifier);
                        if (memberHasOverrideModifier) {
                            return 0 /* Ok */;
                        }
                        if (!baseHasAbstract) {
                            if (errorNode) {
                                const diag2 = memberIsParameterProperty ? isJs ? Diagnostics.This_parameter_property_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0 : Diagnostics.This_parameter_property_must_have_an_override_modifier_because_it_overrides_a_member_in_base_class_0 : isJs ? Diagnostics.This_member_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0 : Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_a_member_in_the_base_class_0;
                                error(errorNode, diag2, baseClassName);
                            }
                            return 1 /* NeedsOverride */;
                        }
                        else if (memberHasAbstractModifier && baseHasAbstract) {
                            if (errorNode) {
                                error(errorNode, Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_an_abstract_method_that_is_declared_in_the_base_class_0, baseClassName);
                            }
                            return 1 /* NeedsOverride */;
                        }
                    }
                }
                else if (memberHasOverrideModifier) {
                    if (errorNode) {
                        const className = typeToString(type);
                        error(errorNode, isJs ? Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_its_containing_class_0_does_not_extend_another_class : Diagnostics.This_member_cannot_have_an_override_modifier_because_its_containing_class_0_does_not_extend_another_class, className);
                    }
                    return 2 /* HasInvalidOverride */;
                }
                return 0 /* Ok */;
            }
            function checkKindsOfPropertyMemberOverrides(type, baseType) {
                var _a2, _b, _c, _d;
                const baseProperties = getPropertiesOfType(baseType);
                basePropertyCheck: for (const baseProperty of baseProperties) {
                    const base = getTargetSymbol(baseProperty);
                    if (base.flags & 4194304 /* Prototype */) {
                        continue;
                    }
                    const baseSymbol = getPropertyOfObjectType(type, base.escapedName);
                    if (!baseSymbol) {
                        continue;
                    }
                    const derived = getTargetSymbol(baseSymbol);
                    const baseDeclarationFlags = getDeclarationModifierFlagsFromSymbol(base);
                    Debug.assert(!!derived, "derived should point to something, even if it is the base class' declaration.");
                    if (derived === base) {
                        const derivedClassDecl = getClassLikeDeclarationOfSymbol(type.symbol);
                        if (baseDeclarationFlags & 256 /* Abstract */ && (!derivedClassDecl || !hasSyntacticModifier(derivedClassDecl, 256 /* Abstract */))) {
                            for (const otherBaseType of getBaseTypes(type)) {
                                if (otherBaseType === baseType)
                                    continue;
                                const baseSymbol2 = getPropertyOfObjectType(otherBaseType, base.escapedName);
                                const derivedElsewhere = baseSymbol2 && getTargetSymbol(baseSymbol2);
                                if (derivedElsewhere && derivedElsewhere !== base) {
                                    continue basePropertyCheck;
                                }
                            }
                            if (derivedClassDecl.kind === 228 /* ClassExpression */) {
                                error(derivedClassDecl, Diagnostics.Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1, symbolToString(baseProperty), typeToString(baseType));
                            }
                            else {
                                error(derivedClassDecl, Diagnostics.Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2, typeToString(type), symbolToString(baseProperty), typeToString(baseType));
                            }
                        }
                    }
                    else {
                        const derivedDeclarationFlags = getDeclarationModifierFlagsFromSymbol(derived);
                        if (baseDeclarationFlags & 8 /* Private */ || derivedDeclarationFlags & 8 /* Private */) {
                            continue;
                        }
                        let errorMessage;
                        const basePropertyFlags = base.flags & 98308 /* PropertyOrAccessor */;
                        const derivedPropertyFlags = derived.flags & 98308 /* PropertyOrAccessor */;
                        if (basePropertyFlags && derivedPropertyFlags) {
                            if ((getCheckFlags(base) & 6 /* Synthetic */ ? (_a2 = base.declarations) == null ? void 0 : _a2.some((d) => isPropertyAbstractOrInterface(d, baseDeclarationFlags)) : (_b = base.declarations) == null ? void 0 : _b.every((d) => isPropertyAbstractOrInterface(d, baseDeclarationFlags))) || getCheckFlags(base) & 262144 /* Mapped */ || derived.valueDeclaration && isBinaryExpression(derived.valueDeclaration)) {
                                continue;
                            }
                            const overriddenInstanceProperty = basePropertyFlags !== 4 /* Property */ && derivedPropertyFlags === 4 /* Property */;
                            const overriddenInstanceAccessor = basePropertyFlags === 4 /* Property */ && derivedPropertyFlags !== 4 /* Property */;
                            if (overriddenInstanceProperty || overriddenInstanceAccessor) {
                                const errorMessage2 = overriddenInstanceProperty ? Diagnostics._0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property : Diagnostics._0_is_defined_as_a_property_in_class_1_but_is_overridden_here_in_2_as_an_accessor;
                                error(getNameOfDeclaration(derived.valueDeclaration) || derived.valueDeclaration, errorMessage2, symbolToString(base), typeToString(baseType), typeToString(type));
                            }
                            else if (useDefineForClassFields) {
                                const uninitialized = (_c = derived.declarations) == null ? void 0 : _c.find((d) => d.kind === 169 /* PropertyDeclaration */ && !d.initializer);
                                if (uninitialized && !(derived.flags & 33554432 /* Transient */) && !(baseDeclarationFlags & 256 /* Abstract */) && !(derivedDeclarationFlags & 256 /* Abstract */) && !((_d = derived.declarations) == null ? void 0 : _d.some((d) => !!(d.flags & 16777216 /* Ambient */)))) {
                                    const constructor = findConstructorDeclaration(getClassLikeDeclarationOfSymbol(type.symbol));
                                    const propName = uninitialized.name;
                                    if (uninitialized.exclamationToken || !constructor || !isIdentifier(propName) || !strictNullChecks || !isPropertyInitializedInConstructor(propName, type, constructor)) {
                                        const errorMessage2 = Diagnostics.Property_0_will_overwrite_the_base_property_in_1_If_this_is_intentional_add_an_initializer_Otherwise_add_a_declare_modifier_or_remove_the_redundant_declaration;
                                        error(getNameOfDeclaration(derived.valueDeclaration) || derived.valueDeclaration, errorMessage2, symbolToString(base), typeToString(baseType));
                                    }
                                }
                            }
                            continue;
                        }
                        else if (isPrototypeProperty(base)) {
                            if (isPrototypeProperty(derived) || derived.flags & 4 /* Property */) {
                                continue;
                            }
                            else {
                                Debug.assert(!!(derived.flags & 98304 /* Accessor */));
                                errorMessage = Diagnostics.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor;
                            }
                        }
                        else if (base.flags & 98304 /* Accessor */) {
                            errorMessage = Diagnostics.Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function;
                        }
                        else {
                            errorMessage = Diagnostics.Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function;
                        }
                        error(getNameOfDeclaration(derived.valueDeclaration) || derived.valueDeclaration, errorMessage, typeToString(baseType), symbolToString(base), typeToString(type));
                    }
                }
            }
            function evaluate(expr, location) {
                switch (expr.kind) {
                    case 221 /* PrefixUnaryExpression */:
                        const value = evaluate(expr.operand, location);
                        if (typeof value === "number") {
                            switch (expr.operator) {
                                case 39 /* PlusToken */:
                                    return value;
                                case 40 /* MinusToken */:
                                    return -value;
                                case 54 /* TildeToken */:
                                    return ~value;
                            }
                        }
                        break;
                    case 223 /* BinaryExpression */:
                        const left = evaluate(expr.left, location);
                        const right = evaluate(expr.right, location);
                        if (typeof left === "number" && typeof right === "number") {
                            switch (expr.operatorToken.kind) {
                                case 51 /* BarToken */:
                                    return left | right;
                                case 50 /* AmpersandToken */:
                                    return left & right;
                                case 48 /* GreaterThanGreaterThanToken */:
                                    return left >> right;
                                case 49 /* GreaterThanGreaterThanGreaterThanToken */:
                                    return left >>> right;
                                case 47 /* LessThanLessThanToken */:
                                    return left << right;
                                case 52 /* CaretToken */:
                                    return left ^ right;
                                case 41 /* AsteriskToken */:
                                    return left * right;
                                case 43 /* SlashToken */:
                                    return left / right;
                                case 39 /* PlusToken */:
                                    return left + right;
                                case 40 /* MinusToken */:
                                    return left - right;
                                case 44 /* PercentToken */:
                                    return left % right;
                                case 42 /* AsteriskAsteriskToken */:
                                    return left ** right;
                            }
                        }
                        else if ((typeof left === "string" || typeof left === "number") && (typeof right === "string" || typeof right === "number") && expr.operatorToken.kind === 39 /* PlusToken */) {
                            return "" + left + right;
                        }
                        break;
                    case 10 /* StringLiteral */:
                    case 14 /* NoSubstitutionTemplateLiteral */:
                        return expr.text;
                    case 225 /* TemplateExpression */:
                        return evaluateTemplateExpression(expr, location);
                    case 8 /* NumericLiteral */:
                        checkGrammarNumericLiteral(expr);
                        return +expr.text;
                    case 214 /* ParenthesizedExpression */:
                        return evaluate(expr.expression, location);
                    case 79 /* Identifier */:
                        if (isInfinityOrNaNString(expr.escapedText)) {
                            return +expr.escapedText;
                        }
                    case 208 /* PropertyAccessExpression */:
                        if (isEntityNameExpression(expr)) {
                            const symbol = resolveEntityName(expr, 111551 /* Value */, 
                            /*ignoreErrors*/
                            true);
                            if (symbol) {
                                if (symbol.flags & 8 /* EnumMember */) {
                                    return evaluateEnumMember(expr, symbol, location);
                                }
                                if (isConstVariable(symbol)) {
                                    const declaration = symbol.valueDeclaration;
                                    if (declaration && !declaration.type && declaration.initializer && declaration !== location && isBlockScopedNameDeclaredBeforeUse(declaration, location)) {
                                        return evaluate(declaration.initializer, declaration);
                                    }
                                }
                            }
                        }
                        break;
                    case 209 /* ElementAccessExpression */:
                        const root = expr.expression;
                        if (isEntityNameExpression(root) && isStringLiteralLike(expr.argumentExpression)) {
                            const rootSymbol = resolveEntityName(root, 111551 /* Value */, 
                            /*ignoreErrors*/
                            true);
                            if (rootSymbol && rootSymbol.flags & 384 /* Enum */) {
                                const name = escapeLeadingUnderscores(expr.argumentExpression.text);
                                const member = rootSymbol.exports.get(name);
                                if (member) {
                                    return evaluateEnumMember(expr, member, location);
                                }
                            }
                        }
                        break;
                }
                return void 0;
            }
                function checkModuleDeclarationDiagnostics() {
                    var _a2, _b;
                    const isGlobalAugmentation = isGlobalScopeAugmentation(node);
                    const inAmbientContext = node.flags & 16777216 /* Ambient */;
                    if (isGlobalAugmentation && !inAmbientContext) {
                        error(node.name, Diagnostics.Augmentations_for_the_global_scope_should_have_declare_modifier_unless_they_appear_in_already_ambient_context);
                    }
                    const isAmbientExternalModule = isAmbientModule(node);
                    const contextErrorMessage = isAmbientExternalModule ? Diagnostics.An_ambient_module_declaration_is_only_allowed_at_the_top_level_in_a_file : Diagnostics.A_namespace_declaration_is_only_allowed_at_the_top_level_of_a_namespace_or_module;
                    if (checkGrammarModuleElementContext(node, contextErrorMessage)) {
                        return;
                    }
                    if (!checkGrammarModifiers(node)) {
                        if (!inAmbientContext && node.name.kind === 10 /* StringLiteral */) {
                            grammarErrorOnNode(node.name, Diagnostics.Only_ambient_modules_can_use_quoted_names);
                        }
                    }
                    if (isIdentifier(node.name)) {
                        checkCollisionsForDeclarationName(node, node.name);
                    }
                    checkExportsOnMergedDeclarations(node);
                    const symbol = getSymbolOfDeclaration(node);
                    if (symbol.flags & 512 /* ValueModule */ && !inAmbientContext && isInstantiatedModule(node, shouldPreserveConstEnums(compilerOptions))) {
                        if (getIsolatedModules(compilerOptions) && !getSourceFileOfNode(node).externalModuleIndicator) {
                            error(node.name, Diagnostics.Namespaces_are_not_allowed_in_global_script_files_when_0_is_enabled_If_this_file_is_not_intended_to_be_a_global_script_set_moduleDetection_to_force_or_add_an_empty_export_statement, isolatedModulesLikeFlagName);
                        }
                        if (((_a2 = symbol.declarations) == null ? void 0 : _a2.length) > 1) {
                            const firstNonAmbientClassOrFunc = getFirstNonAmbientClassOrFunctionDeclaration(symbol);
                            if (firstNonAmbientClassOrFunc) {
                                if (getSourceFileOfNode(node) !== getSourceFileOfNode(firstNonAmbientClassOrFunc)) {
                                    error(node.name, Diagnostics.A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged);
                                }
                                else if (node.pos < firstNonAmbientClassOrFunc.pos) {
                                    error(node.name, Diagnostics.A_namespace_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged);
                                }
                            }
                            const mergedClass = getDeclarationOfKind(symbol, 260 /* ClassDeclaration */);
                            if (mergedClass && inSameLexicalScope(node, mergedClass)) {
                                getNodeLinks(node).flags |= 2048 /* LexicalModuleMergesWithClass */;
                            }
                        }
                        if (compilerOptions.verbatimModuleSyntax && node.parent.kind === 308 /* SourceFile */ && (moduleKind === 1 /* CommonJS */ || node.parent.impliedNodeFormat === 1 /* CommonJS */)) {
                            const exportModifier = (_b = node.modifiers) == null ? void 0 : _b.find((m) => m.kind === 93 /* ExportKeyword */);
                            if (exportModifier) {
                                error(exportModifier, Diagnostics.A_top_level_export_modifier_cannot_be_used_on_value_declarations_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled);
                            }
                        }
                    }
                    if (isAmbientExternalModule) {
                        if (isExternalModuleAugmentation(node)) {
                            const checkBody = isGlobalAugmentation || getSymbolOfDeclaration(node).flags & 33554432 /* Transient */;
                            if (checkBody && node.body) {
                                for (const statement of node.body.statements) {
                                    checkModuleAugmentationElement(statement, isGlobalAugmentation);
                                }
                            }
                        }
                        else if (isGlobalSourceFile(node.parent)) {
                            if (isGlobalAugmentation) {
                                error(node.name, Diagnostics.Augmentations_for_the_global_scope_can_only_be_directly_nested_in_external_modules_or_ambient_module_declarations);
                            }
                            else if (isExternalModuleNameRelative(getTextOfIdentifierOrLiteral(node.name))) {
                                error(node.name, Diagnostics.Ambient_module_declaration_cannot_specify_relative_module_name);
                            }
                        }
                        else {
                            if (isGlobalAugmentation) {
                                error(node.name, Diagnostics.Augmentations_for_the_global_scope_can_only_be_directly_nested_in_external_modules_or_ambient_module_declarations);
                            }
                            else {
                                error(node.name, Diagnostics.Ambient_modules_cannot_be_nested_in_other_modules_or_namespaces);
                            }
                        }
                    }
                }
            function checkAliasSymbol(node) {
                var _a2, _b, _c, _d, _e;
                let symbol = getSymbolOfDeclaration(node);
                const target = resolveAlias(symbol);
                if (target !== unknownSymbol) {
                    symbol = getMergedSymbol(symbol.exportSymbol || symbol);
                    if (isInJSFile(node) && !(target.flags & 111551 /* Value */) && !isTypeOnlyImportOrExportDeclaration(node)) {
                        const errorNode = isImportOrExportSpecifier(node) ? node.propertyName || node.name : isNamedDeclaration(node) ? node.name : node;
                        Debug.assert(node.kind !== 277 /* NamespaceExport */);
                        if (node.kind === 278 /* ExportSpecifier */) {
                            const diag2 = error(errorNode, Diagnostics.Types_cannot_appear_in_export_declarations_in_JavaScript_files);
                            const alreadyExportedSymbol = (_b = (_a2 = getSourceFileOfNode(node).symbol) == null ? void 0 : _a2.exports) == null ? void 0 : _b.get((node.propertyName || node.name).escapedText);
                            if (alreadyExportedSymbol === target) {
                                const exportingDeclaration = (_c = alreadyExportedSymbol.declarations) == null ? void 0 : _c.find(isJSDocNode);
                                if (exportingDeclaration) {
                                    addRelatedInfo(diag2, createDiagnosticForNode(exportingDeclaration, Diagnostics._0_is_automatically_exported_here, unescapeLeadingUnderscores(alreadyExportedSymbol.escapedName)));
                                }
                            }
                        }
                        else {
                            Debug.assert(node.kind !== 257 /* VariableDeclaration */);
                            const importDeclaration = findAncestor(node, or(isImportDeclaration, isImportEqualsDeclaration));
                            const moduleSpecifier = (_e = importDeclaration && ((_d = tryGetModuleSpecifierFromDeclaration(importDeclaration)) == null ? void 0 : _d.text)) != null ? _e : "...";
                            const importedIdentifier = unescapeLeadingUnderscores(isIdentifier(errorNode) ? errorNode.escapedText : symbol.escapedName);
                            error(errorNode, Diagnostics._0_is_a_type_and_cannot_be_imported_in_JavaScript_files_Use_1_in_a_JSDoc_type_annotation, importedIdentifier, `import("${moduleSpecifier}").${importedIdentifier}`);
                        }
                        return;
                    }
                    const targetFlags = getAllSymbolFlags(target);
                    const excludedMeanings = (symbol.flags & (111551 /* Value */ | 1048576 /* ExportValue */) ? 111551 /* Value */ : 0) | (symbol.flags & 788968 /* Type */ ? 788968 /* Type */ : 0) | (symbol.flags & 1920 /* Namespace */ ? 1920 /* Namespace */ : 0);
                    if (targetFlags & excludedMeanings) {
                        const message = node.kind === 278 /* ExportSpecifier */ ? Diagnostics.Export_declaration_conflicts_with_exported_declaration_of_0 : Diagnostics.Import_declaration_conflicts_with_local_declaration_of_0;
                        error(node, message, symbolToString(symbol));
                    }
                    if (getIsolatedModules(compilerOptions) && !isTypeOnlyImportOrExportDeclaration(node) && !(node.flags & 16777216 /* Ambient */)) {
                        const typeOnlyAlias = getTypeOnlyAliasDeclaration(symbol);
                        const isType = !(targetFlags & 111551 /* Value */);
                        if (isType || typeOnlyAlias) {
                            switch (node.kind) {
                                case 270 /* ImportClause */:
                                case 273 /* ImportSpecifier */:
                                case 268 /* ImportEqualsDeclaration */: {
                                    if (compilerOptions.preserveValueImports || compilerOptions.verbatimModuleSyntax) {
                                        Debug.assertIsDefined(node.name, "An ImportClause with a symbol should have a name");
                                        const message = compilerOptions.verbatimModuleSyntax && isInternalModuleImportEqualsDeclaration(node) ? Diagnostics.An_import_alias_cannot_resolve_to_a_type_or_type_only_declaration_when_verbatimModuleSyntax_is_enabled : isType ? compilerOptions.verbatimModuleSyntax ? Diagnostics._0_is_a_type_and_must_be_imported_using_a_type_only_import_when_verbatimModuleSyntax_is_enabled : Diagnostics._0_is_a_type_and_must_be_imported_using_a_type_only_import_when_preserveValueImports_and_isolatedModules_are_both_enabled : compilerOptions.verbatimModuleSyntax ? Diagnostics._0_resolves_to_a_type_only_declaration_and_must_be_imported_using_a_type_only_import_when_verbatimModuleSyntax_is_enabled : Diagnostics._0_resolves_to_a_type_only_declaration_and_must_be_imported_using_a_type_only_import_when_preserveValueImports_and_isolatedModules_are_both_enabled;
                                        const name = idText(node.kind === 273 /* ImportSpecifier */ ? node.propertyName || node.name : node.name);
                                        addTypeOnlyDeclarationRelatedInfo(error(node, message, name), isType ? void 0 : typeOnlyAlias, name);
                                    }
                                    if (isType && node.kind === 268 /* ImportEqualsDeclaration */ && hasEffectiveModifier(node, 1 /* Export */)) {
                                        error(node, Diagnostics.Cannot_use_export_import_on_a_type_or_type_only_namespace_when_0_is_enabled, isolatedModulesLikeFlagName);
                                    }
                                    break;
                                }
                                case 278 /* ExportSpecifier */: {
                                    if (compilerOptions.verbatimModuleSyntax || getSourceFileOfNode(typeOnlyAlias) !== getSourceFileOfNode(node)) {
                                        const name = idText(node.propertyName || node.name);
                                        const diagnostic = isType ? error(node, Diagnostics.Re_exporting_a_type_when_0_is_enabled_requires_using_export_type, isolatedModulesLikeFlagName) : error(node, Diagnostics._0_resolves_to_a_type_only_declaration_and_must_be_re_exported_using_a_type_only_re_export_when_1_is_enabled, name, isolatedModulesLikeFlagName);
                                        addTypeOnlyDeclarationRelatedInfo(diagnostic, isType ? void 0 : typeOnlyAlias, name);
                                        break;
                                    }
                                }
                            }
                        }
                        if (compilerOptions.verbatimModuleSyntax && node.kind !== 268 /* ImportEqualsDeclaration */ && !isInJSFile(node) && (moduleKind === 1 /* CommonJS */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */)) {
                            error(node, Diagnostics.ESM_syntax_is_not_allowed_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled);
                        }
                    }
                    if (isImportSpecifier(node)) {
                        const targetSymbol = checkDeprecatedAliasedSymbol(symbol, node);
                        if (isDeprecatedAliasedSymbol(targetSymbol) && targetSymbol.declarations) {
                            addDeprecatedSuggestion(node, targetSymbol.declarations, targetSymbol.escapedName);
                        }
                    }
                }
            }
            function checkExportDeclaration(node) {
                if (checkGrammarModuleElementContext(node, isInJSFile(node) ? Diagnostics.An_export_declaration_can_only_be_used_at_the_top_level_of_a_module : Diagnostics.An_export_declaration_can_only_be_used_at_the_top_level_of_a_namespace_or_module)) {
                    return;
                }
                if (!checkGrammarModifiers(node) && hasSyntacticModifiers(node)) {
                    grammarErrorOnFirstToken(node, Diagnostics.An_export_declaration_cannot_have_modifiers);
                }
                if (node.moduleSpecifier && node.exportClause && isNamedExports(node.exportClause) && length(node.exportClause.elements) && languageVersion === 0 /* ES3 */) {
                    checkExternalEmitHelpers(node, 4194304 /* CreateBinding */);
                }
                checkGrammarExportDeclaration(node);
                if (!node.moduleSpecifier || checkExternalImportOrExportDeclaration(node)) {
                    if (node.exportClause && !isNamespaceExport(node.exportClause)) {
                        forEach(node.exportClause.elements, checkExportSpecifier);
                        const inAmbientExternalModule = node.parent.kind === 265 /* ModuleBlock */ && isAmbientModule(node.parent.parent);
                        const inAmbientNamespaceDeclaration = !inAmbientExternalModule && node.parent.kind === 265 /* ModuleBlock */ && !node.moduleSpecifier && node.flags & 16777216 /* Ambient */;
                        if (node.parent.kind !== 308 /* SourceFile */ && !inAmbientExternalModule && !inAmbientNamespaceDeclaration) {
                            error(node, Diagnostics.Export_declarations_are_not_permitted_in_a_namespace);
                        }
                    }
                    else {
                        const moduleSymbol = resolveExternalModuleName(node, node.moduleSpecifier);
                        if (moduleSymbol && hasExportAssignmentSymbol(moduleSymbol)) {
                            error(node.moduleSpecifier, Diagnostics.Module_0_uses_export_and_cannot_be_used_with_export_Asterisk, symbolToString(moduleSymbol));
                        }
                        else if (node.exportClause) {
                            checkAliasSymbol(node.exportClause);
                        }
                        if (moduleKind !== 4 /* System */ && (moduleKind < 5 /* ES2015 */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */)) {
                            if (node.exportClause) {
                                if (getESModuleInterop(compilerOptions)) {
                                    checkExternalEmitHelpers(node, 65536 /* ImportStar */);
                                }
                            }
                            else {
                                checkExternalEmitHelpers(node, 32768 /* ExportStar */);
                            }
                        }
                    }
                }
                checkAssertClause(node);
            }
            function checkExportSpecifier(node) {
                checkAliasSymbol(node);
                if (getEmitDeclarations(compilerOptions)) {
                    collectLinkedAliases(node.propertyName || node.name, 
                    /*setVisibility*/
                    true);
                }
                if (!node.parent.parent.moduleSpecifier) {
                    const exportedName = node.propertyName || node.name;
                    const symbol = resolveName(exportedName, exportedName.escapedText, 111551 /* Value */ | 788968 /* Type */ | 1920 /* Namespace */ | 2097152 /* Alias */, 
                    /*nameNotFoundMessage*/
                    void 0, 
                    /*nameArg*/
                    void 0, 
                    /*isUse*/
                    true);
                    if (symbol && (symbol === undefinedSymbol || symbol === globalThisSymbol || symbol.declarations && isGlobalSourceFile(getDeclarationContainer(symbol.declarations[0])))) {
                        error(exportedName, Diagnostics.Cannot_export_0_Only_local_declarations_can_be_exported_from_a_module, idText(exportedName));
                    }
                    else {
                        if (!node.isTypeOnly && !node.parent.parent.isTypeOnly) {
                            markExportAsReferenced(node);
                        }
                        const target = symbol && (symbol.flags & 2097152 /* Alias */ ? resolveAlias(symbol) : symbol);
                        if (!target || getAllSymbolFlags(target) & 111551 /* Value */) {
                            checkExpressionCached(node.propertyName || node.name);
                        }
                    }
                }
                else {
                    if (getESModuleInterop(compilerOptions) && moduleKind !== 4 /* System */ && (moduleKind < 5 /* ES2015 */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */) && idText(node.propertyName || node.name) === "default") {
                        checkExternalEmitHelpers(node, 131072 /* ImportDefault */);
                    }
                }
            }
            function checkExportAssignment(node) {
                const illegalContextMessage = node.isExportEquals ? Diagnostics.An_export_assignment_must_be_at_the_top_level_of_a_file_or_module_declaration : Diagnostics.A_default_export_must_be_at_the_top_level_of_a_file_or_module_declaration;
                if (checkGrammarModuleElementContext(node, illegalContextMessage)) {
                    return;
                }
                const container = node.parent.kind === 308 /* SourceFile */ ? node.parent : node.parent.parent;
                if (container.kind === 264 /* ModuleDeclaration */ && !isAmbientModule(container)) {
                    if (node.isExportEquals) {
                        error(node, Diagnostics.An_export_assignment_cannot_be_used_in_a_namespace);
                    }
                    else {
                        error(node, Diagnostics.A_default_export_can_only_be_used_in_an_ECMAScript_style_module);
                    }
                    return;
                }
                if (!checkGrammarModifiers(node) && hasEffectiveModifiers(node)) {
                    grammarErrorOnFirstToken(node, Diagnostics.An_export_assignment_cannot_have_modifiers);
                }
                const typeAnnotationNode = getEffectiveTypeAnnotationNode(node);
                if (typeAnnotationNode) {
                    checkTypeAssignableTo(checkExpressionCached(node.expression), getTypeFromTypeNode(typeAnnotationNode), node.expression);
                }
                const isIllegalExportDefaultInCJS = !node.isExportEquals && !(node.flags & 16777216 /* Ambient */) && compilerOptions.verbatimModuleSyntax && (moduleKind === 1 /* CommonJS */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */);
                if (node.expression.kind === 79 /* Identifier */) {
                    const id = node.expression;
                    const sym = getExportSymbolOfValueSymbolIfExported(resolveEntityName(id, 67108863 /* All */, 
                    /*ignoreErrors*/
                    true, 
                    /*dontResolveAlias*/
                    true, node));
                    if (sym) {
                        markAliasReferenced(sym, id);
                        if (getAllSymbolFlags(sym) & 111551 /* Value */) {
                            checkExpressionCached(id);
                            if (!isIllegalExportDefaultInCJS && !(node.flags & 16777216 /* Ambient */) && compilerOptions.verbatimModuleSyntax && getTypeOnlyAliasDeclaration(sym, 111551 /* Value */)) {
                                error(id, node.isExportEquals ? Diagnostics.An_export_declaration_must_reference_a_real_value_when_verbatimModuleSyntax_is_enabled_but_0_resolves_to_a_type_only_declaration : Diagnostics.An_export_default_must_reference_a_real_value_when_verbatimModuleSyntax_is_enabled_but_0_resolves_to_a_type_only_declaration, idText(id));
                            }
                        }
                        else if (!isIllegalExportDefaultInCJS && !(node.flags & 16777216 /* Ambient */) && compilerOptions.verbatimModuleSyntax) {
                            error(id, node.isExportEquals ? Diagnostics.An_export_declaration_must_reference_a_value_when_verbatimModuleSyntax_is_enabled_but_0_only_refers_to_a_type : Diagnostics.An_export_default_must_reference_a_value_when_verbatimModuleSyntax_is_enabled_but_0_only_refers_to_a_type, idText(id));
                        }
                    }
                    else {
                        checkExpressionCached(id);
                    }
                    if (getEmitDeclarations(compilerOptions)) {
                        collectLinkedAliases(id, 
                        /*setVisibility*/
                        true);
                    }
                }
                else {
                    checkExpressionCached(node.expression);
                }
                if (isIllegalExportDefaultInCJS) {
                    error(node, Diagnostics.ESM_syntax_is_not_allowed_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled);
                }
                checkExternalModuleExports(container);
                if (node.flags & 16777216 /* Ambient */ && !isEntityNameExpression(node.expression)) {
                    grammarErrorOnNode(node.expression, Diagnostics.The_expression_of_an_export_assignment_must_be_an_identifier_or_qualified_name_in_an_ambient_context);
                }
                if (node.isExportEquals) {
                    if (moduleKind >= 5 /* ES2015 */ && (node.flags & 16777216 /* Ambient */ && getSourceFileOfNode(node).impliedNodeFormat === 99 /* ESNext */ || !(node.flags & 16777216 /* Ambient */) && getSourceFileOfNode(node).impliedNodeFormat !== 1 /* CommonJS */)) {
                        grammarErrorOnNode(node, Diagnostics.Export_assignment_cannot_be_used_when_targeting_ECMAScript_modules_Consider_using_export_default_or_another_module_format_instead);
                    }
                    else if (moduleKind === 4 /* System */ && !(node.flags & 16777216 /* Ambient */)) {
                        grammarErrorOnNode(node, Diagnostics.Export_assignment_is_not_supported_when_module_flag_is_system);
                    }
                }
            }
            function checkSourceElementWorker(node) {
                if (canHaveJSDoc(node)) {
                    forEach(node.jsDoc, ({ comment, tags }) => {
                        checkJSDocCommentWorker(comment);
                        forEach(tags, (tag) => {
                            checkJSDocCommentWorker(tag.comment);
                            if (isInJSFile(node)) {
                                checkSourceElement(tag);
                            }
                        });
                    });
                }
                const kind = node.kind;
                if (cancellationToken) {
                    switch (kind) {
                        case 264 /* ModuleDeclaration */:
                        case 260 /* ClassDeclaration */:
                        case 261 /* InterfaceDeclaration */:
                        case 259 /* FunctionDeclaration */:
                            cancellationToken.throwIfCancellationRequested();
                    }
                }
                if (kind >= 240 /* FirstStatement */ && kind <= 256 /* LastStatement */ && canHaveFlowNode(node) && node.flowNode && !isReachableFlowNode(node.flowNode)) {
                    errorOrSuggestion(compilerOptions.allowUnreachableCode === false, node, Diagnostics.Unreachable_code_detected);
                }
                switch (kind) {
                    case 165 /* TypeParameter */:
                        return checkTypeParameter(node);
                    case 166 /* Parameter */:
                        return checkParameter(node);
                    case 169 /* PropertyDeclaration */:
                        return checkPropertyDeclaration(node);
                    case 168 /* PropertySignature */:
                        return checkPropertySignature(node);
                    case 182 /* ConstructorType */:
                    case 181 /* FunctionType */:
                    case 176 /* CallSignature */:
                    case 177 /* ConstructSignature */:
                    case 178 /* IndexSignature */:
                        return checkSignatureDeclaration(node);
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                        return checkMethodDeclaration(node);
                    case 172 /* ClassStaticBlockDeclaration */:
                        return checkClassStaticBlockDeclaration(node);
                    case 173 /* Constructor */:
                        return checkConstructorDeclaration(node);
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return checkAccessorDeclaration(node);
                    case 180 /* TypeReference */:
                        return checkTypeReferenceNode(node);
                    case 179 /* TypePredicate */:
                        return checkTypePredicate(node);
                    case 183 /* TypeQuery */:
                        return checkTypeQuery(node);
                    case 184 /* TypeLiteral */:
                        return checkTypeLiteral(node);
                    case 185 /* ArrayType */:
                        return checkArrayType(node);
                    case 186 /* TupleType */:
                        return checkTupleType(node);
                    case 189 /* UnionType */:
                    case 190 /* IntersectionType */:
                        return checkUnionOrIntersectionType(node);
                    case 193 /* ParenthesizedType */:
                    case 187 /* OptionalType */:
                    case 188 /* RestType */:
                        return checkSourceElement(node.type);
                    case 194 /* ThisType */:
                        return checkThisType(node);
                    case 195 /* TypeOperator */:
                        return checkTypeOperator(node);
                    case 191 /* ConditionalType */:
                        return checkConditionalType(node);
                    case 192 /* InferType */:
                        return checkInferType(node);
                    case 200 /* TemplateLiteralType */:
                        return checkTemplateLiteralType(node);
                    case 202 /* ImportType */:
                        return checkImportType(node);
                    case 199 /* NamedTupleMember */:
                        return checkNamedTupleMember(node);
                    case 331 /* JSDocAugmentsTag */:
                        return checkJSDocAugmentsTag(node);
                    case 332 /* JSDocImplementsTag */:
                        return checkJSDocImplementsTag(node);
                    case 349 /* JSDocTypedefTag */:
                    case 341 /* JSDocCallbackTag */:
                    case 343 /* JSDocEnumTag */:
                        return checkJSDocTypeAliasTag(node);
                    case 348 /* JSDocTemplateTag */:
                        return checkJSDocTemplateTag(node);
                    case 347 /* JSDocTypeTag */:
                        return checkJSDocTypeTag(node);
                    case 327 /* JSDocLink */:
                    case 328 /* JSDocLinkCode */:
                    case 329 /* JSDocLinkPlain */:
                        return checkJSDocLinkLikeTag(node);
                    case 344 /* JSDocParameterTag */:
                        return checkJSDocParameterTag(node);
                    case 351 /* JSDocPropertyTag */:
                        return checkJSDocPropertyTag(node);
                    case 320 /* JSDocFunctionType */:
                        checkJSDocFunctionType(node);
                    case 318 /* JSDocNonNullableType */:
                    case 317 /* JSDocNullableType */:
                    case 315 /* JSDocAllType */:
                    case 316 /* JSDocUnknownType */:
                    case 325 /* JSDocTypeLiteral */:
                        checkJSDocTypeIsInJsFile(node);
                        forEachChild(node, checkSourceElement);
                        return;
                    case 321 /* JSDocVariadicType */:
                        checkJSDocVariadicType(node);
                        return;
                    case 312 /* JSDocTypeExpression */:
                        return checkSourceElement(node.type);
                    case 336 /* JSDocPublicTag */:
                    case 338 /* JSDocProtectedTag */:
                    case 337 /* JSDocPrivateTag */:
                        return checkJSDocAccessibilityModifiers(node);
                    case 353 /* JSDocSatisfiesTag */:
                        return checkJSDocSatisfiesTag(node);
                    case 196 /* IndexedAccessType */:
                        return checkIndexedAccessType(node);
                    case 197 /* MappedType */:
                        return checkMappedType(node);
                    case 259 /* FunctionDeclaration */:
                        return checkFunctionDeclaration(node);
                    case 238 /* Block */:
                    case 265 /* ModuleBlock */:
                        return checkBlock(node);
                    case 240 /* VariableStatement */:
                        return checkVariableStatement(node);
                    case 241 /* ExpressionStatement */:
                        return checkExpressionStatement(node);
                    case 242 /* IfStatement */:
                        return checkIfStatement(node);
                    case 243 /* DoStatement */:
                        return checkDoStatement(node);
                    case 244 /* WhileStatement */:
                        return checkWhileStatement(node);
                    case 245 /* ForStatement */:
                        return checkForStatement(node);
                    case 246 /* ForInStatement */:
                        return checkForInStatement(node);
                    case 247 /* ForOfStatement */:
                        return checkForOfStatement(node);
                    case 248 /* ContinueStatement */:
                    case 249 /* BreakStatement */:
                        return checkBreakOrContinueStatement(node);
                    case 250 /* ReturnStatement */:
                        return checkReturnStatement(node);
                    case 251 /* WithStatement */:
                        return checkWithStatement(node);
                    case 252 /* SwitchStatement */:
                        return checkSwitchStatement(node);
                    case 253 /* LabeledStatement */:
                        return checkLabeledStatement(node);
                    case 254 /* ThrowStatement */:
                        return checkThrowStatement(node);
                    case 255 /* TryStatement */:
                        return checkTryStatement(node);
                    case 257 /* VariableDeclaration */:
                        return checkVariableDeclaration(node);
                    case 205 /* BindingElement */:
                        return checkBindingElement(node);
                    case 260 /* ClassDeclaration */:
                        return checkClassDeclaration(node);
                    case 261 /* InterfaceDeclaration */:
                        return checkInterfaceDeclaration(node);
                    case 262 /* TypeAliasDeclaration */:
                        return checkTypeAliasDeclaration(node);
                    case 263 /* EnumDeclaration */:
                        return checkEnumDeclaration(node);
                    case 264 /* ModuleDeclaration */:
                        return checkModuleDeclaration(node);
                    case 269 /* ImportDeclaration */:
                        return checkImportDeclaration(node);
                    case 268 /* ImportEqualsDeclaration */:
                        return checkImportEqualsDeclaration(node);
                    case 275 /* ExportDeclaration */:
                        return checkExportDeclaration(node);
                    case 274 /* ExportAssignment */:
                        return checkExportAssignment(node);
                    case 239 /* EmptyStatement */:
                    case 256 /* DebuggerStatement */:
                        checkGrammarStatementInAmbientContext(node);
                        return;
                    case 279 /* MissingDeclaration */:
                        return checkMissingDeclaration(node);
                }
            }
            function getSymbolOfNameOrPropertyAccessExpression(name) {
                if (isDeclarationName(name)) {
                    return getSymbolOfNode(name.parent);
                }
                if (isInJSFile(name) && name.parent.kind === 208 /* PropertyAccessExpression */ && name.parent === name.parent.parent.left) {
                    if (!isPrivateIdentifier(name) && !isJSDocMemberName(name)) {
                        const specialPropertyAssignmentSymbol = getSpecialPropertyAssignmentSymbolFromEntityName(name);
                        if (specialPropertyAssignmentSymbol) {
                            return specialPropertyAssignmentSymbol;
                        }
                    }
                }
                if (name.parent.kind === 274 /* ExportAssignment */ && isEntityNameExpression(name)) {
                    const success = resolveEntityName(name, 
                    /*all meanings*/
                    111551 /* Value */ | 788968 /* Type */ | 1920 /* Namespace */ | 2097152 /* Alias */, 
                    /*ignoreErrors*/
                    true);
                    if (success && success !== unknownSymbol) {
                        return success;
                    }
                }
                else if (isEntityName(name) && isInRightSideOfImportOrExportAssignment(name)) {
                    const importEqualsDeclaration = getAncestor(name, 268 /* ImportEqualsDeclaration */);
                    Debug.assert(importEqualsDeclaration !== void 0);
                    return getSymbolOfPartOfRightHandSideOfImportEquals(name, 
                    /*dontResolveAlias*/
                    true);
                }
                if (isEntityName(name)) {
                    const possibleImportNode = isImportTypeQualifierPart(name);
                    if (possibleImportNode) {
                        getTypeFromTypeNode(possibleImportNode);
                        const sym = getNodeLinks(name).resolvedSymbol;
                        return sym === unknownSymbol ? void 0 : sym;
                    }
                }
                while (isRightSideOfQualifiedNameOrPropertyAccessOrJSDocMemberName(name)) {
                    name = name.parent;
                }
                if (isInNameOfExpressionWithTypeArguments(name)) {
                    let meaning = 0 /* None */;
                    if (name.parent.kind === 230 /* ExpressionWithTypeArguments */) {
                        meaning = isPartOfTypeNode(name) ? 788968 /* Type */ : 111551 /* Value */;
                        if (isExpressionWithTypeArgumentsInClassExtendsClause(name.parent)) {
                            meaning |= 111551 /* Value */;
                        }
                    }
                    else {
                        meaning = 1920 /* Namespace */;
                    }
                    meaning |= 2097152 /* Alias */;
                    const entityNameSymbol = isEntityNameExpression(name) ? resolveEntityName(name, meaning) : void 0;
                    if (entityNameSymbol) {
                        return entityNameSymbol;
                    }
                }
                if (name.parent.kind === 344 /* JSDocParameterTag */) {
                    return getParameterSymbolFromJSDoc(name.parent);
                }
                if (name.parent.kind === 165 /* TypeParameter */ && name.parent.parent.kind === 348 /* JSDocTemplateTag */) {
                    Debug.assert(!isInJSFile(name));
                    const typeParameter = getTypeParameterFromJsDoc(name.parent);
                    return typeParameter && typeParameter.symbol;
                }
                if (isExpressionNode(name)) {
                    if (nodeIsMissing(name)) {
                        return void 0;
                    }
                    const isJSDoc2 = findAncestor(name, or(isJSDocLinkLike, isJSDocNameReference, isJSDocMemberName));
                    const meaning = isJSDoc2 ? 788968 /* Type */ | 1920 /* Namespace */ | 111551 /* Value */ : 111551 /* Value */;
                    if (name.kind === 79 /* Identifier */) {
                        if (isJSXTagName(name) && isJsxIntrinsicIdentifier(name)) {
                            const symbol = getIntrinsicTagSymbol(name.parent);
                            return symbol === unknownSymbol ? void 0 : symbol;
                        }
                        const result = resolveEntityName(name, meaning, 
                        /*ignoreErrors*/
                        false, 
                        /* dontResolveAlias */
                        true, getHostSignatureFromJSDoc(name));
                        if (!result && isJSDoc2) {
                            const container = findAncestor(name, or(isClassLike, isInterfaceDeclaration));
                            if (container) {
                                return resolveJSDocMemberName(name, 
                                /*ignoreErrors*/
                                false, getSymbolOfDeclaration(container));
                            }
                        }
                        if (result && isJSDoc2) {
                            const container = getJSDocHost(name);
                            if (container && isEnumMember(container) && container === result.valueDeclaration) {
                                return resolveEntityName(name, meaning, 
                                /*ignoreErrors*/
                                true, 
                                /* dontResolveAlias */
                                true, getSourceFileOfNode(container)) || result;
                            }
                        }
                        return result;
                    }
                    else if (isPrivateIdentifier(name)) {
                        return getSymbolForPrivateIdentifierExpression(name);
                    }
                    else if (name.kind === 208 /* PropertyAccessExpression */ || name.kind === 163 /* QualifiedName */) {
                        const links = getNodeLinks(name);
                        if (links.resolvedSymbol) {
                            return links.resolvedSymbol;
                        }
                        if (name.kind === 208 /* PropertyAccessExpression */) {
                            checkPropertyAccessExpression(name, 0 /* Normal */);
                            if (!links.resolvedSymbol) {
                                const expressionType = checkExpressionCached(name.expression);
                                const infos = getApplicableIndexInfos(expressionType, getLiteralTypeFromPropertyName(name.name));
                                if (infos.length && expressionType.members) {
                                    const resolved = resolveStructuredTypeMembers(expressionType);
                                    const symbol = resolved.members.get("__index" /* Index */);
                                    if (infos === getIndexInfosOfType(expressionType)) {
                                        links.resolvedSymbol = symbol;
                                    }
                                    else if (symbol) {
                                        const symbolLinks2 = getSymbolLinks(symbol);
                                        const declarationList = mapDefined(infos, (i) => i.declaration);
                                        const nodeListId = map(declarationList, getNodeId).join(",");
                                        if (!symbolLinks2.filteredIndexSymbolCache) {
                                            symbolLinks2.filteredIndexSymbolCache = /* @__PURE__ */ new Map();
                                        }
                                        if (symbolLinks2.filteredIndexSymbolCache.has(nodeListId)) {
                                            links.resolvedSymbol = symbolLinks2.filteredIndexSymbolCache.get(nodeListId);
                                        }
                                        else {
                                            const copy = createSymbol(131072 /* Signature */, "__index" /* Index */);
                                            copy.declarations = mapDefined(infos, (i) => i.declaration);
                                            copy.parent = expressionType.aliasSymbol ? expressionType.aliasSymbol : expressionType.symbol ? expressionType.symbol : getSymbolAtLocation(copy.declarations[0].parent);
                                            symbolLinks2.filteredIndexSymbolCache.set(nodeListId, copy);
                                            links.resolvedSymbol = symbolLinks2.filteredIndexSymbolCache.get(nodeListId);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            checkQualifiedName(name, 0 /* Normal */);
                        }
                        if (!links.resolvedSymbol && isJSDoc2 && isQualifiedName(name)) {
                            return resolveJSDocMemberName(name);
                        }
                        return links.resolvedSymbol;
                    }
                    else if (isJSDocMemberName(name)) {
                        return resolveJSDocMemberName(name);
                    }
                }
                else if (isTypeReferenceIdentifier(name)) {
                    const meaning = name.parent.kind === 180 /* TypeReference */ ? 788968 /* Type */ : 1920 /* Namespace */;
                    const symbol = resolveEntityName(name, meaning, 
                    /*ignoreErrors*/
                    false, 
                    /*dontResolveAlias*/
                    true);
                    return symbol && symbol !== unknownSymbol ? symbol : getUnresolvedSymbolForEntityName(name);
                }
                if (name.parent.kind === 179 /* TypePredicate */) {
                    return resolveEntityName(name, 
                    /*meaning*/
                    1 /* FunctionScopedVariable */);
                }
                return void 0;
            }
            function getSymbolAtLocation(node, ignoreErrors) {
                if (isSourceFile(node)) {
                    return isExternalModule(node) ? getMergedSymbol(node.symbol) : void 0;
                }
                const { parent: parent2 } = node;
                const grandParent = parent2.parent;
                if (node.flags & 33554432 /* InWithStatement */) {
                    return void 0;
                }
                if (isDeclarationNameOrImportPropertyName(node)) {
                    const parentSymbol = getSymbolOfDeclaration(parent2);
                    return isImportOrExportSpecifier(node.parent) && node.parent.propertyName === node ? getImmediateAliasedSymbol(parentSymbol) : parentSymbol;
                }
                else if (isLiteralComputedPropertyDeclarationName(node)) {
                    return getSymbolOfDeclaration(parent2.parent);
                }
                if (node.kind === 79 /* Identifier */) {
                    if (isInRightSideOfImportOrExportAssignment(node)) {
                        return getSymbolOfNameOrPropertyAccessExpression(node);
                    }
                    else if (parent2.kind === 205 /* BindingElement */ && grandParent.kind === 203 /* ObjectBindingPattern */ && node === parent2.propertyName) {
                        const typeOfPattern = getTypeOfNode(grandParent);
                        const propertyDeclaration = getPropertyOfType(typeOfPattern, node.escapedText);
                        if (propertyDeclaration) {
                            return propertyDeclaration;
                        }
                    }
                    else if (isMetaProperty(parent2) && parent2.name === node) {
                        if (parent2.keywordToken === 103 /* NewKeyword */ && idText(node) === "target") {
                            return checkNewTargetMetaProperty(parent2).symbol;
                        }
                        if (parent2.keywordToken === 100 /* ImportKeyword */ && idText(node) === "meta") {
                            return getGlobalImportMetaExpressionType().members.get("meta");
                        }
                        return void 0;
                    }
                }
                switch (node.kind) {
                    case 79 /* Identifier */:
                    case 80 /* PrivateIdentifier */:
                    case 208 /* PropertyAccessExpression */:
                    case 163 /* QualifiedName */:
                        if (!isThisInTypeQuery(node)) {
                            return getSymbolOfNameOrPropertyAccessExpression(node);
                        }
                    case 108 /* ThisKeyword */:
                        const container = getThisContainer(node, 
                        /*includeArrowFunctions*/
                        false, 
                        /*includeClassComputedPropertyName*/
                        false);
                        if (isFunctionLike(container)) {
                            const sig = getSignatureFromDeclaration(container);
                            if (sig.thisParameter) {
                                return sig.thisParameter;
                            }
                        }
                        if (isInExpressionContext(node)) {
                            return checkExpression(node).symbol;
                        }
                    case 194 /* ThisType */:
                        return getTypeFromThisTypeNode(node).symbol;
                    case 106 /* SuperKeyword */:
                        return checkExpression(node).symbol;
                    case 135 /* ConstructorKeyword */:
                        const constructorDeclaration = node.parent;
                        if (constructorDeclaration && constructorDeclaration.kind === 173 /* Constructor */) {
                            return constructorDeclaration.parent.symbol;
                        }
                        return void 0;
                    case 10 /* StringLiteral */:
                    case 14 /* NoSubstitutionTemplateLiteral */:
                        if (isExternalModuleImportEqualsDeclaration(node.parent.parent) && getExternalModuleImportEqualsDeclarationExpression(node.parent.parent) === node || (node.parent.kind === 269 /* ImportDeclaration */ || node.parent.kind === 275 /* ExportDeclaration */) && node.parent.moduleSpecifier === node || (isInJSFile(node) && getEmitModuleResolutionKind(compilerOptions) !== 100 /* Bundler */ && isRequireCall(node.parent, 
                        /*checkArgumentIsStringLiteralLike*/
                        false) || isImportCall(node.parent)) || isLiteralTypeNode(node.parent) && isLiteralImportTypeNode(node.parent.parent) && node.parent.parent.argument === node.parent) {
                            return resolveExternalModuleName(node, node, ignoreErrors);
                        }
                        if (isCallExpression(parent2) && isBindableObjectDefinePropertyCall(parent2) && parent2.arguments[1] === node) {
                            return getSymbolOfDeclaration(parent2);
                        }
                    case 8 /* NumericLiteral */:
                        const objectType = isElementAccessExpression(parent2) ? parent2.argumentExpression === node ? getTypeOfExpression(parent2.expression) : void 0 : isLiteralTypeNode(parent2) && isIndexedAccessTypeNode(grandParent) ? getTypeFromTypeNode(grandParent.objectType) : void 0;
                        return objectType && getPropertyOfType(objectType, escapeLeadingUnderscores(node.text));
                    case 88 /* DefaultKeyword */:
                    case 98 /* FunctionKeyword */:
                    case 38 /* EqualsGreaterThanToken */:
                    case 84 /* ClassKeyword */:
                        return getSymbolOfNode(node.parent);
                    case 202 /* ImportType */:
                        return isLiteralImportTypeNode(node) ? getSymbolAtLocation(node.argument.literal, ignoreErrors) : void 0;
                    case 93 /* ExportKeyword */:
                        return isExportAssignment(node.parent) ? Debug.checkDefined(node.parent.symbol) : void 0;
                    case 100 /* ImportKeyword */:
                    case 103 /* NewKeyword */:
                        return isMetaProperty(node.parent) ? checkMetaPropertyKeyword(node.parent).symbol : void 0;
                    case 233 /* MetaProperty */:
                        return checkExpression(node).symbol;
                    default:
                        return void 0;
                }
            }
            function getTypeOfNode(node) {
                if (isSourceFile(node) && !isExternalModule(node)) {
                    return errorType;
                }
                if (node.flags & 33554432 /* InWithStatement */) {
                    return errorType;
                }
                const classDecl = tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node);
                const classType = classDecl && getDeclaredTypeOfClassOrInterface(getSymbolOfDeclaration(classDecl.class));
                if (isPartOfTypeNode(node)) {
                    const typeFromTypeNode = getTypeFromTypeNode(node);
                    return classType ? getTypeWithThisArgument(typeFromTypeNode, classType.thisType) : typeFromTypeNode;
                }
                if (isExpressionNode(node)) {
                    return getRegularTypeOfExpression(node);
                }
                if (classType && !classDecl.isImplements) {
                    const baseType = firstOrUndefined(getBaseTypes(classType));
                    return baseType ? getTypeWithThisArgument(baseType, classType.thisType) : errorType;
                }
                if (isTypeDeclaration(node)) {
                    const symbol = getSymbolOfDeclaration(node);
                    return getDeclaredTypeOfSymbol(symbol);
                }
                if (isTypeDeclarationName(node)) {
                    const symbol = getSymbolAtLocation(node);
                    return symbol ? getDeclaredTypeOfSymbol(symbol) : errorType;
                }
                if (isDeclaration(node)) {
                    const symbol = getSymbolOfDeclaration(node);
                    return symbol ? getTypeOfSymbol(symbol) : errorType;
                }
                if (isDeclarationNameOrImportPropertyName(node)) {
                    const symbol = getSymbolAtLocation(node);
                    if (symbol) {
                        return getTypeOfSymbol(symbol);
                    }
                    return errorType;
                }
                if (isBindingPattern(node)) {
                    return getTypeForVariableLikeDeclaration(node.parent, 
                    /*includeOptionality*/
                    true, 0 /* Normal */) || errorType;
                }
                if (isInRightSideOfImportOrExportAssignment(node)) {
                    const symbol = getSymbolAtLocation(node);
                    if (symbol) {
                        const declaredType = getDeclaredTypeOfSymbol(symbol);
                        return !isErrorType(declaredType) ? declaredType : getTypeOfSymbol(symbol);
                    }
                }
                if (isMetaProperty(node.parent) && node.parent.keywordToken === node.kind) {
                    return checkMetaPropertyKeyword(node.parent);
                }
                return errorType;
            }
            function getTypeReferenceSerializationKind(typeNameIn, location) {
                var _a2;
                const typeName = getParseTreeNode(typeNameIn, isEntityName);
                if (!typeName)
                    return 0 /* Unknown */;
                if (location) {
                    location = getParseTreeNode(location);
                    if (!location)
                        return 0 /* Unknown */;
                }
                let isTypeOnly = false;
                if (isQualifiedName(typeName)) {
                    const rootValueSymbol = resolveEntityName(getFirstIdentifier(typeName), 111551 /* Value */, 
                    /*ignoreErrors*/
                    true, 
                    /*dontResolveAlias*/
                    true, location);
                    isTypeOnly = !!((_a2 = rootValueSymbol == null ? void 0 : rootValueSymbol.declarations) == null ? void 0 : _a2.every(isTypeOnlyImportOrExportDeclaration));
                }
                const valueSymbol = resolveEntityName(typeName, 111551 /* Value */, 
                /*ignoreErrors*/
                true, 
                /*dontResolveAlias*/
                true, location);
                const resolvedSymbol = valueSymbol && valueSymbol.flags & 2097152 /* Alias */ ? resolveAlias(valueSymbol) : valueSymbol;
                isTypeOnly || (isTypeOnly = !!(valueSymbol && getTypeOnlyAliasDeclaration(valueSymbol, 111551 /* Value */)));
                const typeSymbol = resolveEntityName(typeName, 788968 /* Type */, 
                /*ignoreErrors*/
                true, 
                /*dontResolveAlias*/
                false, location);
                if (resolvedSymbol && resolvedSymbol === typeSymbol) {
                    const globalPromiseSymbol = getGlobalPromiseConstructorSymbol(
                    /*reportErrors*/
                    false);
                    if (globalPromiseSymbol && resolvedSymbol === globalPromiseSymbol) {
                        return 9 /* Promise */;
                    }
                    const constructorType = getTypeOfSymbol(resolvedSymbol);
                    if (constructorType && isConstructorType(constructorType)) {
                        return isTypeOnly ? 10 /* TypeWithCallSignature */ : 1 /* TypeWithConstructSignatureAndValue */;
                    }
                }
                if (!typeSymbol) {
                    return isTypeOnly ? 11 /* ObjectType */ : 0 /* Unknown */;
                }
                const type = getDeclaredTypeOfSymbol(typeSymbol);
                if (isErrorType(type)) {
                    return isTypeOnly ? 11 /* ObjectType */ : 0 /* Unknown */;
                }
                else if (type.flags & 3 /* AnyOrUnknown */) {
                    return 11 /* ObjectType */;
                }
                else if (isTypeAssignableToKind(type, 16384 /* Void */ | 98304 /* Nullable */ | 131072 /* Never */)) {
                    return 2 /* VoidNullableOrNeverType */;
                }
                else if (isTypeAssignableToKind(type, 528 /* BooleanLike */)) {
                    return 6 /* BooleanType */;
                }
                else if (isTypeAssignableToKind(type, 296 /* NumberLike */)) {
                    return 3 /* NumberLikeType */;
                }
                else if (isTypeAssignableToKind(type, 2112 /* BigIntLike */)) {
                    return 4 /* BigIntLikeType */;
                }
                else if (isTypeAssignableToKind(type, 402653316 /* StringLike */)) {
                    return 5 /* StringLikeType */;
                }
                else if (isTupleType(type)) {
                    return 7 /* ArrayLikeType */;
                }
                else if (isTypeAssignableToKind(type, 12288 /* ESSymbolLike */)) {
                    return 8 /* ESSymbolType */;
                }
                else if (isFunctionType(type)) {
                    return 10 /* TypeWithCallSignature */;
                }
                else if (isArrayType(type)) {
                    return 7 /* ArrayLikeType */;
                }
                else {
                    return 11 /* ObjectType */;
                }
            }
            function initializeTypeChecker() {
                for (const file of host.getSourceFiles()) {
                    bindSourceFile(file, compilerOptions);
                }
                amalgamatedDuplicates = /* @__PURE__ */ new Map();
                let augmentations;
                for (const file of host.getSourceFiles()) {
                    if (file.redirectInfo) {
                        continue;
                    }
                    if (!isExternalOrCommonJsModule(file)) {
                        const fileGlobalThisSymbol = file.locals.get("globalThis");
                        if (fileGlobalThisSymbol == null ? void 0 : fileGlobalThisSymbol.declarations) {
                            for (const declaration of fileGlobalThisSymbol.declarations) {
                                diagnostics.add(createDiagnosticForNode(declaration, Diagnostics.Declaration_name_conflicts_with_built_in_global_identifier_0, "globalThis"));
                            }
                        }
                        mergeSymbolTable(globals, file.locals);
                    }
                    if (file.jsGlobalAugmentations) {
                        mergeSymbolTable(globals, file.jsGlobalAugmentations);
                    }
                    if (file.patternAmbientModules && file.patternAmbientModules.length) {
                        patternAmbientModules = concatenate(patternAmbientModules, file.patternAmbientModules);
                    }
                    if (file.moduleAugmentations.length) {
                        (augmentations || (augmentations = [])).push(file.moduleAugmentations);
                    }
                    if (file.symbol && file.symbol.globalExports) {
                        const source = file.symbol.globalExports;
                        source.forEach((sourceSymbol, id) => {
                            if (!globals.has(id)) {
                                globals.set(id, sourceSymbol);
                            }
                        });
                    }
                }
                if (augmentations) {
                    for (const list of augmentations) {
                        for (const augmentation of list) {
                            if (!isGlobalScopeAugmentation(augmentation.parent))
                                continue;
                            mergeModuleAugmentation(augmentation);
                        }
                    }
                }
                addToSymbolTable(globals, builtinGlobals, Diagnostics.Declaration_name_conflicts_with_built_in_global_identifier_0);
                getSymbolLinks(undefinedSymbol).type = undefinedWideningType;
                getSymbolLinks(argumentsSymbol).type = getGlobalType("IArguments", 
                /*arity*/
                0, 
                /*reportErrors*/
                true);
                getSymbolLinks(unknownSymbol).type = errorType;
                getSymbolLinks(globalThisSymbol).type = createObjectType(16 /* Anonymous */, globalThisSymbol);
                globalArrayType = getGlobalType("Array", 
                /*arity*/
                1, 
                /*reportErrors*/
                true);
                globalObjectType = getGlobalType("Object", 
                /*arity*/
                0, 
                /*reportErrors*/
                true);
                globalFunctionType = getGlobalType("Function", 
                /*arity*/
                0, 
                /*reportErrors*/
                true);
                globalCallableFunctionType = strictBindCallApply && getGlobalType("CallableFunction", 
                /*arity*/
                0, 
                /*reportErrors*/
                true) || globalFunctionType;
                globalNewableFunctionType = strictBindCallApply && getGlobalType("NewableFunction", 
                /*arity*/
                0, 
                /*reportErrors*/
                true) || globalFunctionType;
                globalStringType = getGlobalType("String", 
                /*arity*/
                0, 
                /*reportErrors*/
                true);
                globalNumberType = getGlobalType("Number", 
                /*arity*/
                0, 
                /*reportErrors*/
                true);
                globalBooleanType = getGlobalType("Boolean", 
                /*arity*/
                0, 
                /*reportErrors*/
                true);
                globalRegExpType = getGlobalType("RegExp", 
                /*arity*/
                0, 
                /*reportErrors*/
                true);
                anyArrayType = createArrayType(anyType);
                autoArrayType = createArrayType(autoType);
                if (autoArrayType === emptyObjectType) {
                    autoArrayType = createAnonymousType(void 0, emptySymbols, emptyArray, emptyArray, emptyArray);
                }
                globalReadonlyArrayType = getGlobalTypeOrUndefined("ReadonlyArray", 
                /*arity*/
                1) || globalArrayType;
                anyReadonlyArrayType = globalReadonlyArrayType ? createTypeFromGenericGlobalType(globalReadonlyArrayType, [anyType]) : anyArrayType;
                globalThisType = getGlobalTypeOrUndefined("ThisType", 
                /*arity*/
                1);
                if (augmentations) {
                    for (const list of augmentations) {
                        for (const augmentation of list) {
                            if (isGlobalScopeAugmentation(augmentation.parent))
                                continue;
                            mergeModuleAugmentation(augmentation);
                        }
                    }
                }
                amalgamatedDuplicates.forEach(({ firstFile, secondFile, conflictingSymbols }) => {
                    if (conflictingSymbols.size < 8) {
                        conflictingSymbols.forEach(({ isBlockScoped, firstFileLocations, secondFileLocations }, symbolName2) => {
                            const message = isBlockScoped ? Diagnostics.Cannot_redeclare_block_scoped_variable_0 : Diagnostics.Duplicate_identifier_0;
                            for (const node of firstFileLocations) {
                                addDuplicateDeclarationError(node, message, symbolName2, secondFileLocations);
                            }
                            for (const node of secondFileLocations) {
                                addDuplicateDeclarationError(node, message, symbolName2, firstFileLocations);
                            }
                        });
                    }
                    else {
                        const list = arrayFrom(conflictingSymbols.keys()).join(", ");
                        diagnostics.add(addRelatedInfo(createDiagnosticForNode(firstFile, Diagnostics.Definitions_of_the_following_identifiers_conflict_with_those_in_another_file_Colon_0, list), createDiagnosticForNode(secondFile, Diagnostics.Conflicts_are_in_this_file)));
                        diagnostics.add(addRelatedInfo(createDiagnosticForNode(secondFile, Diagnostics.Definitions_of_the_following_identifiers_conflict_with_those_in_another_file_Colon_0, list), createDiagnosticForNode(firstFile, Diagnostics.Conflicts_are_in_this_file)));
                    }
                });
                amalgamatedDuplicates = void 0;
            }
            function getHelperNames(helper) {
                switch (helper) {
                    case 1 /* Extends */:
                        return ["__extends"];
                    case 2 /* Assign */:
                        return ["__assign"];
                    case 4 /* Rest */:
                        return ["__rest"];
                    case 8 /* Decorate */:
                        return legacyDecorators ? ["__decorate"] : ["__esDecorate", "__runInitializers"];
                    case 16 /* Metadata */:
                        return ["__metadata"];
                    case 32 /* Param */:
                        return ["__param"];
                    case 64 /* Awaiter */:
                        return ["__awaiter"];
                    case 128 /* Generator */:
                        return ["__generator"];
                    case 256 /* Values */:
                        return ["__values"];
                    case 512 /* Read */:
                        return ["__read"];
                    case 1024 /* SpreadArray */:
                        return ["__spreadArray"];
                    case 2048 /* Await */:
                        return ["__await"];
                    case 4096 /* AsyncGenerator */:
                        return ["__asyncGenerator"];
                    case 8192 /* AsyncDelegator */:
                        return ["__asyncDelegator"];
                    case 16384 /* AsyncValues */:
                        return ["__asyncValues"];
                    case 32768 /* ExportStar */:
                        return ["__exportStar"];
                    case 65536 /* ImportStar */:
                        return ["__importStar"];
                    case 131072 /* ImportDefault */:
                        return ["__importDefault"];
                    case 262144 /* MakeTemplateObject */:
                        return ["__makeTemplateObject"];
                    case 524288 /* ClassPrivateFieldGet */:
                        return ["__classPrivateFieldGet"];
                    case 1048576 /* ClassPrivateFieldSet */:
                        return ["__classPrivateFieldSet"];
                    case 2097152 /* ClassPrivateFieldIn */:
                        return ["__classPrivateFieldIn"];
                    case 4194304 /* CreateBinding */:
                        return ["__createBinding"];
                    case 8388608 /* SetFunctionName */:
                        return ["__setFunctionName"];
                    case 16777216 /* PropKey */:
                        return ["__propKey"];
                    default:
                        return Debug.fail("Unrecognized helper");
                }
            }
            function checkGrammarModifiers(node) {
                const quickResult = reportObviousDecoratorErrors(node) || reportObviousModifierErrors(node);
                if (quickResult !== void 0) {
                    return quickResult;
                }
                if (isParameter(node) && parameterIsThisKeyword(node)) {
                    return grammarErrorOnFirstToken(node, Diagnostics.Neither_decorators_nor_modifiers_may_be_applied_to_this_parameters);
                }
                let lastStatic, lastDeclare, lastAsync, lastOverride, firstDecorator;
                let flags = 0 /* None */;
                let sawExportBeforeDecorators = false;
                let hasLeadingDecorators = false;
                for (const modifier of node.modifiers) {
                    if (isDecorator(modifier)) {
                        if (!nodeCanBeDecorated(legacyDecorators, node, node.parent, node.parent.parent)) {
                            if (node.kind === 171 /* MethodDeclaration */ && !nodeIsPresent(node.body)) {
                                return grammarErrorOnFirstToken(node, Diagnostics.A_decorator_can_only_decorate_a_method_implementation_not_an_overload);
                            }
                            else {
                                return grammarErrorOnFirstToken(node, Diagnostics.Decorators_are_not_valid_here);
                            }
                        }
                        else if (legacyDecorators && (node.kind === 174 /* GetAccessor */ || node.kind === 175 /* SetAccessor */)) {
                            const accessors = getAllAccessorDeclarations(node.parent.members, node);
                            if (hasDecorators(accessors.firstAccessor) && node === accessors.secondAccessor) {
                                return grammarErrorOnFirstToken(node, Diagnostics.Decorators_cannot_be_applied_to_multiple_get_Slashset_accessors_of_the_same_name);
                            }
                        }
                        if (flags & ~(1025 /* ExportDefault */ | 131072 /* Decorator */)) {
                            return grammarErrorOnNode(modifier, Diagnostics.Decorators_are_not_valid_here);
                        }
                        if (hasLeadingDecorators && flags & 126975 /* Modifier */) {
                            Debug.assertIsDefined(firstDecorator);
                            const sourceFile = getSourceFileOfNode(modifier);
                            if (!hasParseDiagnostics(sourceFile)) {
                                addRelatedInfo(error(modifier, Diagnostics.Decorators_may_not_appear_after_export_or_export_default_if_they_also_appear_before_export), createDiagnosticForNode(firstDecorator, Diagnostics.Decorator_used_before_export_here));
                                return true;
                            }
                            return false;
                        }
                        flags |= 131072 /* Decorator */;
                        if (!(flags & 126975 /* Modifier */)) {
                            hasLeadingDecorators = true;
                        }
                        else if (flags & 1 /* Export */) {
                            sawExportBeforeDecorators = true;
                        }
                        firstDecorator != null ? firstDecorator : firstDecorator = modifier;
                    }
                    else {
                        if (modifier.kind !== 146 /* ReadonlyKeyword */) {
                            if (node.kind === 168 /* PropertySignature */ || node.kind === 170 /* MethodSignature */) {
                                return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_type_member, tokenToString(modifier.kind));
                            }
                            if (node.kind === 178 /* IndexSignature */ && (modifier.kind !== 124 /* StaticKeyword */ || !isClassLike(node.parent))) {
                                return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_an_index_signature, tokenToString(modifier.kind));
                            }
                        }
                        if (modifier.kind !== 101 /* InKeyword */ && modifier.kind !== 145 /* OutKeyword */ && modifier.kind !== 85 /* ConstKeyword */) {
                            if (node.kind === 165 /* TypeParameter */) {
                                return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_type_parameter, tokenToString(modifier.kind));
                            }
                        }
                        switch (modifier.kind) {
                            case 85 /* ConstKeyword */:
                                if (node.kind !== 263 /* EnumDeclaration */ && node.kind !== 165 /* TypeParameter */) {
                                    return grammarErrorOnNode(node, Diagnostics.A_class_member_cannot_have_the_0_keyword, tokenToString(85 /* ConstKeyword */));
                                }
                                const parent2 = node.parent;
                                if (node.kind === 165 /* TypeParameter */ && !(isFunctionLikeDeclaration(parent2) || isClassLike(parent2) || isFunctionTypeNode(parent2) || isConstructorTypeNode(parent2) || isCallSignatureDeclaration(parent2) || isConstructSignatureDeclaration(parent2) || isMethodSignature(parent2))) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_can_only_appear_on_a_type_parameter_of_a_function_method_or_class, tokenToString(modifier.kind));
                                }
                                break;
                            case 161 /* OverrideKeyword */:
                                if (flags & 16384 /* Override */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "override");
                                }
                                else if (flags & 2 /* Ambient */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "override", "declare");
                                }
                                else if (flags & 64 /* Readonly */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "override", "readonly");
                                }
                                else if (flags & 128 /* Accessor */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "override", "accessor");
                                }
                                else if (flags & 512 /* Async */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "override", "async");
                                }
                                flags |= 16384 /* Override */;
                                lastOverride = modifier;
                                break;
                            case 123 /* PublicKeyword */:
                            case 122 /* ProtectedKeyword */:
                            case 121 /* PrivateKeyword */:
                                const text = visibilityToString(modifierToFlag(modifier.kind));
                                if (flags & 28 /* AccessibilityModifier */) {
                                    return grammarErrorOnNode(modifier, Diagnostics.Accessibility_modifier_already_seen);
                                }
                                else if (flags & 16384 /* Override */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "override");
                                }
                                else if (flags & 32 /* Static */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "static");
                                }
                                else if (flags & 128 /* Accessor */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "accessor");
                                }
                                else if (flags & 64 /* Readonly */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "readonly");
                                }
                                else if (flags & 512 /* Async */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "async");
                                }
                                else if (node.parent.kind === 265 /* ModuleBlock */ || node.parent.kind === 308 /* SourceFile */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_module_or_namespace_element, text);
                                }
                                else if (flags & 256 /* Abstract */) {
                                    if (modifier.kind === 121 /* PrivateKeyword */) {
                                        return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, text, "abstract");
                                    }
                                    else {
                                        return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "abstract");
                                    }
                                }
                                else if (isPrivateIdentifierClassElementDeclaration(node)) {
                                    return grammarErrorOnNode(modifier, Diagnostics.An_accessibility_modifier_cannot_be_used_with_a_private_identifier);
                                }
                                flags |= modifierToFlag(modifier.kind);
                                break;
                            case 124 /* StaticKeyword */:
                                if (flags & 32 /* Static */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "static");
                                }
                                else if (flags & 64 /* Readonly */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "static", "readonly");
                                }
                                else if (flags & 512 /* Async */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "static", "async");
                                }
                                else if (flags & 128 /* Accessor */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "static", "accessor");
                                }
                                else if (node.parent.kind === 265 /* ModuleBlock */ || node.parent.kind === 308 /* SourceFile */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_module_or_namespace_element, "static");
                                }
                                else if (node.kind === 166 /* Parameter */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "static");
                                }
                                else if (flags & 256 /* Abstract */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "static", "abstract");
                                }
                                else if (flags & 16384 /* Override */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "static", "override");
                                }
                                flags |= 32 /* Static */;
                                lastStatic = modifier;
                                break;
                            case 127 /* AccessorKeyword */:
                                if (flags & 128 /* Accessor */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "accessor");
                                }
                                else if (flags & 64 /* Readonly */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "accessor", "readonly");
                                }
                                else if (flags & 2 /* Ambient */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "accessor", "declare");
                                }
                                else if (node.kind !== 169 /* PropertyDeclaration */) {
                                    return grammarErrorOnNode(modifier, Diagnostics.accessor_modifier_can_only_appear_on_a_property_declaration);
                                }
                                flags |= 128 /* Accessor */;
                                break;
                            case 146 /* ReadonlyKeyword */:
                                if (flags & 64 /* Readonly */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "readonly");
                                }
                                else if (node.kind !== 169 /* PropertyDeclaration */ && node.kind !== 168 /* PropertySignature */ && node.kind !== 178 /* IndexSignature */ && node.kind !== 166 /* Parameter */) {
                                    return grammarErrorOnNode(modifier, Diagnostics.readonly_modifier_can_only_appear_on_a_property_declaration_or_index_signature);
                                }
                                else if (flags & 128 /* Accessor */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "readonly", "accessor");
                                }
                                flags |= 64 /* Readonly */;
                                break;
                            case 93 /* ExportKeyword */:
                                if (compilerOptions.verbatimModuleSyntax && !(node.flags & 16777216 /* Ambient */) && node.kind !== 262 /* TypeAliasDeclaration */ && node.kind !== 261 /* InterfaceDeclaration */ && // ModuleDeclaration needs to be checked that it is uninstantiated later
                                    node.kind !== 264 /* ModuleDeclaration */ && node.parent.kind === 308 /* SourceFile */ && (moduleKind === 1 /* CommonJS */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */)) {
                                    return grammarErrorOnNode(modifier, Diagnostics.A_top_level_export_modifier_cannot_be_used_on_value_declarations_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled);
                                }
                                if (flags & 1 /* Export */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "export");
                                }
                                else if (flags & 2 /* Ambient */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "export", "declare");
                                }
                                else if (flags & 256 /* Abstract */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "export", "abstract");
                                }
                                else if (flags & 512 /* Async */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "export", "async");
                                }
                                else if (isClassLike(node.parent)) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_class_elements_of_this_kind, "export");
                                }
                                else if (node.kind === 166 /* Parameter */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "export");
                                }
                                flags |= 1 /* Export */;
                                break;
                            case 88 /* DefaultKeyword */:
                                const container = node.parent.kind === 308 /* SourceFile */ ? node.parent : node.parent.parent;
                                if (container.kind === 264 /* ModuleDeclaration */ && !isAmbientModule(container)) {
                                    return grammarErrorOnNode(modifier, Diagnostics.A_default_export_can_only_be_used_in_an_ECMAScript_style_module);
                                }
                                else if (!(flags & 1 /* Export */)) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "export", "default");
                                }
                                else if (sawExportBeforeDecorators) {
                                    return grammarErrorOnNode(firstDecorator, Diagnostics.Decorators_are_not_valid_here);
                                }
                                flags |= 1024 /* Default */;
                                break;
                            case 136 /* DeclareKeyword */:
                                if (flags & 2 /* Ambient */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "declare");
                                }
                                else if (flags & 512 /* Async */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_in_an_ambient_context, "async");
                                }
                                else if (flags & 16384 /* Override */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_in_an_ambient_context, "override");
                                }
                                else if (isClassLike(node.parent) && !isPropertyDeclaration(node)) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_class_elements_of_this_kind, "declare");
                                }
                                else if (node.kind === 166 /* Parameter */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "declare");
                                }
                                else if (node.parent.flags & 16777216 /* Ambient */ && node.parent.kind === 265 /* ModuleBlock */) {
                                    return grammarErrorOnNode(modifier, Diagnostics.A_declare_modifier_cannot_be_used_in_an_already_ambient_context);
                                }
                                else if (isPrivateIdentifierClassElementDeclaration(node)) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_a_private_identifier, "declare");
                                }
                                else if (flags & 128 /* Accessor */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "declare", "accessor");
                                }
                                flags |= 2 /* Ambient */;
                                lastDeclare = modifier;
                                break;
                            case 126 /* AbstractKeyword */:
                                if (flags & 256 /* Abstract */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "abstract");
                                }
                                if (node.kind !== 260 /* ClassDeclaration */ && node.kind !== 182 /* ConstructorType */) {
                                    if (node.kind !== 171 /* MethodDeclaration */ && node.kind !== 169 /* PropertyDeclaration */ && node.kind !== 174 /* GetAccessor */ && node.kind !== 175 /* SetAccessor */) {
                                        return grammarErrorOnNode(modifier, Diagnostics.abstract_modifier_can_only_appear_on_a_class_method_or_property_declaration);
                                    }
                                    if (!(node.parent.kind === 260 /* ClassDeclaration */ && hasSyntacticModifier(node.parent, 256 /* Abstract */))) {
                                        return grammarErrorOnNode(modifier, Diagnostics.Abstract_methods_can_only_appear_within_an_abstract_class);
                                    }
                                    if (flags & 32 /* Static */) {
                                        return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "static", "abstract");
                                    }
                                    if (flags & 8 /* Private */) {
                                        return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "private", "abstract");
                                    }
                                    if (flags & 512 /* Async */ && lastAsync) {
                                        return grammarErrorOnNode(lastAsync, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "async", "abstract");
                                    }
                                    if (flags & 16384 /* Override */) {
                                        return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "abstract", "override");
                                    }
                                    if (flags & 128 /* Accessor */) {
                                        return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "abstract", "accessor");
                                    }
                                }
                                if (isNamedDeclaration(node) && node.name.kind === 80 /* PrivateIdentifier */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_a_private_identifier, "abstract");
                                }
                                flags |= 256 /* Abstract */;
                                break;
                            case 132 /* AsyncKeyword */:
                                if (flags & 512 /* Async */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "async");
                                }
                                else if (flags & 2 /* Ambient */ || node.parent.flags & 16777216 /* Ambient */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_in_an_ambient_context, "async");
                                }
                                else if (node.kind === 166 /* Parameter */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "async");
                                }
                                if (flags & 256 /* Abstract */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "async", "abstract");
                                }
                                flags |= 512 /* Async */;
                                lastAsync = modifier;
                                break;
                            case 101 /* InKeyword */:
                            case 145 /* OutKeyword */:
                                const inOutFlag = modifier.kind === 101 /* InKeyword */ ? 32768 /* In */ : 65536 /* Out */;
                                const inOutText = modifier.kind === 101 /* InKeyword */ ? "in" : "out";
                                if (node.kind !== 165 /* TypeParameter */ || !(isInterfaceDeclaration(node.parent) || isClassLike(node.parent) || isTypeAliasDeclaration(node.parent))) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_can_only_appear_on_a_type_parameter_of_a_class_interface_or_type_alias, inOutText);
                                }
                                if (flags & inOutFlag) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, inOutText);
                                }
                                if (inOutFlag & 32768 /* In */ && flags & 65536 /* Out */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "in", "out");
                                }
                                flags |= inOutFlag;
                                break;
                        }
                    }
                }
                if (node.kind === 173 /* Constructor */) {
                    if (flags & 32 /* Static */) {
                        return grammarErrorOnNode(lastStatic, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "static");
                    }
                    if (flags & 16384 /* Override */) {
                        return grammarErrorOnNode(lastOverride, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "override");
                    }
                    if (flags & 512 /* Async */) {
                        return grammarErrorOnNode(lastAsync, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "async");
                    }
                    return false;
                }
                else if ((node.kind === 269 /* ImportDeclaration */ || node.kind === 268 /* ImportEqualsDeclaration */) && flags & 2 /* Ambient */) {
                    return grammarErrorOnNode(lastDeclare, Diagnostics.A_0_modifier_cannot_be_used_with_an_import_declaration, "declare");
                }
                else if (node.kind === 166 /* Parameter */ && flags & 16476 /* ParameterPropertyModifier */ && isBindingPattern(node.name)) {
                    return grammarErrorOnNode(node, Diagnostics.A_parameter_property_may_not_be_declared_using_a_binding_pattern);
                }
                else if (node.kind === 166 /* Parameter */ && flags & 16476 /* ParameterPropertyModifier */ && node.dotDotDotToken) {
                    return grammarErrorOnNode(node, Diagnostics.A_parameter_property_cannot_be_declared_using_a_rest_parameter);
                }
                if (flags & 512 /* Async */) {
                    return checkGrammarAsyncModifier(node, lastAsync);
                }
                return false;
            }
            function findFirstIllegalModifier(node) {
                switch (node.kind) {
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 173 /* Constructor */:
                    case 169 /* PropertyDeclaration */:
                    case 168 /* PropertySignature */:
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                    case 178 /* IndexSignature */:
                    case 264 /* ModuleDeclaration */:
                    case 269 /* ImportDeclaration */:
                    case 268 /* ImportEqualsDeclaration */:
                    case 275 /* ExportDeclaration */:
                    case 274 /* ExportAssignment */:
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                    case 166 /* Parameter */:
                    case 165 /* TypeParameter */:
                        return void 0;
                    case 172 /* ClassStaticBlockDeclaration */:
                    case 299 /* PropertyAssignment */:
                    case 300 /* ShorthandPropertyAssignment */:
                    case 267 /* NamespaceExportDeclaration */:
                    case 279 /* MissingDeclaration */:
                        return find(node.modifiers, isModifier);
                    default:
                        if (node.parent.kind === 265 /* ModuleBlock */ || node.parent.kind === 308 /* SourceFile */) {
                            return void 0;
                        }
                        switch (node.kind) {
                            case 259 /* FunctionDeclaration */:
                                return findFirstModifierExcept(node, 132 /* AsyncKeyword */);
                            case 260 /* ClassDeclaration */:
                            case 182 /* ConstructorType */:
                                return findFirstModifierExcept(node, 126 /* AbstractKeyword */);
                            case 228 /* ClassExpression */:
                            case 261 /* InterfaceDeclaration */:
                            case 240 /* VariableStatement */:
                            case 262 /* TypeAliasDeclaration */:
                                return find(node.modifiers, isModifier);
                            case 263 /* EnumDeclaration */:
                                return findFirstModifierExcept(node, 85 /* ConstKeyword */);
                            default:
                                Debug.assertNever(node);
                        }
                }
            }
            function checkGrammarObjectLiteralExpression(node, inDestructuring) {
                const seen = /* @__PURE__ */ new Map();
                for (const prop of node.properties) {
                    if (prop.kind === 301 /* SpreadAssignment */) {
                        if (inDestructuring) {
                            const expression = skipParentheses(prop.expression);
                            if (isArrayLiteralExpression(expression) || isObjectLiteralExpression(expression)) {
                                return grammarErrorOnNode(prop.expression, Diagnostics.A_rest_element_cannot_contain_a_binding_pattern);
                            }
                        }
                        continue;
                    }
                    const name = prop.name;
                    if (name.kind === 164 /* ComputedPropertyName */) {
                        checkGrammarComputedPropertyName(name);
                    }
                    if (prop.kind === 300 /* ShorthandPropertyAssignment */ && !inDestructuring && prop.objectAssignmentInitializer) {
                        grammarErrorOnNode(prop.equalsToken, Diagnostics.Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_part_of_a_destructuring_pattern);
                    }
                    if (name.kind === 80 /* PrivateIdentifier */) {
                        grammarErrorOnNode(name, Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies);
                    }
                    if (canHaveModifiers(prop) && prop.modifiers) {
                        for (const mod of prop.modifiers) {
                            if (isModifier(mod) && (mod.kind !== 132 /* AsyncKeyword */ || prop.kind !== 171 /* MethodDeclaration */)) {
                                grammarErrorOnNode(mod, Diagnostics._0_modifier_cannot_be_used_here, getTextOfNode(mod));
                            }
                        }
                    }
                    else if (canHaveIllegalModifiers(prop) && prop.modifiers) {
                        for (const mod of prop.modifiers) {
                            if (isModifier(mod)) {
                                grammarErrorOnNode(mod, Diagnostics._0_modifier_cannot_be_used_here, getTextOfNode(mod));
                            }
                        }
                    }
                    let currentKind;
                    switch (prop.kind) {
                        case 300 /* ShorthandPropertyAssignment */:
                        case 299 /* PropertyAssignment */:
                            checkGrammarForInvalidExclamationToken(prop.exclamationToken, Diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context);
                            checkGrammarForInvalidQuestionMark(prop.questionToken, Diagnostics.An_object_member_cannot_be_declared_optional);
                            if (name.kind === 8 /* NumericLiteral */) {
                                checkGrammarNumericLiteral(name);
                            }
                            currentKind = 4 /* PropertyAssignment */;
                            break;
                        case 171 /* MethodDeclaration */:
                            currentKind = 8 /* Method */;
                            break;
                        case 174 /* GetAccessor */:
                            currentKind = 1 /* GetAccessor */;
                            break;
                        case 175 /* SetAccessor */:
                            currentKind = 2 /* SetAccessor */;
                            break;
                        default:
                            throw Debug.assertNever(prop, "Unexpected syntax kind:" + prop.kind);
                    }
                    if (!inDestructuring) {
                        const effectiveName = getPropertyNameForPropertyNameNode(name);
                        if (effectiveName === void 0) {
                            continue;
                        }
                        const existingKind = seen.get(effectiveName);
                        if (!existingKind) {
                            seen.set(effectiveName, currentKind);
                        }
                        else {
                            if (currentKind & 8 /* Method */ && existingKind & 8 /* Method */) {
                                grammarErrorOnNode(name, Diagnostics.Duplicate_identifier_0, getTextOfNode(name));
                            }
                            else if (currentKind & 4 /* PropertyAssignment */ && existingKind & 4 /* PropertyAssignment */) {
                                grammarErrorOnNode(name, Diagnostics.An_object_literal_cannot_have_multiple_properties_with_the_same_name, getTextOfNode(name));
                            }
                            else if (currentKind & 3 /* GetOrSetAccessor */ && existingKind & 3 /* GetOrSetAccessor */) {
                                if (existingKind !== 3 /* GetOrSetAccessor */ && currentKind !== existingKind) {
                                    seen.set(effectiveName, currentKind | existingKind);
                                }
                                else {
                                    return grammarErrorOnNode(name, Diagnostics.An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name);
                                }
                            }
                            else {
                                return grammarErrorOnNode(name, Diagnostics.An_object_literal_cannot_have_property_and_accessor_with_the_same_name);
                            }
                        }
                    }
                }
            }
            function checkGrammarForInOrForOfStatement(forInOrOfStatement) {
                if (checkGrammarStatementInAmbientContext(forInOrOfStatement)) {
                    return true;
                }
                if (forInOrOfStatement.kind === 247 /* ForOfStatement */ && forInOrOfStatement.awaitModifier) {
                    if (!(forInOrOfStatement.flags & 32768 /* AwaitContext */)) {
                        const sourceFile = getSourceFileOfNode(forInOrOfStatement);
                        if (isInTopLevelContext(forInOrOfStatement)) {
                            if (!hasParseDiagnostics(sourceFile)) {
                                if (!isEffectiveExternalModule(sourceFile, compilerOptions)) {
                                    diagnostics.add(createDiagnosticForNode(forInOrOfStatement.awaitModifier, Diagnostics.for_await_loops_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module));
                                }
                                switch (moduleKind) {
                                    case 100 /* Node16 */:
                                    case 199 /* NodeNext */:
                                        if (sourceFile.impliedNodeFormat === 1 /* CommonJS */) {
                                            diagnostics.add(createDiagnosticForNode(forInOrOfStatement.awaitModifier, Diagnostics.The_current_file_is_a_CommonJS_module_and_cannot_use_await_at_the_top_level));
                                            break;
                                        }
                                    case 7 /* ES2022 */:
                                    case 99 /* ESNext */:
                                    case 4 /* System */:
                                        if (languageVersion >= 4 /* ES2017 */) {
                                            break;
                                        }
                                    default:
                                        diagnostics.add(createDiagnosticForNode(forInOrOfStatement.awaitModifier, Diagnostics.Top_level_for_await_loops_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_node16_or_nodenext_and_the_target_option_is_set_to_es2017_or_higher));
                                        break;
                                }
                            }
                        }
                        else {
                            if (!hasParseDiagnostics(sourceFile)) {
                                const diagnostic = createDiagnosticForNode(forInOrOfStatement.awaitModifier, Diagnostics.for_await_loops_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules);
                                const func = getContainingFunction(forInOrOfStatement);
                                if (func && func.kind !== 173 /* Constructor */) {
                                    Debug.assert((getFunctionFlags(func) & 2 /* Async */) === 0, "Enclosing function should never be an async function.");
                                    const relatedInfo = createDiagnosticForNode(func, Diagnostics.Did_you_mean_to_mark_this_function_as_async);
                                    addRelatedInfo(diagnostic, relatedInfo);
                                }
                                diagnostics.add(diagnostic);
                                return true;
                            }
                        }
                        return false;
                    }
                }
                if (isForOfStatement(forInOrOfStatement) && !(forInOrOfStatement.flags & 32768 /* AwaitContext */) && isIdentifier(forInOrOfStatement.initializer) && forInOrOfStatement.initializer.escapedText === "async") {
                    grammarErrorOnNode(forInOrOfStatement.initializer, Diagnostics.The_left_hand_side_of_a_for_of_statement_may_not_be_async);
                    return false;
                }
                if (forInOrOfStatement.initializer.kind === 258 /* VariableDeclarationList */) {
                    const variableList = forInOrOfStatement.initializer;
                    if (!checkGrammarVariableDeclarationList(variableList)) {
                        const declarations = variableList.declarations;
                        if (!declarations.length) {
                            return false;
                        }
                        if (declarations.length > 1) {
                            const diagnostic = forInOrOfStatement.kind === 246 /* ForInStatement */ ? Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement : Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement;
                            return grammarErrorOnFirstToken(variableList.declarations[1], diagnostic);
                        }
                        const firstDeclaration = declarations[0];
                        if (firstDeclaration.initializer) {
                            const diagnostic = forInOrOfStatement.kind === 246 /* ForInStatement */ ? Diagnostics.The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer : Diagnostics.The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer;
                            return grammarErrorOnNode(firstDeclaration.name, diagnostic);
                        }
                        if (firstDeclaration.type) {
                            const diagnostic = forInOrOfStatement.kind === 246 /* ForInStatement */ ? Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation : Diagnostics.The_left_hand_side_of_a_for_of_statement_cannot_use_a_type_annotation;
                            return grammarErrorOnNode(firstDeclaration, diagnostic);
                        }
                    }
                }
                return false;
            }
            function checkGrammarAccessor(accessor) {
                if (!(accessor.flags & 16777216 /* Ambient */) && accessor.parent.kind !== 184 /* TypeLiteral */ && accessor.parent.kind !== 261 /* InterfaceDeclaration */) {
                    if (languageVersion < 1 /* ES5 */) {
                        return grammarErrorOnNode(accessor.name, Diagnostics.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher);
                    }
                    if (languageVersion < 2 /* ES2015 */ && isPrivateIdentifier(accessor.name)) {
                        return grammarErrorOnNode(accessor.name, Diagnostics.Private_identifiers_are_only_available_when_targeting_ECMAScript_2015_and_higher);
                    }
                    if (accessor.body === void 0 && !hasSyntacticModifier(accessor, 256 /* Abstract */)) {
                        return grammarErrorAtPos(accessor, accessor.end - 1, ";".length, Diagnostics._0_expected, "{");
                    }
                }
                if (accessor.body) {
                    if (hasSyntacticModifier(accessor, 256 /* Abstract */)) {
                        return grammarErrorOnNode(accessor, Diagnostics.An_abstract_accessor_cannot_have_an_implementation);
                    }
                    if (accessor.parent.kind === 184 /* TypeLiteral */ || accessor.parent.kind === 261 /* InterfaceDeclaration */) {
                        return grammarErrorOnNode(accessor.body, Diagnostics.An_implementation_cannot_be_declared_in_ambient_contexts);
                    }
                }
                if (accessor.typeParameters) {
                    return grammarErrorOnNode(accessor.name, Diagnostics.An_accessor_cannot_have_type_parameters);
                }
                if (!doesAccessorHaveCorrectParameterCount(accessor)) {
                    return grammarErrorOnNode(accessor.name, accessor.kind === 174 /* GetAccessor */ ? Diagnostics.A_get_accessor_cannot_have_parameters : Diagnostics.A_set_accessor_must_have_exactly_one_parameter);
                }
                if (accessor.kind === 175 /* SetAccessor */) {
                    if (accessor.type) {
                        return grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_cannot_have_a_return_type_annotation);
                    }
                    const parameter = Debug.checkDefined(getSetAccessorValueParameter(accessor), "Return value does not match parameter count assertion.");
                    if (parameter.dotDotDotToken) {
                        return grammarErrorOnNode(parameter.dotDotDotToken, Diagnostics.A_set_accessor_cannot_have_rest_parameter);
                    }
                    if (parameter.questionToken) {
                        return grammarErrorOnNode(parameter.questionToken, Diagnostics.A_set_accessor_cannot_have_an_optional_parameter);
                    }
                    if (parameter.initializer) {
                        return grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_parameter_cannot_have_an_initializer);
                    }
                }
                return false;
            }
            function checkGrammarVariableDeclaration(node) {
                if (node.parent.parent.kind !== 246 /* ForInStatement */ && node.parent.parent.kind !== 247 /* ForOfStatement */) {
                    if (node.flags & 16777216 /* Ambient */) {
                        checkAmbientInitializer(node);
                    }
                    else if (!node.initializer) {
                        if (isBindingPattern(node.name) && !isBindingPattern(node.parent)) {
                            return grammarErrorOnNode(node, Diagnostics.A_destructuring_declaration_must_have_an_initializer);
                        }
                        if (isVarConst(node)) {
                            return grammarErrorOnNode(node, Diagnostics.const_declarations_must_be_initialized);
                        }
                    }
                }
                if (node.exclamationToken && (node.parent.parent.kind !== 240 /* VariableStatement */ || !node.type || node.initializer || node.flags & 16777216 /* Ambient */)) {
                    const message = node.initializer ? Diagnostics.Declarations_with_initializers_cannot_also_have_definite_assignment_assertions : !node.type ? Diagnostics.Declarations_with_definite_assignment_assertions_must_also_have_type_annotations : Diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context;
                    return grammarErrorOnNode(node.exclamationToken, message);
                }
                if ((moduleKind < 5 /* ES2015 */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */) && moduleKind !== 4 /* System */ && !(node.parent.parent.flags & 16777216 /* Ambient */) && hasSyntacticModifier(node.parent.parent, 1 /* Export */)) {
                    checkESModuleMarker(node.name);
                }
                const checkLetConstNames = isLet(node) || isVarConst(node);
                return checkLetConstNames && checkGrammarNameInLetOrConstDeclarations(node.name);
            }
            function grammarErrorAtPos(nodeForSourceFile, start, length2, message, arg0, arg1, arg2) {
            function grammarErrorOnNodeSkippedOn(key, node, message, arg0, arg1, arg2) {
            function checkGrammarProperty(node) {
                if (isComputedPropertyName(node.name) && isBinaryExpression(node.name.expression) && node.name.expression.operatorToken.kind === 101 /* InKeyword */) {
                    return grammarErrorOnNode(node.parent.members[0], Diagnostics.A_mapped_type_may_not_declare_properties_or_methods);
                }
                if (isClassLike(node.parent)) {
                    if (isStringLiteral(node.name) && node.name.text === "constructor") {
                        return grammarErrorOnNode(node.name, Diagnostics.Classes_may_not_have_a_field_named_constructor);
                    }
                    if (checkGrammarForInvalidDynamicName(node.name, Diagnostics.A_computed_property_name_in_a_class_property_declaration_must_have_a_simple_literal_type_or_a_unique_symbol_type)) {
                        return true;
                    }
                    if (languageVersion < 2 /* ES2015 */ && isPrivateIdentifier(node.name)) {
                        return grammarErrorOnNode(node.name, Diagnostics.Private_identifiers_are_only_available_when_targeting_ECMAScript_2015_and_higher);
                    }
                    if (languageVersion < 2 /* ES2015 */ && isAutoAccessorPropertyDeclaration(node)) {
                        return grammarErrorOnNode(node.name, Diagnostics.Properties_with_the_accessor_modifier_are_only_available_when_targeting_ECMAScript_2015_and_higher);
                    }
                    if (isAutoAccessorPropertyDeclaration(node) && checkGrammarForInvalidQuestionMark(node.questionToken, Diagnostics.An_accessor_property_cannot_be_declared_optional)) {
                        return true;
                    }
                }
                else if (node.parent.kind === 261 /* InterfaceDeclaration */) {
                    if (checkGrammarForInvalidDynamicName(node.name, Diagnostics.A_computed_property_name_in_an_interface_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type)) {
                        return true;
                    }
                    Debug.assertNode(node, isPropertySignature);
                    if (node.initializer) {
                        return grammarErrorOnNode(node.initializer, Diagnostics.An_interface_property_cannot_have_an_initializer);
                    }
                }
                else if (isTypeLiteralNode(node.parent)) {
                    if (checkGrammarForInvalidDynamicName(node.name, Diagnostics.A_computed_property_name_in_a_type_literal_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type)) {
                        return true;
                    }
                    Debug.assertNode(node, isPropertySignature);
                    if (node.initializer) {
                        return grammarErrorOnNode(node.initializer, Diagnostics.A_type_literal_property_cannot_have_an_initializer);
                    }
                }
                if (node.flags & 16777216 /* Ambient */) {
                    checkAmbientInitializer(node);
                }
                if (isPropertyDeclaration(node) && node.exclamationToken && (!isClassLike(node.parent) || !node.type || node.initializer || node.flags & 16777216 /* Ambient */ || isStatic(node) || hasAbstractModifier(node))) {
                    const message = node.initializer ? Diagnostics.Declarations_with_initializers_cannot_also_have_definite_assignment_assertions : !node.type ? Diagnostics.Declarations_with_definite_assignment_assertions_must_also_have_type_annotations : Diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context;
                    return grammarErrorOnNode(node.exclamationToken, message);
                }
            }