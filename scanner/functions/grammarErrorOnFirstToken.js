function grammarErrorOnFirstToken(node, message, arg0, arg1, arg2) {
                const sourceFile = getSourceFileOfNode(node);
                if (!hasParseDiagnostics(sourceFile)) {
                    const span = getSpanOfTokenAtPosition(sourceFile, node.pos);
                    diagnostics.add(createFileDiagnostic(sourceFile, span.start, span.length, message, arg0, arg1, arg2));
                    return true;
                }
                return false;
            }