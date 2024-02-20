function createCompilerDiagnostic(message) {
            let text = getLocaleSpecificMessage(message);
            if (arguments.length > 1) {
                text = formatStringFromArgs(text, arguments, 1);
            }
            return {
                file: void 0,
                start: void 0,
                length: void 0,
                messageText: text,
                category: message.category,
                code: message.code,
                reportsUnnecessary: message.reportsUnnecessary,
                reportsDeprecated: message.reportsDeprecated
            };
        }