function createDiagnosticForNodeArray(sourceFile, nodes, message, arg0, arg1, arg2, arg3) {
            const start = skipTrivia(sourceFile.text, nodes.pos);
            return createFileDiagnostic(sourceFile, start, nodes.end - start, message, arg0, arg1, arg2, arg3);
        }