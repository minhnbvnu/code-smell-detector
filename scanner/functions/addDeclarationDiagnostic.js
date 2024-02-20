function addDeclarationDiagnostic(id, message2) {
                    return (declaration) => diagnostics.add(createDiagnosticForNode(declaration, message2, id));
                }