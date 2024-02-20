function speculationHelper(callback, speculationKind) {
                        const saveToken = currentToken;
                        const saveParseDiagnosticsLength = parseDiagnostics.length;
                        const saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;
                        const saveContextFlags = contextFlags;
                        const result = speculationKind !== 0 /* TryParse */ ? scanner2.lookAhead(callback) : scanner2.tryScan(callback);
                        Debug.assert(saveContextFlags === contextFlags);
                        if (!result || speculationKind !== 0 /* TryParse */) {
                            currentToken = saveToken;
                            if (speculationKind !== 2 /* Reparse */) {
                                parseDiagnostics.length = saveParseDiagnosticsLength;
                            }
                            parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;
                        }
                        return result;
                    }