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