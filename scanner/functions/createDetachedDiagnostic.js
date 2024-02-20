function createDetachedDiagnostic(fileName, start, length2, message) {
            assertDiagnosticLocation(
            /*file*/
            void 0, start, length2);
            let text = getLocaleSpecificMessage(message);
            if (arguments.length > 4) {
                text = formatStringFromArgs(text, arguments, 4);
            }
            return {
                file: void 0,
                start,
                length: length2,
                messageText: text,
                category: message.category,
                code: message.code,
                reportsUnnecessary: message.reportsUnnecessary,
                fileName
            };
        }