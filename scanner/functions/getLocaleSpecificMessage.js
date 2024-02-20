function getLocaleSpecificMessage(message) {
            return localizedDiagnosticMessages && localizedDiagnosticMessages[message.key] || message.message;
        }