function parseSourceFileWorker(languageVersion2, setParentNodes, scriptKind2, setExternalModuleIndicator2) {
                        const isDeclarationFile = isDeclarationFileName(fileName);
                        if (isDeclarationFile) {
                            contextFlags |= 16777216 /* Ambient */;
                        }
                        sourceFlags = contextFlags;
                        nextToken();
                        const statements = parseList(0 /* SourceElements */, parseStatement);
                        Debug.assert(token() === 1 /* EndOfFileToken */);
                        const endOfFileToken = addJSDocComment(parseTokenNode());
                        const sourceFile = createSourceFile2(fileName, languageVersion2, scriptKind2, isDeclarationFile, statements, endOfFileToken, sourceFlags, setExternalModuleIndicator2);
                        processCommentPragmas(sourceFile, sourceText);
                        processPragmasIntoFields(sourceFile, reportPragmaDiagnostic);
                        sourceFile.commentDirectives = scanner2.getCommentDirectives();
                        sourceFile.nodeCount = nodeCount;
                        sourceFile.identifierCount = identifierCount;
                        sourceFile.identifiers = identifiers;
                        sourceFile.parseDiagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);
                        if (jsDocDiagnostics) {
                            sourceFile.jsDocDiagnostics = attachFileToDiagnostics(jsDocDiagnostics, sourceFile);
                        }
                        if (setParentNodes) {
                            fixupParentReferences(sourceFile);
                        }
                        return sourceFile;
                        function reportPragmaDiagnostic(pos, end, diagnostic) {
                            parseDiagnostics.push(createDetachedDiagnostic(fileName, pos, end, diagnostic));
                        }
                    }