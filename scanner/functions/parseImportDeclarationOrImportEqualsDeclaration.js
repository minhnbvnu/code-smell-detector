function parseImportDeclarationOrImportEqualsDeclaration(pos, hasJSDoc, modifiers) {
                        parseExpected(100 /* ImportKeyword */);
                        const afterImportPos = scanner2.getStartPos();
                        let identifier;
                        if (isIdentifier2()) {
                            identifier = parseIdentifier();
                        }
                        let isTypeOnly = false;
                        if (token() !== 158 /* FromKeyword */ && (identifier == null ? void 0 : identifier.escapedText) === "type" && (isIdentifier2() || tokenAfterImportDefinitelyProducesImportDeclaration())) {
                            isTypeOnly = true;
                            identifier = isIdentifier2() ? parseIdentifier() : void 0;
                        }
                        if (identifier && !tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration()) {
                            return parseImportEqualsDeclaration(pos, hasJSDoc, modifiers, identifier, isTypeOnly);
                        }
                        let importClause;
                        if (identifier || // import id
                            token() === 41 /* AsteriskToken */ || // import *
                            token() === 18 /* OpenBraceToken */) {
                            importClause = parseImportClause(identifier, afterImportPos, isTypeOnly);
                            parseExpected(158 /* FromKeyword */);
                        }
                        const moduleSpecifier = parseModuleSpecifier();
                        let assertClause;
                        if (token() === 130 /* AssertKeyword */ && !scanner2.hasPrecedingLineBreak()) {
                            assertClause = parseAssertClause();
                        }
                        parseSemicolon();
                        const node = factory2.createImportDeclaration(modifiers, importClause, moduleSpecifier, assertClause);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }