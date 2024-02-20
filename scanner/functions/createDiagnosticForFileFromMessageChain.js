function createDiagnosticForFileFromMessageChain(sourceFile, messageChain, relatedInformation) {
            return {
                file: sourceFile,
                start: 0,
                length: 0,
                code: messageChain.code,
                category: messageChain.category,
                messageText: messageChain.next ? messageChain : messageChain.messageText,
                relatedInformation
            };
        }