function symbolToStringWorker(writer2) {
                    const entity = builder(symbol, meaning, enclosingDeclaration, nodeFlags);
                    const printer = (enclosingDeclaration == null ? void 0 : enclosingDeclaration.kind) === 308 /* SourceFile */ ? createPrinterWithRemoveCommentsNeverAsciiEscape() : createPrinterWithRemoveComments();
                    const sourceFile = enclosingDeclaration && getSourceFileOfNode(enclosingDeclaration);
                    printer.writeNode(4 /* Unspecified */, entity, 
                    /*sourceFile*/
                    sourceFile, writer2);
                    return writer2;
                }