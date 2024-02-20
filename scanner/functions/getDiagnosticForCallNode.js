function getDiagnosticForCallNode(node, message, arg0, arg1, arg2, arg3) {
                if (isCallExpression(node)) {
                    const { sourceFile, start, length: length2 } = getDiagnosticSpanForCallNode(node);
                    if ("message" in message) {
                        return createFileDiagnostic(sourceFile, start, length2, message, arg0, arg1, arg2, arg3);
                    }
                    return createDiagnosticForFileFromMessageChain(sourceFile, message);
                }
                else {
                    if ("message" in message) {
                        return createDiagnosticForNode(node, message, arg0, arg1, arg2, arg3);
                    }
                    return createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(node), node, message);
                }
            }