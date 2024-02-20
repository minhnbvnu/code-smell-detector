function createFileDiagnostic(file, start, length2, message) {
            assertDiagnosticLocation(file, start, length2);
            let text = getLocaleSpecificMessage(message);
            if (arguments.length > 4) {
                text = formatStringFromArgs(text, arguments, 4);
            }
            return {
                file,
                start,
                length: length2,
                messageText: text,
                category: message.category,
                code: message.code,
                reportsUnnecessary: message.reportsUnnecessary,
                reportsDeprecated: message.reportsDeprecated
            };
        }