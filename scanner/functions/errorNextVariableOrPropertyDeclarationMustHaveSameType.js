function errorNextVariableOrPropertyDeclarationMustHaveSameType(firstDeclaration, firstType, nextDeclaration, nextType) {
                const nextDeclarationName = getNameOfDeclaration(nextDeclaration);
                const message = nextDeclaration.kind === 169 /* PropertyDeclaration */ || nextDeclaration.kind === 168 /* PropertySignature */ ? Diagnostics.Subsequent_property_declarations_must_have_the_same_type_Property_0_must_be_of_type_1_but_here_has_type_2 : Diagnostics.Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2;
                const declName = declarationNameToString(nextDeclarationName);
                const err = error(nextDeclarationName, message, declName, typeToString(firstType), typeToString(nextType));
                if (firstDeclaration) {
                    addRelatedInfo(err, createDiagnosticForNode(firstDeclaration, Diagnostics._0_was_also_declared_here, declName));
                }
            }