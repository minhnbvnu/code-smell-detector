function checkResolvedBlockScopedVariable(result, errorLocation) {
                var _a2;
                Debug.assert(!!(result.flags & 2 /* BlockScopedVariable */ || result.flags & 32 /* Class */ || result.flags & 384 /* Enum */));
                if (result.flags & (16 /* Function */ | 1 /* FunctionScopedVariable */ | 67108864 /* Assignment */) && result.flags & 32 /* Class */) {
                    return;
                }
                const declaration = (_a2 = result.declarations) == null ? void 0 : _a2.find((d) => isBlockOrCatchScoped(d) || isClassLike(d) || d.kind === 263 /* EnumDeclaration */);
                if (declaration === void 0)
                    return Debug.fail("checkResolvedBlockScopedVariable could not find block-scoped declaration");
                if (!(declaration.flags & 16777216 /* Ambient */) && !isBlockScopedNameDeclaredBeforeUse(declaration, errorLocation)) {
                    let diagnosticMessage;
                    const declarationName = declarationNameToString(getNameOfDeclaration(declaration));
                    if (result.flags & 2 /* BlockScopedVariable */) {
                        diagnosticMessage = error(errorLocation, Diagnostics.Block_scoped_variable_0_used_before_its_declaration, declarationName);
                    }
                    else if (result.flags & 32 /* Class */) {
                        diagnosticMessage = error(errorLocation, Diagnostics.Class_0_used_before_its_declaration, declarationName);
                    }
                    else if (result.flags & 256 /* RegularEnum */) {
                        diagnosticMessage = error(errorLocation, Diagnostics.Enum_0_used_before_its_declaration, declarationName);
                    }
                    else {
                        Debug.assert(!!(result.flags & 128 /* ConstEnum */));
                        if (shouldPreserveConstEnums(compilerOptions)) {
                            diagnosticMessage = error(errorLocation, Diagnostics.Enum_0_used_before_its_declaration, declarationName);
                        }
                    }
                    if (diagnosticMessage) {
                        addRelatedInfo(diagnosticMessage, createDiagnosticForNode(declaration, Diagnostics._0_is_declared_here, declarationName));
                    }
                }
            }