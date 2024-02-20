function createDiagnosticMessageChainFromDiagnostic(diagnostic) {
            return typeof diagnostic.messageText === "string" ? {
                code: diagnostic.code,
                category: diagnostic.category,
                messageText: diagnostic.messageText,
                next: diagnostic.next
            } : diagnostic.messageText;
        }