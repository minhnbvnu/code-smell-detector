function tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration() {
                        return token() === 27 /* CommaToken */ || token() === 158 /* FromKeyword */;
                    }