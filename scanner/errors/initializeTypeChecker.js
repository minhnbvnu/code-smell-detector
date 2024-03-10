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