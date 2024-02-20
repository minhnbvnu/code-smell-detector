function checkPrivateIdentifierPropertyAccess(leftType, right, lexicallyScopedIdentifier) {
                let propertyOnType;
                const properties = getPropertiesOfType(leftType);
                if (properties) {
                    forEach(properties, (symbol) => {
                        const decl = symbol.valueDeclaration;
                        if (decl && isNamedDeclaration(decl) && isPrivateIdentifier(decl.name) && decl.name.escapedText === right.escapedText) {
                            propertyOnType = symbol;
                            return true;
                        }
                    });
                }
                const diagName = diagnosticName(right);
                if (propertyOnType) {
                    const typeValueDecl = Debug.checkDefined(propertyOnType.valueDeclaration);
                    const typeClass = Debug.checkDefined(getContainingClass(typeValueDecl));
                    if (lexicallyScopedIdentifier == null ? void 0 : lexicallyScopedIdentifier.valueDeclaration) {
                        const lexicalValueDecl = lexicallyScopedIdentifier.valueDeclaration;
                        const lexicalClass = getContainingClass(lexicalValueDecl);
                        Debug.assert(!!lexicalClass);
                        if (findAncestor(lexicalClass, (n) => typeClass === n)) {
                            const diagnostic = error(right, Diagnostics.The_property_0_cannot_be_accessed_on_type_1_within_this_class_because_it_is_shadowed_by_another_private_identifier_with_the_same_spelling, diagName, typeToString(leftType));
                            addRelatedInfo(diagnostic, createDiagnosticForNode(lexicalValueDecl, Diagnostics.The_shadowing_declaration_of_0_is_defined_here, diagName), createDiagnosticForNode(typeValueDecl, Diagnostics.The_declaration_of_0_that_you_probably_intended_to_use_is_defined_here, diagName));
                            return true;
                        }
                    }
                    error(right, Diagnostics.Property_0_is_not_accessible_outside_class_1_because_it_has_a_private_identifier, diagName, diagnosticName(typeClass.name || anon));
                    return true;
                }
                return false;
            }