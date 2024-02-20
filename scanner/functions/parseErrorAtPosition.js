function parseErrorAtPosition(start, length2, message, arg0) {
                        const lastError = lastOrUndefined(parseDiagnostics);
                        let result;
                        if (!lastError || start !== lastError.start) {
                            result = createDetachedDiagnostic(fileName, start, length2, message, arg0);
                            parseDiagnostics.push(result);
                        }
                        parseErrorBeforeNextFinishedNode = true;
                        return result;
                    }