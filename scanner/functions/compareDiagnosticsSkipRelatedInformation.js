function compareDiagnosticsSkipRelatedInformation(d1, d2) {
            return compareStringsCaseSensitive(getDiagnosticFilePath(d1), getDiagnosticFilePath(d2)) || compareValues(d1.start, d2.start) || compareValues(d1.length, d2.length) || compareValues(d1.code, d2.code) || compareMessageText(d1.messageText, d2.messageText) || 0 /* EqualTo */;
        }