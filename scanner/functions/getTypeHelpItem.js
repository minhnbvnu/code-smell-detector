function getTypeHelpItem(symbol, typeParameters, checker, enclosingDeclaration, sourceFile) {
            const typeSymbolDisplay = symbolToDisplayParts(checker, symbol);
            const printer = createPrinterWithRemoveComments();
            const parameters = typeParameters.map((t) => createSignatureHelpParameterForTypeParameter(t, checker, enclosingDeclaration, sourceFile, printer));
            const documentation = symbol.getDocumentationComment(checker);
            const tags = symbol.getJsDocTags(checker);
            const prefixDisplayParts = [...typeSymbolDisplay, punctuationPart(29 /* LessThanToken */)];
            return { isVariadic: false, prefixDisplayParts, suffixDisplayParts: [punctuationPart(31 /* GreaterThanToken */)], separatorDisplayParts, parameters, documentation, tags };
        }