function parseJSDocComment(parent2, start, length2) {
                            const saveToken = currentToken;
                            const saveParseDiagnosticsLength = parseDiagnostics.length;
                            const saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;
                            const comment = doInsideOfContext(8388608 /* JSDoc */, () => parseJSDocCommentWorker(start, length2));
                            setParent(comment, parent2);
                            if (contextFlags & 262144 /* JavaScriptFile */) {
                                if (!jsDocDiagnostics) {
                                    jsDocDiagnostics = [];
                                }
                                jsDocDiagnostics.push(...parseDiagnostics);
                            }
                            currentToken = saveToken;
                            parseDiagnostics.length = saveParseDiagnosticsLength;
                            parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;
                            return comment;
                        }