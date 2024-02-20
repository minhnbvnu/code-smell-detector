function demarcateMultiStatementExport(declarationStatement, exportStatement) {
                addEmitFlags(declarationStatement, 8388608 /* HasEndOfDeclarationMarker */);
                return [
                    declarationStatement,
                    exportStatement,
                    factory2.createEndOfDeclarationMarker(declarationStatement)
                ];
            }