function createDiagnosticForNode(node, message, arg0, arg1, arg2, arg3) {
            const sourceFile = getSourceFileOfNode(node);
            return createDiagnosticForNodeInSourceFile(sourceFile, node, message, arg0, arg1, arg2, arg3);
        }