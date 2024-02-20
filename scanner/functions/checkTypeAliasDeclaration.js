function checkTypeAliasDeclaration(node) {
                checkGrammarModifiers(node);
                checkTypeNameIsReserved(node.name, Diagnostics.Type_alias_name_cannot_be_0);
                checkExportsOnMergedDeclarations(node);
                checkTypeParameters(node.typeParameters);
                if (node.type.kind === 139 /* IntrinsicKeyword */) {
                    if (!intrinsicTypeKinds.has(node.name.escapedText) || length(node.typeParameters) !== 1) {
                        error(node.type, Diagnostics.The_intrinsic_keyword_can_only_be_used_to_declare_compiler_provided_intrinsic_types);
                    }
                }
                else {
                    checkSourceElement(node.type);
                    registerForUnusedIdentifiersCheck(node);
                }
            }