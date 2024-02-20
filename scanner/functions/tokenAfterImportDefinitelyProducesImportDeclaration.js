function tokenAfterImportDefinitelyProducesImportDeclaration() {
                        return token() === 41 /* AsteriskToken */ || token() === 18 /* OpenBraceToken */;
                    }