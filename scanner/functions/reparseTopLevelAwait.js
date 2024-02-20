function reparseTopLevelAwait(sourceFile) {
                        const savedSyntaxCursor = syntaxCursor;
                        const baseSyntaxCursor = IncrementalParser.createSyntaxCursor(sourceFile);
                        syntaxCursor = { currentNode: currentNode2 };
                        const statements = [];
                        const savedParseDiagnostics = parseDiagnostics;
                        parseDiagnostics = [];
                        let pos = 0;
                        let start = findNextStatementWithAwait(sourceFile.statements, 0);
                        while (start !== -1) {
                            const prevStatement = sourceFile.statements[pos];
                            const nextStatement = sourceFile.statements[start];
                            addRange(statements, sourceFile.statements, pos, start);
                            pos = findNextStatementWithoutAwait(sourceFile.statements, start);
                            const diagnosticStart = findIndex(savedParseDiagnostics, (diagnostic) => diagnostic.start >= prevStatement.pos);
                            const diagnosticEnd = diagnosticStart >= 0 ? findIndex(savedParseDiagnostics, (diagnostic) => diagnostic.start >= nextStatement.pos, diagnosticStart) : -1;
                            if (diagnosticStart >= 0) {
                                addRange(parseDiagnostics, savedParseDiagnostics, diagnosticStart, diagnosticEnd >= 0 ? diagnosticEnd : void 0);
                            }
                            speculationHelper(() => {
                                const savedContextFlags = contextFlags;
                                contextFlags |= 32768 /* AwaitContext */;
                                scanner2.setTextPos(nextStatement.pos);
                                nextToken();
                                while (token() !== 1 /* EndOfFileToken */) {
                                    const startPos = scanner2.getStartPos();
                                    const statement = parseListElement(0 /* SourceElements */, parseStatement);
                                    statements.push(statement);
                                    if (startPos === scanner2.getStartPos()) {
                                        nextToken();
                                    }
                                    if (pos >= 0) {
                                        const nonAwaitStatement = sourceFile.statements[pos];
                                        if (statement.end === nonAwaitStatement.pos) {
                                            break;
                                        }
                                        if (statement.end > nonAwaitStatement.pos) {
                                            pos = findNextStatementWithoutAwait(sourceFile.statements, pos + 1);
                                        }
                                    }
                                }
                                contextFlags = savedContextFlags;
                            }, 2 /* Reparse */);
                            start = pos >= 0 ? findNextStatementWithAwait(sourceFile.statements, pos) : -1;
                        }
                        if (pos >= 0) {
                            const prevStatement = sourceFile.statements[pos];
                            addRange(statements, sourceFile.statements, pos);
                            const diagnosticStart = findIndex(savedParseDiagnostics, (diagnostic) => diagnostic.start >= prevStatement.pos);
                            if (diagnosticStart >= 0) {
                                addRange(parseDiagnostics, savedParseDiagnostics, diagnosticStart);
                            }
                        }
                        syntaxCursor = savedSyntaxCursor;
                        return factory2.updateSourceFile(sourceFile, setTextRange(factoryCreateNodeArray(statements), sourceFile.statements));
                        function containsPossibleTopLevelAwait(node) {
                            return !(node.flags & 32768 /* AwaitContext */) && !!(node.transformFlags & 67108864 /* ContainsPossibleTopLevelAwait */);
                        }
                        function findNextStatementWithAwait(statements2, start2) {
                            for (let i = start2; i < statements2.length; i++) {
                                if (containsPossibleTopLevelAwait(statements2[i])) {
                                    return i;
                                }
                            }
                            return -1;
                        }
                        function findNextStatementWithoutAwait(statements2, start2) {
                            for (let i = start2; i < statements2.length; i++) {
                                if (!containsPossibleTopLevelAwait(statements2[i])) {
                                    return i;
                                }
                            }
                            return -1;
                        }
                        function currentNode2(position) {
                            const node = baseSyntaxCursor.currentNode(position);
                            if (topLevel && node && containsPossibleTopLevelAwait(node)) {
                                node.intersectsChange = true;
                            }
                            return node;
                        }
                    }