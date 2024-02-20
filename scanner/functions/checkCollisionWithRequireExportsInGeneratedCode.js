function checkCollisionWithRequireExportsInGeneratedCode(node, name) {
                if (moduleKind >= 5 /* ES2015 */ && !(moduleKind >= 100 /* Node16 */ && getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */)) {
                    return;
                }
                if (!name || !needCollisionCheckForIdentifier(node, name, "require") && !needCollisionCheckForIdentifier(node, name, "exports")) {
                    return;
                }
                if (isModuleDeclaration(node) && getModuleInstanceState(node) !== 1 /* Instantiated */) {
                    return;
                }
                const parent2 = getDeclarationContainer(node);
                if (parent2.kind === 308 /* SourceFile */ && isExternalOrCommonJsModule(parent2)) {
                    errorSkippedOn("noEmit", name, Diagnostics.Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module, declarationNameToString(name), declarationNameToString(name));
                }
            }