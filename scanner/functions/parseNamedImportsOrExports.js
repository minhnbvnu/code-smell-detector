function parseNamedImportsOrExports(kind) {
                        const pos = getNodePos();
                        const node = kind === 272 /* NamedImports */ ? factory2.createNamedImports(parseBracketedList(23 /* ImportOrExportSpecifiers */, parseImportSpecifier, 18 /* OpenBraceToken */, 19 /* CloseBraceToken */)) : factory2.createNamedExports(parseBracketedList(23 /* ImportOrExportSpecifiers */, parseExportSpecifier, 18 /* OpenBraceToken */, 19 /* CloseBraceToken */));
                        return finishNode(node, pos);
                    }