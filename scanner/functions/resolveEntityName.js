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