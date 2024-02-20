function errorUnusedLocal(declaration, name, addDiagnostic) {
                const node = getNameOfDeclaration(declaration) || declaration;
                const message = isTypeDeclaration(declaration) ? Diagnostics._0_is_declared_but_never_used : Diagnostics._0_is_declared_but_its_value_is_never_read;
                addDiagnostic(declaration, 0 /* Local */, createDiagnosticForNode(node, message, name));
            }