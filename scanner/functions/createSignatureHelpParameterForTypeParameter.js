function createSignatureHelpParameterForTypeParameter(typeParameter, checker, enclosingDeclaration, sourceFile, printer) {
            const displayParts = mapToDisplayParts((writer) => {
                const param = checker.typeParameterToDeclaration(typeParameter, enclosingDeclaration, signatureHelpNodeBuilderFlags);
                printer.writeNode(4 /* Unspecified */, param, sourceFile, writer);
            });
            return { name: typeParameter.symbol.name, documentation: typeParameter.symbol.getDocumentationComment(checker), displayParts, isOptional: false, isRest: false };
        }