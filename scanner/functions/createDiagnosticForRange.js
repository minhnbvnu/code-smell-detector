function createDiagnosticForRange(sourceFile, range, message) {
            return {
                file: sourceFile,
                start: range.pos,
                length: range.end - range.pos,
                code: message.code,
                category: message.category,
                messageText: message.message
            };
        }