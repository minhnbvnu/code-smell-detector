function parseExportDeclaration(pos, hasJSDoc, modifiers) {
                        const savedAwaitContext = inAwaitContext();
                        setAwaitContext(
                        /*value*/
                        true);
                        let exportClause;
                        let moduleSpecifier;
                        let assertClause;
                        const isTypeOnly = parseOptional(154 /* TypeKeyword */);
                        const namespaceExportPos = getNodePos();
                        if (parseOptional(41 /* AsteriskToken */)) {
                            if (parseOptional(128 /* AsKeyword */)) {
                                exportClause = parseNamespaceExport(namespaceExportPos);
                            }
                            parseExpected(158 /* FromKeyword */);
                            moduleSpecifier = parseModuleSpecifier();
                        }
                        else {
                            exportClause = parseNamedImportsOrExports(276 /* NamedExports */);
                            if (token() === 158 /* FromKeyword */ || token() === 10 /* StringLiteral */ && !scanner2.hasPrecedingLineBreak()) {
                                parseExpected(158 /* FromKeyword */);
                                moduleSpecifier = parseModuleSpecifier();
                            }
                        }
                        if (moduleSpecifier && token() === 130 /* AssertKeyword */ && !scanner2.hasPrecedingLineBreak()) {
                            assertClause = parseAssertClause();
                        }
                        parseSemicolon();
                        setAwaitContext(savedAwaitContext);
                        const node = factory2.createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }