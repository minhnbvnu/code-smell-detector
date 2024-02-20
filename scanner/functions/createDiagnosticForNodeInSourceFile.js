function createDiagnosticForNodeInSourceFile(sourceFile, node, message, arg0, arg1, arg2, arg3) {
            const span = getErrorSpanForNode(sourceFile, node);
            return createFileDiagnostic(sourceFile, span.start, span.length, message, arg0, arg1, arg2, arg3);
        }