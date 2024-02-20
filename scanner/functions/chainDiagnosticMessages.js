function chainDiagnosticMessages(details, message) {
            let text = getLocaleSpecificMessage(message);
            if (arguments.length > 2) {
                text = formatStringFromArgs(text, arguments, 2);
            }
            return {
                messageText: text,
                category: message.category,
                code: message.code,
                next: details === void 0 || Array.isArray(details) ? details : [details]
            };
        }