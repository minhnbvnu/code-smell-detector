function errorOrSuggestion(isError, location, message, arg0, arg1, arg2, arg3) {
                if (location.pos < 0 || location.end < 0) {
                    if (!isError) {
                        return;
                    }
                    const file = getSourceFileOfNode(location);
                    addErrorOrSuggestion(isError, "message" in message ? createFileDiagnostic(file, 0, 0, message, arg0, arg1, arg2, arg3) : createDiagnosticForFileFromMessageChain(file, message));
                    return;
                }
                addErrorOrSuggestion(isError, "message" in message ? createDiagnosticForNode(location, message, arg0, arg1, arg2, arg3) : createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(location), location, message));
            }