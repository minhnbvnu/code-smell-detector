function nodeToDisplayParts(node, enclosingDeclaration) {
            const file = enclosingDeclaration.getSourceFile();
            return mapToDisplayParts((writer) => {
                const printer = createPrinterWithRemoveCommentsOmitTrailingSemicolon();
                printer.writeNode(4 /* Unspecified */, node, file, writer);
            });
        }