function grammarErrorAtPos(nodeForSourceFile, start, length2, message, arg0, arg1, arg2) {
                const sourceFile = getSourceFileOfNode(nodeForSourceFile);
                if (!hasParseDiagnostics(sourceFile)) {
                    diagnostics.add(createFileDiagnostic(sourceFile, start, length2, message, arg0, arg1, arg2));
                    return true;
                }
                return false;
            }