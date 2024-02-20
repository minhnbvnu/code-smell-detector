function checkCollisionWithGlobalPromiseInGeneratedCode(node, name) {
                if (!name || languageVersion >= 4 /* ES2017 */ || !needCollisionCheckForIdentifier(node, name, "Promise")) {
                    return;
                }
                if (isModuleDeclaration(node) && getModuleInstanceState(node) !== 1 /* Instantiated */) {
                    return;
                }
                const parent2 = getDeclarationContainer(node);
                if (parent2.kind === 308 /* SourceFile */ && isExternalOrCommonJsModule(parent2) && parent2.flags & 2048 /* HasAsyncFunctions */) {
                    errorSkippedOn("noEmit", name, Diagnostics.Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module_containing_async_functions, declarationNameToString(name), declarationNameToString(name));
                }
            }