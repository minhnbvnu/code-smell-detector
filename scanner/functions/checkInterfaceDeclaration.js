function checkInterfaceDeclaration(node) {
                if (!checkGrammarModifiers(node))
                    checkGrammarInterfaceDeclaration(node);
                checkTypeParameters(node.typeParameters);
                addLazyDiagnostic(() => {
                    checkTypeNameIsReserved(node.name, Diagnostics.Interface_name_cannot_be_0);
                    checkExportsOnMergedDeclarations(node);
                    const symbol = getSymbolOfDeclaration(node);
                    checkTypeParameterListsIdentical(symbol);
                    const firstInterfaceDecl = getDeclarationOfKind(symbol, 261 /* InterfaceDeclaration */);
                    if (node === firstInterfaceDecl) {
                        const type = getDeclaredTypeOfSymbol(symbol);
                        const typeWithThis = getTypeWithThisArgument(type);
                        if (checkInheritedPropertiesAreIdentical(type, node.name)) {
                            for (const baseType of getBaseTypes(type)) {
                                checkTypeAssignableTo(typeWithThis, getTypeWithThisArgument(baseType, type.thisType), node.name, Diagnostics.Interface_0_incorrectly_extends_interface_1);
                            }
                            checkIndexConstraints(type, symbol);
                        }
                    }
                    checkObjectTypeForDuplicateDeclarations(node);
                });
                forEach(getInterfaceBaseTypeNodes(node), (heritageElement) => {
                    if (!isEntityNameExpression(heritageElement.expression) || isOptionalChain(heritageElement.expression)) {
                        error(heritageElement.expression, Diagnostics.An_interface_can_only_extend_an_identifier_Slashqualified_name_with_optional_type_arguments);
                    }
                    checkTypeReferenceNode(heritageElement);
                });
                forEach(node.members, checkSourceElement);
                addLazyDiagnostic(() => {
                    checkTypeForDuplicateIndexSignatures(node);
                    registerForUnusedIdentifiersCheck(node);
                });
            }