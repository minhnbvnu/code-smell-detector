function createSignatureHelpParameterForParameter(parameter, checker, enclosingDeclaration, sourceFile, printer) {
            const displayParts = mapToDisplayParts((writer) => {
                const param = checker.symbolToParameterDeclaration(parameter, enclosingDeclaration, signatureHelpNodeBuilderFlags);
                printer.writeNode(4 /* Unspecified */, param, sourceFile, writer);
            });
            const isOptional = checker.isOptionalParameter(parameter.valueDeclaration);
            const isRest = isTransientSymbol(parameter) && !!(parameter.links.checkFlags & 32768 /* RestParameter */);
            return { name: parameter.name, documentation: parameter.getDocumentationComment(checker), displayParts, isOptional, isRest };
        }