function getPlainDiagnosticFollowingNewLines(diagnostic, newLine) {
            return contains(screenStartingMessageCodes, diagnostic.code) ? newLine + newLine : newLine;
        }