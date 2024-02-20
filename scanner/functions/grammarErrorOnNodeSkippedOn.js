function grammarErrorOnNodeSkippedOn(key, node, message, arg0, arg1, arg2) {
                const sourceFile = getSourceFileOfNode(node);
                if (!hasParseDiagnostics(sourceFile)) {
                    errorSkippedOn(key, node, message, arg0, arg1, arg2);
                    return true;
                }
                return false;
            }