function maybeSetLocalizedDiagnosticMessages(getMessages) {
            if (!localizedDiagnosticMessages && getMessages) {
                localizedDiagnosticMessages = getMessages();
            }
        }