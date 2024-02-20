function parseJSDocTypeExpressionForTests2(content, start, length2) {
                            initializeState("file.js", content, 99 /* Latest */, 
                            /*_syntaxCursor:*/
                            void 0, 1 /* JS */);
                            scanner2.setText(content, start, length2);
                            currentToken = scanner2.scan();
                            const jsDocTypeExpression = parseJSDocTypeExpression();
                            const sourceFile = createSourceFile2("file.js", 99 /* Latest */, 1 /* JS */, 
                            /*isDeclarationFile*/
                            false, [], factoryCreateToken(1 /* EndOfFileToken */), 0 /* None */, noop);
                            const diagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);
                            if (jsDocDiagnostics) {
                                sourceFile.jsDocDiagnostics = attachFileToDiagnostics(jsDocDiagnostics, sourceFile);
                            }
                            clearState();
                            return jsDocTypeExpression ? { jsDocTypeExpression, diagnostics } : void 0;
                        }