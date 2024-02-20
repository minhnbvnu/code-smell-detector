function createFileDiagnosticFromMessageChain(file, start, length2, messageChain, relatedInformation) {
            assertDiagnosticLocation(file, start, length2);
            return {
                file,
                start,
                length: length2,
                code: messageChain.code,
                category: messageChain.category,
                messageText: messageChain.next ? messageChain : messageChain.messageText,
                relatedInformation
            };
        }