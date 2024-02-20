function checkEnumDeclarationWorker(node) {
                checkGrammarModifiers(node);
                checkCollisionsForDeclarationName(node, node.name);
                checkExportsOnMergedDeclarations(node);
                node.members.forEach(checkEnumMember);
                computeEnumMemberValues(node);
                const enumSymbol = getSymbolOfDeclaration(node);
                const firstDeclaration = getDeclarationOfKind(enumSymbol, node.kind);
                if (node === firstDeclaration) {
                    if (enumSymbol.declarations && enumSymbol.declarations.length > 1) {
                        const enumIsConst = isEnumConst(node);
                        forEach(enumSymbol.declarations, (decl) => {
                            if (isEnumDeclaration(decl) && isEnumConst(decl) !== enumIsConst) {
                                error(getNameOfDeclaration(decl), Diagnostics.Enum_declarations_must_all_be_const_or_non_const);
                            }
                        });
                    }
                    let seenEnumMissingInitialInitializer = false;
                    forEach(enumSymbol.declarations, (declaration) => {
                        if (declaration.kind !== 263 /* EnumDeclaration */) {
                            return false;
                        }
                        const enumDeclaration = declaration;
                        if (!enumDeclaration.members.length) {
                            return false;
                        }
                        const firstEnumMember = enumDeclaration.members[0];
                        if (!firstEnumMember.initializer) {
                            if (seenEnumMissingInitialInitializer) {
                                error(firstEnumMember.name, Diagnostics.In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enum_element);
                            }
                            else {
                                seenEnumMissingInitialInitializer = true;
                            }
                        }
                    });
                }
            }