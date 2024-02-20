function createCompilerDiagnosticFromMessageChain(chain, relatedInformation) {
            return {
                file: void 0,
                start: void 0,
                length: void 0,
                code: chain.code,
                category: chain.category,
                messageText: chain.next ? chain : chain.messageText,
                relatedInformation
            };
        }