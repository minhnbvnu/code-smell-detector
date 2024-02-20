function createDiagnosticForNodeFromMessageChain(sourceFile, node, messageChain, relatedInformation) {
            const span = getErrorSpanForNode(sourceFile, node);
            return createFileDiagnosticFromMessageChain(sourceFile, span.start, span.length, messageChain, relatedInformation);
        }