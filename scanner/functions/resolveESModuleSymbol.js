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