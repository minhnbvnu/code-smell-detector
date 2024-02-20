function createDiagnosticForNodeArrayFromMessageChain(sourceFile, nodes, messageChain, relatedInformation) {
            const start = skipTrivia(sourceFile.text, nodes.pos);
            return createFileDiagnosticFromMessageChain(sourceFile, start, nodes.end - start, messageChain, relatedInformation);
        }