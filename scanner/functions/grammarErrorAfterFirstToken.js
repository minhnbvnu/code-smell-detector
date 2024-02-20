function grammarErrorAfterFirstToken(node, message, arg0, arg1, arg2) {
                const sourceFile = getSourceFileOfNode(node);
                if (!hasParseDiagnostics(sourceFile)) {
                    const span = getSpanOfTokenAtPosition(sourceFile, node.pos);
                    diagnostics.add(createFileDiagnostic(sourceFile, textSpanEnd(span), 
                    /*length*/
                    0, message, arg0, arg1, arg2));
                    return true;
                }
                return false;
            }